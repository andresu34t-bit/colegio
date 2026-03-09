// Informes de Observaciones - Sistema de evaluación docente

let currentUser = null;
let allObservaciones = [];
let charts = {};

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
    
    populateFilters();
    setDefaultDates();
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

// Establecer fechas por defecto (último mes)
function setDefaultDates() {
    const hoy = new Date();
    const haceUnMes = new Date();
    haceUnMes.setMonth(haceUnMes.getMonth() - 1);
    
    document.getElementById('fechaHasta').valueAsDate = hoy;
    document.getElementById('fechaDesde').valueAsDate = haceUnMes;
}

// Generar informe
function generarInforme() {
    const fechaDesde = document.getElementById('fechaDesde').value;
    const fechaHasta = document.getElementById('fechaHasta').value;
    const docenteFilter = document.getElementById('docenteFilter').value;
    const asignaturaFilter = document.getElementById('asignaturaFilter').value;
    
    if (!fechaDesde || !fechaHasta) {
        alert('Por favor selecciona un rango de fechas');
        return;
    }
    
    let filtered = allObservaciones.filter(o => {
        const fecha = o.fecha;
        return fecha >= fechaDesde && fecha <= fechaHasta;
    });
    
    if (docenteFilter) {
        filtered = filtered.filter(o => o.docente === docenteFilter);
    }
    if (asignaturaFilter) {
        filtered = filtered.filter(o => o.asignatura === asignaturaFilter);
    }
    
    if (filtered.length === 0) {
        alert('No se encontraron observaciones en el período seleccionado');
        return;
    }
    
    renderStats(filtered);
    renderCharts(filtered);
    renderTable(filtered);
}

// Renderizar estadísticas
function renderStats(obs) {
    document.getElementById('totalObservaciones').textContent = obs.length;
    
    const promedio = obs.length > 0
        ? (obs.reduce((sum, o) => sum + o.promedios.general, 0) / obs.length).toFixed(1)
        : '0.0';
    document.getElementById('promedioGeneral').textContent = promedio;
    
    const docentes = new Set(obs.map(o => o.docente)).size;
    document.getElementById('docentesEvaluados').textContent = docentes;
    
    const destacados = obs.filter(o => o.nivelDesempeno === 'Destacado').length;
    const porcentaje = obs.length > 0 ? Math.round((destacados / obs.length) * 100) : 0;
    document.getElementById('porcentajeDestacado').textContent = porcentaje + '%';
}

// Renderizar gráficos
function renderCharts(obs) {
    renderChartNiveles(obs);
    renderChartEvolucion(obs);
    renderChartDimensiones(obs);
}

function renderChartNiveles(obs) {
    const niveles = { 'Insuficiente': 0, 'Básico': 0, 'Adecuado': 0, 'Destacado': 0 };
    obs.forEach(o => niveles[o.nivelDesempeno]++);
    
    if (charts.niveles) charts.niveles.destroy();
    
    const ctx = document.getElementById('chartNiveles').getContext('2d');
    charts.niveles = new Chart(ctx, {
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
                    labels: { padding: 15, font: { size: 13, weight: 'bold' } }
                }
            }
        }
    });
}

function renderChartEvolucion(obs) {
    const sorted = [...obs].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    const labels = sorted.map(o => o.fecha);
    const data = sorted.map(o => o.promedios.general);
    
    if (charts.evolucion) charts.evolucion.destroy();
    
    const ctx = document.getElementById('chartEvolucion').getContext('2d');
    charts.evolucion = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Promedio',
                data: data,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: { beginAtZero: true, max: 4, ticks: { stepSize: 1 } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
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
        type: 'bar',
        data: {
            labels: ['📋 Planificación', '🎯 Enseñanza', '✅ Evaluación', '👥 Gestión', '🤝 Inclusión'],
            datasets: [{
                label: 'Promedio',
                data: data,
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
                borderWidth: 0,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: { beginAtZero: true, max: 4, ticks: { stepSize: 1 } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Renderizar tabla detallada
function renderTable(obs) {
    const tbody = document.getElementById('tablaDetalle');
    
    const docentesData = {};
    obs.forEach(o => {
        if (!docentesData[o.docente]) {
            docentesData[o.docente] = {
                asignatura: o.asignatura,
                count: 0,
                totalGeneral: 0,
                totalA: 0,
                totalB: 0,
                totalC: 0,
                totalD: 0,
                totalE: 0,
                niveles: { 'Insuficiente': 0, 'Básico': 0, 'Adecuado': 0, 'Destacado': 0 }
            };
        }
        const d = docentesData[o.docente];
        d.count++;
        d.totalGeneral += o.promedios.general;
        d.totalA += o.promedios.A;
        d.totalB += o.promedios.B;
        d.totalC += o.promedios.C;
        d.totalD += o.promedios.D;
        d.totalE += o.promedios.E;
        d.niveles[o.nivelDesempeno]++;
    });
    
    const rows = Object.entries(docentesData).map(([nombre, data]) => {
        const promedio = data.totalGeneral / data.count;
        const nivelPredominante = Object.entries(data.niveles)
            .sort((a, b) => b[1] - a[1])[0][0];
        
        const nivelColor = {
            'Insuficiente': 'var(--danger-600)',
            'Básico': 'var(--warning-600)',
            'Adecuado': 'var(--success-600)',
            'Destacado': 'var(--info-600)'
        }[nivelPredominante];
        
        return {
            nombre,
            asignatura: data.asignatura,
            count: data.count,
            promedio: promedio,
            A: data.totalA / data.count,
            B: data.totalB / data.count,
            C: data.totalC / data.count,
            D: data.totalD / data.count,
            E: data.totalE / data.count,
            nivel: nivelPredominante,
            color: nivelColor
        };
    }).sort((a, b) => b.promedio - a.promedio);
    
    tbody.innerHTML = rows.map(r => `
        <tr style="border-bottom: 1px solid var(--gray-200);">
            <td style="padding: var(--space-md); font-weight: 700; color: var(--gray-900);">${r.nombre}</td>
            <td style="padding: var(--space-md); color: var(--gray-700);">${r.asignatura}</td>
            <td style="padding: var(--space-md); text-align: center; font-weight: 600;">${r.count}</td>
            <td style="padding: var(--space-md); text-align: center;">
                <span style="display: inline-block; padding: 6px 12px; background: ${r.color}; color: white; 
                             border-radius: var(--radius-full); font-size: 14px; font-weight: 900;">
                    ${r.promedio.toFixed(1)}
                </span>
            </td>
            <td style="padding: var(--space-md); text-align: center; font-weight: 600;">${r.A.toFixed(1)}</td>
            <td style="padding: var(--space-md); text-align: center; font-weight: 600;">${r.B.toFixed(1)}</td>
            <td style="padding: var(--space-md); text-align: center; font-weight: 600;">${r.C.toFixed(1)}</td>
            <td style="padding: var(--space-md); text-align: center; font-weight: 600;">${r.D.toFixed(1)}</td>
            <td style="padding: var(--space-md); text-align: center; font-weight: 600;">${r.E.toFixed(1)}</td>
            <td style="padding: var(--space-md);">
                <span style="padding: 6px 12px; background: ${r.color}20; color: ${r.color}; 
                             border-radius: var(--radius-md); font-size: 12px; font-weight: 700; text-transform: uppercase;">
                    ${r.nivel}
                </span>
            </td>
        </tr>
    `).join('');
}

// Exportar PDF
function exportarPDF() {
    alert('Funcionalidad de exportación a PDF en desarrollo.\n\nPróximamente podrás descargar informes en formato PDF.');
}

// Exportar Excel
function exportarExcel() {
    alert('Funcionalidad de exportación a Excel en desarrollo.\n\nPróximamente podrás descargar informes en formato Excel.');
}

// Cargar datos al iniciar
loadObservaciones();
