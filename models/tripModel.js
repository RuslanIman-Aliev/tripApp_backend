/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import validator from "validator";

const activitySchema = new mongoose.Schema({
  time: String,
  title: String,
  description: String,
  placeName: String,
  placeType: String,
  googleSearchQuery: String,
  estimatedCost: String,
});

const daySchema = new mongoose.Schema({
  day: Number,
  date: String,
  activities: [activitySchema],
});

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // change later
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
    },
    destination: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator(el) {
          return el >= this.startDate;
        },
      },
    },
    days: {
      type: Number,
      required: true,
    },
    interests: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "generating", "ready"],
      default: "draft",
    },
    tripProgram: [daySchema],
    aiGenerated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
