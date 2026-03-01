// Dashboard Observación de Clases - Sistema de evaluación docente institucional

let currentUser = null;
let allObservaciones = [];
let charts = {};

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
    
    // Mostrar finanzas PME solo si tiene permiso
    if (currentUser.permisoFinanzas) {
        document.getElementById('navFinanzas').style.display = 'block';
    }
    
    // Mostrar "Nueva Observación" solo si puede crear
    if (!canCreateObservacion()) {
        document.getElementById('navNuevaObservacion').style.display = 'none';
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
    return ['director', 'utp', 'observador'].includes(currentUser.rol);
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('demoUser');
    window.location.href = 'index.html';
});

// Cargar observaciones
function loadObservaciones() {
    const obsStr = localStorage.getItem('seo_observaciones');
    const todasObservaciones = obsStr ? JSON.parse(obsStr) : [];
    
    // Filtrar según rol
    if (currentUser.rol === 'superadmin') {
        allObservaciones = todasObservaciones;
    } else if (currentUser.rol === 'docente') {
        // Docentes solo ven sus propias observaciones
        allObservaciones = todasObservaciones.filter(o => 
            o.colegioId === currentUser.colegioId && o.docente === currentUser.nombre
        );
    } else if (currentUser.rol === 'observador') {
        // Observadores ven las que crearon
        allObservaciones = todasObservaciones.filter(o => 
            o.colegioId === currentUser.colegioId && o.creadoPor === currentUser.email
        );
    } else {
        // Director y UTP ven todas del colegio
        allObservaciones = todasObservaciones.filter(o => o.colegioId === currentUser.colegioId);
    }
    
    // Si no hay observaciones, crear datos demo
    if (allObservaciones.length === 0 && canCreateObservacion()) {
        allObservaciones = getObservacionesDemo();
        const obsActualizadas = [...todasObservaciones, ...allObservaciones];
        localStorage.setItem('seo_observaciones', JSON.stringify(obsActualizadas));
    }
    
    console.log(`✅ ${allObservaciones.length} observaciones cargadas`);
    
    populateFilters();
    filterAndRender();
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

// Filtros
document.getElementById('docenteFilter').addEventListener('change', filterAndRender);
document.getElementById('asignaturaFilter').addEventListener('change', filterAndRender);
document.getElementById('periodoFilter').addEventListener('change', filterAndRender);

function filterAndRender() {
    const docenteFilter = document.getElementById('docenteFilter').value;
    const asignaturaFilter = document.getElementById('asignaturaFilter').value;
    const periodoFilter = document.getElementById('periodoFilter').value;
    
    let filtered = allObservaciones;
    
    if (docenteFilter) {
        filtered = filtered.filter(o => o.docente === docenteFilter);
    }
    if (asignaturaFilter) {
        filtered = filtered.filter(o => o.asignatura === asignaturaFilter);
    }
    if (periodoFilter) {
        const now = new Date();
        filtered = filtered.filter(o => {
            const fecha = new Date(o.fecha);
            if (periodoFilter === 'mes') {
                return fecha.getMonth() === now.getMonth() && fecha.getFullYear() === now.getFullYear();
            } else if (periodoFilter === 'trimestre') {
                const trimestre = Math.floor(now.getMonth() / 3);
                const trimestreObs = Math.floor(fecha.getMonth() / 3);
                return trimestreObs === trimestre && fecha.getFullYear() === now.getFullYear();
            } else if (periodoFilter === 'semestre') {
                const semestre = Math.floor(now.getMonth() / 6);
                const semestreObs = Math.floor(fecha.getMonth() / 6);
                return semestreObs === semestre && fecha.getFullYear() === now.getFullYear();
            }
            return true;
        });
    }
    
    renderStats(filtered);
    renderCharts(filtered);
    renderTable(filtered);
    renderRanking(filtered);
    renderSeguimientos(filtered);
}

// Estadísticas
function renderStats(obs) {
    document.getElementById('totalObservaciones').textContent = obs.length;
    
    const promedio = obs.length > 0
        ? (obs.reduce((sum, o) => sum + o.promedios.general, 0) / obs.length).toFixed(1)
        : '0.0';
    document.getElementById('promedioGeneral').textContent = promedio;
    
    const docentes = new Set(obs.map(o => o.docente)).size;
    document.getElementById('docentesObservados').textContent = docentes;
    
    const pendientes = obs.filter(o => o.estadoSeguimiento === 'Pendiente').length;
    document.getElementById('pendientesSeguimiento').textContent = pendientes;
}

// Gráficos
function renderCharts(obs) {
    renderChartDimensiones(obs);
    renderChartDesempeno(obs);
}

function renderChartDimensiones(obs) {
    const dimensiones = ['A', 'B', 'C', 'D', 'E'];
    const data = dimensiones.map(dim => {
        const total = obs.reduce((sum, o) => sum + o.promedios[dim], 0);
        return obs.length > 0 ? (total / obs.length).toFixed(1) : 0;
    });
    
    if (charts.dimensiones) charts.dimensiones.destroy();
    
    const ctx = document.getElementById('chartDimensiones').getContext('2d');
    charts.dimensiones = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['📋 Planificación', '🎯 Enseñanza', '✅ Evaluación', '👥 Gestión', '🤝 Inclusión'],
            datasets: [{
                label: 'Promedio',
                data: data,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderWidth: 3,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: { 
                r: { 
                    beginAtZero: true, 
                    max: 4,
                    ticks: {
                        stepSize: 1,
                        font: { size: 12, weight: 'bold' }
                    },
                    pointLabels: {
                        font: { size: 13, weight: 'bold' }
                    }
                } 
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function renderChartDesempeno(obs) {
    const niveles = { 'Insuficiente': 0, 'Básico': 0, 'Adecuado': 0, 'Destacado': 0 };
    obs.forEach(o => niveles[o.nivelDesempeno]++);
    
    if (charts.desempeno) charts.desempeno.destroy();
    
    const ctx = document.getElementById('chartDesempeno').getContext('2d');
    charts.desempeno = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(niveles),
            datasets: [{
                data: Object.values(niveles),
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'],
                borderWidth: 3,
                borderColor: '#fff'
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 13, weight: 'bold' }
                    }
                }
            }
        }
    });
}

// Tabla
function renderTable(obs) {
    const tbody = document.getElementById('tablaObservaciones');
    
    if (obs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: var(--space-2xl); color: var(--gray-500);">📭 No hay observaciones registradas</td></tr>';
        return;
    }
    
    const sorted = [...obs].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 10);
    
    tbody.innerHTML = sorted.map(o => {
        const nivelColor = {
            'Insuficiente': 'var(--danger-600)',
            'Básico': 'var(--warning-600)',
            'Adecuado': 'var(--success-600)',
            'Destacado': 'var(--info-600)'
        }[o.nivelDesempeno];
        
        return `
            <tr style="cursor: pointer;" onclick="alert('Ver detalle: ${o.id}')">
                <td style="font-weight: 600;">${o.fecha}</td>
                <td><strong style="color: var(--gray-900);">${o.docente}</strong></td>
                <td>${o.asignatura}</td>
                <td>${o.curso}</td>
                <td style="text-align: center;">
                    <span style="display: inline-block; padding: 8px 16px; background: ${nivelColor}; color: white; 
                                 border-radius: var(--radius-full); font-size: 16px; font-weight: 900;">
                        ${o.promedios.general.toFixed(1)}
                    </span>
                </td>
                <td>
                    <span style="padding: 6px 12px; background: ${nivelColor}20; color: ${nivelColor}; 
                                 border-radius: var(--radius-md); font-size: 13px; font-weight: 700; text-transform: uppercase;">
                        ${o.nivelDesempeno}
                    </span>
                </td>
                <td style="text-align: center;">
                    <button style="padding: 8px 16px; background: var(--primary-600); color: white; border: none; 
                                   border-radius: var(--radius-md); font-weight: 600; cursor: pointer; font-size: 13px;">
                        Ver Detalle
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Ranking de docentes
function renderRanking(obs) {
    const container = document.getElementById('rankingDocentes');
    
    if (obs.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--gray-500); padding: var(--space-xl);">📭 No hay datos para mostrar</p>';
        return;
    }
    
    const docentesData = {};
    obs.forEach(o => {
        if (!docentesData[o.docente]) {
            docentesData[o.docente] = { total: 0, count: 0, asignatura: o.asignatura };
        }
        docentesData[o.docente].total += o.promedios.general;
        docentesData[o.docente].count += 1;
    });
    
    const ranking = Object.entries(docentesData)
        .map(([nombre, data]) => ({
            nombre,
            promedio: data.total / data.count,
            observaciones: data.count,
            asignatura: data.asignatura
        }))
        .sort((a, b) => b.promedio - a.promedio)
        .slice(0, 5);
    
    container.innerHTML = ranking.map((d, index) => {
        const medalla = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'][index];
        const color = ['#FFD700', '#C0C0C0', '#CD7F32', '#667eea', '#764ba2'][index];
        
        return `
            <div style="display: flex; align-items: center; gap: var(--space-lg); padding: var(--space-lg); 
                        background: linear-gradient(135deg, ${color}10 0%, ${color}05 100%); 
                        border-radius: var(--radius-lg); border-left: 5px solid ${color};">
                <span style="font-size: 36px;">${medalla}</span>
                <div style="flex: 1;">
                    <div style="font-size: 18px; font-weight: 800; color: var(--gray-900);">${d.nombre}</div>
                    <div style="font-size: 14px; color: var(--gray-600); margin-top: 4px;">${d.asignatura} • ${d.observaciones} observaciones</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 32px; font-weight: 900; color: ${color};">${d.promedio.toFixed(1)}</div>
                    <div style="font-size: 12px; color: var(--gray-600); font-weight: 600;">PROMEDIO</div>
                </div>
            </div>
        `;
    }).join('');
}

// Próximos seguimientos
function renderSeguimientos(obs) {
    const container = document.getElementById('proximosSeguimientos');
    
    const pendientes = obs
        .filter(o => o.fechaProximaObservacion && o.estadoSeguimiento !== 'Cerrado')
        .sort((a, b) => new Date(a.fechaProximaObservacion) - new Date(b.fechaProximaObservacion))
        .slice(0, 5);
    
    if (pendientes.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--gray-500); padding: var(--space-xl);">✅ No hay seguimientos pendientes</p>';
        return;
    }
    
    container.innerHTML = pendientes.map(o => {
        const diasRestantes = Math.ceil((new Date(o.fechaProximaObservacion) - new Date()) / (1000 * 60 * 60 * 24));
        const urgente = diasRestantes <= 7;
        
        return `
            <div style="display: flex; align-items: center; gap: var(--space-lg); padding: var(--space-lg); 
                        background: ${urgente ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' : 'var(--gray-50)'}; 
                        border-radius: var(--radius-lg); border-left: 5px solid ${urgente ? 'var(--danger-600)' : 'var(--info-600)'};">
                <span style="font-size: 32px;">${urgente ? '⚠️' : '📅'}</span>
                <div style="flex: 1;">
                    <div style="font-size: 16px; font-weight: 800; color: var(--gray-900);">${o.docente}</div>
                    <div style="font-size: 14px; color: var(--gray-600); margin-top: 4px;">${o.asignatura} • ${o.curso}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 14px; font-weight: 700; color: ${urgente ? 'var(--danger-700)' : 'var(--info-700)'};">
                        ${o.fechaProximaObservacion}
                    </div>
                    <div style="font-size: 12px; color: var(--gray-600); margin-top: 4px;">
                        ${diasRestantes > 0 ? `En ${diasRestantes} días` : 'Hoy'}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Cargar datos
loadObservaciones();
