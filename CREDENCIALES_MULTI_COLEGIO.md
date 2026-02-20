# 🏫 Sistema Multi-Colegio - Credenciales

## ✅ Nuevo Sistema Implementado

Cada colegio tiene:
- ✅ Su propio registro independiente
- ✅ Su propio dashboard con datos separados
- ✅ Sus propios eventos y finanzas
- ✅ Control de permisos por rol

---

## 🎓 Colegios Demo Incluidos

### 1️⃣ Liceo Gabriela Mistral (RBD: 12345-6)

#### 👨‍💼 Director - Acceso Total
```
Email:    director@mistral.cl
Password: Director2026
```
**Permisos:**
- ✅ Ver Dashboard
- ✅ Registrar Eventos
- ✅ Ver Finanzas
- ✅ Registrar Gastos

#### 👨‍🏫 Docente - Sin Finanzas
```
Email:    docente@mistral.cl
Password: Docente2026
```
**Permisos:**
- ✅ Ver Dashboard
- ✅ Registrar Eventos
- ❌ NO puede ver Finanzas

#### 👩‍💼 UTP - Con Finanzas
```
Email:    utp@mistral.cl
Password: UTP2026
```
**Permisos:**
- ✅ Ver Dashboard
- ✅ Registrar Eventos
- ✅ Ver Finanzas (tiene permiso especial)
- ✅ Registrar Gastos

---

### 2️⃣ Colegio Pablo Neruda (RBD: 67890-1)

#### 👨‍💼 Director - Acceso Total
```
Email:    director@neruda.cl
Password: Director2026
```
**Permisos:**
- ✅ Ver Dashboard
- ✅ Registrar Eventos
- ✅ Ver Finanzas
- ✅ Registrar Gastos

#### 👨‍🏫 Docente - Sin Finanzas
```
Email:    docente@neruda.cl
Password: Docente2026
```
**Permisos:**
- ✅ Ver Dashboard
- ✅ Registrar Eventos
- ❌ NO puede ver Finanzas

---

## 🌐 Super Usuario - Administración Global

### 👨‍💼 Super Admin - Ve Todos los Colegios
```
Email:    admin@edugest.cl
Password: Admin2026
```
**Permisos:**
- ✅ Ver todos los colegios del sistema
- ✅ Ver estadísticas globales
- ✅ Ver eventos de todos los colegios
- ✅ Ver finanzas de todos los colegios
- ✅ Acceso a panel de administración global
- ✅ Gráficos comparativos entre colegios

**Nota:** El super usuario es redirigido automáticamente al panel global (admin-global.html) al iniciar sesión.

---

## 🆕 Registrar Nuevo Colegio

### Opción 1: Usar el Formulario de Registro

1. Abre: http://localhost:3000/registro.html
2. Completa los datos:
   - Nombre del Colegio
   - RBD
   - Región
   - Nombre del Director
   - Email
   - Contraseña
3. Click "Registrar Colegio"
4. Inicia sesión con las credenciales creadas

### Opción 2: Desde el Login

1. Abre: http://localhost:3000
2. Click en "¿No tienes cuenta? Registra tu colegio"
3. Completa el formulario
4. Inicia sesión

---

## 🔐 Control de Permisos

### Roles Disponibles

| Rol | Dashboard | Eventos | Finanzas |
|-----|-----------|---------|----------|
| **Director** | ✅ | ✅ | ✅ |
| **UTP** | ✅ | ✅ | ✅ |
| **Docente** | ✅ | ✅ | ❌ |
| **Administrador** | ✅ | ✅ | ✅ |

### Cómo Funciona

- **Director**: Siempre tiene acceso a finanzas
- **UTP**: Puede tener acceso a finanzas (configurable)
- **Docente**: NUNCA ve finanzas
- **Administrador**: Acceso total

---

## 📊 Separación de Datos

### Cada Colegio Ve Solo Sus Datos

**Liceo Gabriela Mistral:**
- Dashboard: Solo eventos de Mistral
- Finanzas: Solo gastos de Mistral
- Docentes: Solo docentes de Mistral

**Colegio Pablo Neruda:**
- Dashboard: Solo eventos de Neruda
- Finanzas: Solo gastos de Neruda
- Docentes: Solo docentes de Neruda

**Los datos están completamente separados.**

---

## 🧪 Probar el Sistema

### Test 1: Separación de Datos

1. Login como `director@mistral.cl`
2. Ve el dashboard (verás datos de Mistral)
3. Registra un evento
4. Cierra sesión
5. Login como `director@neruda.cl`
6. Ve el dashboard (verás datos de Neruda, NO de Mistral)

### Test 2: Control de Permisos

1. Login como `docente@mistral.cl`
2. Intenta acceder a Finanzas
3. Verás mensaje: "⛔ Acceso denegado"
4. Cierra sesión
5. Login como `director@mistral.cl`
6. Accede a Finanzas (funciona correctamente)

### Test 3: Registro de Nuevo Colegio

1. Ve a http://localhost:3000/registro.html
2. Registra un nuevo colegio:
   - Nombre: "Colegio San José"
   - RBD: "11111-1"
   - Director: "Pedro González"
   - Email: "director@sanjose.cl"
   - Password: "SanJose2026"
3. Inicia sesión con las nuevas credenciales
4. Verás un dashboard vacío (sin datos de otros colegios)

---

## 🚀 Iniciar el Sistema

```bash
npm start
```

Abre: http://localhost:3000

---

## 📋 Resumen de Credenciales

### Liceo Gabriela Mistral
- Director: `director@mistral.cl` / `Director2026`
- Docente: `docente@mistral.cl` / `Docente2026`
- UTP: `utp@mistral.cl` / `UTP2026`

### Colegio Pablo Neruda
- Director: `director@neruda.cl` / `Director2026`
- Docente: `docente@neruda.cl` / `Docente2026`

---

## 💾 Almacenamiento

Los datos se guardan en **localStorage**:

- `colegios` - Lista de colegios registrados
- `usuarios` - Lista de usuarios con sus roles y permisos
- `demoEventos` - Eventos de todos los colegios (filtrados por colegioId)
- `demoGastos` - Gastos de todos los colegios (filtrados por colegioId)
- `demoUser` - Usuario actual en sesión

---

## 🔄 Resetear Sistema

Para borrar todos los datos y empezar de cero:

```javascript
// Abre la consola del navegador (F12) y ejecuta:
localStorage.clear();
location.reload();
```

---

## ✅ Características Implementadas

- ✅ Registro de nuevos colegios
- ✅ Login multi-colegio
- ✅ Separación total de datos por colegio
- ✅ Control de permisos por rol
- ✅ Finanzas solo para usuarios autorizados
- ✅ Dashboard personalizado por colegio
- ✅ Eventos y gastos separados por institución

---

## 🎯 Casos de Uso

### Caso 1: Director ve todo
```
Login: director@mistral.cl
- Dashboard ✅
- Eventos ✅
- Finanzas ✅
```

### Caso 2: Docente sin finanzas
```
Login: docente@mistral.cl
- Dashboard ✅
- Eventos ✅
- Finanzas ❌ (bloqueado)
```

### Caso 3: UTP con permisos especiales
```
Login: utp@mistral.cl
- Dashboard ✅
- Eventos ✅
- Finanzas ✅ (tiene permiso)
```

---

**¡Sistema multi-colegio completamente funcional!** 🎉
