{ pkgs,
  ...
}:

pkgs.mkShell {
    buildInputs = with pkgs; [
        husky
        nodejs_20
        nodePackages_latest.pnpm
    ];
    shellHook = ''
      exec zsh
    '';
}
