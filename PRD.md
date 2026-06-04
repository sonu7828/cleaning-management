# TEAM ENVIRO CLEANING SERVICES
# Operations Management System
# Product Requirement Document (PRD)

---

## 1. SYSTEM OVERVIEW

TEAM ENVIRO CLEANING SERVICES Operations Management System is an internal operational workflow system designed specifically for managing cleaning operations, AMC (Annual Maintenance Contract) services, quotations, scheduling, technician operations, fleet/vehicle tracking, invoicing, and customer workflows for a single company.

* **This is NOT a SaaS platform.**
* **This is an internal operational management system built specifically for TEAM ENVIRO CLEANING SERVICES (UAE-based operations).**

---

## 2. MAIN BUSINESS GOALS

* **Digitize Operations**: Centralize cleaning workflows from customer inquiry to quotation, scheduling, dispatching, field service completion, invoicing, payment tracking, and AMC renewals.
* **Paperless Coordination**: Enable digital verification in the field with technician photo uploads and customer signatures.
* **UAE Business Ready**: Native support for AED currency, 5% UAE VAT calculation, Tax Registration Numbers (TRN), and Emirate-based location management.

---

## 3. CORE MODULES & SPECIFICATIONS

### 3.1. CRM & CUSTOMER MANAGEMENT

A unified repository to track customer profiles, service agreements, billing statuses, and interaction histories.

#### A. Data Schema Fields
* **Basic Information**:
  * `Customer ID` (Auto-generated prefix e.g., TEC-CUST-XXXX)
  * `Customer Name` (Company name or individual name)
  * `Contact Person` (Primary contact name)
  * `Mobile Number` (UAE format e.g., +971-5X-XXXXXXX)
  * `WhatsApp Number` (For automated alerts and notifications)
  * `Email` & `Landline`
  * `Website`
  * `Customer Type` (Residential / Commercial / VIP)
  * `Industry` (For commercial clients e.g., Hospitality, Real Estate, Retail)
  * `VAT/TRN Number` (15-digit UAE Tax Registration Number)
  * `Status` (Active / Inactive / Blacklisted)
  * `Source` (Google, Referral, Social Media, Direct)
  * `Created Date`

* **Address & Location Details**:
  * `Country` (Default: United Arab Emirates)
  * `Emirate` (Dubai / Abu Dhabi / Sharjah / Ajman / Umm Al Quwain / Ras Al Khaimah / Fujairah)
  * `City` & `Landmark`
  * `Building Name` / `Office or Villa Number`
  * `Google Map Link` & `GPS Coordinates` (Latitude/Longitude for driver dispatch)

* **Category & Tags**:
  * Multiple labels: Residential, Commercial, VIP, Contract Customer, One-Time Customer, High Priority, Late Payment, Monthly Service, Annual Contract.

* **Financial Information**:
  * `Total Jobs Completed`
  * `Total Invoice Amount` & `Paid Amount`
  * `Pending Amount` (Outstanding balance)
  * `Last Payment Date`
  * `Payment Terms` (Cash, Credit-30 Days, Credit-60 Days, Advance)
  * `Credit Limit` (AED)
  * `Currency` (Default: AED)
  * `Partial Payment Tracking` & `Advance Balance`
  * `Refund Tracking`

* **Reminders & Due System**:
  * Service Due Alerts
  * Overdue Payment Reminders
  * Contract Renewal Reminders
  * Follow-up Logs

* **Document Management**:
  * Upload and preview files: Trade License (with expiry alerts), Contracts, Signed Agreements, Site Photos, Quotations, Invoices, Receipts.

---

### 3.2. QUOTATION MANAGEMENT

Streamlined generation, tracking, and approval of pricing offers.

#### A. Core Parameters
* **Quotation Fields**:
  * `Quotation Number` (Auto-generated prefix e.g., TEC-QT-YYYY-XXXX)
  * `Quotation Date` & `Valid Until` (Expiry tracking)
  * `Salesperson` (Linked staff account)
  * `Status` (Draft / Sent / Viewed / Approved / Rejected / Expired)

* **Customer Association**:
  * Ability to search and link an existing customer, or quickly create a new customer profile directly from the quotation screen.

* **Pricing & Services Table**:
  * `Item Name` / `Service Selection`
  * `Description`
  * `Quantity`
  * `Unit Price` (AED)
  * `Discount` (Percentage or flat AED)
  * `VAT` (Standard 5% UAE VAT applied per item or subtotal)
  * `Item Total` (Calculated as `(Qty * Unit Price - Discount) * 1.05`)

* **Price Summary**:
  * `Subtotal` (Excluding VAT)
  * `Discount Total`
  * `VAT Total` (5% calculation)
  * `Grand Total` (AED)

* **Terms, Notes & Attachments**:
  * Quotation validity period settings.
  * Payment terms definitions.
  * Special notes/instructions.
  * Site photos and technical drawings uploads.

* **Sharing & Customer Actions**:
  * Download PDF with custom company letterhead (including TRN and company details).
  * Direct email delivery tracking (Sent, Delivered, Viewed, Failed).
  * WhatsApp PDF sharing.
  * Customer digital signature capture or OTP validation for instant approval.

* **Conversion Workflow**:
  * Convert Approved Quotation into:
    1. **Invoice** (For immediate, one-time jobs)
    2. **Job Card / Service Visit** (For execution dispatch)
    3. **AMC Contract** (For long-term recurring agreements)

---

### 3.3. AMC CONTRACT MANAGEMENT

Manages long-term Annual Maintenance Agreements and recurring cleaning/maintenance schedules.

#### A. Contract Parameters
* **Contract Master Fields**:
  * `AMC Number` (Auto-generated prefix e.g., TEC-AMC-YYYY-XXXX)
  * `Contract Date`
  * `Customer Name` (Linked customer)
  * `Quotation Reference` (Linked approved quotation)
  * `Contract Type` (Comprehensive - includes spare parts / Non-Comprehensive - services only)
  * `Start Date` & `End Date`
  * `Billing Cycle` (Monthly / Quarterly / Semi-Annually / Yearly)
  * `Contract Amount` (Excluding VAT)
  * `VAT Amount` (5% UAE VAT)
  * `Total Amount` (AED)
  * `Payment Terms` (Advance, Credit, Installments)
  * `No. of Service Visits` (Total planned visits over contract duration)
  * `Service Frequency` (Weekly / Fortnightly / Monthly / Quarterly / Customized)
  * `Assigned Manager` (Operational coordinator)
  * `Status` (Active / Pending / Renewal Due / Expired)

* **Equipment / Asset Details**:
  * Track specific equipment covered under AMC at the customer premises:
    * `Equipment Name` (AC, CCTV, Generator, Water Tank, Grease Trap, etc.)
    * `Model Number` & `Serial Number`
    * `Quantity`
    * `Installation Date` & `Warranty Expiry`
    * `Site Location` (Specific room or floor)
    * `Equipment Status` (Working / Repair Needed)

* **Automatic AMC Invoicing**:
  * Automatically generate invoices based on the selected Billing Cycle (e.g., generating quarterly bills).

* **Renewal Management**:
  * Auto-expiry alert dashboard triggers notifications at 30, 15, and 7 days prior to AMC end.
  * Quick action to duplicate contract details into a "Renewal Quotation" with customized pricing.

---

### 3.4. SCHEDULING & DISPATCH BOARD

The coordinator interface to schedule visits and dispatch resources.

#### A. Core Parameters
* **Calendar Views**: Daily, Weekly, Monthly scheduler.
* **Automatic Visit Generation**:
  * Upon AMC activation, the system pre-populates all visits based on frequency (e.g., a monthly AMC automatically drafts 12 visits).
* **Double-Constraint Assignment**:
  * **Technician Assignment**: Allocate team leader/technicians and helper staff based on skill compatibility (e.g., water tank cleaning certificate).
  * **Fleet Allocation**: Assign driver, service vehicle, and helper tools.
* **Route Planning**: Optimized booking based on proximity (filtering jobs by Emirate/City coordinates).

---

### 3.5. DRIVER FLEET MANAGEMENT

Tracks vehicle utilization, trip expenses, and field dispatch status.

#### A. Data Schema Fields
* `Driver Name` (Linked employee profile)
* `Vehicle Number` (Plate registration)
* `Trip Start Time` & `Trip End Time`
* `Fuel Expense` (AED) (With receipt upload option)
* `Route Details` (Starting point to client GPS Coordinates)
* `Odometer Start` & `Odometer End` (Tracks mileage)
* `Vehicle Condition Remarks` (Cleanliness, tyre status)
* `Trip Status` (Not Started / Dispatched / Arrived / Completed)

---

### 3.6. TECHNICIAN FIELD OPERATIONS

Mobile-friendly field service interface for teams executing jobs on-site.

#### A. Core Parameters
* **Assigned Jobs Board**: Daily checklist format showing client details, timing, address, Google Maps routing.
* **Job Progress States**: Pending -> Checked-in -> Work-in-Progress -> Completed.
* **Work Verification (Proof of Service)**:
  * **Before Photos**: Mandatory uploads before starting work.
  * **Cheklist Completion**: Specific tasks checked off (e.g., filter cleaned, gas checked).
  * **Material / Spare Parts Tracking**: Search and list inventory items used during the job (deducts from central stock on submission).
  * **After Photos**: Mandatory uploads showing completed work.
  * **Client Verification**: Digital signature screen or SMS OTP verification.

---

### 3.7. INVOICE & PAYMENT MANAGEMENT

Manages cash flow, taxation, and outstanding balances.

#### A. Invoicing Schema
* **Invoice Fields**:
  * `Invoice Number` (Auto-generated prefix e.g., TEC-INV-YYYY-XXXX)
  * `Invoice Date` & `Due Date`
  * `AMC / Quotation Reference`
  * `Customer Details` & `TRN Number`
  * `Billing Period`
  * `Subtotal`, `Discount`, `VAT Total (5%)`, and `Grand Total` (AED)
  * `Paid Amount` & `Balance Outstanding`
  * `Payment Status` (Draft / Sent / Paid / Partially Paid / Overdue)

* **Features**:
  * Sharing via email PDF, WhatsApp, and printing.
  * Overdue invoice detection with automatic follow-up reminders.
  * Partial payment recording (allocating transaction IDs and payment dates).

---

### 3.8. COMPLAINT MANAGEMENT

Track, escalate, and resolve customer complaints under AMC or warranty.

#### A. Core Parameters
* `Complaint Number` (Auto-generated prefix e.g., TEC-COMP-XXXX)
* `Complaint Date` & `Linked AMC Contract / Job ID`
* `Customer Name`
* `Complaint Type` (Breakdown / Service Issue / Damage / Delay)
* `Priority` (Low / Medium / High / Emergency)
* `Assigned Operational Team` (Technicians & Driver)
* `SLA Response Time` (e.g., resolve within 4 hours for emergencies)
* `Resolution Notes` & `Parts Replaced`
* `Status` (Open / In Progress / Escalated / Resolved / Closed)

---

## 4. SYSTEM STYLING & AESTHETICS

The styling follows a professional, clean, operational ERP aesthetic:
* **Color Palette**: Harmonious dark mode (`#0B1120` backdrop) with slate accents, crisp white typography, and specialized status badges (emerald for Paid/Active, amber for Pending/Renewal, rose for Overdue/Rejected, indigo for Dispatched).
* **Typography**: Clean sans-serif font family (`Inter` or `Outfit`) for readable tabular grids and dashboard metrics.
* **Component Design**: Interactive hover cards, calendar dispatch grid with drag handlers, scrollable customer timelines, and simplified mobile layouts for field technicians.