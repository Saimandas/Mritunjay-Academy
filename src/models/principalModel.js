import mongoose from "mongoose";

const principalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // PRINCIPAL PHOTO
    // ==========================================

    image: {
      type: String,
      default: null,
    },

    imagePublicId: {
      type: String,
      default: null,
    },

    designation: {
      type: String,
      default: "Principal",
      trim: true,
    },

    qualification: {
      type: String,
      trim: true,
      default: "",
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    // ==========================================
    // PUBLISHED
    // ==========================================

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Principal =
  mongoose.models.Principal ||
  mongoose.model("Principal", principalSchema);

export default Principal;