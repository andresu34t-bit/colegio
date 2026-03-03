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
            <div id="chatFloatingBtn" class="chat-floating-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span id="chatBadge" class="chat-badge" style="display: none;">0</span>
            </div>

            <!-- Ventana del chat -->
            <div id="chatWindow" class="chat-window" style="display: none;">
                <!-- Header -->
                <div class="chat-header">
                    <div class="chat-header-left">
                        <button id="chatBackBtn" class="chat-back-btn" style="display: none;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                        </button>
                        <h3 id="chatTitle">Mensajes</h3>
                    </div>
                    <div class="chat-header-actions">
                        <button id="chatMinimizeBtn" class="chat-icon-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Lista de conversaciones -->
                <div id="chatConversationsList" class="chat-conversations-list">
                    <div class="chat-tabs">
                        <button class="chat-tab active" data-tab="users">Usuarios</button>
                        <button class="chat-tab" data-tab="group">Grupo Colegio</button>
                    </div>
                    <div class="chat-search">
                        <input type="text" id="chatSearchInput" placeholder="Buscar usuario...">
                    </div>
                    <div id="chatUsersList" class="chat-users-list">
                        <!-- Se llenará dinámicamente -->
                    </div>
                </div>

                <!-- Vista de conversación -->
                <div id="chatConversationView" class="chat-conversation-view" style="display: none;">
                    <div id="chatMessages" class="chat-messages">
                        <!-- Mensajes se cargarán aquí -->
                    </div>
                    <div class="chat-input-container">
                        <input type="text" id="chatMessageInput" placeholder="Escribe un mensaje..." />
                        <button id="chatSendBtn" class="chat-send-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
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
        document.getElementById('chatConversationsList').style.display = 'block';
        document.getElementById('chatConversationView').style.display = 'none';
        document.getElementById('chatBackBtn').style.display = 'none';
        document.getElementById('chatTitle').textContent = 'Mensajes';
        this.currentConversation = null;
    }

    showConversationView(userName, userId, type = 'private') {
        document.getElementById('chatConversationsList').style.display = 'none';
        document.getElementById('chatConversationView').style.display = 'flex';
        document.getElementById('chatBackBtn').style.display = 'block';
        document.getElementById('chatTitle').textContent = userName;
        document.getElementById('chatMessages').innerHTML = '';
        
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
            usersList.innerHTML = '<div class="chat-empty">No hay usuarios disponibles</div>';
            return;
        }

        usersList.innerHTML = users.map(user => `
            <div class="chat-user-item" data-user-id="${user.id}" data-user-name="${user.name}" data-user-role="${user.role}">
                <div class="chat-user-avatar ${user.online ? 'online' : ''}">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                <div class="chat-user-info">
                    <div class="chat-user-name">${user.name}</div>
                    <div class="chat-user-role">${this.getRoleLabel(user.role)}</div>
                </div>
                <div class="chat-user-status">
                    ${user.online ? '<span class="status-online">●</span>' : '<span class="status-offline">○</span>'}
                </div>
            </div>
        `).join('');

        // Agregar event listeners
        usersList.querySelectorAll('.chat-user-item').forEach(item => {
            item.addEventListener('click', () => {
                const userId = item.dataset.userId;
                const userName = item.dataset.userName;
                this.showConversationView(userName, userId, 'private');
            });
        });
    }

    renderMessages(messages) {
        const messagesContainer = document.getElementById('chatMessages');
        const currentUserId = this.getCurrentUserId();
        
        messagesContainer.innerHTML = messages.map(msg => {
            const isOwn = msg.senderId === currentUserId;
            const time = this.formatTime(msg.timestamp);
            
            return `
                <div class="chat-message ${isOwn ? 'own' : 'other'}">
                    <div class="chat-message-content">
                        ${!isOwn ? `<div class="chat-message-sender">${msg.senderName}</div>` : ''}
                        <div class="chat-message-text">${this.escapeHtml(msg.message)}</div>
                        <div class="chat-message-time">${time}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Scroll al final
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
        document.querySelectorAll('.chat-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        if (tab === 'group') {
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
            'director': 'Director',
            'administrador': 'Administrador',
            'profesor': 'Profesor'
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
