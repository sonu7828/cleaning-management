# Dashboard Redesign Constraints & Guidelines

## ⚠️ CRITICAL RULE: SHOW ONLY IMPLEMENTED FEATURES
When redesigning the dashboard based on the client's mockup screenshot, **DO NOT** display any metrics, modules, or buttons for features that are not implemented in this project. All data must be bound to the existing React AppContext states.

### 🟢 Allowed to Show (Present in Project)
- **Total Revenue & Payments** (From Payments/Invoices data)
- **Active AMC Contracts** (From Contracts data)
- **Pending Quotations** (From Quotations data)
- **Service Requests / Work Orders** (From Work Orders data)
- **Today's Schedule / Calendar** (From Work Orders/Scheduler data)
- **Top Customers / Client List** (From Clients data)
- **Leads & Quotations Pipelines** (From Leads/Quotes data)
- **Technicians & Drivers Count/Status** (From Technicians/Drivers/Vehicles data)
- **VAT / Taxes** (From Invoices/VAT data)

### 🔴 Prohibited / Must Replace (Not in Project)
- **No Waste Collection**: Remove all references to Waste Collection metrics (e.g., "4.2 Ton Collected"). Replace this bottom KPI with an existing metric like "Total Registered Customers" or "Pending Job Assignments".
- **No Expenses Module**: Remove "Add Expense" quick actions and "Pending Expenses" KPIs.
- **No Standalone Expenses/Tax Compliance Sidebars**: Keep layout limited to VAT and implemented routes.

---

## 🎨 APP THEME SPECIFICATIONS (WORKSTAIR LIGHT THEME)
The application has been fully transformed from its initial Dark theme to a highly compact, flat **Workstair Light Theme** matching the client's visual reference.

### 1. Color Palette
* **Sidebar**: Steel Blue (`#347AB7`) continuous layout. Active menu item is `#2A6496` with a solid white left stripe. Inactive items and icons are `#DBE9F6`. No border line separators.
* **Sidebar Brand Header**: Matches the blue background (`#347AB7`) with a premium, highly compact branding. To bypass Tailwind v2 JIT restrictions, we use inline styling: "TEAM ENVIRO" (style 15px, bold, white, uppercase) and "Cleaning Management" (style 9px, semibold, `#DBE9F6`, mixed case) with a clean sparkle icon and adjusted container paddings to prevent clipping.
* **Topbar/Header**: Pure white background (`#FFFFFF`) with Steel Blue text headings and soft gray bottom border (`#D1DDE5`).
* **Page Base**: Light blue/gray backdrop (`#EBF2F6`).
* **Panels/Cards**: Pure white background (`#FFFFFF`) with soft gray border (`#D1DDE5`).
* **Badges**: High contrast styling. E.g. Priority Medium has Orange-Red text (`#FF3709`) and semi-transparent orange background (`#FFBC8080`).

### 2. Layout & Typography Rules
* **Border Radius**: Forced to flat **4px** globally for cards, panels, buttons, inputs, and modals (via Tailwind `theme.borderRadius` mapping).
* **Typography**: `"Open Sans"`, sans-serif is default. All bold headings (weights 700/800/900) are reduced to weight **600** (Semibold) for flat ERP aesthetic.
* **Compact Density**: Margins, paddings, gaps, and space utilities are globally restricted (e.g. `p-6` to `p-8` reduced to `1rem` padding) to maximize data density.
* **Tables**: Strictly rendered as a white grid with internal boundaries (`1px solid #D1DDE5`) and light blue headers (`#E9F0F5` background, `#347AB7` text).
* **Sidebar Width & Scrollbar**: Set to compact **200px** layout. Nav menu scrollbar is completely hidden to prevent visual layout breaking.
* **Decorations**: All glassmorphism, blurs, linear gradients, and neon box-shadows are fully disabled.

### 3. Landing Page / Website Navbar
* **Navigation Links**: Text color must be slate-900/black (`#1e293b`) both normally and on hover. When hovered, the link background must show a soft highlight (`rgba(0, 0, 0, 0.05)`).
* **"Request Site Inspection" Primary Button**: Solid blue (`#347AB7`), white text (`#ffffff`), with dark blue hover (`#2a6496`) and click feedback (`#1d4b73`). Text must remain white on hover/click.
* **"Portal Login" Secondary Button**: Solid dark blue (`#2e6da4`), white text (`#ffffff`), with dark blue hover (`#245882`) and click feedback (`#1b4263`). Text must remain white on hover/click.

### 4. Landing Page Live Operations Previews
* **Style**: Redesigned all 5 preview mockup cards (Customer Activity Log, Daily Dispatch Board, Customer Profile, Operational Performance, Settings) into premium, high-contrast flat light cards.
* **Containers**: Solid white background (`bg-white`), Steel Blue border (`border-slate-200` mapping to `#D1DDE5`), and 4px border radius.
* **Header & Text**: Gray-blue headers (`bg-slate-50` / `#EBF2F6`) and dark slate-900 text (`#1E293B`) for absolute legibility.
* **Badges**: Updated to high-contrast light colors with deep dark text matching their status/trend dynamically (e.g. `In Progress` is `bg-blue-50 text-blue-700 border-blue-200`).

### 5. Landing Page Brand Steel Blue Background & Card Contrast
* **Brand Background**: The landing page page-base background remains the brand solid Steel Blue color (`bg-[#020617]` mapping to `#347AB7` via `globals.css` overrides) with darker semi-transparent navy overlays (`bg-[#06091d]/40`).
* **High Contrast Cards**: All operational preview mockups, timeline steps, modules, role-based access grids, and inquiry forms are rendered on pure white cards (`bg-white border border-slate-200 shadow-sm`) with 4px borders for maximum readability and flat visual layout contrast.
* **Section Heading Contrast**: Section headings render in high-contrast white title and light-blue (`text-blue-100`) subtitles to ensure absolute readability on the solid blue page backdrop.
* **Footer Logo**: Branding logo image removed from footer; high-contrast white footer title "Team Enviro" and light-blue links (`text-blue-100`) preserved on Steel Blue background.
