# 📚 EduGest PME - Versión Simple con Firebase

Sistema de gestión PME basado en tu Excel, con Firebase (sin servidor).

## 🎯 Arquitectura SIMPLE

- **Frontend:** HTML + CSS + JavaScript puro
- **Backend:** Firebase (sin servidor)
- **Gráficos:** Chart.js
- **PDF:** jsPDF + html2pdf
- **Costo:** GRATIS

---

## 🚀 Configuración Rápida

### 1. Crear Proyecto Firebase

1. Ve a https://console.firebase.google.com/
2. Click en "Agregar proyecto"
3. Nombre: `edugest-pme`
4. Habilita Google Analytics (opcional)
5. Click en "Crear proyecto"

### 2. Configurar Authentication

1. En el menú lateral, click en "Authentication"
2. Click en "Comenzar"
3. Habilita "Correo electrónico/contraseña"
4. Guarda

### 3. Configurar Firestore Database

1. En el menú lateral, click en "Firestore Database"
2. Click en "Crear base de datos"
3. Selecciona "Modo de prueba" (por ahora)
4. Selecciona ubicación (us-central1)
5. Click en "Habilitar"

### 4. Obtener Configuración

1. Click en el ícono de engranaje ⚙️ → "Configuración del proyecto"
2. Scroll down hasta "Tus apps"
3. Click en el ícono `</>`  (Web)
4. Registra la app: `edugest-pme-web`
5. Copia el objeto `firebaseConfig`

### 5. Configurar el Proyecto

Edita `js/firebase-config.js` y reemplaza con tus valores:

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

### 6. Crear Usuario de Prueba

1. En Firebase Console → Authentication → Users
2. Click en "Agregar usuario"
3. Email: `director@colegio.cl`
4. Contraseña: `demo123`
5. Click en "Agregar usuario"

### 7. Abrir el Sistema

Abre `index.html` en tu navegador o usa un servidor local:

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js
npx http-server

# Opción 3: VS Code Live Server
# Click derecho en index.html → Open with Live Server
```

Luego abre: http://localhost:8000

---

## 🔐 Credenciales de Prueba

```
Email:    director@colegio.cl
Password: demo123
```

---

## 📊 Estructura de Datos (Firebase)

### Colección: eventos
```javascript
{
  dia: 30,
  mes: "SEPTIEMBRE",
  area: "Currículum",
  accion: 1,
  n_eventos: 1,
  exito_objetivo: 100,
  meta: 1,
  exito_meta: 20,
  docente: "Docente 1",
  descripcion: "...",
  timestamp: Date.now()
}
```

### Colección: finanzas
```javascript
{
  fecha: "2026-09-30",
  categoria: "materiales",
  monto: 500000,
  proveedor: "...",
  descripcion: "..."
}
```

---

## 📁 Estructura de Archivos

```
edugest-simple/
├── index.html              # Login
├── dashboard.html          # Dashboard con gráficos
├── formulario.html         # Formulario de eventos
├── finanzas.html          # Solo director
├── css/
│   └── style.css          # Estilos
├── js/
│   ├── firebase-config.js # Configuración Firebase
│   ├── auth.js            # Autenticación
│   ├── dashboard.js       # Dashboard + gráficos
│   ├── formulario.js      # Guardar eventos
│   └── finanzas.js        # Módulo financiero
└── README.md
```

---

## 🎨 Pantallas

1. **Login** - Autenticación con Firebase
2. **Dashboard** - 4 gráficos con Chart.js
3. **Formulario** - Registro de eventos (igual que Excel)
4. **Finanzas** - Solo para director

---

## 📈 Gráficos Incluidos

1. % Éxito por Acción (barras)
2. Eventos por Mes (línea)
3. Promedio Metas por Área (radar)
4. Eventos por Docente (pie)

---

## 💰 Costo

- Firebase (plan gratuito): **$0/mes**
- Hosting Firebase: **$0/mes**
- Total: **GRATIS**

---

## 🚀 Despliegue en Firebase Hosting

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar
firebase init hosting

# Desplegar
firebase deploy
```

Tu app estará en: `https://edugest-pme.web.app`

---

## 📝 Próximos Pasos

1. ✅ Configurar Firebase
2. ✅ Crear usuario de prueba
3. ✅ Abrir sistema
4. ⏳ Completar archivos JS (dashboard.js, formulario.js, finanzas.js)
5. ⏳ Agregar generación de PDF
6. ⏳ Desplegar en Firebase Hosting

---

**¡Sistema simple y funcional listo para usar!** 🚀
