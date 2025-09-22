# UTNExamen – Backend (Node + Express + MySQL + Docker)

Backend para gestionar **Usuarios**, **Productos** y **Pedidos** con **JWT**, **bcrypt** y **roles** (`superAdmin`, `admin`, `user`).  
El proyecto se levanta con **Docker Compose** y expone endpoints REST.

---

## Levantar el proyecto

`Clonar el repositorio`:

1. git clone https://github.com/TomasHorodeski/UTNExamen.git

2. cd UTNExamen

`Levantar con Docker`:

1. docker compose up -d --build

- **API:** [http://localhost:3000](http://localhost:3000)  
- **MySQL:** host `127.0.0.1`, puerto `3309`, usuario `root`, pass `root`, DB `UTNExamen`

---

## Variables de entorno

Crear tu archivo `.env` a partir del ejemplo:

1. cp .env.example .env

---

## Autenticación y Roles:

Registro de usuario con `contraseña hasheada`

Login que devuelve `JWT`

Middleware para validar `token`

---

## Guards de roles:

`superAdmin`: crear y eliminar usuarios

`admin`: gestiona productos

`user`: crear pedidos

---

## Seed inicial y relaciones
- Tablas: `Usuario`, `Producto`, `Pedido`, `OrderItem`  
- Relaciones:
  - `Usuario (1) — (N) Pedido`
  - `Pedido (N) — (N) Producto` vía `OrderItem`

Usuarios iniciales:
- **superAdmin** → `admin@utn.test` / `admin123`
- **user** → `user@utn.test` / `user123`

Contraseñas están hasheadas con **bcrypt**.

---

## Endpoints principales

### Salud
- `GET /api/ping` → `{ ok: true, message: 'pong' }`

### Auth
- `POST /api/auth/register` → registrar usuario (password con bcrypt)
- `POST /api/auth/login` → devuelve `{ token }`

### Productos
- `GET /api/productos` → público
- `GET /api/productos/:id` → público
- `POST /api/productos` → **admin/superAdmin**
- `PUT /api/productos/:id` → **admin/superAdmin**
- `DELETE /api/productos/:id` → **admin/superAdmin**

### Pedidos
- `POST /api/pedidos` → **user** crea pedido con items
- `GET /api/pedidos/reporte` → **admin/superAdmin**

### Usuarios
- `GET /api/usuarios/reporte` → **admin/superAdmin**
- `DELETE /api/usuarios/:id` → **superAdmin**

---

## Reportes con consultas JOIN y WHERE

El sistema incluye reportes generados con consultas SQL: `3 ejemplos SQL`

`Lista Pedidos por Usuario`: Muestra todos los pedidos de un usuario en particular (por email).

SELECT p.id AS pedido_id, u.email

FROM Pedido p

JOIN Usuario u ON p.usuarioId = u.id

WHERE u.email = 'user@utn.test';

`Total de Productos en un Pedido`: Calcula la cantidad total de productos en un pedido específico.

SELECT p.id AS pedido_id, SUM(oi.cantidad) AS total_productos

FROM Pedido p

JOIN OrderItem oi ON p.id = oi.pedidoId

WHERE p.id = 1

GROUP BY p.id;

`Usuarios con más Pedidos`: Cuenta cuántos pedidos hizo cada usuario con rol user y los ordena de mayor a menor.

SELECT u.email, COUNT(p.id) AS total_pedidos

FROM Usuario u

JOIN Pedido p ON u.id = p.usuarioId

WHERE u.rol = 'user'

GROUP BY u.id, u.email

ORDER BY total_pedidos DESC;

---

## Validaciones y manejo de errores

1. Validación de inputs en register, login, productos y pedidos

2. Manejo centralizado de errores con middleware (try/catch y next(err))

3. Respuestas consistentes con códigos HTTP adecuados (400, 401, 403, 404, 500)

---