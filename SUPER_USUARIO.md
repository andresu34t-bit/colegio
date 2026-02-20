# 🌐 Super Usuario - Administración Global

## ✅ Implementado

El sistema ahora incluye un **Super Usuario** que puede ver y administrar todos los colegios del sistema desde un panel global.

---

## 🔐 Credenciales del Super Usuario

```
Email:    admin@edugest.cl
Password: Admin2026
```

**Permisos:**
- ✅ Ver todos los colegios registrados
- ✅ Ver estadísticas globales del sistema
- ✅ Ver eventos de todos los colegios
- ✅ Ver finanzas de todos los colegios
- ✅ Acceso a gráficos comparativos
- ✅ No pertenece a ningún colegio específico

---

## 🎯 Características del Panel Global

### 1. Estadísticas Globales

El panel muestra 4 métricas principales:

- **Total Colegios**: Número de colegios activos en el sistema
- **Total Eventos**: Suma de todos los eventos de todos los colegios
- **Total Usuarios**: Cantidad de usuarios registrados (excluyendo superadmin)
- **Presupuesto Total**: Suma de todos los gastos del sistema

### 2. Lista de Colegios

Cada colegio muestra:
- Nombre y RBD
- Región
- Estado (Activo/Inactivo)
- Total de eventos
- Número de usuarios
- Promedio de éxito
- Total de gastos
- Fecha de registro

### 3. Gráficos Comparativos

**Eventos por Colegio:**
- Gráfico de barras comparando el número de eventos entre colegios

**Distribución por Área (Global):**
- Gráfico circular mostrando la distribución de eventos por las 4 áreas PME

### 4. Tabla de Eventos Recientes

Muestra los últimos 20 eventos de todos los colegios con:
- Nombre del colegio
- Fecha del evento
- Área (con color distintivo)
- Acción realizada
- Docente responsable
- Número de eventos
- Porcentaje de éxito

---

## 🚀 Cómo Usar

### Paso 1: Iniciar Sesión

1. Abre: http://localhost:3000
2. Ingresa las credenciales del super usuario:
   - Email: `admin@edugest.cl`
   - Password: `Admin2026`
3. Click "Ingresar"

### Paso 2: Acceso Automático al Panel Global

El sistema detecta automáticamente que eres superadmin y te redirige a:
- **admin-global.html** (Panel de Administración Global)

### Paso 3: Navegar por el Sistema

Desde el panel global puedes:
- Ver estadísticas consolidadas
- Comparar rendimiento entre colegios
- Revisar eventos recientes de todos los colegios
- Acceder a otras secciones del sistema

---

## 🔄 Flujo de Autenticación

```
Login como superadmin
    ↓
auth-demo.js detecta rol='superadmin'
    ↓
Guarda sesión con verTodosColegios=true
    ↓
dashboard-demo.js detecta superadmin
    ↓
Redirige automáticamente a admin-global.html
    ↓
Panel Global carga datos de todos los colegios
```

---

## 📊 Estructura de Datos

### Usuario Superadmin

```javascript
{
    email: 'admin@edugest.cl',
    password: 'Admin2026',
    nombre: 'Administrador Global',
    rol: 'superadmin',
    colegioId: null,              // No pertenece a ningún colegio
    permisoFinanzas: true,
    activo: true,
    verTodosColegios: true        // Permiso especial
}
```

### Diferencias con Otros Roles

| Campo | Director | Docente | Super Admin |
|-------|----------|---------|-------------|
| `colegioId` | colegio_001 | colegio_001 | `null` |
| `rol` | director | docente | superadmin |
| `verTodosColegios` | false | false | `true` |
| `permisoFinanzas` | true | false | true |

---

## 🛡️ Seguridad

### Verificación de Permisos

El archivo `admin-global-demo.js` verifica:

```javascript
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('demoUser'));
    
    // Verificar que sea superadmin
    if (user.rol !== 'superadmin' || !user.verTodosColegios) {
        window.location.href = 'dashboard.html';
        return null;
    }
    
    return user;
}
```

**Si un usuario normal intenta acceder a admin-global.html:**
- Es redirigido automáticamente a dashboard.html
- Solo ve los datos de su propio colegio

---

## 📁 Archivos Modificados/Creados

### Nuevos Archivos

1. **admin-global.html**
   - Interfaz del panel de administración global
   - Estadísticas, gráficos y tablas

2. **js/admin-global-demo.js**
   - Lógica del panel global
   - Carga datos de todos los colegios
   - Genera gráficos comparativos

### Archivos Modificados

1. **js/auth-demo.js**
   - Agregado usuario superadmin
   - Manejo de usuarios sin colegioId

2. **js/dashboard-demo.js**
   - Detección de superadmin
   - Redirección automática a admin-global.html

---

## 🧪 Pruebas

### Test 1: Login como Super Usuario

```
1. Login: admin@edugest.cl / Admin2026
2. Verificar redirección a admin-global.html
3. Verificar que se muestran todos los colegios
4. Verificar estadísticas globales
```

### Test 2: Acceso Denegado para Usuarios Normales

```
1. Login: director@mistral.cl / Director2026
2. Intentar acceder manualmente a admin-global.html
3. Verificar redirección a dashboard.html
4. Verificar que solo ve datos de su colegio
```

### Test 3: Datos Consolidados

```
1. Login como superadmin
2. Verificar que Total Eventos = suma de todos los colegios
3. Verificar que gráfico muestra todos los colegios
4. Verificar que tabla muestra eventos de múltiples colegios
```

---

## 🎨 Interfaz

El panel global mantiene el mismo diseño profesional del sistema:

- ✅ Misma barra lateral con navegación
- ✅ Mismo estilo de tarjetas y gráficos
- ✅ Colores distintivos por área
- ✅ Animaciones y transiciones suaves
- ✅ Diseño responsive

---

## 📈 Casos de Uso

### Caso 1: Monitoreo General

El superadmin puede:
- Ver cuántos colegios están activos
- Comparar rendimiento entre instituciones
- Identificar colegios con bajo rendimiento
- Ver tendencias globales

### Caso 2: Análisis Comparativo

El superadmin puede:
- Comparar número de eventos entre colegios
- Ver qué áreas PME son más activas globalmente
- Identificar mejores prácticas

### Caso 3: Supervisión Financiera

El superadmin puede:
- Ver presupuesto total del sistema
- Comparar gastos entre colegios
- Identificar patrones de gasto

---

## 🔮 Futuras Mejoras (Opcionales)

- Filtros por colegio específico
- Exportar reportes consolidados en PDF
- Gráficos de tendencias temporales
- Comparación de indicadores clave
- Alertas de rendimiento bajo
- Gestión de usuarios desde el panel

---

## ✅ Resumen

**El Super Usuario puede:**
- ✅ Ver todos los colegios del sistema
- ✅ Acceder a estadísticas globales
- ✅ Comparar rendimiento entre instituciones
- ✅ Revisar eventos de todos los colegios
- ✅ Supervisar finanzas globales

**El Super Usuario NO puede (por ahora):**
- ❌ Editar datos de otros colegios
- ❌ Eliminar colegios
- ❌ Crear usuarios para otros colegios

---

## 🚀 Iniciar el Sistema

```bash
npm start
```

**Login como Super Usuario:**
- URL: http://localhost:3000
- Email: admin@edugest.cl
- Password: Admin2026

---

**¡Panel de Administración Global completamente funcional!** 🎉
