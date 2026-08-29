import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    achievement: {
      type: String,
      required: true,
      trim: true,
    },

    photo: {
      type: String,
      required: true,
    },

    photoPublicId: {
      type: String,
      default: null,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement =
  mongoose.models.Achievement ||
  mongoose.model(
    "Achievement",
    achievementSchema
  );

export default Achievement;