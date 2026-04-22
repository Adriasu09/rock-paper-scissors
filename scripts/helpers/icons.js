const ICONS = {
  fist: {
    viewBox: "0 0 24 24",
    body: `<path d="M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0"/><path d="M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5"/><path d="M9 5A2 2 0 1 0 5 5V10"/><path d="M9 7V4A2 2 0 1 1 13 4V7.268"/>`,
    mode: "stroke",
  },
  user: {
    viewBox: "0 0 24 24",
    body: `<path d="M17.925 20.056a6 6 0 0 0-11.851.001"/><circle cx="12" cy="11" r="4"/><circle cx="12" cy="12" r="10"/>`,
    mode: "stroke",
  },
  menu: {
    viewBox: "0 0 24 24",
    body: `<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>`,
    mode: "stroke",
  },
  x: {
    viewBox: "0 0 24 24",
    body: `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`,
    mode: "stroke",
  },
  mapPin: {
    viewBox: "0 0 24 24",
    body: `<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>`,
    mode: "stroke",
  },
  cloud: {
    viewBox: "0 0 24 24",
    body: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
    mode: "stroke",
  },
  refresh: {
    viewBox: "0 0 24 24",
    body: `<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>`,
    mode: "stroke",
  },
};

export function icon(name, { size = 20, className = "" } = {}) {
  const def = ICONS[name];
  if (!def) {
    console.warn(`icon(): "${name}" no encontrado`);
    return "";
  }

  const strokeAttrs =
    def.mode === "stroke"
      ? `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`
      : "";

  const [, , vw, vh] = def.viewBox.split(" ").map(Number);
  const width = size;
  const height = Math.round((size * vh) / vw);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${def.viewBox}" ${strokeAttrs} class="${className}" aria-hidden="true">${def.body}</svg>`;
}
