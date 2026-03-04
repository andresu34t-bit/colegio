/**
 * EDUGEST - Login Moderno
 * Manejo de autenticación y validación
 */

// Usuarios de demostración (en producción esto vendría de una base de datos)
const DEMO_USERS = {
    'director@edugest.cl': {
        password: 'director123',
        role: 'director',
        name: 'Juan Pérez',
        school: 'Colegio San José'
    },
    'docente@edugest.cl': {
        password: 'docente123',
        role: 'docente',
        name: 'María González',
        school: 'Colegio San José'
    },
    'tecnico@edugest.cl': {
        password: 'tecnico123',
        role: 'tecnico',
        name: 'Carlos Ramírez',
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
        loginTime: new Date().toISOString()
    };
    
    // Guardar sesión
    if (remember) {
        localStorage.setItem('edugest_session', JSON.stringify(sessionData));
    } else {
        sessionStorage.setItem('edugest_session', JSON.stringify(sessionData));
    }
    
    // Redirigir al dashboard
    showSuccess('¡Bienvenido! Redirigiendo...');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
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
            // Si hay sesión válida, redirigir al dashboard
            window.location.href = 'dashboard.html';
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
