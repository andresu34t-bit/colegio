# 🚀 EMPEZAR AQUÍ

## ✅ Tu Sistema Está COMPLETO

Todo el código está listo. Solo necesitas **configurar Firebase** (5 minutos).

---

## 📋 3 Pasos para Ejecutar

### 1️⃣ Configurar Firebase (5 min)

#### A. Crear Proyecto
1. Abre: https://console.firebase.google.com/
2. Click "Agregar proyecto"
3. Nombre: `edugest-pme`
4. Click "Crear proyecto"

#### B. Habilitar Authentication
1. Menú lateral → "Authentication"
2. Click "Comenzar"
3. Selecciona "Correo electrónico/contraseña"
4. Activa el switch
5. Click "Guardar"

#### C. Habilitar Firestore
1. Menú lateral → "Firestore Database"
2. Click "Crear base de datos"
3. Selecciona "Modo de prueba"
4. Ubicación: "us-central1"
5. Click "Habilitar"

#### D. Obtener Configuración
1. Click en ⚙️ (engranaje) → "Configuración del proyecto"
2. Scroll down → "Tus apps"
3. Click en `</>` (Web)
4. Nombre: `edugest-pme-web`
5. **COPIA** el objeto `firebaseConfig`

---

### 2️⃣ Actualizar Credenciales (1 min)

Abre el archivo: `js/firebase-config.js`

Reemplaza esto:
```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "edugest-pme",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};
```

Con tus valores reales:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC...",                    // ← Pega aquí
    authDomain: "edugest-pme.firebaseapp.com",
    projectId: "edugest-pme",
    storageBucket: "edugest-pme.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};
```

**Guarda el archivo.**

---

### 3️⃣ Ejecutar Sistema (1 min)

#### Opción A: Con Node.js (Recomendado)
```bash
npm start
```

#### Opción B: Con Python
```bash
python -m http.server 8080
```

#### Opción C: VS Code Live Server
- Click derecho en `index.html`
- "Open with Live Server"

---

## 🔐 Crear Usuario de Prueba

1. En Firebase Console → Authentication → Users
2. Click "Agregar usuario"
3. Email: `director@colegio.cl`
4. Contraseña: `demo123`
5. Click "Agregar usuario"

---

## 🎯 Probar el Sistema

### 1. Login
- Abre: http://localhost:8080
- Email: `director@colegio.cl`
- Password: `demo123`
- Click "Ingresar"

### 2. Dashboard
- Verás 4 gráficos (vacíos al inicio)
- Estadísticas en 0

### 3. Registrar Evento
- Click "📝 Registrar Evento"
- Completa el formulario:
  - Día: 15
  - Mes: SEPTIEMBRE
  - Área: Currículum
  - Acción: 1
  - N° Eventos: 5
  - % Éxito Objetivo: 85
  - Meta: 10
  - % Éxito Meta: 50
  - Docente: María González
- Click "💾 Guardar Evento"

### 4. Ver Dashboard Actualizado
- Vuelve al Dashboard
- Los gráficos ahora muestran datos

### 5. Finanzas (Solo Director)
- Click "💰 Finanzas"
- Registra un gasto:
  - Fecha: 2026-09-15
  - Categoría: materiales
  - Monto: 500000
  - Proveedor: Librería ABC
- Click "💾 Registrar Gasto"

---

## 📊 Archivos del Sistema

```
✅ index.html              Login
✅ dashboard.html          Dashboard con 4 gráficos
✅ formulario.html         Registro de eventos
✅ finanzas.html          Módulo financiero
✅ css/style.css          Estilos completos
✅ js/firebase-config.js  Configuración Firebase
✅ js/auth.js             Autenticación
✅ js/dashboard.js        Dashboard + Chart.js
✅ js/formulario.js       Guardar eventos
✅ js/finanzas.js         Módulo financiero
```

---

## 🎨 Características

### Dashboard
- 📊 % Éxito por Acción (barras)
- 📈 Eventos por Mes (línea)
- 🎯 Promedio Metas por Área (radar)
- 🥧 Eventos por Docente (pie)
- 🔍 Filtro por mes
- 📊 Estadísticas en tiempo real

### Formulario
- Campos idénticos a tu Excel
- Validación automática
- Guardado en Firebase

### Finanzas
- Solo visible para Director
- Registro de gastos
- Gráficos financieros
- Presupuesto: $50.000.000

### Seguridad
- Login obligatorio
- Roles: Director / Docente
- Finanzas bloqueadas para Docente

---

## 💰 Costo

**GRATIS** - Firebase plan gratuito incluye:
- 50,000 usuarios/mes
- 1 GB almacenamiento
- 10 GB transferencia/mes

---

## 🆘 Problemas Comunes

### ❌ "Firebase not initialized"
→ Actualiza `js/firebase-config.js` con tus credenciales

### ❌ "Permission denied"
→ Firestore debe estar en "Modo de prueba"

### ❌ Gráficos no aparecen
→ Registra eventos de prueba primero

### ❌ No puedo acceder a Finanzas
→ Solo emails con "director" pueden acceder

---

## 📚 Documentación

- `README.md` - Documentación completa
- `INICIO_RAPIDO.md` - Guía de inicio rápido
- `SISTEMA_COMPLETO.md` - Detalles técnicos

---

## 🎯 Resumen

1. ✅ Código completo (100%)
2. ⏳ Configurar Firebase (5 min)
3. ⏳ Crear usuario de prueba (1 min)
4. ⏳ Ejecutar y probar (2 min)

**Total: 8 minutos para tener el sistema funcionando**

---

## 🚀 Siguiente Paso

**Abre Firebase Console y sigue el Paso 1️⃣**

👉 https://console.firebase.google.com/

---

**¡Tu sistema está listo! Solo falta la configuración de Firebase.** 🎉
