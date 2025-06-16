import Doctor from "../models/Doctor.js";
import Specialty from "../models/Specialty.js";

const getAllDoctors = async () => {
  return await Doctor.find()
                     .populate("specialtyId", "name code")
                     .lean()
}

const getDoctor = async (id) => {
  try {
    return await Doctor.findById(id)
                       .populate("specialtyId", "name code")
                       .lean();
  } catch (error) {
    throw new Error(error);
  }
}

const saveDoctor = async ({name, login, password, specialtyId, medicalRegistration, email, phone, status}) => {
  try {
    const specialty = await Specialty.findById(specialtyId);

    if (!specialty) {
      throw new Error(`Specialty "${specialtyId}" not found.`)
    }

    const doctor = new Doctor({name, login, password, specialtyId: specialty._id, medicalRegistration, email, phone, status});
    return await doctor.save();
  } catch (error) {
    throw new Error(error);
  }
}

const updateDoctor = async (id, {name, login, password, specialtyId, medicalRegistration, email, phone, status}) => {
  try {
    return await Doctor.findByIdAndUpdate(id, {name, login, password, specialtyId, medicalRegistration, email, phone, status}, {new: true});
  } catch (error) {
    throw new Error(error);
  }
}

const deleteDoctor = async (id) => {
  try {
    return await Doctor.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
}

// Login

const getDoctorByLogin = async (login) => {
  try {
    return await Doctor.findOne({"login": login});
  } catch (error) {
    throw new Error(error);
  }
}

const doctorRepository = {
  getAllDoctors,
  getDoctor,
  saveDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorByLogin,
}

export default doctorRepository;