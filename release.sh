#!/bin/bash

set -e

npm run build
npm run build-css
cp -r dist tmp
cp index.html tmp/
git checkout gh-pages
mv tmp/index.html ./
mv tmp/* dist/
rmdir tmp
git add .
git commit -m "$(git describe --tags --abbrev=0)"
git push origin gh-pages
