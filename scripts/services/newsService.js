import { fetchData } from "./apiClient.js";
import { NEWSAPI_BASE_URL } from "../constants/urls.js";
import { NEWS_CATEGORIES, COUNTRY_LANGUAGE } from "../constants/news.js";

const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

let NEWS_API_KEY = "";
if (isLocal) {
  try {
    ({ NEWS_API_KEY } = await import("../constants/config.js"));
  } catch {
    NEWS_API_KEY = "";
  }
}

function getRelativeTime(publishedAt) {
  const diffMs = Date.now() - new Date(publishedAt).getTime();
  const diffMin = Math.max(1, Math.round(diffMs / 60000));
  if (diffMin < 60) return `${diffMin}min`;
  const diffHour = Math.round(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h`;
  const diffDay = Math.round(diffHour / 24);
  return `${diffDay}d`;
}

function mapArticle(article, category) {
  return {
    title: article.title,
    source: article.source?.name || "Fuente desconocida",
    relativeTime: getRelativeTime(article.publishedAt),
    url: article.url,
    category,
  };
}

async function fetchCategory(language, category) {
  const data = await fetchData(NEWSAPI_BASE_URL, {
    q: category.query,
    language,
    sortBy: "publishedAt",
    pageSize: "1",
    apiKey: NEWS_API_KEY,
  });
  const article = data.articles?.[0];

  return article ? mapArticle(article, category) : null;
}

export async function getNews(countryCode) {
  const country = (countryCode ?? "").toLowerCase();
  const language = COUNTRY_LANGUAGE[country] ?? "en";

  const results = await Promise.all(
    NEWS_CATEGORIES.map((category) => fetchCategory(language, category)),
  );

  return results.filter(Boolean);
}
