/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/first */
/* eslint-disable import/extensions */
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });
import { GoogleGenAI } from "@google/genai";
import Trip from "../models/tripModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { extractJSON, getPrompt } from "../utils/aiRequest.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const createTourProgramm = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById(req.params.tripId);
  if (!trip) return next(new AppError("Incorrect trip id", 401));
  const { interests, budget } = req.body;
  trip.interests = interests;
  trip.budget = budget;
  const prompt = getPrompt(trip);

  console.log(prompt);
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text =
    result?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";

  const cleaned = extractJSON(text);

  if (!cleaned) {
    return next(new AppError("AI did not return valid JSON", 500));
  }

  let program;
  try {
    program = JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON parse error:", cleaned);
    return next(new AppError("AI returned invalid JSON structure", 500));
  }

  trip.tripProgram = program.tripProgram;
  trip.status = "ready";
  trip.aiGenerated = true;
  await trip.save();

  res.status(200).json({
    status: "success",
    program: trip.tripProgram,
  });
});
