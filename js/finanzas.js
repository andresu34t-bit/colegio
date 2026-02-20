import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Variables globales
let currentUser = null;
let allGastos = [];
let charts = {};
const PRESUPUESTO_ANUAL = 50000000; // $50 millones (ajustar según necesidad)

// Verificar autenticación y rol
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    currentUser = user;
    const isDirector = user.email.includes('director');
    
    // Solo director puede acceder
    if (!isDirector) {
        alert('⛔ Acceso denegado. Solo el Director puede ver Finanzas.');
        window.location.href = 'dashboard.html';
        return;
    }
    
    document.getElementById('userName').textContent = user.email.split('@')[0];
    document.getElementById('userRole').textContent = 'Director';
    document.getElementById('navFinanzas').style.display = 'block';
    
    // Cargar datos
    loadGastos();
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'index.html';
});

// Cargar gastos desde Firebase
async function loadGastos() {
    try {
        const gastosRef = collection(db, 'finanzas');
        const snapshot = await getDocs(gastosRef);
        
        allGastos = [];
        snapshot.forEach((doc) => {
            allGastos.push({ id: doc.id, ...doc.data() });
        });
        
        console.log(`✅ ${allGastos.length} gastos cargados`);
        
        renderStats();
        renderCharts();
    } catch (error) {
        console.error('❌ Error cargando gastos:', error);
    }
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

gastoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const gastoData = {
        fecha: document.getElementById('fecha').value,
        categoria: document.getElementById('categoria').value,
        monto: parseInt(document.getElementById('monto').value),
        proveedor: document.getElementById('proveedor').value,
        descripcion: document.getElementById('descripcionGasto').value,
        timestamp: Date.now(),
        createdBy: auth.currentUser.email
    };
    
    try {
        const docRef = await addDoc(collection(db, 'finanzas'), gastoData);
        console.log('✅ Gasto registrado con ID:', docRef.id);
        
        alert('✅ Gasto registrado exitosamente');
        
        // Limpiar formulario
        gastoForm.reset();
        
        // Recargar datos
        await loadGastos();
    } catch (error) {
        console.error('❌ Error guardando gasto:', error);
        alert('❌ Error al guardar el gasto. Verifica tu conexión a Firebase.');
    }
});
