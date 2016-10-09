#!/bin/bash
cp src/client/public/bundle.js ../noestimates.github.io/public/bundle.js
cd ../noestimates.github.io
git add -A
git commit -m "Bump version"
git push origin master



