// Chat Badge - Actualizar contador de mensajes no leídos en todas las páginas
(function() {
    'use strict';
    
    function updateChatBadge() {
        const badge = document.getElementById('chatBadge');
        if (!badge) return;
        
        try {
            // Obtener mensajes del localStorage
            const messages = JSON.parse(localStorage.getItem('chat_demo_messages') || '{}');
            const session = JSON.parse(localStorage.getItem('edugest_session') || '{}');
            
            if (!session.userId) return;
            
            // Contar mensajes no leídos
            let unreadCount = 0;
            
            for (const conversationId in messages) {
                const conversationMessages = messages[conversationId];
                
                conversationMessages.forEach(msg => {
                    if (msg.recipientId === session.userId && !msg.read) {
                        unreadCount++;
                    }
                });
            }
            
            // Actualizar badge
            if (unreadCount > 0) {
                badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        } catch (error) {
            console.error('Error al actualizar badge del chat:', error);
        }
    }
    
    // Actualizar al cargar la página
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateChatBadge);
    } else {
        updateChatBadge();
    }
    
    // Actualizar cada 5 segundos
    setInterval(updateChatBadge, 5000);
    
    // Actualizar cuando cambie el localStorage (sincronización entre pestañas)
    window.addEventListener('storage', (e) => {
        if (e.key === 'chat_demo_messages') {
            updateChatBadge();
        }
    });
})();
