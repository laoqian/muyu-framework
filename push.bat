@echo off
git add --all
set /p log=������log:
git commit -m %log%
git push origin
