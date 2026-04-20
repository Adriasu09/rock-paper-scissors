// Categorías mostradas en el sidebar, con su etiqueta visible,
// la categoría real de NewsAPI y la paleta de colores del diseño.
// NewsAPI soporta: business, entertainment, general, health, science, sports, technology.
export const NEWS_CATEGORIES = [
  {
    label: "TECNOLOGÍA",
    apiCategory: "technology",
    query: "tecnología",
    color: "#6842ff",
    background: "#1e1444",
  },
  {
    label: "DEPORTES",
    apiCategory: "sports",
    query: "deportes",
    color: "#00d2ff",
    background: "#003344",
  },
  {
    label: "POLÍTICA",
    apiCategory: "general",
    query: "política",
    color: "#06d6a0",
    background: "#003320",
  },
  {
    label: "CULTURA",
    apiCategory: "entertainment",
    query: "cultura",
    color: "#ff2d78",
    background: "#3d1428",
  },
];

// Idiomas soportados por NewsAPI (/v2/everything): ar, de, en, es, fr, he, it, nl, no, pt, ru, sv, zh
export const COUNTRY_LANGUAGE = {
  ae: "ar", ar: "es", at: "de", au: "en", be: "fr", br: "pt",
  ca: "en", ch: "de", cn: "zh", co: "es", cu: "es", de: "de",
  eg: "ar", es: "es", fr: "fr", gb: "en", hk: "zh", ie: "en",
  il: "he", in: "en", it: "it", ma: "ar", mx: "es", ng: "en",
  nl: "nl", no: "no", nz: "en", ph: "en", pt: "pt", ru: "ru",
  sa: "ar", se: "sv", sg: "en", tw: "zh", us: "en", ve: "es",
  za: "en",
};
