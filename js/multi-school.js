/**
 * EDUGEST - Sistema Multi-Colegio
 * Gestión de múltiples instituciones educativas
 */

// Estructura de colegios
const SCHOOLS = {
    'school_001': {
        id: 'school_001',
        name: 'Colegio San José',
        rbd: '12345-6',
        address: 'Av. Principal 123, Santiago',
        phone: '+56 2 2345 6789',
        email: 'contacto@sanjose.cl',
        logo: 'LOGO EDUGEST.png',
        active: true,
        createdAt: '2024-01-15'
    },
    'school_002': {
        id: 'school_002',
        name: 'Liceo Técnico Norte',
        rbd: '23456-7',
        address: 'Calle Norte 456, Antofagasta',
        phone: '+56 55 2345 6789',
        email: 'contacto@liceotecnico.cl',
        logo: 'LOGO EDUGEST.png',
        active: true,
        createdAt: '2024-02-20'
    },
    'school_003': {
        id: 'school_003',
        name: 'Escuela Básica Sur',
        rbd: '34567-8',
        address: 'Av. Sur 789, Temuco',
        phone: '+56 45 2345 6789',
        email: 'contacto@escuelasur.cl',
        logo: 'LOGO EDUGEST.png',
        active: true,
        createdAt: '2024-03-10'
    }
};

/**
 * Obtener colegio actual del usuario
 */
function getCurrentSchool() {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user || !user.schoolId) return null;
    
    return SCHOOLS[user.schoolId] || null;
}

/**
 * Obtener todos los colegios (solo Admin Global)
 */
function getAllSchools() {
    const user = window.EdugestRoles?.getCurrentUser();
    
    // Solo Admin Global puede ver todos los colegios
    if (!user || user.role !== 'admin_global') {
        return [getCurrentSchool()].filter(Boolean);
    }
    
    return Object.values(SCHOOLS).filter(school => school.active);
}

/**
 * Obtener colegio por ID
 */
function getSchoolById(schoolId) {
    return SCHOOLS[schoolId] || null;
}

/**
 * Filtrar datos por colegio
 */
function filterBySchool(data, schoolId = null) {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return [];
    
    // Si es Admin Global y no se especifica colegio, devolver todo
    if (user.role === 'admin_global' && !schoolId) {
        return data;
    }
    
    // Usar el colegio especificado o el del usuario
    const targetSchoolId = schoolId || user.schoolId;
    
    // Filtrar datos por colegio
    return data.filter(item => item.schoolId === targetSchoolId);
}

/**
 * Verificar si el usuario puede acceder a un colegio
 */
function canAccessSchool(schoolId) {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return false;
    
    // Admin Global puede acceder a cualquier colegio
    if (user.role === 'admin_global') return true;
    
    // Otros roles solo pueden acceder a su colegio
    return user.schoolId === schoolId;
}

/**
 * Cambiar colegio activo (solo Admin Global)
 */
function switchSchool(schoolId) {
    const user = window.EdugestRoles?.getCurrentUser();
    
    if (!user || user.role !== 'admin_global') {
        console.error('Solo Admin Global puede cambiar de colegio');
        return false;
    }
    
    if (!SCHOOLS[schoolId]) {
        console.error('Colegio no encontrado');
        return false;
    }
    
    // Actualizar sesión con nuevo colegio
    user.activeSchoolId = schoolId;
    
    const storage = localStorage.getItem('edugest_session') ? localStorage : sessionStorage;
    storage.setItem('edugest_session', JSON.stringify(user));
    
    return true;
}

/**
 * Obtener estadísticas por colegio
 */
function getSchoolStats(schoolId) {
    const school = getSchoolById(schoolId);
    if (!school) return null;
    
    // En producción, esto vendría de la base de datos
    return {
        schoolId: school.id,
        schoolName: school.name,
        totalEvents: Math.floor(Math.random() * 100) + 50,
        totalUsers: Math.floor(Math.random() * 20) + 10,
        avgSuccess: Math.floor(Math.random() * 30) + 70,
        activeAreas: 4,
        lastUpdate: new Date().toISOString()
    };
}

/**
 * Obtener estadísticas de todos los colegios (Admin Global)
 */
function getAllSchoolsStats() {
    const user = window.EdugestRoles?.getCurrentUser();
    
    if (!user || user.role !== 'admin_global') {
        return [getSchoolStats(user.schoolId)].filter(Boolean);
    }
    
    return Object.keys(SCHOOLS).map(schoolId => getSchoolStats(schoolId));
}

/**
 * Renderizar selector de colegios (Admin Global)
 */
function renderSchoolSelector(containerId) {
    const user = window.EdugestRoles?.getCurrentUser();
    
    // Solo para Admin Global
    if (!user || user.role !== 'admin_global') return;
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const schools = getAllSchools();
    const currentSchool = getCurrentSchool();
    
    const html = `
        <div class="school-selector">
            <label for="schoolSelect" class="form-label">Colegio Activo:</label>
            <select id="schoolSelect" class="form-select" onchange="window.EdugestSchools.handleSchoolChange(this.value)">
                <option value="">Todos los colegios</option>
                ${schools.map(school => `
                    <option value="${school.id}" ${school.id === currentSchool?.id ? 'selected' : ''}>
                        ${school.name}
                    </option>
                `).join('')}
            </select>
        </div>
    `;
    
    container.innerHTML = html;
}

/**
 * Manejar cambio de colegio
 */
function handleSchoolChange(schoolId) {
    if (schoolId && switchSchool(schoolId)) {
        // Recargar página para aplicar cambios
        window.location.reload();
    }
}

/**
 * Obtener información del colegio para mostrar en UI
 */
function getSchoolInfo() {
    const school = getCurrentSchool();
    if (!school) return null;
    
    return {
        name: school.name,
        rbd: school.rbd,
        logo: school.logo,
        contact: {
            address: school.address,
            phone: school.phone,
            email: school.email
        }
    };
}

/**
 * Validar que los datos pertenezcan al colegio correcto
 */
function validateSchoolData(data) {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return false;
    
    // Admin Global puede trabajar con cualquier colegio
    if (user.role === 'admin_global') return true;
    
    // Otros roles solo pueden trabajar con su colegio
    return data.schoolId === user.schoolId;
}

/**
 * Agregar schoolId a los datos antes de guardar
 */
function addSchoolId(data) {
    const user = window.EdugestRoles?.getCurrentUser();
    if (!user) return data;
    
    return {
        ...data,
        schoolId: user.activeSchoolId || user.schoolId
    };
}

// Exportar para uso global
window.EdugestSchools = {
    SCHOOLS,
    getCurrentSchool,
    getAllSchools,
    getSchoolById,
    filterBySchool,
    canAccessSchool,
    switchSchool,
    getSchoolStats,
    getAllSchoolsStats,
    renderSchoolSelector,
    handleSchoolChange,
    getSchoolInfo,
    validateSchoolData,
    addSchoolId
};
