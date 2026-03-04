/**
 * EDUGEST - Datos de Prueba
 * Generación automática de datos para demostración
 */

// Usuarios de demostración actualizados con multi-colegio
const DEMO_USERS_EXTENDED = {
    // Admin Global
    'admin@edugest.cl': {
        email: 'admin@edugest.cl',
        password: 'admin123',
        role: 'admin_global',
        name: 'Administrador Global',
        schoolId: null, // Admin puede ver todos
        active: true
    },
    
    // Colegio San José
    'director.sanjose@edugest.cl': {
        email: 'director.sanjose@edugest.cl',
        password: 'director123',
        role: 'director',
        name: 'Juan Pérez',
        schoolId: 'school_001',
        active: true
    },
    'docente1.sanjose@edugest.cl': {
        email: 'docente1.sanjose@edugest.cl',
        password: 'docente123',
        role: 'docente',
        name: 'María González',
        schoolId: 'school_001',
        active: true
    },
    'docente2.sanjose@edugest.cl': {
        email: 'docente2.sanjose@edugest.cl',
        password: 'docente123',
        role: 'docente',
        name: 'Pedro Martínez',
        schoolId: 'school_001',
        active: true
    },
    'docente3.sanjose@edugest.cl': {
        email: 'docente3.sanjose@edugest.cl',
        password: 'docente123',
        role: 'docente',
        name: 'Ana Silva',
        schoolId: 'school_001',
        active: true
    },
    'tecnico.sanjose@edugest.cl': {
        email: 'tecnico.sanjose@edugest.cl',
        password: 'tecnico123',
        role: 'tecnico',
        name: 'Carlos Ramírez',
        schoolId: 'school_001',
        active: true
    },
    
    // Liceo Técnico Norte
    'director.norte@edugest.cl': {
        email: 'director.norte@edugest.cl',
        password: 'director123',
        role: 'director',
        name: 'Roberto Flores',
        schoolId: 'school_002',
        active: true
    },
    'docente1.norte@edugest.cl': {
        email: 'docente1.norte@edugest.cl',
        password: 'docente123',
        role: 'docente',
        name: 'Laura Díaz',
        schoolId: 'school_002',
        active: true
    },
    'docente2.norte@edugest.cl': {
        email: 'docente2.norte@edugest.cl',
        password: 'docente123',
        role: 'docente',
        name: 'Jorge Vargas',
        schoolId: 'school_002',
        active: true
    },
    'docente3.norte@edugest.cl': {
        email: 'docente3.norte@edugest.cl',
        password: 'docente123',
        role: 'docente',
        name: 'Patricia Rojas',
        schoolId: 'school_002',
        active: true
    },
    'tecnico.norte@edugest.cl': {
        email: 'tecnico.norte@edugest.cl',
        password: 'tecnico123',
        role: 'tecnico',
        name: 'Miguel Torres',
        schoolId: 'school_002',
        active: true
    },
    
    // Escuela Básica Sur
    'director.sur@edugest.cl': {
        email: 'director.sur@edugest.cl',
        password: 'director123',
        role: 'director',
        name: 'Carmen Muñoz',
        schoolId: 'school_003',
        active: true
    },
    'docente1.sur@edugest.cl': {
        email: 'docente1.sur@edugest.cl',
        password: 'docente123',
        role: 'docente',
        name: 'Felipe Castro',
        schoolId: 'school_003',
        active: true
    },
    'docente2.sur@edugest.cl': {
        email: 'docente2.sur@edugest.cl',
        password: 'docente123',
        role: 'docente',
        name: 'Daniela Soto',
        schoolId: 'school_003',
        active: true
    },
    'docente3.sur@edugest.cl': {
        email: 'docente3.sur@edugest.cl',
        password: 'docente123',
        role: 'docente',
        name: 'Ricardo Pinto',
        schoolId: 'school_003',
        active: true
    },
    'tecnico.sur@edugest.cl': {
        email: 'tecnico.sur@edugest.cl',
        password: 'tecnico123',
        role: 'tecnico',
        name: 'Valentina Herrera',
        schoolId: 'school_003',
        active: true
    }
};

/**
 * Generar eventos de prueba
 */
function generateDemoEvents(schoolId, count = 20) {
    const areas = ['Currículo', 'Liderazgo', 'Convivencia', 'Recursos'];
    const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    const actividades = [
        'Taller de capacitación docente',
        'Reunión de coordinación',
        'Evaluación de aprendizajes',
        'Jornada de planificación',
        'Actividad de convivencia escolar',
        'Consejo de profesores',
        'Reunión de apoderados',
        'Actividad extracurricular',
        'Evaluación institucional',
        'Capacitación en TIC'
    ];
    
    const events = [];
    const docentes = Object.values(DEMO_USERS_EXTENDED).filter(u => u.schoolId === schoolId && u.role === 'docente');
    
    for (let i = 0; i < count; i++) {
        const area = areas[Math.floor(Math.random() * areas.length)];
        const mes = meses[Math.floor(Math.random() * meses.length)];
        const actividad = actividades[Math.floor(Math.random() * actividades.length)];
        const docente = docentes[Math.floor(Math.random() * docentes.length)];
        const exito = Math.random() > 0.2; // 80% de éxito
        
        events.push({
            id: `event_${schoolId}_${i}`,
            schoolId: schoolId,
            area: area,
            mes: mes,
            actividad: actividad,
            responsable: docente?.name || 'Docente',
            metaEsperada: Math.floor(Math.random() * 20) + 80,
            metaAlcanzada: exito ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 50,
            observaciones: exito ? 'Actividad realizada exitosamente' : 'Requiere seguimiento',
            fecha: new Date(2026, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
            createdBy: docente?.email || 'demo@edugest.cl',
            createdAt: new Date().toISOString()
        });
    }
    
    return events;
}

/**
 * Generar eventos de calendario
 */
function generateCalendarEvents(schoolId, count = 10) {
    const areas = ['Currículo', 'Liderazgo', 'Convivencia', 'Recursos'];
    const eventos = [
        'Consejo de Profesores',
        'Reunión de Apoderados',
        'Evaluación Institucional',
        'Capacitación Docente',
        'Actividad Extracurricular',
        'Jornada de Planificación',
        'Ceremonia Escolar',
        'Taller para Padres'
    ];
    
    const calendarEvents = [];
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
        const daysOffset = Math.floor(Math.random() * 60) - 15; // -15 a +45 días
        const eventDate = new Date(now.getTime() + (daysOffset * 24 * 60 * 60 * 1000));
        
        calendarEvents.push({
            id: `cal_${schoolId}_${i}`,
            schoolId: schoolId,
            title: eventos[Math.floor(Math.random() * eventos.length)],
            description: 'Evento programado del PME',
            date: eventDate.toISOString().split('T')[0],
            time: `${Math.floor(Math.random() * 6) + 8}:00`,
            area: areas[Math.floor(Math.random() * areas.length)],
            responsible: 'Equipo Directivo',
            createdAt: new Date().toISOString()
        });
    }
    
    return calendarEvents;
}

/**
 * Generar notificaciones de prueba
 */
function generateNotifications(userEmail, count = 5) {
    const types = [
        'event_upcoming',
        'report_pending',
        'low_performance',
        'document_uploaded',
        'approval_required'
    ];
    
    const messages = {
        event_upcoming: ['Evento próximo: Consejo de Profesores', 'Recordatorio: Reunión de Apoderados en 3 días'],
        report_pending: ['Informe PME pendiente de envío', 'Recordatorio: Completar informe mensual'],
        low_performance: ['Área Currículo bajo el 70%', 'Alerta: Bajo rendimiento en Convivencia'],
        document_uploaded: ['Nuevo documento: Acta de reunión', 'Evidencia subida: Fotos actividad'],
        approval_required: ['Evento requiere aprobación', 'Solicitud de aprobación pendiente']
    };
    
    const notifications = [];
    
    for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const messageList = messages[type];
        const message = messageList[Math.floor(Math.random() * messageList.length)];
        
        notifications.push({
            id: `notif_${Date.now()}_${i}`,
            type: type,
            title: 'Notificación',
            message: message,
            read: Math.random() > 0.5,
            createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        });
    }
    
    return notifications;
}

/**
 * Cargar todos los datos de prueba
 */
function loadAllDemoData() {
    console.log('🚀 Cargando datos de prueba...');
    
    // Cargar eventos PME para cada colegio
    ['school_001', 'school_002', 'school_003'].forEach(schoolId => {
        const events = generateDemoEvents(schoolId, 25);
        localStorage.setItem(`edugest_events_${schoolId}`, JSON.stringify(events));
        console.log(`✓ ${events.length} eventos cargados para ${schoolId}`);
        
        // Cargar eventos de calendario
        const calendarEvents = generateCalendarEvents(schoolId, 12);
        localStorage.setItem(`edugest_calendar_${schoolId}`, JSON.stringify(calendarEvents));
        console.log(`✓ ${calendarEvents.length} eventos de calendario para ${schoolId}`);
    });
    
    // Cargar notificaciones para algunos usuarios
    Object.keys(DEMO_USERS_EXTENDED).slice(0, 5).forEach(email => {
        const notifications = generateNotifications(email, 8);
        localStorage.setItem(`edugest_notifications_${email}`, JSON.stringify(notifications));
    });
    console.log('✓ Notificaciones cargadas');
    
    console.log('✅ Datos de prueba cargados exitosamente');
    console.log('\n📋 USUARIOS DE PRUEBA:');
    console.log('Admin Global: admin@edugest.cl / admin123');
    console.log('\nColegio San José:');
    console.log('  Director: director.sanjose@edugest.cl / director123');
    console.log('  Docente: docente1.sanjose@edugest.cl / docente123');
    console.log('  Técnico: tecnico.sanjose@edugest.cl / tecnico123');
    console.log('\nLiceo Técnico Norte:');
    console.log('  Director: director.norte@edugest.cl / director123');
    console.log('  Docente: docente1.norte@edugest.cl / docente123');
    console.log('\nEscuela Básica Sur:');
    console.log('  Director: director.sur@edugest.cl / director123');
    console.log('  Docente: docente1.sur@edugest.cl / docente123');
}

/**
 * Limpiar todos los datos de prueba
 */
function clearAllDemoData() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('edugest_'));
    keys.forEach(key => localStorage.removeItem(key));
    console.log('🗑️ Datos de prueba eliminados');
}

/**
 * Verificar si hay datos cargados
 */
function hasDemoData() {
    return localStorage.getItem('edugest_events_school_001') !== null;
}

// Exportar para uso global
window.EdugestDemoData = {
    DEMO_USERS_EXTENDED,
    generateDemoEvents,
    generateCalendarEvents,
    generateNotifications,
    loadAllDemoData,
    clearAllDemoData,
    hasDemoData
};

// Auto-cargar datos si no existen
document.addEventListener('DOMContentLoaded', () => {
    if (!hasDemoData()) {
        console.log('No se encontraron datos de prueba. Ejecuta: EdugestDemoData.loadAllDemoData()');
    }
});
