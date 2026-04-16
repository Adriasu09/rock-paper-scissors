import { fetchData } from "../helpers/fetchData.js";
import { NEWSAPI_BASE_URL } from "../constants/urls.js";
import { NEWS_API_KEY } from "../constants/config.js";
import { NEWS_CATEGORIES } from "../constants/newsCategoryPalette.js";

// NewsAPI solo acepta ciertos countryCodes en top-headlines.
// Fuente: https://newsapi.org/docs/endpoints/top-headlines
const SUPPORTED_COUNTRIES = new Set([
  "ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu",
  "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in",
  "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz",
  "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th",
  "tr", "tw", "ua", "us", "ve", "za",
]);

// Idiomas soportados por NewsAPI: ar, de, en, es, fr, he, it, nl, no, pt, ru, sv, zh
const COUNTRY_LANGUAGE = {
  ae: "ar", ar: "es", at: "de", au: "en", be: "fr", br: "pt",
  ca: "en", ch: "de", cn: "zh", co: "es", cu: "es", de: "de",
  eg: "ar", es: "es", fr: "fr", gb: "en", hk: "zh", ie: "en",
  il: "he", in: "en", it: "it", ma: "ar", mx: "es", ng: "en",
  nl: "nl", no: "no", nz: "en", ph: "en", pt: "pt", ru: "ru",
  sa: "ar", se: "sv", sg: "en", tw: "zh", us: "en", ve: "es",
  za: "en",
};

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

async function fetchCategory(country, language, category) {
  const params = new URLSearchParams({
    country,
    language,
    category: category.apiCategory,
    pageSize: "1",
    apiKey: NEWS_API_KEY,
  });

  const url = `${NEWSAPI_BASE_URL}?${params}`;
  const data = await fetchData(url);
  const article = data.articles?.[0];

  return article ? mapArticle(article, category) : null;
}

// Noticias filtradas por país o idioma usando NewsAPI,
// una petición por categoría para respetar el diseño.
// ESPAÑA NO ESTA INCLUIDO EN LOS PAÍSES SOPORTADOS POR NEWSAPI, ASÍ QUE SE USARÁ "US" COMO FALLBACK PARA ESPAÑA Y CUALQUIER OTRO PAÍS NO SOPORTADO.
export async function getNews(countryCode) {
  const country = (countryCode || "").toLowerCase();
  const targetCountry = SUPPORTED_COUNTRIES.has(country) ? country : "us";

  const language = COUNTRY_LANGUAGE[targetCountry] || "en";  

  const results = await Promise.all(
    NEWS_CATEGORIES.map((category) => fetchCategory(targetCountry, language, category)),
  );

  return results.filter(Boolean);
}
