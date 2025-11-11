/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import { differenceInDays } from "date-fns";
import Trip from "../models/tripModel.js";
import catchAsync from "../utils/catchAsync.js";

// eslint-disable-next-line import/prefer-default-export
export const createTrip = catchAsync(async (req, res, next) => {
  const newTrip = await Trip.create({
    destination: req.body.destination,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    country: req.body.country,
    days: differenceInDays(req.body.endDate, req.body.startDate),
  });
  res.status(201).json({
    status: "success",
    data: {
      newTrip,
    },
  });
});
