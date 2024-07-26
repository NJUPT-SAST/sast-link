{
  description = "SAST Link Frontend Nix Dev Env";

  inputs = {
    nixpkgs.url = "nixpkgs";
    flake-utils = {
      url = "github:numtide/flake-utils";
    };
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let

      pkgs = nixpkgs.legacyPackages.${system};

    in {
      devShells.default = import ./shell.nix { inherit pkgs; };

      packages.default = pkgs.buildNpmPackage rec {
          pname = "sast-link"; # <same as package.json name>
          version = "0.1.0";
          buildInputs  = with pkgs; [
            nodePackages.node-gyp-build
          ];
          npmDepsHash = "sha256-IlUPLmW18JPyGcY6EWnX2tdLlHTEi4aTk5iipw4H7Gs="; # <prefetch-npm-deps package-lock.json>

          # see ./next.config.mjs
          env.OUTPUT_STANDALONE = true;

          src = ./.;

          postBuild = ''
            # Add a shebang to the server js file, then patch the shebang.
            sed -i '1s|^|#!/usr/bin/env node\n|' .next/standalone/server.js
            patchShebangs .next/standalone/server.js
          '';

          installPhase = ''
            runHook preInstall

            mkdir -p $out/{share,bin}

            cp -r .next/standalone $out/share/${pname}/
            cp -r public $out/share/${pname}/public

            mkdir -p $out/share/${pname}/.next
            cp -r .next/static $out/share/${pname}/.next/static

            chmod +x $out/share/${pname}/server.js

            makeWrapper $out/share/${pname}/server.js $out/bin/${pname} \
              --set-default PORT 3000

            runHook postInstall
          '';
      };

      #packages.sast-link-docker = pkgs.dockerTools.buildImage {
      #  name = "sast-link-frontend";
      #  config = {
      #    Entrypoint = [ "${self.packages.${system}.default}/bin/sast-link" ];
      #  };
      #};
    });
}
