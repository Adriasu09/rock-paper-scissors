// Categorías mostradas en el sidebar, con su etiqueta visible,
// la categoría real de NewsAPI y la paleta de colores del diseño.
// NewsAPI soporta: business, entertainment, general, health, science, sports, technology.
export const NEWS_CATEGORIES = [
  {
    label: "TECNOLOGÍA",
    apiCategory: "technology",
    color: "#6842ff",
    background: "#1e1444",
  },
  {
    label: "DEPORTES",
    apiCategory: "sports",
    color: "#00d2ff",
    background: "#003344",
  },
  {
    label: "POLÍTICA",
    apiCategory: "general",
    color: "#06d6a0",
    background: "#003320",
  },
  {
    label: "CULTURA",
    apiCategory: "entertainment",
    color: "#ff2d78",
    background: "#3d1428",
  },
];

// Países soportados por NewsAPI en el endpoint top-headlines.
// Fuente: https://newsapi.org/docs/endpoints/top-headlines
// Nota: España (es) no está incluida; se usa "us" como fallback.
export const SUPPORTED_COUNTRIES = new Set([
  "ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu",
  "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in",
  "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz",
  "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th",
  "tr", "tw", "ua", "us", "ve", "za",
]);

// Idiomas soportados por NewsAPI: ar, de, en, es, fr, he, it, nl, no, pt, ru, sv, zh
export const COUNTRY_LANGUAGE = {
  ae: "ar", ar: "es", at: "de", au: "en", be: "fr", br: "pt",
  ca: "en", ch: "de", cn: "zh", co: "es", cu: "es", de: "de",
  eg: "ar", es: "es", fr: "fr", gb: "en", hk: "zh", ie: "en",
  il: "he", in: "en", it: "it", ma: "ar", mx: "es", ng: "en",
  nl: "nl", no: "no", nz: "en", ph: "en", pt: "pt", ru: "ru",
  sa: "ar", se: "sv", sg: "en", tw: "zh", us: "en", ve: "es",
  za: "en",
};
