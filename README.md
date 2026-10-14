# 📖 VEDANT / UNFINISHED
> **The personal digital publication, engineering notebook, and technical laboratory of Vedant Garud.**

🌐 **Live Website:** [garudvedantportfolio.vercel.app](https://garudvedantportfolio.vercel.app)  
🏛 **Institution:** Pillai College of Engineering, New Panvel  
🎓 **Specialization:** B.Tech in Information Technology (Information Security & Data Forensics)  
💼 **Industry Experience:** Backend Developer Intern at VFS Global, Mumbai (Jul 2024)  
📬 **Direct Transmission:** `vedantgarud05@gmail.com`

---

## 🌟 Philosophy & Creative Direction

Traditional portfolios say: *“Here are my skills, here are my projects, here is my résumé.”*  
**VEDANT / UNFINISHED** is conceived as entering someone’s world:
- **Personal, not corporate:** Real face, candid reflections, failures, and curiosity rather than buzzwords.
- **Editorial, not monotonous:** High-contrast typography (Geist & Geist Mono), warm deep ink surfaces (`#0d0f12`), restrained vermilion accents (`#e1523d`), and tactile layout grids.
- **Technical, not soulless:** Interactive multi-agent supply chain simulations, dynamic cryptanalysis tools, and deterministic evaluation diagrams.
- **Authentic data only:** No arbitrary skill percentages (e.g. *“React: 95%”*). Every technology listed in the Lab connects directly to the project where it was actually implemented.

---

## 🗺 Information Architecture (Multi-Page)

The portfolio is structured as a multi-page publication with dedicated routes:

| Route | Chapter / Purpose | Key Highlights |
|---|---|---|
| `/` | **01 // Cover & Overview** | Editorial cover headline, real portrait photo, selected works exhibition, candid introduction, interactive Project Constellation, and recent notebook preview. |
| `/work` | **02 // Work Exhibition** | Filterable project catalog (AI & Systems, Hardware & IoT, Security & Systems, Interactive & Games, Web Platforms) with exhibition cards & compact archive table. |
| `/work/[slug]` | **Case Studies** | In-depth case studies with architectural diagrams, problems, key decisions, what broke & how it was fixed, verified outcomes, and actual tech stack. |
| `/writing` | **03 // The Notebook** | Independent publication with long-form essays, category tags, search filters, and reading time estimates. |
| `/writing/[slug]` | **Reading View** | Long-form reading experience, formatted code snippets, insight callout boxes, and previous/next navigation. |
| `/about` | **04 // About Vedant** | Personal narrative, authentic portrait, visual interactive timeline (Pillai College of Engineering, VFS Global, VPM's Polytechnic), engineering principles, and verified résumé access. |
| `/lab` | **05 // The Living Laboratory** | **Bullwhip AI Simulator** (real-time demand oscillation chart & safety stock dampener), **CipherLab Cryptography Workbench** (Caesar, Vigenère, and Avalanche bit-flip tester), and **Project-Linked Skill Evidence Matrix**. |
| `/contact` | **06 // Direct Transmission** | One-click email copy with instant feedback, verified social links (GitHub, LinkedIn, X), and prefilled mail dispatch form. |

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
pnpm build
pnpm start
```

---

## ✍️ How to Publish New Writing or Projects

### Adding a New Article
Open `data/writing.ts` and add a new entry to the `articles` array with:
```typescript
{
  slug: 'your-article-slug',
  title: 'Your Article Title',
  subtitle: 'An engaging subtitle or premise',
  date: 'Month Year',
  readTime: 'X min read',
  category: 'AI & Systems' | 'Hardware & IoT' | 'Lessons & Reflections' | 'Engineering Craft',
  tags: ['Tag1', 'Tag2'],
  featured: false,
  excerpt: 'A short summary...',
  content: {
    lead: 'Opening paragraph...',
    sections: [
      {
        heading: '1. Section Heading',
        paragraphs: ['Paragraph content...'],
      }
    ]
  }
}
```
The article will immediately appear in `/writing`, have its own shareable `/writing/your-article-slug` route, and be indexed by search!

### Adding a New Project
Open `data/projects.ts` and append your project to `projects`. The case study, metrics, and exhibition entry will be automatically generated at `/work/your-project-slug`.

---

&copy; Vedant Garud. Unfinished by design.
