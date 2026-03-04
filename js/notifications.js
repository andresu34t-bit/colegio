/**
 * EDUGEST - Sistema de Notificaciones
 * Gestión de alertas y notificaciones en tiempo real
 */

// Tipos de notificaciones
const NOTIFICATION_TYPES = {
    EVENT_UPCOMING: 'event_upcoming',
    REPORT_PENDING: 'report_pending',
    LOW_PERFORMANCE: 'low_performance',
    NEW_MESSAGE: 'new_message',
    DOCUMENT_UPLOADED: 'document_uploaded',
    APPROVAL_REQUIRED: 'approval_required',
    SYSTEM: 'system'
};

// Iconos por tipo
const NOTIFICATION_ICONS = {
    [NOTIFICATION_TYPES.EVENT_UPCOMING]: '📅',
    [NOTIFICATION_TYPES.REPORT_PENDING]: '📄',
    [NOTIFICATION_TYPES.LOW_PERFORMANCE]: '⚠️',
    [NOTIFICATION_TYPES.NEW_MESSAGE]: '💬',
    [NOTIFICATION_TYPES.DOCUMENT_UPLOADED]: '📁',
    [NOTIFICATION_TYPES.APPROVAL_REQUIRED]: '✅',
    [NOTIFICATION_TYPES.SYSTEM]: 'ℹ️'
};

// Almacenamiento de notificaciones
let notifications = [];
let unreadCount = 0;

/**
 * Inicializar sistema de notificaciones
 */
function initNotifications() {
    loadNotifications();
    updateBadge();
    checkUpcomingEvents();
    
    // Verificar nuevas notificaciones cada 30 segundos
    setInterval(() => {
        checkUpcomingEvents();
        updateBadge();
    }, 30000);
}

/**
 * Cargar notificaciones desde localStorage
 */
function loadNotifications() {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return;
    
    const key = `edugest_notifications_${user.email}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
        try {
            notifications = JSON.parse(stored);
        } catch (e) {
            notifications = [];
        }
    }
    
    // Calcular no leídas
    unreadCount = notifications.filter(n => !n.read).length;
}

/**
 * Guardar notificaciones en localStorage
 */
function saveNotifications() {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return;
    
    const key = `edugest_notifications_${user.email}`;
    localStorage.setItem(key, JSON.stringify(notifications));
}

/**
 * Crear nueva notificación
 */
function createNotification(type, title, message, data = {}) {
    const notification = {
        id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type,
        title,
        message,
        data,
        read: false,
        createdAt: new Date().toISOString()
    };
    
    notifications.unshift(notification);
    unreadCount++;
    
    saveNotifications();
    updateBadge();
    showToast(notification);
    
    return notification;
}

/**
 * Marcar notificación como leída
 */
function markAsRead(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    
    if (notification && !notification.read) {
        notification.read = true;
        unreadCount = Math.max(0, unreadCount - 1);
        saveNotifications();
        updateBadge();
    }
}

/**
 * Marcar todas como leídas
 */
function markAllAsRead() {
    notifications.forEach(n => n.read = true);
    unreadCount = 0;
    saveNotifications();
    updateBadge();
}

/**
 * Eliminar notificación
 */
function deleteNotification(notificationId) {
    const index = notifications.findIndex(n => n.id === notificationId);
    
    if (index !== -1) {
        const notification = notifications[index];
        if (!notification.read) {
            unreadCount = Math.max(0, unreadCount - 1);
        }
        notifications.splice(index, 1);
        saveNotifications();
        updateBadge();
    }
}

/**
 * Limpiar notificaciones antiguas (más de 30 días)
 */
function cleanOldNotifications() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    notifications = notifications.filter(n => {
        const createdAt = new Date(n.createdAt);
        return createdAt > thirtyDaysAgo;
    });
    
    saveNotifications();
    updateBadge();
}

/**
 * Actualizar badge de notificaciones
 */
function updateBadge() {
    const badges = document.querySelectorAll('.notification-badge');
    
    badges.forEach(badge => {
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

/**
 * Mostrar toast de notificación
 */
function showToast(notification) {
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.innerHTML = `
        <div class="notification-toast-icon">${NOTIFICATION_ICONS[notification.type]}</div>
        <div class="notification-toast-content">
            <div class="notification-toast-title">${notification.title}</div>
            <div class="notification-toast-message">${notification.message}</div>
        </div>
        <button class="notification-toast-close" onclick="this.parentElement.remove()">✕</button>
    `;
    
    document.body.appendChild(toast);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

/**
 * Verificar eventos próximos
 */
function checkUpcomingEvents() {
    // En producción, esto consultaría la base de datos
    // Por ahora, es una simulación
    
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return;
    
    // Simular verificación de eventos próximos
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
    
    // Aquí se verificarían eventos reales de la base de datos
    // Por ahora, solo es una demostración
}

/**
 * Renderizar centro de notificaciones
 */
function renderNotificationCenter(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (notifications.length === 0) {
        container.innerHTML = `
            <div class="notification-empty">
                <div class="notification-empty-icon">🔔</div>
                <div class="notification-empty-text">No tienes notificaciones</div>
            </div>
        `;
        return;
    }
    
    const html = notifications.map(n => `
        <div class="notification-item ${n.read ? 'read' : 'unread'}" data-id="${n.id}">
            <div class="notification-icon">${NOTIFICATION_ICONS[n.type]}</div>
            <div class="notification-content">
                <div class="notification-title">${n.title}</div>
                <div class="notification-message">${n.message}</div>
                <div class="notification-time">${formatNotificationTime(n.createdAt)}</div>
            </div>
            <div class="notification-actions">
                ${!n.read ? `<button class="btn-icon" onclick="window.EdugestNotifications.markAsRead('${n.id}')" title="Marcar como leída">✓</button>` : ''}
                <button class="btn-icon" onclick="window.EdugestNotifications.deleteNotification('${n.id}')" title="Eliminar">🗑️</button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

/**
 * Formatear tiempo de notificación
 */
function formatNotificationTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours} h`;
    if (days < 7) return `Hace ${days} días`;
    
    return time.toLocaleDateString('es-CL');
}

/**
 * Obtener notificaciones no leídas
 */
function getUnreadNotifications() {
    return notifications.filter(n => !n.read);
}

/**
 * Obtener todas las notificaciones
 */
function getAllNotifications() {
    return notifications;
}

/**
 * Obtener contador de no leídas
 */
function getUnreadCount() {
    return unreadCount;
}

// Exportar para uso global
window.EdugestNotifications = {
    NOTIFICATION_TYPES,
    initNotifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    cleanOldNotifications,
    renderNotificationCenter,
    getUnreadNotifications,
    getAllNotifications,
    getUnreadCount
};

// Auto-inicializar si hay usuario logueado
document.addEventListener('DOMContentLoaded', () => {
    const user = window.EdugestRoles?.getCurrentUser();
    if (user) {
        initNotifications();
    }
});
