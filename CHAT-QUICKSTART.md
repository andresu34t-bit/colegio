# 💬 Chat en Tiempo Real - Inicio Rápido

## ✅ ¿Qué se ha implementado?

El módulo de chat en tiempo real está completamente integrado en tu plataforma EDUGEST. Incluye:

- ✅ **3 archivos JavaScript** para la lógica del chat
- ✅ **Estilos CSS** integrados en `css/style.css`
- ✅ **Scripts incluidos** en todos los archivos HTML principales
- ✅ **Página de prueba** (`test-chat.html`) para testing
- ✅ **Documentación completa** en `CHAT-SETUP.md`

## 🚀 Pasos para Activar el Chat

### 1. Configurar Firebase Realtime Database (5 minutos)

```
1. Ve a Firebase Console: https://console.firebase.google.com/
2. Selecciona tu proyecto "edugest-pme"
3. Click en "Realtime Database" en el menú lateral
4. Click en "Crear base de datos"
5. Selecciona ubicación: us-central1
6. Inicia en "modo de prueba"
7. Copia la URL que aparece (ej: https://edugest-pme-default-rtdb.firebaseio.com)
```

### 2. Actualizar Configuración (1 minuto)

Abre `js/firebase-config.js` y agrega la URL de tu database:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "edugest-pme",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    databaseURL: "https://edugest-pme-default-rtdb.firebaseio.com" // ⬅️ AGREGAR ESTA LÍNEA
};
```

### 3. Configurar Reglas de Seguridad (2 minutos)

En Firebase Console → Realtime Database → Reglas, pega esto:

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

Click en "Publicar"

### 4. ¡Listo! Probar el Chat

Abre `test-chat.html` en tu navegador:

```bash
# Si usas un servidor local
http://localhost:8000/test-chat.html
```

O simplemente abre el archivo directamente en el navegador.

## 🧪 Cómo Probar

1. **Abre `test-chat.html`**
2. **Configura el primer usuario:**
   - Nombre: María González
   - Rol: Director
   - Colegio: colegio-demo
3. **Click en "Guardar y Activar Chat"**
4. **Abre la misma página en otra pestaña/navegador**
5. **Configura el segundo usuario:**
   - Nombre: Juan Pérez
   - Rol: Profesor
   - Colegio: colegio-demo (mismo colegio)
6. **Click en el botón flotante del chat** (esquina inferior derecha)
7. **¡Chatea entre ambos usuarios!**

## 📱 Características del Chat

### Botón Flotante
- Ubicación: Esquina inferior derecha
- Muestra badge con mensajes no leídos
- Visible en todas las páginas

### Ventana de Chat
- **Pestaña "Usuarios"**: Lista de usuarios del colegio
- **Pestaña "Grupo Colegio"**: Chat grupal
- **Búsqueda**: Filtra usuarios por nombre
- **Estado**: Muestra quién está online/offline

### Mensajes
- Envío instantáneo (tiempo real)
- Historial guardado
- Notificaciones de mensajes nuevos
- Diseño moderno tipo WhatsApp

## 🔐 Permisos por Rol

| Rol | Puede chatear con |
|-----|-------------------|
| **Director** | Todos (Director, Administrador, Profesores) |
| **Administrador** | Todos (Director, Administrador, Profesores) |
| **Profesor** | Director, Administrador, otros Profesores |

## 📊 Organización por Colegio

- Cada colegio tiene su propio chat independiente
- Los usuarios solo ven personas de su mismo colegio
- El `schoolId` debe ser idéntico para usuarios del mismo colegio

## 🐛 Solución de Problemas

### El botón del chat no aparece
- ✅ Verifica que Firebase Realtime Database esté habilitado
- ✅ Revisa la consola del navegador (F12) para errores
- ✅ Confirma que `databaseURL` esté en `firebase-config.js`

### No veo otros usuarios
- ✅ Verifica que ambos usuarios tengan el mismo `schoolId`
- ✅ Confirma que los datos estén en localStorage
- ✅ Revisa las reglas de seguridad en Firebase

### Los mensajes no se envían
- ✅ Verifica la conexión a Firebase
- ✅ Revisa las reglas de seguridad
- ✅ Confirma que el usuario tenga permisos según su rol

## 📚 Documentación Completa

Para información detallada sobre:
- Estructura de datos en Firebase
- Integración con autenticación
- Personalización avanzada
- API del chat

Consulta: **`CHAT-SETUP.md`**

## 💡 Ejemplo de Integración con Login

Cuando un usuario inicia sesión, guarda estos datos:

```javascript
// Después del login exitoso
localStorage.setItem('userId', user.uid);
localStorage.setItem('userName', 'Juan Pérez');
localStorage.setItem('userRole', 'profesor'); // director, administrador, profesor
localStorage.setItem('schoolId', 'colegio-123');
```

El chat se activará automáticamente con estos datos.

## 🎉 ¡Eso es todo!

El chat está listo para usar. Solo necesitas:
1. ✅ Habilitar Realtime Database
2. ✅ Agregar la URL en firebase-config.js
3. ✅ Configurar las reglas de seguridad

**Tiempo total: ~10 minutos**

---

¿Necesitas ayuda? Consulta `CHAT-SETUP.md` para más detalles.
