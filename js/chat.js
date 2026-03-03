// chat.js - Controlador principal del chat
import { chatFirebase } from './chat-firebase.js';
import { ChatUI } from './chat-ui.js';

class ChatController {
    constructor() {
        this.ui = null;
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;

        // Obtener datos del usuario actual
        const userData = this.getUserData();
        
        if (!userData) {
            console.warn('⚠️ No hay usuario autenticado para el chat');
            return;
        }

        // Inicializar Firebase
        chatFirebase.initUser(
            userData.userId,
            userData.userName,
            userData.userRole,
            userData.schoolId
        );

        // Inicializar UI
        this.ui = new ChatUI();
        this.ui.requestNotificationPermission();

        // Cargar usuarios del colegio
        this.loadSchoolUsers();

        // Escuchar notificaciones
        this.listenNotifications();

        // Configurar event listeners
        this.setupEventListeners();

        this.initialized = true;
        console.log('✅ Chat inicializado correctamente');
    }

    getUserData() {
        // Intentar obtener datos del usuario desde localStorage
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        const userRole = localStorage.getItem('userRole');
        const schoolId = localStorage.getItem('schoolId');

        // Si no existen, usar datos de demostración
        if (!userId) {
            return {
                userId: 'demo-user-' + Date.now(),
                userName: document.getElementById('userName')?.textContent || 'Usuario Demo',
                userRole: localStorage.getItem('userRole') || 'profesor',
                schoolId: localStorage.getItem('schoolId') || 'colegio-demo'
            };
        }

        return { userId, userName, userRole, schoolId };
    }

    loadSchoolUsers() {
        chatFirebase.getUsersBySchool((users) => {
            // Filtrar usuarios según permisos
            const filteredUsers = users.filter(user => 
                chatFirebase.canChatWith(user.role)
            );
            
            this.ui.renderUsers(filteredUsers);
        });
    }

    listenNotifications() {
        chatFirebase.getUnreadNotifications((count) => {
            this.ui.updateUnreadCount(count);
        });
    }

    setupEventListeners() {
        // Cuando se abre una conversación
        document.addEventListener('conversationOpened', (e) => {
            const { userId, type } = e.detail;
            
            if (type === 'private') {
                this.loadPrivateConversation(userId);
            } else if (type === 'group') {
                this.loadGroupConversation();
            }
        });

        // Cuando se envía un mensaje
        document.addEventListener('messageSent', async (e) => {
            const { message, recipientId, type } = e.detail;
            
            try {
                if (type === 'private') {
                    await chatFirebase.sendPrivateMessage(recipientId, message);
                } else if (type === 'group') {
                    await chatFirebase.sendGroupMessage(message);
                }
            } catch (error) {
                console.error('❌ Error al enviar mensaje:', error);
                alert('Error al enviar el mensaje. Intenta nuevamente.');
            }
        });
    }

    loadPrivateConversation(recipientId) {
        // Limpiar listener anterior si existe
        chatFirebase.cleanup();

        // Escuchar mensajes en tiempo real
        chatFirebase.listenPrivateMessages(recipientId, (messages) => {
            this.ui.renderMessages(messages);
        });

        // Marcar como leído
        const conversationId = chatFirebase.getConversationId(
            chatFirebase.currentUser.id, 
            recipientId
        );
        chatFirebase.markAsRead(conversationId);
    }

    loadGroupConversation() {
        // Limpiar listener anterior si existe
        chatFirebase.cleanup();

        // Escuchar mensajes grupales en tiempo real
        chatFirebase.listenGroupMessages((messages) => {
            this.ui.renderMessages(messages);
        });
    }

    destroy() {
        chatFirebase.cleanup();
        this.initialized = false;
    }
}

// Crear instancia global
const chatController = new ChatController();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        chatController.init();
    });
} else {
    chatController.init();
}

// Exportar para uso manual si es necesario
export default chatController;
