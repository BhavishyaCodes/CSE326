# Practice Corner - Student Self-Assessment & Quiz Portal

> **Continuous Assessment (CA1) Team Project**  
> An interactive, distraction-free study and quiz platform built with **Pure Semantic HTML5, Modern CSS3, and Vanilla JavaScript**.  
> **No database, no server, no build tools required** — 100% static and ready for instant deployment to **GitHub Pages**.

---

## 📌 1. Problem Statement
Many students struggle with exam anxiety and conceptual gaps because conventional online quiz platforms are often cluttered with advertisements, confusing countdown timers, mandatory account logins, or require active server backends and databases that introduce latency or connectivity errors.

**Practice Corner** solves this by offering a lightweight, distraction-free, browser-based self-assessment tool:
- Students can practice core subjects (**Mathematics, Physics, Chemistry, Computer Basics, General Knowledge, English**) at their own pace.
- Provides **instant feedback** and **detailed concept explanations** for every single question to reinforce conceptual learning.
- Saves historical study attempts automatically using browser **LocalStorage**, preserving privacy without requiring any database or backend server.

---

## 🌟 2. Key Features

- **6 Academic Subjects & 70+ Curated Questions**:
  - Mathematics (Calculus, Algebra, Geometry, Probability)
  - Physics (Mechanics, Thermodynamics, Optics, Electricity)
  - Chemistry (Bonding, Periodic Table, Organic Chemistry)
  - Computer Basics (CPU, Binary, Web Technologies, Networks)
  - General Knowledge (Geography, Science, World History)
  - English & Grammar (Vocabulary, Parts of Speech, Idioms)
- **Session Customization Modal**: Choose test length (5, 10, or 12 questions) and toggle the optional 30-second question timer.
- **Dynamic Visual Progress**: Live question progress bar and smooth transition between questions.
- **Keyboard Navigation**: Use keys `1-4` or `A-D` to choose answers, and `Enter` to proceed.
- **Instant Scorecard & Detailed Review**:
  - Displays total score, percentage accuracy, and custom performance feedback.
  - Question-by-question breakdown with green/red answer comparison.
  - **Concept Explanation Box** explaining *why* the answer is right.
- **Local Practice Logs (No Database Needed)**:
  - Automatically records scores, dates, and times in the browser's `localStorage`.
  - Accessible via the "Study Logs" view even after refreshing or restarting the browser.
- **Light & Dark Theme Toggle**: Comfortable for daytime revision or late-night studying.
- **Single Page Architecture (SPA)**: Zero page reloads, smooth transitions, works both via `file:///` local opening and GitHub Pages.

---

## 🛠️ 3. Technology Stack

| Component | Technology | Role |
|---|---|---|
| **Structure** | HTML5 | Semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<dialog>`) |
| **Styling** | CSS3 | Responsive CSS Grid, Flexbox, CSS Custom Properties (Variables), Dark/Light theme |
| **Interactivity** | Vanilla JavaScript (ES6) | DOM manipulation, state management, timer, scoring algorithm, LocalStorage |
| **Database** | None (Browser LocalStorage) | Zero server overhead; data persists securely inside client browser |
| **Deployment** | GitHub Pages | Free, static zero-configuration web hosting |

---

## 📂 4. Project Directory Structure

```text
practice-quiz-portal/
├── index.html                   # Main single-page application structure
├── css/
│   └── style.css                # Clean, responsive styles with light/dark variables
├── js/
│   ├── questions.js             # Rich question bank data object (70+ questions)
│   └── app.js                   # Application logic, timer, state & LocalStorage
├── README.md                    # Project documentation
└── VIVA_AND_PRESENTATION_GUIDE.md # Viva Q&A prep, team roles & 3-min video script
```

---

## 🚀 5. How to Run Locally

You do **not** need Node.js, Python, or any server.

1. Download or clone this repository.
2. Locate `index.html` inside the folder.
3. **Double-click `index.html`** to open it directly in any web browser (Google Chrome, Microsoft Edge, Safari, Firefox).
4. That's it! Everything works immediately.

---

## 🌐 6. How to Deploy to GitHub Pages (2 Minutes)

1. Create a new repository on your GitHub account (e.g., `practice-quiz-portal`).
2. Upload all files (`index.html`, `css/`, `js/`, `README.md`) to the repository main branch.
3. In your GitHub repository, click on **Settings** (top navigation tab).
4. In the left sidebar, click on **Pages**.
5. Under **Build and deployment** > **Branch**:
   - Select `main` (or `master`).
   - Leave the folder as `/(root)`.
   - Click **Save**.
6. Wait 1-2 minutes. GitHub will display your live deployment link:
   `https://<your-username>.github.io/practice-quiz-portal/`
7. Paste this live link into your project submission form!

---

## 👥 7. Team Contribution Breakdown

- **Student 1 (HTML Specialist)**: Designed semantic HTML5 structure, navigation layout, accessibility attributes (`aria-*`, `role`), and view sections.
- **Student 2 (CSS Specialist)**: Created modern responsive layout using CSS Grid & Flexbox, defined color schemes, animations, and dark/light theme switching.
- **Student 3 (JavaScript & Logic Specialist)**: Implemented quiz engine, option selection, Fisher-Yates question randomization, scoring calculation, and countdown timer.
- **Student 4 (Data & Persistence Specialist)**: Curated comprehensive question bank with educational explanations, implemented `localStorage` study logs, and keyboard shortcuts.

*(For detailed viva questions and answers, refer to [VIVA_AND_PRESENTATION_GUIDE.md](VIVA_AND_PRESENTATION_GUIDE.md)).*
