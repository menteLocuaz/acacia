# API — Referencia de Endpoints

Base URL: `http://localhost:9090/api/v1`

**Autenticación:** `Authorization: Bearer <token>` en todos los endpoints marcados con 🔒.  
**Content-Type:** `application/json` en todas las peticiones con body.

---

## Respuesta estándar

```json
{ "status": "success", "message": "...", "data": { } }
```
Errores devuelven el código HTTP correspondiente:
```json
{ "status": "error", "message": "Descripción del error" }
```

## Paginación (cursor-based)

Los endpoints de listado aceptan:

| Param       | Tipo    | Descripción                                  |
|-------------|---------|----------------------------------------------|
| `limit`     | int     | Registros por página (default 20)            |
| `last_id`   | UUID    | ID del último ítem recibido                  |
| `last_date` | RFC3339 | Fecha del último ítem (ISO 8601 con timezone)|

---

## 1. Autenticación (`/auth`)

### POST /auth/login
```json
{ "email": "admin@prunus.com", "password": "Admin123" }
```
**200:**
```json
{
  "data": {
    "token": "jwt...",
    "usuario": { },
    "expires_at": 1234567890
  }
}
```

### GET /auth/me 🔒
Devuelve el usuario autenticado.

### POST /auth/refresh-token 🔒
No requiere body. Devuelve `{ "token": "...", "expires_at": 1234567890 }`.

### POST /auth/logout 🔒
No requiere body.

---

## 2. Usuarios (`/usuarios`) 🔒

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Listar (paginado) |
| POST | `/` | Crear usuario |
| GET | `/{id}` | Obtener por ID |
| PUT | `/{id}` | Actualizar |
| DELETE | `/{id}` | Eliminar (204) |
| POST | `/administrar` | Crear con accesos multi-sucursal |
| POST | `/administrar/{id}` | Actualizar con accesos multi-sucursal |

**Body (POST / PUT):**
```json
{
  "id_sucursal": "uuid",
  "id_rol": "uuid",
  "username": "cajero01",
  "email": "cajero01@empresa.com",
  "usu_nombre": "Juan Pérez",
  "usu_dni": "12345678",
  "usu_telefono": "099999999",
  "password": "MiPassword1",
  "usu_tarjeta_nfc": "NFC_CODE",
  "usu_pin_pos": "1234",
  "nombre_ticket": "Juan",
  "id_status": "uuid",
  "sucursales_acceso": ["uuid1", "uuid2"]
}
```
`username` (4–50), `email`, `usu_nombre` (3–100), `usu_dni` (8–15) y `password` (mín 6) son requeridos en POST. En PUT `password` es opcional.

---

## 3. Roles (`/roles`) 🔒

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Listar |
| POST | `/` | Crear |
| GET | `/{id}` | Obtener por ID |
| PUT | `/{id}` | Actualizar |
| DELETE | `/{id}` | Eliminar (204) |

**Body:**
```json
{ "nombre_rol": "Cajero", "id_sucursal": "uuid", "id_status": "uuid" }
```
`nombre_rol` (3–100) requerido.