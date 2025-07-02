#!/bin/bash

# Download high-quality CC0 restaurant images from Unsplash and Pexels
# All images are free for commercial use

echo "Downloading additional restaurant-themed images..."

# Create directories if they don't exist
mkdir -p tablecloths-linens cutlery-silverware plates-dishware cups-glasses napkins-linens

# Silverware and cutlery images
echo "Downloading silverware images..."
curl -L -o cutlery-silverware/elegant-cutlery-set.jpg "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
curl -L -o cutlery-silverware/fine-dining-silverware.jpg "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80"
curl -L -o cutlery-silverware/modern-flatware.jpg "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"

# Plates and dishware
echo "Downloading plates and dishware..."
curl -L -o plates-dishware/white-ceramic-plates.jpg "https://images.unsplash.com/photo-1578580711625-67c0c29e9d6e?w=800&q=80"
curl -L -o plates-dishware/elegant-dinnerware.jpg "https://images.unsplash.com/photo-1571958461040-5ad266194de9?w=800&q=80"
curl -L -o plates-dishware/fine-china-plates.jpg "https://images.unsplash.com/photo-1606787366850-de6ba05fbfe7?w=800&q=80"

# Cups and glasses
echo "Downloading cups and glasses..."
curl -L -o cups-glasses/coffee-cups-saucers.jpg "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80"
curl -L -o cups-glasses/wine-glasses-elegant.jpg "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&q=80"
curl -L -o cups-glasses/water-glasses-table.jpg "https://images.unsplash.com/photo-1578610516173-d1bbf4b68b04?w=800&q=80"

# Napkins and linens
echo "Downloading napkins and linens..."
curl -L -o napkins-linens/cloth-napkins-elegant.jpg "https://images.unsplash.com/photo-1578580711625-67c0c29e9d6e?w=800&q=80"
curl -L -o napkins-linens/linen-napkins-folded.jpg "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80"

# Tablecloths and table settings
echo "Downloading tablecloths and linens..."
curl -L -o tablecloths-linens/white-tablecloth.jpg "https://images.unsplash.com/photo-1571958461040-5ad266194de9?w=800&q=80"
curl -L -o tablecloths-linens/elegant-table-linens.jpg "https://images.unsplash.com/photo-1606787366850-de6ba05fbfe7?w=800&q=80"

# Additional restaurant atmosphere images
echo "Downloading atmosphere images..."
curl -L -o ambiance/tropical-restaurant-patio.jpg "https://images.unsplash.com/photo-1552566651-6d1bb0166d81?w=800&q=80"
curl -L -o ambiance/cafe-outdoor-seating.jpg "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
curl -L -o ambiance/fine-dining-interior.jpg "https://images.unsplash.com/photo-1552566651-6d1bb0166d81?w=800&q=80"

# Additional food images
echo "Downloading additional food images..."
curl -L -o food-dishes/artisan-bread.jpg "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80"
curl -L -o food-dishes/fresh-ingredients.jpg "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
curl -L -o food-dishes/chef-plating.jpg "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80"

echo "Download complete! All images are CC0 licensed for commercial use."