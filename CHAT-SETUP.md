# 💬 Configuración del Chat en Tiempo Real - EDUGEST

## 📋 Descripción General

El módulo de chat permite comunicación en tiempo real entre Director, Administrador y Profesores dentro de cada colegio. Utiliza Firebase Realtime Database para mensajería instantánea.

## 🎯 Características Principales

✅ **Mensajes en tiempo real** sin recargar la página
✅ **Lista de usuarios conectados** con estado online/offline
✅ **Chat privado** (1 a 1) entre usuarios
✅ **Chat grupal** por colegio
✅ **Historial de mensajes** guardado en Firebase
✅ **Notificaciones** de mensajes nuevos
✅ **Organización por colegio** - cada colegio tiene su propio chat
✅ **Sistema de permisos** según rol de usuario
✅ **Interfaz moderna** tipo WhatsApp/Messenger
✅ **Botón flotante** visible en todas las páginas

## 🔧 Configuración de Firebase

### 1. Habilitar Realtime Database

1. Ve a tu proyecto en [Firebase Console](https://console.firebase.google.com/)
2. En el menú lateral, selecciona **Realtime Database**
3. Haz clic en **Crear base de datos**
4. Selecciona la ubicación (recomendado: us-central1)
5. Inicia en **modo de prueba** (cambiarás las reglas después)

### 2. Obtener la URL de la Database

Después de crear la database, verás una URL como:
```
https://edugest-pme-default-rtdb.firebaseio.com
```

### 3. Actualizar firebase-config.js

Abre el archivo `js/firebase-config.js` y actualiza la configuración:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "edugest-pme",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    databaseURL: "https://edugest-pme-default-rtdb.firebaseio.com" // ⬅️ Reemplazar con tu URL
};
```

### 4. Configurar Reglas de Seguridad

En Firebase Console > Realtime Database > Reglas, configura:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null",
        ".write": "$uid === auth.uid"
      }
    },
    "conversations": {
      "$conversationId": {
        ".read": "auth != null && (data.child('participants').child(auth.uid).exists() || !data.exists())",
        ".write": "auth != null && (data.child('participants').child(auth.uid).exists() || !data.exists())"
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

## 👥 Sistema de Permisos

### Roles y Permisos de Chat

| Rol | Puede chatear con |
|-----|-------------------|
| **Director** | Todos (Director, Administrador, Profesores) |
| **Administrador** | Todos (Director, Administrador, Profesores) |
| **Profesor** | Director, Administrador, otros Profesores |

### Organización por Colegio

- Cada colegio tiene su propio espacio de chat independiente
- Los usuarios solo ven y pueden chatear con personas de su mismo colegio
- El chat grupal es específico por colegio

## 📊 Estructura de Datos en Firebase

### Usuarios
```
users/
  {userId}/
    name: "Juan Pérez"
    role: "profesor"
    schoolId: "colegio-123"
    online: true
    lastSeen: timestamp
```

### Conversaciones Privadas
```
conversations/
  {userId1}_{userId2}/
    participants/
      {userId1}: true
      {userId2}: true
    lastMessage: "Hola, ¿cómo estás?"
    lastMessageTime: timestamp
    messages/
      {messageId}/
        senderId: "userId1"
        senderName: "Juan Pérez"
        recipientId: "userId2"
        message: "Hola, ¿cómo estás?"
        timestamp: timestamp
        read: false
```

### Chat Grupal
```
groups/
  {schoolId}/
    schoolId: "colegio-123"
    lastMessage: "Reunión mañana"
    lastMessageTime: timestamp
    messages/
      {messageId}/
        senderId: "userId1"
        senderName: "Juan Pérez"
        senderRole: "profesor"
        message: "Reunión mañana"
        timestamp: timestamp
```

### Notificaciones
```
notifications/
  {userId}/
    {notificationId}/
      from: "María González"
      message: "Hola, ¿cómo estás?"
      timestamp: timestamp
      read: false
```

## 🎨 Interfaz de Usuario

### Botón Flotante
- Ubicación: Esquina inferior derecha
- Muestra badge con número de mensajes no leídos
- Visible en todas las páginas del sistema

### Ventana de Chat
- Diseño moderno tipo WhatsApp/Messenger
- Dos pestañas: "Usuarios" y "Grupo Colegio"
- Búsqueda de usuarios
- Lista de usuarios con estado online/offline
- Vista de conversación con historial de mensajes

## 🔌 Integración en Páginas HTML

El chat ya está integrado en todas las páginas principales. Los scripts necesarios son:

```html
<script src="js/chat-firebase.js"></script>
<script src="js/chat-ui.js"></script>
<script src="js/chat.js"></script>
```

## 💾 Datos de Usuario Requeridos

Para que el chat funcione correctamente, el sistema necesita estos datos en localStorage:

```javascript
localStorage.setItem('userId', 'user-123');
localStorage.setItem('userName', 'Juan Pérez');
localStorage.setItem('userRole', 'profesor'); // director, administrador, profesor
localStorage.setItem('schoolId', 'colegio-123');
```

Si no existen, el chat usará datos de demostración automáticamente.

## 🚀 Inicialización Automática

El chat se inicializa automáticamente cuando se carga cualquier página que incluya los scripts. No requiere configuración adicional.

## 🔔 Notificaciones del Navegador

El chat solicita permisos para mostrar notificaciones del navegador cuando llegan mensajes nuevos. Los usuarios pueden aceptar o rechazar este permiso.

## 📱 Responsive Design

El chat está optimizado para:
- Desktop (ventana de 380px x 600px)
- Tablet (ventana adaptativa)
- Mobile (ventana de pantalla completa)

## 🐛 Solución de Problemas

### El chat no aparece
1. Verifica que los scripts estén incluidos en el HTML
2. Revisa la consola del navegador para errores
3. Confirma que Firebase esté configurado correctamente

### Los mensajes no se envían
1. Verifica la conexión a Firebase
2. Revisa las reglas de seguridad en Firebase Console
3. Confirma que el usuario tenga los datos necesarios en localStorage

### Los usuarios no aparecen
1. Verifica que los usuarios tengan el mismo `schoolId`
2. Confirma que los usuarios estén registrados en Firebase
3. Revisa los permisos según el rol del usuario

## 📈 Próximas Mejoras

- [ ] Envío de archivos e imágenes
- [ ] Mensajes de voz
- [ ] Reacciones a mensajes (emojis)
- [ ] Búsqueda en historial de mensajes
- [ ] Mensajes destacados/importantes
- [ ] Indicador de "escribiendo..."
- [ ] Confirmación de lectura (doble check)

## 📞 Soporte

Para problemas o consultas sobre el módulo de chat, contacta al equipo de desarrollo.

---

**Versión:** 1.0.0  
**Última actualización:** Marzo 2026
