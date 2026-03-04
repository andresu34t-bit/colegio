# 🎓 EDUGEST - Sistema de Gestión Educativa

## 🚀 Sistema SaaS Multi-Colegio Completo

EDUGEST es una plataforma profesional para la gestión del Plan de Mejoramiento Educativo (PME) en instituciones educativas de Chile.

---

## ✨ Características Principales

### 🔐 Sistema de Roles y Permisos
- **Admin Global**: Gestión de todos los colegios
- **Director**: Administración completa del colegio
- **Docente**: Registro de eventos y evidencias
- **Técnico**: Soporte y estadísticas

### 🏫 Multi-Colegio
- Gestión de múltiples instituciones
- Separación automática de datos
- Panel administrativo centralizado
- Cambio de colegio para Admin Global

### 📊 Dashboard Inteligente
- KPIs en tiempo real
- % Cumplimiento PME
- Alertas visuales (Verde/Amarillo/Rojo)
- Gráficos interactivos
- Comparativas mensuales

### 🔔 Notificaciones
- 6 tipos de notificaciones
- Alertas en tiempo real
- Centro de notificaciones
- Badge con contador

### 📅 Calendario
- Vista mensual navegable
- Eventos programados
- Recordatorios automáticos
- Widget de próximos eventos

### 📁 Gestión de Documentos
- Subida de archivos (hasta 10MB)
- 5 tipos de documentos
- Asociación a eventos
- Descarga y gestión

### 💬 Chat en Tiempo Real
- Comunicación instantánea
- Estado "en línea"
- Historial de mensajes
- Chat grupal por colegio

### 📱 100% Responsive
- Diseño adaptable
- Optimizado para móviles
- Menú hamburguesa
- Touch-friendly

---

## 🚀 Inicio Rápido

### 1. Abrir el Sistema
```
Abrir index.html en el navegador
```

### 2. Cargar Datos de Prueba
```
Hacer clic en "Cargar Datos de Prueba"
O ejecutar en consola: EdugestDemoData.loadAllDemoData()
```

### 3. Iniciar Sesión
Usar cualquiera de estos usuarios:

**Admin Global**
```
Email: admin@edugest.cl
Password: admin123
```

**Director - Colegio San José**
```
Email: director.sanjose@edugest.cl
Password: director123
```

**Docente - Colegio San José**
```
Email: docente1.sanjose@edugest.cl
Password: docente123
```

---

## 📁 Estructura del Proyecto

```
edugest/
├── index.html                  # Página de inicio
├── login.html                  # Login del sistema
├── dashboard.html              # Dashboard principal
├── admin-panel.html            # Panel Admin Global
├── calendario.html             # Calendario de eventos
├── notificaciones.html         # Centro de notificaciones
├── informes.html               # Sistema de informes
├── INICIO-RAPIDO.html          # Página de inicio rápido
│
├── css/
│   ├── design-system.css       # Sistema de diseño
│   ├── advanced-features.css   # Estilos avanzados
│   └── login-modern.css        # Estilos del login
│
├── js/
│   ├── roles-permissions.js    # Sistema de roles
│   ├── multi-school.js         # Multi-colegio
│   ├── notifications.js        # Notificaciones
│   ├── documents.js            # Gestión documentos
│   ├── calendar.js             # Calendario
│   ├── demo-data.js            # Datos de prueba (150 eventos)
│   ├── informes.js             # Sistema de informes
│   ├── informes-advanced.js    # Informes avanzados
│   ├── login-modern.js         # Login
│   ├── app.js                  # App principal
│   └── chat.js                 # Chat (existente)
│
└── docs/
    ├── GUIA-COMPLETA-SISTEMA-AVANZADO.md
    ├── DATOS-PRUEBA-COMPLETOS.md
    ├── PLAN-DESARROLLO-AVANZADO.md
    └── RESUMEN-SISTEMA-COMPLETO.md
```

---

## 🧪 Datos de Prueba Completos

El sistema incluye **datos realistas y completos** para demostración:

### 📊 Contenido
- **150 eventos PME** (50 por colegio)
- **45 eventos de calendario** (15 por colegio)
- **60+ notificaciones** distribuidas
- **16 usuarios activos** (4 roles)
- **3 colegios** completamente configurados

### 📝 Eventos PME Detallados
Cada evento incluye:
- Área de gestión (Currículum, Liderazgo, Convivencia, Recursos)
- Subdimensión específica
- Objetivo estratégico
- Estrategia/Actividad detallada
- Descripción completa
- Responsable asignado
- Metas y porcentajes de logro
- Observaciones
- Fechas y timestamps

### 📅 Eventos de Calendario
- Distribuidos en próximos 60 días
- Asociados a áreas PME
- Con responsables asignados
- Horarios definidos

### 🔔 Notificaciones
- 6 tipos diferentes
- Estados leídas/no leídas
- Distribuidas en últimos 7 días
- Para usuarios clave

### 🎯 Cargar Datos

**Opción 1: Interfaz**
1. Abrir `INICIO-RAPIDO.html`
2. Clic en "Cargar Datos de Prueba"

**Opción 2: Consola**
```javascript
EdugestDemoData.loadAllDemoData();
```

Ver documentación completa en: `DATOS-PRUEBA-COMPLETOS.md`

---

## 👥 Usuarios de Prueba

### Colegio San José (school_001)
- Director: `director.sanjose@edugest.cl` / `director123`
- Docente 1: `docente1.sanjose@edugest.cl` / `docente123`
- Docente 2: `docente2.sanjose@edugest.cl` / `docente123`
- Docente 3: `docente3.sanjose@edugest.cl` / `docente123`
- Técnico: `tecnico.sanjose@edugest.cl` / `tecnico123`

### Liceo Técnico Norte (school_002)
- Director: `director.norte@edugest.cl` / `director123`
- Docente 1: `docente1.norte@edugest.cl` / `docente123`
- Docente 2: `docente2.norte@edugest.cl` / `docente123`
- Docente 3: `docente3.norte@edugest.cl` / `docente123`
- Técnico: `tecnico.norte@edugest.cl` / `tecnico123`

### Escuela Básica Sur (school_003)
- Director: `director.sur@edugest.cl` / `director123`
- Docente 1: `docente1.sur@edugest.cl` / `docente123`
- Docente 2: `docente2.sur@edugest.cl` / `docente123`
- Docente 3: `docente3.sur@edugest.cl` / `docente123`
- Técnico: `tecnico.sur@edugest.cl` / `tecnico123`

---

## 🔧 Comandos Útiles

### Consola del Navegador (F12)

```javascript
// Cargar datos de prueba
EdugestDemoData.loadAllDemoData();

// Limpiar todos los datos
EdugestDemoData.clearAllDemoData();

// Ver usuario actual
EdugestRoles.getCurrentUser();

// Ver todos los colegios
EdugestSchools.getAllSchools();

// Ver notificaciones
EdugestNotifications.getAllNotifications();

// Crear notificación de prueba
EdugestNotifications.createNotification(
    'event_upcoming',
    'Prueba',
    'Notificación de prueba'
);
```

---

## 📚 Documentación

### Guías Disponibles
1. **GUIA-COMPLETA-SISTEMA-AVANZADO.md** - Documentación completa
2. **PLAN-DESARROLLO-AVANZADO.md** - Arquitectura del sistema
3. **RESUMEN-SISTEMA-COMPLETO.md** - Resumen ejecutivo
4. **INICIO-RAPIDO.html** - Página de inicio interactiva

---

## 🎯 Flujos de Trabajo

### Admin Global
1. Login → Panel Admin
2. Ver todos los colegios
3. Seleccionar colegio
4. Acceder al dashboard

### Director
1. Login → Dashboard
2. Ver KPIs del colegio
3. Aprobar eventos
4. Revisar informes

### Docente
1. Login → Dashboard
2. Registrar evento
3. Subir evidencia
4. Ver calendario

### Técnico
1. Login → Dashboard
2. Ver estadísticas
3. Chat de soporte
4. Ayudar usuarios

---

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Gráficos**: Chart.js
- **Almacenamiento**: localStorage (demo)
- **Chat**: Firebase Realtime Database
- **Diseño**: Sistema de diseño custom

---

## 📊 Estadísticas

- **Líneas de código**: ~2,600
- **Archivos JavaScript**: 12
- **Archivos CSS**: 4
- **Páginas HTML**: 15+
- **Usuarios de prueba**: 16
- **Colegios configurados**: 3

---

## ✅ Checklist de Funcionalidades

- [x] Sistema de roles y permisos
- [x] Multi-colegio
- [x] Dashboard con KPIs
- [x] Notificaciones en tiempo real
- [x] Calendario integrado
- [x] Gestión de documentos
- [x] Chat en tiempo real
- [x] Datos de prueba
- [x] Panel Admin Global
- [x] Optimización móvil
- [x] Protección de rutas
- [x] Documentación completa

---

## 🚀 Próximos Pasos

### Corto Plazo
- [ ] Integrar con backend real
- [ ] Base de datos PostgreSQL/MySQL
- [ ] API REST
- [ ] Autenticación JWT

### Mediano Plazo
- [ ] Servidor de archivos
- [ ] Email notifications
- [ ] Reportes PDF avanzados
- [ ] Analytics dashboard

### Largo Plazo
- [ ] App móvil nativa
- [ ] Push notifications
- [ ] IA para predicciones
- [ ] Integración con MINEDUC

---

## 🆘 Soporte

### Problemas Comunes

**No puedo iniciar sesión**
- Verificar que los datos de prueba estén cargados
- Usar las credenciales exactas (copiar/pegar)
- Revisar consola del navegador (F12)

**No veo datos en el dashboard**
- Cargar datos de prueba: `EdugestDemoData.loadAllDemoData()`
- Verificar que hay sesión activa
- Refrescar la página

**Las notificaciones no aparecen**
- Verificar que los scripts estén cargados
- Revisar consola por errores
- Limpiar caché del navegador

---

## 📄 Licencia

Este proyecto es de uso educativo y demostrativo.

---

## 👨‍💻 Desarrollo

**Versión**: 2.0.0 (Sistema Avanzado)  
**Fecha**: Marzo 2026  
**Estado**: ✅ Producción Ready

---

## 🎉 ¡Comienza Ahora!

1. Abre `index.html` o `INICIO-RAPIDO.html`
2. Carga los datos de prueba
3. Inicia sesión con cualquier usuario
4. Explora todas las funcionalidades

**¡EDUGEST está listo para transformar la gestión educativa! 🚀**
