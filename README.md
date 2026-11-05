# FindIt – Smart Lost & Found Portal 🎓🔍

> **A Modern, Student-First Web Application for Reporting, Tracking, and Recovering Misplaced Campus Belongings.**  
> *Developed as an Academic Web Technology Project using React.js, Vite, HTML5, CSS3, and Browser LocalStorage.*

---

## 📌 Project Overview & Introduction

**FindIt** is a smart, campus-oriented Lost & Found web portal engineered specifically for college students, faculty, and administrative staff. 

In every college or university, valuable items such as laptops, college identity cards, calculators, lecture notebooks, water bottles, bags, and earbuds are misplaced daily. Currently, students depend on fragmented WhatsApp groups, temporary Instagram stories, or paper notices on bulletin boards. 

**FindIt** solves this real-life campus dilemma by offering a centralized, intuitive, and responsive single-page web application where students can:
1. Immediately report lost items with descriptions, timestamps, campus locations, and photos.
2. Publish found items with secure custodian drop-off details (e.g., Security Gate or Library Desk).
3. Search and filter listings in real-time across categories and campus buildings.
4. Submit confidential ownership verification claims with proof to prevent fraudulent claims.
5. Track claim status (*Pending*, *Approved*, *Rejected*) with demonstration administrative controls for evaluation.

---

## 🎯 Problem Statement & Objectives

### The Problem
* **Fragmented Communication:** Lost items are broadcast across chaotic social media groups where messages get buried within hours.
* **Lack of Verification:** Finders have no reliable way to verify if a student claiming an expensive item (like wireless earbuds or a laptop) is truly the rightful owner.
* **No Persistence or Tracking:** Physical notice boards and WhatsApp chats offer no search, categorization, or status tracking.

### Project Objectives
* **Centralization:** Provide a single, accessible portal for the entire college community.
* **Instant Filtering:** Enable real-time multi-criteria filtering by category, campus location, and listing type (Lost vs. Found).
* **Secure Ownership Claims:** Incorporate an ownership claim mechanism where claimants must provide private identifying proof (e.g., lock screen wallpaper, internal stickers, contents, or serial numbers) before recovery.
* **Zero Cost & Zero External Dependencies:** Run entirely client-side using standard Web APIs (`localStorage`), eliminating the need for paid databases, backend servers, or API keys.
* **Beginner-Friendly Architecture:** Maintain clean, modular React component architecture that is easy to explain during college project evaluations and viva voce examinations.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **Landing Hero & Quick Search** | Dynamic hero section with prominent action buttons, search bar, and live campus statistics. |
| **Lost Item Reporting** | Interactive form with field validation, live image upload & preview, and auto-categorization. |
| **Found Item Reporting** | Structured reporting with custody notes (e.g. handed over to Security Post or Library Desk). |
| **Multi-Criteria Search & Filter** | Search by keyword, filter by 9 categories, filter by 10 campus locations, sort by date / A-Z. |
| **Detailed Item View** | High-resolution image preview, campus exchange safety guidelines, and reporter contact details. |
| **Ownership Claim System** | Secure claim submission with unique Claim ID (`CLM-XXXXX`) and required ownership proof. |
| **Fraud Prevention** | Strict validation prevents users from submitting claims on their own reported items. |
| **Claim Status Tracker** | Visual indicators for *Pending*, *Approved*, and *Rejected* claims with admin remarks. |
| **Demo Admin Control Panel** | Toggleable evaluation mode allowing the project evaluator to simulate approving/rejecting claims. |
| **My Reports Manager** | Personal dashboard to review reported listings, mark items as reunited, or delete listings. |
| **Image Compression** | Built-in HTML5 Canvas image compressor that optimizes uploads to prevent `localStorage` quota overflow. |
| **Sample College Data** | Pre-loaded with realistic college items (HP laptop, ID card, Math notebook, boAt earbuds, Casio calculator). |
| **Demo Data Reset** | One-click button in the footer to restore default sample items during viva demonstrations. |
| **Responsive UI/UX** | Mobile-first layout tested across desktops, laptops, tablets, and smartphones. |

---

## 🛠️ Technologies Used

* **HTML5:** Semantic document structure, accessible input types, and native canvas image processing.
* **CSS3:** Custom design system, CSS variables, Flexbox, CSS Grid layouts, and smooth micro-animations (no heavy CSS framework).
* **React.js (v18):** Functional components, React Hooks (`useState`, `useEffect`, `useMemo`), and component-driven architecture.
* **JavaScript (ES6+):** Modular syntax, async/await, Array methods, and Web Storage API.
* **Vite:** High-performance frontend tooling and rapid local development server.

---

## 📁 Project Folder Structure

```text
findit-portal/
├── index.html              # Main HTML entry point with meta tags & Google fonts
├── package.json            # Project dependencies and npm scripts
├── vite.config.js          # Vite configuration
├── .gitignore              # Git exclusions (node_modules, dist, logs)
├── README.md               # Complete project documentation
└── src/
    ├── main.jsx            # React root mount file
    ├── App.jsx             # Main application orchestrator & state manager
    ├── App.css             # Comprehensive CSS design system
    ├── index.css           # Global resets, CSS variables, and typography
    ├── data/
    │   ├── mockData.js     # Campus locations, categories, and initial sample items
    │   └── storage.js      # LocalStorage helper functions, compression & claim handlers
    ├── components/
    │   ├── Navbar.jsx      # Navigation header with active indicators & mobile menu
    │   ├── Footer.jsx      # Information footer, safe zone info & demo reset button
    │   ├── ItemCard.jsx    # Standardized card display for lost/found items
    │   ├── SearchBar.jsx   # Reusable search input with instant clear button
    │   ├── FilterSection.jsx # Multi-facet sidebar filter and sorting controls
    │   ├── ClaimModal.jsx  # Ownership claim submission dialog
    │   ├── Toast.jsx       # Floating notification alert banner
    │   └── Icons.jsx       # Clean, lightweight inline SVG icon set
    └── pages/
        ├── Home.jsx        # Landing page with hero, live stats, categories & how it works
        ├── Items.jsx       # Dedicated directory of all Lost & Found items
        ├── ItemDetails.jsx # Detailed single-item inspection and claim trigger
        ├── ReportLost.jsx  # Form to post a misplaced student item
        ├── ReportFound.jsx # Form to post a found article with custody details
        ├── MyClaims.jsx    # Claim tracking table with Demo Admin evaluation controls
        ├── MyReports.jsx   # Personal management of reported items & deletion
        └── About.jsx       # Problem statement, safe exchange points & project FAQs
```

---

## 💾 LocalStorage Data Persistence Explained

Since this is an academic frontend project requiring zero recurring costs and no complex database setup:
* **Storage Keys:**
  * `findit_items_v1`: Stores an array of lost and found listings.
  * `findit_claims_v1`: Stores submitted ownership claims and admin evaluation decisions.
* **Persistence:** All changes (new reports, claim submissions, status changes, deletions) are instantly synchronized to the browser's `localStorage` and persist across page refreshes.
* **Image Handling:** Uploaded images are resized in memory via HTML5 `<canvas>` and encoded as lightweight JPEG base64 strings (max 800px width), ensuring storage remains well within the browser's 5MB quota.
* **Privacy & Isolation:** Data is stored locally in the specific browser profile and is not shared with external servers.

---

## 💻 Installation & Localhost Setup

### Prerequisites
Make sure **Node.js** (v18 or higher) and **npm** are installed on your computer.

### Step-by-Step Instructions

1. **Open your terminal / command prompt** and navigate to the project directory:
   ```bash
   cd findit-portal
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in your web browser:**
   ```text
   http://localhost:5173
   ```

5. **Build for Production (Optional):**
   ```bash
   npm run build
   ```

---

## 🎓 Viva Voce & Evaluation Guide

When presenting this project during practical exams or evaluation:
1. **Explain the Architecture:** "We organized the code into modular directories: `components/` for reusable elements like `ItemCard` and `FilterSection`, `pages/` for view routing, and `data/` for local storage persistence and initial demo data."
2. **Demonstrate State Flow:** "The application uses React `useState` and `useEffect` in `App.jsx` as a single source of truth. When a student reports an item, `storage.js` updates `localStorage`, and the React state automatically triggers a re-render across the Directory and My Reports."
3. **Show the Filter System:** Highlight how `useMemo` in `Items.jsx` combines keyword search, category dropdown, campus location dropdown, and sorting criteria concurrently without mutating original data.
4. **Demonstrate Claim Verification:** Open a Found item (e.g. *Casio Scientific Calculator*), submit a claim with specific proof, navigate to **Track Claims**, and use the **Demo Evaluator Admin Mode** to show how campus administrators can transition the claim from *Pending* to *Approved*.

---

## 🔮 Future Enhancements

* **College LDAP / SSO Authentication:** Integrate with institutional single-sign-on (Google Workspace / Microsoft 365) to restrict reporting exclusively to registered students and staff.
* **Automated Image Feature Matching:** Implement computer vision to automatically detect matching lost and found items based on uploaded photo similarity.
* **Automated Email / SMS Notifications:** Send transactional alerts when an item matching a lost report's description is found on campus.
* **QR Code Property Tags:** Allow students to generate FindIt QR stickers for laptops and water bottles that reveal contact info when scanned.

---

## 📄 License
This project is created for educational and academic evaluation purposes. Open-source and free to adapt for college tech showcases.
