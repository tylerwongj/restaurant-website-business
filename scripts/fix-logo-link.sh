#!/bin/bash

# Script to fix logo links in client project HTML files
# This script ensures all logo img src paths are correct and clickable

echo "🔧 Fixing logo links in client projects..."
echo "========================================"

# Base directory for client projects
CLIENT_PROJECTS_DIR="/Users/tyler/p2/restaurant-website-business/client-projects"

# Counter for fixes
fixes_count=0

# Find all HTML files in client projects
for project_dir in "$CLIENT_PROJECTS_DIR"/*; do
    if [ -d "$project_dir" ]; then
        project_name=$(basename "$project_dir")
        echo "📁 Checking project: $project_name"
        
        # Check in generated/website/ directory
        website_dir="$project_dir/generated/website"
        if [ -d "$website_dir" ]; then
            for html_file in "$website_dir"/*.html; do
                if [ -f "$html_file" ]; then
                    echo "  📄 Checking: $(basename "$html_file")"
                    
                    # Fix logo src paths (ensure they point to images/logo.png)
                    if grep -q "src.*logo" "$html_file"; then
                        # Replace various logo path patterns with correct path
                        sed -i '' 's|src="[^"]*logo[^"]*"|src="images/logo.png"|g' "$html_file"
                        echo "    ✅ Fixed logo src paths"
                        ((fixes_count++))
                    fi
                    
                    # Ensure logo is clickable (wraps with home link)
                    if grep -q '<img[^>]*logo[^>]*>' "$html_file" && ! grep -B1 -A1 '<img[^>]*logo' "$html_file" | grep -q '<a.*href.*index.html'; then
                        # This is more complex - we'll note it for manual review
                        echo "    ⚠️  Logo may need clickable link wrapper (manual review needed)"
                    fi
                    
                    # Check if logo alt text is generic
                    if grep -q 'alt="[^"]*logo[^"]*"' "$html_file"; then
                        # Replace generic alt text with restaurant name
                        project_name_caps=$(echo "$project_name" | sed 's/-/ /g' | sed 's/\b\w/\U&/g')
                        sed -i '' "s|alt=\"[^\"]*logo[^\"]*\"|alt=\"$project_name_caps\"|g" "$html_file"
                        echo "    ✅ Fixed logo alt text"
                        ((fixes_count++))
                    fi
                fi
            done
        fi
        
        # Also check website-fixed directory if it exists
        website_fixed_dir="$project_dir/generated/website-fixed"
        if [ -d "$website_fixed_dir" ]; then
            echo "  📁 Also checking website-fixed directory..."
            for html_file in "$website_fixed_dir"/*.html; do
                if [ -f "$html_file" ]; then
                    echo "  📄 Checking: $(basename "$html_file")"
                    
                    # Same fixes for website-fixed
                    if grep -q "src.*logo" "$html_file"; then
                        sed -i '' 's|src="[^"]*logo[^"]*"|src="images/logo.png"|g' "$html_file"
                        echo "    ✅ Fixed logo src paths"
                        ((fixes_count++))
                    fi
                fi
            done
        fi
        
        echo ""
    fi
done

echo "========================================"
echo "✅ Logo link fixes completed!"
echo "📊 Total fixes applied: $fixes_count"
echo ""
echo "💡 Manual review recommended for:"
echo "   - Logo clickability (should link to home page)"
echo "   - Logo positioning and styling"
echo "   - Responsive logo behavior"