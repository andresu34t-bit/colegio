/**
 * EDUGEST - Lista de Eventos
 * Gestión y visualización de eventos con generación de informes individuales
 */

let informesGen;
let todosLosEventos = [];
let eventosFiltrados = [];

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    informesGen = new InformesGenerator();
    cargarEventos();
    configurarFiltros();
});

/**
 * Cargar eventos desde localStorage
 */
function cargarEventos() {
    todosLosEventos = JSON.parse(localStorage.getItem('eventos') || '[]');
    eventosFiltrados = [...todosLosEventos];
    
    actualizarEstadisticas();
    renderizarEventos();
}

/**
 * Configurar filtros
 */
function configurarFiltros() {
    const filtroArea = document.getElementById('filtroArea');
    const filtroMes = document.getElementById('filtroMes');
    const buscarEvento = document.getElementById('buscarEvento');
    
    filtroArea.addEventListener('change', aplicarFiltros);
    filtroMes.addEventListener('change', aplicarFiltros);
    buscarEvento.addEventListener('input', aplicarFiltros);
}

/**
 * Aplicar filtros
 */
function aplicarFiltros() {
    const area = document.getElementById('filtroArea').value;
    const mes = document.getElementById('filtroMes').value;
    const busqueda = document.getElementById('buscarEvento').value.toLowerCase();
    
    eventosFiltrados = todosLosEventos.filter(evento => {
        const cumpleArea = !area || evento.area === area;
        const cumpleMes = !mes || evento.mes === mes;
        const cumpleBusqueda = !busqueda || 
            (evento.descripcion && evento.descripcion.toLowerCase().includes(busqueda)) ||
            (evento.accion && evento.accion.toLowerCase().includes(busqueda)) ||
            (evento.estrategia && evento.estrategia.toLowerCase().includes(busqueda)) ||
            (evento.responsable && evento.responsable.toLowerCase().includes(busqueda));
        
        return cumpleArea && cumpleMes && cumpleBusqueda;
    });
    
    actualizarEstadisticas();
    renderizarEventos();
}

/**
 * Limpiar filtros
 */
function limpiarFiltros() {
    document.getElementById('filtroArea').value = '';
    document.getElementById('filtroMes').value = '';
    document.getElementById('buscarEvento').value = '';
    aplicarFiltros();
}

/**
 * Actualizar estadísticas
 */
function actualizarEstadisticas() {
    document.getElementById('totalEventos').textContent = todosLosEventos.length;
    document.getElementById('eventosFiltrados').textContent = eventosFiltrados.length;
    
    if (eventosFiltrados.length > 0) {
        const sumaLogro = eventosFiltrados.reduce((sum, e) => sum + (parseFloat(e.porcentajeLogro) || 0), 0);
        const promedio = Math.round(sumaLogro / eventosFiltrados.length);
        document.getElementById('promedioLogro').textContent = `${promedio}%`;
    } else {
        document.getElementById('promedioLogro').textContent = '0%';
    }
}

/**
 * Renderizar eventos
 */
function renderizarEventos() {
    const container = document.getElementById('listaEventos');
    const sinEventos = document.getElementById('sinEventos');
    
    if (eventosFiltrados.length === 0) {
        container.style.display = 'none';
        sinEventos.style.display = 'block';
        return;
    }
    
    container.style.display = 'block';
    sinEventos.style.display = 'none';
    container.innerHTML = '';
    
    // Ordenar por fecha (más recientes primero)
    eventosFiltrados.sort((a, b) => {
        const fechaA = new Date(a.fecha || '2026-01-01');
        const fechaB = new Date(b.fecha || '2026-01-01');
        return fechaB - fechaA;
    });
    
    eventosFiltrados.forEach(evento => {
        const eventoCard = crearTarjetaEvento(evento);
        container.appendChild(eventoCard);
    });
}

/**
 * Crear tarjeta de evento
 */
function crearTarjetaEvento(evento) {
    const div = document.createElement('div');
    div.className = 'card';
    div.style.cssText = 'border-left: 4px solid ' + getColorArea(evento.area);
    
    const iconoArea = getIconoArea(evento.area);
    const colorArea = getColorArea(evento.area);
    
    div.innerHTML = `
        <div class="card-body">
            <div style="display: grid; grid-template-columns: 1fr auto; gap: var(--space-4); align-items: start;">
                <div>
                    <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-3);">
                        <span style="font-size: 2rem;">${iconoArea}</span>
                        <div>
                            <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-1);">
                                <span class="badge" style="background: ${colorArea}; color: white; font-weight: 700;">
                                    ${evento.area}
                                </span>
                                <span style="color: var(--gray-500); font-size: 0.875rem;">
                                    ${evento.fecha || 'Sin fecha'} • ${evento.mes || 'Sin mes'}
                                </span>
                            </div>
                            <h3 style="margin: 0; font-size: 1.125rem; font-weight: 700; color: var(--gray-900);">
                                ${evento.accion || evento.estrategia || 'Sin título'}
                            </h3>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: var(--space-4);">
                        <p style="color: var(--gray-700); margin: 0; line-height: 1.6;">
                            ${evento.descripcion || 'Sin descripción'}
                        </p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--space-3); margin-bottom: var(--space-4);">
                        <div style="background: var(--gray-50); padding: var(--space-3); border-radius: var(--radius-lg);">
                            <div style="font-size: 0.75rem; color: var(--gray-600); font-weight: 600; margin-bottom: var(--space-1);">
                                N° Eventos
                            </div>
                            <div style="font-size: 1.5rem; font-weight: 800; color: var(--gray-900);">
                                ${evento.numeroEventos || 0}
                            </div>
                        </div>
                        
                        <div style="background: var(--success-50); padding: var(--space-3); border-radius: var(--radius-lg);">
                            <div style="font-size: 0.75rem; color: var(--success-700); font-weight: 600; margin-bottom: var(--space-1);">
                                % Logro Objetivo
                            </div>
                            <div style="font-size: 1.5rem; font-weight: 800; color: var(--success-700);">
                                ${evento.porcentajeLogro || 0}%
                            </div>
                        </div>
                        
                        <div style="background: var(--info-50); padding: var(--space-3); border-radius: var(--radius-lg);">
                            <div style="font-size: 0.75rem; color: var(--info-700); font-weight: 600; margin-bottom: var(--space-1);">
                                % Logro Meta
                            </div>
                            <div style="font-size: 1.5rem; font-weight: 800; color: var(--info-700);">
                                ${evento.porcentajeMeta || 0}%
                            </div>
                        </div>
                        
                        <div style="background: var(--warning-50); padding: var(--space-3); border-radius: var(--radius-lg);">
                            <div style="font-size: 0.75rem; color: var(--warning-700); font-weight: 600; margin-bottom: var(--space-1);">
                                Responsable
                            </div>
                            <div style="font-size: 0.875rem; font-weight: 700; color: var(--warning-700);">
                                ${evento.responsable || 'Sin asignar'}
                            </div>
                        </div>
                    </div>
                    
                    ${evento.subdimension ? `
                    <div style="margin-bottom: var(--space-3);">
                        <span style="font-size: 0.75rem; color: var(--gray-600); font-weight: 600;">Subdimensión:</span>
                        <span style="font-size: 0.875rem; color: var(--gray-800);">${evento.subdimension}</span>
                    </div>
                    ` : ''}
                    
                    ${evento.objetivoEstrategico ? `
                    <div style="margin-bottom: var(--space-3);">
                        <span style="font-size: 0.75rem; color: var(--gray-600); font-weight: 600;">Objetivo:</span>
                        <span style="font-size: 0.875rem; color: var(--gray-800);">${evento.objetivoEstrategico}</span>
                    </div>
                    ` : ''}
                </div>
                
                <div style="display: flex; flex-direction: column; gap: var(--space-2);">
                    <button class="btn btn-primary" onclick="generarInformeIndividual('${evento.id}')" 
                            style="white-space: nowrap;">
                        <span>📄</span>
                        <span>Generar Informe</span>
                    </button>
                    
                    <button class="btn btn-secondary" onclick="editarEvento('${evento.id}')"
                            style="white-space: nowrap;">
                        <span>✏️</span>
                        <span>Editar</span>
                    </button>
                    
                    <button class="btn btn-danger" onclick="eliminarEvento('${evento.id}')"
                            style="white-space: nowrap; background: var(--danger-600); border-color: var(--danger-600);">
                        <span>🗑️</span>
                        <span>Eliminar</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return div;
}

/**
 * Generar informe individual
 */
async function generarInformeIndividual(eventoId) {
    const evento = todosLosEventos.find(e => e.id === eventoId);
    
    if (!evento) {
        alert('Evento no encontrado');
        return;
    }
    
    try {
        await informesGen.generarInformeEvento(eventoId);
        alert('✅ Informe individual generado exitosamente');
    } catch (error) {
        console.error('Error al generar informe:', error);
        alert('❌ Error al generar el informe');
    }
}

/**
 * Editar evento
 */
function editarEvento(eventoId) {
    // Guardar ID del evento a editar
    localStorage.setItem('eventoEditando', eventoId);
    // Redirigir al formulario
    window.location.href = 'formulario.html';
}

/**
 * Eliminar evento
 */
function eliminarEvento(eventoId) {
    if (!confirm('¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.')) {
        return;
    }
    
    // Filtrar el evento
    todosLosEventos = todosLosEventos.filter(e => e.id !== eventoId);
    
    // Guardar en localStorage
    localStorage.setItem('eventos', JSON.stringify(todosLosEventos));
    
    // Recargar
    cargarEventos();
    
    alert('✅ Evento eliminado exitosamente');
}

/**
 * Obtener icono según área
 */
function getIconoArea(area) {
    const iconos = {
        'Currículum': '📚',
        'Liderazgo': '👔',
        'Convivencia': '🤝',
        'Recursos': '💼'
    };
    return iconos[area] || '📋';
}

/**
 * Obtener color según área
 */
function getColorArea(area) {
    const colores = {
        'Currículum': '#3b82f6',
        'Liderazgo': '#a855f7',
        'Convivencia': '#22c55e',
        'Recursos': '#f59e0b'
    };
    return colores[area] || '#6b7280';
}

// Exportar funciones globales
window.limpiarFiltros = limpiarFiltros;
window.generarInformeIndividual = generarInformeIndividual;
window.editarEvento = editarEvento;
window.eliminarEvento = eliminarEvento;
