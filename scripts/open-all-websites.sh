#!/bin/bash

# Script to open all client project websites in the browser
# This script finds all index.html files in client-projects/*/generated/website/ directories

echo "🌐 Opening all client project websites..."
echo "========================================="

# Base directory for client projects
CLIENT_PROJECTS_DIR="/Users/tyler/p2/restaurant-website-business/client-projects"

# Counter for opened websites
count=0

# Find all index.html files in client projects
for project_dir in "$CLIENT_PROJECTS_DIR"/*; do
    if [ -d "$project_dir" ]; then
        project_name=$(basename "$project_dir")
        
        # Check for index.html in generated/website/ directory
        index_file="$project_dir/generated/website/index.html"
        
        if [ -f "$index_file" ]; then
            echo "📄 Opening: $project_name"
            echo "   File: $index_file"
            
            # Open the file in default browser
            open "$index_file"
            
            ((count++))
            
            # Small delay to avoid overwhelming the browser
            sleep 1
        else
            echo "⚠️  Skipping: $project_name (no index.html found at $index_file)"
        fi
    fi
done

echo "========================================="
echo "✅ Opened $count website(s) in browser"

# Also check for alternative locations (like website-fixed)
echo ""
echo "🔍 Checking for alternative website locations..."

for project_dir in "$CLIENT_PROJECTS_DIR"/*; do
    if [ -d "$project_dir" ]; then
        project_name=$(basename "$project_dir")
        
        # Check for alternative locations
        alt_locations=(
            "$project_dir/generated/website-fixed/index.html"
            "$project_dir/website/index.html"
            "$project_dir/generated/index.html"
        )
        
        for alt_file in "${alt_locations[@]}"; do
            if [ -f "$alt_file" ]; then
                echo "📄 Found alternative: $project_name"
                echo "   File: $alt_file"
                echo "   Would you like to open this? (y/n)"
                # Note: For automation, we'll just report it for now
            fi
        done
    fi
done

echo ""
echo "🎉 All websites opened! Check your browser tabs."