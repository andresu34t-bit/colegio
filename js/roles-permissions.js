/**
 * EDUGEST - Sistema de Roles y Permisos
 * Gestión avanzada de autorización
 */

// Definición de roles
const ROLES = {
    ADMIN_GLOBAL: 'admin_global',
    DIRECTOR: 'director',
    DOCENTE: 'docente',
    TECNICO: 'tecnico'
};

// Definición de permisos por rol
const PERMISSIONS = {
    [ROLES.ADMIN_GLOBAL]: {
        // Admin Global puede todo
        viewAllSchools: true,
        manageSchools: true,
        manageUsers: true,
        viewAllReports: true,
        accessAnySchool: true,
        manageSystem: true,
        viewGlobalStats: true
    },
    [ROLES.DIRECTOR]: {
        // Director gestiona su colegio
        viewSchool: true,
        manageTeachers: true,
        approveEvents: true,
        viewReports: true,
        manageDocuments: true,
        viewStats: true,
        chat: true
    },
    [ROLES.DOCENTE]: {
        // Docente registra y ve sus eventos
        createEvents: true,
        viewOwnEvents: true,
        uploadDocuments: true,
        chat: true,
        viewBasicStats: true
    },
    [ROLES.TECNICO]: {
        // Técnico da soporte
        viewStats: true,
        chat: true,
        provideSupport: true,
        viewReports: true
    }
};

// Módulos visibles por rol
const MODULE_ACCESS = {
    [ROLES.ADMIN_GLOBAL]: [
        'admin-global',
        'dashboard',
        'schools',
        'users',
        'reports',
        'stats',
        'settings'
    ],
    [ROLES.DIRECTOR]: [
        'dashboard',
        'events',
        'reports',
        'teachers',
        'documents',
        'calendar',
        'chat',
        'stats'
    ],
    [ROLES.DOCENTE]: [
        'dashboard',
        'my-events',
        'create-event',
        'documents',
        'calendar',
        'chat'
    ],
    [ROLES.TECNICO]: [
        'dashboard',
        'support',
        'chat',
        'stats',
        'reports'
    ]
};

/**
 * Verificar si el usuario tiene un permiso específico
 */
function hasPermission(role, permission) {
    if (!role || !PERMISSIONS[role]) return false;
    return PERMISSIONS[role][permission] === true;
}

/**
 * Verificar si el usuario puede acceder a un módulo
 */
function canAccessModule(role, module) {
    if (!role || !MODULE_ACCESS[role]) return false;
    return MODULE_ACCESS[role].includes(module);
}

/**
 * Obtener sesión actual con validación
 */
function getCurrentUser() {
    const session = localStorage.getItem('edugest_session') || 
                   sessionStorage.getItem('edugest_session');
    
    if (!session) return null;
    
    try {
        const user = JSON.parse(session);
        
        // Validar estructura mínima
        if (!user.email || !user.role || !user.schoolId) {
            console.error('Sesión inválida: faltan campos requeridos');
            return null;
        }
        
        return user;
    } catch (e) {
        console.error('Error al parsear sesión:', e);
        return null;
    }
}

/**
 * Proteger página según rol
 */
function protectPage(requiredRole = null, requiredPermission = null) {
    const user = getCurrentUser();
    
    // Si no hay usuario, redirigir a login
    if (!user) {
        window.location.replace('login.html');
        return false;
    }
    
    // Si se requiere un rol específico
    if (requiredRole && user.role !== requiredRole && user.role !== ROLES.ADMIN_GLOBAL) {
        showAccessDenied();
        return false;
    }
    
    // Si se requiere un permiso específico
    if (requiredPermission && !hasPermission(user.role, requiredPermission)) {
        showAccessDenied();
        return false;
    }
    
    return true;
}

/**
 * Mostrar mensaje de acceso denegado
 */
function showAccessDenied() {
    document.body.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: system-ui;">
            <div style="text-align: center; max-width: 500px; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🔒</div>
                <h1 style="font-size: 2rem; margin-bottom: 1rem; color: #dc2626;">Acceso Denegado</h1>
                <p style="color: #6b7280; margin-bottom: 2rem;">No tienes permisos para acceder a esta página.</p>
                <button onclick="window.location.href='dashboard.html'" style="background: #3b82f6; color: white; padding: 0.75rem 2rem; border: none; border-radius: 0.5rem; cursor: pointer; font-size: 1rem;">
                    Volver al Dashboard
                </button>
            </div>
        </div>
    `;
}

/**
 * Filtrar elementos del DOM según permisos
 */
function applyPermissions() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Ocultar elementos según permisos
    document.querySelectorAll('[data-permission]').forEach(el => {
        const permission = el.dataset.permission;
        if (!hasPermission(user.role, permission)) {
            el.style.display = 'none';
        }
    });
    
    // Ocultar módulos según acceso
    document.querySelectorAll('[data-module]').forEach(el => {
        const module = el.dataset.module;
        if (!canAccessModule(user.role, module)) {
            el.style.display = 'none';
        }
    });
    
    // Ocultar elementos por rol
    document.querySelectorAll('[data-role]').forEach(el => {
        const allowedRoles = el.dataset.role.split(',');
        if (!allowedRoles.includes(user.role) && user.role !== ROLES.ADMIN_GLOBAL) {
            el.style.display = 'none';
        }
    });
}

/**
 * Obtener nombre legible del rol
 */
function getRoleName(role) {
    const names = {
        [ROLES.ADMIN_GLOBAL]: 'Administrador Global',
        [ROLES.DIRECTOR]: 'Director',
        [ROLES.DOCENTE]: 'Docente',
        [ROLES.TECNICO]: 'Técnico'
    };
    return names[role] || role;
}

/**
 * Verificar si es admin global
 */
function isAdminGlobal() {
    const user = getCurrentUser();
    return user && user.role === ROLES.ADMIN_GLOBAL;
}

/**
 * Verificar si es director
 */
function isDirector() {
    const user = getCurrentUser();
    return user && user.role === ROLES.DIRECTOR;
}

/**
 * Verificar si es docente
 */
function isDocente() {
    const user = getCurrentUser();
    return user && user.role === ROLES.DOCENTE;
}

/**
 * Verificar si es técnico
 */
function isTecnico() {
    const user = getCurrentUser();
    return user && user.role === ROLES.TECNICO;
}

// Exportar para uso global
window.EdugestRoles = {
    ROLES,
    PERMISSIONS,
    MODULE_ACCESS,
    hasPermission,
    canAccessModule,
    getCurrentUser,
    protectPage,
    applyPermissions,
    getRoleName,
    isAdminGlobal,
    isDirector,
    isDocente,
    isTecnico
};
