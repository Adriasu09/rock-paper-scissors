export async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
