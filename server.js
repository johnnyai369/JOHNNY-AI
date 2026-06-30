require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: [
    {
      role: "user",
      parts: [
        {
          text: req.body.message
        }
      ]
    }
  ]
});

res.json({
  reply: response.text
});

  

  } catch (err) {
    console.error(err);
    res.status(500).json({
      reply: "Error connecting to Gemini AI",
    });
  }
});

app.listen(3000, () => {
  console.log("JOHNNY AI running on http://localhost:3000");
});