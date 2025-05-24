import AppointmentRepository from "../repositories/AppointmentRepository.js";

const getAllAppointments = async () => {
  return AppointmentRepository.getAllAppointments();
}

const getAppointment = async (id) => {
  return AppointmentRepository.getAppointment(id);
}

const saveAppointment = async ({date, doctorId, patientId}) => {
  return AppointmentRepository.saveAppointment({date, doctorId, patientId});
}

const updateAppointment = async (id, {date, doctorId, patientId}) => {
  return AppointmentRepository.updateAppointment(id, {date, doctorId, patientId});
}

const deleteAppointment = async (id) => {
  return AppointmentRepository.deleteAppointment(id);
}

const appointmentService = {
  getAllAppointments,
  getAppointment,
  saveAppointment,
  updateAppointment,
  deleteAppointment,
}

export default appointmentService;