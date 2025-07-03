# Business Management Scripts

Client and project management tools for tracking status, billing, and revisions.

## Scripts Overview

### `business-manager.js`
**Purpose**: Comprehensive business tracking for client projects, billing, and revenue management.

**Usage**:
```bash
node business-manager.js <command> [options]

Commands:
  status <client-name> [new-status]     View/update client status
  note <client-name> "<note>"           Add note to client
  list                                  List all clients with summary
  invoice <client-name>                 Generate invoice
```

**Status Options**:
- `setup` - Initial project setup
- `dataCollection` - Gathering client information and assets
- `development` - Website development in progress
- `delivery` - Website completed and delivered
- `completed` - Project fully completed and paid

**What it does**:
- Tracks project phases and completion dates
- Manages billing information and payment status
- Handles revision tracking and additional charges
- Generates client invoices with itemized costs
- Provides business analytics and revenue reporting
- Maintains detailed client communication notes

**Examples**:
```bash
# View client status
node business-manager.js status "Mario's Italian"

# Update status and mark as paid
node business-manager.js status "Mario's Italian" delivery --paid

# Add client note
node business-manager.js note "Mario's Italian" "Client requested menu changes"

# List all clients with revenue summary
node business-manager.js list

# Generate invoice
node business-manager.js invoice "Mario's Italian" --due-days 14
```

### `track-revision.js`
**Purpose**: Manage revision requests, track billable work, and handle additional charges.

**Usage**:
```bash
node track-revision.js <command> <client-name> [options]

Commands:
  create <client-name> "<changes>"     Create new revision request
  update <client-name> <revision#>     Update revision status  
  list <client-name>                   List all revisions
```

**Revision Statuses**:
- `requested` - Initial request from client
- `in-progress` - Work in progress
- `completed` - Work finished, awaiting delivery
- `delivered` - Delivered to client
- `cancelled` - Request cancelled

**What it does**:
- Creates revision requests with automatic cost calculation
- Tracks billable vs. included revisions (first revision free)
- Estimates work hours based on change type
- Manages revision workflow and status updates
- Integrates with business billing system
- Provides revision history and analytics

**Examples**:
```bash
# Create new revision request
node track-revision.js create "Mario's Italian" "Change hero image, update menu prices"

# Update revision status
node track-revision.js update "Mario's Italian" 2 --status completed --hours 2.5

# List all revisions for client
node track-revision.js list "Mario's Italian"
```

## Business Rules & Billing

### Pricing Structure
- **Base Website**: $1,000 (negotiable to $800-900 minimum)
- **First Revision**: Included in base price
- **Additional Revisions**: $100 each
- **Rush Delivery**: Additional charges may apply

### Revision Billing
The system automatically handles:
- Free first revision (revision #1)
- $100 charge for subsequent revisions
- Time tracking and estimation
- Integration with invoice generation

### Project Phases
Standard workflow phases tracked:
1. **Setup** - Project initialization and contracts
2. **Data Collection** - Client information and asset gathering
3. **Development** - Website creation and customization
4. **Delivery** - Final package and handoff

### Revenue Tracking
Business analytics include:
- Total revenue collected vs. pending
- Average project value
- Revision revenue (additional charges)
- Client status distribution
- Monthly/quarterly revenue reports

## Integration Notes

These scripts integrate with the core workflow:
- Business status updates automatically from workflow scripts
- Revision tracking connects to delivery and billing
- Invoice generation pulls from project and revision data
- All business data stored in `client-projects/[client]/_business/`

## Data Structure

### Business Status (`_business/status.json`)
```json
{
  "client": { "name": "Client Name", "created": "2024-01-01" },
  "status": { "current": "delivery", "phases": {...} },
  "billing": { "basePrice": 1000, "paid": false, "revisions": {...} },
  "notes": [...]
}
```

### Revision Tracking (`revisions/revision-N/`)
- Individual folders for each revision
- Revision metadata and change tracking
- Delivery packages and client communication
- Time and cost tracking per revision