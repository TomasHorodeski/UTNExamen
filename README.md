# UTNExamen – Backend (Node + Express + MySQL + Docker)

Backend para gestionar **Usuarios**, **Productos** y **Pedidos** con **JWT**, **bcrypt** y **roles** (`superAdmin`, `admin`, `user`).  
El proyecto se levanta con **Docker Compose** y expone endpoints REST.

---

## Requisitos
- **Docker Desktop** 
- **Git**

---

## Variables de entorno
1. Crear tu archivo `.env` a partir del ejemplo:

   cp .env.example .env
   

2. Valores por defecto:
   env:

   DB_HOST=db
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=UTNExamen

   JWT_SECRET=supersecreto123
   PORT=3000
   

---

## Levantar el proyecto

1. Clonar el repositorio:

git clone https://github.com/TomasHorodeski/UTNExamen.git

cd UTNExamen

2. Levantar con Docker:

docker compose up -d --build


- **API:** [http://localhost:3000](http://localhost:3000)  
- **MySQL:** host `127.0.0.1`, puerto `3309`, usuario `root`, pass `root`, DB `UTNExamen`

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
