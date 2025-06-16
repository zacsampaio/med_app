import mongoose from "mongoose";
import Specialty from "./Specialty.js";

const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required."],
      trim: true,
    },

    login: {
      type: String,
      required: [true, "Login is required."],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
      select: false,
    },

    specialtyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialty",
      validate: {
        validator: async (v) => await Specialty.exists({ _id: v }),
        message: (props) => `SpecialtyID ${props.value} not found.`,
      },
    },

    medicalRegistration: {
      type: String,
      required: [true, "Medical Registration is required."],
      unique: true,
    },

    email: {
      type: String,
      required: [true, "E-mail contact is required."],
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required."],
      validate: {
        validator: (v) => /^\d{2} 9\d{4}-\d{4}$/.test(v),
        message: (props) =>
          `${props.value} is not a valid phone number. Format: 99 91234-5678`,
      },
    },

    status: {
      type: String,
      enum: ["available", "busy", "inactive"],
      default: "available",
      required: true,
    },

  },
  { timestamps: true }
);

doctorSchema.index({ specialtyId: 1, status: 1 });

export default mongoose.model("Doctor", doctorSchema);
