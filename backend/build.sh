#!/usr/bin/env bash

set -e

# Make a local bin directory for ffmpeg
mkdir -p bin
mkdir -p ffmpeg_build
cd ffmpeg_build

# Download FFmpeg static build
curl -L https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz -o ffmpeg.tar.xz
tar -xf ffmpeg.tar.xz --strip-components=1

# Move binaries to bin/
mv ffmpeg ../bin/ffmpeg
mv ffprobe ../bin/ffprobe
chmod +x ../bin/ffmpeg ../bin/ffprobe

cd ..
rm -rf ffmpeg_build
