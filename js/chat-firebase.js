// Chat Firebase - Conexión y Operaciones de Base de Datos
class ChatFirebase {
    constructor() {
        this.db = null;
        this.currentUser = null;
        this.colegioId = null;
        this.listeners = [];
    }

    // Inicializar conexión
    async init(user) {
        this.currentUser = user;
        this.colegioId = user.colegioId;
        
        // En modo demo, usamos localStorage
        if (!localStorage.getItem('chatData')) {
            this.initDemoData();
        }
        
        // Actualizar estado del usuario a online
        this.updateUserStatus('online');
        
        // Listener para detectar cuando el usuario cierra la pestaña
        window.addEventListener('beforeunload', () => {
            this.updateUserStatus('offline');
        });
        
        return true;
    }

    // Inicializar datos demo
    initDemoData() {
        const demoData = {
            conversaciones: {},
            mensajes: {},
            usuarios: {},
            ultimoId: 0
        };
        localStorage.setItem('chatData', JSON.stringify(demoData));
    }

    // Obtener datos del chat
    getChatData() {
        return JSON.parse(localStorage.getItem('chatData') || '{}');
    }

    // Guardar datos del chat
    saveChatData(data) {
        localStorage.setItem('chatData', JSON.stringify(data));
    }

    // Actualizar estado del usuario
    updateUserStatus(status) {
        const data = this.getChatData();
        
        if (!data.usuarios[this.colegioId]) {
            data.usuarios[this.colegioId] = {};
        }
        
        data.usuarios[this.colegioId][this.currentUser.email] = {
            nombre: this.currentUser.nombre,
            email: this.currentUser.email,
            rol: this.currentUser.rol,
            estado: status,
            ultimaConexion: Date.now(),
            colegioId: this.colegioId
        };
        
        this.saveChatData(data);
    }

    // Obtener usuarios del colegio
    getUsuariosColegio() {
        const data = this.getChatData();
        const usuarios = data.usuarios[this.colegioId] || {};
        
        // Filtrar según permisos
        const usuariosPermitidos = Object.values(usuarios).filter(usuario => {
            if (usuario.email === this.currentUser.email) return false;
            
            // Director, Admin y UTP pueden ver a todos
            if (['director', 'administrador', 'utp'].includes(this.currentUser.rol)) {
                return true;
            }
            
            // Profesores solo ven a directivos y otros profesores
            if (this.currentUser.rol === 'profesor') {
                return ['director', 'administrador', 'utp', 'profesor'].includes(usuario.rol);
            }
            
            return false;
        });
        
        return usuariosPermitidos;
    }

    // Crear o obtener conversación privada
    getOrCreateConversacion(usuarioEmail) {
        const data = this.getChatData();
        
        if (!data.conversaciones[this.colegioId]) {
            data.conversaciones[this.colegioId] = {};
        }
        
        // Buscar conversación existente
        const conversaciones = data.conversaciones[this.colegioId];
        const convExistente = Object.entries(conversaciones).find(([id, conv]) => {
            return conv.tipo === 'privada' && 
                   conv.participantes.includes(this.currentUser.email) &&
                   conv.participantes.includes(usuarioEmail);
        });
        
        if (convExistente) {
            return convExistente[0];
        }
        
        // Crear nueva conversación
        const convId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        conversaciones[convId] = {
            tipo: 'privada',
            participantes: [this.currentUser.email, usuarioEmail],
            ultimoMensaje: '',
            ultimaActualizacion: Date.now(),
            noLeidos: {
                [this.currentUser.email]: 0,
                [usuarioEmail]: 0
            }
        };
        
        data.conversaciones[this.colegioId] = conversaciones;
        this.saveChatData(data);
        
        return convId;
    }

    // Obtener conversación grupal del colegio
    getOrCreateConversacionGrupal() {
        const data = this.getChatData();
        
        if (!data.conversaciones[this.colegioId]) {
            data.conversaciones[this.colegioId] = {};
        }
        
        const conversaciones = data.conversaciones[this.colegioId];
        const convGrupal = Object.entries(conversaciones).find(([id, conv]) => {
            return conv.tipo === 'grupal';
        });
        
        if (convGrupal) {
            return convGrupal[0];
        }
        
        // Crear conversación grupal
        const convId = `conv_grupo_${this.colegioId}`;
        const usuarios = this.getUsuariosColegio();
        const participantes = [this.currentUser.email, ...usuarios.map(u => u.email)];
        
        conversaciones[convId] = {
            tipo: 'grupal',
            nombre: `Todos - ${this.currentUser.colegio || 'Colegio'}`,
            participantes: participantes,
            ultimoMensaje: '',
            ultimaActualizacion: Date.now()
        };
        
        data.conversaciones[this.colegioId] = conversaciones;
        this.saveChatData(data);
        
        return convId;
    }

    // Enviar mensaje
    enviarMensaje(conversacionId, contenido) {
        const data = this.getChatData();
        
        if (!data.mensajes[conversacionId]) {
            data.mensajes[conversacionId] = {};
        }
        
        const mensajeId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const mensaje = {
            id: mensajeId,
            emisor: this.currentUser.email,
            emisorNombre: this.currentUser.nombre,
            contenido: contenido,
            timestamp: Date.now(),
            leido: false,
            tipo: 'texto'
        };
        
        data.mensajes[conversacionId][mensajeId] = mensaje;
        
        // Actualizar última actualización de la conversación
        if (data.conversaciones[this.colegioId] && data.conversaciones[this.colegioId][conversacionId]) {
            data.conversaciones[this.colegioId][conversacionId].ultimoMensaje = contenido;
            data.conversaciones[this.colegioId][conversacionId].ultimaActualizacion = Date.now();
            
            // Incrementar contador de no leídos para otros participantes
            const conv = data.conversaciones[this.colegioId][conversacionId];
            if (conv.noLeidos) {
                conv.participantes.forEach(participante => {
                    if (participante !== this.currentUser.email) {
                        conv.noLeidos[participante] = (conv.noLeidos[participante] || 0) + 1;
                    }
                });
            }
        }
        
        this.saveChatData(data);
        
        // Disparar evento de nuevo mensaje
        window.dispatchEvent(new CustomEvent('nuevoMensaje', { 
            detail: { conversacionId, mensaje } 
        }));
        
        return mensaje;
    }

    // Obtener mensajes de una conversación
    getMensajes(conversacionId, limite = 50) {
        const data = this.getChatData();
        const mensajes = data.mensajes[conversacionId] || {};
        
        return Object.values(mensajes)
            .sort((a, b) => a.timestamp - b.timestamp)
            .slice(-limite);
    }

    // Marcar mensajes como leídos
    marcarComoLeido(conversacionId) {
        const data = this.getChatData();
        
        if (data.conversaciones[this.colegioId] && 
            data.conversaciones[this.colegioId][conversacionId] &&
            data.conversaciones[this.colegioId][conversacionId].noLeidos) {
            
            data.conversaciones[this.colegioId][conversacionId].noLeidos[this.currentUser.email] = 0;
            this.saveChatData(data);
        }
        
        // Marcar mensajes individuales como leídos
        if (data.mensajes[conversacionId]) {
            Object.values(data.mensajes[conversacionId]).forEach(mensaje => {
                if (mensaje.emisor !== this.currentUser.email) {
                    mensaje.leido = true;
                }
            });
            this.saveChatData(data);
        }
    }

    // Obtener conversaciones del usuario
    getConversaciones() {
        const data = this.getChatData();
        const conversaciones = data.conversaciones[this.colegioId] || {};
        
        return Object.entries(conversaciones)
            .filter(([id, conv]) => conv.participantes.includes(this.currentUser.email))
            .map(([id, conv]) => ({
                id,
                ...conv
            }))
            .sort((a, b) => b.ultimaActualizacion - a.ultimaActualizacion);
    }

    // Obtener total de mensajes no leídos
    getTotalNoLeidos() {
        const conversaciones = this.getConversaciones();
        return conversaciones.reduce((total, conv) => {
            return total + (conv.noLeidos?.[this.currentUser.email] || 0);
        }, 0);
    }

    // Escuchar cambios en tiempo real (simulado con eventos)
    onMensajesChange(conversacionId, callback) {
        const handler = (event) => {
            if (event.detail.conversacionId === conversacionId) {
                callback(this.getMensajes(conversacionId));
            }
        };
        
        window.addEventListener('nuevoMensaje', handler);
        this.listeners.push({ event: 'nuevoMensaje', handler });
        
        // Llamar callback inicial
        callback(this.getMensajes(conversacionId));
    }

    // Escuchar cambios en conversaciones
    onConversacionesChange(callback) {
        const handler = () => {
            callback(this.getConversaciones());
        };
        
        window.addEventListener('nuevoMensaje', handler);
        this.listeners.push({ event: 'nuevoMensaje', handler });
        
        // Llamar callback inicial
        callback(this.getConversaciones());
    }

    // Limpiar listeners
    cleanup() {
        this.listeners.forEach(({ event, handler }) => {
            window.removeEventListener(event, handler);
        });
        this.listeners = [];
        this.updateUserStatus('offline');
    }
}

// Exportar instancia global
window.chatFirebase = new ChatFirebase();
