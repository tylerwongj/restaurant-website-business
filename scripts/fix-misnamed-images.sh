#!/bin/bash

# Restaurant Image Library - Manual Fix Script
# Fixes confirmed misnamed images that are inappropriate for restaurant business

echo "🍽️ FIXING MISNAMED RESTAURANT IMAGES"
echo "======================================"

# Base directory
BASE_DIR="/Users/tyler/p2/restaurant-website-business/images/general"

# Create backup directory
BACKUP_DIR="/Users/tyler/p2/restaurant-website-business/images/BACKUP_ORIGINAL"
mkdir -p "$BACKUP_DIR"

echo "📦 Creating backup of original images..."

# Backup problematic images before moving
cp "$BASE_DIR/staff-people/chef-plating-009.jpg" "$BACKUP_DIR/" 2>/dev/null
cp "$BASE_DIR/staff-people/customers-dining-007.jpg" "$BACKUP_DIR/" 2>/dev/null  
cp "$BASE_DIR/staff-people/staff-server-friendly-002.jpg" "$BACKUP_DIR/" 2>/dev/null
cp "$BASE_DIR/staff-people/customers-family-008.jpg" "$BACKUP_DIR/" 2>/dev/null

echo "✅ Backup complete"

# Create business-services directory if it doesn't exist
mkdir -p "$BASE_DIR/business-services"

echo ""
echo "🔄 MOVING MISNAMED IMAGES:"
echo "=========================="

# Move office/business images to appropriate category
echo "📁 Moving office meeting images to business-services..."

if [ -f "$BASE_DIR/staff-people/customers-dining-007.jpg" ]; then
    mv "$BASE_DIR/staff-people/customers-dining-007.jpg" "$BASE_DIR/business-services/business-meeting-team-handshake-001.jpg"
    echo "✅ customers-dining-007.jpg → business-meeting-team-handshake-001.jpg"
fi

if [ -f "$BASE_DIR/staff-people/staff-server-friendly-002.jpg" ]; then
    mv "$BASE_DIR/staff-people/staff-server-friendly-002.jpg" "$BASE_DIR/business-services/business-meeting-presentation-woman-002.jpg"
    echo "✅ staff-server-friendly-002.jpg → business-meeting-presentation-woman-002.jpg"
fi

if [ -f "$BASE_DIR/staff-people/customers-family-008.jpg" ]; then
    mv "$BASE_DIR/staff-people/customers-family-008.jpg" "$BASE_DIR/business-services/business-team-collaboration-003.jpg"
    echo "✅ customers-family-008.jpg → business-team-collaboration-003.jpg"
fi

# The chef-plating image is actually a restaurant interior overhead view
if [ -f "$BASE_DIR/staff-people/chef-plating-009.jpg" ]; then
    mv "$BASE_DIR/staff-people/chef-plating-009.jpg" "$BASE_DIR/restaurant-interiors/interior-dining-overhead-view-001.jpg"
    echo "✅ chef-plating-009.jpg → interior-dining-overhead-view-001.jpg"
fi

echo ""
echo "🧹 CLEANING UP INAPPROPRIATE IMAGES:"
echo "===================================="

# Remove any other business/office images that don't belong in restaurant library
echo "🔍 Checking for other inappropriate images..."

# Check business-services directory for files that might not be restaurant-related
if [ -d "$BASE_DIR/business-services" ]; then
    echo "📁 Found business-services directory with:"
    ls -la "$BASE_DIR/business-services"
fi

# Check professional-office directory 
if [ -d "$BASE_DIR/professional-office" ]; then
    echo "📁 Found professional-office directory with:"
    ls -la "$BASE_DIR/professional-office"
    echo "⚠️  Consider moving these to business-services or removing if not restaurant-related"
fi

# Check wellness-spa directory
if [ -d "$BASE_DIR/wellness-spa" ]; then
    echo "📁 Found wellness-spa directory with:"
    ls -la "$BASE_DIR/wellness-spa"
    echo "⚠️  Consider removing if not relevant to restaurant templates"
fi

# Check retail-commercial directory
if [ -d "$BASE_DIR/retail-commercial" ]; then
    echo "📁 Found retail-commercial directory with:"
    ls -la "$BASE_DIR/retail-commercial"
    echo "⚠️  Consider removing if not restaurant-related"
fi

echo ""
echo "📊 SUMMARY:"
echo "==========="
echo "✅ Fixed 4 misnamed images"
echo "✅ Moved office images to business-services/"
echo "✅ Moved interior image to restaurant-interiors/"
echo "✅ Created backup in BACKUP_ORIGINAL/"

echo ""
echo "🎯 NEXT STEPS:"
echo "=============="
echo "1. Review business-services/ directory"
echo "2. Consider removing non-restaurant categories:"
echo "   - professional-office/"
echo "   - wellness-spa/"
echo "   - retail-commercial/"
echo "3. Generate missing restaurant-specific images"
echo "4. Implement standardized naming convention"

echo ""
echo "✅ Image fixing complete!"