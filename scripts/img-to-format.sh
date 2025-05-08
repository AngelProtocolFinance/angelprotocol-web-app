#!/bin/bash

# =================================================================
# Image Format Converter (including SVG Input and WebP)
# =================================================================
#
# Description:
#   Converts images between various formats, including using SVG as input
#   and converting to/from WebP. Supports individual files or bulk
#   processing within directories. Original files are replaced.
#
# Usage:
#   ./convert-image.sh <target_format> <path>
#
# Arguments:
#   <target_format>: The desired output format (e.g., 'webp', 'jpg', 'png').
#                    Cannot be 'svg'.
#   <path>:          Can be a single image file or a directory containing images.
#
# Examples:
#   # Convert JPG/PNG/SVG etc. in 'images/' directory TO WebP
#   ./convert-image.sh webp ./src/assets/images/
#
#   # Convert a specific SVG TO PNG (at default density)
#   ./convert-image.sh png ./src/assets/images/logo.svg
#
#   # Convert all WebP images in 'images/' TO JPG
#   ./convert-image.sh jpg ./src/assets/images/
#
#   Note: Run the script from the project root directory or adjust paths.
#
# Supported Input Formats:
#   - SVG (.svg) - Requires ImageMagick with librsvg delegate recommended
#   - JPEG (.jpg, .jpeg)
#   - PNG (.png)
#   - GIF (.gif)
#   - BMP (.bmp)
#   - TIFF (.tiff)
#   - WebP (.webp) - When converting FROM WebP
#
# Supported Output Formats (Target):
#   - WebP (.webp)
#   - Common raster formats supported by ImageMagick (jpg, png, gif, bmp, tiff, etc.)
#   - Cannot target 'svg'.
#
# Features:
#   - Handles SVG input (rasterization)
#   - Bidirectional WebP conversion
#   - Recursive directory processing
#   - Case-insensitive file extension matching
#   - Automatic skipping of files already in the target format
#   - File size comparison reporting
#   - Temporary file handling
#   - Configurable density for SVG rasterization
#
# Requirements:
#   - cwebp: For converting non-SVG TO WebP (Part of libwebp)
#   - convert: For ALL conversions involving SVG input, and for converting FROM WebP,
#              or raster-to-raster. (Part of ImageMagick).
#              For best SVG results, ImageMagick should be linked with librsvg.
#   - bc: For floating-point calculations
#
# Installation:
#   Ubuntu/Debian: sudo apt-get update && sudo apt-get install webp imagemagick librsvg2-bin bc
#   macOS:        brew install webp imagemagick librsvg bc
#
# Configuration:
#   - WEBP_QUALITY: Quality for cwebp (0-100). Default: 80
#   - WEBP_COMPRESSION: Compression effort for cwebp (0-6). Default: 6
#   - SVG_DENSITY: DPI for rasterizing SVG inputs. Default: 150
#
# Exit Codes:
#   0 - Success
#   1 - Error (arguments, tools missing, conversion failure, invalid target)
#   2 - No eligible files found/processed
# =================================================================

# --- Configuration ---
WEBP_QUALITY=80
WEBP_COMPRESSION=6
SVG_DENSITY=150 # Dots Per Inch for rasterizing SVG. Increase for higher resolution.
# --- End Configuration ---

# Function to calculate and display size difference
# (No changes needed from previous version)
display_size_comparison() {
    local original_file="$1"
    local converted_file="$2"
    local original_size
    local converted_size

    original_size=$(stat -f %z "$original_file" 2>/dev/null || stat -c %s "$original_file")
    converted_size=$(stat -f %z "$converted_file" 2>/dev/null || stat -c %s "$converted_file")

    if [[ -z "$original_size" || -z "$converted_size" ]]; then
        echo "  Warning: Could not determine file sizes for comparison."
        return
    fi

    local orig_kb=$(echo "scale=2; $original_size/1024" | bc)
    local conv_kb=$(echo "scale=2; $converted_size/1024" | bc)

    echo "  Original size: $orig_kb KB"
    echo "  New size: $conv_kb KB"

    if (( $(echo "$original_size > 0" | bc -l) )); then
        if (( $(echo "$converted_size < $original_size" | bc -l) )); then
            local reduction=$(echo "scale=2; (1 - $converted_size/$original_size) * 100" | bc)
            echo "  Reduction: $reduction%"
        elif (( $(echo "$converted_size > $original_size" | bc -l) )); then
            local increase=$(echo "scale=2; ($converted_size/$original_size - 1) * 100" | bc)
            echo "  Increase: $increase%"
        else
            echo "  Size unchanged."
        fi
    else
         echo "  Original size was 0 bytes."
    fi
    echo
}

# Function to convert standard raster formats TO WebP using cwebp
convert_raster_to_webp_cwebp() {
    local input_file="$1"
    local base_name="${input_file%.*}"
    local output_file="${base_name}.webp"
    local temp_output="${base_name}.temp.webp"

    echo "Converting (cwebp): $input_file to webp"

    if cwebp -q "$WEBP_QUALITY" -m "$WEBP_COMPRESSION" -metadata none "$input_file" -o "$temp_output"; then
        local temp_orig_display_file="${base_name}.original_temp"
        cp "$input_file" "$temp_orig_display_file" # Copy for size reporting

        rm "$input_file"
        mv "$temp_output" "$output_file"

        echo "✓ Success (cwebp): $output_file"
        display_size_comparison "$temp_orig_display_file" "$output_file"
        rm "$temp_orig_display_file"
        return 0
    else
        echo "✗ Error (cwebp): Failed to convert $input_file"
        [ -f "$temp_output" ] && rm "$temp_output"
        return 1
    fi
}

# Function to convert images using ImageMagick (handles SVG input, WebP input/output, raster-to-raster)
convert_using_imagemagick() {
    local input_file="$1"
    local target_format="$2"
    local base_name="${input_file%.*}"
    local output_file="${base_name}.${target_format}"
    local temp_output="${base_name}.temp.${target_format}"
    local input_ext_lower=$(echo "${input_file##*.}" | tr '[:upper:]' '[:lower:]')

    echo "Converting (convert): $input_file to $target_format"

    local convert_options=()
    # Add density option ONLY if input is SVG
    if [[ "$input_ext_lower" == "svg" ]]; then
        convert_options+=("-density" "$SVG_DENSITY")
        # Ensure background is transparent for formats that support it (like PNG, WebP)
        # For formats without transparency (like JPG), you might want -background white -flatten
        if [[ "$target_format" == "png" || "$target_format" == "webp" || "$target_format" == "gif" ]]; then
             convert_options+=("-background" "none")
        # else # Optional: Handle formats without transparency (e.g., JPG)
             # convert_options+=("-background" "white" "-flatten")
        fi

    fi
     # Add input file AFTER density options
    convert_options+=("$input_file")
     # Add any output format specific options here if needed, before the output file
    # Example: if [[ "$target_format" == "jpg" ]]; then convert_options+=("-quality" "85"); fi
    convert_options+=("$temp_output")

    if convert "${convert_options[@]}"; then
        local temp_orig_display_file="${base_name}.original_temp"
        cp "$input_file" "$temp_orig_display_file" # Copy for size reporting

        rm "$input_file"
        mv "$temp_output" "$output_file"

        echo "✓ Success (convert): $output_file"
        display_size_comparison "$temp_orig_display_file" "$output_file"
        rm "$temp_orig_display_file"
        return 0
    else
        echo "✗ Error (convert): Failed to convert $input_file to $target_format"
        [ -f "$temp_output" ] && rm "$temp_output"
        return 1
    fi
}


# --- Main Script Logic ---

# Check arguments
if [ "$#" -ne 2 ]; then
    echo "Error: Invalid number of arguments."
    echo "Usage: $0 <target_format> <path>"
    echo "  <target_format>: webp | jpg | png | gif | etc. (cannot be svg)"
    echo "  <path>:          Directory or image file"
    exit 1
fi

target_format=$(echo "$1" | tr '[:upper:]' '[:lower:]') # Normalize to lowercase
input_path="$2"
files_processed=0 # Renamed from files_found for clarity
conversion_errors=0

# Validate target format
if [ -z "$target_format" ]; then
    echo "Error: Target format cannot be empty."
    exit 1
fi
if [[ "$target_format" == "svg" ]]; then
    echo "Error: Target format cannot be 'svg'. This script rasterizes SVG, not creates it."
    exit 1
fi

# Check necessary tools based on potential conversion paths
tools_ok=1
if ! command -v bc &> /dev/null; then
    echo "Error: 'bc' command not found. Please install it."
    tools_ok=0
fi
# 'convert' is needed for SVG input, webp output from SVG, or any non-webp target
if ! command -v convert &> /dev/null; then
    echo "Error: 'convert' command not found (part of ImageMagick)."
    echo "Please install ImageMagick (and librsvg2-bin for SVG support)."
    tools_ok=0
fi
# 'cwebp' is needed ONLY if the target is 'webp' AND input might be non-SVG raster
if [[ "$target_format" == "webp" ]]; then
     if ! command -v cwebp &> /dev/null; then
        echo "Error: 'cwebp' command not found (part of webp tools)."
        echo "Please install webp tools."
        tools_ok=0
    fi
fi

if [ "$tools_ok" -eq 0 ]; then
    exit 1
fi


# Check if input path exists
if [ ! -e "$input_path" ]; then
    echo "Error: Path does not exist: $input_path"
    exit 1
fi

# --- Processing ---

process_file() {
    local file_path="$1"
    local target_fmt="$2"
    local input_ext_lower=$(echo "${file_path##*.}" | tr '[:upper:]' '[:lower:]')
    local eligible_for_conversion=0

    # Skip if the file is already in the target format
    if [[ "$input_ext_lower" == "$target_fmt" ]]; then
        # echo "Skipping $file_path (already .$target_fmt)"
        return 0
    fi

    # Determine if conversion is needed and possible
    if [[ "$target_fmt" == "webp" ]]; then
        # Target is WebP
        if [[ "$input_ext_lower" == "svg" ]]; then
            # SVG -> WebP (use ImageMagick)
            eligible_for_conversion=1
            convert_using_imagemagick "$file_path" "$target_fmt" || conversion_errors=$((conversion_errors + 1))
        elif [[ "$input_ext_lower" =~ ^(jpe?g|png|gif|bmp|tiff?)$ ]]; then
            # Raster -> WebP (use cwebp)
             eligible_for_conversion=1
            convert_raster_to_webp_cwebp "$file_path" || conversion_errors=$((conversion_errors + 1))
        else
            # Other input types (including .webp) are skipped when target is webp
            # echo "Skipping $file_path (unsupported source for -> WebP or already WebP)"
            return 0
        fi
    else
        # Target is NOT WebP (e.g., jpg, png)
        if [[ "$input_ext_lower" =~ ^(jpe?g|png|gif|bmp|tiff?|svg|webp)$ ]]; then
             # Any supported input -> Other Raster (use ImageMagick)
             eligible_for_conversion=1
             convert_using_imagemagick "$file_path" "$target_fmt" || conversion_errors=$((conversion_errors + 1))
        else
             # Unsupported input type for this target
             # echo "Skipping $file_path (unsupported source for -> $target_fmt)"
             return 0
        fi
    fi

    # Increment processed count only if conversion was attempted
    if [ "$eligible_for_conversion" -eq 1 ]; then
         files_processed=$((files_processed + 1))
    fi

    return 0 # Return success from process_file itself, errors are tracked globally
}


# Enable case-insensitive globbing and handle no matches gracefully
shopt -s extglob nocaseglob nullglob

if [ -d "$input_path" ]; then
    echo "Processing directory: $input_path"
    echo "Target format: $target_format"
    [ "$target_format" != "webp" ] && echo "SVG Rasterization Density: $SVG_DENSITY DPI"
    echo "----------------------------"

    # Use find for robust recursive searching for all potentially relevant files
    find "$input_path" -type f \( -iname \*.jpg -o -iname \*.jpeg -o -iname \*.png -o -iname \*.gif -o -iname \*.bmp -o -iname \*.tif -o -iname \*.tiff -o -iname \*.svg -o -iname \*.webp \) -print0 | while IFS= read -r -d $'\0' file; do
        process_file "$file" "$target_format"
    done

    if [ "$files_processed" -eq 0 ] && [ "$conversion_errors" -eq 0 ]; then
         echo "No eligible files found or processed in $input_path."
         # Don't exit with error code 2 if errors occurred during processing attempts
         # Let the final status check handle exit code based on errors.
    fi

    echo "----------------------------"
    echo "Directory processing complete!"

elif [ -f "$input_path" ]; then
    echo "Processing file: $input_path"
    echo "Target format: $target_format"
    input_ext_lower=$(echo "${input_path##*.}" | tr '[:upper:]' '[:lower:]')
    if [[ "$input_ext_lower" == "svg" ]]; then
        echo "SVG Rasterization Density: $SVG_DENSITY DPI"
    fi
    echo "----------------------------"
    process_file "$input_path" "$target_format"
    echo "----------------------------"
    echo "File processing complete!"
else
    echo "Error: Input path is neither a file nor a directory: $input_path"
    shopt -u extglob nocaseglob nullglob # Disable options
    exit 1
fi

# Disable options
shopt -u extglob nocaseglob nullglob

# Final status
if [ "$conversion_errors" -gt 0 ]; then
    echo "Completed with $conversion_errors errors."
    exit 1
elif [ "$files_processed" -gt 0 ]; then
    echo "Processed $files_processed files successfully."
    exit 0
else
    # No errors, but also no files processed (likely none were eligible)
    echo "No eligible files were processed."
    exit 2 # Exit code indicating nothing was done
fi