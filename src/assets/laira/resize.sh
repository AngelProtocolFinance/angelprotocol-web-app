#!/bin/bash

# Set target width
TARGET_WIDTH=500

# Create a temporary directory for processing
TEMP_DIR="/tmp/resize_temp_$$"
mkdir -p "$TEMP_DIR"

# Counter for processed images
processed=0
skipped=0

# Process each PNG file in the current directory
for img in *.png; do
    # Check if file exists and is readable
    if [ ! -r "$img" ]; then
        echo "Warning: Cannot read file $img, skipping..."
        continue
    fi
    
    # Get the filename
    filename=$(basename "$img")
    
    # Get current width
    width=$(identify -format "%w" "$img")
    
    if [ $? -ne 0 ]; then
        echo "Error: Cannot process $filename, skipping..."
        continue
    fi
    
    if [ $width -gt $TARGET_WIDTH ]; then
        echo "Resizing $filename (current width: $width px)..."
        
        # Resize the image while maintaining aspect ratio
        convert "$img" -resize "${TARGET_WIDTH}x>" "$TEMP_DIR/$filename"
        
        if [ $? -eq 0 ]; then
            # Move the resized image back to original location
            mv "$TEMP_DIR/$filename" "$img"
            processed=$((processed + 1))
            echo "✓ Successfully resized $filename"
        else
            echo "Error: Failed to resize $filename"
        fi
    else
        echo "Skipping $filename (width: $width px, already <= $TARGET_WIDTH)"
        skipped=$((skipped + 1))
    fi
done

# Clean up temporary directory
rm -rf "$TEMP_DIR"

# Print summary
echo -e "\nSummary:"
echo "Images processed: $processed"
echo "Images skipped: $skipped"