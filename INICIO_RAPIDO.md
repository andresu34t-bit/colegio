# 🚀 Inicio Rápido - EduGest PME

## ✅ Sistema Completado

Tu sistema Firebase está **100% funcional** con:

- ✅ Login con Firebase Authentication
- ✅ Dashboard con 4 gráficos interactivos (Chart.js)
- ✅ Formulario de registro de eventos
- ✅ Módulo financiero (solo Director)
- ✅ Control de roles (Director/Docente)
- ✅ Diseño profesional y responsivo

---

## 📋 Pasos para Ejecutar

### 1️⃣ Configurar Firebase (5 minutos)

1. Ve a https://console.firebase.google.com/
2. Crea un proyecto llamado `edugest-pme`
3. Habilita **Authentication** → Correo/Contraseña
4. Habilita **Firestore Database** → Modo de prueba
5. Copia la configuración del proyecto

### 2️⃣ Actualizar Configuración

Edita `js/firebase-config.js` y reemplaza:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "edugest-pme",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};
```

### 3️⃣ Crear Usuario de Prueba

En Firebase Console → Authentication → Users:

```
Email:    director@colegio.cl
Password: demo123
```

### 4️⃣ Iniciar Servidor Local

Opción A - Con Node.js (ya instalado):
```bash
npm start
```

Opción B - Con Python:
```bash
python -m http.server 8000
```

Opción C - VS Code Live Server:
- Click derecho en `index.html` → "Open with Live Server"

### 5️⃣ Abrir en Navegador

```
http://localhost:8080
```

---

## 🔐 Credenciales de Prueba

```
Email:    director@colegio.cl
Password: demo123
```

---

## 📊 Flujo de Uso

1. **Login** → Ingresa con director@colegio.cl
2. **Dashboard** → Verás 4 gráficos (vacíos al inicio)
3. **Registrar Evento** → Completa el formulario
4. **Dashboard** → Los gráficos se actualizan automáticamente
5. **Finanzas** → Solo visible para Director

---

## 🎯 Estructura de Datos

### Colección: `eventos`
```javascript
{
  dia: 15,
  mes: "SEPTIEMBRE",
  area: "Currículum",
  accion: 1,
  n_eventos: 5,
  exito_objetivo: 85,
  meta: 10,
  exito_meta: 50,
  docente: "María González",
  descripcion: "Talleres de lectura",
  timestamp: 1234567890,
  createdBy: "director@colegio.cl"
}
```

### Colección: `finanzas`
```javascript
{
  fecha: "2026-09-15",
  categoria: "materiales",
  monto: 500000,
  proveedor: "Librería ABC",
  descripcion: "Compra de libros",
  timestamp: 1234567890,
  createdBy: "director@colegio.cl"
}
```

---

## 🎨 Características

### Dashboard
- 📊 % Éxito por Acción (gráfico de barras)
- 📈 Eventos por Mes (gráfico de línea)
- 🎯 Promedio Metas por Área (gráfico radar)
- 🥧 Eventos por Docente (gráfico circular)
- 🔍 Filtro por mes
- 📄 Botón generar PDF (próximamente)

### Formulario
- Campos idénticos a tu Excel
- Validación de datos
- Guardado en tiempo real en Firebase

### Finanzas (Solo Director)
- 💰 Registro de gastos
- 📊 Gastos por categoría
- 📈 Ejecución presupuestaria
- 💵 Presupuesto: $50.000.000 (editable en finanzas.js)

---

## 🔒 Control de Acceso

### Director
- ✅ Ve TODO el dashboard
- ✅ Registra eventos
- ✅ Ve módulo Finanzas
- ✅ Registra gastos

### Docente
- ✅ Ve dashboard
- ✅ Registra eventos
- ❌ NO ve Finanzas

---

## 🛠️ Personalización

### Cambiar Presupuesto Anual
Edita `js/finanzas.js` línea 8:
```javascript
const PRESUPUESTO_ANUAL = 50000000; // Cambia este valor
```

### Agregar Más Roles
Edita la lógica en cada archivo JS:
```javascript
const isDirector = user.email.includes('director');
const isUTP = user.email.includes('utp');
```

### Cambiar Colores
Edita `css/style.css`:
```css
:root {
    --primary: #3b82f6;  /* Azul */
    --success: #10b981;  /* Verde */
    --warning: #f59e0b;  /* Naranja */
}
```

---

## 📦 Archivos del Sistema

```
edugest-pme/
├── index.html              # Login
├── dashboard.html          # Dashboard con gráficos
├── formulario.html         # Registro de eventos
├── finanzas.html          # Módulo financiero
├── css/
│   └── style.css          # Estilos completos
├── js/
│   ├── firebase-config.js # Configuración Firebase
│   ├── auth.js            # Autenticación
│   ├── dashboard.js       # Dashboard + Chart.js
│   ├── formulario.js      # Guardar eventos
│   └── finanzas.js        # Módulo financiero
├── package.json           # Dependencias
├── README.md              # Documentación completa
└── INICIO_RAPIDO.md       # Esta guía
```

---

## 🚀 Desplegar en Producción

### Firebase Hosting (GRATIS)

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

## 💡 Próximos Pasos

1. ✅ Configurar Firebase
2. ✅ Crear usuario de prueba
3. ✅ Probar login
4. ✅ Registrar eventos de prueba
5. ✅ Ver gráficos actualizados
6. ⏳ Agregar generación de PDF (jsPDF)
7. ⏳ Desplegar en Firebase Hosting

---

## 🆘 Solución de Problemas

### Error: "Firebase not initialized"
- Verifica que hayas actualizado `firebase-config.js` con tus credenciales

### Error: "Permission denied"
- En Firestore, asegúrate de estar en "Modo de prueba"
- O configura reglas de seguridad

### Gráficos no se muestran
- Abre la consola del navegador (F12)
- Verifica que Chart.js se cargue correctamente
- Asegúrate de tener eventos registrados

### No puedo acceder a Finanzas
- Solo usuarios con "director" en el email pueden acceder
- Ejemplo: director@colegio.cl ✅
- Ejemplo: docente@colegio.cl ❌

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica la configuración de Firebase
3. Asegúrate de tener conexión a internet

---

**¡Sistema listo para usar! 🎉**

Arquitectura simple, sin servidor, 100% funcional.
