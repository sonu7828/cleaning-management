# TEAM ENVIRO CLEANING SERVICES
# Role-Based Access Control (RBAC) Specification

---

## 1. USER ROLES OVERVIEW

The system restricts data visibility and action execution based on 7 core roles. Every user is bound to a single role.

| Role | Operational Scope | Core Interface |
| :--- | :--- | :--- |
| **Admin** | Full system administration and financial auditing. | Administrator Dashboard |
| **Sales Team** | Leads acquisition, client onboarding, and quotation negotiation. | CRM & Quotations Dashboard |
| **Accounts Team** | Invoices, payments, VAT reporting, and credit tracking. | Financial Dashboard |
| **Service Manager** | Dispatching, calendar allocations, driver and technician routes. | Dispatch Board & Scheduler |
| **Technician** | Field service check-in, checklists, photos, and parts tracking. | Mobile Job Card View |
| **Driver** | Dispatch coordinates navigation, vehicle logs, fuel tracking. | Mobile Fleet Log View |
| **Customer** | Viewing quotations, downloading invoices, registering complaints. | Customer Web Portal |

---

## 2. GRANULAR PERMISSION MATRIX

* `C` = Create, `R` = Read, `U` = Update, `D` = Delete, `N` = No Access

| Module / Action | Admin | Sales Team | Accounts | Service Manager | Technician | Driver | Customer |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **User Settings & Config** | CRUD | N | N | N | N | N | N |
| **VAT / Tax Settings** | CRUD | R | CRUD | N | N | N | N |
| **Lead Management** | CRUD | CRUD | R | R | N | N | N |
| **Customer Directory** | CRUD | CRU | RU | RU | N | N | R (Self) |
| **Customer Documents** (e.g., Trade License) | CRUD | CRU | R | R | N | N | RU (Self) |
| **Quotations** (Create/Edit) | CRUD | CRU* | R | N | N | N | R (Self) |
| **Quotation Approval** (Sign/OTP) | CRUD | U | N | N | N | N | U (Self) |
| **AMC Contracts** | CRUD | CRU | R | RU (Read Coverages) | N | N | R (Self) |
| **Equipment coverage details** | CRUD | CRUD | R | R | R | N | R (Self) |
| **Service Scheduler Board** | CRUD | R | N | CRUD | N | N | N |
| **Technician Assignment** | CRUD | N | N | CRUD | R (View Own) | N | N |
| **Driver / Vehicle Assignment**| CRUD | N | N | CRUD | N | R (View Own) | N |
| **Driver Trip Parameters** (Odometer/Fuel) | CRUD | N | R (Fuel cost) | RU | N | RU (Own Trip) | N |
| **Job Checklist & Photos** | CRUD | R | N | RU | RU (Own Job) | N | R (Self) |
| **Spare Parts Allocation** | CRUD | R | R | R | RU (Deduct Stock) | N | N |
| **Invoices** | CRUD | R | CRUD | R | N | N | R (Self) |
| **Payments & Outstanding** | CRUD | R | CRUD | N | N | N | R (Self) |
| **Complaint Handling & SLA** | CRUD | CRU | R | CRUD | RU (Resolve) | N | CR (Self) |
| **Operational Reports** | CRUD | R | R | R | N | N | N |

*\* Sales Team cannot edit or delete a quotation once its status changes to `Approved` or `Expired`.*

---

## 3. ROLE-SPECIFIC PERMISSION RULES

### 3.1. ADMIN
* Ultimate control. Has bypass permissions to modify final configurations, unlock locked transactions (e.g. modify a Paid invoice), and delete records if required.
* Views system-wide audits and logins.

### 3.2. SALES TEAM
* Primary focused on customer acquisition and client profiles.
* Can upload files (Trade Licenses, Site plans).
* Cannot modify the pricing catalog or override the 5% VAT rate.
* Can create AMC contract records but cannot change the schedule dates or allocate vehicles.

### 3.3. ACCOUNTS TEAM
* Owns the financial flow. Can generate invoices, apply credit terms, record partial payments, and calculate monthly VAT statements.
* No permission to change dispatch teams or assign vehicles.
* Receives notifications when a job is marked "Completed" by technicians, indicating it is ready for invoice verification.

### 3.4. SERVICE MANAGER
* Owns the scheduler. Maps out routes by Emirate to optimize fuel and travel times.
* Manages complaints. Checks SLA response indicators to dispatch emergency repair technicians.
* Reviews driver odometer logs to monitor vehicle efficiency.

### 3.5. TECHNICIAN (MOBILE)
* Has access restricted entirely to their mobile portal.
* Sees only jobs assigned to them for today and history of their completed jobs.
* Must upload "Before Photos" before beginning work checklist.
* Logs materials used by searching the stock library.
* Captures client signature/OTP to confirm completion.

### 3.6. DRIVER (MOBILE)
* Sees vehicle registration number, assigned technician team, and destination GPS coordinates.
* Logs `Odometer Start/End` and inputs refueling costs (if any).

### 3.7. CUSTOMER PORTAL
* Secure login restricted only to the client's own history.
* Can view and sign quotations, track active AMC schedules, download invoice PDFs, and raise complaints.