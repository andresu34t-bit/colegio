// Formulario de Observación de Clase - Sistema de evaluación docente

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
    document.getElementById('userSchool').textContent = currentUser.colegioNombre;
    
    // Verificar permisos
    if (!canCreateObservacion()) {
        alert('No tienes permisos para crear observaciones');
        window.location.href = 'seo-dashboard.html';
    }
    
    // Mostrar finanzas PME solo si tiene permiso
    if (currentUser.permisoFinanzas) {
        document.getElementById('navFinanzas').style.display = 'block';
    }
    
    // Pre-llenar observador
    document.getElementById('observador').value = currentUser.nombre;
    
    // Pre-llenar cargo
    const cargo = currentUser.rol === 'director' ? 'Director' : 
                  currentUser.rol === 'utp' ? 'UTP' : 'Otro';
    document.getElementById('cargoObservador').value = cargo;
    
    // Pre-llenar responsable seguimiento
    document.getElementById('responsableSeguimiento').value = currentUser.nombre;
}

function getRoleName(rol) {
    const roles = {
        'director': 'Director',
        'utp': 'UTP',
        'docente': 'Docente',
        'observador': 'Observador',
        'superadmin': 'Super Admin'
    };
    return roles[rol] || rol;
}

function canCreateObservacion() {
    return ['director', 'utp', 'observador'].includes(currentUser.rol);
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('demoUser');
    window.location.href = 'index.html';
});

// ============================================
// PROGRESS BAR ANIMADO
// ============================================

function updateProgressBar() {
    const form = document.getElementById('observacionForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let filled = 0;
    
    inputs.forEach(input => {
        if (input.value && input.value.trim() !== '') {
            filled++;
        }
    });
    
    const progress = (filled / inputs.length) * 100;
    const progressBar = document.getElementById('formProgress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// Actualizar progress bar en cada cambio
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('observacionForm');
    if (form) {
        form.addEventListener('input', updateProgressBar);
        form.addEventListener('change', updateProgressBar);
        updateProgressBar();
    }
});

// ============================================
// ANIMACIONES DE SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.form-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
});

// Calcular promedios automáticamente
const indicadorInputs = ['A1','A2','A3','A4','B1','B2','B3','B4','C1','C2','C3','D1','D2','D3','E1','E2'];

indicadorInputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        input.addEventListener('change', calcularPromedios);
        
        // Efecto visual al seleccionar
        input.addEventListener('change', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
});

function calcularPromedios() {
    // Obtener valores
    const valores = {};
    indicadorInputs.forEach(id => {
        const val = document.getElementById(id).value;
        valores[id] = val ? parseInt(val) : 0;
    });
    
    // Calcular promedios por dimensión
    const promedios = {
        A: (valores.A1 + valores.A2 + valores.A3 + valores.A4) / 4,
        B: (valores.B1 + valores.B2 + valores.B3 + valores.B4) / 4,
        C: (valores.C1 + valores.C2 + valores.C3) / 3,
        D: (valores.D1 + valores.D2 + valores.D3) / 3,
        E: (valores.E1 + valores.E2) / 2
    };
    
    // Promedio general
    promedios.general = (promedios.A + promedios.B + promedios.C + promedios.D + promedios.E) / 5;
    
    // Mostrar en consola (opcional)
    console.log('Promedios calculados:', promedios);
    
    return promedios;
}

// Enviar formulario con animación
document.getElementById('observacionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Mostrar loading en el botón
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Guardando...';
    submitBtn.disabled = true;
    
    // Simular delay para mostrar animación
    setTimeout(() => {
        // Recopilar datos
        const indicadores = {};
        indicadorInputs.forEach(id => {
            const val = document.getElementById(id).value;
            indicadores[id] = val ? parseInt(val) : 0;
        });
        
        // Calcular promedios
        const promedios = calcularPromedios();
        
        // Determinar nivel de desempeño
        let nivelDesempeno;
        if (promedios.general < 2.0) nivelDesempeno = 'Insuficiente';
        else if (promedios.general < 3.0) nivelDesempeno = 'Básico';
        else if (promedios.general < 3.5) nivelDesempeno = 'Adecuado';
        else nivelDesempeno = 'Destacado';
        
        // Crear observación
        const observacion = {
            id: `seo_${Date.now()}`,
            colegioId: currentUser.colegioId,
            fecha: document.getElementById('fecha').value,
            horaInicio: document.getElementById('horaInicio').value,
            horaTermino: document.getElementById('horaTermino').value,
            observador: document.getElementById('observador').value,
            cargoObservador: document.getElementById('cargoObservador').value,
            docente: document.getElementById('docente').value,
            rutDocente: document.getElementById('rutDocente').value,
            asignatura: document.getElementById('asignatura').value,
            curso: document.getElementById('curso').value,
            tipoClase: document.getElementById('tipoClase').value,
            modalidad: document.getElementById('modalidad').value,
            estudiantesPresentes: parseInt(document.getElementById('estudiantesPresentes').value),
            estudiantesMatriculados: parseInt(document.getElementById('estudiantesMatriculados').value),
            unidad: document.getElementById('unidad').value,
            objetivo: document.getElementById('objetivo').value,
            contenidos: document.getElementById('contenidos').value,
            habilidad: document.getElementById('habilidad').value,
            recursos: document.getElementById('recursos').value,
            indicadores: indicadores,
            promedios: promedios,
            nivelDesempeno: nivelDesempeno,
            fortalezas: document.getElementById('fortalezas').value,
            aspectosMejorar: document.getElementById('aspectosMejorar').value,
            evidencias: document.getElementById('evidencias').value,
            comentarios: document.getElementById('comentarios').value,
            recomendaciones: document.getElementById('recomendaciones').value,
            estrategiasSugeridas: document.getElementById('estrategiasSugeridas').value,
            recursosSugeridos: document.getElementById('recursosSugeridos').value,
            compromisos: document.getElementById('compromisos').value,
            fechaProximaObservacion: document.getElementById('fechaProximaObservacion').value,
            responsableSeguimiento: document.getElementById('responsableSeguimiento').value,
            estadoSeguimiento: 'Pendiente',
            firmaObservador: true,
            firmaDocente: false,
            fechaValidacion: null,
            comentariosDocente: '',
            creadoPor: currentUser.email,
            fechaCreacion: new Date().toISOString(),
            ultimaModificacion: new Date().toISOString()
        };
        
        // Guardar en localStorage
        const obsStr = localStorage.getItem('seo_observaciones');
        const observaciones = obsStr ? JSON.parse(obsStr) : [];
        observaciones.push(observacion);
        localStorage.setItem('seo_observaciones', JSON.stringify(observaciones));
        
        console.log('✅ Observación guardada:', observacion);
        
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Mostrar mensaje de éxito con animación
        const successMsg = document.createElement('div');
        successMsg.className = 'success-banner';
        successMsg.innerHTML = `
            <div class="success-icon">✓</div>
            <div class="success-content">
                <h3>¡Observación Guardada Exitosamente!</h3>
                <p>
                    <strong>Docente:</strong> ${observacion.docente} | 
                    <strong>Promedio:</strong> ${promedios.general.toFixed(1)} | 
                    <strong>Nivel:</strong> ${nivelDesempeno}
                </p>
            </div>
        `;
        document.querySelector('.main-content').insertBefore(successMsg, document.querySelector('.observacion-form'));
        
        // Scroll al top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Redirigir después de 3 segundos
        setTimeout(() => {
            window.location.href = 'seo-dashboard.html';
        }, 3000);
    }, 1000);
});
