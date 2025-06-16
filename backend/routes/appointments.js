// routes/appointments.js
import { Router } from "express";
import AppointmentService from "../services/AppointmentService.js";

const router = Router();

/**
 * Helper: devolve JSON de erro padronizado
 */
function handleError(res, err, status = 500) {
  console.error(err);                       // log no servidor
  res.status(status).json({
    message: err?.message || "Erro interno",
  });
}

/* =====================================================
 * /api/appointments
 * ===================================================== */
router
  .route("/")
  /* GET  /api/appointments  →  lista completa */
  .get(async (_, res) => {
    try {
      const data = await AppointmentService.getAllAppointments();
      res.json(data);
    } catch (err) {
      handleError(res, err);
    }
  })

  /* POST /api/appointments  →  cria novo */
  .post(async (req, res) => {
    try {
      const created = await AppointmentService.saveAppointment(req.body);
      res.status(201).json(created);        // 201 = created
    } catch (err) {
      handleError(res, err);
    }
  });

/* =====================================================
 * /api/appointments/:id
 * ===================================================== */
router
  .route("/:id")
  /* GET  /api/appointments/:id  →  detalhe */
  .get(async (req, res) => {
    try {
      const item = await AppointmentService.getAppointment(req.params.id);
      if (!item) return handleError(res, new Error("Appointment not found"), 404);
      res.json(item);
    } catch (err) {
      handleError(res, err);
    }
  })

  /* PATCH  /api/appointments/:id  →  atualiza */
  .patch(async (req, res) => {
    try {
      const updated = await AppointmentService.updateAppointment(
        req.params.id,
        req.body,
      );
      if (!updated)
        return handleError(res, new Error("Appointment not found"), 404);

      res.json(updated);
    } catch (err) {
      handleError(res, err);
    }
  })

  /* DELETE /api/appointments/:id  →  remove */
  .delete(async (req, res) => {
    try {
      const deleted = await AppointmentService.deleteAppointment(req.params.id);
      if (!deleted)
        return handleError(res, new Error("Appointment not found"), 404);

      res.sendStatus(204);                  // 204 = no content
    } catch (err) {
      handleError(res, err);
    }
  });

/* =====================================================
 * /api/appointments/:id/reschedule
 * ===================================================== */
router.patch("/:id/reschedule", async (req, res) => {
  try {
    const { date } = req.body;
    if (!date)
      return handleError(res, new Error("`date` is required"), 400);

    const result = await AppointmentService.rescheduleAppointment(
      req.params.id,
      date,
    );
    if (!result)
      return handleError(res, new Error("Appointment not found"), 404);

    res.json(result);
  } catch (err) {
    handleError(res, err);
  }
});

export default router;
