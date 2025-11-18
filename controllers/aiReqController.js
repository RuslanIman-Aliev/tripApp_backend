/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/first */
/* eslint-disable import/extensions */

import Trip from "../models/tripModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { generateTripProgram, getPrompt } from "../utils/aiRequest.js";

const UNSPLASH_ACCESS_KEY = "pNFwWqD4vhk8cd7Tmsly6KMwtyk_u8g37RTwFrHPXfE";

async function getPhotosFromUnsplash(query, count = 3) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${UNSPLASH_ACCESS_KEY}`,
  );
  const data = await res.json();
  return data.results.map((photo) => photo.urls.small); // массив ссылок
}
export const createTourProgramm = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById(req.params.tripId);
  if (!trip) return next(new AppError("Incorrect trip id", 401));
  const { interests, budget } = req.body;
  trip.interests = interests;
  trip.budget = budget;
  const prompt = getPrompt(trip);
  const program = await generateTripProgram(prompt);
 // екгз
  trip.tripProgram = program.tripProgram;
  trip.status = "ready";
  trip.aiGenerated = true;
  for (const day of trip.tripProgram) {
    for (const activity of day.activities) {
      const links = await getPhotosFromUnsplash(activity.googleSearchQuery, 3);
      console.log("Unsplash links:", links);
    }
  }

  await trip.save();

  res.status(200).json({
    status: "success",
    program: trip.tripProgram,
  });
});
