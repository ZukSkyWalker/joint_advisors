// server/localApi.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/local-ollama", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await fetch("http://localhost:11411/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        model: "deepseek",
      }),
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: "Ollama Error" });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Local proxy server running on port ${PORT}`);
});
