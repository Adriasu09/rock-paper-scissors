import { getCountryFlagUrl } from "../services/geolocationService.js";

function renderHeader(country) {
  const title = country ? `Noticias de ${country}` : "Noticias";
  return `
    <div class="news-card__header">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-newspaper news-card__icon">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>
      </svg>
      <div class="news-card__heading">
        <h3 class="news-card__title">${title}</h3>
        <span class="news-card__subtitle">Via NewsApi</span>
      </div>
    </div>
  `;
}

function renderCountryPill(country, countryCode) {
  if (!country || !countryCode) return "";
  const flagUrl = getCountryFlagUrl(countryCode);
  return `
    <div class="news-card__country">
      <img src="${flagUrl}" alt="${countryCode}" class="news-card__country-flag" />
      <span class="news-card__country-name">${country}</span>
    </div>
  `;
}

function renderArticle(article) {
  const { label, color, background } = article.category;
  return `
    <li class="news-card__item">
      <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-card__link">
        <span class="news-card__tag" style="color: ${color}; background: ${background};">${label}</span>
        <p class="news-card__article-title">${article.title}</p>
        <p class="news-card__article-meta">${article.source} · ${article.relativeTime}</p>
      </a>
    </li>
  `;
}

function renderFooter() {
  return `
    <div class="news-card__footer">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="news-card__clock-icon">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
      <span>Actualizado hace unos instantes</span>
    </div>
  `;
}

function renderWrapper(body, { country, countryCode } = {}) {
  return `
    <article class="news-card">
      ${renderHeader(country)}
      ${renderCountryPill(country, countryCode)}
      ${body}
    </article>
  `;
}

export function renderNews(newsData) {
  if (!newsData) {
    return renderWrapper(`
      <div class="news-card__body">
        <p class="news-card__detail">Cargando noticias...</p>
      </div>
    `);
  }

  if (newsData.error) {
    return renderWrapper(
      `
      <div class="news-card__body">
        <p class="news-card__detail">${newsData.error}</p>
      </div>
    `,
      newsData,
    );
  }

  if (!newsData.articles || newsData.articles.length === 0) {
    return renderWrapper(
      `
      <div class="news-card__body">
        <p class="news-card__detail">No hay noticias disponibles.</p>
      </div>
    `,
      newsData,
    );
  }

  const articlesHTML = newsData.articles.map(renderArticle).join("");

  return renderWrapper(
    `
    <ul class="news-card__list">
      ${articlesHTML}
    </ul>
    ${renderFooter()}
  `,
    newsData,
  );
}
