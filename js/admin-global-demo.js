// Panel de Administración Global - Super Usuario

let currentUser = null;
let allColegios = [];
let allEventos = [];
let allUsuarios = [];
let allGastos = [];
let charts = {};

// Verificar autenticación y permisos de superadmin (sin redirección)
function checkAuth() {
    const userStr = localStorage.getItem('demoUser');
    if (!userStr) {
        // Crear sesión demo de superadmin si no existe
        const demoSession = {
            email: 'admin@edugest.cl',
            nombre: 'Administrador Global',
            rol: 'superadmin',
            colegioId: null,
            colegioNombre: 'Todos los Colegios',
            permisoFinanzas: true,
            verTodosColegios: true
        };
        localStorage.setItem('demoUser', JSON.stringify(demoSession));
        return demoSession;
    }
    
    const user = JSON.parse(userStr);
    
    // Si no es superadmin, darle permisos de superadmin
    if (user.rol !== 'superadmin' || !user.verTodosColegios) {
        user.rol = 'superadmin';
        user.verTodosColegios = true;
        localStorage.setItem('demoUser', JSON.stringify(user));
    }
    
    return user;
}

currentUser = checkAuth();
if (currentUser) {
    document.getElementById('userName').textContent = currentUser.nombre;
    document.getElementById('userRole').textContent = 'Super Admin';
}

// Logout (solo recarga la página)
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.reload();
});

// Cargar todos los datos del sistema
function loadAllData() {
    // Cargar colegios
    const colegiosStr = localStorage.getItem('colegios');
    allColegios = colegiosStr ? Object.values(JSON.parse(colegiosStr)) : [];
    
    // Cargar eventos
    const eventosStr = localStorage.getItem('demoEventos');
    allEventos = eventosStr ? JSON.parse(eventosStr) : [];
    
    // Cargar usuarios
    const usuariosStr = localStorage.getItem('usuarios');
    const usuariosObj = usuariosStr ? JSON.parse(usuariosStr) : {};
    allUsuarios = Object.values(usuariosObj);
    
    // Cargar gastos
    const gastosStr = localStorage.getItem('demoGastos');
    allGastos = gastosStr ? JSON.parse(gastosStr) : [];
    
    console.log('✅ Datos globales cargados:');
    console.log(`   📚 ${allColegios.length} colegios`);
    console.log(`   📊 ${allEventos.length} eventos`);
    console.log(`   👥 ${allUsuarios.length} usuarios`);
    console.log(`   💰 ${allGastos.length} gastos`);
    
    renderGlobalStats();
    renderColegiosList();
    renderCharts();
    renderRecentEvents();
}

// Renderizar estadísticas globales
function renderGlobalStats() {
    // Total colegios activos
    const totalColegios = allColegios.filter(c => c.activo).length;
    document.getElementById('totalColegios').textContent = totalColegios;
    
    // Total eventos
    const totalEventos = allEventos.reduce((sum, e) => sum + (e.n_eventos || 0), 0);
    document.getElementById('totalEventos').textContent = totalEventos;
    
    // Total usuarios (excluyendo superadmin)
    const totalUsuarios = allUsuarios.filter(u => u.rol !== 'superadmin').length;
    document.getElementById('totalUsuarios').textContent = totalUsuarios;
    
    // Presupuesto total
    const presupuestoTotal = allGastos.reduce((sum, g) => sum + (g.monto || 0), 0);
    document.getElementById('presupuestoTotal').textContent = 
        '$' + presupuestoTotal.toLocaleString('es-CL');
}

// Renderizar lista de colegios con sus estadísticas
function renderColegiosList() {
    const container = document.getElementById('listaColegios');
    
    if (allColegios.length === 0) {
        container.innerHTML = '<p style="color: var(--gray-600);">No hay colegios registrados</p>';
        return;
    }
    
    container.innerHTML = allColegios.map(colegio => {
        // Calcular estadísticas del colegio
        const eventosCol = allEventos.filter(e => e.colegioId === colegio.id);
        const usuariosCol = allUsuarios.filter(u => u.colegioId === colegio.id);
        const gastosCol = allGastos.filter(g => g.colegioId === colegio.id);
        
        const totalEventos = eventosCol.reduce((sum, e) => sum + (e.n_eventos || 0), 0);
        const totalGastos = gastosCol.reduce((sum, g) => sum + (g.monto || 0), 0);
        const promedioExito = eventosCol.length > 0
            ? Math.round(eventosCol.reduce((sum, e) => sum + (e.exito_objetivo || 0), 0) / eventosCol.length)
            : 0;
        
        return `
            <div class="stat-card" style="text-align: left;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--space-md);">
                    <div>
                        <h3 style="margin: 0; color: var(--primary-600);">${colegio.nombre}</h3>
                        <p style="margin: var(--space-xs) 0 0 0; color: var(--gray-600); font-size: 14px;">
                            RBD: ${colegio.rbd} | ${colegio.region}
                        </p>
                    </div>
                    <span style="padding: 4px 12px; background: ${colegio.activo ? 'var(--success-100)' : 'var(--gray-200)'}; 
                                 color: ${colegio.activo ? 'var(--success-700)' : 'var(--gray-700)'}; 
                                 border-radius: var(--radius-full); font-size: 12px; font-weight: 600;">
                        ${colegio.activo ? 'Activo' : 'Inactivo'}
                    </span>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-md); margin-top: var(--space-lg);">
                    <div>
                        <p style="margin: 0; color: var(--gray-600); font-size: 13px;">Eventos</p>
                        <p style="margin: var(--space-xs) 0 0 0; font-size: 24px; font-weight: 700; color: var(--primary-600);">
                            ${totalEventos}
                        </p>
                    </div>
                    <div>
                        <p style="margin: 0; color: var(--gray-600); font-size: 13px;">Usuarios</p>
                        <p style="margin: var(--space-xs) 0 0 0; font-size: 24px; font-weight: 700; color: var(--primary-600);">
                            ${usuariosCol.length}
                        </p>
                    </div>
                    <div>
                        <p style="margin: 0; color: var(--gray-600); font-size: 13px;">% Éxito Promedio</p>
                        <p style="margin: var(--space-xs) 0 0 0; font-size: 24px; font-weight: 700; color: var(--success-600);">
                            ${promedioExito}%
                        </p>
                    </div>
                    <div>
                        <p style="margin: 0; color: var(--gray-600); font-size: 13px;">Gastos</p>
                        <p style="margin: var(--space-xs) 0 0 0; font-size: 24px; font-weight: 700; color: var(--warning-600);">
                            $${totalGastos.toLocaleString('es-CL')}
                        </p>
                    </div>
                </div>
                
                <div style="margin-top: var(--space-lg); padding-top: var(--space-md); border-top: 1px solid var(--gray-200);">
                    <p style="margin: 0; color: var(--gray-500); font-size: 12px;">
                        Registrado: ${new Date(colegio.fechaRegistro).toLocaleDateString('es-CL')}
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

// Renderizar gráficos comparativos
function renderCharts() {
    renderChartColegios();
    renderChartAreas();
}

// Gráfico: Eventos por Colegio
function renderChartColegios() {
    const colegiosData = {};
    
    allColegios.forEach(colegio => {
        const eventosCol = allEventos.filter(e => e.colegioId === colegio.id);
        const totalEventos = eventosCol.reduce((sum, e) => sum + (e.n_eventos || 0), 0);
        colegiosData[colegio.nombre] = totalEventos;
    });
    
    const labels = Object.keys(colegiosData);
    const data = Object.values(colegiosData);
    
    if (charts.colegios) charts.colegios.destroy();
    
    const ctx = document.getElementById('chartColegios').getContext('2d');
    charts.colegios = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'N° Eventos',
                data: data,
                backgroundColor: '#3b82f6'
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

// Gráfico: Distribución por Área (Global)
function renderChartAreas() {
    const areas = ['Currículum', 'Liderazgo', 'Convivencia', 'Recursos'];
    const areasData = {};
    
    areas.forEach(a => areasData[a] = 0);
    
    allEventos.forEach(e => {
        if (e.area && areasData.hasOwnProperty(e.area)) {
            areasData[e.area] += e.n_eventos || 0;
        }
    });
    
    const data = areas.map(a => areasData[a]);
    
    if (charts.areas) charts.areas.destroy();
    
    const ctx = document.getElementById('chartAreas').getContext('2d');
    charts.areas = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: areas,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#3b82f6', // Currículum - Azul
                    '#10b981', // Liderazgo - Verde
                    '#f59e0b', // Convivencia - Naranja
                    '#8b5cf6'  // Recursos - Morado
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

// Renderizar eventos recientes de todos los colegios
function renderRecentEvents() {
    const tbody = document.getElementById('tablaEventos');
    
    if (allEventos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--gray-600);">No hay eventos registrados</td></tr>';
        return;
    }
    
    // Ordenar por fecha (más recientes primero) - simulado con orden inverso
    const eventosRecientes = [...allEventos].reverse().slice(0, 20);
    
    tbody.innerHTML = eventosRecientes.map(evento => {
        // Buscar nombre del colegio
        const colegio = allColegios.find(c => c.id === evento.colegioId);
        const colegioNombre = colegio ? colegio.nombre : 'Desconocido';
        
        // Color por área
        const areaColors = {
            'Currículum': '#3b82f6',
            'Liderazgo': '#10b981',
            'Convivencia': '#f59e0b',
            'Recursos': '#8b5cf6'
        };
        const areaColor = areaColors[evento.area] || '#6b7280';
        
        return `
            <tr>
                <td><strong>${colegioNombre}</strong></td>
                <td>${evento.dia} ${evento.mes}</td>
                <td>
                    <span style="padding: 4px 8px; background: ${areaColor}20; color: ${areaColor}; 
                                 border-radius: var(--radius-md); font-size: 12px; font-weight: 600;">
                        ${evento.area}
                    </span>
                </td>
                <td>${evento.accion}</td>
                <td>${evento.docente}</td>
                <td style="text-align: center;">${evento.n_eventos}</td>
                <td style="text-align: center; font-weight: 600; color: ${evento.exito_objetivo >= 80 ? 'var(--success-600)' : 'var(--warning-600)'};">
                    ${evento.exito_objetivo}%
                </td>
            </tr>
        `;
    }).join('');
}

// Cargar datos al iniciar
loadAllData();
