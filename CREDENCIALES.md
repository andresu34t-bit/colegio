# 🔐 Credenciales de Acceso

## Sistema DEMO - Sin Firebase

El sistema ahora funciona **sin necesidad de configurar Firebase**.  
Usa datos locales (localStorage) para que puedas probarlo inmediatamente.

## 💬 Chat en Tiempo Real

El módulo de chat está **100% implementado** y listo para usar.

### Estado del Chat
- ✅ Código completo (3 archivos JavaScript)
- ✅ Interfaz integrada en todas las páginas
- ✅ Documentación completa
- ⚠️ **Requiere configurar Firebase Realtime Database**

### Activar el Chat (10 minutos)

**Guía completa:** Ver `GUIA-FIREBASE-CHAT.md`

**Pasos rápidos:**
1. Habilitar Realtime Database en Firebase Console
2. Copiar credenciales de Firebase
3. Actualizar `js/firebase-config.js`
4. Probar en `test-chat.html`

**Costo:** $0/mes (plan gratuito de Firebase)

---

## 👤 Usuarios de Prueba

### Director (Acceso Completo)
```
Email:    director@edugest.cl
Password: EduGest2026
```

**Permisos:**
- ✅ Ver Dashboard
- ✅ Registrar Eventos
- ✅ Ver Finanzas
- ✅ Registrar Gastos

---

### Docente (Acceso Limitado)
```
Email:    docente@edugest.cl
Password: Docente2026
```

**Permisos:**
- ✅ Ver Dashboard
- ✅ Registrar Eventos
- ❌ NO puede ver Finanzas

---

## 🚀 Cómo Usar

### 1. Iniciar Servidor
```bash
npm start
```

### 2. Abrir Navegador
```
http://localhost:8080
```

### 3. Iniciar Sesión

**Como Director:**
- Email: `director@edugest.cl`
- Password: `EduGest2026`

**Como Docente:**
- Email: `docente@edugest.cl`
- Password: `Docente2026`

---

## 📊 Datos de Ejemplo

El sistema incluye **datos de ejemplo** para que veas los gráficos funcionando:

### Eventos Demo (5 eventos)
- Talleres de lectura (Currículum)
- Reuniones de coordinación (Liderazgo)
- Actividades de convivencia (Convivencia)
- Gestión de recursos (Recursos)
- Evaluaciones formativas (Currículum)

### Gastos Demo (3 gastos)
- Libros y material didáctico: $2.500.000
- Capacitación docente: $3.000.000
- Mantención equipos: $1.500.000

**Total gastado:** $7.000.000  
**Presupuesto:** $50.000.000  
**Disponible:** $43.000.000

---

## 🎯 Funcionalidades

### Dashboard
- 4 gráficos interactivos con Chart.js
- Estadísticas en tiempo real
- Filtro por mes
- Datos actualizados automáticamente

### Formulario
- Registra nuevos eventos
- Se guardan en localStorage
- Dashboard se actualiza automáticamente

### Finanzas (Solo Director)
- Registra gastos
- Gráficos financieros
- Control presupuestario

---

## 💾 Almacenamiento

Los datos se guardan en **localStorage** del navegador:

- `demoUser` - Usuario actual
- `demoEventos` - Lista de eventos
- `demoGastos` - Lista de gastos

### Limpiar Datos
Para resetear el sistema, abre la consola del navegador (F12) y ejecuta:

```javascript
localStorage.clear();
location.reload();
```

---

## 🔄 Cambiar a Firebase

Si más adelante quieres usar Firebase real:

1. Edita los archivos HTML y cambia:
   - `auth-demo.js` → `auth.js`
   - `dashboard-demo.js` → `dashboard.js`
   - `formulario-demo.js` → `formulario.js`
   - `finanzas-demo.js` → `finanzas.js`

2. Configura Firebase en `js/firebase-config.js`

3. Los archivos Firebase ya están creados y listos

---

## ✅ Ventajas del Modo DEMO

- ✅ **Sin configuración** - Funciona inmediatamente
- ✅ **Sin internet** - Todo es local
- ✅ **Gratis** - No necesitas cuenta Firebase
- ✅ **Rápido** - Perfecto para pruebas
- ✅ **Datos de ejemplo** - Ves el sistema funcionando

---

## 🎉 ¡Listo para Usar!

```bash
npm start
```

Luego abre: http://localhost:8080

**Credenciales:**
- Email: `director@edugest.cl`
- Password: `EduGest2026`

---

**¡Disfruta probando el sistema!** 🚀
