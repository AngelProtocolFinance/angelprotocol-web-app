#!/bin/bash

# =================================================================
# Image to WebP Converter
# =================================================================
#
# Description:
#   Converts images to WebP format, either individually or in bulk.
#   Supports multiple input formats and can process entire directories.
#   Original files are replaced with their WebP equivalents.
#
# Usage:
#   ./scripts/to-webp.sh <path>
#   
#   Where <path> can be:
#   - A single image file: ./scripts/to-webp.sh ./src/assets/images/hero.jpg
#   - A directory:        ./scripts/to-webp.sh ./src/assets/images/
#
#   Note: Run the script from the project root directory
#
# Supported Input Formats:
#   - JPEG (.jpg, .jpeg)
#   - PNG  (.png)
#   - GIF  (.gif)
#   - BMP  (.bmp)
#   - TIFF (.tiff)
#
# Features:
#   - Recursive directory processing
#   - Case-insensitive file extension matching
#   - Automatic skipping of existing WebP files
#   - File size comparison reporting
#   - Temporary file handling for safe conversion
#
# Requirements:
#   - cwebp command-line tool
#   - Installation:
#     Ubuntu/Debian: sudo apt-get install webp
#     macOS:        brew install webp
#
# Configuration:
#   - Quality: -q 80 (Range: 0-100, higher is better quality but larger file)
#   - Compression: -m 6 (Range: 0-6, higher is better compression but slower)
#   - Metadata: Stripped from output
#
# Example Output:
#   Converting: image.jpg
#   ✓ Success: image.webp
#     Original size: 1024.00 KB
#     WebP size: 512.00 KB
#     Reduction: 50.00%
#
# Exit Codes:
#   0 - Success
#   1 - Error (missing input, unsupported format, conversion failure)
#
# =================================================================

# Function to convert a single image to WebP
convert_to_webp() {
    local input_file="$1"
    local output_file="${input_file%.*}.webp"
    local temp_output="${input_file%.*}.temp.webp"

    # Skip if file is already WebP
    if [[ "$input_file" =~ \.webp$ ]]; then
        echo "Skipping $input_file (already WebP)"
        return
    fi

    echo "Converting: $input_file"

    # Convert the image using cwebp
    if cwebp -q 80 -m 6 -metadata none "$input_file" -o "$temp_output"; then
        # Get original file size before removing
        original_size=$(stat -f %z "$input_file" 2>/dev/null || stat -c %s "$input_file")
        
        # Remove the original file
        rm "$input_file"
        
        # Move the WebP file to final location
        mv "$temp_output" "$output_file"
        
        # Display size comparison
        converted_size=$(stat -f %z "$output_file" 2>/dev/null || stat -c %s "$output_file")
        
        echo "✓ Success: $output_file"
        echo "  Original size: $(echo "scale=2; $original_size/1024" | bc) KB"
        echo "  WebP size: $(echo "scale=2; $converted_size/1024" | bc) KB"
        echo "  Reduction: $(echo "scale=2; (1 - $converted_size/$original_size) * 100" | bc)%"
        echo
    else
        echo "✗ Error: Failed to convert $input_file"
        [ -f "$temp_output" ] && rm "$temp_output"
        return 1
    fi
}

# Check if path is provided
if [ $# -eq 0 ]; then
    echo "Error: No path provided"
    echo "Usage: $0 <path>"
    echo "  <path> can be a directory or an image file"
    exit 1
fi

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp is not installed"
    echo "Please install it using your package manager:"
    echo "Ubuntu/Debian: sudo apt-get install webp"
    echo "macOS: brew install webp"
    exit 1
fi

input_path="$1"

# Check if input path exists
if [ ! -e "$input_path" ]; then
    echo "Error: Path does not exist: $input_path"
    exit 1
fi

# Process based on whether input is directory or file
if [ -d "$input_path" ]; then
    echo "Processing directory: $input_path"
    echo "----------------------------"
    
    # Find all image files in directory (case insensitive)
    find "$input_path" -type f -regextype posix-extended -iregex ".*\.(jpg|jpeg|png|gif|bmp|tiff)$" | while read -r image; do
        convert_to_webp "$image"
    done
    
    echo "Directory processing complete!"
else
    # Check if file is an image
    if [[ "$input_path" =~ \.(jpg|jpeg|png|gif|bmp|tiff)$ ]]; then
        convert_to_webp "$input_path"
    else
        echo "Error: Unsupported file format. Supported formats: jpg, jpeg, png, gif, bmp, tiff"
        exit 1
    fi
fi