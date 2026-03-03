// Formulario específico por área

let currentUser = null;
let areaSeleccionada = null;

// Configuración de áreas (SIN RECURSOS)
const areasConfig = {
    'Currículum': {
        icono: '📚',
        color: 'linear-gradient(135deg, #3b82f6, #1e40af)',
        descripcion: 'Gestión pedagógica y curricular'
    },
    'Liderazgo': {
        icono: '👥',
        color: 'linear-gradient(135deg, #10b981, #047857)',
        descripcion: 'Liderazgo escolar y gestión'
    },
    'Convivencia': {
        icono: '🤝',
        color: 'linear-gradient(135deg, #f59e0b, #d97706)',
        descripcion: 'Clima y convivencia escolar'
    }
};

// Verificar autenticación
function checkAuth() {
    const userStr = localStorage.getItem('demoUser');
    if (!userStr) {
        window.location.href = 'index.html';
        return null;
    }
    return JSON.parse(userStr);
}

// Inicializar página
function inicializar() {
    currentUser = checkAuth();
    if (!currentUser) return;
    
    // Obtener área seleccionada
    areaSeleccionada = localStorage.getItem('areaSeleccionada');
    if (!areaSeleccionada) {
        window.location.href = 'areas.html';
        return;
    }
    
    // Configurar interfaz
    configurarInterfaz();
    cargarEventosRecientes();
}

function configurarInterfaz() {
    // Datos del usuario
    document.getElementById('userName').textContent = currentUser.nombre;
    document.getElementById('userRole').textContent = getRoleName(currentUser.rol);
    
    if (currentUser.permisoFinanzas) {
        document.getElementById('navFinanzas').style.display = 'block';
    }
    
    // Configurar área
    const config = areasConfig[areaSeleccionada];
    if (config) {
        document.getElementById('tituloArea').textContent = `Registrar Evento - ${areaSeleccionada}`;
        document.getElementById('descripcionArea').textContent = config.descripcion;
        
        // Header del área
        const headerArea = document.getElementById('headerArea');
        headerArea.style.background = config.color;
        
        document.getElementById('iconoArea').textContent = config.icono;
        document.getElementById('nombreArea').textContent = areaSeleccionada;
        document.getElementById('subtituloArea').textContent = config.descripcion;
        
        // Campo oculto del área
        document.getElementById('area').value = areaSeleccionada;
        
        // Título de eventos recientes
        document.getElementById('areaEventos').textContent = areaSeleccionada;
        
        // NUEVA FUNCIONALIDAD: Cargar información automática
        cargarInformacionAutomatica();
    }
}

// NUEVA FUNCIÓN: Cargar información desde Informaciones Generales
function cargarInformacionAutomatica() {
    const informacionesStr = localStorage.getItem('informacionesGenerales');
    if (!informacionesStr) return;
    
    const informaciones = JSON.parse(informacionesStr);
    
    // Mapear nombres de áreas
    const dimensionMap = {
        'Currículum': 'Currículum',
        'Liderazgo': 'Liderazgo',
        'Convivencia': 'Convivencia Escolar'
    };
    
    const dimensionBuscada = dimensionMap[areaSeleccionada];
    const infoArea = informaciones.filter(info => info.dimension === dimensionBuscada);
    
    if (infoArea.length === 0) return;
    
    // Mostrar sección de información automática
    const infoAutomatica = document.getElementById('infoAutomatica');
    infoAutomatica.style.display = 'block';
    
    // Renderizar información
    infoArea.forEach((info, index) => {
        if (index === 0) {
            // Subdimensión
            document.getElementById('subdimensionInfo').innerHTML = `
                <div style="margin-bottom: var(--space-sm);">
                    <strong style="color: var(--gray-700); font-size: 14px;">📌 Subdimensión:</strong>
                    <p style="color: var(--gray-600); margin: var(--space-xs) 0 0 0; font-size: 14px;">${info.subdimension}</p>
                </div>
            `;
            
            // Objetivo Estratégico
            document.getElementById('objetivoInfo').innerHTML = `
                <div style="margin-bottom: var(--space-sm);">
                    <strong style="color: var(--gray-700); font-size: 14px;">🎯 Objetivo Estratégico:</strong>
                    <p style="color: var(--gray-600); margin: var(--space-xs) 0 0 0; font-size: 14px;">${info.objetivoEstrategico}</p>
                </div>
            `;
            
            // Estrategia
            document.getElementById('estrategiaInfo').innerHTML = `
                <div style="margin-bottom: var(--space-sm);">
                    <strong style="color: var(--gray-700); font-size: 14px;">📋 Estrategia:</strong>
                    <p style="color: var(--gray-600); margin: var(--space-xs) 0 0 0; font-size: 14px;">${info.estrategia}</p>
                </div>
            `;
            
            // Indicadores
            if (info.indicadores && info.indicadores.length > 0) {
                document.getElementById('indicadoresInfo').innerHTML = `
                    <div style="margin-bottom: var(--space-sm);">
                        <strong style="color: var(--gray-700); font-size: 14px;">📊 Indicadores:</strong>
                        <ul style="margin: var(--space-xs) 0 0 0; padding-left: var(--space-lg);">
                            ${info.indicadores.map(ind => `
                                <li style="color: var(--gray-600); font-size: 14px; margin-bottom: var(--space-xs);">
                                    <strong>${ind.nombre}</strong>${ind.descripcion ? ': ' + ind.descripcion : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }
            
            // Acciones
            if (info.acciones && info.acciones.length > 0) {
                document.getElementById('accionesInfo').innerHTML = `
                    <div style="margin-bottom: var(--space-sm);">
                        <strong style="color: var(--gray-700); font-size: 14px;">🎯 Acciones Sugeridas:</strong>
                        <ul style="margin: var(--space-xs) 0 0 0; padding-left: var(--space-lg);">
                            ${info.acciones.map(acc => `
                                <li style="color: var(--gray-600); font-size: 14px; margin-bottom: var(--space-xs);">
                                    <strong>${acc.nombre}</strong>${acc.descripcion ? ': ' + acc.descripcion : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }
            
            // Metas Estratégicas
            document.getElementById('metasInfo').innerHTML = `
                <div>
                    <strong style="color: var(--gray-700); font-size: 14px;">🏆 Metas Estratégicas:</strong>
                    <p style="color: var(--gray-600); margin: var(--space-xs) 0 0 0; font-size: 14px;">${info.metasEstrategicas}</p>
                </div>
            `;
        }
    });
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

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('demoUser');
    window.location.href = 'index.html';
});

// Cargar eventos recientes del área
function cargarEventosRecientes() {
    const eventosStr = localStorage.getItem('demoEventos');
    const todosEventos = eventosStr ? JSON.parse(eventosStr) : [];
    const eventosDelArea = todosEventos
        .filter(e => e.colegioId === currentUser.colegioId && e.area === areaSeleccionada)
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
        .slice(0, 5);
    
    const listaEventos = document.getElementById('listaEventos');
    
    if (eventosDelArea.length === 0) {
        listaEventos.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #64748b;">
                <div style="font-size: 48px; margin-bottom: 16px;">${areasConfig[areaSeleccionada].icono}</div>
                <p>No hay eventos registrados en ${areaSeleccionada}</p>
                <p style="font-size: 14px;">¡Registra el primer evento!</p>
            </div>
        `;
        return;
    }
    
    listaEventos.innerHTML = eventosDelArea.map(e => `
        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid ${areasConfig[areaSeleccionada].color.includes('3b82f6') ? '#3b82f6' : areasConfig[areaSeleccionada].color.includes('10b981') ? '#10b981' : areasConfig[areaSeleccionada].color.includes('f59e0b') ? '#f59e0b' : '#8b5cf6'};">
            <div style="display: flex; justify-content: between; align-items: start;">
                <div style="flex: 1;">
                    <p style="margin: 0 0 8px 0; font-weight: 600;">${e.dia} ${e.mes} - ${e.accion}</p>
                    <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px;">${e.descripcion || 'Sin descripción'}</p>
                    <div style="display: flex; gap: 16px; font-size: 12px; color: #64748b;">
                        <span>👤 ${e.docente}</span>
                        <span>📊 ${e.n_eventos} eventos</span>
                        <span>🎯 ${e.exito_objetivo}% éxito</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Formulario de eventos
document.getElementById('eventoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const eventoData = {
        colegioId: currentUser.colegioId,
        dia: parseInt(document.getElementById('dia').value),
        mes: document.getElementById('mes').value,
        area: areaSeleccionada, // Área fija
        accion: document.getElementById('accion').value.trim(), // Texto libre
        n_eventos: parseInt(document.getElementById('n_eventos').value),
        exito_objetivo: parseInt(document.getElementById('exito_objetivo').value),
        meta: parseInt(document.getElementById('meta').value),
        exito_meta: parseInt(document.getElementById('exito_meta').value),
        docente: document.getElementById('docente').value,
        descripcion: document.getElementById('descripcion').value,
        timestamp: Date.now(),
        createdBy: currentUser.email
    };
    
    try {
        const eventosStr = localStorage.getItem('demoEventos');
        const eventos = eventosStr ? JSON.parse(eventosStr) : [];
        
        eventos.push(eventoData);
        localStorage.setItem('demoEventos', JSON.stringify(eventos));
        
        console.log('✅ Evento guardado en', areaSeleccionada);
        
        alert(`✅ Evento registrado exitosamente en ${areaSeleccionada}`);
        
        // Limpiar formulario
        document.getElementById('eventoForm').reset();
        document.getElementById('area').value = areaSeleccionada; // Mantener área
        
        // Recargar eventos recientes
        cargarEventosRecientes();
        
    } catch (error) {
        console.error('❌ Error guardando evento:', error);
        alert('❌ Error al guardar el evento.');
    }
});

// Inicializar al cargar la página
inicializar();