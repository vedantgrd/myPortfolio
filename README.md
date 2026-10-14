# 📖 VEDANT / UNFINISHED
> **The personal digital publication, living archive, and technical laboratory of Vedant Garud.**

🌐 **Live Website:** [garudvedantportfolio.vercel.app](https://garudvedantportfolio.vercel.app)  
🏛 **Institution:** Pillai College of Engineering, New Panvel  
🎓 **Specialization:** B.Tech in Information Technology (Information Security & Data Forensics)  
💼 **Industry Experience:** Backend Developer Intern at VFS Global, Mumbai (Jul 2024)  
📬 **Direct Transmission:** `vedantgarud05@gmail.com`

---

## 🌟 Philosophy & Creative Direction

Traditional portfolios say: *“Here are my skills, here are my projects, here is my résumé.”*  
**VEDANT / UNFINISHED** is conceived as entering someone’s world:
- **A life, in progress:** Software engineering and personal humanity belong to the same person. Neither is a side quest.
- **One Canonical Home per Piece of Content:** Every essay lives in Notebook; every project lives in Work; cultural works live in Taste; verified milestones live in Archive; the current chapter lives in Now. Other pages preview or reference canonical sources rather than duplicating them.
- **Personal, not corporate:** Real face, candid reflections on mental health (*So, Suicide.*), social responsibility (*Orphanage community visit*), cinema idols, and engineering failures (*Agridrone motor harmonics*).
- **Editorial, not monotonous:** High-contrast typography (Geist & Geist Mono), warm deep ink surfaces (`#0d0f12`), restrained vermilion accents (`#e1523d`), and tactile layout grids.
- **Deterministic, not arbitrary:** Daily quotes rotate deterministically with the calendar day; every listed skill connects directly to real project implementation evidence.

---

## 🗺 Information Architecture (Canonical Routes)

The portfolio is structured with clear, non-overlapping responsibilities:

| Route | Chapter / Purpose | Canonical Content & Function |
|---|---|---|
| `/` | **01 // Cover Trailer** | Editorial trailer with selected works, notebook preview, taste highlights, daily quote, and clear pathways to explore deeper. |
| `/work` | **02 // Work Exhibition** | Filterable project catalog (AI & Systems, Hardware & IoT, Security & Systems, Interactive & Games, Web Platforms). |
| `/work/[slug]` | **Case Studies** | In-depth case studies with architectural diagrams, problems, key decisions, what broke & how it was fixed, verified outcomes, and actual tech stack. |
| `/writing` | **03 // The Notebook** | Definitive destination for all published writing: personal essays (*So, Suicide.*, *Orphanage reflections*), cinema & culture, superheroes, and engineering postmortems. |
| `/writing/[slug]` | **Reading View** | Long-form reading experience, formatted code snippets, quote callout boxes, and previous/next navigation. |
| `/taste` | **04 // Taste & Influences** | Cultural archive: Top 4 formative films (*The Truman Show*, *Dead Poets Society*, *The Dark Knight*, *Spider-Man 2*), music songwriters (The Beatles, The Smiths, One Direction, Michael Jackson), and books (*Steve Jobs* by Walter Isaacson). |
| `/about` | **05 // Personal Narrative** | Narrative on why engineering, working principles, values, education timeline (PCE Panvel, VFS Global, VPM's Polytechnic), and verified résumé access. |
| `/archive` | **06 // The Archive** | Strictly factual chronology (2022–2026) documenting education, internships, hackathons (internal SIH round), and verified milestones linking to canonical sources. |
| `/now` | **07 // Right Now** | Public living snapshot of what Vedant is building, learning, consuming, and thinking about, featuring a **deterministic daily quotation** rotation. |
| `/lab` | **08 // The Living Laboratory** | **Bullwhip AI Simulator** (real-time demand oscillation chart & safety stock dampener), **CipherLab Cryptography Workbench** (Caesar, Vigenère, and Avalanche bit-flip tester), and **Project-Linked Skill Evidence Matrix**. |
| `/contact` | **09 // Direct Transmission** | One-click email copy with instant feedback, verified social links (GitHub, LinkedIn, X), and prefilled mail dispatch form. |

*(Note: `/cinema` permanently redirects to `/taste`; `/ordinary-days` redirects to `/archive`.)*

---

## 🔬 Featured Projects & Systems

1. **Vidyut (AI-First Student Success Platform)**
   - *Architecture:* Education DNA multi-dimensional student profile schema + deterministic hard-filtering heuristic pass (< 45ms) + verified application state machine.
   - *Tech:* Next.js 16, TypeScript, FastAPI, PostgreSQL, Tailwind CSS.

2. **Bullwhip AI (Supply Chain Multi-Agent System)**
   - *Architecture:* 4-echelon decentralized agent network (Retailer &rarr; Wholesaler &rarr; Distributor &rarr; Factory) dampening perishable food demand oscillations by ~34% using coordinated exponential signal smoothing.
   - *Tech:* Python, Discrete-Event Modeling, Recharts, TypeScript simulation runtime.

3. **Agriculture Drone / Agridrone (Hardware & Telemetry)**
   - *Architecture:* Custom quadcopter airframe with flight controller avionics, GPS hold, 433MHz serial radio bridge, and a high-contrast native Android ground station APK for localized crop inspection.
   - *Tech:* Android (Java), Python, MAVLink/Serial telemetry, Embedded microcontrollers.

4. **CipherLab (Applied Cryptography & Forensics)**
   - *Architecture:* Visual cryptanalysis suite covering classical ciphers, frequency analysis comparison against English standard distributions, and bit-level Avalanche Effect diffusion testing.
   - *Tech:* TypeScript, Recharts, SVG, Information Security algorithms.

5. **Pokémon RPG (2D Game Physics & State Machines)**
   - *Architecture:* Pygame delta-time game loop, AABB spatial tile collision slide vectoring, and isolated turn-based battle state machines.
   - *Tech:* Python 3, Pygame, Tiled.

6. **DevSprint (Hackathon Aggregator & Management Portal)**
   - *Architecture:* 3-tier web platform with normalized relational MySQL schema for event filtering, countdown timers, and admin review pipeline.
   - *Tech:* PHP, MySQL, JavaScript, Three.js, Figma.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router with Turbopack)
- **UI & Logic:** React 19, TypeScript 5.7
- **Styling:** Tailwind CSS 4 with `@tailwindcss/postcss`
- **Animations:** Framer Motion 12
- **Data Visualization:** Recharts 2.15 & Custom SVG
- **Icons:** Lucide React
- **Typography:** Geist & Geist Mono (via `next/font/google`)
- **Deployment:** Vercel

---

## 🚀 Running Locally

Clone the repository:
```bash
git clone https://github.com/vedantgrd/myPortfolio.git
cd myPortfolio
```

Install dependencies:
```bash
pnpm install
# or
npm install
```

Start the development server:
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:
```bash
npm run build
npm run start
```

---

## ✍️ How to Publish New Writing, Taste, or Milestones

### 1. Adding a New Article
Open `data/writing.ts` and add a new entry to the `articles` array. It will immediately appear in `/writing`, have its own shareable `/writing/[slug]` route, and be indexed automatically.

### 2. Updating Taste (Cinema, Music, Books)
Open `data/taste.ts` and append your favorite film, music artist, or book.

### 3. Adding a Milestone to Archive
Open `data/archive.ts` and append a factual milestone with date, summary, and canonical link to `/work/[slug]` or `/writing/[slug]`.

### 4. Updating What You Are Doing Right Now
Open `data/now.ts` and update `building`, `learning`, or `consuming`.

---

&copy; Vedant Garud. A life, in progress.
