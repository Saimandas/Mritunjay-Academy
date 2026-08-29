import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    image: {
      type: String,
      required: true,
    },

    // publicId: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Event =
  mongoose.models.Event ||
  mongoose.model("Event", eventSchema);

export default Event;