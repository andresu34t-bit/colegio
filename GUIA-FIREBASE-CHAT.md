# 🔥 Guía Completa: Configurar Firebase para el Chat

## 📋 Índice
1. [Crear Proyecto Firebase](#paso-1-crear-proyecto-firebase)
2. [Obtener Credenciales](#paso-2-obtener-credenciales)
3. [Habilitar Realtime Database](#paso-3-habilitar-realtime-database)
4. [Configurar Reglas de Seguridad](#paso-4-configurar-reglas-de-seguridad)
5. [Actualizar Configuración](#paso-5-actualizar-configuración)
6. [Probar el Chat](#paso-6-probar-el-chat)

---

## Paso 1: Crear Proyecto Firebase

### 1.1 Acceder a Firebase Console

```
🌐 Abre tu navegador y ve a:
https://console.firebase.google.com/
```

### 1.2 Crear Nuevo Proyecto (si no existe)

1. Click en **"Agregar proyecto"** o **"Add project"**
2. Nombre del proyecto: **`edugest-pme`**
3. Click en **"Continuar"**
4. Google Analytics: **Opcional** (puedes deshabilitarlo)
5. Click en **"Crear proyecto"**
6. Espera 30-60 segundos mientras se crea
7. Click en **"Continuar"**

✅ **Proyecto creado exitosamente**

---

## Paso 2: Obtener Credenciales

### 2.1 Registrar App Web

1. En la página principal del proyecto, busca **"Tus apps"**
2. Click en el ícono **`</>`** (Web)
3. Apodo de la app: **`edugest-pme-web`**
4. **NO** marcar "También configurar Firebase Hosting"
5. Click en **"Registrar app"**

### 2.2 Copiar Credenciales

Verás un código como este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijklmnopqrst",
  authDomain: "edugest-pme.firebaseapp.com",
  projectId: "edugest-pme",
  storageBucket: "edugest-pme.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

📋 **COPIA ESTOS VALORES** - Los necesitarás en el Paso 5

### 2.3 Guardar Credenciales

Crea un archivo temporal en tu computadora con estos datos:

```
📄 Archivo: firebase-credentials.txt

apiKey: AIzaSyC1234567890abcdefghijklmnopqrst
authDomain: edugest-pme.firebaseapp.com
projectId: edugest-pme
storageBucket: edugest-pme.appspot.com
messagingSenderId: 123456789012
appId: 1:123456789012:web:abcdef1234567890
```

---

## Paso 3: Habilitar Realtime Database

### 3.1 Acceder a Realtime Database

1. En el menú lateral izquierdo, busca **"Compilación"** o **"Build"**
2. Click en **"Realtime Database"**
3. Click en **"Crear base de datos"**

### 3.2 Configurar Database

1. **Ubicación:** Selecciona **`us-central1`** (Estados Unidos)
   - Puedes elegir otra región más cercana si prefieres
   
2. **Reglas de seguridad:** Selecciona **"Comenzar en modo de prueba"**
   - Esto permite lectura/escritura temporal
   - Las configuraremos correctamente en el Paso 4

3. Click en **"Habilitar"**

### 3.3 Copiar URL de Database

Una vez creada, verás la URL en la parte superior:

```
https://edugest-pme-default-rtdb.firebaseio.com
```

📋 **COPIA ESTA URL** - La necesitarás en el Paso 5

Agrégala a tu archivo temporal:

```
databaseURL: https://edugest-pme-default-rtdb.firebaseio.com
```

---

## Paso 4: Configurar Reglas de Seguridad

### 4.1 Abrir Editor de Reglas

1. En la página de Realtime Database
2. Click en la pestaña **"Reglas"**
3. Verás un editor de texto

### 4.2 Copiar Reglas de Seguridad

**Opción A: Reglas Completas (Recomendado)**

Abre el archivo `firebase-realtime-rules.json` en tu proyecto y copia todo el contenido.

**Opción B: Reglas Básicas (Para empezar rápido)**

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null",
        ".write": "$uid === auth.uid || auth != null"
      }
    },
    "conversations": {
      "$conversationId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "groups": {
      "$schoolId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "notifications": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "auth != null"
      }
    }
  }
}
```

### 4.3 Publicar Reglas

1. Pega las reglas en el editor
2. Click en **"Publicar"**
3. Confirma la acción

✅ **Reglas configuradas correctamente**

---

## Paso 5: Actualizar Configuración

### 5.1 Abrir firebase-config.js

Abre el archivo: `js/firebase-config.js`

### 5.2 Reemplazar Credenciales

Reemplaza los valores de placeholder con tus credenciales reales:

**ANTES:**
```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "edugest-pme",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    databaseURL: "https://edugest-pme-default-rtdb.firebaseio.com"
};
```

**DESPUÉS:**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC1234567890abcdefghijklmnopqrst",
    authDomain: "edugest-pme.firebaseapp.com",
    projectId: "edugest-pme",
    storageBucket: "edugest-pme.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890",
    databaseURL: "https://edugest-pme-default-rtdb.firebaseio.com"
};
```

### 5.3 Guardar Archivo

Guarda los cambios en `js/firebase-config.js`

---

## Paso 6: Probar el Chat

### 6.1 Iniciar Servidor Local

```bash
npm start
```

O si usas Python:

```bash
python -m http.server 8000
```

### 6.2 Abrir Página de Prueba

Abre en tu navegador:

```
http://localhost:8000/test-chat.html
```

### 6.3 Configurar Usuario 1

1. **Nombre:** María González
2. **Rol:** Director
3. **Colegio:** colegio-demo
4. Click en **"Guardar y Activar Chat"**

### 6.4 Configurar Usuario 2

1. Abre la misma URL en **otra pestaña** o **navegador diferente**
2. **Nombre:** Juan Pérez
3. **Rol:** Profesor
4. **Colegio:** colegio-demo (mismo colegio)
5. Click en **"Guardar y Activar Chat"**

### 6.5 Probar Chat Privado

1. Click en el **botón flotante** (esquina inferior derecha)
2. En la pestaña **"Usuarios"**, deberías ver al otro usuario
3. Click en el usuario para abrir conversación
4. Escribe un mensaje y presiona Enter
5. El mensaje debería aparecer **instantáneamente** en la otra pestaña

### 6.6 Probar Chat Grupal

1. Click en la pestaña **"Grupo Colegio"**
2. Escribe un mensaje
3. Debería aparecer en ambas ventanas

---

## ✅ Verificación Final

### El chat está funcionando correctamente si:

- ✅ El botón flotante aparece en la esquina inferior derecha
- ✅ Al hacer click, se abre la ventana del chat
- ✅ Aparece la lista de usuarios del colegio
- ✅ Los mensajes se envían y reciben en tiempo real (sin recargar)
- ✅ El badge muestra el número de mensajes no leídos
- ✅ El estado online/offline se actualiza correctamente

---

## 🐛 Solución de Problemas

### Error: "Firebase not initialized"

**Causa:** Las credenciales no están configuradas correctamente

**Solución:**
1. Verifica que copiaste todas las credenciales
2. Revisa que no haya comillas o comas faltantes
3. Asegúrate de guardar el archivo `firebase-config.js`

### Error: "Permission denied"

**Causa:** Las reglas de seguridad no están configuradas

**Solución:**
1. Ve a Firebase Console → Realtime Database → Reglas
2. Copia las reglas del Paso 4
3. Click en "Publicar"

### El botón del chat no aparece

**Causa:** Firebase Realtime Database no está habilitado

**Solución:**
1. Ve a Firebase Console
2. Verifica que Realtime Database esté creado
3. Copia la URL y agrégala en `firebase-config.js`

### No veo otros usuarios

**Causa:** Los usuarios tienen diferente `schoolId`

**Solución:**
1. Verifica que ambos usuarios tengan el mismo `schoolId`
2. Revisa localStorage en la consola del navegador (F12)
3. Ejecuta: `localStorage.getItem('schoolId')`

### Los mensajes no se envían

**Causa:** Problema de conexión o permisos

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica tu conexión a internet
4. Revisa las reglas de seguridad en Firebase

---

## 📊 Verificar en Firebase Console

### Ver Datos en Tiempo Real

1. Ve a Firebase Console → Realtime Database
2. Click en la pestaña **"Datos"**
3. Deberías ver esta estructura:

```
edugest-pme-default-rtdb
├── users/
│   ├── user-123/
│   │   ├── name: "María González"
│   │   ├── role: "director"
│   │   ├── schoolId: "colegio-demo"
│   │   └── online: true
│   └── user-456/
│       ├── name: "Juan Pérez"
│       ├── role: "profesor"
│       └── schoolId: "colegio-demo"
├── conversations/
│   └── user-123_user-456/
│       └── messages/
│           └── msg-001/
│               ├── senderId: "user-123"
│               ├── message: "Hola!"
│               └── timestamp: 1234567890
└── groups/
    └── colegio-demo/
        └── messages/
```

---

## 💰 Costos de Firebase

### Plan Gratuito (Spark)

✅ **Incluye:**
- 1 GB de almacenamiento
- 10 GB de transferencia/mes
- 100,000 conexiones simultáneas

✅ **Suficiente para:**
- Hasta 50 usuarios activos simultáneamente
- Miles de mensajes por día
- Historial completo de conversaciones

💵 **Costo:** $0/mes

### Cuándo Actualizar

Solo necesitarás un plan pagado si:
- Tienes más de 100 usuarios conectados simultáneamente
- Superas 10 GB de transferencia mensual
- Necesitas más de 1 GB de almacenamiento

---

## 🔐 Seguridad

### Mejores Prácticas

1. **Nunca compartas tus credenciales** en repositorios públicos
2. **Usa variables de entorno** en producción
3. **Configura reglas de seguridad** apropiadas
4. **Habilita autenticación** para usuarios reales
5. **Monitorea el uso** en Firebase Console

### Proteger Credenciales

Agrega a `.gitignore`:

```
# Firebase
.firebase/
firebase-debug.log
firebase-credentials.txt

# Environment
.env
.env.local
```

---

## 📚 Recursos Adicionales

### Documentación del Proyecto

- `CHAT-QUICKSTART.md` - Inicio rápido (10 min)
- `CHAT-SETUP.md` - Documentación completa
- `CHAT-FAQ.md` - Preguntas frecuentes
- `CHAT-ARCHITECTURE.md` - Arquitectura del sistema
- `CHAT-CHECKLIST.md` - Lista de verificación

### Documentación de Firebase

- [Firebase Realtime Database](https://firebase.google.com/docs/database)
- [Reglas de Seguridad](https://firebase.google.com/docs/database/security)
- [Límites y Cuotas](https://firebase.google.com/docs/database/usage/limits)

---

## 🎉 ¡Felicidades!

Has configurado exitosamente el chat en tiempo real para EDUGEST.

### Próximos Pasos

1. ✅ Integrar con tu sistema de autenticación
2. ✅ Personalizar colores y estilos
3. ✅ Capacitar a los usuarios
4. ✅ Monitorear el uso en Firebase Console

---

## 📞 Soporte

Si tienes problemas:

1. Revisa la sección **"Solución de Problemas"** arriba
2. Consulta `CHAT-FAQ.md`
3. Verifica la consola del navegador (F12)
4. Revisa Firebase Console para errores

---

**Versión:** 1.0.0  
**Última actualización:** Marzo 2026  
**Tiempo estimado:** 15-20 minutos  
**Dificultad:** ⭐⭐☆☆☆ (Fácil)

---

¡El chat está listo para transformar la comunicación en tu plataforma EDUGEST! 💬🚀
