#!/usr/bin/env bash

set -e

mkdir -p bin
mkdir -p ffmpeg_build
cd ffmpeg_build

curl -L https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz -o ffmpeg.tar.xz
tar -xf ffmpeg.tar.xz --strip-components=1
mv ffmpeg ../bin/ffmpeg
mv ffprobe ../bin/ffprobe
chmod +x ../bin/ffmpeg ../bin/ffprobe

cd ..
rm -rf ffmpeg_build
