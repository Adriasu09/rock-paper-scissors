import { fetchData } from "../helpers/fetchData.js";
import { NEWSAPI_BASE_URL } from "../constants/urls.js";
import { NEWS_API_KEY } from "../constants/config.js";
import { NEWS_CATEGORIES, COUNTRY_LANGUAGE } from "../constants/news.js";

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
  const params = new URLSearchParams({
    q: category.query,
    language,
    sortBy: "publishedAt",
    pageSize: "1",
    apiKey: NEWS_API_KEY,
  });

  const url = `${NEWSAPI_BASE_URL}?${params}`;
  const data = await fetchData(url);
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
