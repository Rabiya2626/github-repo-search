// server/index.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Option A: /api/search?q=react
app.get("/api/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing query ?q=" });
    const { data } = await axios.get(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=20`
    );
    res.json(data); // { total_count, items: [...] }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch from GitHub" });
  }
});

// Option B: /search/react  (kept for convenience)
app.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const { data } = await axios.get(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=20`
    );
    res.json(data.items);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch from GitHub" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
