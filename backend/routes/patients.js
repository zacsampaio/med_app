import express from "express";
import PatientService from "../services/PatientService.js";

let router = express.Router();

router.get("/patients", async (req, res) => {
  try {
    const patients = await PatientService.getAllPatients();
    res.send(patients);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/getpatient/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await PatientService.getPatient(id);
    res.send(patient);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/postpatient", async (req, res) => {
  const { name, birthDate, email, phone } = req.body;
  try {
    const patient = await PatientService.savePatient({
      name,
      birthDate,
      email,
      phone,
    });
    res.send(patient);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erro interno ao salvar paciente",
      error: error.message,
    });
  }
});

router.put("/patients/:id", async (req, res) => {
  const { id } = req.params;
  const { name, birthDate, email, phone } = req.body;
  try {
    const patient = await PatientService.updatePatient(id, {
      name,
      birthDate,
      email,
      phone,
    });
    res.send(patient);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/patients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await PatientService.deletePatient(id);
    res.send(patient);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
