import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone:{
      type:Number,
      required:true
    },
    subject: {
      type: String,
      trim: true,
      default: "",
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model(
    "ContactMessage",
    contactMessageSchema
  );

export default ContactMessage;