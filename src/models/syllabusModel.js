import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    className: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    fileUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      default: null,
    },

    academicYear: {
      type: String,
      required: true,
      trim: true,
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

const Syllabus =
  mongoose.models.Syllabus ||
  mongoose.model("Syllabus", syllabusSchema);

export default Syllabus;