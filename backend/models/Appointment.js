import mongoose from "mongoose";
import Patient from "./Patient.js"
import Doctor from "./Doctor.js"

const Schema = mongoose.Schema;

const appointmentSchema = new Schema ({
  date: {
    type: Date,
    require: [true, 'Appointment Date is required.']
  },
  doctorId: {
    type: String,
    required: [true, "DoctorId is required."],
    validate: {
      validator: function (v){
        const id = new mongoose.Types.ObjectId(v); //convertendo uma string em objeto ID para ser encontrado no banco
        return Doctor.exists({_id: id});
      },
      message: props => `DoctorID: ${props.value} not found.`
    }
  },
  patientId: {
    type: String,
    required: [true, "PatientId is required."],
    validate: {
      validator: function (v){
        const id = new mongoose.Types.ObjectId(v); //convertendo uma string em objeto ID para ser encontrado no banco
        return Patient.exists({_id: id});
      },
      message: props => `PatientID: ${props.value} not found.`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const appointment = mongoose.model('Appointment', appointmentSchema);

export default appointment;