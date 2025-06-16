import Appointment from "../models/Appointment.js";

const getAllAppointments = async () => {
    return await Appointment.find()
    .populate({
      path: 'doctorId',
      populate: {
        path: 'specialtyId',
        select: 'name description'
      },
      select: 'name specialtyId'
    })
    .populate("patientId", "name email");
};

const getAppointment = async (id) => {
  try {
    return await Appointment.findById(id)
      .populate({
        path: "doctorId",
        populate: {
          path: "specialtyId",
          select: "name description",
        },
        select: "name specialtyId",
      })
      .populate("patientId", "name email");
  } catch (error) {
    throw new Error(error);
  }
};

const saveAppointment = async ({ date, doctorId, patientId, status }) => {
  try {
    const prescription = new Appointment({ date, doctorId, patientId, status });
    return await prescription.save();
  } catch (error) {
    throw new Error(error);
  }
};

const updateAppointment = async (id, { date, doctorId, patientId, status }) => {
  try {
    return await Appointment.findByIdAndUpdate(
      id,
      { date, doctorId, patientId, status },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};

const deleteAppointment = async (id) => {
  try {
    return await Appointment.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

const appointmentRepository = {
  getAllAppointments,
  getAppointment,
  saveAppointment,
  updateAppointment,
  deleteAppointment,
};

export default appointmentRepository;
