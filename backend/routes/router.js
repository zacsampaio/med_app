// routes/router.js (rotas privadas)
import express from 'express';
import appointments from "./appointments.js";
import doctors from "./doctors.js";
import patients from "./patients.js";
import prescriptions from "./prescriptions.js";
import specialties from "./specialties.js"
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Backend: Med_App", doctorId: req.doctorId });
});

router.use(verifyToken);

router.use("/appointments", appointments);
router.use("/specialties", specialties);
router.use("/", doctors);
router.use("/", patients);
router.use("/", prescriptions);

export default router;
