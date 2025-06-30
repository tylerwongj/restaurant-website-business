#!/bin/bash

# Template population script for restaurant website business
# This script creates all missing template files by copying from base templates

echo "Starting template population..."

# Define base template directory
BASE_TEMPLATE="/Users/tyler/p2/restaurant-website-business/templates-untested/asian-fusion-v1"

# Define color schemes for different variations
declare -A COLOR_SCHEMES=(
    ["v1"]="#d32f2f #b71c1c #ff6f00 #fafafa #e0e0e0"
    ["v2"]="#388e3c #2e7d32 #66bb6a #f1f8e9 #c8e6c9"
    ["v3"]="#1976d2 #1565c0 #42a5f5 #e3f2fd #bbdefb"
    ["v4"]="#7b1fa2 #6a1b9a #ab47bc #f3e5f5 #ce93d8"
    ["v5"]="#37474f #263238 #546e7a #eceff1 #b0bec5"
    ["classic"]="#5d4037 #4e342e #8d6e63 #efebe9 #d7ccc8"
    ["elegant"]="#2c3e50 #34495e #95a5a6 #f8f9fa #ecf0f1"
    ["minimal"]="#607d8b #455a64 #90a4ae #fafafa #e0e0e0"
    ["modern"]="#795548 #5d4037 #a1887f #f3e5f5 #d7ccc8"
    ["vibrant"]="#e91e63 #c2185b #f48fb1 #fce4ec #f8bbd9"
)

# Function to create template files
create_template() {
    local template_dir="$1"
    local restaurant_type="$2"
    local variation="$3"
    
    echo "Creating template: $template_dir"
    
    # Copy base files
    cp "$BASE_TEMPLATE/index.html" "$template_dir/"
    cp "$BASE_TEMPLATE/styles.css" "$template_dir/"
    cp "$BASE_TEMPLATE/script.js" "$template_dir/"
    cp "$BASE_TEMPLATE/menu.html" "$template_dir/"
    
    # Customize restaurant type in HTML
    sed -i '' "s/Asian Fusion Restaurant/${restaurant_type}/g" "$template_dir/index.html"
    sed -i '' "s/Asian Fusion Restaurant/${restaurant_type}/g" "$template_dir/menu.html"
    
    # Apply color scheme if defined
    if [[ -n "${COLOR_SCHEMES[$variation]}" ]]; then
        IFS=' ' read -ra COLORS <<< "${COLOR_SCHEMES[$variation]}"
        sed -i '' "s/#d32f2f/${COLORS[0]}/g" "$template_dir/styles.css"
        sed -i '' "s/#b71c1c/${COLORS[1]}/g" "$template_dir/styles.css"
        sed -i '' "s/#ff6f00/${COLORS[2]}/g" "$template_dir/styles.css"
        sed -i '' "s/#fafafa/${COLORS[3]}/g" "$template_dir/styles.css"
        sed -i '' "s/#e0e0e0/${COLORS[4]}/g" "$template_dir/styles.css"
    fi
}

# Function to get variation name from directory name
get_variation() {
    local dir_name="$1"
    if [[ "$dir_name" == *"-v1" ]]; then echo "v1"
    elif [[ "$dir_name" == *"-v2" ]]; then echo "v2"
    elif [[ "$dir_name" == *"-v3" ]]; then echo "v3"
    elif [[ "$dir_name" == *"-v4" ]]; then echo "v4"
    elif [[ "$dir_name" == *"-v5" ]]; then echo "v5"
    elif [[ "$dir_name" == *"classic"* ]]; then echo "classic"
    elif [[ "$dir_name" == *"elegant"* ]]; then echo "elegant"
    elif [[ "$dir_name" == *"minimal"* ]]; then echo "minimal"
    elif [[ "$dir_name" == *"modern"* ]]; then echo "modern"
    elif [[ "$dir_name" == *"vibrant"* ]]; then echo "vibrant"
    else echo "v1"
    fi
}

# Function to get restaurant type from directory name
get_restaurant_type() {
    local dir_name="$1"
    if [[ "$dir_name" == bistro* ]]; then echo "Bistro Restaurant"
    elif [[ "$dir_name" == cafe* ]]; then echo "Café & Coffee Shop"
    elif [[ "$dir_name" == casual* ]]; then echo "Family Restaurant"
    elif [[ "$dir_name" == fast-casual* ]]; then echo "Fast Casual Restaurant"
    elif [[ "$dir_name" == fine-dining* ]]; then echo "Fine Dining Restaurant"
    elif [[ "$dir_name" == food-truck* ]]; then echo "Food Truck"
    elif [[ "$dir_name" == mexican* ]]; then echo "Mexican Restaurant"
    elif [[ "$dir_name" == pizza* ]]; then echo "Pizza Restaurant"
    elif [[ "$dir_name" == seafood* ]]; then echo "Seafood Restaurant"
    elif [[ "$dir_name" == sports-bar* ]]; then echo "Sports Bar & Grill"
    elif [[ "$dir_name" == steakhouse* ]]; then echo "Steakhouse"
    elif [[ "$dir_name" == sushi* ]]; then echo "Sushi Restaurant"
    else echo "Restaurant"
    fi
}

# List of empty directories to populate (excluding already completed ones)
EMPTY_DIRS=(
    "bistro-chic"
    "bistro-french"
    "cafe-bistro-v1"
    "cafe-bistro-v2"
    "cafe-bistro-v3"
    "cafe-bistro-v4"
    "cafe-bistro-v5"
    "cafe-modern"
    "cafe-v2"
    "casual-family-bright"
    "casual-family-cozy"
    "fast-casual-healthy"
    "fast-casual-minimal"
    "fast-casual-street"
    "fast-casual-trendy"
    "fast-casual-v4"
    "fast-casual-v5"
    "fast-casual-vibrant"
    "fine-dining-classic"
    "fine-dining-contemporary"
    "fine-dining-dark"
    "fine-dining-luxe"
    "fine-dining-v3"
    "fine-dining-v4"
    "fine-dining-v5"
    "mexican-v1"
    "mexican-v2"
    "mexican-v3"
    "mexican-v4"
    "mexican-v5"
    "pizza-italian-v1"
    "pizza-italian-v2"
    "pizza-italian-v3"
    "pizza-italian-v4"
    "pizza-italian-v5"
    "pizza-v2"
    "pizzeria-authentic"
    "pizzeria-modern"
    "seafood-v1"
    "seafood-v2"
    "seafood-v3"
    "seafood-v4"
    "seafood-v5"
    "sports-bar-v2"
    "steakhouse-classic"
    "steakhouse-v1"
    "steakhouse-v2"
    "steakhouse-v3"
    "steakhouse-v4"
    "steakhouse-v5"
)

# Create templates for each empty directory
for dir in "${EMPTY_DIRS[@]}"; do
    template_path="/Users/tyler/p2/restaurant-website-business/templates-untested/$dir"
    
    if [[ -d "$template_path" ]]; then
        # Check if directory is empty (no HTML files)
        if [[ ! -f "$template_path/index.html" ]]; then
            restaurant_type=$(get_restaurant_type "$dir")
            variation=$(get_variation "$dir")
            create_template "$template_path" "$restaurant_type" "$variation"
        else
            echo "Skipping $dir - already has files"
        fi
    else
        echo "Directory not found: $template_path"
    fi
done

echo "Template population completed!"
echo "Created templates for ${#EMPTY_DIRS[@]} restaurant types"