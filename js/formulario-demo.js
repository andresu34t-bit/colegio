// Formulario multi-colegio (guarda eventos por colegio)

let currentUser = null;

// Verificar autenticación (sin redirección)
function checkAuth() {
    const userStr = localStorage.getItem('demoUser');
    if (!userStr) {
        // Crear sesión demo automática si no existe
        const demoSession = {
            email: 'demo@edugest.cl',
            nombre: 'Usuario Demo',
            rol: 'director',
            colegioId: 'colegio_001',
            colegioNombre: 'Liceo Gabriela Mistral',
            permisoFinanzas: true,
            verTodosColegios: false
        };
        localStorage.setItem('demoUser', JSON.stringify(demoSession));
        return demoSession;
    }
    return JSON.parse(userStr);
}

currentUser = checkAuth();
if (currentUser) {
    document.getElementById('userName').textContent = currentUser.nombre;
    document.getElementById('userRole').textContent = getRoleName(currentUser.rol);
    
    // Mostrar finanzas solo si tiene permiso
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

// Logout (solo recarga la página)
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.reload();
});

// Formulario de eventos
const eventoForm = document.getElementById('eventoForm');

eventoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Recopilar datos del formulario
    const eventoData = {
        colegioId: currentUser.colegioId, // ← Asociar al colegio actual
        dia: parseInt(document.getElementById('dia').value),
        mes: document.getElementById('mes').value,
        area: document.getElementById('area').value,
        accion: document.getElementById('accion').value.trim(), // Texto libre
        n_eventos: parseInt(document.getElementById('n_eventos').value),
        exito_objetivo: parseInt(document.getElementById('exito_objetivo').value),
        meta: parseInt(document.getElementById('meta').value),
        exito_meta: parseInt(document.getElementById('exito_meta').value),
        docente: document.getElementById('docente').value,
        descripcion: document.getElementById('descripcion').value,
        timestamp: Date.now(),
        createdBy: currentUser.email
    };
    
    try {
        // Cargar eventos existentes
        const eventosStr = localStorage.getItem('demoEventos');
        const eventos = eventosStr ? JSON.parse(eventosStr) : [];
        
        // Agregar nuevo evento
        eventos.push(eventoData);
        
        // Guardar en localStorage
        localStorage.setItem('demoEventos', JSON.stringify(eventos));
        
        console.log('✅ Evento guardado para', currentUser.colegioNombre);
        
        // Mostrar mensaje de éxito
        alert(`✅ Evento registrado exitosamente en ${currentUser.colegioNombre}`);
        
        // Limpiar formulario
        eventoForm.reset();
        
        // Opcional: redirigir al dashboard
        // window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('❌ Error guardando evento:', error);
        alert('❌ Error al guardar el evento.');
    }
});
