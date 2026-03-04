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
 * Generar eventos de prueba COMPLETOS Y REALISTAS
 */
function generateDemoEvents(schoolId, count = 50) {
    const areas = ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'];
    const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    
    // Actividades detalladas por área
    const actividadesPorArea = {
        'Currículum': [
            'Taller de estrategias pedagógicas innovadoras',
            'Capacitación en evaluación formativa',
            'Jornada de planificación curricular',
            'Implementación de metodologías activas',
            'Evaluación de aprendizajes por competencias',
            'Taller de diferenciación en el aula',
            'Capacitación en uso de TIC en el aula',
            'Análisis de resultados de aprendizaje',
            'Diseño de unidades didácticas',
            'Taller de retroalimentación efectiva',
            'Implementación de ABP (Aprendizaje Basado en Proyectos)',
            'Capacitación en DUA (Diseño Universal de Aprendizaje)',
            'Evaluación diagnóstica integral',
            'Taller de lectoescritura inicial',
            'Capacitación en matemática para la vida'
        ],
        'Liderazgo': [
            'Consejo de profesores mensual',
            'Reunión de coordinación académica',
            'Jornada de planificación estratégica',
            'Evaluación institucional semestral',
            'Reunión de equipo directivo',
            'Análisis de indicadores de gestión',
            'Planificación del PME anual',
            'Reunión con sostenedor',
            'Jornada de autocuidado docente',
            'Evaluación de desempeño docente',
            'Reunión de articulación entre niveles',
            'Planificación de recursos educativos',
            'Análisis de clima laboral',
            'Reunión de mejora continua',
            'Jornada de trabajo colaborativo'
        ],
        'Convivencia': [
            'Taller de resolución de conflictos',
            'Actividad de convivencia escolar',
            'Reunión de apoderados por curso',
            'Jornada de prevención del bullying',
            'Taller de habilidades socioemocionales',
            'Actividad de integración familiar',
            'Charla de salud mental estudiantil',
            'Taller de parentalidad positiva',
            'Actividad recreativa y deportiva',
            'Jornada de valores y ética',
            'Taller de mediación escolar',
            'Actividad de inclusión y diversidad',
            'Charla de prevención de drogas',
            'Taller de comunicación efectiva',
            'Actividad de vida saludable'
        ],
        'Recursos': [
            'Gestión de recursos materiales',
            'Planificación presupuestaria',
            'Adquisición de material didáctico',
            'Mantención de infraestructura',
            'Gestión de biblioteca escolar',
            'Implementación de laboratorio',
            'Adquisición de tecnología educativa',
            'Gestión de recursos humanos',
            'Optimización de espacios educativos',
            'Gestión de inventario',
            'Planificación de inversiones',
            'Gestión de proveedores',
            'Implementación de sala de recursos',
            'Gestión de transporte escolar',
            'Optimización de recursos energéticos'
        ]
    };
    
    // Subdimensiones por área
    const subdimensiones = {
        'Currículum': ['Gestión Pedagógica', 'Enseñanza y Aprendizaje', 'Apoyo al Desarrollo'],
        'Liderazgo': ['Liderazgo del Director', 'Planificación y Gestión', 'Gestión de Resultados'],
        'Convivencia': ['Formación', 'Convivencia Escolar', 'Participación y Vida Democrática'],
        'Recursos': ['Gestión de Personal', 'Gestión de Recursos Financieros', 'Gestión de Recursos Educativos']
    };
    
    // Objetivos estratégicos por área
    const objetivos = {
        'Currículum': [
            'Mejorar los resultados de aprendizaje en todas las asignaturas',
            'Implementar prácticas pedagógicas innovadoras y efectivas',
            'Fortalecer el desarrollo integral de los estudiantes',
            'Mejorar la calidad de la enseñanza mediante capacitación docente'
        ],
        'Liderazgo': [
            'Fortalecer el liderazgo pedagógico del equipo directivo',
            'Mejorar la gestión institucional y administrativa',
            'Promover el trabajo colaborativo y la mejora continua',
            'Optimizar los procesos de planificación y evaluación'
        ],
        'Convivencia': [
            'Promover un clima escolar positivo y seguro',
            'Fortalecer la participación de la comunidad educativa',
            'Desarrollar habilidades socioemocionales en los estudiantes',
            'Mejorar la relación familia-escuela'
        ],
        'Recursos': [
            'Optimizar el uso de recursos materiales y financieros',
            'Mejorar la infraestructura y equipamiento educativo',
            'Fortalecer la gestión de recursos humanos',
            'Asegurar la sustentabilidad financiera del establecimiento'
        ]
    };
    
    const events = [];
    const docentes = Object.values(DEMO_USERS_EXTENDED).filter(u => u.schoolId === schoolId && u.role === 'docente');
    
    for (let i = 0; i < count; i++) {
        const area = areas[Math.floor(Math.random() * areas.length)];
        const mesIndex = Math.floor(Math.random() * 12);
        const mes = meses[mesIndex];
        const actividades = actividadesPorArea[area];
        const actividad = actividades[Math.floor(Math.random() * actividades.length)];
        const docente = docentes[Math.floor(Math.random() * docentes.length)];
        const exito = Math.random() > 0.15; // 85% de éxito
        
        const metaEsperada = Math.floor(Math.random() * 20) + 80;
        const metaAlcanzada = exito 
            ? Math.floor(Math.random() * 15) + 85 
            : Math.floor(Math.random() * 25) + 55;
        
        const porcentajeLogro = Math.round((metaAlcanzada / metaEsperada) * 100);
        const numeroEventos = Math.floor(Math.random() * 3) + 1;
        
        events.push({
            id: `event_${schoolId}_${i}`,
            schoolId: schoolId,
            area: area,
            subdimension: subdimensiones[area][Math.floor(Math.random() * subdimensiones[area].length)],
            objetivoEstrategico: objetivos[area][Math.floor(Math.random() * objetivos[area].length)],
            estrategia: actividad,
            mes: mes,
            actividad: actividad,
            descripcion: `${actividad} realizada con el objetivo de mejorar los procesos educativos en el área de ${area}. Participaron ${numeroEventos} grupos de trabajo.`,
            responsable: docente?.name || 'Docente',
            numeroEventos: numeroEventos,
            metaEsperada: metaEsperada,
            metaAlcanzada: metaAlcanzada,
            porcentajeLogro: porcentajeLogro,
            porcentajeMeta: Math.round((metaAlcanzada / 100) * 100),
            observaciones: exito 
                ? `Actividad realizada exitosamente. Se cumplieron los objetivos propuestos con un ${porcentajeLogro}% de logro.`
                : `Actividad realizada con dificultades. Se requiere seguimiento y apoyo adicional. Logro: ${porcentajeLogro}%.`,
            fecha: new Date(2026, mesIndex, Math.floor(Math.random() * 28) + 1).toISOString(),
            createdBy: docente?.email || 'demo@edugest.cl',
            createdAt: new Date(2026, mesIndex, Math.floor(Math.random() * 28) + 1).toISOString()
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
    console.log('🚀 Cargando datos de prueba completos...');
    
    // Cargar eventos PME para cada colegio (50 eventos por colegio = 150 total)
    ['school_001', 'school_002', 'school_003'].forEach(schoolId => {
        const events = generateDemoEvents(schoolId, 50);
        localStorage.setItem(`edugest_events_${schoolId}`, JSON.stringify(events));
        
        // También guardar en formato legacy para compatibilidad con informes
        if (schoolId === 'school_001') {
            localStorage.setItem('eventos', JSON.stringify(events));
        }
        
        console.log(`✓ ${events.length} eventos PME cargados para ${schoolId}`);
        
        // Cargar eventos de calendario
        const calendarEvents = generateCalendarEvents(schoolId, 15);
        localStorage.setItem(`edugest_calendar_${schoolId}`, JSON.stringify(calendarEvents));
        console.log(`✓ ${calendarEvents.length} eventos de calendario para ${schoolId}`);
    });
    
    // Cargar notificaciones para usuarios clave
    const keyUsers = [
        'admin@edugest.cl',
        'director.sanjose@edugest.cl',
        'director.norte@edugest.cl',
        'director.sur@edugest.cl',
        'docente1.sanjose@edugest.cl'
    ];
    
    keyUsers.forEach(email => {
        const notifications = generateNotifications(email, 12);
        localStorage.setItem(`edugest_notifications_${email}`, JSON.stringify(notifications));
    });
    console.log('✓ Notificaciones cargadas para usuarios clave');
    
    // Cargar información general del colegio
    const infoGeneral = {
        nombreColegio: 'Colegio San José',
        rbd: '12345-6',
        director: 'Juan Pérez',
        año: '2026',
        region: 'Metropolitana',
        comuna: 'Santiago',
        direccion: 'Av. Principal 123',
        telefono: '+56 2 2345 6789',
        email: 'contacto@sanjose.cl'
    };
    localStorage.setItem('informacionesGenerales', JSON.stringify(infoGeneral));
    console.log('✓ Información general del colegio cargada');
    
    console.log('✅ Datos de prueba cargados exitosamente');
    console.log('\n📊 RESUMEN DE DATOS:');
    console.log('- 150 eventos PME (50 por colegio)');
    console.log('- 45 eventos de calendario');
    console.log('- 60+ notificaciones');
    console.log('- 16 usuarios activos');
    console.log('- 3 colegios configurados');
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
    console.log('\n💡 TIP: Inicia sesión y explora el sistema completo!');
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
