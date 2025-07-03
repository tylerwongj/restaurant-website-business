# Core Workflow Scripts

Main automation scripts for the restaurant website development process.

## Scripts Overview

### `create-client.js`
**Purpose**: Initialize new client projects with complete folder structure and configuration templates.

**Usage**:
```bash
node create-client.js "Mario's Italian Kitchen" [template] [color-scheme]
node create-client.js --list-templates
node create-client.js --list-colors
```

**What it does**:
- Creates client project folder structure
- Generates client data template with placeholders
- Sets up project configuration (template, color scheme, settings)
- Initializes business tracking for billing and status
- Creates image requirements guide

### `generate-website.js`
**Purpose**: Generate complete websites from client data and templates with full customization.

**Usage**:
```bash
node generate-website.js "Client Name"
```

**What it does**:
- Loads client data and project configuration
- Copies and customizes template files with client information
- Replaces all placeholder variables ({{RESTAURANT_NAME}}, etc.)
- Processes and optimizes client images
- Applies selected color scheme
- Updates project and business status
- Validates output for common issues

### `validate-website.js`
**Purpose**: Comprehensive quality assurance and validation before delivery.

**Usage**:
```bash
node validate-website.js "Client Name" [--verbose] [--score-only]
```

**What it does**:
- Checks for unreplaced placeholder variables
- Validates required files and images exist
- Tests internal links and image sources
- Verifies client data completeness
- Checks mobile optimization features
- Validates SEO fundamentals (title, meta, headings)
- Tests performance basics (file sizes)
- Checks accessibility features
- Provides overall score and detailed report

### `package-delivery.js`
**Purpose**: Create final delivery packages with documentation and client guides.

**Usage**:
```bash
node package-delivery.js "Client Name" [--force]
```

**What it does**:
- Runs final quality assurance checks
- Creates comprehensive client documentation (setup guides, hosting instructions, maintenance tips)
- Packages website files and documentation into ZIP archive
- Updates business status to "delivery"
- Initializes revision tracking system
- Provides client handoff checklist

### `preview-server.js`
**Purpose**: Local development server for testing and previewing websites.

**Usage**:
```bash
node preview-server.js "Client Name" [--port 3000] [--open]
```

**What it does**:
- Serves generated website files locally
- Handles static assets (HTML, CSS, JS, images)
- Provides mobile-friendly testing environment
- Enables real-time preview during development
- Supports client demos and approval sessions
- Automatically opens browser when requested

## Workflow Integration

These scripts work together in sequence:

1. **`create-client.js`** - Project initialization
2. **`generate-website.js`** - Website creation
3. **`preview-server.js`** - Development testing
4. **`validate-website.js`** - Quality assurance
5. **`package-delivery.js`** - Final delivery

Each script updates project status and can be run independently or as part of the automated workflow.