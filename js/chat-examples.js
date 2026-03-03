// chat-examples.js - Ejemplos de uso del módulo de chat
// Este archivo contiene ejemplos de cómo usar el chat programáticamente

import { chatFirebase } from './chat-firebase.js';
import { ChatUI } from './chat-ui.js';

/**
 * EJEMPLO 1: Inicializar el chat manualmente
 */
function ejemplo1_inicializarChat() {
    // Datos del usuario actual
    const userId = 'user-123';
    const userName = 'Juan Pérez';
    const userRole = 'profesor';
    const schoolId = 'colegio-demo';
    
    // Inicializar Firebase Chat
    chatFirebase.initUser(userId, userName, userRole, schoolId);
    
    // Crear interfaz
    const chatUI = new ChatUI();
    
    console.log('✅ Chat inicializado');
}

/**
 * EJEMPLO 2: Enviar mensaje privado programáticamente
 */
async function ejemplo2_enviarMensajePrivado() {
    const recipientId = 'user-456';
    const message = 'Hola, ¿cómo estás?';
    
    try {
        await chatFirebase.sendPrivateMessage(recipientId, message);
        console.log('✅ Mensaje enviado');
    } catch (error) {
        console.error('❌ Error al enviar mensaje:', error);
    }
}

/**
 * EJEMPLO 3: Enviar mensaje grupal
 */
async function ejemplo3_enviarMensajeGrupal() {
    const message = 'Reunión mañana a las 10:00 AM';
    
    try {
        await chatFirebase.sendGroupMessage(message);
        console.log('✅ Mensaje grupal enviado');
    } catch (error) {
        console.error('❌ Error al enviar mensaje grupal:', error);
    }
}

/**
 * EJEMPLO 4: Escuchar mensajes en tiempo real
 */
function ejemplo4_escucharMensajes() {
    const recipientId = 'user-456';
    
    chatFirebase.listenPrivateMessages(recipientId, (messages) => {
        console.log('📨 Mensajes recibidos:', messages);
        
        // Procesar mensajes
        messages.forEach(msg => {
            console.log(`${msg.senderName}: ${msg.message}`);
        });
    });
}

/**
 * EJEMPLO 5: Obtener usuarios del colegio
 */
function ejemplo5_obtenerUsuarios() {
    chatFirebase.getUsersBySchool((users) => {
        console.log('👥 Usuarios del colegio:', users);
        
        users.forEach(user => {
            console.log(`- ${user.name} (${user.role}) - ${user.online ? 'Online' : 'Offline'}`);
        });
    });
}

/**
 * EJEMPLO 6: Verificar permisos de chat
 */
function ejemplo6_verificarPermisos() {
    // Verificar si el usuario actual puede chatear con un profesor
    const canChat = chatFirebase.canChatWith('profesor');
    console.log('¿Puede chatear con profesor?', canChat);
    
    // Verificar con director
    const canChatDirector = chatFirebase.canChatWith('director');
    console.log('¿Puede chatear con director?', canChatDirector);
}

/**
 * EJEMPLO 7: Marcar mensajes como leídos
 */
async function ejemplo7_marcarComoLeido() {
    const recipientId = 'user-456';
    const conversationId = chatFirebase.getConversationId(
        chatFirebase.currentUser.id,
        recipientId
    );
    
    try {
        await chatFirebase.markAsRead(conversationId);
        console.log('✅ Mensajes marcados como leídos');
    } catch (error) {
        console.error('❌ Error al marcar como leído:', error);
    }
}

/**
 * EJEMPLO 8: Obtener notificaciones no leídas
 */
function ejemplo8_obtenerNotificaciones() {
    chatFirebase.getUnreadNotifications((count) => {
        console.log(`🔔 Tienes ${count} notificaciones no leídas`);
    });
}

/**
 * EJEMPLO 9: Abrir chat programáticamente
 */
function ejemplo9_abrirChat() {
    // Obtener instancia de ChatUI (si ya existe)
    const chatUI = new ChatUI();
    
    // Abrir ventana de chat
    chatUI.openChat();
    
    // Abrir conversación específica
    const userId = 'user-456';
    const userName = 'María González';
    chatUI.showConversationView(userName, userId, 'private');
}

/**
 * EJEMPLO 10: Escuchar eventos personalizados del chat
 */
function ejemplo10_escucharEventos() {
    // Cuando se abre una conversación
    document.addEventListener('conversationOpened', (e) => {
        const { userId, type } = e.detail;
        console.log(`📱 Conversación abierta con ${userId} (${type})`);
    });
    
    // Cuando se envía un mensaje
    document.addEventListener('messageSent', (e) => {
        const { message, recipientId, type } = e.detail;
        console.log(`📤 Mensaje enviado: "${message}" a ${recipientId}`);
    });
}

/**
 * EJEMPLO 11: Actualizar contador de mensajes no leídos
 */
function ejemplo11_actualizarContador() {
    const chatUI = new ChatUI();
    
    // Actualizar badge con número de mensajes
    chatUI.updateUnreadCount(5);
}

/**
 * EJEMPLO 12: Mostrar notificación del navegador
 */
function ejemplo12_mostrarNotificacion() {
    const chatUI = new ChatUI();
    
    // Solicitar permiso (solo la primera vez)
    chatUI.requestNotificationPermission();
    
    // Mostrar notificación
    chatUI.showNotification(
        'Nuevo mensaje de María González',
        'Hola, ¿tienes un momento?'
    );
}

/**
 * EJEMPLO 13: Filtrar usuarios en la lista
 */
function ejemplo13_filtrarUsuarios() {
    const chatUI = new ChatUI();
    
    // Filtrar usuarios por nombre
    chatUI.filterUsers('juan');
}

/**
 * EJEMPLO 14: Renderizar lista de usuarios personalizada
 */
function ejemplo14_renderizarUsuarios() {
    const chatUI = new ChatUI();
    
    const users = [
        { id: 'user-1', name: 'Juan Pérez', role: 'profesor', online: true },
        { id: 'user-2', name: 'María González', role: 'director', online: false },
        { id: 'user-3', name: 'Carlos Ruiz', role: 'administrador', online: true }
    ];
    
    chatUI.renderUsers(users);
}

/**
 * EJEMPLO 15: Renderizar mensajes personalizados
 */
function ejemplo15_renderizarMensajes() {
    const chatUI = new ChatUI();
    
    const messages = [
        {
            id: 'msg-1',
            senderId: 'user-1',
            senderName: 'Juan Pérez',
            message: 'Hola, ¿cómo estás?',
            timestamp: Date.now() - 60000
        },
        {
            id: 'msg-2',
            senderId: 'current-user',
            senderName: 'Yo',
            message: 'Muy bien, gracias',
            timestamp: Date.now()
        }
    ];
    
    chatUI.renderMessages(messages);
}

/**
 * EJEMPLO 16: Limpiar listeners al salir
 */
function ejemplo16_limpiarListeners() {
    // Importante: llamar esto cuando el usuario cierre sesión
    // o cuando se desmonte el componente
    chatFirebase.cleanup();
    console.log('✅ Listeners limpiados');
}

/**
 * EJEMPLO 17: Integración completa con sistema de login
 */
async function ejemplo17_integracionCompleta() {
    // 1. Usuario inicia sesión
    const user = {
        uid: 'user-123',
        nombre: 'Juan Pérez',
        rol: 'profesor',
        colegioId: 'colegio-demo'
    };
    
    // 2. Guardar en localStorage
    localStorage.setItem('userId', user.uid);
    localStorage.setItem('userName', user.nombre);
    localStorage.setItem('userRole', user.rol);
    localStorage.setItem('schoolId', user.colegioId);
    
    // 3. Inicializar chat
    chatFirebase.initUser(user.uid, user.nombre, user.rol, user.colegioId);
    
    // 4. Crear UI
    const chatUI = new ChatUI();
    
    // 5. Cargar usuarios
    chatFirebase.getUsersBySchool((users) => {
        chatUI.renderUsers(users);
    });
    
    // 6. Escuchar notificaciones
    chatFirebase.getUnreadNotifications((count) => {
        chatUI.updateUnreadCount(count);
    });
    
    console.log('✅ Chat completamente integrado');
}

/**
 * EJEMPLO 18: Manejo de errores
 */
async function ejemplo18_manejoErrores() {
    try {
        // Intentar enviar mensaje
        await chatFirebase.sendPrivateMessage('user-456', 'Hola');
        console.log('✅ Mensaje enviado');
    } catch (error) {
        // Manejar diferentes tipos de errores
        if (error.code === 'permission-denied') {
            console.error('❌ No tienes permiso para enviar este mensaje');
        } else if (error.code === 'network-error') {
            console.error('❌ Error de conexión. Verifica tu internet');
        } else {
            console.error('❌ Error desconocido:', error);
        }
    }
}

/**
 * EJEMPLO 19: Chat con múltiples colegios
 */
function ejemplo19_multipleColegios() {
    // Usuario 1 - Colegio A
    chatFirebase.initUser('user-1', 'Juan', 'profesor', 'colegio-a');
    
    // Usuario 2 - Colegio B (no verá a Usuario 1)
    // chatFirebase.initUser('user-2', 'María', 'profesor', 'colegio-b');
    
    // Solo verán usuarios de su mismo colegio
    chatFirebase.getUsersBySchool((users) => {
        console.log('Usuarios del mismo colegio:', users);
    });
}

/**
 * EJEMPLO 20: Personalizar UI del chat
 */
function ejemplo20_personalizarUI() {
    // Cambiar colores del botón flotante
    const floatingBtn = document.getElementById('chatFloatingBtn');
    if (floatingBtn) {
        floatingBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    }
    
    // Cambiar título del chat
    const chatTitle = document.getElementById('chatTitle');
    if (chatTitle) {
        chatTitle.textContent = 'Chat Interno';
    }
    
    // Personalizar placeholder del input
    const messageInput = document.getElementById('chatMessageInput');
    if (messageInput) {
        messageInput.placeholder = 'Escribe tu mensaje aquí...';
    }
}

// Exportar ejemplos para uso en consola
export {
    ejemplo1_inicializarChat,
    ejemplo2_enviarMensajePrivado,
    ejemplo3_enviarMensajeGrupal,
    ejemplo4_escucharMensajes,
    ejemplo5_obtenerUsuarios,
    ejemplo6_verificarPermisos,
    ejemplo7_marcarComoLeido,
    ejemplo8_obtenerNotificaciones,
    ejemplo9_abrirChat,
    ejemplo10_escucharEventos,
    ejemplo11_actualizarContador,
    ejemplo12_mostrarNotificacion,
    ejemplo13_filtrarUsuarios,
    ejemplo14_renderizarUsuarios,
    ejemplo15_renderizarMensajes,
    ejemplo16_limpiarListeners,
    ejemplo17_integracionCompleta,
    ejemplo18_manejoErrores,
    ejemplo19_multipleColegios,
    ejemplo20_personalizarUI
};

// Para probar en la consola del navegador:
// import * as ejemplos from './js/chat-examples.js';
// ejemplos.ejemplo1_inicializarChat();
