// Chat Principal - Inicialización y Coordinación
(function() {
    'use strict';
    
    // Verificar si el usuario está autenticado
    function initChat() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (!currentUser) {
            console.log('Chat: Usuario no autenticado');
            return;
        }
        
        // Inicializar Firebase
        window.chatFirebase.init(currentUser).then(() => {
            console.log('Chat Firebase inicializado');
            
            // Inicializar UI
            window.chatUI.init();
            console.log('Chat UI inicializado');
            
            // Actualizar badge inicial
            window.chatUI.updateBadge();
            
            // Escuchar nuevos mensajes para notificaciones
            window.addEventListener('nuevoMensaje', (event) => {
                const { conversacionId, mensaje } = event.detail;
                
                // Si el mensaje no es del usuario actual y el chat no está abierto en esa conversación
                if (mensaje.emisor !== currentUser.email && 
                    (!window.chatUI.isOpen || window.chatUI.currentConversacion !== conversacionId)) {
                    
                    // Mostrar notificación
                    mostrarNotificacion(mensaje);
                    
                    // Reproducir sonido (opcional)
                    reproducirSonido();
                }
                
                // Actualizar badge
                window.chatUI.updateBadge();
            });
            
            console.log('✅ Chat en tiempo real activado');
        }).catch(error => {
            console.error('Error al inicializar chat:', error);
        });
    }
    
    // Mostrar notificación
    function mostrarNotificacion(mensaje) {
        // Notificación visual en la aplicación
        if (window.showMobileToast) {
            window.showMobileToast(`💬 ${mensaje.emisorNombre}: ${mensaje.contenido.substring(0, 50)}...`, 3000);
        }
        
        // Notificación del navegador (si tiene permisos)
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Nuevo mensaje - EduGest', {
                body: `${mensaje.emisorNombre}: ${mensaje.contenido}`,
                icon: 'images/logo-edugest.png',
                badge: 'images/logo-edugest.png',
                tag: 'chat-message',
                requireInteraction: false
            });
        }
    }
    
    // Reproducir sonido de notificación
    function reproducirSonido() {
        // Crear un sonido simple usando Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('No se pudo reproducir sonido:', error);
        }
    }
    
    // Solicitar permisos de notificación
    function solicitarPermisosNotificacion() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                console.log('Permiso de notificaciones:', permission);
            });
        }
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initChat();
            // Solicitar permisos después de 3 segundos (para no ser intrusivo)
            setTimeout(solicitarPermisosNotificacion, 3000);
        });
    } else {
        initChat();
        setTimeout(solicitarPermisosNotificacion, 3000);
    }
    
    // Limpiar al cerrar la página
    window.addEventListener('beforeunload', () => {
        if (window.chatFirebase) {
            window.chatFirebase.cleanup();
        }
    });
    
})();
