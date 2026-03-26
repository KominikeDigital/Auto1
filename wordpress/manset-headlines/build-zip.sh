#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(cd "$ROOT_DIR/../.." && pwd)"
DIST_DIR="$REPO_DIR/dist"

mkdir -p "$DIST_DIR"
rm -f "$DIST_DIR/manset-headlines.zip"

(
  cd "$ROOT_DIR/.."
  zip -r "$DIST_DIR/manset-headlines.zip" manset-headlines \
    -x '*.DS_Store' -x 'manset-headlines/build-zip.sh'
)

echo "Created: $DIST_DIR/manset-headlines.zip"
