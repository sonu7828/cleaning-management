# TEAM ENVIRO CLEANING SERVICES
# Wireframe & User Interface Layout Structure

---

## 1. LANDING PAGE & HERO

The home landing screen for TEAM ENVIRO's internal operations team showcases live metrics and quick entry points.

```
+-----------------------------------------------------------------------------------+
|  [Logo] Team Enviro CRM/ERP   | CRM | Scheduling | Quotations | Billing | Profile |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|    TEAM ENVIRO CLEANING SERVICES OPERATIONS ERP                                    |
|    "Managing cleaning operations from Customer Inquiry to AMC Contract Renewal"    |
|                                                                                   |
|    [ + Create Lead ]    [ View Dispatch Board ]    [ Overdue Payment Analytics ]   |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  WORKFLOW TIMELINE:                                                               |
|  Customer -> Lead -> Quote -> Approved -> AMC Contract -> Schedule -> Job Card     |
+-----------------------------------------------------------------------------------+
```

---

## 2. CENTRAL ADMIN DASHBOARD

Contains high-level summary cards, operational updates, and SLA alerts.

```
+-----------------------------------------------------------------------------------+
|                                 ADMIN DASHBOARD                                   |
+-----------------------------------------------------------------------------------+
|  [ Active AMC ]   [ Expiring AMC ]  [ Pending Invoice ]  [ Services Due Today ]   |
|       142               12                  34                    18              |
|                                                                                   |
|  [ Open Complaints ] [ Tech Available ] [ Drivers Active ] [ Monthly Revenue ]     |
|        3                  28 / 32             8 / 10          AED 245,000         |
+-----------------------------------------------------------------------------------+
|  OPERATIONAL TIMELINES                        | SLA NOTIFICATIONS                 |
|  - Quote #1042 approved by Customer.          | [CRITICAL] AC Leakage Complaint    |
|  - Driver Saleem dispatched for Job #382.     | for Contract #AMC-2026-92. (SLA: 2h)|
|  - Technician checking-in at Villa 22.        |                                   |
+-----------------------------------------------------------------------------------+
```

---

## 3. DETAILED CUSTOMER PROFILE SCREEN

A master profile screen containing 10 tabs for full operational visibility.

```
+-----------------------------------------------------------------------------------+
|  CUSTOMER PROFILE: Al Ghurair Properties (ID: TEC-CUST-8022) | Status: [Active]    |
|  TRN: 100249204000003 | Customer Type: [Commercial] | Emirate: [Dubai]             |
+-----------------------------------------------------------------------------------+
| [Overview] [Jobs] [Invoices] [Payments] [Reminders] [Complaints] [Docs] [Comm]    |
| [Notes] [Timeline]                                                                |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [OVERVIEW TAB]                                                                   |
|  +-------------------------------------+---------------------------------------+  |
|  | Contact Person: John Doe            | Payment Terms: Credit - 30 Days       |  |
|  | Mobile: +971-50-1234567             | Total Invoiced: AED 120,000           |  |
|  | WhatsApp: +971-50-1234567           | Paid Amount:    AED 90,000            |  |
|  | GPS Coordinates: 25.2048, 55.2708   | Outstanding:    AED 30,000 [Overdue]  |  |
|  +-------------------------------------+---------------------------------------+  |
|                                                                                   |
|  [JOBS TAB]                                                                       |
|  - Job #3820 | Date: 2026-06-12 | Service: Water Tank Cleaning | Status: [Assigned] |
|  - Job #3712 | Date: 2026-05-12 | Service: Deep Cleaning       | Status: [Completed]|
|                                                                                   |
|  [INVOICES TAB]                                                                   |
|  - Inv #8402 | Date: 2026-05-12 | Amount: AED 5,250 (VAT incl) | Status: [Paid]     |
|  - Inv #8601 | Date: 2026-06-01 | Amount: AED 5,250 (VAT incl) | Status: [Overdue]  |
|                                                                                   |
|  [PAYMENTS TAB]                                                                   |
|  - Rec #4019 | Date: 2026-05-14 | Amount: AED 5,250 | Ref: Bank-Trsf-94022         |
|  - Advance Wallet Balance: AED 1,500                                              |
|                                                                                   |
|  [REMINDERS TAB]                                                                  |
|  - Payment Due Alert | Scheduled: 2026-06-08 (Email, WhatsApp)                    |
|  - Next AMC Visit    | Scheduled: 2026-06-12 (WhatsApp Alert)                     |
|                                                                                   |
|  [COMPLAINTS TAB]                                                                 |
|  - Comp #302 | Raised: 2026-05-20 | Type: AC Breakdown | Status: [Closed]         |
|                                                                                   |
|  [DOCUMENTS TAB]                                                                  |
|  - Trade_License.pdf   | Exp: 2026-12-31 | [Download] [Preview]                   |
|  - AMC_Contract_Signed.pdf               | [Download] [Preview]                   |
|                                                                                   |
|  [COMMUNICATION TAB]                                                              |
|  - 2026-05-30 11:30 | Call | Client requested timing change | Logged by: Admin    |
|  - 2026-05-12 09:00 | Mail | Invoice sent to accounts       | System Generated    |
|                                                                                   |
|  [NOTES TAB]                                                                      |
|  - "Villa gate code is #4029. Ask for security guard before parking."             |
|                                                                                   |
|  [TIMELINE TAB] (Audit Trail)                                                     |
|  [2026-06-01] Invoice generated -> [2026-05-20] Complaint resolved -> [2026-05-12]|
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 4. QUOTATION CREATION SYSTEM

Includes service pricing details, 5% VAT outputs, and conversion pathways.

```
+-----------------------------------------------------------------------------------+
|  CREATE QUOTATION                                    | Status: [Draft]            |
+-----------------------------------------------------------------------------------+
|  Customer Selection:                                                              |
|  [ Search existing customer...             [v] ]  [ + Quick Add Customer ]        |
|  Address / Location: Dubai Marina, Villa 14 | GPS: 25.0819, 55.1367               |
+-----------------------------------------------------------------------------------+
|  ITEMS TABLE                                                                      |
|  # | Service Selected  | Description            | Qty | Price (AED) | Disc | VAT  |
|  1 | AC Cleaning       | Coil & filter wash     |  4  |   250.00    |  10% |  5%  |
|  2 | Water Tank Disin. | Bacterial sanitization |  1  |   600.00    |  0   |  5%  |
|  [ + Add New Line ]                                                               |
+-----------------------------------------------------------------------------------+
|  Terms & Conditions:                                   | SUMMARY SIDEBAR          |
|  [ Standard Team Enviro T&C text...                ]   | Subtotal:  AED 1,500.00  |
|  Internal Instructions:                                | Discount:  AED   100.00  |
|  [ Access roof hatch for AC cleaning.              ]   | VAT (5%):  AED    70.00  |
|                                                        | Total:     AED 1,470.00  |
+-----------------------------------------------------------------------------------+
| [ Save Draft ]   [ Email PDF ]   [ Share WhatsApp ]   [ Convert to AMC Contract ] |
+-----------------------------------------------------------------------------------+
```

---

## 5. AMC CONTRACT CREATION SCREEN

Linked to quotation details and asset inventory coverages.

```
+-----------------------------------------------------------------------------------+
|  CREATE AMC CONTRACT                                                              |
+-----------------------------------------------------------------------------------+
|  Customer: Al Ghurair Properties    | Approved Quote Ref: [ TEC-QT-2026-1049  [v] ]|
|  Start Date: [ 2026-06-01 ]         | End Date:      [ 2027-05-31 ]               |
|  Billing Cycle: [ Quarterly    [v] ]| Service Freq:  [ Monthly             [v] ]|
|  Contract Amt:  AED 18,000.00       | Contract Type: [ Comprehensive       [v] ]|
+-----------------------------------------------------------------------------------+
|  EQUIPMENT / ASSET COVERAGE DETAILS                                               |
|  # | Equipment Name | Model No. | Serial No. | Qty | Location       | Status      |
|  1 | AC Split Unit  | LG-9000   | LG8401923  |  12 | Towers A & B   | [Working]   |
|  2 | Water Pump     | Grundfos  | GP2049102  |  2  | Basement Pump  | [Working]   |
|  [ + Add Equipment ]                                                              |
+-----------------------------------------------------------------------------------+
|  [ Create Contract & Pre-schedule 12 Visits ]                    [ Cancel ]       |
+-----------------------------------------------------------------------------------+
```

---

## 6. DISPATCH & SCHEDULING CALENDAR BOARD

Grid interface for assignment tracking.

```
+-----------------------------------------------------------------------------------+
|  DISPATCH BOARD | Date: 2026-06-01 | Emirate Filter: [ Dubai    [v] ]              |
+-----------------------------------------------------------------------------------+
| TIME  | TEAM LEADER       | ASSIGNED DRIVER   | VEHICLE    | VISIT / CUSTOMER     |
+-------+-------------------+-------------------+------------+----------------------+
| 08:00 | Kumar (Tech)      | Saleem (Driver)   | Van Plate-4| Al Ghurair Villa 22  |
| 10:30 | Anthony (Tech)    | John (Driver)     | Van Plate-7| Jumeirah Villa 8     |
| 13:00 | Kumar (Tech)      | Saleem (Driver)   | Van Plate-4| Marina Apartment 9B  |
+-------+-------------------+-------------------+------------+----------------------+
|  [Unscheduled Jobs Pool]                      | VEHICLE STATUSES                  |
|  - Client #802 (Deep Cleaning) - 3h           | - Van Plate-4: Active (Trip #2)   |
|  - Client #910 (Tank Cleaning) - 2h           | - Van Plate-7: Active (Trip #1)   |
|  - Complaint #302 (Breakdown)  - Emergency    | - Pickup Plate-1: Available       |
+-----------------------------------------------------------------------------------+
```

---

## 7. MOBILE FIELD WORKFLOWS (RESPONSIVE VIEW)

### 7.1. Driver Mobile Logger Screen
Used by drivers on-site to verify mileage and trip parameters.

```
+----------------------------------------+
|  DRIVERS APP  | Vehicle: Plate-4       |
+----------------------------------------+
|  Active Trip: Al Ghurair Villa 22      |
|  Client Coordinates: 25.2048, 55.2708  |
|  [ Click for Google Maps Navigation ]  |
+----------------------------------------+
|  Trip Start Parameters:                |
|  Odometer Start: [ 142050 ] km         |
|  Start Time:     [ 08:05 ]             |
|                                        |
|  Refueling cost: [ 50.00 ] AED         |
|  [ Upload Gas Receipt Camera ]         |
|                                        |
|  Trip End Parameters:                  |
|  Odometer End:   [ 142078 ] km         |
|  End Time:       [ 09:30 ]             |
+----------------------------------------+
|  [ START TRIP ]       [ COMPLETE TRIP ]|
+----------------------------------------+
```

### 7.2. Technician Mobile Checksheet Screen
Used by cleaning/maintenance technicians to submit evidence of completed tasks.

```
+----------------------------------------+
|  TECHNICIAN APP | Job ID: TEC-JOB-3820 |
+----------------------------------------+
|  Customer: Al Ghurair Villa 22         |
|  Service: AC Filter Deep Cleaning      |
+----------------------------------------+
|  [ Before Photos Upload ]              |
|  [ CAMERA: Take photo ]  (2 uploaded)  |
+----------------------------------------+
|  WORK CHECKLIST:                       |
|  [x] Clean AC Return Grilles           |
|  [x] Vacuum Drain Tray                 |
|  [x] Check Compressor Ampere           |
+----------------------------------------+
|  SPARE PARTS USED:                     |
|  [ Search inventory...              v] |
|  - LG Filter Foam (Qty: 2)             |
+----------------------------------------+
|  [ After Photos Upload ]               |
|  [ CAMERA: Take photo ]  (2 uploaded)  |
+----------------------------------------+
|  CLIENT SIGNATURE:                     |
|  +----------------------------------+  |
|  |                                  |  |
|  |             (Sign Here)          |  |
|  +----------------------------------+  |
|  Or OTP: [ 9402 ] (Verify Code)        |
+----------------------------------------+
|  [ CHECK-IN ]     [ SUBMIT JOB CARD ]  |
+----------------------------------------+
```