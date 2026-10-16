# StratKids — Kids Chess & Strategy Summer Camp Website Template
> **“Think. Play. Grow.”**

A premium, production-quality, marketplace-ready HTML5 website template engineered specifically for modern children's chess academies, youth strategy summer camps, and intellectual enrichment programs.

Developed with **HTML5**, **CSS3**, **Vanilla JavaScript**, and **Bootstrap 5**. Crafted to commercial ThemeForest / TemplateMonster elite author standards.

---

## 🌟 Brand Concept & Design System

StratKids merges the intellectual discipline of chess with the exuberant social energy of a modern summer adventure. It is designed to inspire **children** with game-inspired challenges, tactical puzzles, and achievement badges, while giving **parents** complete peace of mind through visible safety standards, structured curriculum breakdowns, and a dedicated **Parent Command Center**.

### Exact Brand Color Palette

| Color Role | Hex Code | Swatch Name | Strategic Usage |
| :--- | :--- | :--- | :--- |
| **Primary Brand Accent** | `#CA6180` | Berry Rose | Primary CTAs, active states, key milestone markers, important headings |
| **Secondary Brand Color** | `#9ED3DC` | Sky Aqua | Hero backgrounds, informational panels, card frames, calm structure |
| **Playful Highlight** | `#FEFD99` | Playful Yellow | Achievement badges, stars, chess highlights, high-energy accents |
| **Warm Accent** | `#FCB7C7` | Soft Pink | Camper activity cards, child-friendly touches, warm supporting highlights |
| **Neutral Text** | `#26333A` | Deep Charcoal Navy | High-contrast, WCAG AAA compliant body text |
| **Surface White** | `#FFFFFF` | Crisp White | Card surfaces, interactive modals, form inputs, clean canvas |

### Visual Balance Hierarchy
- **30%** `#FFFFFF` (Clean, uncluttered reading surfaces)
- **25%** `#9ED3DC` (Calm, friendly summer camp foundation)
- **20%** `#FEFD99` (Playful optimism and achievement badges)
- **15%** `#FCB7C7` (Youthful warmth and activity highlights)
- **10%** `#CA6180` (Sharp, distinctive brand identity and call-to-actions)

---

## 🎯 Global CTA Standards

Throughout the entire StratKids template ecosystem, call-to-actions strictly adhere to unified styling, animation, and hover interactions:

1. **Primary CTA (`.btn-strat-primary`)**:
   - **Background:** `#CA6180`
   - **Border:** `2px solid #CA6180`
   - **Text:** `#FFFFFF`, Font: *Baloo 2*, Bold (700)
   - **Hover Color:** `#B24F6C`
   - **Hover Animation:** `translateY(-3px) scale(1.02)` + subtle radial sheen sweep
   - **Border Radius:** Fully rounded pill (`999px`)

2. **Secondary CTA (`.btn-strat-secondary`)**:
   - **Background:** `#9ED3DC`
   - **Border:** `2px solid #9ED3DC`
   - **Text:** `#174E58`, Font: *Baloo 2*, Bold (700)
   - **Hover Color:** `#86C5D0`
   - **Hover Animation:** `translateY(-3px) scale(1.02)`
   - **Border Radius:** Fully rounded pill (`999px`)

---

## 🚀 Key Functional Features

- **No Framework Dependencies:** Zero React, Vue, Angular, jQuery, or Node.js runtime required. Pure Vanilla JavaScript.
- **Twilight Chess Club Dark Mode:** Full dark mode with seamless system synchronization and `localStorage` persistence. Deep charcoal/navy palette (`#111A20` and `#19242D`).
- **Comprehensive RTL & LTR Support:** Bidirectional architecture via `dir="rtl"` and a dedicated `assets/css/rtl.css` covering mirrored chess boards, timelines, tables, and navbars.
- **Interactive Skill Progression Ladder:** Custom 5-tier progression track (*Beginner &rarr; Foundation &rarr; Intermediate &rarr; Advanced &rarr; Young Strategist*) with competency checklists, without relying on external chart libraries.
- **Family Parent Command Center:** Multi-camper switching (Leo & Maya Vance), real-time schedule timeline with status indicators, dismissal security PIN code, fee tracking ledger with demo payment simulation, and live coach chat simulator.
- **Interactive Multi-Step Enrollment Wizard:** 3-step registration workflow with live tuition and sibling discount calculator.
- **Filterable Catalogs:** Vanilla JS filtering on Programs (by age/skill), Schedule (by week/activity), Gallery (by category with lightbox), and Coaches (by role/specialty).
- **At Least 6–7 Content Segments Per Page:** Every single page contains rich, substantive, realistic copy—zero placeholder or lorem ipsum content.

---

## 📁 Project Structure

```
stratkids/
│
├── index.html                   # Home 1: Camp Adventure & Core Pillars
├── home-2.html                  # Home 2: Summer Game Board Layout
├── about.html                   # About: Philosophy, Safety & 4 Strategic Pillars
├── programs.html                # Programs: Age Divisions & 5-Tier Pathway
├── program-details.html         # Program Details: Little Thinkers (Ages 5–7)
├── schedule.html                # Schedule: 8-Week Master Calendar & Timeline
├── pricing.html                 # Pricing: Transparent Tuition, Sibling Credits & Calculator
├── camp-life.html               # Camp Life: Masterclasses, Tabletop Arena & Recess
├── gallery.html                 # Gallery: High-Resolution Camp Photo Grid & Lightbox
├── blog.html                    # Blog: Strategic Parenting, Tactics & Puzzles
├── blog-details.html            # Blog Details: Focus & Decision Making Editorial
├── contact.html                 # Contact: Campus Facilities, Tours & Inquiries
├── faqs.html                    # FAQs: Comprehensive Accordion & Camp Readiness
│
├── auth/
│   ├── login.html               # Parent Login with demo autofill & password toggle
│   ├── register.html            # Guardian & Camper Registration Form
│   └── forgot-password.html     # Security Password Reset Simulation
│
├── parent-dashboard/
│   ├── dashboard.html           # Command Center: Multi-child overview & metrics
│   ├── children.html            # My Children: Camper profile cards & Add Child modal
│   ├── child-profile.html       # Child Profile: Leo Vance tactical notes & health info
│   ├── enrollments.html         # Active & Past Summer Sessions & Transfer Modal
│   ├── skill-progress.html      # 5-Level Milestone Ladder & Badge Wall
│   ├── daily-schedule.html      # Real-Time Hourly Timetable & Dismissal PIN
│   ├── payments.html            # Tuition Ledger & Demo Payment Modal
│   ├── certificates.html        # Official Diplomas & Printable Preview Modal
│   ├── messages.html            # Camp Messenger & Live Coach Reply Simulator
│   └── profile.html             # Guardian Profile, Pickup Delegates & Notifications
│
├── utility/
│   ├── 404.html                 # “Checkmate! This Page Isn't Here” with Mini Puzzle
│   ├── coming-soon.html         # “A New Move is Coming” with Live JS Countdown
│   └── maintenance.html         # “Setting Up The Next Move” with Progress Bar
│
└── assets/
    ├── css/
    │   ├── style.css            # Core design system, tokens, identical CTAs & components
    │   ├── responsive.css       # Mobile-first breakpoint hardening (320px – 1920px)
    │   └── rtl.css              # Bidirectional RTL mirror styles
    ├── js/
    │   ├── main.js              # Sticky navbar, counters, scroll animations
    │   ├── theme.js             # Twilight Chess Club dark mode & storage
    │   ├── rtl.js               # Direction toggle & storage
    │   ├── programs.js          # Age & skill level filter
    │   ├── schedule.js          # Calendar & activity type filter
    │   ├── gallery.js           # Category filter & image lightbox modal
    │   ├── skills.js            # 5-tier progression DOM renderer
    │   ├── dashboard.js         # Multi-camper toggle, payment & chat simulator
    │   ├── enrollment.js        # 3-step registration wizard & tuition calculator
    │   └── forms.js             # Form validation & feedback toasts
    ├── icons/
    │   ├── logo.svg             # Custom StratKids vector brand logo
    │   └── favicon.svg          # Matching vector favicon mark
    └── images/                  # Categorized media directories
```

---

## 🛠️ Getting Started & Installation

No build steps, compilers, or package managers are required.

1. **Direct Browser Preview:**
   - Double-click `index.html` at the project root or open `stratkids/index.html` in any modern web browser (Google Chrome, Firefox, Safari, Microsoft Edge).

2. **Local HTTP Server (Recommended):**
   - Using VS Code: Right-click `index.html` and select **Open with Live Server**.
   - Using Python:
     ```bash
     python -m http.server 8000
     ```
   - Using Node:
     ```bash
     npx serve ./
     ```
   - Navigate to `http://localhost:8000`.

---

## ♿ Accessibility & SEO Compliance

- **Semantic HTML5:** Built strictly with `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
- **Heading Structure:** Strictly single `<h1>` per page with hierarchical `<h2>` and `<h3>` tags.
- **Contrast & Visibility:** WCAG AA/AAA compliant color contrast across both Light and Dark themes.
- **Screen Reader Support:** Accessible ARIA attributes (`aria-expanded`, `aria-label`, `role="tab"`, `role="dialog"`) across all interactive components.
- **Search Engine Optimization:** Unique `<title>`, `<meta name="description">`, OpenGraph ready meta tags, and descriptive `alt` text on all images.

---

## 📄 Credits & Third-Party Resources

- **CSS Framework Utilities:** [Bootstrap 5.3.3](https://getbootstrap.com/)
- **Iconography:** [Bootstrap Icons v1.11.3](https://icons.getbootstrap.com/)
- **Typography:** [Baloo 2](https://fonts.google.com/specimen/Baloo+2) and [Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans) via Google Fonts
- **Photography:** Unsplash (High-resolution, child-friendly chess camp, coaching, and recreational activity photography)

---

## ⚖️ License & Commercial Readiness

This template is developed for commercial distribution on digital marketplaces. All mockups, illustrations, logos, and scripts are 100% original, copyright-clean, and ready for deployment.

*© 2026 StratKids Summer Camp. “Think. Play. Grow.” All rights reserved.*
