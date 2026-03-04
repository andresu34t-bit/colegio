// chat-firebase.js - Lógica de Firebase para el chat en tiempo real
import { realtimeDb } from './firebase-config.js';
import { 
    ref, 
    push, 
    onValue, 
    set, 
    serverTimestamp,
    query,
    orderByChild,
    equalTo,
    get,
    update,
    onDisconnect
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

class ChatFirebase {
    constructor() {
        this.currentUser = null;
        this.currentSchool = null;
        this.listeners = {};
    }

    // Inicializar usuario actual
    initUser(userId, userName, userRole, schoolId) {
        this.currentUser = {
            id: userId,
            name: userName,
            role: userRole,
            schoolId: schoolId
        };
        this.currentSchool = schoolId;
        this.setUserOnline();
    }

    // Marcar usuario como conectado
    async setUserOnline() {
        if (!this.currentUser) return;
        
        const userStatusRef = ref(realtimeDb, `users/${this.currentUser.id}/status`);
        const userDataRef = ref(realtimeDb, `users/${this.currentUser.id}`);
        
        // Actualizar datos del usuario
        await set(userDataRef, {
            name: this.currentUser.name,
            role: this.currentUser.role,
            schoolId: this.currentSchool,
            online: true,
            lastSeen: serverTimestamp()
        });

        // Configurar desconexión automática
        onDisconnect(userStatusRef).set({
            online: false,
            lastSeen: serverTimestamp()
        });
    }

    // Obtener usuarios del mismo colegio
    async getUsersBySchool(callback) {
        const usersRef = ref(realtimeDb, 'users');
        const schoolQuery = query(usersRef, orderByChild('schoolId'), equalTo(this.currentSchool));
        
        onValue(schoolQuery, (snapshot) => {
            const users = [];
            snapshot.forEach((childSnapshot) => {
                const user = childSnapshot.val();
                if (childSnapshot.key !== this.currentUser.id) {
                    users.push({
                        id: childSnapshot.key,
                        ...user
                    });
                }
            });
            callback(users);
        });
    }

    // Enviar mensaje privado
    async sendPrivateMessage(recipientId, message) {
        const conversationId = this.getConversationId(this.currentUser.id, recipientId);
        const messagesRef = ref(realtimeDb, `conversations/${conversationId}/messages`);
        
        const newMessage = {
            senderId: this.currentUser.id,
            senderName: this.currentUser.name,
            recipientId: recipientId,
            message: message,
            timestamp: serverTimestamp(),
            read: false
        };

        await push(messagesRef, newMessage);

        // Actualizar metadata de la conversación
        const conversationRef = ref(realtimeDb, `conversations/${conversationId}`);
        await update(conversationRef, {
            lastMessage: message,
            lastMessageTime: serverTimestamp(),
            participants: {
                [this.currentUser.id]: true,
                [recipientId]: true
            }
        });

        // Crear notificación
        await this.createNotification(recipientId, message);
    }

    // Enviar mensaje grupal (todo el colegio)
    async sendGroupMessage(message) {
        const groupRef = ref(realtimeDb, `groups/${this.currentSchool}/messages`);
        
        const newMessage = {
            senderId: this.currentUser.id,
            senderName: this.currentUser.name,
            senderRole: this.currentUser.role,
            message: message,
            timestamp: serverTimestamp()
        };

        await push(groupRef, newMessage);

        // Actualizar metadata del grupo
        const groupMetaRef = ref(realtimeDb, `groups/${this.currentSchool}`);
        await update(groupMetaRef, {
            lastMessage: message,
            lastMessageTime: serverTimestamp(),
            schoolId: this.currentSchool
        });
    }

    // Escuchar mensajes privados
    listenPrivateMessages(recipientId, callback) {
        const conversationId = this.getConversationId(this.currentUser.id, recipientId);
        const messagesRef = ref(realtimeDb, `conversations/${conversationId}/messages`);
        
        const listener = onValue(messagesRef, (snapshot) => {
            const messages = [];
            snapshot.forEach((childSnapshot) => {
                messages.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            callback(messages);
        });

        this.listeners[conversationId] = listener;
    }

    // Escuchar mensajes grupales
    listenGroupMessages(callback) {
        const groupRef = ref(realtimeDb, `groups/${this.currentSchool}/messages`);
        
        const listener = onValue(groupRef, (snapshot) => {
            const messages = [];
            snapshot.forEach((childSnapshot) => {
                messages.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            callback(messages);
        });

        this.listeners[`group_${this.currentSchool}`] = listener;
    }

    // Marcar mensajes como leídos
    async markAsRead(conversationId) {
        const messagesRef = ref(realtimeDb, `conversations/${conversationId}/messages`);
        const snapshot = await get(messagesRef);
        
        const updates = {};
        snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val();
            if (message.recipientId === this.currentUser.id && !message.read) {
                updates[`${childSnapshot.key}/read`] = true;
            }
        });

        if (Object.keys(updates).length > 0) {
            await update(messagesRef, updates);
        }
    }

    // Crear notificación
    async createNotification(recipientId, message) {
        const notificationRef = ref(realtimeDb, `notifications/${recipientId}`);
        await push(notificationRef, {
            from: this.currentUser.name,
            message: message.substring(0, 50),
            timestamp: serverTimestamp(),
            read: false
        });
    }

    // Obtener notificaciones no leídas
    async getUnreadNotifications(callback) {
        const notificationsRef = ref(realtimeDb, `notifications/${this.currentUser.id}`);
        
        onValue(notificationsRef, (snapshot) => {
            let unreadCount = 0;
            snapshot.forEach((childSnapshot) => {
                const notification = childSnapshot.val();
                if (!notification.read) {
                    unreadCount++;
                }
            });
            callback(unreadCount);
        });
    }

    // Generar ID único para conversación
    getConversationId(userId1, userId2) {
        return [userId1, userId2].sort().join('_');
    }

    // Verificar permisos de chat
    canChatWith(targetRole) {
        const role = this.currentUser.role;
        
        // Técnico puede responder a todos
        if (role === 'tecnico') {
            return true;
        }
        
        // Director y Administrador pueden hablar con todos
        if (role === 'director' || role === 'administrador') {
            return true;
        }
        
        // Profesor puede hablar con director, administrador, técnico y otros profesores
        if (role === 'profesor') {
            return ['director', 'administrador', 'profesor', 'tecnico'].includes(targetRole);
        }
        
        return false;
    }

    // Limpiar listeners
    cleanup() {
        Object.values(this.listeners).forEach(listener => {
            if (typeof listener === 'function') {
                listener();
            }
        });
        this.listeners = {};
    }
}

// Exportar instancia única
export const chatFirebase = new ChatFirebase();
