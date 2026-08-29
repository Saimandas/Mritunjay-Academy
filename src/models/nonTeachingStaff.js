import mongoose from "mongoose";

const nonTeachingStaffSchema = new mongoose.Schema(
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

    department: {
      type: String,
      trim: true,
    },

    qualification: {
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
  },
  {
    timestamps: true,
  }
);

const NonTeachingStaff =
  mongoose.models.NonTeachingStaff ||
  mongoose.model("NonTeachingStaff", nonTeachingStaffSchema);

export default NonTeachingStaff;