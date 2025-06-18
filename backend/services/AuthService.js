import doctorService from "./DoctorService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ONE_HOUR_IN_SECONDS = 60 * 60;

const AuthService = {
  async login({ login, password }) {
    const doctor = await doctorService.getDoctorByLogin(login);
    if (!doctor) {
      throw new Error("Authentication failed!");
    }

    const passwordMatch = await bcrypt.compare(password, doctor.password);
    if (!passwordMatch) {
      throw new Error("Authentication failed!");
    }

    const token = jwt.sign({ doctorId: doctor._id }, process.env.SECRET_KEY, {
      expiresIn: ONE_HOUR_IN_SECONDS,
    });

    return {
      id: doctor._id,
      login: doctor.login,
      token,
      expiresIn: ONE_HOUR_IN_SECONDS,
    };
  },

  async registerDoctor(doctorData) {
    const hashedPassword = await bcrypt.hash(doctorData.password, 10);
    const newDoctorData = {
      ...doctorData,
      password: hashedPassword,
    };

    const savedDoctor = await doctorService.saveDoctor(newDoctorData);

    return savedDoctor;
  },
};

export default AuthService;
