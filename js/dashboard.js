import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { collection, query, getDocs, where } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Variables globales
let currentUser = null;
let allEventos = [];
let charts = {};

// Verificar autenticación
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    currentUser = user;
    document.getElementById('userName').textContent = user.email.split('@')[0];
    
    // Determinar rol (simplificado: si es director@, es director)
    const isDirector = user.email.includes('director');
    document.getElementById('userRole').textContent = isDirector ? 'Director' : 'Docente';
    
    // Mostrar finanzas solo para director
    if (isDirector) {
        document.getElementById('navFinanzas').style.display = 'block';
    }
    
    // Cargar datos
    loadEventos();
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'index.html';
});

// Cargar eventos desde Firebase
async function loadEventos() {
    try {
        const eventosRef = collection(db, 'eventos');
        const snapshot = await getDocs(eventosRef);
        
        allEventos = [];
        snapshot.forEach((doc) => {
            allEventos.push({ id: doc.id, ...doc.data() });
        });
        
        console.log(`✅ ${allEventos.length} eventos cargados`);
        
        // Aplicar filtro inicial
        filterAndRender();
    } catch (error) {
        console.error('❌ Error cargando eventos:', error);
    }
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
document.getElementById('btnGenerarPDF').addEventListener('click', async () => {
    alert('Función de PDF en desarrollo. Próximamente con jsPDF + html2pdf.');
});
