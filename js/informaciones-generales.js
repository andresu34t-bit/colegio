// Verificar autenticación y colegio
const userId = localStorage.getItem('userId');
const userRole = localStorage.getItem('userRole');
const colegioActual = localStorage.getItem('colegioActual');

if (!userId || !colegioActual) {
    window.location.href = 'seleccionar-colegio.html';
}

// Mostrar información del usuario y colegio
document.getElementById('userName').textContent = localStorage.getItem('userName') || 'Usuario';
document.getElementById('userRole').textContent = userRole || 'Rol';

// Mostrar nombre del colegio en el info
const colegio = obtenerColegioActual();
if (colegio) {
    document.getElementById('colegioInfo').textContent = `${colegio.nombre} - Selecciona el área de gestión para registrar tu evento`;
}

// Mostrar/ocultar finanzas según rol
if (userRole === 'director' || userRole === 'administrador') {
    const navFinanzas = document.getElementById('navFinanzas');
    if (navFinanzas) navFinanzas.style.display = 'flex';
}

// Cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('¿Estás seguro de cerrar sesión?')) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
});

// Cargar informaciones al iniciar
window.addEventListener('DOMContentLoaded', () => {
    cargarInformaciones();
});

// Manejar envío del formulario
document.getElementById('formInformacionGeneral').addEventListener('submit', (e) => {
    e.preventDefault();
    guardarInformacion();
});

// Función para guardar información
function guardarInformacion() {
    const informacion = {
        dimension: document.getElementById('dimension').value,
        subdimension: document.getElementById('subdimension').value,
        objetivoEstrategico: document.getElementById('objetivoEstrategico').value,
        estrategia: document.getElementById('estrategia').value,
        indicador: document.getElementById('indicador').value,
        descripcionIndicador: document.getElementById('descripcionIndicador').value,
        accion: document.getElementById('accion').value,
        descripcionAccion: document.getElementById('descripcionAccion').value,
        metasEstrategicas: document.getElementById('metasEstrategicas').value,
        creadoPor: localStorage.getItem('userName')
    };

    // Agregar usando el sistema multi-colegio
    if (agregarDatoColegio('informacionesGenerales', informacion)) {
        alert('✅ Información guardada exitosamente');
        limpiarFormulario();
        cargarInformaciones();
    } else {
        alert('❌ Error al guardar la información');
    }
}

// Función para limpiar formulario
function limpiarFormulario() {
    document.getElementById('formInformacionGeneral').reset();
}

// Función para cargar informaciones
function cargarInformaciones() {
    // Obtener informaciones del colegio actual
    const informaciones = obtenerDatosColegio('informacionesGenerales');
    const container = document.getElementById('listaInformaciones');

    if (informaciones.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: var(--space-2xl); color: var(--gray-500);">
                <div style="font-size: 64px; margin-bottom: var(--space-lg);">📋</div>
                <p style="font-size: 18px; font-weight: 600;">No hay informaciones registradas</p>
                <p style="font-size: 14px;">Completa el formulario para agregar la primera información</p>
            </div>
        `;
        return;
    }

    // Ordenar por fecha (más recientes primero)
    informaciones.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));

    container.innerHTML = informaciones.map(info => {
        const colorDimension = getColorDimension(info.dimension);
        return `
            <div style="background: white; padding: var(--space-xl); border-radius: var(--radius-xl); border-left: 6px solid ${colorDimension}; box-shadow: var(--shadow-md); transition: all var(--transition-base);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.transform=''; this.style.boxShadow='var(--shadow-md)'">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--space-lg);">
                    <div>
                        <span style="display: inline-block; padding: 6px 14px; background: ${colorDimension}; color: white; border-radius: var(--radius-full); font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: var(--space-sm);">
                            ${info.dimension}
                        </span>
                        <h3 style="font-size: 18px; font-weight: 800; color: var(--gray-900); margin: var(--space-sm) 0;">
                            ${info.subdimension}
                        </h3>
                    </div>
                    <button onclick="eliminarInformacion(${info.id})" style="padding: 8px 16px; background: var(--danger-100); color: var(--danger-700); border: 2px solid var(--danger-300); border-radius: var(--radius-md); font-weight: 700; cursor: pointer; transition: all var(--transition-base);" onmouseover="this.style.background='var(--danger-600)'; this.style.color='white'" onmouseout="this.style.background='var(--danger-100)'; this.style.color='var(--danger-700)'">
                        🗑️ Eliminar
                    </button>
                </div>

                <div style="display: grid; gap: var(--space-md);">
                    <div>
                        <strong style="color: var(--gray-700); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Objetivo Estratégico:</strong>
                        <p style="color: var(--gray-900); margin: var(--space-xs) 0 0 0; font-weight: 600;">${info.objetivoEstrategico}</p>
                    </div>

                    <div>
                        <strong style="color: var(--gray-700); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Estrategia:</strong>
                        <p style="color: var(--gray-900); margin: var(--space-xs) 0 0 0; font-weight: 600;">${info.estrategia}</p>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); background: var(--gray-50); padding: var(--space-md); border-radius: var(--radius-md);">
                        <div>
                            <strong style="color: var(--gray-700); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Indicador:</strong>
                            <p style="color: var(--gray-900); margin: var(--space-xs) 0 0 0; font-weight: 600;">${info.indicador}</p>
                            <p style="color: var(--gray-600); margin: var(--space-xs) 0 0 0; font-size: 14px;">${info.descripcionIndicador}</p>
                        </div>
                        <div>
                            <strong style="color: var(--gray-700); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Acción:</strong>
                            <p style="color: var(--gray-900); margin: var(--space-xs) 0 0 0; font-weight: 600;">${info.accion}</p>
                            <p style="color: var(--gray-600); margin: var(--space-xs) 0 0 0; font-size: 14px;">${info.descripcionAccion}</p>
                        </div>
                    </div>

                    <div>
                        <strong style="color: var(--gray-700); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Metas Estratégicas:</strong>
                        <p style="color: var(--gray-900); margin: var(--space-xs) 0 0 0; font-weight: 600;">${info.metasEstrategicas}</p>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--space-md); border-top: 2px solid var(--gray-200); margin-top: var(--space-sm);">
                        <span style="font-size: 12px; color: var(--gray-500); font-weight: 600;">
                            Creado por: ${info.creadoPor}
                        </span>
                        <span style="font-size: 12px; color: var(--gray-500); font-weight: 600;">
                            ${new Date(info.fechaCreacion).toLocaleDateString('es-ES', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Función para filtrar informaciones
function filtrarInformaciones() {
    const filtro = document.getElementById('filtroDimension').value;
    // Obtener informaciones del colegio actual
    const informaciones = obtenerDatosColegio('informacionesGenerales');
    const container = document.getElementById('listaInformaciones');

    let informacionesFiltradas = informaciones;
    if (filtro) {
        informacionesFiltradas = informaciones.filter(info => info.dimension === filtro);
    }

    if (informacionesFiltradas.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: var(--space-2xl); color: var(--gray-500);">
                <div style="font-size: 64px; margin-bottom: var(--space-lg);">🔍</div>
                <p style="font-size: 18px; font-weight: 600;">No se encontraron informaciones</p>
                <p style="font-size: 14px;">Intenta con otro filtro</p>
            </div>
        `;
        return;
    }

    // Ordenar por fecha
    informacionesFiltradas.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));

    container.innerHTML = informacionesFiltradas.map(info => {
        const colorDimension = getColorDimension(info.dimension);
        return `
            <div style="background: white; padding: var(--space-xl); border-radius: var(--radius-xl); border-left: 6px solid ${colorDimension}; box-shadow: var(--shadow-md); transition: all var(--transition-base);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.transform=''; this.style.boxShadow='var(--shadow-md)'">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--space-lg);">
                    <div>
                        <span style="display: inline-block; padding: 6px 14px; background: ${colorDimension}; color: white; border-radius: var(--radius-full); font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: var(--space-sm);">
                            ${info.dimension}
                        </span>
                        <h3 style="font-size: 18px; font-weight: 800; color: var(--gray-900); margin: var(--space-sm) 0;">
                            ${info.subdimension}
                        </h3>
                    </div>
                    <button onclick="eliminarInformacion(${info.id})" style="padding: 8px 16px; background: var(--danger-100); color: var(--danger-700); border: 2px solid var(--danger-300); border-radius: var(--radius-md); font-weight: 700; cursor: pointer; transition: all var(--transition-base);" onmouseover="this.style.background='var(--danger-600)'; this.style.color='white'" onmouseout="this.style.background='var(--danger-100)'; this.style.color='var(--danger-700)'">
                        🗑️ Eliminar
                    </button>
                </div>

                <div style="display: grid; gap: var(--space-md);">
                    <div>
                        <strong style="color: var(--gray-700); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Objetivo Estratégico:</strong>
                        <p style="color: var(--gray-900); margin: var(--space-xs) 0 0 0; font-weight: 600;">${info.objetivoEstrategico}</p>
                    </div>

                    <div>
                        <strong style="color: var(--gray-700); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Estrategia:</strong>
                        <p style="color: var(--gray-900); margin: var(--space-xs) 0 0 0; font-weight: 600;">${info.estrategia}</p>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); background: var(--gray-50); padding: var(--space-md); border-radius: var(--radius-md);">
                        <div>
                            <strong style="color: var(--gray-700); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Indicador:</strong>
                            <p style="color: var(--gray-900); margin: var(--space-xs) 0 0 0; font-weight: 600;">${info.indicador}</p>
                            <p style="color: var(--gray-600); margin: var(--space-xs) 0 0 0; font-size: 14px;">${info.descripcionIndicador}</p>
                        </div>
                        <div>
                            <strong style="color: var(--gray-700); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Acción:</strong>
                            <p style="color: var(--gray-900); margin: var(--space-xs) 0 0 0; font-weight: 600;">${info.accion}</p>
                            <p style="color: var(--gray-600); margin: var(--space-xs) 0 0 0; font-size: 14px;">${info.descripcionAccion}</p>
                        </div>
                    </div>

                    <div>
                        <strong style="color: var(--gray-700); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Metas Estratégicas:</strong>
                        <p style="color: var(--gray-900); margin: var(--space-xs) 0 0 0; font-weight: 600;">${info.metasEstrategicas}</p>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--space-md); border-top: 2px solid var(--gray-200); margin-top: var(--space-sm);">
                        <span style="font-size: 12px; color: var(--gray-500); font-weight: 600;">
                            Creado por: ${info.creadoPor}
                        </span>
                        <span style="font-size: 12px; color: var(--gray-500); font-weight: 600;">
                            ${new Date(info.fechaCreacion).toLocaleDateString('es-ES', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Función para eliminar información
function eliminarInformacion(id) {
    if (!confirm('¿Estás seguro de eliminar esta información?')) {
        return;
    }

    if (eliminarDatoColegio('informacionesGenerales', id)) {
        alert('✅ Información eliminada exitosamente');
        cargarInformaciones();
    } else {
        alert('❌ Error al eliminar la información');
    }
}

// Función para obtener color según dimensión
function getColorDimension(dimension) {
    const colores = {
        'Currículum': '#3b82f6',
        'Liderazgo': '#10b981',
        'Convivencia Escolar': '#f59e0b'
    };
    return colores[dimension] || '#6366f1';
}
