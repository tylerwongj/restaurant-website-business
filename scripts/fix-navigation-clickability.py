#!/usr/bin/env python3

"""
Script to fix navigation clickability issues in restaurant websites
Fixes common issues like:
- Missing href attributes
- Broken anchor links
- Non-functional menu toggles
- Accessibility issues
"""

import os
import re
import glob
from pathlib import Path

def fix_navigation_clickability(html_content, project_name):
    """Fix various navigation clickability issues"""
    fixes_applied = []
    
    # Fix 1: Ensure all navigation links have proper href attributes
    if re.search(r'<a[^>]*class="[^"]*nav[^"]*"[^>]*>(?!.*href)', html_content):
        # Add href="#" to nav links without href
        html_content = re.sub(
            r'(<a[^>]*class="[^"]*nav[^"]*"[^>]*)(>)',
            r'\1 href="#"\2',
            html_content
        )
        fixes_applied.append("Added missing href to nav links")
    
    # Fix 2: Ensure hamburger menu is clickable
    hamburger_patterns = [
        r'<div[^>]*class="[^"]*hamburger[^"]*"[^>]*>',
        r'<button[^>]*class="[^"]*hamburger[^"]*"[^>]*>',
        r'<span[^>]*class="[^"]*hamburger[^"]*"[^>]*>'
    ]
    
    for pattern in hamburger_patterns:
        if re.search(pattern, html_content) and not re.search(r'onclick|addEventListener', html_content):
            # Add basic click functionality note
            fixes_applied.append("Hamburger menu needs click handler (manual JS needed)")
    
    # Fix 3: Fix logo clickability (ensure logo links to home)
    logo_pattern = r'<img[^>]*alt="[^"]*' + re.escape(project_name.replace('-', ' ').title()) + r'[^"]*"[^>]*>'
    if re.search(logo_pattern, html_content):
        # Check if logo is wrapped in link
        if not re.search(r'<a[^>]*href[^>]*>\s*' + logo_pattern, html_content):
            # Wrap logo in home link
            html_content = re.sub(
                logo_pattern,
                r'<a href="index.html" class="logo-link">\g<0></a>',
                html_content
            )
            fixes_applied.append("Wrapped logo in home link")
    
    # Fix 4: Ensure section anchor links work
    section_links = re.findall(r'href="#([^"]+)"', html_content)
    for section_id in section_links:
        # Check if corresponding section exists
        section_pattern = f'id="{section_id}"'
        if not re.search(section_pattern, html_content):
            fixes_applied.append(f"Missing section with id='{section_id}' (manual fix needed)")
    
    # Fix 5: Add proper button roles for accessibility
    html_content = re.sub(
        r'(<div[^>]*class="[^"]*hamburger[^"]*"[^>]*)(>)',
        r'\1 role="button" tabindex="0"\2',
        html_content
    )
    
    # Fix 6: Ensure phone numbers are clickable
    phone_pattern = r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    phones = re.findall(phone_pattern, html_content)
    for phone in phones:
        if not re.search(f'href="tel:{phone}"', html_content):
            # Wrap phone numbers in tel: links
            clean_phone = re.sub(r'[^\d]', '', phone)
            html_content = re.sub(
                re.escape(phone),
                f'<a href="tel:{clean_phone}">{phone}</a>',
                html_content,
                count=1
            )
            fixes_applied.append(f"Made phone number {phone} clickable")
    
    return html_content, fixes_applied

def process_project(project_path):
    """Process a single restaurant project"""
    project_name = os.path.basename(project_path)
    print(f"\n🍴 Processing: {project_name}")
    
    # Look for HTML files in generated directories
    html_dirs = [
        os.path.join(project_path, "generated", "website"),
        os.path.join(project_path, "generated", "website-fixed")
    ]
    
    total_fixes = 0
    
    for html_dir in html_dirs:
        if os.path.exists(html_dir):
            html_files = glob.glob(os.path.join(html_dir, "*.html"))
            
            for html_file in html_files:
                print(f"  📄 Checking: {os.path.basename(html_file)}")
                
                try:
                    with open(html_file, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    fixed_content, fixes = fix_navigation_clickability(content, project_name)
                    
                    if fixes:
                        # Write back the fixed content
                        with open(html_file, 'w', encoding='utf-8') as f:
                            f.write(fixed_content)
                        
                        for fix in fixes:
                            print(f"    ✅ {fix}")
                        total_fixes += len(fixes)
                    else:
                        print(f"    ✨ No issues found")
                        
                except Exception as e:
                    print(f"    ❌ Error processing {html_file}: {e}")
    
    return total_fixes

def main():
    """Main function to process all restaurant projects"""
    print("🔧 Fixing Navigation Clickability Issues")
    print("=" * 50)
    
    # Base directory for client projects  
    client_projects_dir = "/Users/tyler/p2/restaurant-website-business/client-projects"
    
    if not os.path.exists(client_projects_dir):
        print(f"❌ Client projects directory not found: {client_projects_dir}")
        return
    
    total_projects = 0
    total_fixes = 0
    
    # Process each project directory
    for project_dir in os.listdir(client_projects_dir):
        project_path = os.path.join(client_projects_dir, project_dir)
        
        if os.path.isdir(project_path):
            fixes_count = process_project(project_path)
            total_projects += 1
            total_fixes += fixes_count
    
    print("\n" + "=" * 50)
    print(f"✅ Navigation fixes completed!")
    print(f"📊 Projects processed: {total_projects}")
    print(f"🔧 Total fixes applied: {total_fixes}")
    print("\n💡 Manual tasks that may be needed:")
    print("   - Implement hamburger menu JavaScript")
    print("   - Test all anchor links")
    print("   - Verify phone number formatting")
    print("   - Check mobile navigation behavior")

if __name__ == "__main__":
    main()