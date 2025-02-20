#!/bin/bash

# WebP Image Trimmer
# -----------------
# This script removes excess whitespace around WebP images, modifying them in-place.
# The script is designed to work with WebP images in the project's asset directory.
# It maintains the original aspect ratio while trimming excess whitespace.
#
# Location:
#   Script: ./scripts/img-fat-trim.sh
#   Images: ./src/assets/...
#
# Requirements:
#   - ImageMagick must be installed
#     Ubuntu/Debian: sudo apt-get install imagemagick
#     macOS: brew install imagemagick
#
# Usage:
#   From project root:
#   ./scripts/img-fat-trim.sh ./src/assets/path/to/image.webp
#
# Example:
#   ./scripts/img-fat-trim.sh ./src/assets/icons/menu.webp
#   ./scripts/img-fat-trim.sh ./src/assets/logos/brand.webp
#
# Note:
#   - The script will modify the original file
#   - Only WebP images are supported
#   - Aspect ratio is preserved during trimming
#   - Backup your images before running this script if needed

# Check if an image path is provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide the path to a WebP image"
    echo "Usage: $0 path/to/image.webp"
    exit 1
fi

# Check if the file exists
if [ ! -f "$1" ]; then
    echo "Error: File '$1' not found"
    exit 1
fi

# Check if the file is a WebP image
if [[ ! "$1" =~ \.webp$ ]]; then
    echo "Error: File must be a WebP image"
    exit 1
fi

# Create temp directory if it doesn't exist
TEMP_DIR="/tmp/webp-trim"
mkdir -p "$TEMP_DIR"

# Generate unique temporary filenames
TEMP_PNG="$TEMP_DIR/$(basename "$1" .webp)_temp.png"
TEMP_TRIM="$TEMP_DIR/$(basename "$1" .webp)_trim.png"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed. Please install it first."
    exit 1
fi

# Convert WebP to PNG with preserved aspect ratio
convert "$1" -auto-orient -strip "$TEMP_PNG" && \
# Trim whitespace while maintaining aspect ratio
convert "$TEMP_PNG" -trim +repage -gravity center -background none "$TEMP_TRIM" && \
# Convert back to WebP, preserving quality and aspect ratio
convert "$TEMP_TRIM" -quality 100 -define webp:lossless=true "$1"

# Check if the conversion was successful
if [ $? -eq 0 ]; then
    echo "Successfully trimmed: $1"
    # Clean up temporary files
    rm -f "$TEMP_PNG" "$TEMP_TRIM"
else
    echo "Error: Failed to process the image"
    # Clean up temporary files
    rm -f "$TEMP_PNG" "$TEMP_TRIM"
    exit 1
fi