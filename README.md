# Rock-Paper-Scissors

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

> Browser-based Rock-Paper-Scissors against the CPU, enriched with live news, weather, and geolocation panels.

A classic Rock-Paper-Scissors game built as the final project for the **Factoría F5** bootcamp. The player competes against the CPU in a best-of-three match while a live sidebar shows their current weather, location (with country flag), and latest news headlines across four categories — all tailored to the player's region.

The project is intentionally written in **vanilla HTML, CSS and JavaScript ES modules** — no framework, no bundler, no npm dependencies. The only server-side piece is a single Vercel serverless function that proxies NewsAPI requests to keep the API key out of the browser.

## Table of Contents

- [Background](#background)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Install](#install)
- [Usage](#usage)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Maintainers](#maintainers)
- [Acknowledgements](#acknowledgements)
- [Contributing](#contributing)
- [License](#license)

## Background

This project was developed during the Factoría F5 bootcamp with three explicit learning goals:

1. **Master JavaScript fundamentals** — DOM manipulation, ES modules, async/await, and browser APIs without the safety net of a framework.
2. **Integrate multiple third-party APIs** — handle real-world concerns such as rate limits, CORS, API-key protection, and graceful error handling.
3. **Ship to production** — take a static site from `localhost` to a public URL while keeping secrets out of client code.

No build tooling was added on purpose: every file in the repo is the file that runs in the browser, which keeps the code easy to reason about and easy to debug.

## Features

- 🎮 **Best-of-three game loop** against the CPU with live score tracking.
- ⌨️ **Keyboard shortcuts**: `A` = Rock, `S` = Paper, `D` = Scissors.
- ⏱️ **Round modal** with a 3-second auto-close before the next round begins.
- 🌦️ **Live weather** (temperature, humidity, wind) via Open-Meteo, based on geolocation.
- 📰 **Live news feed** with four categories (Technology, Sports, Politics, Culture), localised by the player's country.
- 📍 **Reverse geocoding** (Nominatim) plus country flag from flagcdn, shown in the navbar.
- 🔊 **Sound toggle** with background music and SFX for hover, countdown, win, lose, and round outcomes.
- 📜 **Rules modal** accessible from the start screen.
- ✅ **Name validation** (minimum 3 characters) before starting a match.
- 🛡️ **Graceful degradation** — if an API is unavailable, the rest of the app keeps working with a friendly error message.

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES modules) |
| **Backend** | Vercel Serverless Function (Node.js) — NewsAPI proxy only |
| **Hosting** | Vercel (static site + `/api/*` serverless) |
| **Tooling** | None — no bundler, no npm dependencies |

### Third-party APIs

| API | Purpose |
|---|---|
| [NewsAPI](https://newsapi.org) | News articles per category and language |
| [Open-Meteo](https://open-meteo.com) | Current weather conditions |
| [Nominatim](https://nominatim.openstreetmap.org) | Reverse geocoding (lat/lon → city/country) |
| [flagcdn](https://flagcdn.com) | Country flag images |
| [OpenWeatherMap icons](https://openweathermap.org) | Weather condition icons |
| Browser Geolocation API | Native lat/lon lookup with user consent |

## Architecture

```
rock-paper-scissors/
├── api/
│   └── news.js              # Vercel serverless proxy for NewsAPI
├── assets/                  # Images, SVG icons, sound files
├── docs/                    # Flowcharts and user-flow documentation
├── scripts/
│   ├── constants/           # Game config, URLs, categories, error messages
│   ├── helpers/             # DOM utilities, error handler, icon rendering
│   ├── services/            # API clients and domain logic
│   └── ui/                  # Screens, modals, sections, controllers
├── style/                   # CSS organised by section
├── index.html               # Entry point
├── index.js                 # App orchestrator (state, navigation, audio)
├── vercel.json              # Vercel routing configuration
└── LICENSE
```

## Install

### Prerequisites

- A modern browser (Chrome, Firefox, Edge, Safari).
- VS Code with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension installed.
- A free [NewsAPI](https://newsapi.org/register) key.

### Clone and configure

```bash
git clone https://github.com/Adriasu09/rock-paper-scissors.git
cd rock-paper-scissors
```

Create the local config file so the app can reach NewsAPI while developing:

```js
// scripts/constants/config.js (gitignored)
export const NEWS_API_KEY = "your_newsapi_key_here";
```

### Run

Open the project folder in VS Code, right-click `index.html` and choose **Open with Live Server** (or click **Go Live** in the status bar). The app will open in your browser at `http://127.0.0.1:5500`.

## Usage

1. Open the app in the browser.
2. Click **PLAY vs CPU**, enter a player name (min. 3 characters) and confirm.
3. Pick **Rock**, **Paper**, or **Scissors** — either by clicking the button or pressing `A` / `S` / `D`.
4. Wait for the 3-2-1 countdown; both hands are revealed and the round result is shown for 3 seconds.
5. First player to reach **3 wins** takes the match.
6. On the Game Over screen, choose **Replay** to start a new match or **Home** to go back to the start screen.
7. Toggle background music and SFX with the sound icon in the navbar at any time.

## Deployment

The app is deployed on **Vercel** as a static site plus a single serverless function.

### Why a serverless proxy?

NewsAPI requires an API key on every request. Shipping that key in the browser would expose it to anyone inspecting the page. Instead, [api/news.js](api/news.js) runs on the server, reads `NEWS_API_KEY` from Vercel's environment variables, and forwards the request to NewsAPI. The browser only ever talks to `/api/news`.

### How client routing works

[scripts/services/apiClient.js](scripts/services/apiClient.js) inspects `window.location.hostname`:

- **Local (`localhost` / `127.0.0.1`)** → calls NewsAPI directly using the key from the local `config.js`.
- **Production (Vercel domain)** → strips the API key from params and routes the request to `/api/news`.

Other APIs (Open-Meteo, Nominatim, flagcdn, OpenWeatherMap icons) do not need a key and are called directly from the browser in both environments.

### Deploying your own fork

1. Fork the repo and push to GitHub.
2. In [Vercel](https://vercel.com), **Add New → Project** and import the fork.
3. Framework preset: **Other**. Root directory: `.`.
4. Under **Environment Variables**, add `NEWS_API_KEY` with your NewsAPI key for Production, Preview, and Development.
5. Click **Deploy**. Vercel detects [vercel.json](vercel.json) and [api/news.js](api/news.js) automatically.

## Documentation

- [docs/USERFLOW.md](docs/USERFLOW.md) — end-to-end user journey and screen transitions.
- [docs/FLOWCHARTS.md](docs/FLOWCHARTS.md) — technical flowcharts: state machine, round resolution, input binding.
- [DeepWiki](https://deepwiki.com/Adriasu09/rock-paper-scissors) — auto-generated architectural wiki.

## Maintainers

| Name | GitHub |
|---|---|
| Adriana Suárez | [@Adriasu09](https://github.com/Adriasu09) |
| Yeli Cortés | [@YeliCort](https://github.com/YeliCort) |
| Irma Ortiz | [@Irma0805](https://github.com/Irma0805) |
| María Carrillo | [@MariaCarrilloCarrasco](https://github.com/MariaCarrilloCarrasco) |

## Acknowledgements

- **Factoría F5** bootcamp and mentors for the guidance and feedback throughout the project.
- Free-tier providers that make this project possible: [NewsAPI](https://newsapi.org), [Open-Meteo](https://open-meteo.com), [OpenStreetMap / Nominatim](https://nominatim.openstreetmap.org), [flagcdn](https://flagcdn.com), and [OpenWeatherMap](https://openweathermap.org).

## Contributing

Issues and pull requests are welcome. Please open an issue first to discuss larger changes. For questions, reach out to any of the [maintainers](#maintainers).

## License

[MIT](LICENSE) © 2026 Adriana Suárez, Yeli Cortés, Irma Ortiz, María Carrillo.
