// Finanzas multi-colegio (solo usuarios con permiso)

let currentUser = null;
let allGastos = [];
let charts = {};
const PRESUPUESTO_ANUAL = 50000000; // $50 millones

// Verificar autenticación y permisos
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
    // Verificar permiso de finanzas
    if (!currentUser.permisoFinanzas) {
        alert(`⛔ Acceso denegado.\n\nSolo usuarios con permiso pueden ver Finanzas.\n\nTu rol: ${getRoleName(currentUser.rol)}`);
        window.location.href = 'dashboard.html';
    }
    
    document.getElementById('userName').textContent = currentUser.nombre;
    document.getElementById('userRole').textContent = getRoleName(currentUser.rol);
    document.getElementById('navFinanzas').style.display = 'block';
    
    // Mostrar nombre del colegio
    const mainContent = document.querySelector('.main-content h1');
    mainContent.textContent = `💰 Módulo Financiero - ${currentUser.colegioNombre}`;
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

// Cargar gastos desde localStorage (solo del colegio actual)
function loadGastos() {
    const gastosStr = localStorage.getItem('demoGastos');
    const todosGastos = gastosStr ? JSON.parse(gastosStr) : [];
    
    // Filtrar solo gastos del colegio actual
    allGastos = todosGastos.filter(g => g.colegioId === currentUser.colegioId);
    
    // Si no hay gastos, crear datos demo para este colegio
    if (allGastos.length === 0) {
        allGastos = getGastosDemo();
        // Guardar gastos demo
        const gastosActualizados = [...todosGastos, ...allGastos];
        localStorage.setItem('demoGastos', JSON.stringify(gastosActualizados));
    }
    
    console.log(`✅ ${allGastos.length} gastos cargados para ${currentUser.colegioNombre}`);
    
    renderStats();
    renderCharts();
}

// Datos de ejemplo para el colegio actual
function getGastosDemo() {
    return [
        {
            colegioId: currentUser.colegioId,
            fecha: '2026-03-15',
            categoria: 'materiales',
            monto: 2500000,
            proveedor: 'Librería Educativa',
            descripcion: 'Libros y material didáctico'
        },
        {
            colegioId: currentUser.colegioId,
            fecha: '2026-04-10',
            categoria: 'capacitacion',
            monto: 3000000,
            proveedor: 'Centro de Formación',
            descripcion: 'Capacitación docente'
        },
        {
            colegioId: currentUser.colegioId,
            fecha: '2026-04-20',
            categoria: 'servicios',
            monto: 1500000,
            proveedor: 'Empresa de Servicios',
            descripcion: 'Mantención equipos'
        }
    ];
}

// Renderizar estadísticas
function renderStats() {
    const totalGastado = allGastos.reduce((sum, g) => sum + (g.monto || 0), 0);
    const disponible = PRESUPUESTO_ANUAL - totalGastado;
    const porcentaje = Math.round((totalGastado / PRESUPUESTO_ANUAL) * 100);
    
    document.getElementById('presupuestoTotal').textContent = formatMoney(PRESUPUESTO_ANUAL);
    document.getElementById('totalGastado').textContent = formatMoney(totalGastado);
    document.getElementById('disponible').textContent = formatMoney(disponible);
    document.getElementById('porcentajeEjecutado').textContent = porcentaje + '%';
}

// Formatear moneda
function formatMoney(amount) {
    return '$' + amount.toLocaleString('es-CL');
}

// Renderizar gráficos
function renderCharts() {
    renderChartCategorias();
    renderChartEjecucion();
}

// Gráfico 1: Gastos por Categoría
function renderChartCategorias() {
    const categorias = {
        'materiales': 0,
        'servicios': 0,
        'capacitacion': 0,
        'infraestructura': 0,
        'otros': 0
    };
    
    allGastos.forEach(g => {
        if (categorias.hasOwnProperty(g.categoria)) {
            categorias[g.categoria] += g.monto || 0;
        }
    });
    
    const labels = Object.keys(categorias).map(c => 
        c.charAt(0).toUpperCase() + c.slice(1)
    );
    const data = Object.values(categorias);
    
    if (charts.categorias) charts.categorias.destroy();
    
    const ctx = document.getElementById('chartCategorias').getContext('2d');
    charts.categorias = new Chart(ctx, {
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
                    '#8b5cf6'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + formatMoney(context.parsed);
                        }
                    }
                }
            }
        }
    });
}

// Gráfico 2: Ejecución Presupuestaria
function renderChartEjecucion() {
    const totalGastado = allGastos.reduce((sum, g) => sum + (g.monto || 0), 0);
    const disponible = PRESUPUESTO_ANUAL - totalGastado;
    
    if (charts.ejecucion) charts.ejecucion.destroy();
    
    const ctx = document.getElementById('chartEjecucion').getContext('2d');
    charts.ejecucion = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Presupuesto 2026'],
            datasets: [
                {
                    label: 'Gastado',
                    data: [totalGastado],
                    backgroundColor: '#ef4444'
                },
                {
                    label: 'Disponible',
                    data: [disponible],
                    backgroundColor: '#10b981'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatMoney(value);
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatMoney(context.parsed.y);
                        }
                    }
                }
            }
        }
    });
}

// Formulario de gastos
const gastoForm = document.getElementById('gastoForm');

gastoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const gastoData = {
        colegioId: currentUser.colegioId, // ← Asociar al colegio actual
        fecha: document.getElementById('fecha').value,
        categoria: document.getElementById('categoria').value,
        monto: parseInt(document.getElementById('monto').value),
        proveedor: document.getElementById('proveedor').value,
        descripcion: document.getElementById('descripcionGasto').value,
        timestamp: Date.now(),
        createdBy: currentUser.email
    };
    
    try {
        // Cargar gastos existentes
        const gastosStr = localStorage.getItem('demoGastos');
        const gastos = gastosStr ? JSON.parse(gastosStr) : [];
        
        // Agregar nuevo gasto
        gastos.push(gastoData);
        
        // Guardar en localStorage
        localStorage.setItem('demoGastos', JSON.stringify(gastos));
        
        // Actualizar lista local
        allGastos.push(gastoData);
        
        console.log('✅ Gasto registrado para', currentUser.colegioNombre);
        
        alert(`✅ Gasto registrado exitosamente en ${currentUser.colegioNombre}`);
        
        // Limpiar formulario
        gastoForm.reset();
        
        // Actualizar gráficos
        renderStats();
        renderCharts();
    } catch (error) {
        console.error('❌ Error guardando gasto:', error);
        alert('❌ Error al guardar el gasto.');
    }
});

// Cargar datos al iniciar
loadGastos();
