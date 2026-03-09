// Lista de Observaciones - Sistema de evaluación docente

let currentUser = null;
let allObservaciones = [];
let filteredObservaciones = [];

// Verificar autenticación
function checkAuth() {
    const userStr = localStorage.getItem('demoUser');
    if (!userStr) {
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
    document.getElementById('userSchool').textContent = currentUser.colegioNombre;
    
    if (currentUser.permisoFinanzas) {
        document.getElementById('navFinanzas').style.display = 'block';
    }
    
    if (!canCreateObservacion()) {
        document.getElementById('navNuevaObservacion').style.display = 'none';
        document.getElementById('btnNuevaObservacion').style.display = 'none';
    }
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
    return ['director', 'utp', 'observador', 'superadmin'].includes(currentUser.rol);
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.reload();
});

// Cargar observaciones
function loadObservaciones() {
    const obsStr = localStorage.getItem('seo_observaciones');
    const todasObservaciones = obsStr ? JSON.parse(obsStr) : [];
    
    if (currentUser.rol === 'superadmin') {
        allObservaciones = todasObservaciones;
    } else if (currentUser.rol === 'docente') {
        allObservaciones = todasObservaciones.filter(o => 
            o.colegioId === currentUser.colegioId && o.docente === currentUser.nombre
        );
    } else if (currentUser.rol === 'observador') {
        allObservaciones = todasObservaciones.filter(o => 
            o.colegioId === currentUser.colegioId && o.creadoPor === currentUser.email
        );
    } else {
        allObservaciones = todasObservaciones.filter(o => o.colegioId === currentUser.colegioId);
    }
    
    if (allObservaciones.length === 0 && canCreateObservacion()) {
        allObservaciones = getObservacionesDemo();
        const obsActualizadas = [...todasObservaciones, ...allObservaciones];
        localStorage.setItem('seo_observaciones', JSON.stringify(obsActualizadas));
    }
    
    console.log(`✅ ${allObservaciones.length} observaciones cargadas`);
    
    populateFilters();
    applyFilters();
}

// Datos demo
function getObservacionesDemo() {
    const now = new Date();
    return [
        {
            id: `seo_${Date.now()}_1`,
            colegioId: currentUser.colegioId,
            fecha: '2026-02-10',
            horaInicio: '08:00',
            horaTermino: '09:30',
            observador: currentUser.nombre,
            cargoObservador: currentUser.rol === 'utp' ? 'UTP' : 'Director',
            docente: 'Carlos Pérez',
            asignatura: 'Matemáticas',
            curso: '8° Básico A',
            tipoClase: 'teórica',
            modalidad: 'presencial',
            estudiantesPresentes: 35,
            estudiantesMatriculados: 38,
            unidad: 'Álgebra',
            objetivo: 'Resolver ecuaciones lineales',
            contenidos: 'Ecuaciones de primer grado',
            habilidad: 'Resolución de problemas',
            recursos: 'PPT, guía',
            indicadores: { A1:4, A2:3, A3:4, A4:3, B1:3, B2:4, B3:3, B4:2, C1:3, C2:3, C3:3, D1:4, D2:4, D3:3, E1:3, E2:3 },
            promedios: { A:3.5, B:3.0, C:3.0, D:3.7, E:3.0, general:3.2 },
            nivelDesempeno: 'Adecuado',
            fortalezas: 'Excelente clima de aula',
            aspectosMejorar: 'Incorporar más preguntas desafiantes',
            evidencias: 'Estudiantes participan activamente',
            comentarios: 'Clase bien estructurada',
            recomendaciones: 'Incluir más ejemplos de la vida real',
            estrategiasSugeridas: 'Aprendizaje basado en problemas',
            recursosSugeridos: 'Videos educativos',
            compromisos: 'Preparar guía con problemas contextualizados',
            fechaProximaObservacion: '2026-03-10',
            responsableSeguimiento: currentUser.nombre,
            estadoSeguimiento: 'Pendiente',
            firmaObservador: true,
            firmaDocente: false,
            fechaValidacion: null,
            comentariosDocente: '',
            creadoPor: currentUser.email,
            fechaCreacion: now.toISOString(),
            ultimaModificacion: now.toISOString()
        },
        {
            id: `seo_${Date.now()}_2`,
            colegioId: currentUser.colegioId,
            fecha: '2026-02-12',
            horaInicio: '10:00',
            horaTermino: '11:30',
            observador: currentUser.nombre,
            cargoObservador: currentUser.rol === 'utp' ? 'UTP' : 'Director',
            docente: 'María González',
            asignatura: 'Lenguaje',
            curso: '7° Básico B',
            tipoClase: 'práctica',
            modalidad: 'presencial',
            estudiantesPresentes: 32,
            estudiantesMatriculados: 34,
            unidad: 'Comprensión lectora',
            objetivo: 'Analizar textos narrativos',
            contenidos: 'Elementos del cuento',
            habilidad: 'Análisis literario',
            recursos: 'Libro, guía',
            indicadores: { A1:4, A2:4, A3:3, A4:4, B1:4, B2:4, B3:4, B4:3, C1:4, C2:4, C3:3, D1:4, D2:3, D3:4, E1:4, E2:4 },
            promedios: { A:3.8, B:3.8, C:3.7, D:3.7, E:4.0, general:3.8 },
            nivelDesempeno: 'Destacado',
            fortalezas: 'Excelente manejo de metodologías activas',
            aspectosMejorar: 'Mejorar gestión del tiempo',
            evidencias: 'Uso efectivo de preguntas',
            comentarios: 'Clase muy bien ejecutada',
            recomendaciones: 'Continuar con esta línea de trabajo',
            estrategiasSugeridas: 'Trabajo colaborativo',
            recursosSugeridos: 'Textos diversos',
            compromisos: 'Compartir experiencia con otros docentes',
            fechaProximaObservacion: '2026-03-12',
            responsableSeguimiento: currentUser.nombre,
            estadoSeguimiento: 'En proceso',
            firmaObservador: true,
            firmaDocente: true,
            fechaValidacion: '2026-02-13',
            comentariosDocente: 'Agradezco la retroalimentación',
            creadoPor: currentUser.email,
            fechaCreacion: now.toISOString(),
            ultimaModificacion: now.toISOString()
        }
    ];
}

// Poblar filtros
function populateFilters() {
    const docentes = [...new Set(allObservaciones.map(o => o.docente))].sort();
    const asignaturas = [...new Set(allObservaciones.map(o => o.asignatura))].sort();
    
    const docenteFilter = document.getElementById('docenteFilter');
    const asignaturaFilter = document.getElementById('asignaturaFilter');
    
    docenteFilter.innerHTML = '<option value="">Todos los docentes</option>' +
        docentes.map(d => `<option value="${d}">${d}</option>`).join('');
    
    asignaturaFilter.innerHTML = '<option value="">Todas las asignaturas</option>' +
        asignaturas.map(a => `<option value="${a}">${a}</option>`).join('');
}

// Event listeners para filtros
document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('docenteFilter').addEventListener('change', applyFilters);
document.getElementById('asignaturaFilter').addEventListener('change', applyFilters);
document.getElementById('nivelFilter').addEventListener('change', applyFilters);

// Aplicar filtros
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const docenteFilter = document.getElementById('docenteFilter').value;
    const asignaturaFilter = document.getElementById('asignaturaFilter').value;
    const nivelFilter = document.getElementById('nivelFilter').value;
    
    filteredObservaciones = allObservaciones.filter(o => {
        const matchSearch = !searchTerm || 
            o.docente.toLowerCase().includes(searchTerm) ||
            o.asignatura.toLowerCase().includes(searchTerm) ||
            o.curso.toLowerCase().includes(searchTerm) ||
            o.observador.toLowerCase().includes(searchTerm);
        
        const matchDocente = !docenteFilter || o.docente === docenteFilter;
        const matchAsignatura = !asignaturaFilter || o.asignatura === asignaturaFilter;
        const matchNivel = !nivelFilter || o.nivelDesempeno === nivelFilter;
        
        return matchSearch && matchDocente && matchAsignatura && matchNivel;
    });
    
    document.getElementById('resultadosCount').textContent = 
        `${filteredObservaciones.length} observación${filteredObservaciones.length !== 1 ? 'es' : ''} encontrada${filteredObservaciones.length !== 1 ? 's' : ''}`;
    
    renderTable();
}

// Limpiar filtros
function limpiarFiltros() {
    document.getElementById('searchInput').value = '';
    document.getElementById('docenteFilter').value = '';
    document.getElementById('asignaturaFilter').value = '';
    document.getElementById('nivelFilter').value = '';
    applyFilters();
}

// Renderizar tabla
function renderTable() {
    const tbody = document.getElementById('tablaObservaciones');
    
    if (filteredObservaciones.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: var(--space-2xl); color: var(--gray-500);">
                    <div style="font-size: 48px; margin-bottom: var(--space-md);">📭</div>
                    <div style="font-size: 18px; font-weight: 600;">No se encontraron observaciones</div>
                    <div style="font-size: 14px; margin-top: var(--space-sm);">Intenta ajustar los filtros de búsqueda</div>
                </td>
            </tr>
        `;
        return;
    }
    
    const sorted = [...filteredObservaciones].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    tbody.innerHTML = sorted.map(o => {
        const nivelColor = {
            'Insuficiente': 'var(--danger-600)',
            'Básico': 'var(--warning-600)',
            'Adecuado': 'var(--success-600)',
            'Destacado': 'var(--info-600)'
        }[o.nivelDesempeno];
        
        return `
            <tr style="border-bottom: 1px solid var(--gray-200); transition: background 0.2s;">
                <td style="padding: var(--space-md); font-weight: 600; color: var(--gray-900);">${o.fecha}</td>
                <td style="padding: var(--space-md);">
                    <div style="font-weight: 700; color: var(--gray-900);">${o.docente}</div>
                    <div style="font-size: 12px; color: var(--gray-600); margin-top: 2px;">Observador: ${o.observador}</div>
                </td>
                <td style="padding: var(--space-md); color: var(--gray-700);">${o.asignatura}</td>
                <td style="padding: var(--space-md); color: var(--gray-700);">${o.curso}</td>
                <td style="padding: var(--space-md); text-align: center;">
                    <span style="display: inline-block; padding: 8px 16px; background: ${nivelColor}; color: white; 
                                 border-radius: var(--radius-full); font-size: 16px; font-weight: 900;">
                        ${o.promedios.general.toFixed(1)}
                    </span>
                </td>
                <td style="padding: var(--space-md);">
                    <span style="padding: 6px 12px; background: ${nivelColor}20; color: ${nivelColor}; 
                                 border-radius: var(--radius-md); font-size: 13px; font-weight: 700; text-transform: uppercase;">
                        ${o.nivelDesempeno}
                    </span>
                </td>
                <td style="padding: var(--space-md); text-align: center;">
                    <div style="display: flex; gap: var(--space-xs); justify-content: center;">
                        <button onclick="verDetalle('${o.id}')" class="btn btn-primary" style="min-width: auto; padding: 8px 16px; font-size: 13px;">
                            👁️ Ver
                        </button>
                        <button onclick="editarObservacion('${o.id}')" class="btn btn-secondary" style="min-width: auto; padding: 8px 16px; font-size: 13px;">
                            ✏️ Editar
                        </button>
                        <button onclick="eliminarObservacion('${o.id}')" class="btn" style="min-width: auto; padding: 8px 16px; font-size: 13px; background: var(--danger-600); color: white;">
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Ver detalle
function verDetalle(id) {
    const obs = allObservaciones.find(o => o.id === id);
    if (!obs) return;
    
    const nivelColor = {
        'Insuficiente': 'var(--danger-600)',
        'Básico': 'var(--warning-600)',
        'Adecuado': 'var(--success-600)',
        'Destacado': 'var(--info-600)'
    }[obs.nivelDesempeno];
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2 style="font-size: 28px; font-weight: 900; margin-bottom: var(--space-xl); color: var(--gray-900);">
            📋 Detalle de Observación
        </h2>
        
        <div style="display: grid; gap: var(--space-xl);">
            <!-- Información General -->
            <div style="background: var(--gray-50); padding: var(--space-xl); border-radius: var(--radius-lg);">
                <h3 style="font-size: 20px; font-weight: 800; margin-bottom: var(--space-lg); color: var(--primary-700);">
                    🎯 Información General
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-md);">
                    <div>
                        <div style="font-size: 12px; color: var(--gray-600); font-weight: 600; margin-bottom: 4px;">FECHA</div>
                        <div style="font-size: 16px; font-weight: 700; color: var(--gray-900);">${obs.fecha}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--gray-600); font-weight: 600; margin-bottom: 4px;">HORARIO</div>
                        <div style="font-size: 16px; font-weight: 700; color: var(--gray-900);">${obs.horaInicio} - ${obs.horaTermino}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--gray-600); font-weight: 600; margin-bottom: 4px;">DOCENTE</div>
                        <div style="font-size: 16px; font-weight: 700; color: var(--gray-900);">${obs.docente}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--gray-600); font-weight: 600; margin-bottom: 4px;">OBSERVADOR</div>
                        <div style="font-size: 16px; font-weight: 700; color: var(--gray-900);">${obs.observador}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--gray-600); font-weight: 600; margin-bottom: 4px;">ASIGNATURA</div>
                        <div style="font-size: 16px; font-weight: 700; color: var(--gray-900);">${obs.asignatura}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--gray-600); font-weight: 600; margin-bottom: 4px;">CURSO</div>
                        <div style="font-size: 16px; font-weight: 700; color: var(--gray-900);">${obs.curso}</div>
                    </div>
                </div>
            </div>
            
            <!-- Evaluación -->
            <div style="background: ${nivelColor}10; padding: var(--space-xl); border-radius: var(--radius-lg); border-left: 5px solid ${nivelColor};">
                <h3 style="font-size: 20px; font-weight: 800; margin-bottom: var(--space-lg); color: ${nivelColor};">
                    📊 Evaluación
                </h3>
                <div style="display: flex; align-items: center; gap: var(--space-xl); margin-bottom: var(--space-lg);">
                    <div style="text-align: center;">
                        <div style="font-size: 48px; font-weight: 900; color: ${nivelColor};">${obs.promedios.general.toFixed(1)}</div>
                        <div style="font-size: 14px; font-weight: 700; color: var(--gray-600);">PROMEDIO GENERAL</div>
                    </div>
                    <div style="flex: 1;">
                        <div style="padding: 12px 24px; background: ${nivelColor}; color: white; border-radius: var(--radius-lg); 
                                    font-size: 20px; font-weight: 900; text-align: center; text-transform: uppercase;">
                            ${obs.nivelDesempeno}
                        </div>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--space-md);">
                    <div style="text-align: center; padding: var(--space-md); background: white; border-radius: var(--radius-md);">
                        <div style="font-size: 24px; font-weight: 900; color: ${nivelColor};">${obs.promedios.A.toFixed(1)}</div>
                        <div style="font-size: 11px; font-weight: 600; color: var(--gray-600); margin-top: 4px;">Planificación</div>
                    </div>
                    <div style="text-align: center; padding: var(--space-md); background: white; border-radius: var(--radius-md);">
                        <div style="font-size: 24px; font-weight: 900; color: ${nivelColor};">${obs.promedios.B.toFixed(1)}</div>
                        <div style="font-size: 11px; font-weight: 600; color: var(--gray-600); margin-top: 4px;">Enseñanza</div>
                    </div>
                    <div style="text-align: center; padding: var(--space-md); background: white; border-radius: var(--radius-md);">
                        <div style="font-size: 24px; font-weight: 900; color: ${nivelColor};">${obs.promedios.C.toFixed(1)}</div>
                        <div style="font-size: 11px; font-weight: 600; color: var(--gray-600); margin-top: 4px;">Evaluación</div>
                    </div>
                    <div style="text-align: center; padding: var(--space-md); background: white; border-radius: var(--radius-md);">
                        <div style="font-size: 24px; font-weight: 900; color: ${nivelColor};">${obs.promedios.D.toFixed(1)}</div>
                        <div style="font-size: 11px; font-weight: 600; color: var(--gray-600); margin-top: 4px;">Gestión</div>
                    </div>
                    <div style="text-align: center; padding: var(--space-md); background: white; border-radius: var(--radius-md);">
                        <div style="font-size: 24px; font-weight: 900; color: ${nivelColor};">${obs.promedios.E.toFixed(1)}</div>
                        <div style="font-size: 11px; font-weight: 600; color: var(--gray-600); margin-top: 4px;">Inclusión</div>
                    </div>
                </div>
            </div>
            
            <!-- Retroalimentación -->
            <div style="background: var(--gray-50); padding: var(--space-xl); border-radius: var(--radius-lg);">
                <h3 style="font-size: 20px; font-weight: 800; margin-bottom: var(--space-lg); color: var(--success-700);">
                    💬 Retroalimentación
                </h3>
                <div style="display: grid; gap: var(--space-md);">
                    <div>
                        <div style="font-size: 14px; font-weight: 700; color: var(--success-700); margin-bottom: var(--space-xs);">✅ Fortalezas</div>
                        <div style="padding: var(--space-md); background: white; border-radius: var(--radius-md); color: var(--gray-700);">
                            ${obs.fortalezas}
                        </div>
                    </div>
                    <div>
                        <div style="font-size: 14px; font-weight: 700; color: var(--warning-700); margin-bottom: var(--space-xs);">🎯 Aspectos a Mejorar</div>
                        <div style="padding: var(--space-md); background: white; border-radius: var(--radius-md); color: var(--gray-700);">
                            ${obs.aspectosMejorar}
                        </div>
                    </div>
                    <div>
                        <div style="font-size: 14px; font-weight: 700; color: var(--info-700); margin-bottom: var(--space-xs);">💡 Recomendaciones</div>
                        <div style="padding: var(--space-md); background: white; border-radius: var(--radius-md); color: var(--gray-700);">
                            ${obs.recomendaciones}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Seguimiento -->
            <div style="background: var(--info-50); padding: var(--space-xl); border-radius: var(--radius-lg);">
                <h3 style="font-size: 20px; font-weight: 800; margin-bottom: var(--space-lg); color: var(--info-700);">
                    📅 Seguimiento
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-md);">
                    <div>
                        <div style="font-size: 12px; color: var(--gray-600); font-weight: 600; margin-bottom: 4px;">PRÓXIMA OBSERVACIÓN</div>
                        <div style="font-size: 16px; font-weight: 700; color: var(--gray-900);">${obs.fechaProximaObservacion || 'No programada'}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--gray-600); font-weight: 600; margin-bottom: 4px;">RESPONSABLE</div>
                        <div style="font-size: 16px; font-weight: 700; color: var(--gray-900);">${obs.responsableSeguimiento}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: var(--gray-600); font-weight: 600; margin-bottom: 4px;">ESTADO</div>
                        <div style="font-size: 16px; font-weight: 700; color: var(--gray-900);">${obs.estadoSeguimiento}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="display: flex; gap: var(--space-md); margin-top: var(--space-xl); justify-content: flex-end;">
            <button onclick="cerrarModal()" class="btn btn-secondary">Cerrar</button>
            <button onclick="editarObservacion('${obs.id}'); cerrarModal();" class="btn btn-primary">✏️ Editar</button>
        </div>
    `;
    
    document.getElementById('modalDetalle').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modalDetalle').style.display = 'none';
}

// Editar observación
function editarObservacion(id) {
    alert('Funcionalidad de edición en desarrollo.\n\nPróximamente podrás editar las observaciones directamente desde esta pantalla.');
    // TODO: Implementar edición inline o redirigir a formulario de edición
}

// Eliminar observación
function eliminarObservacion(id) {
    const obs = allObservaciones.find(o => o.id === id);
    if (!obs) return;
    
    if (!confirm(`¿Estás seguro de eliminar la observación de ${obs.docente} del ${obs.fecha}?\n\nEsta acción no se puede deshacer.`)) {
        return;
    }
    
    const obsStr = localStorage.getItem('seo_observaciones');
    let todasObservaciones = obsStr ? JSON.parse(obsStr) : [];
    
    todasObservaciones = todasObservaciones.filter(o => o.id !== id);
    localStorage.setItem('seo_observaciones', JSON.stringify(todasObservaciones));
    
    allObservaciones = allObservaciones.filter(o => o.id !== id);
    
    applyFilters();
    
    alert('✅ Observación eliminada correctamente');
}

// Cerrar modal al hacer clic fuera
document.getElementById('modalDetalle').addEventListener('click', function(e) {
    if (e.target === this) {
        cerrarModal();
    }
});

// Cargar datos al iniciar
loadObservaciones();
