# 💬 Chat en Tiempo Real - Preguntas Frecuentes (FAQ)

## 📋 General

### ¿Qué es el módulo de chat?
Es un sistema de mensajería en tiempo real integrado en EDUGEST que permite comunicación instantánea entre Director, Administrador y Profesores del mismo colegio.

### ¿Necesito instalar algo adicional?
No. El chat usa Firebase Realtime Database que ya está incluido en tu proyecto Firebase. Solo necesitas habilitarlo en la consola.

### ¿Tiene costo?
No. Firebase ofrece un plan gratuito generoso que incluye:
- 1 GB de almacenamiento
- 10 GB de transferencia mensual
- 100,000 conexiones simultáneas

Para un colegio típico, esto es más que suficiente.

---

## 🔧 Configuración

### ¿Cómo habilito el chat?
1. Ve a Firebase Console
2. Habilita Realtime Database
3. Agrega la URL en `firebase-config.js`
4. Configura las reglas de seguridad

Ver `CHAT-QUICKSTART.md` para pasos detallados.

### ¿Dónde encuentro la URL de Realtime Database?
En Firebase Console → Realtime Database → Datos. La URL aparece en la parte superior, algo como:
```
https://edugest-pme-default-rtdb.firebaseio.com
```

### ¿Qué son las reglas de seguridad?
Son reglas que controlan quién puede leer y escribir datos en Firebase. Las reglas del chat aseguran que:
- Solo usuarios autenticados puedan acceder
- Los usuarios solo vean conversaciones en las que participan
- Los mensajes solo puedan ser enviados por el usuario autenticado

---

## 👥 Usuarios y Permisos

### ¿Quién puede usar el chat?
Todos los usuarios autenticados: Director, Administrador y Profesores.

### ¿Qué permisos tiene cada rol?

| Rol | Puede chatear con |
|-----|-------------------|
| Director | Todos |
| Administrador | Todos |
| Profesor | Director, Administrador, otros Profesores |

### ¿Pueden los profesores chatear entre ellos?
Sí, los profesores pueden chatear con otros profesores del mismo colegio.

### ¿Pueden usuarios de diferentes colegios chatear?
No. Cada colegio tiene su propio espacio de chat independiente. Los usuarios solo ven y pueden chatear con personas de su mismo colegio.

### ¿Cómo se determina el colegio de un usuario?
Por el campo `schoolId` guardado en localStorage. Todos los usuarios del mismo colegio deben tener el mismo `schoolId`.

---

## 💬 Funcionalidades

### ¿Qué tipos de chat hay?
1. **Chat Privado (1 a 1)**: Conversaciones directas entre dos usuarios
2. **Chat Grupal**: Conversación con todos los usuarios del colegio

### ¿Los mensajes se guardan?
Sí, todos los mensajes se guardan en Firebase Realtime Database y se pueden consultar en cualquier momento.

### ¿Hay notificaciones?
Sí, el chat incluye:
- Badge con número de mensajes no leídos
- Notificaciones del navegador (si el usuario da permiso)
- Indicador visual de mensajes nuevos

### ¿Puedo enviar archivos o imágenes?
No en la versión actual. Solo mensajes de texto. Esta funcionalidad está planificada para futuras versiones.

### ¿Hay límite de caracteres por mensaje?
Sí, 1000 caracteres por mensaje (aproximadamente 150-200 palabras).

### ¿Puedo eliminar mensajes?
No en la versión actual. Los mensajes son permanentes una vez enviados.

---

## 🎨 Interfaz

### ¿Dónde aparece el botón del chat?
En la esquina inferior derecha de todas las páginas del sistema.

### ¿Puedo cambiar la posición del botón?
Sí, editando el CSS en `css/style.css`. Busca `.chat-floating-btn` y modifica las propiedades `bottom` y `right`.

### ¿Puedo personalizar los colores?
Sí, todos los colores están definidos en variables CSS en `css/style.css`. Puedes modificar:
- Color del botón flotante
- Color de los mensajes
- Color del header
- Etc.

### ¿El chat es responsive?
Sí, el chat se adapta automáticamente a:
- Desktop (ventana de 380px x 600px)
- Tablet (ventana adaptativa)
- Mobile (ventana de pantalla completa)

---

## 🔍 Estado y Presencia

### ¿Cómo funciona el estado online/offline?
Firebase detecta automáticamente cuando un usuario se conecta o desconecta. El estado se actualiza en tiempo real.

### ¿Qué pasa si pierdo la conexión?
Firebase maneja automáticamente las desconexiones:
- Los mensajes se envían cuando recuperas la conexión
- Tu estado cambia a "offline"
- Los listeners se reconectan automáticamente

### ¿Puedo ver cuándo fue la última vez que un usuario estuvo online?
Sí, el campo `lastSeen` guarda el timestamp de la última actividad del usuario.

---

## 🐛 Problemas Comunes

### El botón del chat no aparece
**Posibles causas:**
1. Firebase Realtime Database no está habilitado
2. La URL no está en `firebase-config.js`
3. Los scripts no están incluidos en el HTML
4. Hay errores en la consola del navegador

**Solución:**
1. Verifica que Realtime Database esté habilitado en Firebase Console
2. Confirma que `databaseURL` esté en `firebase-config.js`
3. Revisa la consola del navegador (F12) para errores

### No veo otros usuarios en la lista
**Posibles causas:**
1. Los usuarios tienen diferentes `schoolId`
2. Los usuarios no están registrados en Firebase
3. Problemas con las reglas de seguridad

**Solución:**
1. Verifica que todos los usuarios tengan el mismo `schoolId`
2. Confirma que los usuarios existan en Firebase Realtime Database
3. Revisa las reglas de seguridad en Firebase Console

### Los mensajes no se envían
**Posibles causas:**
1. No hay conexión a Firebase
2. Las reglas de seguridad bloquean la escritura
3. El usuario no tiene permisos según su rol

**Solución:**
1. Verifica la conexión a internet
2. Revisa las reglas de seguridad
3. Confirma que el usuario tenga permisos para chatear con el destinatario

### Los mensajes no aparecen en tiempo real
**Posibles causas:**
1. Los listeners no están configurados correctamente
2. Hay problemas de conexión
3. El navegador está bloqueando WebSockets

**Solución:**
1. Recarga la página
2. Verifica la conexión a internet
3. Prueba en otro navegador

### El badge de notificaciones no se actualiza
**Posibles causas:**
1. Los listeners de notificaciones no están activos
2. Hay errores en la consola

**Solución:**
1. Recarga la página
2. Revisa la consola del navegador para errores

---

## 🔐 Seguridad

### ¿Es seguro el chat?
Sí, el chat implementa múltiples capas de seguridad:
- Autenticación requerida para acceder
- Reglas de seguridad en Firebase
- Validación de permisos por rol
- Aislamiento por colegio

### ¿Pueden los usuarios ver mensajes de otros colegios?
No. Las reglas de seguridad y la lógica del chat aseguran que cada colegio esté completamente aislado.

### ¿Pueden los profesores ver mensajes entre directores?
No. Solo pueden ver conversaciones en las que participan directamente.

### ¿Los mensajes están encriptados?
Firebase usa HTTPS para todas las comunicaciones, lo que encripta los datos en tránsito. Los datos en reposo también están encriptados por Firebase.

---

## 📊 Rendimiento

### ¿Cuántos usuarios pueden chatear simultáneamente?
El plan gratuito de Firebase soporta hasta 100,000 conexiones simultáneas, más que suficiente para cualquier colegio.

### ¿Hay límite de mensajes?
No hay límite en el número de mensajes, pero hay límites en:
- Almacenamiento: 1 GB (plan gratuito)
- Transferencia: 10 GB/mes (plan gratuito)

### ¿El chat afecta el rendimiento del sistema?
No. El chat está optimizado para:
- Carga bajo demanda (solo se activa cuando se usa)
- Listeners eficientes
- Mínimo impacto en el DOM

---

## 🔄 Integración

### ¿Cómo integro el chat con mi sistema de login?
Después del login exitoso, guarda estos datos en localStorage:
```javascript
localStorage.setItem('userId', user.uid);
localStorage.setItem('userName', 'Juan Pérez');
localStorage.setItem('userRole', 'profesor');
localStorage.setItem('schoolId', 'colegio-123');
```

Ver `js/chat-init-example.js` para ejemplos completos.

### ¿Puedo usar el chat en páginas personalizadas?
Sí, solo incluye los scripts en tu HTML:
```html
<script src="js/chat-firebase.js"></script>
<script src="js/chat-ui.js"></script>
<script src="js/chat.js"></script>
```

### ¿Puedo controlar el chat programáticamente?
Sí, el chat expone una API completa. Ver `js/chat-examples.js` para ejemplos de uso.

---

## 🚀 Desarrollo

### ¿Cómo pruebo el chat localmente?
1. Abre `test-chat.html`
2. Configura un usuario
3. Abre la misma página en otra pestaña con otro usuario
4. Chatea entre ambos

### ¿Puedo modificar el código del chat?
Sí, el código está completamente disponible en:
- `js/chat-firebase.js` - Lógica de Firebase
- `js/chat-ui.js` - Interfaz de usuario
- `js/chat.js` - Controlador principal
- `css/style.css` - Estilos

### ¿Hay documentación de la API?
Sí, ver:
- `CHAT-SETUP.md` - Documentación completa
- `js/chat-examples.js` - Ejemplos de uso
- Comentarios en el código fuente

---

## 📈 Futuras Mejoras

### ¿Qué funcionalidades están planificadas?
- Envío de archivos e imágenes
- Mensajes de voz
- Reacciones a mensajes (emojis)
- Búsqueda en historial
- Mensajes destacados
- Indicador de "escribiendo..."
- Confirmación de lectura (doble check)

### ¿Puedo sugerir nuevas funcionalidades?
Sí, contacta al equipo de desarrollo con tus sugerencias.

---

## 📞 Soporte

### ¿Dónde obtengo ayuda?
1. Consulta esta FAQ
2. Lee `CHAT-SETUP.md` para documentación completa
3. Revisa `CHAT-QUICKSTART.md` para inicio rápido
4. Contacta al equipo de desarrollo

### ¿Cómo reporto un bug?
Contacta al equipo de desarrollo con:
- Descripción del problema
- Pasos para reproducirlo
- Capturas de pantalla (si aplica)
- Mensajes de error de la consola

---

**Última actualización:** Marzo 2026  
**Versión del chat:** 1.0.0
