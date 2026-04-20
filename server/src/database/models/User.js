import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["student", "tutor", "recruiter"],
      default: "student"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: { type: String, default: null },
    verificationTokenExpires: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    otpAttempts: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
