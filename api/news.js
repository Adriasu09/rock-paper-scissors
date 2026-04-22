export default async function handler(req, res) {
  const { q, language, sortBy, pageSize } = req.query;

  const params = new URLSearchParams({
    q,
    language,
    sortBy,
    pageSize,
    apiKey: process.env.NEWS_API_KEY,
  });

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?${params}`,
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error from NewsAPI" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
