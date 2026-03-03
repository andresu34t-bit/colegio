// Sistema de autenticación multi-colegio

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Inicializar datos demo si no existen
function initDemoData() {
    const colegiosStr = localStorage.getItem('colegios');
    const usuariosStr = localStorage.getItem('usuarios');
    
    // Forzar inicialización si no hay usuarios o están vacíos
    const usuarios = usuariosStr ? JSON.parse(usuariosStr) : {};
    const needsInit = !colegiosStr || !usuariosStr || Object.keys(usuarios).length === 0;
    
    if (needsInit) {
        // Crear colegios demo
        const colegios = {
            'colegio_001': {
                id: 'colegio_001',
                nombre: 'Liceo Gabriela Mistral',
                rbd: '12345-6',
                region: 'Metropolitana',
                fechaRegistro: new Date().toISOString(),
                activo: true
            },
            'colegio_002': {
                id: 'colegio_002',
                nombre: 'Colegio Pablo Neruda',
                rbd: '67890-1',
                region: 'Valparaíso',
                fechaRegistro: new Date().toISOString(),
                activo: true
            },
            'colegio_003': {
                id: 'colegio_003',
                nombre: 'Instituto Arturo Prat',
                rbd: '11223-4',
                region: 'Biobío',
                fechaRegistro: new Date().toISOString(),
                activo: true
            }
        };
        
        // Crear usuarios demo
        const usuarios = {
            'director@mistral.cl': {
                email: 'director@mistral.cl',
                password: 'Director2026',
                nombre: 'Ana María González',
                rol: 'director',
                colegioId: 'colegio_001',
                permisoFinanzas: true,
                activo: true
            },
            'docente@mistral.cl': {
                email: 'docente@mistral.cl',
                password: 'Docente2026',
                nombre: 'Carlos Pérez',
                rol: 'docente',
                colegioId: 'colegio_001',
                permisoFinanzas: false,
                activo: true
            },
            'utp@mistral.cl': {
                email: 'utp@mistral.cl',
                password: 'UTP2026',
                nombre: 'María Silva',
                rol: 'utp',
                colegioId: 'colegio_001',
                permisoFinanzas: true,
                activo: true
            },
            'director@neruda.cl': {
                email: 'director@neruda.cl',
                password: 'Director2026',
                nombre: 'Juan Rojas',
                rol: 'director',
                colegioId: 'colegio_002',
                permisoFinanzas: true,
                activo: true
            },
            'docente@neruda.cl': {
                email: 'docente@neruda.cl',
                password: 'Docente2026',
                nombre: 'Laura Martínez',
                rol: 'docente',
                colegioId: 'colegio_002',
                permisoFinanzas: false,
                activo: true
            },
            // Usuarios adicionales simples para facilitar el acceso
            'director@edugest.cl': {
                email: 'director@edugest.cl',
                password: 'EduGest2026',
                nombre: 'Director Demo',
                rol: 'director',
                colegioId: 'colegio_001',
                permisoFinanzas: true,
                activo: true
            },
            'docente@edugest.cl': {
                email: 'docente@edugest.cl',
                password: 'Docente2026',
                nombre: 'Docente Demo',
                rol: 'docente',
                colegioId: 'colegio_001',
                permisoFinanzas: false,
                activo: true
            },
            // Super Usuario - Ve todos los colegios
            'admin@edugest.cl': {
                email: 'admin@edugest.cl',
                password: 'Admin2026',
                nombre: 'Administrador Global',
                rol: 'superadmin',
                colegioId: null, // No pertenece a un colegio específico
                permisoFinanzas: true,
                activo: true,
                verTodosColegios: true
            }
        };
        
        localStorage.setItem('colegios', JSON.stringify(colegios));
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        // Inicializar eventos demo con muchos más datos
        initEventosDemo();
        
        // Inicializar áreas demo
        initAreasDemo();
        
        // Inicializar finanzas demo
        initFinanzasDemo();
        
        console.log('✅ Datos demo inicializados');
        console.log('📧 Usuarios disponibles:');
        Object.keys(usuarios).forEach(email => {
            console.log(`   ${email} / ${usuarios[email].password}`);
        });
    }
}

// Inicializar eventos demo con datos ficticios
function initEventosDemo() {
    const eventos = [];
    const areas = ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'];
    const acciones = {
        'Currículum': ['Talleres de lectura', 'Evaluaciones formativas', 'Planificación curricular', 'Capacitación docente', 'Análisis de resultados'],
        'Liderazgo': ['Reuniones de coordinación', 'Planificación estratégica', 'Supervisión pedagógica', 'Gestión de equipos', 'Evaluación institucional'],
        'Convivencia': ['Actividades de convivencia', 'Resolución de conflictos', 'Talleres de valores', 'Mediación escolar', 'Actividades recreativas'],
        'Recursos': ['Gestión de recursos', 'Inventario de materiales', 'Mantenimiento de infraestructura', 'Adquisiciones', 'Control de presupuesto']
    };
    const docentes = ['María González', 'Juan Pérez', 'Ana Silva', 'Carlos Rojas', 'Laura Martínez', 'Pedro Soto', 'Carmen López', 'Diego Torres'];
    const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    
    // Generar 50 eventos ficticios
    for (let i = 0; i < 50; i++) {
        const area = areas[Math.floor(Math.random() * areas.length)];
        const accionesArea = acciones[area];
        const accion = accionesArea[Math.floor(Math.random() * accionesArea.length)];
        const docente = docentes[Math.floor(Math.random() * docentes.length)];
        const mes = meses[Math.floor(Math.random() * meses.length)];
        const dia = Math.floor(Math.random() * 28) + 1;
        
        eventos.push({
            id: `evento_${i + 1}`,
            colegioId: 'colegio_001',
            dia: dia,
            mes: mes,
            area: area,
            accion: accion,
            n_eventos: Math.floor(Math.random() * 10) + 1,
            exito_objetivo: Math.floor(Math.random() * 30) + 70,
            meta: Math.floor(Math.random() * 15) + 5,
            exito_meta: Math.floor(Math.random() * 50) + 40,
            docente: docente,
            descripcion: `${accion} - ${area}`,
            fecha: new Date(2026, meses.indexOf(mes), dia).toISOString()
        });
    }
    
    localStorage.setItem('eventos', JSON.stringify(eventos));
}

// Inicializar áreas demo
function initAreasDemo() {
    const areas = [
        {
            id: 'area_1',
            colegioId: 'colegio_001',
            nombre: 'Currículum',
            color: '#3b82f6',
            objetivo: 'Mejorar los resultados académicos en un 15%',
            responsable: 'María González',
            acciones: 12,
            progreso: 75,
            fechaCreacion: new Date().toISOString()
        },
        {
            id: 'area_2',
            colegioId: 'colegio_001',
            nombre: 'Liderazgo',
            color: '#10b981',
            objetivo: 'Fortalecer el liderazgo directivo y pedagógico',
            responsable: 'Juan Pérez',
            acciones: 8,
            progreso: 85,
            fechaCreacion: new Date().toISOString()
        },
        {
            id: 'area_3',
            colegioId: 'colegio_001',
            nombre: 'Convivencia',
            color: '#f59e0b',
            objetivo: 'Reducir conflictos escolares en un 20%',
            responsable: 'Ana Silva',
            acciones: 10,
            progreso: 60,
            fechaCreacion: new Date().toISOString()
        },
        {
            id: 'area_4',
            colegioId: 'colegio_001',
            nombre: 'Recursos',
            color: '#8b5cf6',
            objetivo: 'Optimizar el uso de recursos institucionales',
            responsable: 'Carlos Rojas',
            acciones: 6,
            progreso: 70,
            fechaCreacion: new Date().toISOString()
        }
    ];
    
    localStorage.setItem('areas', JSON.stringify(areas));
}

// Inicializar finanzas demo
function initFinanzasDemo() {
    const finanzas = [];
    const categorias = ['Materiales Didácticos', 'Infraestructura', 'Capacitación', 'Tecnología', 'Servicios Básicos', 'Eventos', 'Mantenimiento'];
    const tipos = ['Ingreso', 'Egreso'];
    const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO'];
    
    // Generar 30 transacciones ficticias
    for (let i = 0; i < 30; i++) {
        const tipo = tipos[Math.floor(Math.random() * tipos.length)];
        const categoria = categorias[Math.floor(Math.random() * categorias.length)];
        const mes = meses[Math.floor(Math.random() * meses.length)];
        const dia = Math.floor(Math.random() * 28) + 1;
        const monto = tipo === 'Ingreso' 
            ? Math.floor(Math.random() * 5000000) + 1000000 
            : Math.floor(Math.random() * 2000000) + 100000;
        
        finanzas.push({
            id: `finanza_${i + 1}`,
            colegioId: 'colegio_001',
            tipo: tipo,
            categoria: categoria,
            monto: monto,
            descripcion: `${tipo} - ${categoria}`,
            fecha: new Date(2026, meses.indexOf(mes), dia).toISOString(),
            mes: mes,
            dia: dia,
            responsable: 'Administración'
        });
    }
    
    localStorage.setItem('finanzas', JSON.stringify(finanzas));
}

// Inicializar datos demo
initDemoData();

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    
    // Cargar usuarios
    const usuariosStr = localStorage.getItem('usuarios');
    const usuarios = usuariosStr ? JSON.parse(usuariosStr) : {};
    
    // Verificar credenciales
    const usuario = usuarios[email];
    
    if (usuario && usuario.password === password && usuario.activo) {
        // Cargar datos del colegio (si no es superadmin)
        let colegio = null;
        let colegioNombre = 'Todos los Colegios';
        
        if (usuario.colegioId) {
            const colegiosStr = localStorage.getItem('colegios');
            const colegios = colegiosStr ? JSON.parse(colegiosStr) : {};
            colegio = colegios[usuario.colegioId];
            
            if (!colegio || !colegio.activo) {
                errorMessage.textContent = 'Colegio no encontrado o inactivo';
                errorMessage.style.display = 'block';
                return;
            }
            
            colegioNombre = colegio.nombre;
        }
        
        // Login exitoso
        console.log('✅ Login exitoso:', email);
        console.log('📚 Colegio:', colegioNombre);
        
        // Guardar sesión en localStorage
        localStorage.setItem('demoUser', JSON.stringify({
            email: usuario.email,
            nombre: usuario.nombre,
            rol: usuario.rol,
            colegioId: usuario.colegioId,
            colegioNombre: colegioNombre,
            permisoFinanzas: usuario.permisoFinanzas,
            verTodosColegios: usuario.verTodosColegios || false
        }));
        
        // Redirigir al dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Login fallido
        console.error('❌ Credenciales incorrectas');
        errorMessage.textContent = 'Email o contraseña incorrectos';
        errorMessage.style.display = 'block';
    }
});
