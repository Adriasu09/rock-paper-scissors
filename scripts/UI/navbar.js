import { getCountryFlagUrl } from "../service/geolocationService.js";

const LANDING_URL = "https://adriasu09.github.io/landing-Carnival/";

const LOGO_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 80 86" class="navbar__logo-icon" aria-hidden="true">
    <path fill="currentColor" d="M34.7027 0L44.6727 0C46.3317 1.97591 46.5585 2.2179 46.8636 4.73833C51.0778 6.14341 54.1065 7.18181 57.9433 9.44263C59.7594 8.91312 64.4456 8.96643 66.4197 9.11536C72.2731 9.55697 70.0739 20.5348 70.9008 24.0664C71.6628 27.3212 72.7808 29.5601 73.2703 32.9782C79.853 33.0061 78.3582 36.3436 79.4512 41.6721C80.6223 47.3818 76.7328 47.1225 72.4741 46.9997L72.2439 46.993C71.4977 50.9008 69.1076 55.1859 66.7519 58.3764C68.9748 69.2079 70.4582 71.1023 58.5911 70.9983L58.4952 71.2067C59.9889 73.9586 62.0554 76.3207 63.6471 78.9224C65.3729 81.7432 69.1289 81.2637 67.5716 84.9236C65.6306 85.5526 55.4694 85.3061 52.7285 85.3035L31.1187 85.3054C27.1429 85.3107 16.1799 85.6375 12.768 85.2787C11.8831 84.6823 12.0493 84.9714 11.8122 84.0854C12.2702 81.6554 21.3573 73.0317 20.8063 70.9708C18.5985 70.4507 13.8623 72.1551 11.9559 69.3214C10.6692 67.4089 12.0975 60.9417 12.6342 58.6998C12.6561 58.6086 12.6785 58.5175 12.7016 58.4266C10.8631 56.1698 7.78761 50.0204 7.25697 47.0376C4.94753 47.0576 2.08404 47.4131 0.388447 45.7411C0.255902 45.6102 0.126385 45.4763 0 45.3395L0 41.3341C0.616071 40.325 0.738788 37.3878 0.952935 36.3193C1.79023 32.1417 3.02134 33.6459 5.91303 32.6241C6.2159 32.5171 6.64539 30.7694 6.77975 30.234C7.25366 28.153 8.45474 25.7491 8.6877 23.6543C9.09895 19.9563 7.94582 11.9339 11.4751 9.63357C13.254 8.47403 19.3009 8.98574 21.3066 9.54074C22.9685 8.63524 24.6704 7.80504 26.407 7.05266C27.79 6.46427 31.4043 5.2418 32.5454 4.61548C33.3224 4.18897 32.9354 1.85689 34.7027 0Z"/>
  </svg>
`;

const FIST_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="navbar__link-icon" aria-hidden="true">
    <path d="M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0"/>
    <path d="M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5"/>
    <path d="M9 5A2 2 0 1 0 5 5V10"/>
    <path d="M9 7V4A2 2 0 1 1 13 4V7.268"/>
  </svg>
`;

const USER_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M17.925 20.056a6 6 0 0 0-11.851.001"/>
    <circle cx="12" cy="11" r="4"/>
    <circle cx="12" cy="12" r="10"/>
  </svg>
`;

const MENU_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>
  </svg>
`;

const X_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
`;

function renderLinks(variant = "desktop") {
  const linkClass =
    variant === "desktop" ? "navbar__link" : "navbar__dropdown-link";
  const activeClass =
    variant === "desktop"
      ? "navbar__link navbar__link--active"
      : "navbar__dropdown-link navbar__dropdown-link--active";

  return `
    <a class="${linkClass}" href="${LANDING_URL}">Inicio</a>
    <a class="${activeClass}" href="#">
      ${FIST_SVG}
      <span>Juegos</span>
    </a>
    <a class="${linkClass}" href="#">Acerca de</a>
  `;
}

function renderWeatherPill(weatherData) {
  if (!weatherData || weatherData.error) return "";
  return `
    <div class="navbar__pill" aria-label="Clima actual">
      <img src="${weatherData.iconUrl}" alt="" class="navbar__pill-icon" width="20" height="20" />
      <span class="navbar__pill-text">${weatherData.temperature}°C</span>
    </div>
  `;
}

function renderLocationPill(locationData) {
  if (!locationData || locationData.error) return "";
  const cityShort = (locationData.city || "").slice(0, 3).toUpperCase();
  const flagUrl = getCountryFlagUrl(locationData.countryCode);
  return `
    <div class="navbar__pill" aria-label="Ubicación">
      <img src="${flagUrl}" alt="${locationData.countryCode}" class="navbar__pill-flag" />
      <span class="navbar__pill-text">${cityShort}</span>
    </div>
  `;
}

export function renderNavbar(locationData, weatherData) {
  return `
    <nav class="navbar" aria-label="Principal">
      <a class="navbar__logo" href="${LANDING_URL}">
        ${LOGO_SVG}
        <span class="navbar__logo-text">AZARGame</span>
      </a>

      <div class="navbar__links">
        ${renderLinks("desktop")}
      </div>

      <div class="navbar__mobile-extras">
        ${renderWeatherPill(weatherData)}
        ${renderLocationPill(locationData)}
        <button type="button" class="navbar__menu-btn" id="navbar-menu-btn" aria-label="Abrir menú" aria-expanded="false">
          <span class="navbar__menu-icon" data-icon="menu">${MENU_SVG}</span>
        </button>
      </div>

      <button type="button" class="navbar__login">
        ${USER_SVG}
        <span>Iniciar sesión</span>
      </button>
    </nav>

    <div class="navbar__dropdown" id="navbar-dropdown">
      ${renderLinks("mobile")}
    </div>
  `;
}

export function initNavbarInteractions() {
  const btn = document.getElementById("navbar-menu-btn");
  const dropdown = document.getElementById("navbar-dropdown");
  if (!btn || !dropdown) return;

  btn.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("navbar__dropdown--open");
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    const iconWrap = btn.querySelector(".navbar__menu-icon");
    iconWrap.innerHTML = isOpen ? X_SVG : MENU_SVG;
    iconWrap.dataset.icon = isOpen ? "x" : "menu";
  });
}
