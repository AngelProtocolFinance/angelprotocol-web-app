#!/bin/bash

# =================================================================
# Image Details Extractor
# =================================================================
#
# Description:
#   Extracts and displays details about images, including dimensions,
#   file size, format, and other metadata.
#   Can process single images or entire directories.
#
# Usage:
#   ./image-details.sh <path>
#   
#   Where <path> can be:
#   - A single image file: ./image-details.sh ./images/photo.jpg
#   - A directory:        ./image-details.sh ./images/
#
# Supported Input Formats:
#   - JPEG (.jpg, .jpeg)
#   - PNG  (.png)
#   - GIF  (.gif)
#   - WebP (.webp)
#   - BMP  (.bmp)
#   - TIFF (.tiff)
#
# Features:
#   - Recursive directory processing
#   - Case-insensitive file extension matching
#   - Comprehensive image information
#   - Tabular output format
#
# Requirements:
#   - ImageMagick: identify command
#   - Installation:
#     Ubuntu/Debian: sudo apt-get install imagemagick
#     macOS:        brew install imagemagick
#
# Example Output:
#   Details for: image.jpg
#   ┌─────────────────┬───────────────────────────────┐
#   │ Property        │ Value                         │
#   ├─────────────────┼───────────────────────────────┤
#   │ Format          │ JPEG                          │
#   │ Dimensions      │ 1920x1080                     │
#   │ Resolution      │ 72x72 DPI                     │
#   │ File Size       │ 2.45 MB                       │
#   │ Color Space     │ sRGB                          │
#   │ Bit Depth       │ 8-bit                         │
#   │ Creation Date   │ 2023-06-15T14:30:45+00:00     │
#   └─────────────────┴───────────────────────────────┘
#
# Exit Codes:
#   0 - Success
#   1 - Error (missing input, unsupported format, identify failure)
#
# =================================================================

# Function to display usage
show_usage() {
    echo "Usage:"
    echo "  $0 <path>"
    echo
    echo "  Where <path> can be a single image file or a directory"
    echo "  Supported formats: jpg, jpeg, png, gif, webp, bmp, tiff"
    exit 1
}

# Check if path is provided
if [ $# -eq 0 ]; then
    echo "Error: No path provided"
    show_usage
fi

# Check if identify is installed
if ! command -v identify &> /dev/null; then
    echo "Error: ImageMagick 'identify' command is not installed"
    echo "Please install ImageMagick using your package manager:"
    echo "Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "macOS: brew install imagemagick"
    exit 1
fi

input_path="$1"

# Check if input path exists
if [ ! -e "$input_path" ]; then
    echo "Error: Path does not exist: $input_path"
    exit 1
fi

# Function to format file size in human-readable format
format_file_size() {
    local size_in_bytes=$1
    
    if [ $size_in_bytes -ge 1073741824 ]; then
        echo "$(echo "scale=2; $size_in_bytes / 1073741824" | bc) GB"
    elif [ $size_in_bytes -ge 1048576 ]; then
        echo "$(echo "scale=2; $size_in_bytes / 1048576" | bc) MB"
    elif [ $size_in_bytes -ge 1024 ]; then
        echo "$(echo "scale=2; $size_in_bytes / 1024" | bc) KB"
    else
        echo "$size_in_bytes bytes"
    fi
}

# Function to analyze a single image
analyze_image() {
    local input_file="$1"
    
    # Check if file exists and is readable
    if [ ! -r "$input_file" ]; then
        echo "Error: Cannot read file: $input_file"
        return 1
    fi
    
    echo "Details for: $input_file"
    echo "┌─────────────────┬───────────────────────────────┐"
    echo "│ Property        │ Value                         │"
    echo "├─────────────────┼───────────────────────────────┤"
    
    # Get file format
    local format=$(identify -format "%m" "$input_file" 2>/dev/null)
    if [ $? -ne 0 ]; then
        echo "│ Error          │ Failed to read image            │"
        echo "└─────────────────┴───────────────────────────────┘"
        echo
        return 1
    fi
    echo "│ Format          │ $format                        "
    
    # Get dimensions
    local dimensions=$(identify -format "%wx%h" "$input_file" 2>/dev/null)
    echo "│ Dimensions      │ $dimensions                    "
    
    # Get resolution
    local resolution=$(identify -format "%x x %y %U" "$input_file" 2>/dev/null | sed 's/PixelsPerInch/DPI/')
    echo "│ Resolution      │ $resolution                    "
    
    # Get file size
    local file_size=$(stat -f %z "$input_file" 2>/dev/null || stat -c %s "$input_file")
    local formatted_size=$(format_file_size $file_size)
    echo "│ File Size       │ $formatted_size                "
    
    # Get color space
    local colorspace=$(identify -format "%r" "$input_file" 2>/dev/null)
    echo "│ Color Space     │ $colorspace                    "
    
    # Get bit depth
    local depth=$(identify -format "%z-bit" "$input_file" 2>/dev/null)
    echo "│ Bit Depth       │ $depth                         "
    
    # Get creation date (if available)
    local date=$(identify -format "%[EXIF:DateTime]" "$input_file" 2>/dev/null)
    if [ -n "$date" ]; then
        echo "│ Creation Date   │ $date                "
    fi
    
    # Get compression type (if available)
    local compression=$(identify -format "%C" "$input_file" 2>/dev/null)
    if [ -n "$compression" ] && [ "$compression" != "None" ]; then
        echo "│ Compression     │ $compression                    "
    fi
    
    # Get orientation (if available)
    local orientation=$(identify -format "%[EXIF:Orientation]" "$input_file" 2>/dev/null)
    if [ -n "$orientation" ]; then
        echo "│ Orientation     │ $orientation                        "
    fi
    
    echo "└─────────────────┴───────────────────────────────┘"
    echo
}

# Function to process a directory recursively
process_directory() {
    local dir="$1"
    local file
    
    # Enable shell options for case-insensitive matching
    shopt -s nullglob nocaseglob
    
    # Process files in current directory
    for ext in jpg jpeg png gif webp bmp tiff; do
        for file in "$dir"/*.$ext; do
            if [ -f "$file" ]; then
                analyze_image "$file"
            fi
        done
    done
    
    # Process subdirectories recursively
    for subdir in "$dir"/*/; do
        if [ -d "$subdir" ]; then
            process_directory "$subdir"
        fi
    done
    
    # Disable shell options when done
    shopt -u nullglob nocaseglob
}

# Process based on whether input is directory or file
if [ -d "$input_path" ]; then
    echo "Processing directory: $input_path"
    echo "----------------------------"
    process_directory "$input_path"
    echo "Directory processing complete!"
else
    # Check if file is an image (case insensitive)
    if [[ "$input_path" =~ \.(jpg|jpeg|png|gif|webp|bmp|tiff)$ ]]; then
        analyze_image "$input_path"
    else
        echo "Error: Unsupported file format. Supported formats: jpg, jpeg, png, gif, webp, bmp, tiff"
        exit 1
    fi
fi

exit 0