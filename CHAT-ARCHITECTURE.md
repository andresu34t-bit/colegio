# 🏗️ Arquitectura del Módulo de Chat

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         EDUGEST CHAT                            │
│                     Sistema de Chat en Tiempo Real              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        CAPA DE PRESENTACIÓN                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Botón      │  │   Ventana    │  │  Lista de    │         │
│  │  Flotante    │  │   de Chat    │  │  Usuarios    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Mensajes    │  │    Input     │  │ Notificaciones│        │
│  │   (UI)       │  │   Mensaje    │  │    Badge      │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│                    chat-ui.js (ChatUI)                          │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      CAPA DE CONTROLADOR                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  ChatController                           │  │
│  │                                                           │  │
│  │  • Inicialización del chat                               │  │
│  │  • Gestión de eventos                                    │  │
│  │  • Coordinación UI ↔ Firebase                           │  │
│  │  • Manejo de conversaciones                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│                        chat.js                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      CAPA DE LÓGICA DE NEGOCIO                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  ChatFirebase                             │  │
│  │                                                           │  │
│  │  • Gestión de usuarios                                   │  │
│  │  • Envío de mensajes                                     │  │
│  │  • Listeners en tiempo real                              │  │
│  │  • Sistema de permisos                                   │  │
│  │  • Notificaciones                                        │  │
│  │  • Estado online/offline                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│                    chat-firebase.js                             │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      FIREBASE REALTIME DATABASE                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────────┐  ┌────────┐  ┌──────────────┐ │
│  │  users/  │  │conversations/│  │groups/ │  │notifications/│ │
│  └──────────┘  └──────────────┘  └────────┘  └──────────────┘ │
│                                                                  │
│  • Almacenamiento en tiempo real                                │
│  • Sincronización automática                                    │
│  • Reglas de seguridad                                          │
│  • Presencia y estado                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos

### 1. Envío de Mensaje Privado

```
Usuario A                ChatUI              ChatController      ChatFirebase        Firebase
   │                       │                      │                  │                 │
   │  Escribe mensaje      │                      │                  │                 │
   │──────────────────────>│                      │                  │                 │
   │                       │                      │                  │                 │
   │  Click "Enviar"       │                      │                  │                 │
   │──────────────────────>│                      │                  │                 │
   │                       │                      │                  │                 │
   │                       │  Event: messageSent  │                  │                 │
   │                       │─────────────────────>│                  │                 │
   │                       │                      │                  │                 │
   │                       │                      │  sendPrivateMsg  │                 │
   │                       │                      │─────────────────>│                 │
   │                       │                      │                  │                 │
   │                       │                      │                  │  push(message)  │
   │                       │                      │                  │────────────────>│
   │                       │                      │                  │                 │
   │                       │                      │                  │  ✅ Guardado    │
   │                       │                      │                  │<────────────────│
   │                       │                      │                  │                 │
   │                       │  Limpiar input       │                  │                 │
   │                       │<─────────────────────│                  │                 │
   │                       │                      │                  │                 │
   │  Input limpio         │                      │                  │                 │
   │<──────────────────────│                      │                  │                 │
```

### 2. Recepción de Mensaje en Tiempo Real

```
Firebase              ChatFirebase        ChatController      ChatUI           Usuario B
   │                      │                      │              │                 │
   │  onValue trigger     │                      │              │                 │
   │─────────────────────>│                      │              │                 │
   │                      │                      │              │                 │
   │                      │  Callback: messages  │              │                 │
   │                      │─────────────────────>│              │                 │
   │                      │                      │              │                 │
   │                      │                      │  renderMsgs  │                 │
   │                      │                      │─────────────>│                 │
   │                      │                      │              │                 │
   │                      │                      │              │  Mostrar msg    │
   │                      │                      │              │────────────────>│
   │                      │                      │              │                 │
   │                      │                      │  updateBadge │                 │
   │                      │                      │─────────────>│                 │
   │                      │                      │              │                 │
   │                      │                      │              │  Badge +1       │
   │                      │                      │              │────────────────>│
```

---

## 🗂️ Estructura de Datos en Firebase

### users/

```
users/
  {userId}/
    ├── name: string
    ├── role: "director" | "administrador" | "profesor"
    ├── schoolId: string
    ├── online: boolean
    └── lastSeen: timestamp
```

### conversations/

```
conversations/
  {userId1}_{userId2}/
    ├── participants/
    │   ├── {userId1}: true
    │   └── {userId2}: true
    ├── lastMessage: string
    ├── lastMessageTime: timestamp
    └── messages/
        └── {messageId}/
            ├── senderId: string
            ├── senderName: string
            ├── recipientId: string
            ├── message: string
            ├── timestamp: timestamp
            └── read: boolean
```

### groups/

```
groups/
  {schoolId}/
    ├── schoolId: string
    ├── lastMessage: string
    ├── lastMessageTime: timestamp
    └── messages/
        └── {messageId}/
            ├── senderId: string
            ├── senderName: string
            ├── senderRole: string
            ├── message: string
            └── timestamp: timestamp
```

### notifications/

```
notifications/
  {userId}/
    └── {notificationId}/
        ├── from: string
        ├── message: string
        ├── timestamp: timestamp
        └── read: boolean
```

---

## 🔐 Sistema de Permisos

### Matriz de Permisos

```
┌─────────────────┬──────────┬──────────────┬──────────┐
│   Puede chatear │ Director │ Administrador│ Profesor │
│      con ↓      │          │              │          │
├─────────────────┼──────────┼──────────────┼──────────┤
│ Director        │    ✅    │      ✅      │    ✅    │
├─────────────────┼──────────┼──────────────┼──────────┤
│ Administrador   │    ✅    │      ✅      │    ✅    │
├─────────────────┼──────────┼──────────────┼──────────┤
│ Profesor        │    ✅    │      ✅      │    ✅    │
└─────────────────┴──────────┴──────────────┴──────────┘

Nota: Profesores solo pueden chatear con Director, 
      Administrador y otros Profesores
```

### Flujo de Verificación de Permisos

```
Usuario intenta chatear
         │
         ↓
    ¿Mismo colegio?
         │
    ┌────┴────┐
   NO         SÍ
    │          │
    ↓          ↓
 ❌ Denegar  ¿Tiene permisos?
              │
         ┌────┴────┐
        NO         SÍ
         │          │
         ↓          ↓
      ❌ Denegar  ✅ Permitir
```

---

## 🔄 Ciclo de Vida del Chat

### 1. Inicialización

```
Carga de página
      │
      ↓
¿Datos en localStorage?
      │
  ┌───┴───┐
 NO      SÍ
  │       │
  ↓       ↓
Demo   Inicializar
Data   ChatFirebase
  │       │
  └───┬───┘
      │
      ↓
Crear ChatUI
      │
      ↓
Cargar usuarios
      │
      ↓
Escuchar notificaciones
      │
      ↓
✅ Chat activo
```

### 2. Envío de Mensaje

```
Usuario escribe
      │
      ↓
Presiona Enter/Click
      │
      ↓
Validar mensaje
      │
  ┌───┴───┐
 Vacío   OK
  │       │
  ↓       ↓
Return  Enviar a Firebase
        │
        ↓
    Limpiar input
        │
        ↓
    Crear notificación
        │
        ↓
    ✅ Enviado
```

### 3. Recepción de Mensaje

```
Firebase detecta cambio
      │
      ↓
Trigger onValue
      │
      ↓
Callback con mensajes
      │
      ↓
Renderizar en UI
      │
      ↓
Scroll al final
      │
      ↓
Actualizar badge
      │
      ↓
¿Ventana abierta?
      │
  ┌───┴───┐
 NO      SÍ
  │       │
  ↓       ↓
Notif   Marcar
Browser  leído
  │       │
  └───┬───┘
      │
      ↓
✅ Recibido
```

---

## 🎨 Componentes de UI

### Jerarquía de Componentes

```
ChatUI
├── Botón Flotante
│   └── Badge de notificaciones
│
├── Ventana de Chat
│   ├── Header
│   │   ├── Botón Atrás
│   │   ├── Título
│   │   └── Botón Minimizar
│   │
│   ├── Lista de Conversaciones
│   │   ├── Tabs (Usuarios/Grupo)
│   │   ├── Búsqueda
│   │   └── Lista de Usuarios
│   │       └── Item de Usuario
│   │           ├── Avatar
│   │           ├── Nombre
│   │           ├── Rol
│   │           └── Estado (online/offline)
│   │
│   └── Vista de Conversación
│       ├── Mensajes
│       │   └── Mensaje
│       │       ├── Avatar (opcional)
│       │       ├── Nombre (opcional)
│       │       ├── Texto
│       │       └── Hora
│       │
│       └── Input de Mensaje
│           ├── Campo de texto
│           └── Botón Enviar
```

---

## 🔌 Eventos y Comunicación

### Eventos Personalizados

```javascript
// Evento: Conversación abierta
document.dispatchEvent(new CustomEvent('conversationOpened', {
    detail: { userId, type }
}));

// Evento: Mensaje enviado
document.dispatchEvent(new CustomEvent('messageSent', {
    detail: { message, recipientId, type }
}));
```

### Flujo de Eventos

```
ChatUI                    ChatController              ChatFirebase
  │                            │                          │
  │  conversationOpened        │                          │
  │───────────────────────────>│                          │
  │                            │                          │
  │                            │  listenPrivateMessages   │
  │                            │─────────────────────────>│
  │                            │                          │
  │                            │  onValue callback        │
  │                            │<─────────────────────────│
  │                            │                          │
  │  renderMessages            │                          │
  │<───────────────────────────│                          │
  │                            │                          │
  │  messageSent               │                          │
  │───────────────────────────>│                          │
  │                            │                          │
  │                            │  sendPrivateMessage      │
  │                            │─────────────────────────>│
  │                            │                          │
  │                            │  ✅ Enviado              │
  │                            │<─────────────────────────│
```

---

## 📦 Módulos y Dependencias

### Dependencias entre Módulos

```
chat.js (ChatController)
    │
    ├──> chat-firebase.js (ChatFirebase)
    │       │
    │       └──> firebase-config.js
    │               │
    │               └──> Firebase SDK
    │
    └──> chat-ui.js (ChatUI)
            │
            └──> CSS (style.css)
```

### Exportaciones e Importaciones

```javascript
// firebase-config.js
export { auth, db, realtimeDb }

// chat-firebase.js
import { realtimeDb } from './firebase-config.js'
export { chatFirebase }

// chat-ui.js
export { ChatUI }

// chat.js
import { chatFirebase } from './chat-firebase.js'
import { ChatUI } from './chat-ui.js'
export default chatController
```

---

## 🚀 Optimizaciones

### 1. Lazy Loading
- El chat solo se inicializa cuando hay usuario autenticado
- Los listeners solo se activan cuando se abre una conversación

### 2. Cleanup
- Los listeners se limpian al cambiar de conversación
- Los recursos se liberan al cerrar sesión

### 3. Caching
- Los datos de usuario se guardan en localStorage
- Las conversaciones se mantienen en memoria

### 4. Debouncing
- La búsqueda de usuarios usa debouncing
- Las actualizaciones de estado se agrupan

---

## 📊 Métricas y Monitoreo

### Puntos de Medición

```
1. Tiempo de inicialización del chat
2. Latencia de envío de mensajes
3. Tiempo de renderizado de mensajes
4. Número de conexiones activas
5. Uso de ancho de banda
6. Errores de conexión
```

### Logs Importantes

```javascript
console.log('✅ Firebase inicializado');
console.log('✅ Chat inicializado correctamente');
console.log('✅ Mensaje enviado');
console.error('❌ Error al enviar mensaje:', error);
```

---

## 🔒 Seguridad

### Capas de Seguridad

```
1. Autenticación Firebase
   ↓
2. Reglas de Seguridad Firebase
   ↓
3. Validación de Permisos (ChatFirebase)
   ↓
4. Validación de Datos
   ↓
5. Sanitización de Input (ChatUI)
```

---

**Versión:** 1.0.0  
**Última actualización:** Marzo 2026
