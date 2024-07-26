#!/usr/bin/env bash

# script help to update package-lock.json and nix flake npmDepsHash
npm i --package-lock-only
sed -i "s|npmDepsHash = \".*\";|npmDepsHash = \"$(nix run nixpkgs#prefetch-npm-deps package-lock.json | tail -1)\";|" flake.nix
