#!/usr/bin/env bash
# Cursor Cloud Agent install step (see .cursor/environment.json).
# Mirrors the toolchain the repo pins: Node from .node-version, pnpm from
# package.json "packageManager", vp from the vite-plus catalog in the lockfile.
# Idempotent: safe to rerun on a machine that already has everything.
set -eo pipefail
cd "$(dirname "$0")/.."

source ~/.nvm/nvm.sh
nvm install "$(cat .node-version)"
corepack enable

# Cursor's shells already have a Node on PATH, so nvm's default alone is not
# enough; put this Node (and its pnpm/vp) first for every agent shell.
sed -i '/# k9-node/d' ~/.bashrc
sed -i "1i export PATH=\"$NVM_BIN:\$PATH\" # k9-node" ~/.bashrc

pnpm install --frozen-lockfile
ln -sf "$PWD/node_modules/.bin/vp" "$NVM_BIN/vp"
vp run -r types:gen
