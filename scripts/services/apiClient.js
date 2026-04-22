export async function fetchData(baseUrl, params) {
  const url = params
    ? `${baseUrl}?${new URLSearchParams(params)}`
    : baseUrl;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
