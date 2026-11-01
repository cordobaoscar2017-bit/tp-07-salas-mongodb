const express = require("express");

function crearRouterReservas(controlador, validarReserva) {
  const router = express.Router();

  // Middleware de la sección de reservas
  router.use((req, res, next) => {
    res.locals.seccion = "Reservas de salas";
    next();
  });

  // IMPORTANTE: /nueva debe ir antes de /:id
  router.get("/", controlador.listar);
  router.get("/nueva", controlador.nueva);
  router.get("/:id", controlador.detalle);

  // Validar antes de crear una reserva
  router.post("/", validarReserva, controlador.crear);

  return router;
}

module.exports = { crearRouterReservas };
