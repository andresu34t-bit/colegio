// ============================================
// INFORMACIONES GENERALES - GESTIÓN PME
// ============================================

// Verificar autenticación
const userId = localStorage.getItem('userId');
const userRole = localStorage.getItem('userRole');

if (!userId) {
    window.location.href = 'index.html';
}

// Mostrar información del usuario
document.getElementById('userName').textContent = localStorage.getItem('userName') || 'Usuario';
document.getElementById('userRole').textContent = getRoleLabel(userRole);

// Mostrar/ocultar menú de finanzas según rol
if (userRole === 'director' || userRole === 'administrador') {
    const navFinanzas = document.getElementById('navFinanzas');
    if (navFinanzas) navFinanzas.style.display = 'flex';
}

// Función para obtener etiqueta de rol
function getRoleLabel(role) {
    const roles = {
        'director': 'Director',
        'profesor': 'Profesor',
        'administrador': 'Administrador Técnico'
    };
    return roles[role] || 'Usuario';
}

// Cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
});

// ============================================
// GESTIÓN DE INDICADORES Y ACCIONES
// ============================================

function agregarIndicador() {
    const container = document.getElementById('indicadoresContainer');
    const newIndicador = document.createElement('div');
    newIndicador.className = 'indicador-item-form';
    newIndicador.style.marginTop = 'var(--space-lg)';
    newIndicador.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Nombre del Indicador</label>
                <input type="text" class="indicador-nombre" placeholder="Ej: Tasa de aprobación">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea class="indicador-descripcion" rows="2" placeholder="Describe el indicador..."></textarea>
            </div>
        </div>
        <button type="button" class="btn btn-secondary" onclick="this.parentElement.remove()" style="margin-top: var(--space-sm); background: var(--danger-600); color: white;">
            🗑️ Eliminar
        </button>
    `;
    container.appendChild(newIndicador);
}

function agregarAccion() {
    const container = document.getElementById('accionesContainer');
    const newAccion = document.createElement('div');
    newAccion.className = 'accion-item-form';
    newAccion.style.marginTop = 'var(--space-lg)';
    newAccion.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Nombre de la Acción</label>
                <input type="text" class="accion-nombre" placeholder="Ej: Capacitación docente">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea class="accion-descripcion" rows="2" placeholder="Describe la acción..."></textarea>
            </div>
        </div>
        <button type="button" class="btn btn-secondary" onclick="this.parentElement.remove()" style="margin-top: var(--space-sm); background: var(--danger-600); color: white;">
            🗑️ Eliminar
        </button>
    `;
    container.appendChild(newAccion);
}

// ============================================
// GUARDAR INFORMACIÓN GENERAL
// ============================================

document.getElementById('formInformacionGeneral').addEventListener('submit', (e) => {
    e.preventDefault();

    // Recopilar indicadores
    const indicadores = [];
    document.querySelectorAll('.indicador-item-form').forEach(item => {
        const nombre = item.querySelector('.indicador-nombre').value.trim();
        const descripcion = item.querySelector('.indicador-descripcion').value.trim();
        if (nombre) {
            indicadores.push({ nombre, descripcion });
        }
    });

    // Recopilar acciones
    const acciones = [];
    document.querySelectorAll('.accion-item-form').forEach(item => {
        const nombre = item.querySelector('.accion-nombre').value.trim();
        const descripcion = item.querySelector('.accion-descripcion').value.trim();
        if (nombre) {
            acciones.push({ nombre, descripcion });
        }
    });

    // Crear objeto de información general
    const informacion = {
        id: Date.now().toString(),
        dimension: document.getElementById('dimension').value,
        subdimension: document.getElementById('subdimension').value,
        objetivoEstrategico: document.getElementById('objetivoEstrategico').value,
        estrategia: document.getElementById('estrategia').value,
        indicadores: indicadores,
        acciones: acciones,
        metasEstrategicas: document.getElementById('metasEstrategicas').value,
        fechaCreacion: new Date().toISOString(),
        creadoPor: userId
    };

    // Guardar en localStorage
    let informaciones = JSON.parse(localStorage.getItem('informacionesGenerales') || '[]');
    informaciones.push(informacion);
    localStorage.setItem('informacionesGenerales', JSON.stringify(informaciones));

    alert('✅ Información guardada exitosamente');
    
    // Limpiar formulario
    document.getElementById('formInformacionGeneral').reset();
    
    // Recargar lista
    cargarInformaciones();
});

// ============================================
// CARGAR Y MOSTRAR INFORMACIONES
// ============================================

function cargarInformaciones() {
    const informaciones = JSON.parse(localStorage.getItem('informacionesGenerales') || '[]');
    const container = document.getElementById('listaInformaciones');

    if (informaciones.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: var(--space-2xl); color: var(--gray-500);">
                <div style="font-size: 64px; margin-bottom: var(--space-lg);">📋</div>
                <p style="font-size: 18px; font-weight: 600;">No hay informaciones registradas</p>
                <p style="font-size: 14px; margin-top: var(--space-sm);">Completa el formulario arriba para agregar la primera</p>
            </div>
        `;
        return;
    }

    container.innerHTML = informaciones.map(info => `
        <div style="background: white; padding: var(--space-xl); border-radius: var(--radius-lg); box-shadow: var(--shadow-md); margin-bottom: var(--space-lg); border-left: 6px solid ${getDimensionColor(info.dimension)};">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--space-md);">
                <div>
                    <span style="display: inline-block; padding: 6px 12px; background: ${getDimensionColor(info.dimension)}; color: white; border-radius: var(--radius-md); font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: var(--space-sm);">
                        ${info.dimension}
                    </span>
                    <h3 style="font-size: 18px; font-weight: 800; color: var(--gray-900); margin: var(--space-sm) 0;">
                        ${info.subdimension}
                    </h3>
                </div>
                <button onclick="eliminarInformacion('${info.id}')" style="padding: 8px 16px; background: var(--danger-600); color: white; border: none; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; font-size: 12px;">
                    🗑️ Eliminar
                </button>
            </div>

            <div style="margin-bottom: var(--space-md);">
                <strong style="color: var(--gray-700); font-size: 14px;">Objetivo Estratégico:</strong>
                <p style="color: var(--gray-600); margin-top: var(--space-xs); font-size: 14px;">${info.objetivoEstrategico}</p>
            </div>

            <div style="margin-bottom: var(--space-md);">
                <strong style="color: var(--gray-700); font-size: 14px;">Estrategia:</strong>
                <p style="color: var(--gray-600); margin-top: var(--space-xs); font-size: 14px;">${info.estrategia}</p>
            </div>

            ${info.indicadores.length > 0 ? `
                <div style="margin-bottom: var(--space-md);">
                    <strong style="color: var(--gray-700); font-size: 14px;">Indicadores:</strong>
                    <ul style="margin-top: var(--space-xs); padding-left: var(--space-lg);">
                        ${info.indicadores.map(ind => `
                            <li style="color: var(--gray-600); font-size: 14px; margin-bottom: var(--space-xs);">
                                <strong>${ind.nombre}</strong>${ind.descripcion ? ': ' + ind.descripcion : ''}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}

            ${info.acciones.length > 0 ? `
                <div style="margin-bottom: var(--space-md);">
                    <strong style="color: var(--gray-700); font-size: 14px;">Acciones:</strong>
                    <ul style="margin-top: var(--space-xs); padding-left: var(--space-lg);">
                        ${info.acciones.map(acc => `
                            <li style="color: var(--gray-600); font-size: 14px; margin-bottom: var(--space-xs);">
                                <strong>${acc.nombre}</strong>${acc.descripcion ? ': ' + acc.descripcion : ''}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}

            <div>
                <strong style="color: var(--gray-700); font-size: 14px;">Metas Estratégicas:</strong>
                <p style="color: var(--gray-600); margin-top: var(--space-xs); font-size: 14px;">${info.metasEstrategicas}</p>
            </div>

            <div style="margin-top: var(--space-md); padding-top: var(--space-md); border-top: 1px solid var(--gray-200); font-size: 12px; color: var(--gray-500);">
                Creado el ${new Date(info.fechaCreacion).toLocaleDateString('es-ES')}
            </div>
        </div>
    `).join('');
}

function getDimensionColor(dimension) {
    const colors = {
        'Currículum': 'var(--info-600)',
        'Liderazgo': 'var(--success-600)',
        'Convivencia Escolar': 'var(--warning-600)'
    };
    return colors[dimension] || 'var(--primary-600)';
}

function eliminarInformacion(id) {
    if (!confirm('¿Estás seguro de eliminar esta información?')) return;

    let informaciones = JSON.parse(localStorage.getItem('informacionesGenerales') || '[]');
    informaciones = informaciones.filter(info => info.id !== id);
    localStorage.setItem('informacionesGenerales', JSON.stringify(informaciones));

    alert('✅ Información eliminada');
    cargarInformaciones();
}

// Cargar informaciones al iniciar
cargarInformaciones();
