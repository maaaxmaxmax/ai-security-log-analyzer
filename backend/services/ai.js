import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// here i create the openai client

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


// this is the analysis function that my backend will call for each cyberattack, and build a text version of the logs

export async function analyzeLogs(logs) {
    const logText = logs
    .map(l => `${l.timestamp} | ${l.ip} | ${l.action} | ${l.username || "-"} | ${l.message}`)
        .join("\n");


        // asking the AI to analyze my logs
        const prompt = `
You are a cybersecurity AI analyzing system logs.
Identify attacker patterns, risk score (1–100), suspicious behavior, and recommendations.

Here are the logs:

${logText} 

Return JSON with the following structure: {

"riskScore": number,
  "summary": "short explanation",
  "riskFactors": ["factor1", "factor2"],
  "recommendations": ["do X", "do Y"]
  
  }`;

  try {

    const response = await client.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
            { role: "system", content: "you are a cybersecurity AI."},
            { role: "user", content: prompt }
        ],
        temperature: 1
    });

    // parse the response from AI
    const text = response.choices[0].message.content;
    return JSON.parse(text);

  } catch (err) {
    console.error("AI error", err);
    throw new Error("AI analysis failed");
  }

}
