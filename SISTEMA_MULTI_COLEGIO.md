# 🏫 Sistema Multi-Colegio EduGest PME

## ✅ COMPLETADO - Listo para Usar

Tu sistema ahora es **multi-colegio** con separación total de datos y control de permisos.

---

## 🎯 Características Principales

### 1. Registro Independiente por Colegio
- ✅ Cada colegio se registra con su RBD
- ✅ Cada colegio tiene su propio director
- ✅ Datos completamente separados

### 2. Dashboard Personalizado
- ✅ Cada colegio ve SOLO sus datos
- ✅ Eventos filtrados por institución
- ✅ Estadísticas independientes

### 3. Control de Permisos
- ✅ Director: Acceso total (incluye finanzas)
- ✅ UTP: Puede tener acceso a finanzas
- ✅ Docente: Sin acceso a finanzas
- ✅ Administrador: Acceso total

### 4. Módulo Financiero Restringido
- ✅ Solo usuarios con `permisoFinanzas: true`
- ✅ Gastos separados por colegio
- ✅ Presupuesto independiente

---

## 🚀 Cómo Usar

### Iniciar el Sistema
```bash
npm start
```

Abre: **http://localhost:3000**

---

## 🔐 Credenciales de Prueba

### Liceo Gabriela Mistral

**Director (acceso total):**
```
Email:    director@mistral.cl
Password: Director2026
```

**Docente (sin finanzas):**
```
Email:    docente@mistral.cl
Password: Docente2026
```

**UTP (con finanzas):**
```
Email:    utp@mistral.cl
Password: UTP2026
```

### Colegio Pablo Neruda

**Director:**
```
Email:    director@neruda.cl
Password: Director2026
```

**Docente:**
```
Email:    docente@neruda.cl
Password: Docente2026
```

---

## 📝 Registrar Nuevo Colegio

### Paso 1: Ir al Registro
```
http://localhost:3000/registro.html
```

O desde el login: Click en "¿No tienes cuenta? Registra tu colegio"

### Paso 2: Completar Formulario
- Nombre del Colegio
- RBD (Rol Base de Datos)
- Región
- Nombre del Director
- Email
- Contraseña (mínimo 6 caracteres)

### Paso 3: Iniciar Sesión
Usa las credenciales que acabas de crear.

---

## 🧪 Pruebas Recomendadas

### Test 1: Separación de Datos
1. Login como `director@mistral.cl`
2. Registra un evento en Mistral
3. Cierra sesión
4. Login como `director@neruda.cl`
5. Verifica que NO ves los eventos de Mistral

✅ **Resultado esperado:** Cada colegio ve solo sus datos

### Test 2: Control de Finanzas
1. Login como `docente@mistral.cl`
2. Intenta acceder a "💰 Finanzas"
3. Verás: "⛔ Acceso denegado"
4. Cierra sesión
5. Login como `director@mistral.cl`
6. Accede a Finanzas (funciona)

✅ **Resultado esperado:** Solo usuarios con permiso ven finanzas

### Test 3: Registro de Nuevo Colegio
1. Ve a `/registro.html`
2. Registra "Colegio San José"
3. Inicia sesión
4. Dashboard vacío (sin datos de otros colegios)
5. Registra eventos propios

✅ **Resultado esperado:** Nuevo colegio independiente

---

## 📊 Estructura de Datos

### Colegios
```javascript
{
  "colegio_001": {
    id: "colegio_001",
    nombre: "Liceo Gabriela Mistral",
    rbd: "12345-6",
    region: "Metropolitana",
    fechaRegistro: "2026-02-09",
    activo: true
  }
}
```

### Usuarios
```javascript
{
  "director@mistral.cl": {
    email: "director@mistral.cl",
    password: "Director2026",
    nombre: "Ana María González",
    rol: "director",
    colegioId: "colegio_001",
    permisoFinanzas: true,
    activo: true
  }
}
```

### Eventos (con colegioId)
```javascript
{
  colegioId: "colegio_001",  // ← Filtro por colegio
  dia: 15,
  mes: "MARZO",
  area: "Currículum",
  accion: 1,
  n_eventos: 5,
  exito_objetivo: 85,
  meta: 10,
  exito_meta: 50,
  docente: "María González",
  descripcion: "Talleres de lectura"
}
```

### Gastos (con colegioId)
```javascript
{
  colegioId: "colegio_001",  // ← Filtro por colegio
  fecha: "2026-03-15",
  categoria: "materiales",
  monto: 2500000,
  proveedor: "Librería Educativa",
  descripcion: "Libros y material didáctico"
}
```

---

## 🔒 Seguridad Implementada

### Nivel 1: Autenticación
- Login obligatorio
- Verificación de credenciales
- Sesión persistente

### Nivel 2: Separación de Datos
- Filtro por `colegioId` en todas las consultas
- Cada colegio ve SOLO sus datos
- Imposible ver datos de otros colegios

### Nivel 3: Control de Permisos
- Verificación de `permisoFinanzas`
- Bloqueo de acceso a finanzas para docentes
- Mensaje de error si intenta acceder sin permiso

---

## 📁 Archivos Nuevos Creados

```
✅ registro.html              - Formulario de registro de colegios
✅ js/registro-demo.js        - Lógica de registro
✅ js/auth-demo.js            - Login multi-colegio actualizado
✅ js/dashboard-demo.js       - Dashboard con filtro por colegio
✅ js/formulario-demo.js      - Eventos con colegioId
✅ js/finanzas-demo.js        - Finanzas con permisos y filtro
✅ CREDENCIALES_MULTI_COLEGIO.md - Documentación de credenciales
✅ SISTEMA_MULTI_COLEGIO.md   - Este archivo
```

---

## 🎨 Flujo de Usuario

### Nuevo Colegio
```
1. Registro → 2. Login → 3. Dashboard vacío → 4. Registrar eventos
```

### Colegio Existente
```
1. Login → 2. Dashboard con datos → 3. Ver/Registrar eventos → 4. Finanzas (si tiene permiso)
```

---

## 💡 Casos de Uso Reales

### Caso 1: Municipalidad con 10 Colegios
- Cada colegio se registra independientemente
- Cada director gestiona su PME
- Datos separados por institución
- Control centralizado opcional (futuro)

### Caso 2: Red de Colegios Particulares
- Cada colegio tiene su cuenta
- Directores con acceso total
- Docentes sin acceso a finanzas
- UTP con permisos especiales

### Caso 3: Colegio Individual
- Un solo colegio registrado
- Múltiples usuarios (director, UTP, docentes)
- Control de permisos por rol
- Datos privados y seguros

---

## 🔄 Migrar a Firebase (Futuro)

Cuando quieras usar Firebase real:

1. Los archivos Firebase ya están creados:
   - `js/firebase-config.js`
   - `js/auth.js`
   - `js/dashboard.js`
   - `js/formulario.js`
   - `js/finanzas.js`

2. Cambia en los HTML:
   - `auth-demo.js` → `auth.js`
   - `dashboard-demo.js` → `dashboard.js`
   - etc.

3. Configura Firebase Console

4. La estructura de datos es compatible

---

## 📊 Estadísticas del Sistema

- **Colegios demo:** 2
- **Usuarios demo:** 5
- **Roles disponibles:** 4 (Director, UTP, Docente, Administrador)
- **Páginas:** 5 (Login, Registro, Dashboard, Formulario, Finanzas)
- **Archivos JS:** 5
- **Gráficos:** 6 (4 en dashboard, 2 en finanzas)

---

## ✅ Checklist de Funcionalidades

- [x] Registro de colegios
- [x] Login multi-colegio
- [x] Separación de datos por colegio
- [x] Dashboard personalizado
- [x] Control de permisos por rol
- [x] Finanzas restringidas
- [x] Eventos por colegio
- [x] Gastos por colegio
- [x] 4 gráficos en dashboard
- [x] 2 gráficos en finanzas
- [x] Datos demo incluidos
- [x] Documentación completa

---

## 🎉 ¡Sistema Listo!

```bash
npm start
```

**URL:** http://localhost:3000

**Prueba con:**
- Email: `director@mistral.cl`
- Password: `Director2026`

O registra tu propio colegio en `/registro.html`

---

**Sistema multi-colegio completamente funcional con separación de datos y control de permisos.** 🚀
