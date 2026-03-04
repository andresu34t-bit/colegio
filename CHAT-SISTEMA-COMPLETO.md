# 💬 SISTEMA DE CHAT EN TIEMPO REAL - COMPLETO

## 🎯 DESCRIPCIÓN GENERAL

Sistema de chat interno mejorado tipo WhatsApp/Messenger para comunicación en tiempo real dentro de cada colegio.

---

## ✨ FUNCIONALIDADES IMPLEMENTADAS

### 1. 👥 USUARIOS DEL SISTEMA

**Roles disponibles:**
- 👔 **Director**: Acceso completo a todos los usuarios
- ⚙️ **Administrador**: Acceso completo a todos los usuarios
- 👨‍🏫 **Docente/Profesor**: Puede comunicarse con directores, administradores, técnicos y otros docentes
- 🔧 **Técnico**: Puede responder a todos (soporte técnico)

### 2. 💬 TIPOS DE CHAT

#### Chat Privado (Uno a Uno)
- Conversaciones privadas entre dos usuarios
- Historial de mensajes persistente
- Notificaciones de mensajes no leídos
- Estado "en línea" visible

#### Chat Grupal del Colegio
- Canal de comunicación para todo el colegio
- Todos los miembros pueden participar
- Ideal para anuncios y comunicación general
- Muestra el nombre del remitente en cada mensaje

### 3. 🔍 BÚSQUEDA DE USUARIOS

- Búsqueda en tiempo real por nombre
- Filtrado instantáneo mientras escribes
- Muestra rol y estado de conexión
- Interfaz intuitiva y rápida

### 4. 🟢 ESTADO EN LÍNEA

- Indicador visual de usuarios conectados
- Actualización automática del estado
- Punto verde para "en línea"
- Punto gris para "desconectado"
- Última vez visto (próximamente)

### 5. 🔔 NOTIFICACIONES INSTANTÁNEAS

- Badge con contador de mensajes no leídos
- Notificaciones del navegador (con permiso)
- Animación de pulso en el botón flotante
- Sonido de notificación (opcional)

### 6. 📜 HISTORIAL DE MENSAJES

- Todos los mensajes se guardan en Firebase
- Carga automática al abrir conversación
- Scroll automático a mensajes nuevos
- Formato de hora legible

### 7. 🔒 REGLAS DE SEGURIDAD

**Restricciones implementadas:**
- Solo comunicación dentro del mismo colegio
- Permisos basados en roles
- Validación de usuarios autenticados
- Datos aislados por colegio

---

## 🎨 INTERFAZ DE USUARIO

### Botón Flotante
- **Ubicación**: Esquina inferior derecha
- **Diseño**: Circular con gradiente morado
- **Badge**: Contador de mensajes no leídos
- **Animación**: Pulso cuando hay notificaciones

### Ventana de Chat
- **Estilo**: Tipo Messenger/WhatsApp
- **Tamaño**: 400x600px (escritorio)
- **Responsive**: Pantalla completa en móvil
- **Animación**: Entrada suave con fade-in

### Componentes

#### Header
- Título dinámico según la vista
- Botón de retroceso
- Botón de minimizar
- Gradiente morado premium

#### Tabs
- **Usuarios**: Lista de personas del colegio
- **Grupo Colegio**: Chat grupal

#### Lista de Usuarios
- Avatar con inicial del nombre
- Nombre completo
- Rol con emoji
- Estado en línea
- Búsqueda integrada

#### Vista de Mensajes
- Mensajes propios: Azul, alineados a la derecha
- Mensajes recibidos: Gris, alineados a la izquierda
- Hora de envío
- Nombre del remitente (en chat grupal)
- Scroll automático

#### Input de Mensaje
- Campo de texto con placeholder
- Botón de envío con icono
- Enter para enviar
- Diseño redondeado

---

## 🔧 ARQUITECTURA TÉCNICA

### Archivos del Sistema

```
js/
├── chat.js              # Controlador principal
├── chat-ui.js           # Interfaz de usuario
├── chat-firebase.js     # Lógica de Firebase
└── firebase-config.js   # Configuración de Firebase

css/
└── style.css            # Estilos del chat (líneas 5500-6100)
```

### Estructura de Datos en Firebase

```javascript
// Usuarios
users/
  {userId}/
    name: "Juan Pérez"
    role: "profesor"
    schoolId: "colegio-123"
    online: true
    lastSeen: timestamp

// Conversaciones privadas
conversations/
  {conversationId}/
    participants: {userId1: true, userId2: true}
    lastMessage: "Hola..."
    lastMessageTime: timestamp
    messages/
      {messageId}/
        senderId: "user1"
        senderName: "Juan"
        recipientId: "user2"
        message: "Hola..."
        timestamp: timestamp
        read: false

// Chat grupal
groups/
  {schoolId}/
    schoolId: "colegio-123"
    lastMessage: "Anuncio..."
    lastMessageTime: timestamp
    messages/
      {messageId}/
        senderId: "user1"
        senderName: "Juan"
        senderRole: "profesor"
        message: "Anuncio..."
        timestamp: timestamp

// Notificaciones
notifications/
  {userId}/
    {notificationId}/
      from: "María"
      message: "Hola..."
      timestamp: timestamp
      read: false
```

---

## 🚀 INICIALIZACIÓN

### Automática
El chat se inicializa automáticamente cuando se carga la página:

```javascript
// Se ejecuta al cargar el DOM
chatController.init();
```

### Manual
También puedes inicializarlo manualmente:

```javascript
import chatController from './js/chat.js';
chatController.init();
```

---

## 📱 RESPONSIVE DESIGN

### Escritorio (>1024px)
- Ventana flotante 400x600px
- Botón en esquina inferior derecha
- Diseño tipo Messenger

### Tablet (769px - 1024px)
- Ventana 360x550px
- Ajustes de espaciado

### Móvil (<768px)
- Pantalla completa
- Botón más grande
- Optimizado para touch
- Safe area para notch

---

## 🎯 EVENTOS PERSONALIZADOS

### conversationOpened
Se dispara al abrir una conversación:
```javascript
document.addEventListener('conversationOpened', (e) => {
    const { userId, type } = e.detail;
    // type: 'private' o 'group'
});
```

### messageSent
Se dispara al enviar un mensaje:
```javascript
document.addEventListener('messageSent', (e) => {
    const { message, recipientId, type } = e.detail;
});
```

---

## 🔐 PERMISOS Y ROLES

### Matriz de Permisos

| Rol          | Puede chatear con                                    |
|--------------|------------------------------------------------------|
| Director     | Todos (directores, admins, docentes, técnicos)      |
| Administrador| Todos (directores, admins, docentes, técnicos)      |
| Docente      | Directores, admins, técnicos, otros docentes        |
| Técnico      | Todos (soporte técnico universal)                   |

### Validación
```javascript
chatFirebase.canChatWith(targetRole); // true/false
```

---

## 🎨 PERSONALIZACIÓN

### Colores
Los colores se definen en CSS variables:
```css
--primary-600: #6366f1;  /* Color principal */
--success-600: #10b981;  /* En línea */
--danger-600: #ef4444;   /* Badge notificaciones */
```

### Emojis de Roles
```javascript
'director': '👔 Director'
'administrador': '⚙️ Administrador'
'profesor': '👨‍🏫 Docente'
'tecnico': '🔧 Técnico'
```

---

## 🔔 NOTIFICACIONES

### Navegador
```javascript
// Solicitar permiso
chatUI.requestNotificationPermission();

// Mostrar notificación
chatUI.showNotification('Nuevo mensaje', 'Juan: Hola...');
```

### Badge
```javascript
// Actualizar contador
chatUI.updateUnreadCount(5);
```

---

## 📊 CARACTERÍSTICAS AVANZADAS

### Scroll Automático
- Los mensajes nuevos hacen scroll automático
- Animación suave
- Mantiene posición al cargar historial

### Animaciones
- Entrada de mensajes con slide-in
- Pulso en botón flotante
- Transiciones suaves en hover
- Fade-in de ventana

### Optimizaciones
- Lazy loading de mensajes
- Listeners eficientes
- Cleanup automático
- Prevención de memory leaks

---

## 🐛 DEBUGGING

### Console Logs
```javascript
// Inicialización
✅ Chat inicializado correctamente

// Advertencias
⚠️ No hay usuario autenticado para el chat

// Errores
❌ Error al enviar mensaje: [error]
```

### Verificar Estado
```javascript
console.log(chatController.initialized); // true/false
console.log(chatFirebase.currentUser);   // Datos del usuario
console.log(chatUI.isOpen);              // true/false
```

---

## 📝 PRÓXIMAS MEJORAS

### Fase 2
- [ ] Envío de archivos e imágenes
- [ ] Mensajes de voz
- [ ] Reacciones a mensajes (👍❤️😂)
- [ ] Responder a mensajes específicos
- [ ] Editar mensajes enviados
- [ ] Eliminar mensajes

### Fase 3
- [ ] Videollamadas
- [ ] Compartir pantalla
- [ ] Encuestas en grupo
- [ ] Mensajes programados
- [ ] Traducción automática

---

## 🎓 CASOS DE USO

### 1. Docente consulta al Director
```
1. Docente abre el chat
2. Busca "Director" en la lista
3. Hace clic en el usuario
4. Escribe su consulta
5. Envía el mensaje
6. Director recibe notificación
7. Director responde
```

### 2. Anuncio General del Colegio
```
1. Director abre el chat
2. Selecciona "Grupo Colegio"
3. Escribe el anuncio
4. Envía al grupo
5. Todos los miembros reciben el mensaje
```

### 3. Soporte Técnico
```
1. Usuario tiene un problema
2. Busca "Técnico" en el chat
3. Describe el problema
4. Técnico responde con solución
5. Problema resuelto
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [x] Botón flotante con badge
- [x] Ventana tipo Messenger
- [x] Lista de usuarios del colegio
- [x] Búsqueda por nombre
- [x] Chat privado (uno a uno)
- [x] Chat grupal del colegio
- [x] Estado "en línea"
- [x] Notificaciones instantáneas
- [x] Historial de mensajes
- [x] Permisos por rol
- [x] Responsive design
- [x] Animaciones premium
- [x] Firebase Realtime Database
- [x] Cleanup de listeners
- [x] Documentación completa

---

## 🎉 CONCLUSIÓN

El sistema de chat está completamente implementado y listo para usar. Proporciona una experiencia moderna y fluida similar a WhatsApp/Messenger, con todas las funcionalidades necesarias para la comunicación interna del colegio.

**Características destacadas:**
- ✨ Interfaz moderna y atractiva
- ⚡ Tiempo real con Firebase
- 🔒 Seguro y privado por colegio
- 📱 Totalmente responsive
- 🎨 Diseño premium con animaciones
- 🔔 Notificaciones inteligentes

---

**Desarrollado con ❤️ para EduGest**
