import mongoose from "mongoose";

const teachingStaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    photo: {
      type: String,
      default: null,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      trim: true,
    },

    subject: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    section: {
      type: String,
      enum: ["school", "higherSecondary"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TeachingStaff =
  mongoose.models.TeachingStaff ||
  mongoose.model("TeachingStaff", teachingStaffSchema);

export default TeachingStaff;