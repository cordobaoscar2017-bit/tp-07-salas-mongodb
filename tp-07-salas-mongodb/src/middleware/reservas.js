function crearValidadorReservas(salasPermitidas) {
  function validarReserva(req, res, next) {
    const { estudiante, email, sala, fecha, turno, personas } = req.body;

    const valores = {
      estudiante: String(estudiante ?? "").trim(),
      email: String(email ?? "").trim(),
      sala: String(sala ?? "").trim(),
      fecha: String(fecha ?? "").trim(),
      turno: String(turno ?? "").trim(),
      personas: String(personas ?? "").trim(),
    };

    const turnosPermitidos = ["Mañana", "Tarde", "Noche"];
    const personasNumero = Number(valores.personas);

    const datosCompletos =
      valores.estudiante !== "" &&
      valores.email !== "" &&
      valores.sala !== "" &&
      valores.fecha !== "" &&
      valores.turno !== "" &&
      valores.personas !== "";

    const emailValido = valores.email.includes("@");
    const salaValida = salasPermitidas.includes(valores.sala);
    const turnoValido = turnosPermitidos.includes(valores.turno);

    const personasValidas =
      Number.isInteger(personasNumero) &&
      personasNumero >= 1 &&
      personasNumero <= 6;

    if (
      !datosCompletos ||
      !emailValido ||
      !salaValida ||
      !turnoValido ||
      !personasValidas
    ) {
      return res.status(400).render("nueva", {
        titulo: "Nueva reserva",
        salas: salasPermitidas,
        valores,
        error:
          "Los datos ingresados no son válidos. Verificá todos los campos.",
      });
    }

    req.reservaValidada = {
      estudiante: valores.estudiante,
      email: valores.email,
      sala: valores.sala,
      fecha: valores.fecha,
      turno: valores.turno,
      personas: personasNumero,
    };

    next();
  }

  return validarReserva;
}

module.exports = {
  crearValidadorReservas,
  prepararAreaReservas,
};
function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de salas";
  next();
}
