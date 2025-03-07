import appointment from "../models/Appointment.js";
import prescription from "../models/Prescription.js";
import PrescriptionRepository from "../repositories/PrescriptionRepository.js";
import AppointmentService from "./AppointmentService.js"
import PatientService from "./PatientService.js"
import DoctorService from "./DoctorService.js"

import fs from "fs";
import PDFDocument from "pdfkit"

const getAllPrescriptions = async () => {
  return PrescriptionRepository.getAllPrescriptions();
}

const getPrescription = async (id) => {
  return PrescriptionRepository.getPrescription(id);
}

const savePrescription = async ({date, appointmentId, medicine, dosage, instructions}) => {
  return PrescriptionRepository.savePrescription({date, appointmentId, medicine, dosage, instructions});
}

const updatePrescription = async (id, {date, appointmentId, medicine, dosage, instructions, file}) => {
  return PrescriptionRepository.updatePrescription(id, {date, appointmentId, medicine, dosage, instructions, file});
}

const deletePrescription = async (id) => {
  return PrescriptionRepository.deletePrescription(id);
}

const generatePrescriptionFile = async(prescription) => {
  const appointment = await AppointmentService.getAppointment(prescription.appointmentId);
  const patient = await PatientService.getPatient(appointment.patientId)
  const doctor = await DoctorService.getDoctor(appointment.doctorId);

  const id = prescription._id;
  const document = new PDFDocument({font: "Courier"});
  const filePath = "./MedApp/prescriptions/" + id + ".pdf";

  document.pipe(fs.createWriteStream(filePath));
  document.fontSize(14).text(`Patient Name: ${patient.name}`);
  document.fontSize(14).text(`Doctor Name: ${doctor.name}`);
  document.fontSize(12).text(`Medicine: ${prescription.medicine}`);
  document.fontSize(12).text(`Dose: ${prescription.dosage}`);
  document.fontSize(12).text(`Instructions: ${prescription.instructions}`);

  document.end();

  return prescription;
}


const prescriptionService = {
  getAllPrescriptions,
  getPrescription,
  savePrescription,
  updatePrescription,
  deletePrescription,
  generatePrescriptionFile,
}

export default prescriptionService;