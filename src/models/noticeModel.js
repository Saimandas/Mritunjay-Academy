import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "General",
        "Academic",
        "Examination",
        "Admission",
        "Event",
        "Important",
      ],
      default: "General",
    },

    // PDF URL
    fileUrl: {
      type: String,
      default: null,
    },

    // Cloudinary public ID
    publicId: {
      type: String,
      default: null,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Notice =
  mongoose.models.Notice ||
  mongoose.model("Notice", noticeSchema);

export default Notice;