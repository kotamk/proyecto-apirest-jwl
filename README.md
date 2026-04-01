# PROYECTO PORTAFOLIO M8

Esta es una API REST con un Frontend integrado que funciona como una tienda en línea. Cumple con los requisitos de registro/login de usuarios mediante JSON Web Tokens (JWT) y el manejo individual de compras por usuario.

## Características de la Aplicación

- **Autenticación con JWT:** Los usuarios pueden registrarse e iniciar sesión. La API utiliza JWT para asegurar los endpoints sensibles.
- **Carritos de Compra Independientes:** Cada usuario registrado posee su propio carrito de compras, lo que permite que cada cliente gestione sus productos de forma aislada.
- **Tienda Exclusiva para Registrados:** La validación mediante tokens asegura que solamente los usuarios que han iniciado sesión puedan agregar productos al carrito y procesar ventas.
- **Procesamiento de Ventas:** Al comprar, se descuenta el stock de manera transaccional y se limpia automáticamente el carrito del usuario.

## Tecnologías Utilizadas

- **Backend:** Node.js, Express
- **Base de Datos:** PostgreSQL con ORM Sequelize
- **Autenticación:** JSON Web Tokens (jsonwebtoken)
- **Frontend / Vistas:** Express Handlebars (`express-handlebars`)
- **Otros:** `express-fileupload` (imágenes), `morgan` (logs), `dotenv` (variables de entorno)

## ¿Cómo funciona?

1. **Configuración:** Renombra el archivo `.env.example` a `.env` y configura las credenciales de tu base de datos PostgreSQL.
2. **Instalación:** Ejecuta `npm install` para instalar las dependencias.
3. **Ejecución:** Ejecuta `npm run dev` para iniciar el servidor de desarrollo. Sequelize creará automáticamente las tablas en la base de datos la primera vez.
4. **Navegación:** La aplicación principal sirve las vistas (`/home`, `/login`, `/register`, `/productos`, `/carrito/:id`), mientras que todas las operaciones de datos se comunican con el servidor a través de la ruta `/api/...` mediante peticiones `fetch` que envían el token JWT del usuario para validar la sesión.