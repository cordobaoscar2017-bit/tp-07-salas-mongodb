TP07 - Persistencia inicial de reservas con MongoDB

Descripción

Aplicación desarrollada con Node.js y Express para gestionar reservas de salas de estudio.

Este trabajo práctico incorpora persistencia de datos mediante MongoDB y Mongoose, utilizando scripts independientes para crear y consultar reservas almacenadas en la base de datos.

La aplicación web conserva el funcionamiento del TP06 y continúa utilizando reservas en memoria.

El proyecto permite:

Consultar las reservas existentes en la aplicación web.

Ver el detalle de una reserva.

Registrar nuevas reservas desde el formulario.

Validar los datos enviados mediante middleware.

Identificar cada solicitud mediante un ID.

Medir la duración de cada solicitud.

Mostrar una página 404 cuando la dirección no existe.

Comprobar la conexión con MongoDB.

Crear reservas persistentes mediante scripts.

Listar las reservas almacenadas en MongoDB.

Instalación

Clonar o descargar el repositorio y ubicarse dentro de la carpeta del proyecto:

cd tp-07-salas-mongodb

Instalar las dependencias:

npm install

Configuración de variables de entorno

Crear un archivo .env en la raíz del proyecto con las siguientes variables:

PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://USUARIO:CONTRASEÑA@CLUSTER/reservas_salas_u7

Reemplazar los datos de conexión por los correspondientes a la propia base de datos de MongoDB Atlas.

El archivo .env contiene información privada y no debe subirse al repositorio.

El archivo .env.example presenta un ejemplo de las variables necesarias sin incluir credenciales reales.

Ejecución de la aplicación web

Para iniciar el servidor:

npm start

La aplicación estará disponible en:

http://localhost:3000

La aplicación web utiliza reservas almacenadas en memoria, manteniendo el comportamiento del trabajo práctico anterior. No necesita conectarse a MongoDB para iniciar.

Comprobación de sintaxis

Para verificar la sintaxis de los archivos JavaScript:

npm run check

Formato del código

Para aplicar el formato de Prettier:

npm run format

Rutas de la aplicación web

Método

Ruta

Descripción

GET

/

Página de inicio

GET

/estado

Estado del servicio en formato JSON

GET

/reservas

Listado de reservas

GET

/reservas/nueva

Formulario de nueva reserva

GET

/reservas/

Detalle de una reserva

POST

/reservas

Crear una nueva reserva

La ruta /reservas/nueva se encuentra antes de /reservas/:id para evitar que nueva sea interpretado como un identificador.

Configuración de MongoDB

La conexión con MongoDB Atlas se realiza mediante Mongoose.

La configuración se encuentra en:

src/config/base-datos.js

La URI de conexión se obtiene desde las variables de entorno definidas en .env.

La base de datos utilizada es:

reservas_salas_u7

La colección utilizada es:

reservas

Modelo de reserva

El modelo se encuentra en:

src/modelos/reserva.js

Cada reserva contempla los siguientes campos:

Campo

Tipo

Validación

estudiante

String

Obligatorio y sin espacios externos

email

String

Obligatorio y debe contener @

sala

String

Sala Norte, Sala Sur o Sala Multimedia

fecha

String

Obligatoria

turno

String

Mañana, Tarde o Noche

personas

Number

Número entero entre 1 y 6

Mongoose permite definir el esquema y validar los datos antes de almacenarlos.

Scripts de persistencia

Los scripts se encuentran dentro de la carpeta scripts.

1. Comprobar conexión

node scripts/comprobar-conexion.js

Este script comprueba que la conexión con MongoDB Atlas se establezca correctamente.

2. Crear una reserva

node scripts/crear-reserva.js

Este script crea una reserva y la almacena en MongoDB.

Los datos se validan mediante el modelo de Mongoose antes de guardarse.

3. Listar reservas

node scripts/listar-reservas.js

Este script consulta y muestra las reservas almacenadas en la colección reservas.

Persistencia de datos

El proyecto diferencia dos formas de almacenamiento:

Aplicación web

La aplicación Express utiliza un arreglo en memoria para gestionar las reservas. Las nuevas reservas realizadas desde el formulario no se guardan en MongoDB.

Cuando se detiene y vuelve a iniciar el servidor, se recuperan únicamente las reservas iniciales definidas en el código.

Scripts independientes

Los scripts utilizan Mongoose para conectarse a MongoDB Atlas.

Las reservas creadas mediante crear-reserva.js quedan almacenadas en la base de datos y pueden consultarse posteriormente mediante listar-reservas.js.

Por lo tanto, los datos guardados en MongoDB permanecen disponibles aunque se cierre el servidor o finalice el proceso de Node.js.

Estructura principal del proyecto

tp-07-salas-mongodb/
│
├── src/
│   ├── app.js
│   ├── index.js
│   │
│   ├── config/
│   │   ├── entorno.js
│   │   └── base-datos.js
│   │
│   ├── controladores/
│   ├── middleware/
│   ├── modelos/
│   │   └── reserva.js
│   ├── rutas/
│   └── servicios/
│
├── scripts/
│   ├── comprobar-conexion.js
│   ├── crear-reserva.js
│   └── listar-reservas.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md

Tecnologías utilizadas

Node.js

Express

MongoDB Atlas

Mongoose

dotenv

EJS

express-ejs-layouts

Morgan

Prettier

HTML

CSS

Autor

Trabajo Práctico 07 - Persistencia inicial de reservas con MongoDB.