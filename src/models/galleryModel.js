import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "School Events",
        "Academic",
        "Sports",
        "Cultural",
        "Celebration",
        "Campus",
        "Other",
      ],
      default: "Other",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    displayOrder: {
      type: Number,
      default: 0,
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

const Gallery =
  mongoose.models.Gallery ||
  mongoose.model("Gallery", gallerySchema);

export default Gallery;