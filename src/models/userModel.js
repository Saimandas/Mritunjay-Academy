import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    schoolName:{
      type:String,
      required:true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin","operator"],
      default: "operator",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

export default User;