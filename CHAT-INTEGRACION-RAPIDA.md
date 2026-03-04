# 🚀 INTEGRACIÓN RÁPIDA DEL CHAT

## ⚡ EN 3 PASOS

### PASO 1: Incluir los archivos necesarios

En tu HTML (antes del cierre de `</body>`):

```html
<!-- Firebase SDK -->
<script type="module">
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
    import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
    
    // Tu configuración de Firebase
    const firebaseConfig = {
        apiKey: "TU_API_KEY",
        authDomain: "TU_AUTH_DOMAIN",
        databaseURL: "TU_DATABASE_URL",
        projectId: "TU_PROJECT_ID",
        storageBucket: "TU_STORAGE_BUCKET",
        messagingSenderId: "TU_MESSAGING_SENDER_ID",
        appId: "TU_APP_ID"
    };
    
    const app = initializeApp(firebaseConfig);
    window.realtimeDb = getDatabase(app);
</script>

<!-- Chat Scripts -->
<script type="module" src="js/chat-firebase.js"></script>
<script type="module" src="js/chat-ui.js"></script>
<script type="module" src="js/chat.js"></script>
```

### PASO 2: Asegurar datos del usuario en localStorage

Antes de inicializar el chat, asegúrate de tener:

```javascript
localStorage.setItem('userId', 'user-123');
localStorage.setItem('userName', 'Juan Pérez');
localStorage.setItem('userRole', 'profesor'); // director, administrador, profesor, tecnico
localStorage.setItem('schoolId', 'colegio-abc');
```

### PASO 3: ¡Listo!

El chat se inicializa automáticamente. El botón flotante aparecerá en la esquina inferior derecha.

---

## 🎯 INTEGRACIÓN EN PÁGINAS EXISTENTES

### Dashboard (dashboard.html)

Ya está integrado. Solo asegúrate de que los scripts estén incluidos.

### Otras páginas

Agrega al final del HTML:

```html
<!-- Chat Module -->
<script type="module" src="js/chat.js"></script>
```

---

## 🔧 CONFIGURACIÓN AVANZADA

### Inicialización Manual

Si necesitas control sobre cuándo se inicializa:

```javascript
import chatController from './js/chat.js';

// Inicializar cuando quieras
document.getElementById('miBoton').addEventListener('click', () => {
    chatController.init();
});
```

### Abrir Chat Programáticamente

```javascript
import chatController from './js/chat.js';

// Abrir el chat
chatController.ui.openChat();

// Abrir conversación específica
chatController.ui.showConversationView('Juan Pérez', 'user-123', 'private');
```

### Destruir Chat

```javascript
chatController.destroy();
```

---

## 📋 CHECKLIST DE INTEGRACIÓN

- [ ] Firebase configurado en el proyecto
- [ ] Scripts del chat incluidos en HTML
- [ ] Datos de usuario en localStorage
- [ ] CSS del chat incluido (style.css)
- [ ] Probar en diferentes roles
- [ ] Verificar notificaciones
- [ ] Probar en móvil

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### El chat no aparece
✅ Verifica que los scripts estén cargados
✅ Revisa la consola por errores
✅ Asegúrate de que Firebase esté configurado

### No se cargan usuarios
✅ Verifica que `schoolId` esté en localStorage
✅ Revisa las reglas de Firebase
✅ Comprueba la conexión a internet

### Mensajes no se envían
✅ Verifica permisos de Firebase
✅ Revisa que el usuario esté autenticado
✅ Comprueba la consola por errores

---

## 📞 SOPORTE

Si tienes problemas, revisa:
1. `CHAT-SISTEMA-COMPLETO.md` - Documentación completa
2. `CHAT-FAQ.md` - Preguntas frecuentes
3. Consola del navegador - Mensajes de error

---

**¡Listo para chatear! 💬**
