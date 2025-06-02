// routes/router.js (rotas privadas)
import express from 'express';
import appointmentController from "./AppointmentController.js";
import doctorController from "./DoctorController.js";
import patientController from "./PatientController.js";
import prescriptionController from "./PrescriptionController.js";
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Backend: Med_App", doctorId: req.doctorId });
});

router.use(verifyToken);

router.use("/", appointmentController);
router.use("/", doctorController);
router.use("/", patientController);
router.use("/", prescriptionController);

export default router;
