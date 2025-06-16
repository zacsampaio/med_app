// routes/prescriptions.js
import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import PrescriptionService from "../services/PrescriptionService.js";

const router = Router();

/* =====================================================
 * Helper: padroniza resposta de erro
 * ===================================================== */
function handleError(res, err, status = 500) {
  console.error(err);
  res.status(status).json({
    message: err?.message || "Erro interno",
  });
}

/* =====================================================
 * Configuração de upload (PDF ou imagem)
 * ===================================================== */
const UPLOAD_DIR = path.join(process.cwd(), "src", "prescriptions");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

/* =====================================================
 * /api/prescriptions
 * ===================================================== */
router
  .route("/")
  /* GET  /api/prescriptions → lista */
  .get(async (_, res) => {
    try {
      const data = await PrescriptionService.getAllPrescriptions();
      res.json(data);
    } catch (err) {
      handleError(res, err);
    }
  })
  /* POST /api/prescriptions → cria */
  .post(async (req, res) => {
    try {
      const created = await PrescriptionService.savePrescription(req.body);
      res.status(201).json(created);
    } catch (err) {
      handleError(res, err);
    }
  });

/* =====================================================
 * /api/prescriptions/:id
 * ===================================================== */
router
  .route("/:id")
  /* GET → detalhe */
  .get(async (req, res) => {
    try {
      const item = await PrescriptionService.getPrescription(req.params.id);
      if (!item)
        return handleError(res, new Error("Prescription not found"), 404);
      res.json(item);
    } catch (err) {
      handleError(res, err);
    }
  })
  /* PUT → atualiza */
  .put(async (req, res) => {
    try {
      const updated = await PrescriptionService.updatePrescription(
        req.params.id,
        req.body,
      );
      if (!updated)
        return handleError(res, new Error("Prescription not found"), 404);
      res.json(updated);
    } catch (err) {
      handleError(res, err);
    }
  })
  /* DELETE → remove */
  .delete(async (req, res) => {
    try {
      const deleted = await PrescriptionService.deletePrescription(
        req.params.id,
      );
      if (!deleted)
        return handleError(res, new Error("Prescription not found"), 404);
      res.sendStatus(204); // no‑content
    } catch (err) {
      handleError(res, err);
    }
  });

/* =====================================================
 * /api/prescriptions/:id/file          (upload)
 * /api/prescriptions/:id/file/download (download)
 * ===================================================== */

/* upload (campo "file") */
router.post(
  "/:id/file",
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file)
        return handleError(res, new Error("Nenhum arquivo enviado"), 400);

      const filePath = path.relative(process.cwd(), req.file.path); // salva caminho relativo
      const updated = await PrescriptionService.updatePrescription(
        req.params.id,
        { file: filePath },
      );
      if (!updated)
        return handleError(res, new Error("Prescription not found"), 404);

      res.json(updated);
    } catch (err) {
      handleError(res, err);
    }
  },
);

/* download */
router.get("/:id/file/download", async (req, res) => {
  try {
    const prescription = await PrescriptionService.getPrescription(
      req.params.id,
    );
    if (!prescription?.file)
      return handleError(res, new Error("Arquivo não encontrado"), 404);

    const absolutePath = path.resolve(process.cwd(), prescription.file);
    res.sendFile(absolutePath);
  } catch (err) {
    handleError(res, err);
  }
});

/* =====================================================
 * /api/prescriptions/:id/generate (gera PDF automático)
 * ===================================================== */
router.get("/:id/generate", async (req, res) => {
  try {
    const prescription = await PrescriptionService.getPrescription(
      req.params.id,
    );
    if (!prescription)
      return handleError(res, new Error("Prescription not found"), 404);

    /* Gera/atualiza arquivo PDF */
    const file = await PrescriptionService.generatePrescriptionFile(
      prescription,
    );
    const updated = await PrescriptionService.updatePrescription(
      req.params.id,
      { file },
    );
    res.json(updated);
  } catch (err) {
    handleError(res, err);
  }
});

export default router;
