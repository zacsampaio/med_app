import Doctor from "../models/Doctor.js";
import DoctorRepository from "../repositories/DoctorRepository.js";

const getAllDoctors = async () => {
  return DoctorRepository.getAllDoctors();
}

const getDoctor = async (id) => {
  return DoctorRepository.getDoctor(id);
}

const saveDoctor = async ({name, login, password, specialtyId, medicalRegistration, email, phone, status}) => {
  return DoctorRepository.saveDoctor({name, login, password, specialtyId, medicalRegistration, email, phone, status});
}

const updateDoctor = async (id, {name, login, password, specialtyId, medicalRegistration, email, phone, status}) => {
  return DoctorRepository.updateDoctor(id, {name, login, password, specialtyId, medicalRegistration, email, phone, status});
}

const deleteDoctor = async (id) => {
  return DoctorRepository.deleteDoctor(id);
}

// Login

const getDoctorByLogin = async(login) =>{
  return Doctor.findOne({ login }).select("+password");
}


const doctorService = {
  getAllDoctors,
  getDoctor,
  saveDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorByLogin,
}

export default doctorService;