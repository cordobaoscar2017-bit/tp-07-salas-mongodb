const { puerto, formatoMorgan } = require("./config/entorno");
const { crearServicioReservas } = require("./servicios/reservas");
const { crearControladorReservas } = require("./controladores/reservas");
const { crearValidadorReservas } = require("./middleware/reservas");
const { crearApp } = require("./app");

const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];

const reservasIniciales = [
  {
    id: 1,
    estudiante: "Juan Pérez",
    email: "juan@gmail.com",
    sala: "Sala Norte",
    fecha: "2026-09-29",
    turno: "Mañana",
    personas: 2,
  },
  {
    id: 2,
    estudiante: "María Gómez",
    email: "maria@gmail.com",
    sala: "Sala Sur",
    fecha: "2026-09-30",
    turno: "Tarde",
    personas: 4,
  },
  {
    id: 3,
    estudiante: "Carlos López",
    email: "carlos@gmail.com",
    sala: "Sala Multimedia",
    fecha: "2026-10-01",
    turno: "Noche",
    personas: 3,
  },
  {
    id: 4,
    estudiante: "Ana Rodríguez",
    email: "ana@gmail.com",
    sala: "Sala Norte",
    fecha: "2026-10-02",
    turno: "Tarde",
    personas: 1,
  },
];

const servicioReservas = crearServicioReservas(reservasIniciales);

const controlador = crearControladorReservas(servicioReservas, salasPermitidas);

const validarReserva = crearValidadorReservas(salasPermitidas);

const app = crearApp({
  controlador,
  validarReserva,
  formatoMorgan,
});

app.listen(puerto, () => {
  console.log(`Servidor funcionando en http://localhost:${puerto}`);
});
