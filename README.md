# AquaSense 🌊

A modern, animated, and mobile-first front-end experience for a water-focused awareness platform. This repo contains a fully enhanced static site showcasing interactive dashboards, data visualizations, and engaging UI components.

---

## 🚀 Project Overview

AquaSense is a front-end project built with **plain HTML, CSS, and JavaScript** (no build step required). It includes a set of interconnected pages that demonstrate:

- Visually rich UI enhancements (3D cards, gradients, animations)
- Responsive layout and mobile-first design
- Interactive data visualizations (charts, maps, dynamic cards)
- A conversational chatbot interface and AI content generation UI

---

## 📄 Pages Included

| Page | Purpose |
|------|---------|
| `index.html` | Home landing page with hero animations and feature highlights |
| `tracker.html` | Data tracker dashboard (forms + charts) |
| `about.html` | About page with 3D content cards |
| `impact.html` | Impact stats + animated cards |
| `join.html` | Call-to-action sign-up/invite page |
| `drought.html` | Drought data visualizations and summaries |
| `recommendations.html` | Recommended actions and resources |
| `community.html` | Map + community projects showcase |
| `chatbot.html` | Chat interface with enhanced UX |
| `ai-content.html` | AI content generator interface |
| `auth.html` | Authentication UI (mock/UX only) |
| `settings.html` | Settings and preference UI |
| `slogan.html` | Brand messaging and slogan showcase |

---

## ✨ Visual Enhancements

The entire site includes a suite of modern UI/UX enhancements:

- 3D card transforms with perspective
- Floating, wave, shimmer, and pulse animations
- Responsive typography (using `clamp()`)
- Smooth scroll-triggered fade-ins + staggered reveals
- Hardware-accelerated transforms for high performance
- Mobile-friendly navigation with slide menu + backdrop blur
- Ripple click effects and hover glow states

---

## 🗂️ Repository Structure

```
/ (root)
  ├─ index.html
  ├─ tracker.html
  ├─ about.html
  ├─ ...
  ├─ css/
  │   ├─ animations.css
  │   ├─ enhanced-styles.css
  │   └─ navbar-styles.css
  ├─ js/
  │   ├─ main.js
  │   ├─ navigation.js
  │   ├─ tracker.js
  │   ├─ chatbot.js
  │   └─ ...
  └─ README.md
```

---

## � Tech Stack & Dependencies

This is a **static front-end project** using vanilla web technologies. It is intentionally dependency-light, but a few libraries are included via CDN for convenience:

- **HTML / CSS / JavaScript** (no build step)
- **Chart.js** (charts on `tracker.html` + `drought.html`)
- **OpenAI API** (chatbot + AI content generator, via `js/utils.js`)

> Note: No package manager or build tooling is required to run this site.

---

## 🤖 AI Integration (OpenAI)

Several pages leverage OpenAI APIs for interactive experiences:

- **Chatbot (`chatbot.html`)** – Uses `js/chatbot.js` and `js/utils.js` to call the OpenAI Chat Completion endpoint.
- **AI Content Generator (`ai-content.html`)** – Uses the OpenAI API to generate text and images.

### 🔐 Configure your API key

The OpenAI API key is stored in local storage via the **Settings** page (`settings.html`).

1. Open `settings.html`.
2. Paste your OpenAI API key.
3. Save to enable chatbot and AI generator features.

> The app is designed for demos; avoid storing secret keys in production apps.

---

## 🛠️ Extending & Customizing

### Update Visuals
- Edit `css/enhanced-styles.css` for global styles.
- Edit `css/animations.css` for motion effects and keyframes.
- Edit `css/navbar-styles.css` for responsive navigation behavior.

### Add a new page
1. Create a new HTML file in the root.
2. Reference shared styles and scripts (e.g., `navigation.js`, `main.js`).
3. Add a nav link in `navigation.js` or the shared header markup.

### Add new charts / data visualizations
- Use Chart.js (already included via CDN in `tracker.html` + `drought.html`).
- Add a `<canvas>` element and map it to new `Chart` instances in JS.

---

## �🧪 Getting Started

### Run locally (recommended)

1. Clone this repo:

   ```bash
   git clone <repo-url>
   cd frontend
   ```

2. Start a local server (recommended for consistent behavior):

   ```bash
   # Python 3
   python -m http.server 8000
   ```

3. Open a browser and visit:

   - `http://localhost:8000/index.html`

> **Tip:** Opening `index.html` directly from the file system usually works, but a local server avoids CORS issues and ensures consistent behavior.

---

## 🛠️ Development Notes

- The UI is built using modular CSS files under `css/`.
- Page-specific behavior is handled in `js/` (e.g., `tracker.js`, `chatbot.js`).
- Navigation logic is centralized in `js/navigation.js`.
- Animation utilities live in `js/enhanced-animations.js`.

---

## ✅ Enhancement Status

This project includes a complete enhancement pass across all pages, including:

- Animated navigation and responsive menus
- Interactive cards (tilt, hover, fade-in)
- Enhanced buttons with ripple + 3D effects
- Smooth transitions and scroll-triggered animations

---

## 📣 Contributions

Feel free to open issues or pull requests to add:

- New pages or feature demos
- Additional data visualizations
- Accessibility improvements
- Performance optimizations

---

## 📜 License

This project is MIT licensed (add your own `LICENSE` file if desired).
