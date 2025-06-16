// routes/specialties.js
import { Router } from "express";
import SpecialtyService from "../services/SpecialtyService.js";

const router = Router();

function handleError(res, err, status = 500) {
  console.error(err);
  res.status(status).json({ message: err.message });
}

/* ===== /api/specialties ===== */
router
  .route("/")
  // GET /api/specialties?search=card
  .get(async (req, res) => {
    try {
      const data = await SpecialtyService.list({ search: req.query.search });
      res.json(data);
    } catch (err) {
      handleError(res, err);
    }
  })
  // POST /api/specialties
  .post(async (req, res) => {
    try {
      const created = await SpecialtyService.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      handleError(res, err);
    }
  });

/* ===== /api/specialties/:id ===== */
router
  .route("/:id")
  // PATCH /api/specialties/:id
  .patch(async (req, res) => {
    try {
      const updated = await SpecialtyService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      handleError(res, err);
    }
  })
  // DELETE /api/specialties/:id
  .delete(async (req, res) => {
    try {
      await SpecialtyService.remove(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      handleError(res, err);
    }
  });

export default router;
