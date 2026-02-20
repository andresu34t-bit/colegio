// Página de selección de áreas

let currentUser = null;

// Verificar autenticación
function checkAuth() {
    const userStr = localStorage.getItem('demoUser');
    if (!userStr) {
        window.location.href = 'index.html';
        return null;
    }
    return JSON.parse(userStr);
}

currentUser = checkAuth();
if (currentUser) {
    document.getElementById('userName').textContent = currentUser.nombre;
    document.getElementById('userRole').textContent = getRoleName(currentUser.rol);
    document.getElementById('colegioInfo').textContent = `Colegio: ${currentUser.colegioNombre}`;
    
    if (currentUser.permisoFinanzas) {
        document.getElementById('navFinanzas').style.display = 'block';
    }
}

function getRoleName(rol) {
    const roles = {
        'director': 'Director',
        'utp': 'UTP',
        'docente': 'Docente',
        'administrador': 'Administrador'
    };
    return roles[rol] || rol;
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('demoUser');
    window.location.href = 'index.html';
});

// Cargar estadísticas de eventos por área
function cargarEstadisticas() {
    const eventosStr = localStorage.getItem('demoEventos');
    const todosEventos = eventosStr ? JSON.parse(eventosStr) : [];
    const eventosDelColegio = todosEventos.filter(e => e.colegioId === currentUser.colegioId);
    
    // Contar eventos por área
    const areas = ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'];
    areas.forEach(area => {
        const eventosArea = eventosDelColegio.filter(e => e.area === area);
        const totalEventos = eventosArea.reduce((sum, e) => sum + (e.n_eventos || 0), 0);
        
        const elementId = 'eventos' + area.replace(' ', '');
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = totalEventos;
        }
    });
}

// Ir al formulario del área seleccionada
function irAFormulario(area) {
    // Guardar el área seleccionada en localStorage
    localStorage.setItem('areaSeleccionada', area);
    
    // Redirigir al formulario
    window.location.href = 'formulario-area.html';
}

// Cargar estadísticas al iniciar
cargarEstadisticas();