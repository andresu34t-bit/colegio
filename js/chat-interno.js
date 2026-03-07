// Chat Interno - Sistema de mensajería en tiempo real
class ChatInterno {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.currentConversation = null;
        this.conversations = [];
        this.users = [];
        this.messages = {};
        this.unreadCount = 0;
        
        this.init();
    }
    
    init() {
        // Cargar datos de prueba
        this.loadDemoData();
        
        // Cargar usuarios del mismo colegio
        this.loadUsers();
        
        // Cargar conversaciones
        this.loadConversations();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Actualizar información del usuario
        this.updateUserInfo();
        
        // Simular mensajes en tiempo real
        this.simulateRealTimeMessages();
        
        console.log('✅ Chat Interno inicializado');
    }
    
    getCurrentUser() {
        const session = JSON.parse(localStorage.getItem('edugest_session') || '{}');
        return {
            id: session.userId || 'user-1',
            name: session.userName || 'Usuario Demo',
            role: session.userRole || 'director',
            schoolId: session.schoolId || 'colegio-1'
        };
    }
    
    loadDemoData() {
        // Cargar datos de prueba si no existen
        if (!localStorage.getItem('chat_demo_users')) {
            const demoUsers = [
                {
                    id: 'user-1',
                    name: 'María González',
                    role: 'director',
                    schoolId: 'colegio-1',
                    online: true
                },
                {
                    id: 'user-2',
                    name: 'Juan Pérez',
                    role: 'profesor',
                    schoolId: 'colegio-1',
                    online: true
                },
                {
                    id: 'user-3',
                    name: 'Ana Martínez',
                    role: 'administrador',
                    schoolId: 'colegio-1',
                    online: false
                },
                {
                    id: 'user-4',
                    name: 'Carlos López',
                    role: 'tecnico',
                    schoolId: 'colegio-1',
                    online: true
                },
                {
                    id: 'user-5',
                    name: 'Laura Sánchez',
                    role: 'profesor',
                    schoolId: 'colegio-1',
                    online: true
                },
                {
                    id: 'user-6',
                    name: 'Pedro Ramírez',
                    role: 'profesor',
                    schoolId: 'colegio-1',
                    online: false
                }
            ];
            
            localStorage.setItem('chat_demo_users', JSON.stringify(demoUsers));
            
            // Mensajes de demostración
            const demoMessages = {
                'user-1_user-2': [
                    {
                        id: 'msg-1',
                        senderId: 'user-2',
                        recipientId: 'user-1',
                        message: 'Buenos días, directora. Necesito hablar sobre el evento de mañana.',
                        timestamp: Date.now() - 3600000,
                        read: true,
                        type: 'text'
                    },
                    {
                        id: 'msg-2',
                        senderId: 'user-1',
                        recipientId: 'user-2',
                        message: 'Hola Juan, claro. ¿Qué necesitas?',
                        timestamp: Date.now() - 3500000,
                        read: true,
                        type: 'text'
                    },
                    {
                        id: 'msg-3',
                        senderId: 'user-2',
                        recipientId: 'user-1',
                        message: '¿Podemos confirmar el horario? Algunos padres han preguntado.',
                        timestamp: Date.now() - 3400000,
                        read: true,
                        type: 'text'
                    },
                    {
                        id: 'msg-demo-img-1',
                        senderId: 'user-2',
                        recipientId: 'user-1',
                        message: 'Te envío el afiche del evento',
                        timestamp: Date.now() - 3300000,
                        read: true,
                        type: 'image',
                        image: {
                            data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzY2N2VlYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5FdmVudG8gRXNjb2xhcjwvdGV4dD48dGV4dCB4PSI1MCUiIHk9IjU1JSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TWHDsWFuYSAxMDowMCBocnM8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI2NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkF1bGEgTWFnbmE8L3RleHQ+PC9zdmc+',
                            name: 'afiche-evento.jpg',
                            size: 45678,
                            type: 'image/svg+xml'
                        }
                    }
                ],
                'user-1_user-4': [
                    {
                        id: 'msg-4',
                        senderId: 'user-4',
                        recipientId: 'user-1',
                        message: 'Directora, el proyector de la sala 3 necesita reparación.',
                        timestamp: Date.now() - 7200000,
                        read: false,
                        type: 'text'
                    },
                    {
                        id: 'msg-demo-img-2',
                        senderId: 'user-4',
                        recipientId: 'user-1',
                        message: 'Foto del problema',
                        timestamp: Date.now() - 7100000,
                        read: false,
                        type: 'image',
                        image: {
                            data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2VmNDQ0NCIvPjx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7imqDvuI88L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlByb3llY3RvciBEYcOxYWRvPC90ZXh0Pjwvc3ZnPg==',
                            name: 'proyector-dañado.jpg',
                            size: 32456,
                            type: 'image/svg+xml'
                        }
                    }
                ],
                'user-2_user-4': [
                    {
                        id: 'msg-5',
                        senderId: 'user-2',
                        recipientId: 'user-4',
                        message: 'Carlos, ¿puedes revisar el computador del laboratorio?',
                        timestamp: Date.now() - 1800000,
                        read: true,
                        type: 'text'
                    },
                    {
                        id: 'msg-6',
                        senderId: 'user-4',
                        recipientId: 'user-2',
                        message: 'Claro, voy en 10 minutos.',
                        timestamp: Date.now() - 1700000,
                        read: true,
                        type: 'text'
                    }
                ]
            };
            
            localStorage.setItem('chat_demo_messages', JSON.stringify(demoMessages));
        }
    }
    
    loadUsers() {
        const allUsers = JSON.parse(localStorage.getItem('chat_demo_users') || '[]');
        
        // Filtrar usuarios del mismo colegio (excepto el usuario actual)
        this.users = allUsers.filter(user => 
            user.schoolId === this.currentUser.schoolId && 
            user.id !== this.currentUser.id
        );
    }
    
    loadConversations() {
        const allMessages = JSON.parse(localStorage.getItem('chat_demo_messages') || '{}');
        this.messages = allMessages;
        
        // Crear lista de conversaciones
        this.conversations = [];
        
        for (const conversationId in allMessages) {
            const messages = allMessages[conversationId];
            if (messages.length === 0) continue;
            
            // Verificar si el usuario actual está en esta conversación
            const [userId1, userId2] = conversationId.split('_');
            if (userId1 !== this.currentUser.id && userId2 !== this.currentUser.id) {
                continue;
            }
            
            // Obtener el otro usuario
            const otherUserId = userId1 === this.currentUser.id ? userId2 : userId1;
            const otherUser = this.users.find(u => u.id === otherUserId);
            
            if (!otherUser) continue;
            
            // Último mensaje
            const lastMessage = messages[messages.length - 1];
            
            // Contar mensajes no leídos
            const unreadCount = messages.filter(m => 
                m.recipientId === this.currentUser.id && !m.read
            ).length;
            
            this.conversations.push({
                id: conversationId,
                user: otherUser,
                lastMessage: lastMessage,
                unreadCount: unreadCount
            });
        }
        
        // Ordenar por último mensaje
        this.conversations.sort((a, b) => 
            b.lastMessage.timestamp - a.lastMessage.timestamp
        );
        
        // Calcular total de no leídos
        this.unreadCount = this.conversations.reduce((sum, conv) => 
            sum + conv.unreadCount, 0
        );
        
        // Renderizar conversaciones
        this.renderConversations();
        
        // Actualizar badge
        this.updateBadge();
    }
    
    renderConversations(filter = 'all') {
        const container = document.getElementById('conversationsList');
        if (!container) return;
        
        let conversationsToShow = this.conversations;
        
        // Aplicar filtro
        if (filter === 'unread') {
            conversationsToShow = this.conversations.filter(c => c.unreadCount > 0);
        }
        
        if (conversationsToShow.length === 0) {
            container.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: #9ca3af;">
                    <p>No hay conversaciones</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = conversationsToShow.map(conv => {
            const isActive = this.currentConversation === conv.id;
            const hasUnread = conv.unreadCount > 0;
            
            return `
                <div class="conversation-item ${isActive ? 'active' : ''} ${hasUnread ? 'unread' : ''}" 
                     data-conversation-id="${conv.id}">
                    <div class="conversation-avatar">
                        ${conv.user.name.charAt(0).toUpperCase()}
                        <span class="status-indicator ${conv.user.online ? '' : 'offline'}"></span>
                    </div>
                    <div class="conversation-content">
                        <div class="conversation-header">
                            <span class="conversation-name">${conv.user.name}</span>
                            <span class="conversation-time">${this.formatTime(conv.lastMessage.timestamp)}</span>
                        </div>
                        <div class="conversation-preview">
                            <span>${this.truncateText(conv.lastMessage.message, 40)}</span>
                            ${hasUnread ? `<span class="conversation-badge">${conv.unreadCount}</span>` : ''}
                        </div>
                        <span class="conversation-role ${conv.user.role}">${this.getRoleName(conv.user.role)}</span>
                    </div>
                </div>
            `;
        }).join('');
        
        // Agregar event listeners
        container.querySelectorAll('.conversation-item').forEach(item => {
            item.addEventListener('click', () => {
                const conversationId = item.dataset.conversationId;
                this.openConversation(conversationId);
            });
        });
    }
    
    openConversation(conversationId) {
        this.currentConversation = conversationId;
        
        // Obtener información de la conversación
        const conversation = this.conversations.find(c => c.id === conversationId);
        if (!conversation) return;
        
        // Marcar mensajes como leídos
        this.markAsRead(conversationId);
        
        // Mostrar chat activo
        document.getElementById('chatEmpty').style.display = 'none';
        document.getElementById('chatActive').style.display = 'flex';
        
        // En móvil, agregar clase para mostrar el chat
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer && window.innerWidth <= 768) {
            chatContainer.classList.add('conversation-open');
        }
        
        // Actualizar header del chat
        const userAvatar = document.getElementById('chatUserAvatar');
        const userName = document.getElementById('chatUserName');
        const userStatus = document.getElementById('chatUserStatus');
        
        if (userAvatar) {
            userAvatar.textContent = conversation.user.name.charAt(0).toUpperCase();
        }
        
        if (userName) {
            userName.textContent = conversation.user.name;
        }
        
        if (userStatus) {
            const statusDot = userStatus.querySelector('.status-dot');
            const statusText = userStatus.querySelector('span:last-child');
            
            if (statusDot) {
                statusDot.className = `status-dot ${conversation.user.online ? '' : 'offline'}`;
            }
            
            if (statusText) {
                statusText.textContent = conversation.user.online ? 'En línea' : 'Desconectado';
            }
        }
        
        // Renderizar mensajes
        this.renderMessages(conversationId);
        
        // Actualizar conversaciones (para quitar badge)
        this.renderConversations();
        
        // Focus en input
        document.getElementById('messageInput')?.focus();
    }
    
    renderMessages(conversationId) {
        const container = document.getElementById('chatMessages');
        if (!container) return;
        
        const messages = this.messages[conversationId] || [];
        
        if (messages.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; color: #9ca3af; margin: auto;">
                    <p>No hay mensajes aún</p>
                    <p style="font-size: 0.875rem;">Envía el primer mensaje para comenzar la conversación</p>
                </div>
            `;
            return;
        }
        
        // Agrupar mensajes por fecha
        const messagesByDate = this.groupMessagesByDate(messages);
        
        let html = '';
        
        for (const date in messagesByDate) {
            html += `
                <div class="message-date-divider">
                    <span class="message-date-text">${date}</span>
                </div>
            `;
            
            messagesByDate[date].forEach(msg => {
                const isSent = msg.senderId === this.currentUser.id;
                const sender = isSent ? this.currentUser : this.getUserById(msg.senderId);
                
                html += `
                    <div class="message ${isSent ? 'sent' : ''}">
                        <div class="message-avatar">
                            ${sender.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="message-content">
                            ${!isSent ? `
                                <div class="message-header">
                                    <span class="message-sender">${sender.name}</span>
                                    <span class="message-role">${this.getRoleName(sender.role)}</span>
                                    <span class="message-time">${this.formatTime(msg.timestamp)}</span>
                                </div>
                            ` : `
                                <div class="message-header">
                                    <span class="message-time">${this.formatTime(msg.timestamp)}</span>
                                </div>
                            `}
                            <div class="message-bubble">
                                ${msg.type === 'image' ? `
                                    <div class="message-image-container">
                                        <img src="${msg.image.data}" 
                                             alt="${msg.image.name}" 
                                             class="message-image"
                                             onclick="chatInterno.openImageModal('${msg.image.data}', '${msg.image.name}')">
                                        <div class="message-image-info">
                                            <span class="message-image-name">${msg.image.name}</span>
                                            <button class="btn-download-image" 
                                                    onclick="event.stopPropagation(); chatInterno.downloadImage('${msg.image.data}', '${msg.image.name}')"
                                                    title="Descargar imagen">
                                                ⬇️
                                            </button>
                                        </div>
                                    </div>
                                ` : ''}
                                ${msg.message ? `<p class="message-text">${this.escapeHtml(msg.message)}</p>` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        container.innerHTML = html;
        
        // Scroll al final
        container.scrollTop = container.scrollHeight;
    }
    
    sendMessage(messageText = null, imageData = null) {
        const input = document.getElementById('messageInput');
        
        // Si no hay texto ni imagen, obtener del input
        if (!messageText && !imageData) {
            if (!input) return;
            messageText = input.value.trim();
            if (!messageText) return;
        }
        
        if (!this.currentConversation) {
            alert('Selecciona una conversación primero');
            return;
        }
        
        // Obtener el destinatario
        const [userId1, userId2] = this.currentConversation.split('_');
        const recipientId = userId1 === this.currentUser.id ? userId2 : userId1;
        
        // Crear mensaje
        const newMessage = {
            id: 'msg-' + Date.now(),
            senderId: this.currentUser.id,
            recipientId: recipientId,
            message: messageText || '',
            timestamp: Date.now(),
            read: false
        };
        
        // Agregar imagen si existe
        if (imageData) {
            newMessage.image = imageData;
            newMessage.type = 'image';
        } else {
            newMessage.type = 'text';
        }
        
        // Agregar a la conversación
        if (!this.messages[this.currentConversation]) {
            this.messages[this.currentConversation] = [];
        }
        
        this.messages[this.currentConversation].push(newMessage);
        
        // Guardar en localStorage
        localStorage.setItem('chat_demo_messages', JSON.stringify(this.messages));
        
        // Limpiar input
        if (input) {
            input.value = '';
        }
        
        // Actualizar UI
        this.renderMessages(this.currentConversation);
        this.loadConversations();
        
        // Simular notificación de sonido
        this.playNotificationSound();
    }
    
    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // Validar que sea una imagen
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen válido');
            return;
        }
        
        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen es muy grande. Máximo 5MB');
            return;
        }
        
        // Leer la imagen como base64
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = {
                data: e.target.result,
                name: file.name,
                size: file.size,
                type: file.type
            };
            
            // Enviar mensaje con imagen
            this.sendMessage('📷 Imagen', imageData);
        };
        
        reader.readAsDataURL(file);
        
        // Limpiar el input
        event.target.value = '';
    }
    
    downloadImage(imageData, imageName) {
        // Crear un enlace temporal para descargar
        const link = document.createElement('a');
        link.href = imageData;
        link.download = imageName || 'imagen-chat.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    openImageModal(imageSrc, imageName) {
        // Crear modal para ver imagen en grande
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="image-modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="image-modal-content">
                <div class="image-modal-header">
                    <span>${imageName || 'Imagen'}</span>
                    <button class="btn-icon" onclick="this.closest('.image-modal').remove()">✕</button>
                </div>
                <div class="image-modal-body">
                    <img src="${imageSrc}" alt="Imagen">
                </div>
                <div class="image-modal-footer">
                    <button class="btn btn-secondary" onclick="chatInterno.downloadImage('${imageSrc}', '${imageName || 'imagen.jpg'}')">
                        <span>⬇️</span>
                        <span>Descargar</span>
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.image-modal').remove()">
                        <span>Cerrar</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    markAsRead(conversationId) {
        const messages = this.messages[conversationId] || [];
        
        messages.forEach(msg => {
            if (msg.recipientId === this.currentUser.id) {
                msg.read = true;
            }
        });
        
        // Guardar cambios
        localStorage.setItem('chat_demo_messages', JSON.stringify(this.messages));
        
        // Actualizar conversaciones
        this.loadConversations();
    }
    
    searchUsers(query) {
        query = query.toLowerCase().trim();
        
        if (!query) {
            return this.users;
        }
        
        return this.users.filter(user => 
            user.name.toLowerCase().includes(query) ||
            this.getRoleName(user.role).toLowerCase().includes(query)
        );
    }
    
    startNewConversation(userId) {
        const conversationId = this.getConversationId(this.currentUser.id, userId);
        
        // Verificar si ya existe la conversación
        if (!this.messages[conversationId]) {
            this.messages[conversationId] = [];
            localStorage.setItem('chat_demo_messages', JSON.stringify(this.messages));
        }
        
        // Recargar conversaciones
        this.loadConversations();
        
        // Abrir conversación
        this.openConversation(conversationId);
        
        // Cerrar modal
        document.getElementById('modalNuevoChat').style.display = 'none';
    }
    
    getConversationId(userId1, userId2) {
        return [userId1, userId2].sort().join('_');
    }
    
    getUserById(userId) {
        return this.users.find(u => u.id === userId) || this.currentUser;
    }
    
    getRoleName(role) {
        const roles = {
            'director': 'Director',
            'administrador': 'Administrador',
            'profesor': 'Profesor',
            'tecnico': 'Técnico'
        };
        return roles[role] || role;
    }
    
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        // Menos de 1 minuto
        if (diff < 60000) {
            return 'Ahora';
        }
        
        // Menos de 1 hora
        if (diff < 3600000) {
            const minutes = Math.floor(diff / 60000);
            return `${minutes}m`;
        }
        
        // Hoy
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        }
        
        // Ayer
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Ayer';
        }
        
        // Esta semana
        if (diff < 604800000) {
            return date.toLocaleDateString('es-ES', { weekday: 'short' });
        }
        
        // Fecha completa
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    }
    
    groupMessagesByDate(messages) {
        const groups = {};
        
        messages.forEach(msg => {
            const date = new Date(msg.timestamp);
            const now = new Date();
            
            let dateKey;
            
            if (date.toDateString() === now.toDateString()) {
                dateKey = 'Hoy';
            } else {
                const yesterday = new Date(now);
                yesterday.setDate(yesterday.getDate() - 1);
                
                if (date.toDateString() === yesterday.toDateString()) {
                    dateKey = 'Ayer';
                } else {
                    dateKey = date.toLocaleDateString('es-ES', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                    });
                }
            }
            
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            
            groups[dateKey].push(msg);
        });
        
        return groups;
    }
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    updateBadge() {
        const badge = document.getElementById('chatBadge');
        if (!badge) return;
        
        if (this.unreadCount > 0) {
            badge.textContent = this.unreadCount;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
    
    updateUserInfo() {
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const userRole = document.getElementById('userRole');
        const userSchool = document.getElementById('userSchool');
        
        if (userAvatar) {
            userAvatar.textContent = this.currentUser.name.charAt(0).toUpperCase();
        }
        
        if (userName) {
            userName.textContent = this.currentUser.name;
        }
        
        if (userRole) {
            userRole.textContent = this.getRoleName(this.currentUser.role);
        }
        
        if (userSchool) {
            userSchool.textContent = 'Colegio Demo';
        }
    }
    
    playNotificationSound() {
        // Simular sonido de notificación
        console.log('🔔 Nuevo mensaje');
    }
    
    simulateRealTimeMessages() {
        // Simular mensajes entrantes cada 30 segundos (solo para demo)
        setInterval(() => {
            // 20% de probabilidad de recibir un mensaje
            if (Math.random() < 0.2 && this.conversations.length > 0) {
                const randomConv = this.conversations[Math.floor(Math.random() * this.conversations.length)];
                
                const newMessage = {
                    id: 'msg-' + Date.now(),
                    senderId: randomConv.user.id,
                    recipientId: this.currentUser.id,
                    message: this.getRandomMessage(),
                    timestamp: Date.now(),
                    read: false
                };
                
                if (!this.messages[randomConv.id]) {
                    this.messages[randomConv.id] = [];
                }
                
                this.messages[randomConv.id].push(newMessage);
                localStorage.setItem('chat_demo_messages', JSON.stringify(this.messages));
                
                // Si es la conversación actual, renderizar
                if (this.currentConversation === randomConv.id) {
                    this.renderMessages(randomConv.id);
                    this.markAsRead(randomConv.id);
                }
                
                // Actualizar lista de conversaciones
                this.loadConversations();
                
                // Notificación
                this.showNotification(randomConv.user.name, newMessage.message);
            }
        }, 30000);
    }
    
    getRandomMessage() {
        const messages = [
            '¿Tienes un momento para hablar?',
            'Gracias por tu ayuda',
            'Perfecto, nos vemos luego',
            '¿Cómo va todo?',
            'Necesito tu opinión sobre algo',
            'Entendido, gracias'
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }
    
    showNotification(title, message) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: 'LOGO EDUGEST.png'
            });
        }
        
        this.playNotificationSound();
    }
    
    setupEventListeners() {
        // Botón enviar mensaje
        const btnSend = document.getElementById('btnSend');
        if (btnSend) {
            btnSend.addEventListener('click', () => this.sendMessage());
        }
        
        // Enter para enviar
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
        
        // Botón volver en móvil
        const btnBackToList = document.getElementById('btnBackToList');
        if (btnBackToList) {
            btnBackToList.addEventListener('click', () => {
                this.backToConversationList();
            });
        }
        
        // Botón adjuntar imagen
        const btnAttach = document.getElementById('btnAttachImage');
        if (btnAttach) {
            btnAttach.addEventListener('click', () => {
                document.getElementById('imageInput').click();
            });
        }
        
        // Input de imagen
        const imageInput = document.getElementById('imageInput');
        if (imageInput) {
            imageInput.addEventListener('change', (e) => this.handleImageUpload(e));
        }
        
        // Búsqueda de usuarios
        const searchUsers = document.getElementById('searchUsers');
        if (searchUsers) {
            searchUsers.addEventListener('input', (e) => {
                const results = this.searchUsers(e.target.value);
                // Filtrar conversaciones basadas en búsqueda
                const filteredConversations = this.conversations.filter(conv =>
                    results.some(user => user.id === conv.user.id)
                );
                
                const container = document.getElementById('conversationsList');
                if (filteredConversations.length === 0) {
                    container.innerHTML = `
                        <div style="padding: 2rem; text-align: center; color: #9ca3af;">
                            <p>No se encontraron usuarios</p>
                        </div>
                    `;
                } else {
                    this.renderConversations();
                }
            });
        }
        
        // Tabs de filtro
        document.querySelectorAll('.chat-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.chat-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const filter = tab.dataset.tab;
                this.renderConversations(filter);
            });
        });
        
        // Botón nueva conversación
        const btnNuevoChat = document.getElementById('btnNuevoChat');
        if (btnNuevoChat) {
            btnNuevoChat.addEventListener('click', () => {
                this.showNewChatModal();
            });
        }
        
        // Manejar cambio de tamaño de ventana
        window.addEventListener('resize', () => {
            // Si se cambia a desktop, remover clase mobile
            if (window.innerWidth > 768) {
                const chatContainer = document.querySelector('.chat-container');
                if (chatContainer) {
                    chatContainer.classList.remove('conversation-open');
                }
            }
        });
        
        // Solicitar permiso de notificaciones
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
    
    backToConversationList() {
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.classList.remove('conversation-open');
        }
        
        // Opcional: cerrar el chat activo
        // document.getElementById('chatActive').style.display = 'none';
        // document.getElementById('chatEmpty').style.display = 'flex';
        // this.currentConversation = null;
    }
    
    showNewChatModal() {
        const modal = document.getElementById('modalNuevoChat');
        if (!modal) return;
        
        modal.style.display = 'flex';
        
        // Renderizar lista de usuarios
        this.renderNewChatUsers();
        
        // Búsqueda en modal
        const searchInput = document.getElementById('searchNewChat');
        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
            
            searchInput.addEventListener('input', (e) => {
                this.renderNewChatUsers(e.target.value);
            });
        }
    }
    
    renderNewChatUsers(query = '') {
        const container = document.getElementById('newChatUsersList');
        if (!container) return;
        
        const users = this.searchUsers(query);
        
        if (users.length === 0) {
            container.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: #9ca3af;">
                    <p>No se encontraron usuarios</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = users.map(user => `
            <div class="user-item" data-user-id="${user.id}">
                <div class="user-item-avatar">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                <div class="user-item-info">
                    <div class="user-item-name">${user.name}</div>
                    <div class="user-item-role">${this.getRoleName(user.role)}</div>
                </div>
                <div>
                    ${user.online ? '<span style="color: #10b981;">●</span>' : '<span style="color: #9ca3af;">●</span>'}
                </div>
            </div>
        `).join('');
        
        // Event listeners
        container.querySelectorAll('.user-item').forEach(item => {
            item.addEventListener('click', () => {
                const userId = item.dataset.userId;
                this.startNewConversation(userId);
            });
        });
    }
}

// Inicializar chat cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.chatInterno = new ChatInterno();
});
