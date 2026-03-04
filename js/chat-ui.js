// chat-ui.js - Interfaz de usuario del chat
export class ChatUI {
    constructor() {
        this.isOpen = false;
        this.currentConversation = null;
        this.conversationType = 'private'; // 'private' o 'group'
        this.unreadCount = 0;
        this.init();
    }

    init() {
        this.createChatHTML();
        this.attachEventListeners();
    }

    createChatHTML() {
        const chatHTML = `
            <!-- Botón flotante del chat -->
            <div id="chatFloatingBtn" class="chat-floating-btn" title="Chat en tiempo real">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span id="chatBadge" class="chat-badge" style="display: none;">0</span>
            </div>

            <!-- Ventana del chat -->
            <div id="chatWindow" class="chat-window" style="display: none;">
                <!-- Header -->
                <div class="chat-header">
                    <button id="chatBackBtn" class="chat-back-btn" style="display: none;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <div class="chat-header-info">
                        <h3 id="chatTitle">Mensajes</h3>
                        <p id="chatSubtitle" style="display: none;"></p>
                    </div>
                    <div class="chat-header-actions">
                        <button id="chatMinimizeBtn" class="chat-minimize-btn" title="Minimizar">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Body del chat -->
                <div class="chat-body">
                    <!-- Vista de lista -->
                    <div id="chatListaView" class="chat-lista-view">
                        <div class="chat-tabs">
                            <button class="chat-tab active" data-tab="users">
                                👥 Usuarios
                            </button>
                            <button class="chat-tab" data-tab="group">
                                🏫 Grupo Colegio
                            </button>
                        </div>
                        <div class="chat-search">
                            <input type="text" id="chatSearchInput" placeholder="🔍 Buscar por nombre...">
                        </div>
                        <div class="chat-tab-content">
                            <div id="chatUsersPane" class="chat-tab-pane active">
                                <div id="chatUsersList" class="chat-usuarios-list">
                                    <div class="chat-loading">Cargando usuarios...</div>
                                </div>
                            </div>
                            <div id="chatGroupPane" class="chat-tab-pane">
                                <div class="chat-empty">
                                    <p>💬 Chat Grupal del Colegio</p>
                                    <small>Comunícate con todos los miembros de tu colegio</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Vista de mensajes -->
                    <div id="chatMensajesView" class="chat-mensajes-view" style="display: none;">
                        <div id="chatMensajesContainer" class="chat-mensajes-container">
                            <!-- Mensajes se cargarán aquí -->
                        </div>
                        <div class="chat-footer">
                            <div class="chat-input-container">
                                <input type="text" id="chatMessageInput" placeholder="Escribe un mensaje..." />
                                <button id="chatSendBtn" class="chat-send-btn" title="Enviar mensaje">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    attachEventListeners() {
        // Botón flotante
        document.getElementById('chatFloatingBtn').addEventListener('click', () => {
            this.toggleChat();
        });

        // Minimizar
        document.getElementById('chatMinimizeBtn').addEventListener('click', () => {
            this.closeChat();
        });

        // Botón atrás
        document.getElementById('chatBackBtn').addEventListener('click', () => {
            this.showConversationsList();
        });

        // Tabs
        document.querySelectorAll('.chat-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Búsqueda
        document.getElementById('chatSearchInput').addEventListener('input', (e) => {
            this.filterUsers(e.target.value);
        });

        // Enviar mensaje con Enter
        document.getElementById('chatMessageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Botón enviar
        document.getElementById('chatSendBtn').addEventListener('click', () => {
            this.sendMessage();
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.style.display = this.isOpen ? 'flex' : 'none';
        
        if (this.isOpen) {
            this.showConversationsList();
        }
    }

    openChat() {
        this.isOpen = true;
        document.getElementById('chatWindow').style.display = 'flex';
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chatWindow').style.display = 'none';
    }

    showConversationsList() {
        document.getElementById('chatListaView').style.display = 'flex';
        document.getElementById('chatMensajesView').style.display = 'none';
        document.getElementById('chatBackBtn').style.display = 'none';
        document.getElementById('chatTitle').textContent = 'Mensajes';
        document.getElementById('chatSubtitle').style.display = 'none';
        this.currentConversation = null;
    }

    showConversationView(userName, userId, type = 'private', userRole = '') {
        document.getElementById('chatListaView').style.display = 'none';
        document.getElementById('chatMensajesView').style.display = 'flex';
        document.getElementById('chatBackBtn').style.display = 'block';
        document.getElementById('chatTitle').textContent = userName;
        
        const subtitle = document.getElementById('chatSubtitle');
        if (type === 'group') {
            subtitle.textContent = 'Chat grupal del colegio';
            subtitle.style.display = 'block';
        } else if (userRole) {
            subtitle.textContent = this.getRoleLabel(userRole);
            subtitle.style.display = 'block';
        } else {
            subtitle.style.display = 'none';
        }
        
        document.getElementById('chatMensajesContainer').innerHTML = '<div class="chat-loading">Cargando mensajes...</div>';
        
        this.currentConversation = userId;
        this.conversationType = type;
        
        // Disparar evento personalizado
        const event = new CustomEvent('conversationOpened', { 
            detail: { userId, type } 
        });
        document.dispatchEvent(event);
    }

    renderUsers(users) {
        const usersList = document.getElementById('chatUsersList');
        
        if (users.length === 0) {
            usersList.innerHTML = `
                <div class="chat-empty">
                    <p>👥 No hay usuarios disponibles</p>
                    <small>Los usuarios de tu colegio aparecerán aquí</small>
                </div>
            `;
            return;
        }

        usersList.innerHTML = users.map(user => `
            <div class="chat-usuario-item" data-user-id="${user.id}" data-user-name="${user.name}" data-user-role="${user.role}">
                <div class="chat-avatar">
                    ${user.name.charAt(0).toUpperCase()}
                    <span class="chat-status ${user.online ? 'chat-status-online' : 'chat-status-offline'}"></span>
                </div>
                <div class="chat-usuario-info">
                    <div class="chat-usuario-nombre">${this.escapeHtml(user.name)}</div>
                    <div class="chat-usuario-rol">${this.getRoleLabel(user.role)} ${user.online ? '• En línea' : ''}</div>
                </div>
            </div>
        `).join('');

        // Agregar event listeners
        usersList.querySelectorAll('.chat-usuario-item').forEach(item => {
            item.addEventListener('click', () => {
                const userId = item.dataset.userId;
                const userName = item.dataset.userName;
                const userRole = item.dataset.userRole;
                this.showConversationView(userName, userId, 'private', userRole);
            });
        });
    }

    renderMessages(messages) {
        const messagesContainer = document.getElementById('chatMensajesContainer');
        const currentUserId = this.getCurrentUserId();
        
        if (messages.length === 0) {
            messagesContainer.innerHTML = `
                <div class="chat-empty">
                    <p>💬 No hay mensajes aún</p>
                    <small>Inicia la conversación enviando un mensaje</small>
                </div>
            `;
            return;
        }
        
        messagesContainer.innerHTML = messages.map(msg => {
            const isOwn = msg.senderId === currentUserId;
            const time = this.formatTime(msg.timestamp);
            
            return `
                <div class="chat-mensaje ${isOwn ? 'chat-mensaje-propio' : 'chat-mensaje-recibido'}">
                    ${!isOwn && this.conversationType === 'group' ? `<div class="chat-mensaje-nombre">${this.escapeHtml(msg.senderName)}</div>` : ''}
                    <div class="chat-mensaje-contenido">${this.escapeHtml(msg.message)}</div>
                    <div class="chat-mensaje-tiempo">${time}</div>
                </div>
            `;
        }).join('');

        // Scroll al final con animación suave
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    sendMessage() {
        const input = document.getElementById('chatMessageInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Disparar evento personalizado
        const event = new CustomEvent('messageSent', { 
            detail: { 
                message, 
                recipientId: this.currentConversation,
                type: this.conversationType
            } 
        });
        document.dispatchEvent(event);

        input.value = '';
    }

    updateUnreadCount(count) {
        this.unreadCount = count;
        const badge = document.getElementById('chatBadge');
        
        if (count > 0) {
            badge.textContent = count > 99 ? '99+' : count;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }

    switchTab(tab) {
        // Actualizar tabs
        document.querySelectorAll('.chat-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // Actualizar panes
        document.querySelectorAll('.chat-tab-pane').forEach(p => p.classList.remove('active'));
        
        if (tab === 'users') {
            document.getElementById('chatUsersPane').classList.add('active');
        } else if (tab === 'group') {
            document.getElementById('chatGroupPane').classList.add('active');
            // Abrir vista de chat grupal
            this.showConversationView('Grupo del Colegio', 'group', 'group');
        }
    }

    filterUsers(searchTerm) {
        const users = document.querySelectorAll('.chat-user-item');
        const term = searchTerm.toLowerCase();
        
        users.forEach(user => {
            const name = user.dataset.userName.toLowerCase();
            user.style.display = name.includes(term) ? 'flex' : 'none';
        });
    }

    getRoleLabel(role) {
        const labels = {
            'director': '👔 Director',
            'administrador': '⚙️ Administrador',
            'profesor': '👨‍🏫 Docente',
            'tecnico': '🔧 Técnico'
        };
        return labels[role] || role;
    }

    formatTime(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getCurrentUserId() {
        // Obtener del localStorage o contexto global
        return localStorage.getItem('userId') || 'current-user';
    }

    showNotification(title, message) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: '/LOGO EDUGEST.png'
            });
        }
    }

    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
}
