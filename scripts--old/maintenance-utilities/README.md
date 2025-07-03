# Maintenance & Utilities Scripts

Shell scripts for system maintenance, cleanup, and batch operations.

## Scripts Overview

### `clean-restaurant-library.sh`
**Purpose**: Clean up image library and remove unused or problematic files.

**Usage**:
```bash
./clean-restaurant-library.sh [--dry-run] [--verbose]
```

**What it does**:
- Removes broken symlinks and corrupted files
- Deletes empty directories in image library
- Cleans up temporary files and cache
- Removes files with invalid extensions
- Standardizes file permissions
- Provides detailed cleanup reports

### `execute-categorization.sh`
**Purpose**: Batch image categorization process with error handling.

**Usage**:
```bash
./execute-categorization.sh [source-directory] [--parallel]
```

**What it does**:
- Runs image categorization across multiple directories
- Handles large batches with progress tracking
- Provides error recovery and resume capability
- Supports parallel processing for speed
- Logs all operations for audit trail
- Validates categorization results

### `fix-misnamed-images.sh`
**Purpose**: Fix image naming conventions and standardize filenames.

**Usage**:
```bash
./fix-misnamed-images.sh [directory] [--rename] [--report-only]
```

**What it does**:
- Detects non-standard filename patterns
- Converts spaces to hyphens in filenames
- Removes special characters and unicode
- Standardizes file extensions (JPEG → jpg)
- Handles case sensitivity issues
- Provides before/after rename reports

### `remove-duplicates.sh`
**Purpose**: Remove duplicate images from library with advanced detection.

**Usage**:
```bash
./remove-duplicates.sh [--aggressive] [--keep-newest] [--interactive]
```

**What it does**:
- Uses multiple algorithms for duplicate detection
- Compares file content, not just names
- Handles similar images with different compression
- Preserves highest quality versions
- Supports interactive review and approval
- Maintains detailed deletion logs

## Maintenance Schedule

### Daily Maintenance
```bash
# Quick library health check
./clean-restaurant-library.sh --dry-run

# Fix any naming issues
./fix-misnamed-images.sh images/ --report-only
```

### Weekly Maintenance
```bash
# Full library cleanup
./clean-restaurant-library.sh --verbose

# Categorize new images
./execute-categorization.sh images/new/

# Remove duplicates
./remove-duplicates.sh --keep-newest --interactive
```

### Monthly Maintenance
```bash
# Comprehensive duplicate removal
./remove-duplicates.sh --aggressive

# Full library reorganization
./execute-categorization.sh images/ --parallel

# Complete cleanup and optimization
./clean-restaurant-library.sh
```

## Safety Features

### Backup & Recovery
- All scripts create backups before major operations
- Dry-run modes available for testing
- Detailed logs maintained for all operations
- Recovery procedures documented

### Error Handling
- Graceful failure with rollback capability
- Progress tracking for long operations
- Resume functionality for interrupted processes
- Comprehensive error reporting

## Integration Notes

These utilities support the main workflow:
- Run before major image operations
- Maintain library health and performance
- Support automated cleanup schedules
- Integrate with monitoring and alerting

## Usage Examples

### Safe Library Cleanup
```bash
# Preview cleanup operations
./clean-restaurant-library.sh --dry-run --verbose

# Execute cleanup if preview looks good
./clean-restaurant-library.sh --verbose
```

### Batch Image Processing
```bash
# Categorize large image collection
./execute-categorization.sh /path/to/new/images/ --parallel

# Fix naming issues
./fix-misnamed-images.sh images/ --rename

# Remove duplicates interactively
./remove-duplicates.sh --interactive
```

### Automated Maintenance
```bash
# Create maintenance script
#!/bin/bash
./clean-restaurant-library.sh
./fix-misnamed-images.sh images/ --rename
./remove-duplicates.sh --keep-newest
./execute-categorization.sh images/uncategorized/
```

## Performance Considerations

- Scripts optimized for large image libraries
- Parallel processing where appropriate
- Memory-efficient algorithms for duplicate detection
- Progress indicators for long-running operations
- Configurable batch sizes for system resources