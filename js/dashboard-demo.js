// Dashboard multi-colegio (cada colegio ve solo sus datos)

let currentUser = null;
let allEventos = [];
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
    // Actualizar información del usuario en el sidebar
    const userNameEl = document.getElementById('userName');
    const userRoleEl = document.getElementById('userRole');
    const userAvatarEl = document.getElementById('userAvatar');
    
    if (userNameEl) userNameEl.textContent = currentUser.nombre;
    if (userRoleEl) userRoleEl.textContent = getRoleName(currentUser.rol);
    if (userAvatarEl) userAvatarEl.textContent = currentUser.nombre.charAt(0).toUpperCase();
    
    // Actualizar título del dashboard con nombre del colegio
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle && currentUser.colegioNombre) {
        pageTitle.textContent = `Dashboard PME 2026 - ${currentUser.colegioNombre}`;
    }
    
    // Mostrar finanzas solo si tiene permiso
    const navFinanzas = document.getElementById('navFinanzas');
    if (navFinanzas && currentUser.permisoFinanzas) {
        navFinanzas.style.display = 'block';
    }
}

function getRoleName(rol) {
    const roles = {
        'director': 'Director',
        'utp': 'UTP',
        'docente': 'Docente',
        'administrador': 'Administrador',
        'superadmin': 'Super Administrador'
    };
    return roles[rol] || rol;
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('demoUser');
    window.location.href = 'index.html';
});

// Cargar eventos desde localStorage (solo del colegio actual)
function loadEventos() {
    const eventosStr = localStorage.getItem('demoEventos');
    const todosEventos = eventosStr ? JSON.parse(eventosStr) : [];
    
    // Filtrar solo eventos del colegio actual
    allEventos = todosEventos.filter(e => e.colegioId === currentUser.colegioId);
    
    // Si no hay eventos, crear datos demo para este colegio
    if (allEventos.length === 0) {
        allEventos = getEventosDemo();
        // Guardar eventos demo
        const eventosActualizados = [...todosEventos, ...allEventos];
        localStorage.setItem('demoEventos', JSON.stringify(eventosActualizados));
    }
    
    console.log(`✅ ${allEventos.length} eventos cargados para ${currentUser.colegioNombre}`);
    filterAndRender();
}

// Datos de ejemplo para el colegio actual
function getEventosDemo() {
    // Cargar eventos desde localStorage
    const eventosStr = localStorage.getItem('eventos');
    if (eventosStr) {
        const todosEventos = JSON.parse(eventosStr);
        // Filtrar por colegio del usuario actual
        return todosEventos.filter(e => e.colegioId === currentUser.colegioId);
    }
    
    // Si no hay eventos en localStorage, retornar datos por defecto
    return [
        {
            colegioId: currentUser.colegioId,
            dia: 15, mes: 'MARZO', area: 'Currículum', accion: 'Talleres de lectura',
            n_eventos: 5, exito_objetivo: 85, meta: 10, exito_meta: 50,
            docente: 'María González', descripcion: 'Talleres de comprensión lectora'
        },
        {
            colegioId: currentUser.colegioId,
            dia: 20, mes: 'MARZO', area: 'Liderazgo', accion: 'Reuniones de coordinación',
            n_eventos: 3, exito_objetivo: 90, meta: 8, exito_meta: 60,
            docente: 'Juan Pérez', descripcion: 'Coordinación equipo directivo'
        },
        {
            colegioId: currentUser.colegioId,
            dia: 25, mes: 'ABRIL', area: 'Convivencia', accion: 'Actividades de convivencia',
            n_eventos: 4, exito_objetivo: 75, meta: 12, exito_meta: 40,
            docente: 'Ana Silva', descripcion: 'Jornadas de convivencia escolar'
        },
        {
            colegioId: currentUser.colegioId,
            dia: 10, mes: 'ABRIL', area: 'Recursos', accion: 'Gestión de recursos',
            n_eventos: 2, exito_objetivo: 80, meta: 6, exito_meta: 55,
            docente: 'Carlos Rojas', descripcion: 'Administración de materiales'
        },
        {
            colegioId: currentUser.colegioId,
            dia: 5, mes: 'MAYO', area: 'Currículum', accion: 'Evaluaciones formativas',
            n_eventos: 6, exito_objetivo: 88, meta: 15, exito_meta: 65,
            docente: 'María González', descripcion: 'Aplicación de evaluaciones'
        }
    ];
}

// Filtro por mes
document.getElementById('mesFilter').addEventListener('change', filterAndRender);

function filterAndRender() {
    const mesFilter = document.getElementById('mesFilter').value;
    
    let filteredEventos = allEventos;
    if (mesFilter) {
        filteredEventos = allEventos.filter(e => e.mes === mesFilter);
    }
    
    renderStats(filteredEventos);
    renderCharts(filteredEventos);
}

// Renderizar estadísticas
function renderStats(eventos) {
    const totalEventos = eventos.reduce((sum, e) => sum + (e.n_eventos || 0), 0);
    const promedioExito = eventos.length > 0 
        ? Math.round(eventos.reduce((sum, e) => sum + (e.exito_objetivo || 0), 0) / eventos.length)
        : 0;
    const areasActivas = new Set(eventos.map(e => e.area)).size;
    const totalDocentes = new Set(eventos.map(e => e.docente)).size;
    
    document.getElementById('totalEventos').textContent = totalEventos;
    document.getElementById('promedioExito').textContent = promedioExito + '%';
    document.getElementById('areasActivas').textContent = areasActivas;
    document.getElementById('totalDocentes').textContent = totalDocentes;
}

// Renderizar gráficos
function renderCharts(eventos) {
    renderChartAcciones(eventos);
    renderChartMeses(eventos);
    renderChartAreas(eventos);
    renderChartDocentes(eventos);
}

// Gráfico 1: % Éxito por Acción
function renderChartAcciones(eventos) {
    const accionesData = {};
    
    eventos.forEach(e => {
        const key = `Acción ${e.accion}`;
        if (!accionesData[key]) {
            accionesData[key] = { total: 0, count: 0 };
        }
        accionesData[key].total += e.exito_objetivo || 0;
        accionesData[key].count += 1;
    });
    
    const labels = Object.keys(accionesData).sort();
    const data = labels.map(label => 
        Math.round(accionesData[label].total / accionesData[label].count)
    );
    
    if (charts.acciones) charts.acciones.destroy();
    
    const ctx = document.getElementById('chartAcciones').getContext('2d');
    charts.acciones = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '% Éxito',
                data: data,
                backgroundColor: '#3b82f6'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Gráfico 2: Eventos por Mes
function renderChartMeses(eventos) {
    const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 
                   'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    
    const mesesData = {};
    meses.forEach(m => mesesData[m] = 0);
    
    eventos.forEach(e => {
        if (e.mes && mesesData.hasOwnProperty(e.mes)) {
            mesesData[e.mes] += e.n_eventos || 0;
        }
    });
    
    const data = meses.map(m => mesesData[m]);
    
    if (charts.meses) charts.meses.destroy();
    
    const ctx = document.getElementById('chartMeses').getContext('2d');
    charts.meses = new Chart(ctx, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [{
                label: 'N° Eventos',
                data: data,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Gráfico 3: Promedio Metas por Área
function renderChartAreas(eventos) {
    const areas = ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'];
    const areasData = {};
    
    areas.forEach(a => areasData[a] = { total: 0, count: 0 });
    
    eventos.forEach(e => {
        if (e.area && areasData.hasOwnProperty(e.area)) {
            areasData[e.area].total += e.meta || 0;
            areasData[e.area].count += 1;
        }
    });
    
    const data = areas.map(a => 
        areasData[a].count > 0 ? Math.round(areasData[a].total / areasData[a].count) : 0
    );
    
    if (charts.areas) charts.areas.destroy();
    
    const ctx = document.getElementById('chartAreas').getContext('2d');
    charts.areas = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: areas,
            datasets: [{
                label: 'Promedio Metas',
                data: data,
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.2)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Gráfico 4: Eventos por Docente
function renderChartDocentes(eventos) {
    const docentesData = {};
    
    eventos.forEach(e => {
        if (!docentesData[e.docente]) {
            docentesData[e.docente] = 0;
        }
        docentesData[e.docente] += e.n_eventos || 0;
    });
    
    const labels = Object.keys(docentesData);
    const data = labels.map(d => docentesData[d]);
    
    if (charts.docentes) charts.docentes.destroy();
    
    const ctx = document.getElementById('chartDocentes').getContext('2d');
    charts.docentes = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6',
                    '#ec4899'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

// Generar PDF
document.getElementById('btnGenerarPDF').addEventListener('click', () => {
    window.location.href = 'informes.html';
});

// Cargar datos al iniciar
loadEventos();
