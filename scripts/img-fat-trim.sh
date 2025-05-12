#!/bin/bash

# Image Trimmer
# -----------------
# This script removes excess whitespace around WebP and PNG images, modifying them in-place.
# The script is designed to work with images in the project's asset directory.
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
#   ./scripts/img-fat-trim.sh ./src/assets/path/to/image.png
#
# Example:
#   ./scripts/img-fat-trim.sh ./src/assets/icons/menu.webp
#   ./scripts/img-fat-trim.sh ./src/assets/logos/brand.png
#
# Note:
#   - The script will modify the original file
#   - WebP and PNG images are supported
#   - Aspect ratio is preserved during trimming
#   - Backup your images before running this script if needed

# Check if an image path is provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide the path to a WebP or PNG image"
    echo "Usage: $0 path/to/image.[webp|png]"
    exit 1
fi

# Check if the file exists
if [ ! -f "$1" ]; then
    echo "Error: File '$1' not found"
    exit 1
fi

# Check if the file is a WebP or PNG image
if [[ ! "$1" =~ \.(webp|png)$ ]]; then
    echo "Error: File must be a WebP or PNG image"
    exit 1
fi

# Get file extension
FILE_EXT="${1##*.}"

# Create temp directory if it doesn't exist
TEMP_DIR="/tmp/image-trim"
mkdir -p "$TEMP_DIR"

# Generate unique temporary filenames
TEMP_PNG="$TEMP_DIR/$(basename "$1" .$FILE_EXT)_temp.png"
TEMP_TRIM="$TEMP_DIR/$(basename "$1" .$FILE_EXT)_trim.png"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed. Please install it first."
    exit 1
fi

# Process the image
echo "Processing: $1"

if [ "$FILE_EXT" = "webp" ]; then
    # For WebP: Convert to PNG, trim, then convert back to WebP
    convert "$1" -auto-orient -strip "$TEMP_PNG" && \
    convert "$TEMP_PNG" -trim +repage -gravity center -background none "$TEMP_TRIM" && \
    convert "$TEMP_TRIM" -quality 100 -define webp:lossless=true "$1"
elif [ "$FILE_EXT" = "png" ]; then
    # For PNG: Create temp PNG, trim, then replace original
    convert "$1" -auto-orient -strip "$TEMP_PNG" && \
    convert "$TEMP_PNG" -trim +repage -gravity center -background none "$TEMP_TRIM" && \
    convert "$TEMP_TRIM" -quality 100 "$1"
fi

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