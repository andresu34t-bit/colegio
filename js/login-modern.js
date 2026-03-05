/**
 * EDUGEST - Login Moderno
 * Manejo de autenticación y validación
 */

// Usuarios de demostración (en producción esto vendría de una base de datos)
const DEMO_USERS = {
    // Admin Global
    'admin@edugest.cl': {
        password: 'admin123',
        role: 'admin_global',
        name: 'Administrador Global',
        schoolId: null,
        school: 'Sistema EDUGEST'
    },
    
    // Colegio San José
    'director.sanjose@edugest.cl': {
        password: 'director123',
        role: 'director',
        name: 'Juan Pérez',
        schoolId: 'school_001',
        school: 'Colegio San José'
    },
    'docente1.sanjose@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'María González',
        schoolId: 'school_001',
        school: 'Colegio San José'
    },
    'docente2.sanjose@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'Pedro Martínez',
        schoolId: 'school_001',
        school: 'Colegio San José'
    },
    'docente3.sanjose@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'Ana Silva',
        schoolId: 'school_001',
        school: 'Colegio San José'
    },
    'tecnico.sanjose@edugest.cl': {
        password: 'tecnico123',
        role: 'tecnico',
        name: 'Carlos Ramírez',
        schoolId: 'school_001',
        school: 'Colegio San José'
    },
    
    // Liceo Técnico Norte
    'director.norte@edugest.cl': {
        password: 'director123',
        role: 'director',
        name: 'Roberto Flores',
        schoolId: 'school_002',
        school: 'Liceo Técnico Norte'
    },
    'docente1.norte@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'Laura Díaz',
        schoolId: 'school_002',
        school: 'Liceo Técnico Norte'
    },
    'docente2.norte@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'Jorge Vargas',
        schoolId: 'school_002',
        school: 'Liceo Técnico Norte'
    },
    'docente3.norte@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'Patricia Rojas',
        schoolId: 'school_002',
        school: 'Liceo Técnico Norte'
    },
    'tecnico.norte@edugest.cl': {
        password: 'tecnico123',
        role: 'tecnico',
        name: 'Miguel Torres',
        schoolId: 'school_002',
        school: 'Liceo Técnico Norte'
    },
    
    // Escuela Básica Sur
    'director.sur@edugest.cl': {
        password: 'director123',
        role: 'director',
        name: 'Carmen Muñoz',
        schoolId: 'school_003',
        school: 'Escuela Básica Sur'
    },
    'docente1.sur@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'Felipe Castro',
        schoolId: 'school_003',
        school: 'Escuela Básica Sur'
    },
    'docente2.sur@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'Daniela Soto',
        schoolId: 'school_003',
        school: 'Escuela Básica Sur'
    },
    'docente3.sur@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'Ricardo Pinto',
        schoolId: 'school_003',
        school: 'Escuela Básica Sur'
    },
    'tecnico.sur@edugest.cl': {
        password: 'tecnico123',
        role: 'tecnico',
        name: 'Valentina Herrera',
        schoolId: 'school_003',
        school: 'Escuela Básica Sur'
    },
    
    // Liceo Gabriela Mistral
    'director.mistral@edugest.cl': {
        password: 'mistral2024',
        role: 'director',
        name: 'Ana Martínez Rojas',
        schoolId: 'school_004',
        school: 'Liceo Técnico Profesional Gabriela Mistral'
    },
    'docente1.mistral@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'Claudia Fernández',
        schoolId: 'school_004',
        school: 'Liceo Técnico Profesional Gabriela Mistral'
    },
    'docente2.mistral@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'Rodrigo Valenzuela',
        schoolId: 'school_004',
        school: 'Liceo Técnico Profesional Gabriela Mistral'
    },
    'tecnico.mistral@edugest.cl': {
        password: 'tecnico123',
        role: 'tecnico',
        name: 'Sebastián Morales',
        schoolId: 'school_004',
        school: 'Liceo Técnico Profesional Gabriela Mistral'
    },
    
    // Instituto Técnico Industrial
    'director.tecnico@edugest.cl': {
        password: 'industrial2026',
        role: 'director',
        name: 'Rodrigo Fuentes',
        schoolId: 'colegio-003',
        school: 'Instituto Técnico Industrial'
    },
    'profesor.mecanica@edugest.cl': {
        password: 'mecanica789',
        role: 'docente',
        name: 'Alberto Méndez',
        schoolId: 'colegio-003',
        school: 'Instituto Técnico Industrial'
    },
    
    // Liceo Bicentenario de Excelencia
    'director.bicentenario@edugest.cl': {
        password: 'excel2026',
        role: 'director',
        name: 'Claudia Morales',
        schoolId: 'colegio-004',
        school: 'Liceo Bicentenario de Excelencia'
    },
    'profe.ciencias@edugest.cl': {
        password: 'ciencias555',
        role: 'docente',
        name: 'Sebastián Vega',
        schoolId: 'colegio-004',
        school: 'Liceo Bicentenario de Excelencia'
    },
    
    // Colegio Montessori del Valle
    'coordinador.montessori@edugest.cl': {
        password: 'montessori321',
        role: 'director',
        name: 'Francisca Bravo',
        schoolId: 'colegio-005',
        school: 'Colegio Montessori del Valle'
    },
    'guia.primaria@edugest.cl': {
        password: 'guia2026',
        role: 'docente',
        name: 'Camila Espinoza',
        schoolId: 'colegio-005',
        school: 'Colegio Montessori del Valle'
    },
    
    // Escuela Rural Valle Verde
    'director.valleverde@edugest.cl': {
        password: 'rural2026',
        role: 'director',
        name: 'Marcelo Campos',
        schoolId: 'colegio-006',
        school: 'Escuela Rural Valle Verde'
    },
    'maestro.multigrado@edugest.cl': {
        password: 'rural123',
        role: 'docente',
        name: 'Rosa Navarro',
        schoolId: 'colegio-006',
        school: 'Escuela Rural Valle Verde'
    },
    
    // Colegio Bilingüe Internacional
    'principal.bilingual@edugest.cl': {
        password: 'bilingual999',
        role: 'director',
        name: 'Katherine Wilson',
        schoolId: 'colegio-007',
        school: 'Colegio Bilingüe Internacional'
    },
    'teacher.english@edugest.cl': {
        password: 'english2026',
        role: 'docente',
        name: 'Michael Anderson',
        schoolId: 'colegio-007',
        school: 'Colegio Bilingüe Internacional'
    },
    
    // Liceo Artístico Gabriela Mistral
    'director.artistico@edugest.cl': {
        password: 'arte2026',
        role: 'director',
        name: 'Gabriela Reyes',
        schoolId: 'colegio-008',
        school: 'Liceo Artístico Gabriela Mistral'
    },
    'maestro.musica@edugest.cl': {
        password: 'musica444',
        role: 'docente',
        name: 'Andrés Parra',
        schoolId: 'colegio-008',
        school: 'Liceo Artístico Gabriela Mistral'
    },
    
    // Colegio Deportivo Alto Rendimiento
    'director.deportivo@edugest.cl': {
        password: 'deporte2026',
        role: 'director',
        name: 'Cristian Medina',
        schoolId: 'colegio-009',
        school: 'Colegio Deportivo Alto Rendimiento'
    },
    'coach.futbol@edugest.cl': {
        password: 'futbol777',
        role: 'docente',
        name: 'Javier Contreras',
        schoolId: 'colegio-009',
        school: 'Colegio Deportivo Alto Rendimiento'
    },
    
    // Instituto Waldorf Raíces del Sur
    'coordinador.waldorf@edugest.cl': {
        password: 'waldorf2026',
        role: 'director',
        name: 'Sofía Larraín',
        schoolId: 'colegio-010',
        school: 'Instituto Waldorf Raíces del Sur'
    },
    'maestro.waldorf@edugest.cl': {
        password: 'steiner888',
        role: 'docente',
        name: 'Tomás Becker',
        schoolId: 'colegio-010',
        school: 'Instituto Waldorf Raíces del Sur'
    },
    
    // Colegio Científico Innovación
    'director.cientifico@edugest.cl': {
        password: 'innovacion2026',
        role: 'director',
        name: 'Patricia Núñez',
        schoolId: 'colegio-011',
        school: 'Colegio Científico Innovación'
    },
    'profesor.robotica@edugest.cl': {
        password: 'stem2026',
        role: 'docente',
        name: 'Diego Salazar',
        schoolId: 'colegio-011',
        school: 'Colegio Científico Innovación'
    },
    
    // Escuela Básica Amanecer
    'director.amanecer@edugest.cl': {
        password: 'amanecer2026',
        role: 'director',
        name: 'Lorena Gutiérrez',
        schoolId: 'colegio-012',
        school: 'Escuela Básica Amanecer'
    },
    'educadora.pie@edugest.cl': {
        password: 'inclusion2026',
        role: 'docente',
        name: 'Paulina Ortiz',
        schoolId: 'colegio-012',
        school: 'Escuela Básica Amanecer'
    },
    
    // Colegio Alemán de Santiago
    'director.aleman@edugest.cl': {
        password: 'deutsch2026',
        role: 'director',
        name: 'Hans Müller',
        schoolId: 'colegio-013',
        school: 'Colegio Alemán de Santiago'
    },
    'lehrer.deutsch@edugest.cl': {
        password: 'german888',
        role: 'docente',
        name: 'Ingrid Schmidt',
        schoolId: 'colegio-013',
        school: 'Colegio Alemán de Santiago'
    },
    
    // Liceo Comercial Empresarial
    'director.comercial@edugest.cl': {
        password: 'comercio2026',
        role: 'director',
        name: 'Mónica Tapia',
        schoolId: 'colegio-014',
        school: 'Liceo Comercial Empresarial'
    },
    'profesor.contabilidad@edugest.cl': {
        password: 'conta999',
        role: 'docente',
        name: 'Héctor Bustos',
        schoolId: 'colegio-014',
        school: 'Liceo Comercial Empresarial'
    },
    
    // Colegio Adventista del Pacífico
    'director.adventista@edugest.cl': {
        password: 'advent2026',
        role: 'director',
        name: 'Samuel Rojas',
        schoolId: 'colegio-015',
        school: 'Colegio Adventista del Pacífico'
    },
    'maestro.religion@edugest.cl': {
        password: 'faith777',
        role: 'docente',
        name: 'Rebeca Flores',
        schoolId: 'colegio-015',
        school: 'Colegio Adventista del Pacífico'
    },
    
    // Instituto Marítimo de Valparaíso
    'director.maritimo@edugest.cl': {
        password: 'marino2026',
        role: 'director',
        name: 'Capitán Jorge Navarro',
        schoolId: 'colegio-016',
        school: 'Instituto Marítimo de Valparaíso'
    },
    'instructor.nautica@edugest.cl': {
        password: 'nautica555',
        role: 'docente',
        name: 'Rodrigo Marín',
        schoolId: 'colegio-016',
        school: 'Instituto Marítimo de Valparaíso'
    },
    
    // Colegio Ecológico Tierra Verde
    'director.ecologico@edugest.cl': {
        password: 'eco2026',
        role: 'director',
        name: 'Verónica Lagos',
        schoolId: 'colegio-017',
        school: 'Colegio Ecológico Tierra Verde'
    },
    'profesor.ambiental@edugest.cl': {
        password: 'green444',
        role: 'docente',
        name: 'Matías Prado',
        schoolId: 'colegio-017',
        school: 'Colegio Ecológico Tierra Verde'
    },
    
    // Liceo Agrícola Valle Fértil
    'director.agricola@edugest.cl': {
        password: 'agro2026',
        role: 'director',
        name: 'Fernando Campos',
        schoolId: 'colegio-018',
        school: 'Liceo Agrícola Valle Fértil'
    },
    'ingeniero.agronomo@edugest.cl': {
        password: 'agro333',
        role: 'docente',
        name: 'Carolina Vergara',
        schoolId: 'colegio-018',
        school: 'Liceo Agrícola Valle Fértil'
    },
    
    // Colegio de Música y Danza Contemporánea
    'director.musica@edugest.cl': {
        password: 'music2026',
        role: 'director',
        name: 'Alejandra Soto',
        schoolId: 'colegio-019',
        school: 'Colegio de Música y Danza Contemporánea'
    },
    'maestro.danza@edugest.cl': {
        password: 'dance666',
        role: 'docente',
        name: 'Cristóbal Muñoz',
        schoolId: 'colegio-019',
        school: 'Colegio de Música y Danza Contemporánea'
    },
    
    // Instituto Tecnológico de Programación
    'director.programacion@edugest.cl': {
        password: 'code2026',
        role: 'director',
        name: 'Andrés Valdivia',
        schoolId: 'colegio-020',
        school: 'Instituto Tecnológico de Programación'
    },
    'dev.python@edugest.cl': {
        password: 'python123',
        role: 'docente',
        name: 'Daniela Torres',
        schoolId: 'colegio-020',
        school: 'Instituto Tecnológico de Programación'
    },
    
    // Colegio Británico de Chile
    'headmaster.british@edugest.cl': {
        password: 'british2026',
        role: 'director',
        name: 'James Thompson',
        schoolId: 'colegio-021',
        school: 'Colegio Británico de Chile'
    },
    'teacher.cambridge@edugest.cl': {
        password: 'cambridge999',
        role: 'docente',
        name: 'Emma Watson',
        schoolId: 'colegio-021',
        school: 'Colegio Británico de Chile'
    },
    
    // Escuela de Gastronomía Culinaria
    'director.gastronomia@edugest.cl': {
        password: 'chef2026',
        role: 'director',
        name: 'Chef Rodrigo Barros',
        schoolId: 'colegio-022',
        school: 'Escuela de Gastronomía Culinaria'
    },
    'chef.instructor@edugest.cl': {
        password: 'cocina777',
        role: 'docente',
        name: 'Valentina Riquelme',
        schoolId: 'colegio-022',
        school: 'Escuela de Gastronomía Culinaria'
    },
    
    // Usuarios legacy (compatibilidad)
    'director@edugest.cl': {
        password: 'director123',
        role: 'director',
        name: 'Juan Pérez',
        schoolId: 'school_001',
        school: 'Colegio San José'
    },
    'docente@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'María González',
        schoolId: 'school_001',
        school: 'Colegio San José'
    },
    'tecnico@edugest.cl': {
        password: 'tecnico123',
        role: 'tecnico',
        name: 'Carlos Ramírez',
        schoolId: 'school_001',
        school: 'Colegio San José'
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initLoginForm();
    initPasswordToggle();
    checkExistingSession();
});

/**
 * Inicializar formulario de login
 */
function initLoginForm() {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (!form) return;
    
    // Validación en tiempo real
    emailInput.addEventListener('blur', () => {
        validateEmail(emailInput.value);
    });
    
    passwordInput.addEventListener('blur', () => {
        validatePassword(passwordInput.value);
    });
    
    // Submit del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;
        
        // Validar campos
        if (!validateEmail(email) || !validatePassword(password)) {
            return;
        }
        
        // Intentar login
        await handleLogin(email, password, remember);
    });
}

/**
 * Toggle para mostrar/ocultar contraseña
 */
function initPasswordToggle() {
    const toggleBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (!toggleBtn || !passwordInput) return;
    
    toggleBtn.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        const icon = toggleBtn.querySelector('.eye-icon');
        icon.textContent = type === 'password' ? '👁️' : '🙈';
    });
}

/**
 * Validar email
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError('Por favor ingresa tu correo electrónico');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError('Por favor ingresa un correo electrónico válido');
        return false;
    }
    
    return true;
}

/**
 * Validar contraseña
 */
function validatePassword(password) {
    if (!password) {
        showError('Por favor ingresa tu contraseña');
        return false;
    }
    
    if (password.length < 6) {
        showError('La contraseña debe tener al menos 6 caracteres');
        return false;
    }
    
    return true;
}

/**
 * Manejar login
 */
async function handleLogin(email, password, remember) {
    const btn = document.querySelector('.btn-login');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    
    // Mostrar loader
    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    hideError();
    
    // Simular delay de red (en producción esto sería una llamada a API)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar credenciales
    const user = DEMO_USERS[email];
    
    if (!user || user.password !== password) {
        showError('Correo o contraseña incorrectos');
        btn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        return;
    }
    
    // Login exitoso
    const sessionData = {
        email: email,
        role: user.role,
        name: user.name,
        school: user.school,
        schoolId: user.schoolId,
        loginTime: new Date().toISOString()
    };
    
    // Guardar sesión
    if (remember) {
        localStorage.setItem('edugest_session', JSON.stringify(sessionData));
    } else {
        sessionStorage.setItem('edugest_session', JSON.stringify(sessionData));
    }
    
    // Redirigir según rol
    showSuccess('¡Bienvenido! Redirigiendo...');
    
    setTimeout(() => {
        // Admin Global va a su panel especial
        if (user.role === 'admin_global') {
            window.location.href = 'admin-global.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    }, 1000);
}

/**
 * Verificar sesión existente
 */
function checkExistingSession() {
    const session = localStorage.getItem('edugest_session') || 
                   sessionStorage.getItem('edugest_session');
    
    if (session) {
        try {
            const data = JSON.parse(session);
            // Redirigir según rol
            if (data.role === 'admin_global') {
                window.location.href = 'admin-global.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        } catch (e) {
            // Sesión inválida, limpiar
            localStorage.removeItem('edugest_session');
            sessionStorage.removeItem('edugest_session');
        }
    }
}

/**
 * Mostrar mensaje de error
 */
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (!errorDiv) return;
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'flex';
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        hideError();
    }, 5000);
}

/**
 * Ocultar mensaje de error
 */
function hideError() {
    const errorDiv = document.getElementById('error-message');
    if (!errorDiv) return;
    
    errorDiv.style.display = 'none';
}

/**
 * Mostrar mensaje de éxito
 */
function showSuccess(message) {
    const errorDiv = document.getElementById('error-message');
    if (!errorDiv) return;
    
    errorDiv.style.background = '#f0fdf4';
    errorDiv.style.color = '#15803d';
    errorDiv.style.borderLeftColor = '#22c55e';
    errorDiv.textContent = message;
    errorDiv.style.display = 'flex';
}

/**
 * Utilidad para obtener sesión actual
 */
function getCurrentSession() {
    const session = localStorage.getItem('edugest_session') || 
                   sessionStorage.getItem('edugest_session');
    
    if (!session) return null;
    
    try {
        return JSON.parse(session);
    } catch (e) {
        return null;
    }
}

/**
 * Utilidad para cerrar sesión
 */
function logout() {
    localStorage.removeItem('edugest_session');
    sessionStorage.removeItem('edugest_session');
    window.location.href = 'login.html';
}

// Exportar funciones para uso global
window.EdugestAuth = {
    getCurrentSession,
    logout,
    DEMO_USERS
};
