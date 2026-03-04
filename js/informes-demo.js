// Sistema de informes por área

let currentUser = null;
let allEventos = [];
let currentChart = null;

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

// Logout (solo recarga la página)
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.reload();
});

// Cargar eventos
function loadEventos() {
    const eventosStr = localStorage.getItem('demoEventos');
    const todosEventos = eventosStr ? JSON.parse(eventosStr) : [];
    allEventos = todosEventos.filter(e => e.colegioId === currentUser.colegioId);
    console.log(`✅ ${allEventos.length} eventos cargados`);
}

loadEventos();

// Cargar estadísticas de áreas
function cargarEstadisticasAreas() {
    const areas = ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'];
    areas.forEach(area => {
        const eventosArea = allEventos.filter(e => e.area === area);
        const totalEventos = eventosArea.reduce((sum, e) => sum + (e.n_eventos || 0), 0);
        
        const elementId = 'stat' + area.replace(' ', '');
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = `${totalEventos} eventos`;
        }
    });
}

// Función para seleccionar área (reemplaza el selector)
function seleccionarArea(area) {
    generarInforme(area);
}

// Selector de área (mantener compatibilidad)
const areaSelect = document.getElementById('areaSelect');
if (areaSelect) {
    areaSelect.addEventListener('change', (e) => {
        const area = e.target.value;
        if (area) {
            generarInforme(area);
        }
    });
}

function generarInforme(area) {
    // Filtrar eventos
    let eventosFiltrados;
    if (area === 'TODAS') {
        eventosFiltrados = allEventos;
    } else {
        eventosFiltrados = allEventos.filter(e => e.area === area);
    }
    
    if (eventosFiltrados.length === 0) {
        alert(`No hay eventos registrados para ${area === 'TODAS' ? 'ninguna área' : area}`);
        return;
    }
    
    // Mostrar estadísticas
    mostrarEstadisticas(area, eventosFiltrados);
    
    // Mostrar gráfico
    mostrarGrafico(area, eventosFiltrados);
    
    // Mostrar tabla
    mostrarTabla(eventosFiltrados);
    
    // Mostrar botones
    document.getElementById('botonesInforme').style.display = 'flex';
}

function mostrarEstadisticas(area, eventos) {
    const totalEventos = eventos.reduce((sum, e) => sum + (e.n_eventos || 0), 0);
    const promedioExito = eventos.length > 0 
        ? Math.round(eventos.reduce((sum, e) => sum + (e.exito_objetivo || 0), 0) / eventos.length)
        : 0;
    const totalDocentes = new Set(eventos.map(e => e.docente)).size;
    const promedioMeta = eventos.length > 0
        ? Math.round(eventos.reduce((sum, e) => sum + (e.exito_meta || 0), 0) / eventos.length)
        : 0;
    
    document.getElementById('areaTitulo').textContent = 
        area === 'TODAS' ? 'Estadísticas Generales - Todas las Áreas' : `Estadísticas - ${area}`;
    document.getElementById('statEventos').textContent = totalEventos;
    document.getElementById('statExito').textContent = promedioExito + '%';
    document.getElementById('statDocentes').textContent = totalDocentes;
    document.getElementById('statMeta').textContent = promedioMeta + '%';
    
    document.getElementById('areaStats').style.display = 'block';
}

function mostrarGrafico(area, eventos) {
    if (currentChart) {
        currentChart.destroy();
    }
    
    const ctx = document.getElementById('chartInforme').getContext('2d');
    
    if (area === 'TODAS') {
        // Gráfico por área
        const areas = ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'];
        const data = areas.map(a => {
            const eventosArea = eventos.filter(e => e.area === a);
            return eventosArea.reduce((sum, e) => sum + (e.n_eventos || 0), 0);
        });
        
        currentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: areas,
                datasets: [{
                    label: 'Total Eventos por Área',
                    data: data,
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribución de Eventos por Área',
                        font: { size: 16 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        // Gráfico por mes para el área específica
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
        
        currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: meses,
                datasets: [{
                    label: `Eventos - ${area}`,
                    data: data,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Evolución Mensual - ${area}`,
                        font: { size: 16 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    document.getElementById('chartArea').style.display = 'block';
}

function mostrarTabla(eventos) {
    const tbody = document.getElementById('tablaBody');
    tbody.innerHTML = '';
    
    // Ordenar por fecha (mes y día)
    const mesesOrden = {
        'ENERO': 1, 'FEBRERO': 2, 'MARZO': 3, 'ABRIL': 4, 'MAYO': 5, 'JUNIO': 6,
        'JULIO': 7, 'AGOSTO': 8, 'SEPTIEMBRE': 9, 'OCTUBRE': 10, 'NOVIEMBRE': 11, 'DICIEMBRE': 12
    };
    
    eventos.sort((a, b) => {
        const mesA = mesesOrden[a.mes] || 0;
        const mesB = mesesOrden[b.mes] || 0;
        if (mesA !== mesB) return mesA - mesB;
        return (a.dia || 0) - (b.dia || 0);
    });
    
    eventos.forEach(e => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid #e2e8f0';
        row.innerHTML = `
            <td style="padding: 12px;">${e.dia} ${e.mes}</td>
            <td style="padding: 12px;">${e.area}</td>
            <td style="padding: 12px;">${e.accion}</td>
            <td style="padding: 12px; text-align: center;">${e.n_eventos}</td>
            <td style="padding: 12px; text-align: center;">${e.exito_objetivo}%</td>
            <td style="padding: 12px;">${e.docente}</td>
        `;
        tbody.appendChild(row);
    });
    
    document.getElementById('tablaEventos').style.display = 'block';
}

// Generar PDF
document.getElementById('btnGenerarPDF').addEventListener('click', async () => {
    const area = document.getElementById('areaSelect').value;
    
    if (!area) {
        alert('Selecciona un área primero');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Título
    pdf.setFontSize(18);
    pdf.text(`Informe PME 2026`, 105, 20, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.text(currentUser.colegioNombre, 105, 30, { align: 'center' });
    
    pdf.setFontSize(12);
    const areaTitulo = area === 'TODAS' ? 'Todas las Áreas' : area;
    pdf.text(`Área: ${areaTitulo}`, 105, 40, { align: 'center' });
    
    // Fecha
    pdf.setFontSize(10);
    const fecha = new Date().toLocaleDateString('es-CL');
    pdf.text(`Fecha de generación: ${fecha}`, 105, 50, { align: 'center' });
    
    // Estadísticas
    pdf.setFontSize(12);
    pdf.text('Estadísticas:', 20, 65);
    
    pdf.setFontSize(10);
    const stats = [
        `Total Eventos: ${document.getElementById('statEventos').textContent}`,
        `Promedio Éxito: ${document.getElementById('statExito').textContent}`,
        `Docentes: ${document.getElementById('statDocentes').textContent}`,
        `Promedio Meta: ${document.getElementById('statMeta').textContent}`
    ];
    
    stats.forEach((stat, i) => {
        pdf.text(stat, 25, 75 + (i * 7));
    });
    
    // Capturar gráfico
    const canvas = document.getElementById('chartInforme');
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 20, 105, 170, 85);
    
    // Nueva página para tabla
    pdf.addPage();
    pdf.setFontSize(12);
    pdf.text('Detalle de Eventos', 20, 20);
    
    // Tabla simplificada
    const eventosFiltrados = area === 'TODAS' 
        ? allEventos 
        : allEventos.filter(e => e.area === area);
    
    pdf.setFontSize(8);
    let y = 30;
    
    eventosFiltrados.slice(0, 30).forEach((e, i) => {
        if (y > 270) {
            pdf.addPage();
            y = 20;
        }
        
        const texto = `${e.dia}/${e.mes} - ${e.area} - ${e.accion} - ${e.n_eventos} eventos - ${e.exito_objetivo}% éxito - ${e.docente}`;
        pdf.text(texto, 20, y);
        y += 7;
    });
    
    // Pie de página
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.text(`Página ${i} de ${totalPages}`, 105, 290, { align: 'center' });
        pdf.text(`Generado por: ${currentUser.nombre}`, 20, 290);
    }
    
    // Guardar
    const nombreArchivo = `Informe_PME_${areaTitulo.replace(/ /g, '_')}_${fecha.replace(/\//g, '-')}.pdf`;
    pdf.save(nombreArchivo);
    
    alert(`✅ Informe PDF generado: ${nombreArchivo}`);
});

// Cargar estadísticas de áreas
function cargarEstadisticasAreas() {
    const areas = ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'];
    areas.forEach(area => {
        const eventosArea = allEventos.filter(e => e.area === area);
        const totalEventos = eventosArea.reduce((sum, e) => sum + (e.n_eventos || 0), 0);
        
        const elementId = 'stat' + area.replace(' ', '');
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = `${totalEventos} eventos`;
        }
    });
}

// Función para seleccionar área (nueva interfaz)
function seleccionarArea(area) {
    generarInforme(area);
}

// Cargar estadísticas al iniciar
cargarEstadisticasAreas();

// Agregar estilos hover para las áreas
const style = document.createElement('style');
style.textContent = `
    .area-option:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
`;
document.head.appendChild(style);