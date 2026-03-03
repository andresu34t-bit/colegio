# ✅ Checklist de Implementación del Chat

## 🎯 Objetivo
Activar el módulo de chat en tiempo real en tu plataforma EDUGEST.

**Tiempo estimado:** 10-15 minutos

---

## 📋 Paso 1: Configuración de Firebase (5 min)

### 1.1 Habilitar Realtime Database

- [ ] Abrir [Firebase Console](https://console.firebase.google.com/)
- [ ] Seleccionar proyecto "edugest-pme"
- [ ] Click en "Realtime Database" en el menú lateral
- [ ] Click en "Crear base de datos"
- [ ] Seleccionar ubicación: **us-central1**
- [ ] Seleccionar modo: **Modo de prueba**
- [ ] Click en "Habilitar"

### 1.2 Copiar URL de Database

- [ ] En la página de Realtime Database, copiar la URL que aparece arriba
- [ ] Ejemplo: `https://edugest-pme-default-rtdb.firebaseio.com`

---

## 📋 Paso 2: Actualizar Configuración (2 min)

### 2.1 Editar firebase-config.js

- [ ] Abrir archivo: `js/firebase-config.js`
- [ ] Buscar la línea con `databaseURL`
- [ ] Reemplazar con tu URL copiada:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "edugest-pme",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    databaseURL: "https://edugest-pme-default-rtdb.firebaseio.com" // ⬅️ TU URL AQUÍ
};
```

- [ ] Guardar el archivo

---

## 📋 Paso 3: Configurar Reglas de Seguridad (3 min)

### 3.1 Abrir Reglas

- [ ] En Firebase Console → Realtime Database
- [ ] Click en pestaña "Reglas"

### 3.2 Copiar Reglas

- [ ] Abrir archivo: `firebase-realtime-rules.json`
- [ ] Copiar todo el contenido
- [ ] Pegar en el editor de reglas de Firebase
- [ ] Click en "Publicar"

**Alternativa rápida (solo para desarrollo):**

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

---

## 📋 Paso 4: Verificar Archivos (1 min)

### 4.1 Verificar Scripts en HTML

Confirma que estos archivos HTML incluyan los scripts del chat:

- [ ] `dashboard.html`
- [ ] `areas.html`
- [ ] `finanzas.html`
- [ ] `informes.html`
- [ ] `admin-global.html`

Deben tener al final (antes de `</body>`):

```html
<script src="js/chat-firebase.js"></script>
<script src="js/chat-ui.js"></script>
<script src="js/chat.js"></script>
```

✅ **Ya están incluidos** - No necesitas hacer nada

---

## 📋 Paso 5: Probar el Chat (5 min)

### 5.1 Abrir Página de Prueba

- [ ] Abrir `test-chat.html` en tu navegador
- [ ] O ir a: `http://localhost:8000/test-chat.html`

### 5.2 Configurar Usuario 1

- [ ] Nombre: María González
- [ ] Rol: Director
- [ ] Colegio: colegio-demo
- [ ] Click en "Guardar y Activar Chat"

### 5.3 Configurar Usuario 2

- [ ] Abrir `test-chat.html` en otra pestaña/navegador
- [ ] Nombre: Juan Pérez
- [ ] Rol: Profesor
- [ ] Colegio: colegio-demo (mismo colegio)
- [ ] Click en "Guardar y Activar Chat"

### 5.4 Probar Chat

- [ ] Click en el botón flotante del chat (esquina inferior derecha)
- [ ] Verificar que aparezcan ambos usuarios en la lista
- [ ] Click en un usuario para abrir conversación
- [ ] Enviar mensaje desde Usuario 1
- [ ] Verificar que llegue a Usuario 2 en tiempo real
- [ ] Responder desde Usuario 2
- [ ] Verificar que llegue a Usuario 1

### 5.5 Probar Chat Grupal

- [ ] Click en pestaña "Grupo Colegio"
- [ ] Enviar mensaje desde Usuario 1
- [ ] Verificar que llegue a Usuario 2
- [ ] Responder desde Usuario 2

---

## 📋 Paso 6: Integrar con Login (Opcional)

Si ya tienes sistema de autenticación:

### 6.1 Actualizar auth.js

- [ ] Abrir `js/auth.js`
- [ ] Después del login exitoso, agregar:

```javascript
// Guardar datos para el chat
localStorage.setItem('userId', user.uid);
localStorage.setItem('userName', userData.nombre);
localStorage.setItem('userRole', userData.rol);
localStorage.setItem('schoolId', userData.colegioId);
```

### 6.2 Verificar Datos

- [ ] Los roles válidos son: `director`, `administrador`, `profesor`
- [ ] El `schoolId` debe ser igual para usuarios del mismo colegio

---

## ✅ Verificación Final

### El chat está funcionando si:

- [x] El botón flotante aparece en la esquina inferior derecha
- [x] Al hacer click, se abre la ventana del chat
- [x] Aparece la lista de usuarios del colegio
- [x] Los mensajes se envían y reciben en tiempo real
- [x] El badge muestra el número de mensajes no leídos
- [x] El estado online/offline se actualiza correctamente

---

## 🎉 ¡Completado!

Si todos los pasos están marcados, el chat está listo para usar.

---

## 🐛 ¿Problemas?

### El botón no aparece

1. [ ] Verifica la consola del navegador (F12)
2. [ ] Confirma que `databaseURL` esté en `firebase-config.js`
3. [ ] Verifica que Realtime Database esté habilitado

### No veo otros usuarios

1. [ ] Confirma que ambos usuarios tengan el mismo `schoolId`
2. [ ] Verifica que los datos estén en localStorage
3. [ ] Revisa las reglas de seguridad en Firebase

### Los mensajes no se envían

1. [ ] Verifica la conexión a internet
2. [ ] Revisa las reglas de seguridad
3. [ ] Confirma que el usuario tenga permisos según su rol

---

## 📚 Documentación

- **Inicio Rápido:** `CHAT-QUICKSTART.md`
- **Documentación Completa:** `CHAT-SETUP.md`
- **Preguntas Frecuentes:** `CHAT-FAQ.md`
- **Resumen de Archivos:** `CHAT-FILES-SUMMARY.md`

---

## 💡 Próximos Pasos

Después de activar el chat:

1. [ ] Capacitar a los usuarios
2. [ ] Monitorear uso en Firebase Console
3. [ ] Ajustar reglas de seguridad si es necesario
4. [ ] Personalizar colores/estilos según tu marca

---

**¿Todo listo?** ¡Disfruta tu nuevo sistema de chat en tiempo real! 💬🚀
