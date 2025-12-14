# ER Tracking Dashboard Template

**Version:** v1.0.0-template
**Type:** Generic Boilerplate
**Last Updated:** 2025-12-13
**Source:** Derived from sepsis-dashboard v1.48.0-sepsis

---

## Overview

**Generic boilerplate for creating ER/ED clinical dashboards** with patient list and ER tracking board integration for Oracle Health Cerner MPages.

This template provides a proven, production-ready foundation with:
- ✅ **Patient List Functionality** - All 7 list types supported
- ✅ **ER Tracking Boards** - Direct ER census integration
- ✅ **Service Architecture** - Proven patterns from production
- ✅ **Demographics Display** - Clean 8-column patient info
- ✅ **Mock Data Framework** - Test without Cerner
- ✅ **12 Generic CCL Programs** - Reusable everywhere

**Use this template to create:** Mobility, Respiratory, Cardiac, or any ER/ED specialty dashboard

---

## What's Included

### 12 Generic CCL Programs (ALL REUSABLE)

**Core Utilities:**
- `1_cust_mp_gen_get_plists.prg` - Get patient lists
- `1_cust_mp_gen_get_pids.prg` - Get encounter IDs from list
- `1_cust_mp_gen_get_pdata.prg` - Get demographics (114 lines)
- `1_cust_mp_gen_user_info.prg` - Get user authentication
- `1_cust_mp_gen_get_er_encntrs.prg` - Get ER tracking board

**Patient List Types:**
- `1_cust_mp_plst_custom.prg`, `plst_provgrp.prg`, `plst_cteam.prg`, `plst_census.prg`, `plst_query.prg`, `plst_reltn.prg`, `plst_assign.prg`

### JavaScript Services (Production-Ready)

- PatientListService, UserInfoService, SendCclRequest, Config, VisualIndicators, XMLCclRequestSimulator, AdminCommands, main.js, PatientDataService

### UI Framework

- Handsontable v15.2.0, Font Awesome 6.5.1, Tippy.js v6.3.7, Eruda DevTools

### Current Display

8 Demographics Columns: Patient Name, Unit, Room/Bed, Age, Gender, Class, Admitted, Status

---

## How to Use This Template

### Quick Start (3 Steps):

**1. Copy Template**
```bash
cp -r er-tracking-dashboard-template mobility-dashboard
cd mobility-dashboard
```

**2. Extend CCL**
Copy `gen_get_pdata.prg` → `mob_get_pdata_01.prg`, add domain queries

**3. Add Columns**
Update `main.js` columns array with your clinical data

---

## Detailed Usage Guide

### For Mobility Dashboard:

**Step 1:** Copy and rename
**Step 2:** Extend `gen_get_pdata.prg` with mobility queries (fall risk, devices, PT/OT)
**Step 3:** Add mobility columns to main.js
**Step 4:** Update services to call `mob_get_pdata_01`
**Step 5:** Document and deploy

### For Respiratory Dashboard:

**Step 1:** Copy → `respiratory-dashboard`
**Step 2:** Extend with vent settings, O2, RT interventions
**Step 3:** Add respiratory columns
**Step 4:** Use `resp_get_pdata_01`
**Step 5:** Deploy

---

## What You DON'T Change

**These 12 generic CCL programs work for ANY dashboard:**
- All `gen_*` and `plst_*` programs
- Compile once in Cerner, use everywhere!

**Service architecture stays the same:**
- PatientListService.js - unchanged
- UserInfoService.js - unchanged
- SendCclRequest.js - unchanged
- Config.js - unchanged

---

## Architecture

**Data Flow:**
```
User selects patient list
    ↓
PatientListService.getPatientLists() [gen_get_plists]
    ↓
PatientListService.getPatientListPatients(listId)
    ↓
Step 1: gen_get_pids (get encounter IDs)
    ↓
Step 2: YOUR_get_pdata (get demographics + domain data)
    ↓
PatientDataService.processPatientData()
    ↓
Handsontable displays in table
```

**YOU only extend:** Step 2 (add domain queries to gen_get_pdata)

---

## Testing

**Simulator Mode Enabled** by default (`Config.js`)

```bash
# Open in browser
open src/web/index.html

# Mock data loads automatically
# Select "Demo Patient List A" or "Demo Patient List B"
# See 8 demographics columns

# Debug: Command+Shift+F
```

---

## Production Benefits

**Proven:** Based on sepsis-dashboard v1.48.0 (live in production)
**Fast:** Copy → Extend → Deploy (vs. build from scratch)
**Consistent:** Same UX across all clinical dashboards
**Maintainable:** Shared utilities, domain-specific extensions

---

## Example Dashboards from Template

**Created so far:**
- Sepsis Dashboard v1.48.0 (production)

**Ready to create:**
- Mobility Dashboard (from this template)
- Respiratory Dashboard (from this template)
- Cardiac Dashboard (from this template)

---

*Generic Boilerplate - Copy and Extend*
*12 Reusable CCL Utilities*
*Production-Proven Architecture*
