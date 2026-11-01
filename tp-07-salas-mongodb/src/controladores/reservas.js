function crearControladorReservas(servicio, salasPermitidas) {
  function inicio(req, res) {
    res.render("inicio", {
      titulo: "Reservas de salas",
    });
  }

  function estado(req, res) {
    res.json({
      servicio: "activo",
      reservas: servicio.contar(),
      solicitudId: res.locals.solicitudId,
    });
  }

  function listar(req, res) {
    res.render("reservas/lista", {
      titulo: "Listado de reservas",
      reservas: servicio.listar(),
    });
  }

  function nueva(req, res) {
    res.render("nueva", {
      titulo: "Nueva reserva",
      salas: salasPermitidas,
      valores: {},
    });
  }

  function detalle(req, res) {
    const reserva = servicio.buscarPorId(req.params.id);

    if (!reserva) {
      return res.status(404).render("no-encontrado", {
        titulo: "Reserva no encontrada",
        mensaje: "La reserva solicitada no existe.",
      });
    }

    res.render("reservas/detalle", {
      titulo: "Detalle de reserva",
      reserva,
    });
  }

  function crear(req, res) {
    servicio.crear(req.reservaValidada);
    res.redirect("/reservas");
  }

  return {
    inicio,
    estado,
    listar,
    nueva,
    detalle,
    crear,
  };
}

module.exports = { crearControladorReservas };
