import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

import { GoogleGenAI } from "@google/genai";

process.env.GOOGLE_APPLICATION_CREDENTIALS = "";
process.env.GOOGLE_CLOUD_PROJECT = "";

// eslint-disable-next-line import/prefer-default-export
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
