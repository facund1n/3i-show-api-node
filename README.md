# 3i-show-api-node

Back End Proyecto Final comisión 3i.

- Scripts:

### `npm install`

- Dependencies:
  - Bcryptjs - ^2.4.3
  - Cors: 2.8.5
  - Dotenv: ^16.0.3
  - Express: ^4.18.2
  - Jsonwebtoken ^8.5.1
  - Mongoose: ^6.7.2

# Descripción:

Este proyecto maneja:

- Mongoose: para consultas/validaciónes/esquemas a la base de datos de MongooDB.

- Express: peticiones HTTP - alta, baja, modificación, creación:

* Usuarios: desde Front-end (sesion: login / registro)
* Artículos: desde Postman / Mongodb.

- Registro / Login:

Validaciones que se complementan con el Front, tanto para login y registro, se hacen las querys correspondientes a la base de datos y retornan mensaje con error o sin el que muestra el Front y Consola de Node.

Registro: Se encriptan las contraseñas a guardar en la base de datos de cada usuario con bcryptjs.

Login: Generación de token con jsonwebtoken.
