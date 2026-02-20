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
        
        console.log('✅ Datos demo inicializados');
        console.log('📧 Usuarios disponibles:');
        Object.keys(usuarios).forEach(email => {
            console.log(`   ${email} / ${usuarios[email].password}`);
        });
    }
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
