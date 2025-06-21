import mongoose from "mongoose";
import Patient from "./Patient.js";
import Doctor from "./Doctor.js";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "Appointment Date is required."],
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "DoctorId is required."],
      validate: {
        validator: async (v) => await Doctor.exists({ _id: v }),
        message: (props) => `DoctorID: ${props.value} not found.`,
      },
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "PatientId is required."],
      validate: {
        validator: async (v) => await Patient.exists({ _id: v }),
        message: (props) => `PatientID ${props.value} not found.`,
      },
    },

    status: {
      type: String,
      enum: ["scheduled", "in_progress", "completed", "cancelled", "rescheduled"],
      default: "scheduled",
      required: true,
    },
  },
  { timestamps: true }
);

appointmentSchema.index({ date: 1, doctorId: 1 });
appointmentSchema.index({ status: 1 });

export default mongoose.model("Appointment", appointmentSchema);
