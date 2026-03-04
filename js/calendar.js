/**
 * EDUGEST - Sistema de Calendario
 * Gestión de eventos y planificación
 */

// Meses del año
const MONTHS = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Días de la semana
const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// Estado del calendario
let currentDate = new Date();
let calendarEvents = [];

/**
 * Inicializar calendario
 */
function initCalendar() {
    loadCalendarEvents();
}

/**
 * Cargar eventos del calendario
 */
function loadCalendarEvents() {
    // En producción, esto vendría de la base de datos
    // Por ahora, cargar desde localStorage
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return;
    
    const key = `edugest_calendar_${user.schoolId}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
        try {
            calendarEvents = JSON.parse(stored);
        } catch (e) {
            calendarEvents = [];
        }
    }
}

/**
 * Guardar eventos del calendario
 */
function saveCalendarEvents() {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return;
    
    const key = `edugest_calendar_${user.schoolId}`;
    localStorage.setItem(key, JSON.stringify(calendarEvents));
}

/**
 * Renderizar calendario
 */
function renderCalendar(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Días del mes anterior para completar la primera semana
    const prevMonthDays = firstDay.getDay();
    
    // HTML del calendario
    let html = `
        <div class="calendar">
            <div class="calendar-header">
                <button class="btn-icon" onclick="window.EdugestCalendar.previousMonth()">◀</button>
                <h3 class="calendar-title">${MONTHS[month]} ${year}</h3>
                <button class="btn-icon" onclick="window.EdugestCalendar.nextMonth()">▶</button>
            </div>
            <div class="calendar-days">
                ${DAYS.map(day => `<div class="calendar-day-name">${day}</div>`).join('')}
            </div>
            <div class="calendar-grid">
    `;
    
    // Días del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = prevMonthDays - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        html += `<div class="calendar-cell other-month">${day}</div>`;
    }
    
    // Días del mes actual
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const isToday = isDateToday(date);
        const events = getEventsForDate(date);
        const hasEvents = events.length > 0;
        
        html += `
            <div class="calendar-cell ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}" 
                 onclick="window.EdugestCalendar.showDayEvents('${date.toISOString()}')">
                <div class="calendar-cell-day">${day}</div>
                ${hasEvents ? `<div class="calendar-cell-indicator">${events.length}</div>` : ''}
            </div>
        `;
    }
    
    // Días del mes siguiente
    const remainingCells = 42 - (prevMonthDays + lastDay.getDate());
    for (let day = 1; day <= remainingCells; day++) {
        html += `<div class="calendar-cell other-month">${day}</div>`;
    }
    
    html += `
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

/**
 * Verificar si una fecha es hoy
 */
function isDateToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

/**
 * Obtener eventos para una fecha
 */
function getEventsForDate(date) {
    const dateStr = date.toISOString().split('T')[0];
    return calendarEvents.filter(event => {
        const eventDate = new Date(event.date).toISOString().split('T')[0];
        return eventDate === dateStr;
    });
}

/**
 * Mes anterior
 */
function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar('calendar-container');
}

/**
 * Mes siguiente
 */
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar('calendar-container');
}

/**
 * Ir a hoy
 */
function goToToday() {
    currentDate = new Date();
    renderCalendar('calendar-container');
}

/**
 * Mostrar eventos del día
 */
function showDayEvents(dateStr) {
    const date = new Date(dateStr);
    const events = getEventsForDate(date);
    
    if (events.length === 0) {
        alert('No hay eventos para este día');
        return;
    }
    
    // Crear modal con eventos
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Eventos - ${date.toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                <button class="btn-close" onclick="this.closest('.modal').remove()">✕</button>
            </div>
            <div class="modal-body">
                ${events.map(event => `
                    <div class="event-item">
                        <div class="event-time">${event.time || 'Todo el día'}</div>
                        <div class="event-details">
                            <div class="event-title">${event.title}</div>
                            <div class="event-description">${event.description || ''}</div>
                            ${event.area ? `<div class="event-area">${event.area}</div>` : ''}
                            ${event.responsible ? `<div class="event-responsible">Responsable: ${event.responsible}</div>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

/**
 * Agregar evento al calendario
 */
function addEvent(eventData) {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return;
    
    const event = {
        id: `cal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: eventData.title,
        description: eventData.description || '',
        date: eventData.date,
        time: eventData.time || null,
        area: eventData.area || null,
        responsible: eventData.responsible || user.name,
        schoolId: user.schoolId,
        createdBy: user.email,
        createdAt: new Date().toISOString()
    };
    
    calendarEvents.push(event);
    saveCalendarEvents();
    
    // Crear notificación
    if (window.EdugestNotifications) {
        window.EdugestNotifications.createNotification(
            'event_upcoming',
            'Evento agregado',
            `${event.title} - ${new Date(event.date).toLocaleDateString('es-CL')}`
        );
    }
    
    return event;
}

/**
 * Eliminar evento
 */
function deleteEvent(eventId) {
    const index = calendarEvents.findIndex(e => e.id === eventId);
    
    if (index !== -1) {
        calendarEvents.splice(index, 1);
        saveCalendarEvents();
        return true;
    }
    
    return false;
}

/**
 * Obtener eventos próximos (próximos 7 días)
 */
function getUpcomingEvents(days = 7) {
    const now = new Date();
    const future = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return calendarEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= future;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Renderizar lista de eventos próximos
 */
function renderUpcomingEvents(containerId, days = 7) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const events = getUpcomingEvents(days);
    
    if (events.length === 0) {
        container.innerHTML = `
            <div class="upcoming-events-empty">
                <div class="upcoming-events-empty-icon">📅</div>
                <div class="upcoming-events-empty-text">No hay eventos próximos</div>
            </div>
        `;
        return;
    }
    
    const html = events.map(event => {
        const date = new Date(event.date);
        const daysUntil = Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24));
        
        return `
            <div class="upcoming-event-item">
                <div class="upcoming-event-date">
                    <div class="upcoming-event-day">${date.getDate()}</div>
                    <div class="upcoming-event-month">${MONTHS[date.getMonth()].substr(0, 3)}</div>
                </div>
                <div class="upcoming-event-details">
                    <div class="upcoming-event-title">${event.title}</div>
                    <div class="upcoming-event-meta">
                        ${event.time ? `${event.time} • ` : ''}
                        ${daysUntil === 0 ? 'Hoy' : daysUntil === 1 ? 'Mañana' : `En ${daysUntil} días`}
                    </div>
                    ${event.area ? `<div class="upcoming-event-area">${event.area}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
}

/**
 * Sincronizar con eventos PME
 */
function syncWithPMEEvents() {
    // En producción, esto sincronizaría con los eventos PME de la base de datos
    // Por ahora es una función placeholder
    console.log('Sincronizando con eventos PME...');
}

// Exportar para uso global
window.EdugestCalendar = {
    initCalendar,
    renderCalendar,
    previousMonth,
    nextMonth,
    goToToday,
    showDayEvents,
    addEvent,
    deleteEvent,
    getUpcomingEvents,
    renderUpcomingEvents,
    syncWithPMEEvents
};

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
    const user = window.EdugestRoles?.getCurrentUser();
    if (user) {
        initCalendar();
    }
});
