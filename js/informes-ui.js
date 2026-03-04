/**
 * EDUGEST - UI de Informes
 * Manejo de interfaz para generación de informes
 */

let informesGen;
let areaSeleccionada = null;
let chartInstance = null;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    informesGen = new InformesGenerator();
    cargarEstadisticasIniciales();
    configurarEventos();
});

/**
 * Cargar estadísticas iniciales
 */
function cargarEstadisticasIniciales() {
    const eventos = JSON.parse(localStorage.getItem('eventos') || '[]');
    
    // Contar eventos por área
    const areas = {
        'Currículum': 0,
        'Liderazgo': 0,
        'Convivencia': 0,
        'Recursos': 0
    };
    
    eventos.forEach(evento => {
        if (areas.hasOwnProperty(evento.area)) {
            areas[evento.area]++;
        }
    });
    
    // Actualizar UI
    document.getElementById('statCurriculum').textContent = `${areas['Currículum']} eventos`;
    document.getElementById('statLiderazgo').textContent = `${areas['Liderazgo']} eventos`;
    document.getElementById('statConvivencia').textContent = `${areas['Convivencia']} eventos`;
    document.getElementById('statRecursos').textContent = `${areas['Recursos']} eventos`;
    
    // Actualizar info del colegio
    const colegioInfo = informesGen.getColegioInfo();
    const infoElement = document.getElementById('colegioInfo');
    if (infoElement) {
        infoElement.textContent = `${colegioInfo.nombreColegio} - ${colegioInfo.año}`;
    }
}

/**
 * Configurar eventos de botones
 */
function configurarEventos() {
    const btnGenerarPDF = document.getElementById('btnGenerarPDF');
    if (btnGenerarPDF) {
        btnGenerarPDF.addEventListener('click', () => {
            if (areaSeleccionada === 'TODAS') {
                generarInformeGeneral();
            } else if (areaSeleccionada) {
                generarInformeArea();
            }
        });
    }
}

/**
 * Seleccionar área para informe
 */
function seleccionarArea(area) {
    areaSeleccionada = area;
    
    if (area === 'TODAS') {
        mostrarInformeGeneral();
    } else {
        mostrarInformeArea(area);
    }
}

/**
 * Mostrar informe de área específica
 */
function mostrarInformeArea(area) {
    const eventos = informesGen.getEventos({ area });
    
    if (eventos.length === 0) {
        alert(`No hay eventos registrados para el área de ${area}`);
        return;
    }
    
    // Calcular estadísticas
    const stats = calcularEstadisticasArea(eventos);
    
    // Actualizar UI
    const iconos = {
        'Currículum': '📚',
        'Liderazgo': '👔',
        'Convivencia': '🤝',
        'Recursos': '💼'
    };
    
    document.getElementById('areaIcono').textContent = iconos[area];
    document.getElementById('areaTitulo').textContent = `Estadísticas de ${area}`;
    document.getElementById('statEventos').textContent = stats.totalEventos;
    document.getElementById('statExito').textContent = `${stats.promedioLogro}%`;
    document.getElementById('statDocentes').textContent = stats.totalDocentes;
    document.getElementById('statMeta').textContent = `${stats.promedioMeta}%`;
    
    // Mostrar secciones
    document.getElementById('areaStats').style.display = 'block';
    document.getElementById('chartArea').style.display = 'block';
    document.getElementById('tablaEventos').style.display = 'block';
    document.getElementById('botonesInforme').style.display = 'block';
    
    // Generar gráfico
    generarGraficoArea(eventos);
    
    // Llenar tabla
    llenarTablaEventos(eventos);
    
    // Scroll suave
    document.getElementById('areaStats').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Mostrar informe general consolidado
 */
function mostrarInformeGeneral() {
    const eventos = informesGen.getEventos();
    
    if (eventos.length === 0) {
        alert('No hay eventos registrados en el sistema');
        return;
    }
    
    // Calcular estadísticas generales
    const stats = informesGen.calcularEstadisticas(eventos);
    
    // Actualizar UI
    document.getElementById('areaIcono').textContent = '📊';
    document.getElementById('areaTitulo').textContent = 'Estadísticas Generales - Todas las Áreas';
    document.getElementById('statEventos').textContent = stats.totalEventos;
    document.getElementById('statExito').textContent = `${stats.promedioLogro}%`;
    document.getElementById('statDocentes').textContent = stats.totalDocentes;
    document.getElementById('statMeta').textContent = 'N/A';
    
    // Mostrar secciones
    document.getElementById('areaStats').style.display = 'block';
    document.getElementById('chartArea').style.display = 'block';
    document.getElementById('tablaEventos').style.display = 'block';
    document.getElementById('botonesInforme').style.display = 'block';
    
    // Generar gráfico consolidado
    generarGraficoConsolidado(stats);
    
    // Llenar tabla con todos los eventos
    llenarTablaEventos(eventos);
    
    // Scroll suave
    document.getElementById('areaStats').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Calcular estadísticas de un área
 */
function calcularEstadisticasArea(eventos) {
    const stats = {
        totalEventos: eventos.length,
        promedioLogro: 0,
        promedioMeta: 0,
        totalDocentes: 0
    };
    
    if (eventos.length === 0) return stats;
    
    // Calcular promedios
    let sumaLogro = 0;
    let sumaMeta = 0;
    const docentes = new Set();
    
    eventos.forEach(evento => {
        sumaLogro += parseFloat(evento.porcentajeLogro) || 0;
        sumaMeta += parseFloat(evento.porcentajeMeta) || 0;
        if (evento.responsable) {
            docentes.add(evento.responsable);
        }
    });
    
    stats.promedioLogro = Math.round(sumaLogro / eventos.length);
    stats.promedioMeta = Math.round(sumaMeta / eventos.length);
    stats.totalDocentes = docentes.size;
    
    return stats;
}

/**
 * Generar gráfico para área específica
 */
function generarGraficoArea(eventos) {
    const ctx = document.getElementById('chartInforme');
    
    // Destruir gráfico anterior si existe
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    // Agrupar por mes
    const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 
                   'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    
    const datosPorMes = meses.map(mes => {
        const eventosMes = eventos.filter(e => e.mes === mes);
        return eventosMes.length;
    });
    
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses.map(m => m.substring(0, 3)),
            datasets: [{
                label: 'Eventos por Mes',
                data: datosPorMes,
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Distribución de Eventos por Mes',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

/**
 * Generar gráfico consolidado
 */
function generarGraficoConsolidado(stats) {
    const ctx = document.getElementById('chartInforme');
    
    // Destruir gráfico anterior si existe
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    const areas = ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'];
    const datos = areas.map(area => stats.porArea[area]?.eventos || 0);
    const colores = [
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(245, 158, 11, 0.8)'
    ];
    
    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: areas,
            datasets: [{
                label: 'Eventos por Área',
                data: datos,
                backgroundColor: colores,
                borderWidth: 3,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Distribución de Eventos por Área',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

/**
 * Llenar tabla de eventos
 */
function llenarTablaEventos(eventos) {
    const tbody = document.getElementById('tablaBody');
    tbody.innerHTML = '';
    
    // Ordenar por fecha (más recientes primero)
    eventos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    eventos.forEach(evento => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${evento.fecha || 'N/A'}</td>
            <td><span class="badge badge-${getBadgeClass(evento.area)}">${evento.area}</span></td>
            <td>${evento.accion || evento.estrategia || 'N/A'}</td>
            <td style="text-align: center;">${evento.numeroEventos || 0}</td>
            <td style="text-align: center;"><strong>${evento.porcentajeLogro || 0}%</strong></td>
            <td style="text-align: center;"><strong>${evento.porcentajeMeta || 0}%</strong></td>
            <td>${evento.responsable || 'N/A'}</td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * Obtener clase de badge según área
 */
function getBadgeClass(area) {
    const clases = {
        'Currículum': 'info',
        'Liderazgo': 'success',
        'Convivencia': 'warning',
        'Recursos': 'primary'
    };
    return clases[area] || 'secondary';
}

/**
 * Generar informe PDF del área
 */
async function generarInformeArea() {
    if (!areaSeleccionada) return;
    
    const eventos = informesGen.getEventos({ area: areaSeleccionada });
    
    if (eventos.length === 0) {
        alert('No hay eventos para generar el informe');
        return;
    }
    
    // Mostrar mensaje de carga
    const btnPDF = document.getElementById('btnGenerarPDF');
    const textoOriginal = btnPDF.innerHTML;
    btnPDF.innerHTML = '⏳ Generando PDF...';
    btnPDF.disabled = true;
    
    try {
        // Generar informe consolidado del área
        await informesGen.generarInformeGeneral({ area: areaSeleccionada });
        
        // Mensaje de éxito
        alert('✅ Informe PDF generado exitosamente');
    } catch (error) {
        console.error('Error al generar PDF:', error);
        alert('❌ Error al generar el informe PDF');
    } finally {
        btnPDF.innerHTML = textoOriginal;
        btnPDF.disabled = false;
    }
}

/**
 * Generar informe general PDF
 */
async function generarInformeGeneral() {
    const eventos = informesGen.getEventos();
    
    if (eventos.length === 0) {
        alert('No hay eventos para generar el informe');
        return;
    }
    
    // Mostrar mensaje de carga
    const btnPDF = document.getElementById('btnGenerarPDF');
    const textoOriginal = btnPDF.innerHTML;
    btnPDF.innerHTML = '⏳ Generando PDF...';
    btnPDF.disabled = true;
    
    try {
        await informesGen.generarInformeGeneral();
        
        // Mensaje de éxito
        alert('✅ Informe General PDF generado exitosamente');
    } catch (error) {
        console.error('Error al generar PDF:', error);
        alert('❌ Error al generar el informe PDF');
    } finally {
        btnPDF.innerHTML = textoOriginal;
        btnPDF.disabled = false;
    }
}

// Exportar funciones globales
window.seleccionarArea = seleccionarArea;
