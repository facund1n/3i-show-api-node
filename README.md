# 3i-show-api-node

Back End Proyecto Final comisión 3i.

- Scripts:

### `npm install`

- Dependencies:
  - "bcryptjs": "^2.4.3"
  - "cors": "^2.8.5"
  - "dotenv": "^16.0.3"
  - "express": "^4.18.2"
  - "jsonwebtoken": "^8.5.1"
  - "mongoose": "^6.7.2"

# Descripción:

Este proyecto maneja:

- Mongoose: para consultas/validaciónes/esquemas a la base de datos de MongooDB.

- Express: peticiones HTTP - alta, baja, modificación, creación:

* Usuarios: desde Front-end (sesion: login / registro)
* Artículos: desde Postman / Mongodb.

- Registro / Login:

Validaciones que se complementan con el Front, tanto para login y registro, se hacen las querys correspondientes a la base de datos y retornan mensaje con error o sin el.

Registro: Se encriptan las contraseñas a guardar en la base de datos de cada usuario con bcryptjs.

Login: Generación de token con jsonwebtoken.
