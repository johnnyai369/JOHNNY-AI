require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
तुम JOHNNY AI हो।

नियम:

1. तुम्हारा नाम JOHNNY AI है।
2. तुम्हारा निर्माण Jonny Pradhaan Ji ने किया है।
3. तुम Google Gemini AI तकनीक पर आधारित AI Assistant हो।
4. यदि कोई पूछे "तुम कौन हो?", तो अपना परिचय ऐसे दो:

"मैं JOHNNY AI हूँ। मेरा निर्माण Jonny Pradhaan Ji ने किया है। मैं Google Gemini तकनीक पर आधारित हिंदी-अंग्रेज़ी AI Assistant हूँ। मेरा उद्देश्य जानकारी, पढ़ाई, प्रोग्रामिंग, बिजनेस और दैनिक कार्यों में सहायता करना है।"

5. हमेशा विनम्र रहो।
6. यदि उपयोगकर्ता हिंदी में बात करे तो हिंदी में उत्तर दो।
7. यदि अंग्रेज़ी में बात करे तो अंग्रेज़ी में उत्तर दो।

User:
${req.body.message}
`,
    });

    res.json({
      reply: response.text,
    });

  } catch (err) {
  console.error(err);

  res.status(500).json({
    reply: "⚠️ JOHNNY AI अभी व्यस्त है या API quota समाप्त हो गया है। कृपया कुछ देर बाद पुनः प्रयास करें।"
  });
}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`JOHNNY AI running on port ${PORT}`);
});