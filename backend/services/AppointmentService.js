import AppointmentRepository from "../repositories/AppointmentRepository.js";

const getAllAppointments = async () => {
  return AppointmentRepository.getAllAppointments();
};

const getAppointment = async (id) => {
  return AppointmentRepository.getAppointment(id);
};

const saveAppointment = async ({ date, doctorId, patientId, status }) => {
  return AppointmentRepository.saveAppointment({
    date,
    doctorId,
    patientId,
    status,
  });
};

const updateAppointment = async (id, { date, doctorId, patientId, status }) => {
  return AppointmentRepository.updateAppointment(id, {
    date,
    doctorId,
    patientId,
    status,
  });
};

const deleteAppointment = async (id) => {
  return AppointmentRepository.deleteAppointment(id);
};

const rescheduleAppointment = async (id, newDate) => {
  return AppointmentRepository.updateAppointment(id, {
    date: newDate,
    status: "rescheduled",
  });
};

const appointmentService = {
  getAllAppointments,
  getAppointment,
  saveAppointment,
  updateAppointment,
  deleteAppointment,
  rescheduleAppointment,
};

export default appointmentService;
