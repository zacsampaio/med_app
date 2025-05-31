import express from 'express';
import appointmentController from "./AppointmentController.js";
import doctorController from "./DoctorController.js";
import patientController from "./PatientController.js";
import prescriptionController from "./PrescriptionController.js";
import doctorService from '../services/DoctorService.js';
import bcrypt from "bcrypt";
import verifyToken from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';

let router = express.Router();

router.get(
  "/", verifyToken, function(req, res){
    res.status(200).json({message: "Backend: Med_App", doctorId: req.doctorId});
  }
);

// Mapeamento Login

router.post('/login', async (req, res) =>{
  try {
    const {login, password } = req.body;
    const doctor = await doctorService.getDoctorByLogin(login);
    if (!doctor){
      return res.status(401).json({error: "Authentication failed!"});
    }

    const passwordMatch = await bcrypt.compare(password, doctor.password);
    if (!passwordMatch){
      return res.status(401).json({error: "Authentication failed!"})
    }

    const token = jwt.sign({doctorId: doctor._id}, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // só funciona via HTTPS
        sameSite: 'lax', // evitar envio entre domínios
        maxAge: 60 * 60 * 1000 // 1hr
      })
      .status(200)    
      .json({message: 'Login bem-sucedido.', token});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Login failed!'})
  }
});

router.use("/", verifyToken, appointmentController);
router.use("/", verifyToken, doctorController);
router.use("/", verifyToken, patientController);
router.use("/", verifyToken, prescriptionController);

export default router;