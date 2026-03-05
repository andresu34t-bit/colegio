/**
 * EDUGEST - Panel Super Admin
 * Gestión global de todos los colegios
 */

// Datos de colegios (en producción vendría de base de datos)
const SCHOOLS_DATA = [
    { id: 'school_001', name: 'Instituto Técnico Industrial', rbd: '12345-6', location: 'Recoleta', type: 'Técnico Profesional', students: 1450, budget: 89500000, users: 2, active: true },
    { id: 'school_002', name: 'Liceo Bicentenario de Excelencia', rbd: '23456-7', location: 'La Florida', type: 'Municipal', students: 1120, budget: 62800000, users: 2, active: true },
    { id: 'school_003', name: 'Colegio Montessori del Valle', rbd: '34567-8', location: 'Vitacura', type: 'Particular', students: 380, budget: 125000000, users: 2, active: true },
    { id: 'school_004', name: 'Escuela Rural Valle Verde', rbd: '45678-9', location: 'Colina', type: 'Municipal', students: 185, budget: 28300000, users: 2, active: true },
    { id: 'school_005', name: 'Colegio Bilingüe Internacional', rbd: '56789-0', location: 'Lo Barnechea', type: 'Particular', students: 720, budget: 156000000, users: 2, active: true },
    { id: 'school_006', name: 'Liceo Artístico Gabriela Mistral', rbd: '67890-1', location: 'Estación Central', type: 'Municipal', students: 890, budget: 71200000, users: 2, active: true },
    { id: 'school_007', name: 'Colegio Deportivo Alto Rendimiento', rbd: '78901-2', location: 'Peñalolén', type: 'Particular Subvencionado', students: 640, budget: 54700000, users: 2, active: true },
    { id: 'school_008', name: 'Instituto Waldorf Raíces del Sur', rbd: '89012-3', location: 'La Reina', type: 'Particular', students: 295, budget: 98400000, users: 2, active: true },
    { id: 'school_009', name: 'Colegio Científico Innovación', rbd: '90123-4', location: 'Macul', type: 'Particular Subvencionado', students: 975, budget: 67900000, users: 2, active: true },
    { id: 'school_010', name: 'Escuela Básica Amanecer', rbd: '01234-5', location: 'Puente Alto', type: 'Municipal', students: 520, budget: 41600000, users: 2, active: true },
    { id: 'school_011', name: 'Colegio Alemán de Santiago', rbd: '11111-1', location: 'Las Condes', type: 'Particular', students: 1850, budget: 245000000, users: 2, active: true },
    { id: 'school_012', name: 'Liceo Comercial Empresarial', rbd: '22222-2', location: 'Santiago Centro', type: 'Técnico Profesional', students: 1320, budget: 78500000, users: 2, active: true },
    { id: 'school_013', name: 'Colegio Adventista del Pacífico', rbd: '33333-3', location: 'Ñuñoa', type: 'Particular Subvencionado', students: 680, budget: 59200000, users: 2, active: true },
    { id: 'school_014', name: 'Instituto Marítimo de Valparaíso', rbd: '44444-4', location: 'Valparaíso', type: 'Técnico Profesional', students: 540, budget: 95800000, users: 2, active: true },
    { id: 'school_015', name: 'Colegio Ecológico Tierra Verde', rbd: '55555-5', location: 'Pirque', type: 'Particular', students: 420, budget: 112000000, users: 2, active: true },
    { id: 'school_016', name: 'Liceo Agrícola Valle Fértil', rbd: '66666-6', location: 'Buin', type: 'Técnico Profesional', students: 780, budget: 86400000, users: 2, active: true },
    { id: 'school_017', name: 'Colegio de Música y Danza', rbd: '77777-7', location: 'Providencia', type: 'Particular', students: 340, budget: 138000000, users: 2, active: true },
    { id: 'school_018', name: 'Instituto Tecnológico de Programación', rbd: '88888-8', location: 'Providencia', type: 'Técnico Profesional', students: 890, budget: 105000000, users: 2, active: true },
    { id: 'school_019', name: 'Colegio Británico de Chile', rbd: '99999-9', location: 'Vitacura', type: 'Particular', students: 1150, budget: 285000000, users: 2, active: true },
    { id: 'school_020', name: 'Escuela de Gastronomía Culinaria', rbd: '00000-0', location: 'Las Condes', type: 'Técnico Profesional', students: 460, budget: 118000000, users: 2, active: true }
];

// Variables globales
let currentSchools = [...SCHOOLS_DATA];
let currentUsers = [];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeAdminPanel();
});

function initializeAdminPanel() {
    updateUserInfo();
    updateGlobalStats();
    renderTopSchools();
    initCharts();
    renderSchoolsList();
    loadUsers();
    populateSchoolSelectors();
}

// Actualizar información del usuario
function updateUserInfo() {
    const user = EdugestRoles.getCurrentUser();
    if (user) {
        document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userRole').textContent = 'Administrador Global';
    }
}

// Actualizar estadísticas globales
function updateGlobalStats() {
    const totalSchools = SCHOOLS_DATA.filter(s => s.active).length;
    const totalStudents = SCHOOLS_DATA.reduce((sum, s) => sum + s.students, 0);
    const totalBudget = SCHOOLS_DATA.reduce((sum, s) => sum + s.budget, 0);
    const totalUsers = SCHOOLS_DATA.reduce((sum, s) => sum + s.users, 0);
    
    document.getElementById('totalSchools').textContent = totalSchools;
    document.getElementById('totalStudents').textContent = totalStudents.toLocaleString('es-CL');
    document.getElementById('totalBudget').textContent = formatCurrency(totalBudget);
    document.getElementById('totalUsers').textContent = totalUsers;
}

// Formatear moneda
function formatCurrency(amount) {
    if (amount >= 1000000000) {
        return '$' + (amount / 1000000000).toFixed(1) + 'B';
    } else if (amount >= 1000000) {
        return '$' + (amount / 1000000).toFixed(1) + 'M';
    }
    return '$' + amount.toLocaleString('es-CL');
}

// Renderizar top colegios
function renderTopSchools() {
    const topSchools = [...SCHOOLS_DATA]
        .sort((a, b) => b.students - a.students)
        .slice(0, 5);
    
    const html = topSchools.map((school, index) => `
        <div class="top-school-item">
            <div class="top-school-rank">${index + 1}</div>
            <div class="top-school-info">
                <div class="top-school-name">${school.name}</div>
                <div class="top-school-location">${school.location}</div>
            </div>
            <div class="top-school-students">${school.students.toLocaleString('es-CL')}</div>
        </div>
    `).join('');
    
    document.getElementById('topSchools').innerHTML = html;
}

// Inicializar gráficos
function initCharts() {
    initStudentsChart();
    initTypesChart();
    initBudgetChart();
    initLocationChart();
}

function initStudentsChart() {
    const ctx = document.getElementById('chartStudents');
    if (!ctx) return;
    
    const topSchools = [...SCHOOLS_DATA].sort((a, b) => b.students - a.students).slice(0, 10);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topSchools.map(s => s.name.split(' ').slice(0, 3).join(' ')),
            datasets: [{
                label: 'Estudiantes',
                data: topSchools.map(s => s.students),
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function initTypesChart() {
    const ctx = document.getElementById('chartTypes');
    if (!ctx) return;
    
    const types = {};
    SCHOOLS_DATA.forEach(s => {
        types[s.type] = (types[s.type] || 0) + 1;
    });
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(types),
            datasets: [{
                data: Object.values(types),
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(168, 85, 247, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function initBudgetChart() {
    const ctx = document.getElementById('chartBudget');
    if (!ctx) return;
    
    const topSchools = [...SCHOOLS_DATA].sort((a, b) => b.budget - a.budget).slice(0, 10);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topSchools.map(s => s.name.split(' ').slice(0, 3).join(' ')),
            datasets: [{
                label: 'Presupuesto (millones)',
                data: topSchools.map(s => s.budget / 1000000),
                backgroundColor: 'rgba(245, 158, 11, 0.8)',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function initLocationChart() {
    const ctx = document.getElementById('chartLocation');
    if (!ctx) return;
    
    const locations = {};
    SCHOOLS_DATA.forEach(s => {
        locations[s.location] = (locations[s.location] || 0) + 1;
    });
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(locations),
            datasets: [{
                data: Object.values(locations),
                backgroundColor: [
                    '#3b82f6', '#a855f7', '#22c55e', '#f59e0b', '#ef4444',
                    '#06b6d4', '#8b5cf6', '#10b981', '#f97316', '#ec4899'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}

// Renderizar lista de colegios
function renderSchoolsList() {
    const container = document.getElementById('schoolsList');
    if (!container) return;
    
    const html = currentSchools.map(school => `
        <div class="school-card">
            <div class="school-card-header">
                <div class="school-info">
                    <h3>${school.name}</h3>
                    <span class="school-type">${school.type}</span>
                    <div class="school-details">
                        <div>📍 ${school.location}</div>
                        <div>🆔 RBD: ${school.rbd}</div>
                    </div>
                </div>
                <div class="school-status ${school.active ? 'active' : 'inactive'}">
                    <span class="status-dot"></span>
                    ${school.active ? 'Activo' : 'Inactivo'}
                </div>
            </div>
            <div class="school-stats">
                <div class="school-stat">
                    <div class="school-stat-label">Estudiantes</div>
                    <div class="school-stat-value">${school.students.toLocaleString('es-CL')}</div>
                </div>
                <div class="school-stat">
                    <div class="school-stat-label">Usuarios</div>
                    <div class="school-stat-value">${school.users}</div>
                </div>
                <div class="school-stat">
                    <div class="school-stat-label">Presupuesto</div>
                    <div class="school-stat-value">${formatCurrency(school.budget)}</div>
                </div>
                <div class="school-stat">
                    <div class="school-stat-label">Estado</div>
                    <div class="school-stat-value">${school.active ? '✅' : '❌'}</div>
                </div>
            </div>
            <div class="school-actions">
                <button class="btn btn-primary" onclick="accessSchool('${school.id}')">
                    👁️ Ver Detalle
                </button>
                <button class="btn btn-secondary" onclick="editSchool('${school.id}')">
                    ✏️ Editar
                </button>
                <button class="btn ${school.active ? 'btn-danger' : 'btn-success'}" onclick="toggleSchoolStatus('${school.id}')">
                    ${school.active ? '🔒 Desactivar' : '✅ Activar'}
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html || '<p style="text-align: center; color: #6b7280; padding: 2rem;">No se encontraron colegios</p>';
}

// Filtrar colegios
function filterSchools() {
    const search = document.getElementById('searchSchool')?.value.toLowerCase() || '';
    const type = document.getElementById('filterType')?.value || '';
    const status = document.getElementById('filterStatus')?.value || '';
    
    currentSchools = SCHOOLS_DATA.filter(school => {
        const matchSearch = school.name.toLowerCase().includes(search) || 
                          school.location.toLowerCase().includes(search) ||
                          school.rbd.includes(search);
        const matchType = !type || school.type.toLowerCase().includes(type.toLowerCase());
        const matchStatus = !status || (status === 'active' && school.active) || (status === 'inactive' && !school.active);
        
        return matchSearch && matchType && matchStatus;
    });
    
    renderSchoolsList();
}

// Acceder a un colegio
function accessSchool(schoolId) {
    if (EdugestSchools.switchSchool(schoolId)) {
        window.location.href = 'dashboard.html';
    }
}

// Editar colegio
function editSchool(schoolId) {
    const school = SCHOOLS_DATA.find(s => s.id === schoolId);
    if (!school) return;
    
    document.getElementById('schoolModalTitle').textContent = 'Editar Colegio';
    document.getElementById('schoolName').value = school.name;
    document.getElementById('schoolRBD').value = school.rbd;
    document.getElementById('schoolType').value = school.type.toLowerCase();
    document.getElementById('schoolLocation').value = school.location;
    document.getElementById('schoolAddress').value = school.address || '';
    document.getElementById('schoolPhone').value = school.phone || '';
    document.getElementById('schoolEmail').value = school.email || '';
    document.getElementById('schoolStudents').value = school.students;
    document.getElementById('schoolBudget').value = school.budget;
    
    openSchoolModal();
}

// Toggle estado del colegio
function toggleSchoolStatus(schoolId) {
    const school = SCHOOLS_DATA.find(s => s.id === schoolId);
    if (!school) return;
    
    const action = school.active ? 'desactivar' : 'activar';
    if (confirm(`¿Estás seguro de que deseas ${action} este colegio?`)) {
        school.active = !school.active;
        renderSchoolsList();
        updateGlobalStats();
        showNotification(`Colegio ${action}do exitosamente`);
    }
}

// Gestión de usuarios
function loadUsers() {
    // Cargar usuarios desde demo-data o login-modern
    currentUsers = [
        { id: 1, name: 'Director Técnico', email: 'director.tecnico@edugest.cl', role: 'director', schoolId: 'school_001', active: true },
        { id: 2, name: 'Profesor Mecánica', email: 'profesor.mecanica@edugest.cl', role: 'docente', schoolId: 'school_001', active: true },
        { id: 3, name: 'Director Bicentenario', email: 'director.bicentenario@edugest.cl', role: 'director', schoolId: 'school_002', active: true },
        { id: 4, name: 'Profe Ciencias', email: 'profe.ciencias@edugest.cl', role: 'docente', schoolId: 'school_002', active: true }
    ];
    
    renderUsersTable();
    renderStatsTable();
}

function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    const html = currentUsers.map(user => {
        const school = SCHOOLS_DATA.find(s => s.id === user.schoolId);
        return `
            <tr>
                <td>
                    <div class="user-info">
                        <div class="user-avatar-small">${user.name.charAt(0)}</div>
                        <div class="user-details">
                            <div class="user-name">${user.name}</div>
                        </div>
                    </div>
                </td>
                <td><div class="user-email">${user.email}</div></td>
                <td><span class="role-badge ${user.role}">${getRoleName(user.role)}</span></td>
                <td>${school ? school.name : 'N/A'}</td>
                <td>
                    <span class="status-badge ${user.active ? 'active' : 'inactive'}">
                        <span class="status-dot"></span>
                        ${user.active ? 'Activo' : 'Inactivo'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="editUser(${user.id})">✏️</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">🗑️</button>
                </td>
            </tr>
        `;
    }).join('');
    
    tbody.innerHTML = html;
}

function renderStatsTable() {
    const tbody = document.getElementById('statsTableBody');
    if (!tbody) return;
    
    const html = SCHOOLS_DATA.map(school => `
        <tr>
            <td><strong>${school.name}</strong></td>
            <td>${school.type}</td>
            <td>${school.students.toLocaleString('es-CL')}</td>
            <td>${formatCurrency(school.budget)}</td>
            <td>${school.users}</td>
            <td>
                <span class="status-badge ${school.active ? 'active' : 'inactive'}">
                    <span class="status-dot"></span>
                    ${school.active ? 'Activo' : 'Inactivo'}
                </span>
            </td>
        </tr>
    `).join('');
    
    tbody.innerHTML = html;
}

function getRoleName(role) {
    const names = {
        'admin_global': 'Admin Global',
        'director': 'Director',
        'docente': 'Docente',
        'tecnico': 'Técnico'
    };
    return names[role] || role;
}

function filterUsers() {
    const search = document.getElementById('searchUser')?.value.toLowerCase() || '';
    const role = document.getElementById('filterRole')?.value || '';
    const schoolId = document.getElementById('filterSchoolUser')?.value || '';
    
    // Aplicar filtros (implementar lógica)
    renderUsersTable();
}

function editUser(userId) {
    showNotification('Función de edición de usuario en desarrollo');
}

function deleteUser(userId) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        showNotification('Usuario eliminado exitosamente');
    }
}

// Modales
function openCreateSchoolModal() {
    document.getElementById('schoolModalTitle').textContent = 'Nuevo Colegio';
    document.getElementById('schoolForm').reset();
    document.getElementById('schoolModal').classList.add('active');
}

function closeSchoolModal() {
    document.getElementById('schoolModal').classList.remove('active');
}

function saveSchool() {
    const name = document.getElementById('schoolName').value;
    const rbd = document.getElementById('schoolRBD').value;
    const type = document.getElementById('schoolType').value;
    const location = document.getElementById('schoolLocation').value;
    const students = parseInt(document.getElementById('schoolStudents').value);
    const budget = parseInt(document.getElementById('schoolBudget').value);
    
    if (!name || !rbd || !type || !location || !students || !budget) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    showNotification('Colegio guardado exitosamente');
    closeSchoolModal();
    renderSchoolsList();
    updateGlobalStats();
}

function openCreateUserModal() {
    document.getElementById('userModalTitle').textContent = 'Nuevo Usuario';
    document.getElementById('userForm').reset();
    document.getElementById('userModal').classList.add('active');
}

function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
}

function saveUser() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const role = document.getElementById('userRole').value;
    const schoolId = document.getElementById('userSchool').value;
    
    if (!name || !email || !password || !role || !schoolId) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    showNotification('Usuario creado exitosamente');
    closeUserModal();
    loadUsers();
}

// Navegación entre secciones
function showSection(sectionName) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    const section = document.getElementById(`section-${sectionName}`);
    if (section) {
        section.classList.add('active');
    }
    
    // Actualizar navegación activa
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item')?.classList.add('active');
}

// Poblar selectores de colegios
function populateSchoolSelectors() {
    const selectors = ['filterSchoolUser', 'userSchool'];
    
    selectors.forEach(selectorId => {
        const select = document.getElementById(selectorId);
        if (!select) return;
        
        const options = SCHOOLS_DATA.map(school => 
            `<option value="${school.id}">${school.name}</option>`
        ).join('');
        
        select.innerHTML += options;
    });
}

// Utilidades
function refreshData() {
    updateGlobalStats();
    renderSchoolsList();
    loadUsers();
    showNotification('Datos actualizados');
}

function showNotification(message) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: #22c55e;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('edugest_session');
        sessionStorage.removeItem('edugest_session');
        window.location.replace('login.html');
    }
}

// Estilos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
