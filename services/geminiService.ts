import { GoogleGenAI } from "@google/genai";

// Initialize the Google AI client directly.
// The execution environment will safely inject the API key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDescription = async (subject: string): Promise<string> => {
  try {
    const prompt = `Genera una descripción muy breve y atractiva, de una sola oración, para una clase universitaria llamada "${subject}". La descripción debe estar en español.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    if (text) {
      return text.trim();
    } else {
      return "No se pudo generar una descripción.";
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate description from Gemini API.");
  }
};