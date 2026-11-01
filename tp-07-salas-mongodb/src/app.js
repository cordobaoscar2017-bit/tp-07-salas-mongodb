const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");

const {
  identificarSolicitud,
  medirDuracion,
} = require("./middleware/solicitudes");

const { crearRouterReservas } = require("./rutas/reservas");

function crearApp({ controlador, validarReserva, formatoMorgan }) {
  const app = express();

  // Middleware general
  app.use(morgan(formatoMorgan));
  app.use(identificarSolicitud);
  app.use(medirDuracion);

  // Configuración de las vistas
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.use(expressLayouts);
  app.set("layout", "layouts/main");

  // Archivos estáticos y formularios
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Título por defecto para las vistas
  app.use((req, res, next) => {
    res.locals.titulo = "TP06 - Salas Modular";
    next();
  });

  // Rutas principales
  app.get("/", controlador.inicio);
  app.get("/estado", controlador.estado);

  // Rutas de reservas
  const reservasRouter = crearRouterReservas(controlador, validarReserva);

  app.use("/reservas", reservasRouter);

  // Página no encontrada
  app.use((req, res) => {
    res.status(404).render("no-encontrado", {
      titulo: "Página no encontrada",
      mensaje: "La dirección solicitada no existe.",
    });
  });

  return app;
}

module.exports = { crearApp };
