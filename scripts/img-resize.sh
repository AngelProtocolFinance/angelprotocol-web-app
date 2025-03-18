
#!/bin/bash

# =================================================================
# Image Resizer
# =================================================================
#
# Description:
#   Resizes images while maintaining aspect ratio.
#   Can process single images or entire directories.
#   Supports specifying either width or height.
#
# Usage:
#   ./resize-image.sh -w <width> <path>    # Resize by width
#   ./resize-image.sh -h <height> <path>   # Resize by height
#   
#   Where <path> can be:
#   - A single image file: ./resize-image.sh -w 800 ./images/photo.jpg
#   - A directory:        ./resize-image.sh -h 600 ./images/
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
#   - Maintains aspect ratio
#   - Recursive directory processing
#   - Case-insensitive file extension matching
#   - Original files are replaced with their resized versions
#   - Size comparison reporting
#
# Requirements:
#   - ImageMagick: convert command
#   - Installation:
#     Ubuntu/Debian: sudo apt-get install imagemagick
#     macOS:        brew install imagemagick
#
# Example Output:
#   Resizing: image.jpg (width: 800px)
#   ✓ Success: image.jpg
#     Original dimensions: 1920x1080
#     New dimensions: 800x450
#     Size reduction: 65.32%
#
# Exit Codes:
#   0 - Success
#   1 - Error (missing input, unsupported format, resize failure)
#
# =================================================================

# Default values
width=0
height=0
resize_type=""
resize_value=0

# Function to display usage
show_usage() {
    echo "Usage:"
    echo "  $0 -w <width> <path>    # Resize by width"
    echo "  $0 -h <height> <path>   # Resize by height"
    echo
    echo "  Where <path> can be a single image file or a directory"
    echo "  Supported formats: jpg, jpeg, png, gif, webp, bmp, tiff"
    exit 1
}

# Parse command-line options
while getopts "w:h:" opt; do
    case $opt in
        w)
            width=$OPTARG
            resize_type="width"
            resize_value=$width
            ;;
        h)
            height=$OPTARG
            resize_type="height"
            resize_value=$height
            ;;
        *)
            show_usage
            ;;
    esac
done

# Shift to get the path argument
shift $((OPTIND-1))

# Check if path is provided
if [ $# -eq 0 ]; then
    echo "Error: No path provided"
    show_usage
fi

# Check if either width or height is specified
if [ $width -eq 0 ] && [ $height -eq 0 ]; then
    echo "Error: Either width (-w) or height (-h) must be specified"
    show_usage
fi

# Check if convert is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick 'convert' command is not installed"
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

# Function to resize a single image
resize_image() {
    local input_file="$1"
    local temp_file="${input_file%.*}.temp.${input_file##*.}"
    
    # Get original dimensions
    local dimensions=$(identify -format "%wx%h" "$input_file" 2>/dev/null)
    if [ $? -ne 0 ]; then
        echo "✗ Error: Failed to read dimensions of $input_file"
        return 1
    fi
    
    echo "Resizing: $input_file ($resize_type: ${resize_value}px)"
    
    # Prepare the resize option
    local resize_option=""
    if [ "$resize_type" = "width" ]; then
        resize_option="${width}x"
    else
        resize_option="x${height}"
    fi
    
    # Resize the image to a temporary file
    if convert "$input_file" -resize "$resize_option" "$temp_file"; then
        # Get original file size before removing
        local original_size=$(stat -f %z "$input_file" 2>/dev/null || stat -c %s "$input_file")
        
        # Replace the original with the resized version
        mv "$temp_file" "$input_file"
        
        # Get new dimensions
        local new_dimensions=$(identify -format "%wx%h" "$input_file")
        
        # Get new file size
        local new_size=$(stat -f %z "$input_file" 2>/dev/null || stat -c %s "$input_file")
        
        # Calculate size reduction percentage
        local reduction_percentage=$(echo "scale=2; (1 - $new_size/$original_size) * 100" | bc)
        
        echo "✓ Success: $input_file"
        echo "  Original dimensions: $dimensions"
        echo "  New dimensions: $new_dimensions"
        echo "  Size reduction: ${reduction_percentage}%"
        echo
    else
        echo "✗ Error: Failed to resize $input_file"
        [ -f "$temp_file" ] && rm "$temp_file"
        return 1
    fi
}

# Process based on whether input is directory or file
if [ -d "$input_path" ]; then
    echo "Processing directory: $input_path"
    echo "----------------------------"
    
    # Process directory recursively
    process_directory() {
        local dir="$1"
        local file
        
        # Enable shell options for case-insensitive matching
        shopt -s nullglob nocaseglob
        
        # Process files in current directory
        for ext in jpg jpeg png gif webp bmp tiff; do
            for file in "$dir"/*.$ext; do
                if [ -f "$file" ]; then
                    resize_image "$file"
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
    
    process_directory "$input_path"
    
    echo "Directory processing complete!"
else
    # Check if file is an image (case insensitive)
    if [[ "$input_path" =~ \.(jpg|jpeg|png|gif|webp|bmp|tiff)$ ]]; then
        resize_image "$input_path"
    else
        echo "Error: Unsupported file format. Supported formats: jpg, jpeg, png, gif, webp, bmp, tiff"
        exit 1
    fi
fi

exit 0