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
    },
    
    // Instituto Técnico Industrial
    'director.tecnico@edugest.cl': {
        email: 'director.tecnico@edugest.cl',
        password: 'industrial2026',
        role: 'director',
        name: 'Rodrigo Fuentes',
        schoolId: 'colegio-003',
        active: true
    },
    'profesor.mecanica@edugest.cl': {
        email: 'profesor.mecanica@edugest.cl',
        password: 'mecanica789',
        role: 'docente',
        name: 'Alberto Méndez',
        schoolId: 'colegio-003',
        active: true
    },
    
    // Liceo Bicentenario de Excelencia
    'director.bicentenario@edugest.cl': {
        email: 'director.bicentenario@edugest.cl',
        password: 'excel2026',
        role: 'director',
        name: 'Claudia Morales',
        schoolId: 'colegio-004',
        active: true
    },
    'profe.ciencias@edugest.cl': {
        email: 'profe.ciencias@edugest.cl',
        password: 'ciencias555',
        role: 'docente',
        name: 'Sebastián Vega',
        schoolId: 'colegio-004',
        active: true
    },
    
    // Colegio Montessori del Valle
    'coordinador.montessori@edugest.cl': {
        email: 'coordinador.montessori@edugest.cl',
        password: 'montessori321',
        role: 'director',
        name: 'Francisca Bravo',
        schoolId: 'colegio-005',
        active: true
    },
    'guia.primaria@edugest.cl': {
        email: 'guia.primaria@edugest.cl',
        password: 'guia2026',
        role: 'docente',
        name: 'Camila Espinoza',
        schoolId: 'colegio-005',
        active: true
    },
    
    // Escuela Rural Valle Verde
    'director.valleverde@edugest.cl': {
        email: 'director.valleverde@edugest.cl',
        password: 'rural2026',
        role: 'director',
        name: 'Marcelo Campos',
        schoolId: 'colegio-006',
        active: true
    },
    'maestro.multigrado@edugest.cl': {
        email: 'maestro.multigrado@edugest.cl',
        password: 'rural123',
        role: 'docente',
        name: 'Rosa Navarro',
        schoolId: 'colegio-006',
        active: true
    },
    
    // Colegio Bilingüe Internacional
    'principal.bilingual@edugest.cl': {
        email: 'principal.bilingual@edugest.cl',
        password: 'bilingual999',
        role: 'director',
        name: 'Katherine Wilson',
        schoolId: 'colegio-007',
        active: true
    },
    'teacher.english@edugest.cl': {
        email: 'teacher.english@edugest.cl',
        password: 'english2026',
        role: 'docente',
        name: 'Michael Anderson',
        schoolId: 'colegio-007',
        active: true
    },
    
    // Liceo Artístico Gabriela Mistral
    'director.artistico@edugest.cl': {
        email: 'director.artistico@edugest.cl',
        password: 'arte2026',
        role: 'director',
        name: 'Gabriela Reyes',
        schoolId: 'colegio-008',
        active: true
    },
    'maestro.musica@edugest.cl': {
        email: 'maestro.musica@edugest.cl',
        password: 'musica444',
        role: 'docente',
        name: 'Andrés Parra',
        schoolId: 'colegio-008',
        active: true
    },
    
    // Colegio Deportivo Alto Rendimiento
    'director.deportivo@edugest.cl': {
        email: 'director.deportivo@edugest.cl',
        password: 'deporte2026',
        role: 'director',
        name: 'Cristian Medina',
        schoolId: 'colegio-009',
        active: true
    },
    'coach.futbol@edugest.cl': {
        email: 'coach.futbol@edugest.cl',
        password: 'futbol777',
        role: 'docente',
        name: 'Javier Contreras',
        schoolId: 'colegio-009',
        active: true
    },
    
    // Instituto Waldorf Raíces del Sur
    'coordinador.waldorf@edugest.cl': {
        email: 'coordinador.waldorf@edugest.cl',
        password: 'waldorf2026',
        role: 'director',
        name: 'Sofía Larraín',
        schoolId: 'colegio-010',
        active: true
    },
    'maestro.waldorf@edugest.cl': {
        email: 'maestro.waldorf@edugest.cl',
        password: 'steiner888',
        role: 'docente',
        name: 'Tomás Becker',
        schoolId: 'colegio-010',
        active: true
    },
    
    // Colegio Científico Innovación
    'director.cientifico@edugest.cl': {
        email: 'director.cientifico@edugest.cl',
        password: 'innovacion2026',
        role: 'director',
        name: 'Patricia Núñez',
        schoolId: 'colegio-011',
        active: true
    },
    'profesor.robotica@edugest.cl': {
        email: 'profesor.robotica@edugest.cl',
        password: 'stem2026',
        role: 'docente',
        name: 'Diego Salazar',
        schoolId: 'colegio-011',
        active: true
    },
    
    // Escuela Básica Amanecer
    'director.amanecer@edugest.cl': {
        email: 'director.amanecer@edugest.cl',
        password: 'amanecer2026',
        role: 'director',
        name: 'Lorena Gutiérrez',
        schoolId: 'colegio-012',
        active: true
    },
    'educadora.pie@edugest.cl': {
        email: 'educadora.pie@edugest.cl',
        password: 'inclusion2026',
        role: 'docente',
        name: 'Paulina Ortiz',
        schoolId: 'colegio-012',
        active: true
    },
    
    // Colegio Alemán de Santiago
    'director.aleman@edugest.cl': {
        email: 'director.aleman@edugest.cl',
        password: 'deutsch2026',
        role: 'director',
        name: 'Hans Müller',
        schoolId: 'colegio-013',
        active: true
    },
    'lehrer.deutsch@edugest.cl': {
        email: 'lehrer.deutsch@edugest.cl',
        password: 'german888',
        role: 'docente',
        name: 'Ingrid Schmidt',
        schoolId: 'colegio-013',
        active: true
    },
    
    // Liceo Comercial Empresarial
    'director.comercial@edugest.cl': {
        email: 'director.comercial@edugest.cl',
        password: 'comercio2026',
        role: 'director',
        name: 'Mónica Tapia',
        schoolId: 'colegio-014',
        active: true
    },
    'profesor.contabilidad@edugest.cl': {
        email: 'profesor.contabilidad@edugest.cl',
        password: 'conta999',
        role: 'docente',
        name: 'Héctor Bustos',
        schoolId: 'colegio-014',
        active: true
    },
    
    // Colegio Adventista del Pacífico
    'director.adventista@edugest.cl': {
        email: 'director.adventista@edugest.cl',
        password: 'advent2026',
        role: 'director',
        name: 'Samuel Rojas',
        schoolId: 'colegio-015',
        active: true
    },
    'maestro.religion@edugest.cl': {
        email: 'maestro.religion@edugest.cl',
        password: 'faith777',
        role: 'docente',
        name: 'Rebeca Flores',
        schoolId: 'colegio-015',
        active: true
    },
    
    // Instituto Marítimo de Valparaíso
    'director.maritimo@edugest.cl': {
        email: 'director.maritimo@edugest.cl',
        password: 'marino2026',
        role: 'director',
        name: 'Capitán Jorge Navarro',
        schoolId: 'colegio-016',
        active: true
    },
    'instructor.nautica@edugest.cl': {
        email: 'instructor.nautica@edugest.cl',
        password: 'nautica555',
        role: 'docente',
        name: 'Rodrigo Marín',
        schoolId: 'colegio-016',
        active: true
    },
    
    // Colegio Ecológico Tierra Verde
    'director.ecologico@edugest.cl': {
        email: 'director.ecologico@edugest.cl',
        password: 'eco2026',
        role: 'director',
        name: 'Verónica Lagos',
        schoolId: 'colegio-017',
        active: true
    },
    'profesor.ambiental@edugest.cl': {
        email: 'profesor.ambiental@edugest.cl',
        password: 'green444',
        role: 'docente',
        name: 'Matías Prado',
        schoolId: 'colegio-017',
        active: true
    },
    
    // Liceo Agrícola Valle Fértil
    'director.agricola@edugest.cl': {
        email: 'director.agricola@edugest.cl',
        password: 'agro2026',
        role: 'director',
        name: 'Fernando Campos',
        schoolId: 'colegio-018',
        active: true
    },
    'ingeniero.agronomo@edugest.cl': {
        email: 'ingeniero.agronomo@edugest.cl',
        password: 'agro333',
        role: 'docente',
        name: 'Carolina Vergara',
        schoolId: 'colegio-018',
        active: true
    },
    
    // Colegio de Música y Danza Contemporánea
    'director.musica@edugest.cl': {
        email: 'director.musica@edugest.cl',
        password: 'music2026',
        role: 'director',
        name: 'Alejandra Soto',
        schoolId: 'colegio-019',
        active: true
    },
    'maestro.danza@edugest.cl': {
        email: 'maestro.danza@edugest.cl',
        password: 'dance666',
        role: 'docente',
        name: 'Cristóbal Muñoz',
        schoolId: 'colegio-019',
        active: true
    },
    
    // Instituto Tecnológico de Programación
    'director.programacion@edugest.cl': {
        email: 'director.programacion@edugest.cl',
        password: 'code2026',
        role: 'director',
        name: 'Andrés Valdivia',
        schoolId: 'colegio-020',
        active: true
    },
    'dev.python@edugest.cl': {
        email: 'dev.python@edugest.cl',
        password: 'python123',
        role: 'docente',
        name: 'Daniela Torres',
        schoolId: 'colegio-020',
        active: true
    },
    
    // Colegio Británico de Chile
    'headmaster.british@edugest.cl': {
        email: 'headmaster.british@edugest.cl',
        password: 'british2026',
        role: 'director',
        name: 'James Thompson',
        schoolId: 'colegio-021',
        active: true
    },
    'teacher.cambridge@edugest.cl': {
        email: 'teacher.cambridge@edugest.cl',
        password: 'cambridge999',
        role: 'docente',
        name: 'Emma Watson',
        schoolId: 'colegio-021',
        active: true
    },
    
    // Escuela de Gastronomía Culinaria
    'director.gastronomia@edugest.cl': {
        email: 'director.gastronomia@edugest.cl',
        password: 'chef2026',
        role: 'director',
        name: 'Chef Rodrigo Barros',
        schoolId: 'colegio-022',
        active: true
    },
    'chef.instructor@edugest.cl': {
        email: 'chef.instructor@edugest.cl',
        password: 'cocina777',
        role: 'docente',
        name: 'Valentina Riquelme',
        schoolId: 'colegio-022',
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
