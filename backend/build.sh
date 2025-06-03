#!/usr/bin/env bash

set -e

# Install FFmpeg manually (Render doesn't have it by default)
echo "Installing FFmpeg..."
mkdir -p ffmpeg
cd ffmpeg

# Download static build of FFmpeg
curl -L https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz -o ffmpeg.tar.xz

# Extract and move ffmpeg binary to /usr/local/bin
tar -xf ffmpeg.tar.xz --strip-components=1
chmod +x ffmpeg
mv ffmpeg /usr/local/bin/ffmpeg
mv ffprobe /usr/local/bin/ffprobe

echo "FFmpeg installed successfully."
