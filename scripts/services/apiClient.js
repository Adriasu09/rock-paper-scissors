import { NEWSAPI_BASE_URL } from "../constants/urls.js";

function resolveUrl(baseUrl, params) {
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (baseUrl === NEWSAPI_BASE_URL && !isLocal) {
    const { apiKey, ...safeParams } = params ?? {};
    return `/api/news?${new URLSearchParams(safeParams)}`;
  }

  return params ? `${baseUrl}?${new URLSearchParams(params)}` : baseUrl;
}

export async function fetchData(baseUrl, params) {
  const url = resolveUrl(baseUrl, params);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
