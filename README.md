# Google Store — Product Showcase

A pixel-perfect, responsive product detail page replicating the Google Store experience. Built as a Figma-to-code exercise using semantic HTML5 and CSS3, featuring two product pages: **Google Pixel Buds Pro** and **Fitbit Inspire 3**.

---

## Live Preview

| Page | Description |
|------|-------------|
| `index.html` | Google Pixel Buds Pro — earbuds product detail |
| `pages/watches.html` | Fitbit Inspire 3 — health & fitness tracker detail |

---

## Features

- **Mobile-first responsive design** — seamless across mobile, tablet, and desktop
- **Interactive color selector** — swatches with live product image preview (watches)
- **Accessible markup** — semantic HTML5, ARIA attributes, descriptive alt texts, and proper form label associations
- **CSS Grid + Flexbox layout** — two-column desktop layout with sticky purchase panel
- **No JavaScript** — all interactivity handled with CSS (`:checked`, `:hover`, transitions)
- **Google Fonts** — Inter typeface (400, 700)
- **SVG icon system** — 18 scalable UI icons (navigation, social media, utility)

---

## Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Semantic structure, forms, accessibility |
| CSS3 | Custom properties, Flexbox, Grid, media queries |
| Google Fonts | Inter typeface |
| SVG | Scalable UI and social icons |

---

## Project Structure

```
02-Ejercicio-Google-Store/
├── index.html               # Pixel Buds Pro product page
├── pages/
│   └── watches.html         # Fitbit Inspire 3 product page
├── styles/
│   ├── style.css            # Base stylesheet (shared, mobile-first)
│   └── watches_style.css    # Watches page overrides
└── img/
    ├── google-logo.png
    ├── earbuds/             # 4 product images
    ├── smartwatch/          # 3 product images (black, pink, yellow)
    └── icons/               # 18 SVG icons
```

---

## CSS Architecture

Styles follow a **mobile-first** strategy with progressive enhancement via media queries:

| Breakpoint | Behavior |
|------------|----------|
| `< 768px` | Single column, hidden nav links, stacked buttons |
| `768px – 1023px` | Nav links visible, 2×2 color grid |
| `≥ 1024px` | Two-column grid, thumbnail gallery, side-by-side purchase panel |

**Design tokens** (CSS custom properties):

```css
--white, --gray-light, --gray, --gray-dark, --blue

--font-primary: "Inter", sans-serif
--title-size: 35px
--subtitle-size: 20px
--text-size: 12px
```

---

## Getting Started

No build tools or dependencies required. Clone the repo and open `index.html` in any modern browser.

```bash
git clone https://github.com/Adriasu09/02-Ejercicio-Google-Store.git
cd 02-Ejercicio-Google-Store
# Open index.html in your browser
```

---

## Git Workflow

This project follows a **feature branch workflow**:

```
main ← develop ← feat/your-feature
```

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code. No direct commits. |
| `develop` | Integration branch. No direct commits. |
| `feat/*` | Your personal working branch. |

### Daily workflow

```bash
# 1. Switch to your branch
git checkout feat/your-feature

# 2. Sync with latest changes from develop
git pull origin develop

# 3. Work on your files...

# 4. Stage and commit your changes
git add .
git commit -m "feat(section): brief description of change"

# 5. Push to remote
git push origin feat/your-feature

# 6. Open a Pull Request on GitHub targeting develop
```

### Commit message convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(navbar): add responsive hamburger menu
fix(footer): correct social icon alignment on mobile
refactor(styles): remove unused CSS custom properties
improve(index): enhance semantic markup and alt texts
```

### Common errors

| Error | Fix |
|-------|-----|
| `Please commit your changes before merge` | Run `git add . && git commit -m "your message"` first |
| `Rejected — non-fast-forward` | Run `git pull origin feat/your-feature`, resolve conflicts, then push again |
| Working on wrong branch | Run `git checkout feat/your-feature` |

---

## Contributing

1. Branch off from `develop` — never commit directly to `main` or `develop`
2. Keep commits small and focused on a single change
3. Write descriptive commit messages using Conventional Commits format
4. Open a Pull Request against `develop` with a clear title and description
5. Address any review comments before the PR is merged

---

## License

This project was created for educational purposes as part of the [Factoria F5](https://factoriaf5.org/) bootcamp curriculum.
