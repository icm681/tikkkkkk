const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));

app.get("/api/tiktok", async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }

  try {
    const response = await axios.get(`https://tiktok-video-downloader-api.p.rapidapi.com/user/${username}`, {
      headers: {
        "x-rapidapi-host": "tiktok-video-downloader-api.p.rapidapi.com",
        "x-rapidapi-key": "25a21af9ebmshd83d51503317484p146917jsna4a8b27af612",
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
