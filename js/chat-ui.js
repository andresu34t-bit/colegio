// Chat UI - Interfaz de Usuario del Chat
class ChatUI {
    constructor() {
        this.isOpen = false;
        this.currentConversacion = null;
        this.view = 'lista'; // 'lista' o 'chat'
    }

    // Inicializar UI
    init() {
        this.createFloatingButton();
        this.createChatWindow();
        this.attachEventListeners();
    }

    // Crear botón flotante
    createFloatingButton() {
        const button = document.createElement('button');
        button.id = 'chatFloatingBtn';
        button.className = 'chat-floating-btn';
        button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="chat-badge" id="chatBadge" style="display: none;">0</span>
        `;
        
        button.onclick = () => this.toggleChat();
        document.body.appendChild(button);
    }

    // Crear ventana de chat
    createChatWindow() {
        const chatWindow = document.createElement('div');
        chatWindow.id = 'chatWindow';
        chatWindow.className = 'chat-window';
        chatWindow.style.display = 'none';
        
        chatWindow.innerHTML = `
            <div class="chat-header">
                <button class="chat-back-btn" id="chatBackBtn" style="display: none;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>
                <div class="chat-header-info">
                    <h3 id="chatTitle">Mensajes</h3>
                    <p id="chatSubtitle"></p>
                </div>
                <div class="chat-header-actions">
                    <button class="chat-minimize-btn" id="chatMinimizeBtn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5"/>
                        </svg>
                    </button>
                    <button class="chat-close-btn" id="chatCloseBtn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="chat-body">
                <!-- Vista de lista de conversaciones -->
                <div class="chat-lista-view" id="chatListaView">
                    <div class="chat-search">
                        <input type="text" id="chatSearch" placeholder="Buscar conversación...">
                    </div>
                    
                    <div class="chat-tabs">
                        <button class="chat-tab active" data-tab="conversaciones">Chats</button>
                        <button class="chat-tab" data-tab="usuarios">Usuarios</button>
                    </div>
                    
                    <div class="chat-tab-content">
                        <div class="chat-tab-pane active" id="tabConversaciones">
                            <div class="chat-conversaciones-list" id="chatConversacionesList">
                                <div class="chat-empty">
                                    <p>💬 No hay conversaciones</p>
                                    <small>Selecciona un usuario para comenzar</small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="chat-tab-pane" id="tabUsuarios">
                            <div class="chat-usuarios-list" id="chatUsuariosList">
                                <div class="chat-loading">Cargando usuarios...</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Vista de chat -->
                <div class="chat-mensajes-view" id="chatMensajesView" style="display: none;">
                    <div class="chat-mensajes-container" id="chatMensajesContainer">
                        <div class="chat-empty">
                            <p>👋 Inicia la conversación</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="chat-footer" id="chatFooter" style="display: none;">
                <div class="chat-input-container">
                    <input type="text" id="chatInput" placeholder="Escribe un mensaje..." />
                    <button class="chat-send-btn" id="chatSendBtn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatWindow);
    }

    // Adjuntar event listeners
    attachEventListeners() {
        // Minimizar
        document.getElementById('chatMinimizeBtn').onclick = () => this.toggleChat();
        
        // Cerrar
        document.getElementById('chatCloseBtn').onclick = () => this.toggleChat();
        
        // Volver
        document.getElementById('chatBackBtn').onclick = () => this.showListaView();
        
        // Tabs
        document.querySelectorAll('.chat-tab').forEach(tab => {
            tab.onclick = () => this.switchTab(tab.dataset.tab);
        });
        
        // Enviar mensaje
        document.getElementById('chatSendBtn').onclick = () => this.enviarMensaje();
        document.getElementById('chatInput').onkeypress = (e) => {
            if (e.key === 'Enter') this.enviarMensaje();
        };
        
        // Búsqueda
        document.getElementById('chatSearch').oninput = (e) => this.buscarConversacion(e.target.value);
    }

    // Toggle chat
    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatWindow');
        
        if (this.isOpen) {
            chatWindow.style.display = 'flex';
            chatWindow.classList.add('chat-window-open');
            this.loadConversaciones();
            this.loadUsuarios();
        } else {
            chatWindow.classList.remove('chat-window-open');
            setTimeout(() => {
                chatWindow.style.display = 'none';
            }, 300);
        }
    }

    // Cambiar tab
    switchTab(tabName) {
        document.querySelectorAll('.chat-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        document.querySelectorAll('.chat-tab-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
        });
    }

    // Mostrar vista de lista
    showListaView() {
        this.view = 'lista';
        this.currentConversacion = null;
        
        document.getElementById('chatListaView').style.display = 'block';
        document.getElementById('chatMensajesView').style.display = 'none';
        document.getElementById('chatFooter').style.display = 'none';
        document.getElementById('chatBackBtn').style.display = 'none';
        document.getElementById('chatTitle').textContent = 'Mensajes';
        document.getElementById('chatSubtitle').textContent = '';
    }

    // Mostrar vista de chat
    showChatView(conversacionId, titulo, subtitulo = '') {
        this.view = 'chat';
        this.currentConversacion = conversacionId;
        
        document.getElementById('chatListaView').style.display = 'none';
        document.getElementById('chatMensajesView').style.display = 'block';
        document.getElementById('chatFooter').style.display = 'flex';
        document.getElementById('chatBackBtn').style.display = 'flex';
        document.getElementById('chatTitle').textContent = titulo;
        document.getElementById('chatSubtitle').textContent = subtitulo;
        
        this.loadMensajes(conversacionId);
        window.chatFirebase.marcarComoLeido(conversacionId);
        this.updateBadge();
    }

    // Cargar conversaciones
    loadConversaciones() {
        window.chatFirebase.onConversacionesChange((conversaciones) => {
            const container = document.getElementById('chatConversacionesList');
            
            if (conversaciones.length === 0) {
                container.innerHTML = `
                    <div class="chat-empty">
                        <p>💬 No hay conversaciones</p>
                        <small>Selecciona un usuario para comenzar</small>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = conversaciones.map(conv => {
                const otroUsuario = conv.participantes.find(p => p !== window.chatFirebase.currentUser.email);
                const usuario = window.chatFirebase.getUsuariosColegio().find(u => u.email === otroUsuario);
                const noLeidos = conv.noLeidos?.[window.chatFirebase.currentUser.email] || 0;
                
                const nombre = conv.tipo === 'grupal' ? conv.nombre : (usuario?.nombre || otroUsuario);
                const avatar = this.getAvatar(nombre);
                const tiempo = this.formatTiempo(conv.ultimaActualizacion);
                
                return `
                    <div class="chat-conversacion-item" onclick="window.chatUI.abrirConversacion('${conv.id}', '${nombre}')">
                        <div class="chat-avatar">${avatar}</div>
                        <div class="chat-conversacion-info">
                            <div class="chat-conversacion-header">
                                <span class="chat-conversacion-nombre">${nombre}</span>
                                <span class="chat-conversacion-tiempo">${tiempo}</span>
                            </div>
                            <div class="chat-conversacion-preview">
                                <span>${conv.ultimoMensaje || 'Sin mensajes'}</span>
                                ${noLeidos > 0 ? `<span class="chat-conversacion-badge">${noLeidos}</span>` : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            this.updateBadge();
        });
    }

    // Cargar usuarios
    loadUsuarios() {
        const usuarios = window.chatFirebase.getUsuariosColegio();
        const container = document.getElementById('chatUsuariosList');
        
        if (usuarios.length === 0) {
            container.innerHTML = `
                <div class="chat-empty">
                    <p>👥 No hay usuarios disponibles</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = usuarios.map(usuario => {
            const avatar = this.getAvatar(usuario.nombre);
            const estado = usuario.estado || 'offline';
            const rolLabel = this.getRolLabel(usuario.rol);
            
            return `
                <div class="chat-usuario-item" onclick="window.chatUI.iniciarChat('${usuario.email}', '${usuario.nombre}')">
                    <div class="chat-avatar">
                        ${avatar}
                        <span class="chat-status chat-status-${estado}"></span>
                    </div>
                    <div class="chat-usuario-info">
                        <span class="chat-usuario-nombre">${usuario.nombre}</span>
                        <span class="chat-usuario-rol">${rolLabel}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Iniciar chat con usuario
    iniciarChat(usuarioEmail, usuarioNombre) {
        const conversacionId = window.chatFirebase.getOrCreateConversacion(usuarioEmail);
        this.abrirConversacion(conversacionId, usuarioNombre);
    }

    // Abrir conversación
    abrirConversacion(conversacionId, nombre) {
        this.showChatView(conversacionId, nombre);
    }

    // Cargar mensajes
    loadMensajes(conversacionId) {
        window.chatFirebase.onMensajesChange(conversacionId, (mensajes) => {
            const container = document.getElementById('chatMensajesContainer');
            
            if (mensajes.length === 0) {
                container.innerHTML = `
                    <div class="chat-empty">
                        <p>👋 Inicia la conversación</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = mensajes.map(msg => {
                const esPropio = msg.emisor === window.chatFirebase.currentUser.email;
                const tiempo = this.formatTiempo(msg.timestamp);
                
                return `
                    <div class="chat-mensaje ${esPropio ? 'chat-mensaje-propio' : 'chat-mensaje-recibido'}">
                        ${!esPropio ? `<div class="chat-mensaje-nombre">${msg.emisorNombre}</div>` : ''}
                        <div class="chat-mensaje-contenido">${this.escapeHtml(msg.contenido)}</div>
                        <div class="chat-mensaje-tiempo">${tiempo}</div>
                    </div>
                `;
            }).join('');
            
            // Scroll al final
            container.scrollTop = container.scrollHeight;
        });
    }

    // Enviar mensaje
    enviarMensaje() {
        const input = document.getElementById('chatInput');
        const contenido = input.value.trim();
        
        if (!contenido || !this.currentConversacion) return;
        
        window.chatFirebase.enviarMensaje(this.currentConversacion, contenido);
        input.value = '';
        input.focus();
    }

    // Actualizar badge
    updateBadge() {
        const total = window.chatFirebase.getTotalNoLeidos();
        const badge = document.getElementById('chatBadge');
        const btn = document.getElementById('chatFloatingBtn');
        
        if (total > 0) {
            badge.textContent = total > 99 ? '99+' : total;
            badge.style.display = 'flex';
            btn.classList.add('chat-has-notifications');
        } else {
            badge.style.display = 'none';
            btn.classList.remove('chat-has-notifications');
        }
    }

    // Utilidades
    getAvatar(nombre) {
        return nombre.charAt(0).toUpperCase();
    }

    getRolLabel(rol) {
        const roles = {
            'director': 'Director',
            'administrador': 'Administrador',
            'utp': 'UTP',
            'profesor': 'Profesor'
        };
        return roles[rol] || rol;
    }

    formatTiempo(timestamp) {
        const ahora = Date.now();
        const diff = ahora - timestamp;
        
        if (diff < 60000) return 'Ahora';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
        
        const fecha = new Date(timestamp);
        return `${fecha.getDate()}/${fecha.getMonth() + 1}`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    buscarConversacion(query) {
        // Implementar búsqueda
        console.log('Buscar:', query);
    }
}

// Exportar instancia global
window.chatUI = new ChatUI();
