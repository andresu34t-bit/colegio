# 🚀 INSTALACIÓN PANEL SUPER ADMIN

## ✅ ARCHIVOS CREADOS

### Archivos Principales

```
✅ admin-global.html          - Panel principal del Super Admin
✅ css/admin-global.css       - Estilos específicos del panel
✅ js/admin-global.js         - Lógica y funcionalidad del panel
✅ ADMIN-GLOBAL-README.md     - Documentación completa
✅ ADMIN-GLOBAL-INSTALACION.md - Esta guía de instalación
```

### Archivos Actualizados

```
✅ js/login-modern.js         - Redirección a admin-global.html para Admin Global
✅ js/roles-permissions.js    - Ya incluye rol admin_global
✅ js/multi-school.js         - Sistema multi-colegio funcionando
```

---

## 🎯 ACCESO INMEDIATO

### Credenciales de Admin Global

```
Email:    admin@edugest.cl
Password: admin123
```

### Pasos para Acceder

1. **Abrir el sistema:**
   ```
   Abre: login.html
   ```

2. **Iniciar sesión:**
   - Email: `admin@edugest.cl`
   - Password: `admin123`
   - Click en "Iniciar Sesión"

3. **Acceso automático:**
   - El sistema detecta que eres Admin Global
   - Te redirige automáticamente a `admin-global.html`
   - ¡Listo! Ya estás en el Panel Super Admin

### Acceso Directo (si ya tienes sesión)

```
Abre directamente: admin-global.html
```

---

## 📋 VERIFICACIÓN DE INSTALACIÓN

### Checklist de Verificación

✅ **Archivos HTML**
- [ ] `admin-global.html` existe
- [ ] Se carga correctamente en el navegador
- [ ] No hay errores en la consola

✅ **Archivos CSS**
- [ ] `css/admin-global.css` existe
- [ ] Los estilos se aplican correctamente
- [ ] El diseño se ve profesional

✅ **Archivos JavaScript**
- [ ] `js/admin-global.js` existe
- [ ] No hay errores en la consola
- [ ] Las funciones responden correctamente

✅ **Integración**
- [ ] Login redirige correctamente
- [ ] Protección de acceso funciona
- [ ] Navegación entre secciones funciona

---

## 🔧 CONFIGURACIÓN

### Dependencias Requeridas

El panel usa las siguientes dependencias (ya incluidas):

```html
<!-- Chart.js para gráficos -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<!-- Sistema de diseño -->
<link rel="stylesheet" href="css/design-system.css">

<!-- Estilos específicos -->
<link rel="stylesheet" href="css/admin-global.css">

<!-- Sistema de roles -->
<script src="js/roles-permissions.js"></script>

<!-- Sistema multi-colegio -->
<script src="js/multi-school.js"></script>

<!-- Lógica del panel -->
<script src="js/admin-global.js"></script>
```

### Verificar Dependencias

Abre la consola del navegador (F12) y verifica:

```javascript
// Verificar Chart.js
console.log(typeof Chart); // Debe mostrar "function"

// Verificar roles
console.log(typeof EdugestRoles); // Debe mostrar "object"

// Verificar multi-school
console.log(typeof EdugestSchools); // Debe mostrar "object"
```

---

## 🎨 PERSONALIZACIÓN

### Cambiar Colores

Edita `css/admin-global.css`:

```css
/* Badge Admin */
.admin-badge {
    background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
    /* Cambia estos colores según tu marca */
}

/* Tarjetas de estadísticas */
.stat-card-global.curriculum {
    border-left: 4px solid #3b82f6; /* Azul */
}

.stat-card-global.liderazgo {
    border-left: 4px solid #a855f7; /* Morado */
}

.stat-card-global.convivencia {
    border-left: 4px solid #22c55e; /* Verde */
}

.stat-card-global.gestion {
    border-left: 4px solid #f59e0b; /* Naranja */
}
```

### Cambiar Logo

Reemplaza el archivo:
```
LOGO EDUGEST.png
```

O actualiza la ruta en `admin-global.html`:
```html
<img src="TU_LOGO.png" alt="EDUGEST">
```

---

## 🏫 DATOS DE COLEGIOS

### Colegios Incluidos

El sistema incluye 20 colegios de demostración:

```javascript
// Ver todos los colegios en:
js/admin-global.js -> SCHOOLS_DATA

// Estructura de cada colegio:
{
    id: 'school_001',
    name: 'Instituto Técnico Industrial',
    rbd: '12345-6',
    location: 'Recoleta',
    type: 'Técnico Profesional',
    students: 1450,
    budget: 89500000,
    users: 2,
    active: true
}
```

### Agregar Nuevos Colegios

**Opción 1: Desde la interfaz**
1. Ve a "Gestión Colegios"
2. Click en "➕ Nuevo Colegio"
3. Completa el formulario
4. Guarda

**Opción 2: Editar el código**

Edita `js/admin-global.js`:

```javascript
const SCHOOLS_DATA = [
    // ... colegios existentes ...
    {
        id: 'school_021',
        name: 'Tu Nuevo Colegio',
        rbd: '12345-6',
        location: 'Tu Comuna',
        type: 'Municipal',
        students: 500,
        budget: 50000000,
        users: 2,
        active: true
    }
];
```

---

## 👥 GESTIÓN DE USUARIOS

### Usuarios Incluidos

El sistema incluye 40 usuarios de demostración:
- 20 Directores (1 por colegio)
- 20 Docentes (1 por colegio)
- 1 Admin Global

### Agregar Nuevos Usuarios

**Desde la interfaz:**
1. Ve a "Gestión Usuarios"
2. Click en "➕ Nuevo Usuario"
3. Completa el formulario
4. Asigna rol y colegio
5. Guarda

**En el código:**

Edita `js/login-modern.js`:

```javascript
const DEMO_USERS = {
    // ... usuarios existentes ...
    'nuevo.usuario@edugest.cl': {
        password: 'password123',
        role: 'docente',
        name: 'Nuevo Usuario',
        schoolId: 'school_001',
        school: 'Colegio San José'
    }
};
```

---

## 🔐 SEGURIDAD

### Protección de Acceso

El panel está protegido con:

```javascript
// Verificación automática al cargar
if (!EdugestRoles.protectPage('admin_global')) {
    // Redirige a login o muestra acceso denegado
}
```

### Cambiar Contraseña de Admin

Edita `js/login-modern.js`:

```javascript
'admin@edugest.cl': {
    password: 'TU_NUEVA_CONTRASEÑA', // Cambia aquí
    role: 'admin_global',
    name: 'Administrador Global',
    schoolId: null,
    school: 'Sistema EDUGEST'
}
```

### Agregar Más Admins Globales

```javascript
'admin2@edugest.cl': {
    password: 'password123',
    role: 'admin_global',
    name: 'Segundo Admin',
    schoolId: null,
    school: 'Sistema EDUGEST'
}
```

---

## 📊 GRÁFICOS Y ESTADÍSTICAS

### Gráficos Incluidos

1. **Estudiantes por Colegio** (Bar Chart)
2. **Distribución por Tipo** (Doughnut Chart)
3. **Presupuesto por Colegio** (Bar Chart)
4. **Distribución Geográfica** (Pie Chart)

### Personalizar Gráficos

Edita `js/admin-global.js`:

```javascript
// Cambiar colores
backgroundColor: [
    'rgba(59, 130, 246, 0.8)',  // Azul
    'rgba(168, 85, 247, 0.8)',  // Morado
    'rgba(34, 197, 94, 0.8)',   // Verde
    'rgba(245, 158, 11, 0.8)'   // Naranja
]

// Cambiar tipo de gráfico
type: 'bar' // o 'line', 'pie', 'doughnut', 'radar'
```

---

## 🚀 DESPLIEGUE EN PRODUCCIÓN

### Checklist Pre-Producción

✅ **Seguridad**
- [ ] Cambiar contraseñas por defecto
- [ ] Implementar HTTPS
- [ ] Configurar CORS correctamente
- [ ] Validar inputs del lado del servidor

✅ **Base de Datos**
- [ ] Conectar a base de datos real
- [ ] Migrar datos de demostración
- [ ] Configurar respaldos automáticos

✅ **Optimización**
- [ ] Minificar CSS y JS
- [ ] Comprimir imágenes
- [ ] Habilitar caché del navegador
- [ ] Configurar CDN

✅ **Testing**
- [ ] Probar en todos los navegadores
- [ ] Probar en dispositivos móviles
- [ ] Verificar rendimiento
- [ ] Probar casos extremos

### Conectar a Base de Datos

Reemplaza los datos estáticos en `js/admin-global.js`:

```javascript
// En lugar de:
const SCHOOLS_DATA = [...];

// Usa:
async function loadSchools() {
    const response = await fetch('/api/schools');
    const schools = await response.json();
    return schools;
}
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema: Panel no carga

**Solución:**
1. Verifica que todos los archivos existan
2. Abre la consola (F12) y busca errores
3. Verifica que las rutas sean correctas
4. Limpia caché del navegador

### Problema: No puedo acceder

**Solución:**
1. Verifica credenciales: `admin@edugest.cl` / `admin123`
2. Limpia localStorage y sessionStorage
3. Intenta en modo incógnito
4. Verifica que `js/login-modern.js` esté actualizado

### Problema: Gráficos no se muestran

**Solución:**
1. Verifica que Chart.js esté cargado
2. Abre consola y busca errores
3. Verifica que los canvas existan en el HTML
4. Verifica conexión a internet (CDN)

### Problema: Datos no se actualizan

**Solución:**
1. Click en botón "🔄 Actualizar"
2. Recarga la página (F5)
3. Limpia caché (Ctrl + Shift + R)
4. Verifica que las funciones de actualización funcionen

---

## 📞 SOPORTE TÉCNICO

### Recursos Disponibles

📚 **Documentación:**
- `ADMIN-GLOBAL-README.md` - Guía completa
- `ADMIN-GLOBAL-INSTALACION.md` - Esta guía
- Comentarios en el código

🔧 **Archivos de Configuración:**
- `js/admin-global.js` - Lógica principal
- `css/admin-global.css` - Estilos
- `js/roles-permissions.js` - Sistema de permisos

💬 **Contacto:**
- Email: soporte@edugest.cl
- Teléfono: +56 2 2345 6789

---

## ✅ VERIFICACIÓN FINAL

### Lista de Verificación Completa

```
✅ Archivos creados correctamente
✅ Login redirige a admin-global.html
✅ Panel carga sin errores
✅ Gráficos se muestran correctamente
✅ Navegación entre secciones funciona
✅ Filtros funcionan correctamente
✅ Modales se abren y cierran
✅ Protección de acceso funciona
✅ Diseño responsive funciona
✅ Datos se muestran correctamente
```

---

## 🎉 ¡LISTO!

El Panel Super Admin está completamente instalado y funcionando.

**Próximos pasos:**
1. Accede con `admin@edugest.cl` / `admin123`
2. Explora todas las funciones
3. Personaliza según tus necesidades
4. Conecta a tu base de datos
5. ¡Despliega en producción!

---

**¡Sistema de Administración Global completamente operativo! 🚀**

*Última actualización: Marzo 2026*
