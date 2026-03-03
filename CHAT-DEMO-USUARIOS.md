# 👥 Chat con Usuarios de Demostración

## 🎉 ¡El Chat está Listo para Probar!

El dashboard ahora incluye 8 usuarios de demostración para que puedas probar el chat sin necesidad de configurar Firebase.

---

## 👥 Usuarios de Demostración

### Lista de Usuarios

1. **María González** - Director ● Online
2. **Juan Pérez** - Profesor ● Online
3. **Ana Martínez** - Administrador ○ Offline
4. **Carlos López** - Profesor ● Online
5. **Laura Rodríguez** - Profesor ○ Offline
6. **Pedro Sánchez** - Profesor ● Online
7. **Carmen Díaz** - Administrador ● Online
8. **Roberto Torres** - Profesor ○ Offline

---

## 💬 Mensajes de Demostración

Cada usuario tiene conversaciones de ejemplo con diferentes contextos:

### María González (Director)
```
María: ¡Hola! ¿Cómo va el proyecto PME?
Tú: Muy bien, estamos avanzando según lo planificado
María: Excelente, necesito que me envíes el informe de esta semana
Tú: Claro, te lo envío en la tarde
```

### Juan Pérez (Profesor)
```
Juan: Hola, ¿tienes los materiales para la clase de mañana?
Tú: Sí, ya están listos en la sala de profesores
Juan: Perfecto, gracias!
```

### Ana Martínez (Administrador)
```
Tú: Ana, necesito ayuda con el sistema de registro
Ana: Claro, ¿qué necesitas?
Tú: No puedo acceder al módulo de finanzas
Ana: Déjame revisar tus permisos
```

### Carlos López (Profesor)
```
Carlos: ¿Vamos a tener reunión esta semana?
Tú: Sí, el miércoles a las 15:00
```

### Y más conversaciones con los demás usuarios...

---

## 🏫 Chat Grupal de Demostración

El chat grupal incluye 11 mensajes de ejemplo:

```
María González: Buenos días a todos! Recordatorio de la reunión de hoy a las 15:00
Juan Pérez: Gracias María, ahí estaré
Carlos López: Confirmado!
Carmen Díaz: Les recuerdo que deben subir las planificaciones antes del viernes
Pedro Sánchez: Ya subí la mía
Tú: Yo también ya la subí
María González: Excelente trabajo equipo! 👏
Ana Martínez: ¿Alguien necesita ayuda con el sistema?
Juan Pérez: Todo bien por aquí, gracias Ana
Carlos López: Yo tengo una duda sobre el módulo de observaciones
Ana Martínez: Claro Carlos, te escribo por privado
```

---

## 🚀 Cómo Probar el Chat

### Paso 1: Abrir el Dashboard

```bash
# Abre en tu navegador
dashboard.html
```

### Paso 2: Ver la Lista de Usuarios

Desplázate hacia abajo hasta la sección **"💬 Chat del Colegio"**

Verás la lista de 8 usuarios en el sidebar izquierdo.

### Paso 3: Abrir una Conversación

1. Click en cualquier usuario de la lista
2. Se abrirá la conversación con mensajes de ejemplo
3. Verás el historial de mensajes

### Paso 4: Enviar un Mensaje

1. Escribe tu mensaje en el campo de texto
2. Presiona Enter o click en "Enviar 📤"
3. Tu mensaje aparecerá en la conversación
4. **¡Recibirás una respuesta automática después de 2 segundos!**

### Paso 5: Probar el Chat Grupal

1. Click en la pestaña **"🏫 Grupo"**
2. Verás los mensajes del grupo del colegio
3. Puedes enviar mensajes al grupo

### Paso 6: Buscar Usuarios

1. Usa el campo de búsqueda 🔍
2. Escribe el nombre de un usuario
3. La lista se filtrará automáticamente

---

## ✨ Características de la Demo

### Respuestas Automáticas

Cuando envías un mensaje a un usuario, recibirás una respuesta automática después de 2 segundos con uno de estos mensajes:

- "¡Perfecto! Gracias por la información"
- "Entendido, lo revisaré"
- "Excelente, nos vemos entonces"
- "De acuerdo, cualquier cosa te aviso"
- "Gracias! 👍"

### Estado Online/Offline

Los usuarios tienen estados realistas:

- **● Online** (verde): María, Juan, Carlos, Pedro, Carmen
- **○ Offline** (gris): Ana, Laura, Roberto

### Roles Diferenciados

- **Director**: María González
- **Administrador**: Ana Martínez, Carmen Díaz
- **Profesor**: Juan, Carlos, Laura, Pedro, Roberto

---

## 🎨 Interfaz del Chat

### Sidebar (Izquierda)

```
┌─────────────────────┐
│ 💬 Mensajes         │
├─────────────────────┤
│ 👥 Usuarios │ 🏫    │
├─────────────────────┤
│ 🔍 Buscar usuario...│
├─────────────────────┤
│ M  María González   │
│    Director      ●  │
├─────────────────────┤
│ J  Juan Pérez       │
│    Profesor      ●  │
├─────────────────────┤
│ A  Ana Martínez     │
│    Administrador ○  │
└─────────────────────┘
```

### Área de Conversación (Derecha)

```
┌─────────────────────────────────┐
│ M  María González               │
│    Director              ← Volver│
├─────────────────────────────────┤
│                                 │
│  María: ¡Hola! ¿Cómo va...     │
│                                 │
│         Muy bien, estamos... Tú│
│                                 │
│  María: Excelente, necesito... │
│                                 │
├─────────────────────────────────┤
│ Escribe un mensaje... Enviar 📤│
└─────────────────────────────────┘
```

---

## 💡 Funcionalidades Interactivas

### 1. Click en Usuario
- Abre la conversación
- Muestra mensajes de ejemplo
- Cambia el header con avatar y nombre

### 2. Enviar Mensaje
- Escribe y presiona Enter
- O click en "Enviar 📤"
- Tu mensaje aparece a la derecha
- Respuesta automática en 2 segundos

### 3. Búsqueda
- Filtra usuarios en tiempo real
- Busca por nombre
- Muestra/oculta usuarios según búsqueda

### 4. Chat Grupal
- Click en "🏫 Grupo"
- Muestra mensajes del grupo
- Todos los usuarios participan

### 5. Volver
- Click en "← Volver"
- Regresa a la lista de usuarios
- Cierra la conversación actual

---

## 🔄 Transición a Firebase

### Modo Demo (Actual)

- ✅ 8 usuarios de demostración
- ✅ Mensajes de ejemplo
- ✅ Respuestas automáticas
- ✅ Chat grupal simulado
- ✅ Funciona sin configuración

### Modo Firebase (Después de configurar)

Cuando configures Firebase:

1. Los usuarios reales reemplazarán a los de demo
2. Los mensajes se guardarán en la base de datos
3. Las respuestas serán de usuarios reales
4. El chat grupal será en tiempo real
5. Todo funcionará igual, pero con datos reales

**El código detecta automáticamente si Firebase está configurado y cambia de modo.**

---

## 🎯 Casos de Uso de la Demo

### Para Desarrolladores

```javascript
// El código detecta si hay Firebase
if (!chatFirebase.currentUser) {
    // Mostrar usuarios demo
    const usuariosDemo = [...];
    renderizarListaUsuarios(usuariosDemo);
}
```

### Para Usuarios Finales

1. **Ver la interfaz** sin configurar nada
2. **Probar funcionalidades** antes de implementar
3. **Capacitar usuarios** con datos de ejemplo
4. **Demostrar el sistema** a directivos

### Para Testing

1. **Probar la UI** sin backend
2. **Verificar responsive** design
3. **Testear interacciones** de usuario
4. **Validar flujos** de conversación

---

## 📊 Datos de la Demo

### Usuarios

```javascript
const usuariosDemo = [
    { id: 'demo-1', name: 'María González', role: 'director', online: true },
    { id: 'demo-2', name: 'Juan Pérez', role: 'profesor', online: true },
    { id: 'demo-3', name: 'Ana Martínez', role: 'administrador', online: false },
    { id: 'demo-4', name: 'Carlos López', role: 'profesor', online: true },
    { id: 'demo-5', name: 'Laura Rodríguez', role: 'profesor', online: false },
    { id: 'demo-6', name: 'Pedro Sánchez', role: 'profesor', online: true },
    { id: 'demo-7', name: 'Carmen Díaz', role: 'administrador', online: true },
    { id: 'demo-8', name: 'Roberto Torres', role: 'profesor', online: false }
];
```

### Mensajes por Usuario

Cada usuario tiene entre 2 y 4 mensajes de ejemplo con contextos realistas relacionados con la gestión escolar.

### Mensajes Grupales

11 mensajes que simulan una conversación grupal típica de un colegio.

---

## 🎨 Personalización

### Agregar Más Usuarios Demo

Edita `dashboard.html` y agrega usuarios al array:

```javascript
const usuariosDemo = [
    // ... usuarios existentes
    { id: 'demo-9', name: 'Nuevo Usuario', role: 'profesor', online: true }
];
```

### Cambiar Mensajes Demo

Edita la función `generarMensajesDemo()`:

```javascript
'demo-1': [
    { id: '1', senderId: userId, senderName: userName, 
      message: 'Tu mensaje personalizado', timestamp: now - 3600000 }
]
```

### Modificar Respuestas Automáticas

Edita el array de respuestas:

```javascript
const respuestas = [
    'Tu respuesta personalizada 1',
    'Tu respuesta personalizada 2',
    // ...
];
```

---

## 🐛 Solución de Problemas

### No veo los usuarios

**Causa:** El JavaScript no se cargó correctamente

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Recarga la página (Ctrl + F5)

### Los mensajes no aparecen

**Causa:** No se ejecutó la función de mensajes demo

**Solución:**
1. Verifica que el usuario tenga ID que empiece con "demo-"
2. Revisa la consola para errores
3. Intenta con otro usuario

### No puedo enviar mensajes

**Causa:** El input está deshabilitado o hay un error

**Solución:**
1. Verifica que hayas abierto una conversación
2. Asegúrate de que el campo no esté vacío
3. Revisa la consola del navegador

---

## 📚 Archivos Relacionados

### Código
- `dashboard.html` - Dashboard con chat y usuarios demo

### Documentación
- `CHAT-INICIO.md` - Guía de inicio del chat
- `CHAT-DASHBOARD-INTEGRADO.md` - Chat integrado en dashboard
- `LEEME-PRIMERO.md` - Guía rápida

---

## 🎉 Conclusión

El chat ahora incluye 8 usuarios de demostración con mensajes de ejemplo para que puedas:

✅ **Probar la interfaz** sin configurar Firebase  
✅ **Ver conversaciones** realistas  
✅ **Enviar mensajes** y recibir respuestas automáticas  
✅ **Explorar funcionalidades** del chat grupal  
✅ **Capacitar usuarios** con datos de ejemplo  
✅ **Demostrar el sistema** a directivos  

**¡Abre `dashboard.html` y prueba el chat ahora mismo!** 💬🚀

---

**Versión:** 1.0.0  
**Fecha:** Marzo 2026  
**Estado:** ✅ Listo para Probar  
**Ubicación:** `dashboard.html`
