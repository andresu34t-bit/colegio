/**
 * EDUGEST - Login Moderno
 * Funcionalidad y validaciones en tiempo real
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const errorMessage = document.getElementById('errorMessage');
    const loginLoader = document.getElementById('loginLoader');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    // Elementos de error
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // ============================================
    // TOGGLE PASSWORD VISIBILITY
    // ============================================
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            // Cambiar icono
            const eyeIcon = this.querySelector('.eye-icon');
            eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    // ============================================
    // VALIDACIÓN EN TIEMPO REAL - EMAIL
    // ============================================
    emailInput.addEventListener('blur', function() {
        validateEmail(this.value);
    });

    emailInput.addEventListener('input', function() {
        // Limpiar error al escribir
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            emailError.classList.remove('show');
            hideGlobalError();
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showFieldError(emailInput, emailError, 'El correo electrónico es requerido');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showFieldError(emailInput, emailError, 'Ingresa un correo electrónico válido');
            return false;
        }
        
        clearFieldError(emailInput, emailError);
        return true;
    }

    // ============================================
    // VALIDACIÓN EN TIEMPO REAL - PASSWORD
    // ============================================
    passwordInput.addEventListener('blur', function() {
        validatePassword(this.value);
    });

    passwordInput.addEventListener('input', function() {
        // Limpiar error al escribir
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            passwordError.classList.remove('show');
            hideGlobalError();
        }
    });

    function validatePassword(password) {
        if (!password) {
            showFieldError(passwordInput, passwordError, 'La contraseña es requerida');
            return false;
        }
        
        if (password.length < 6) {
            showFieldError(passwordInput, passwordError, 'La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        
        clearFieldError(passwordInput, passwordError);
        return true;
    }

    // ============================================
    // FUNCIONES DE ERROR
    // ============================================
    function showFieldError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Shake animation
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }

    function clearFieldError(input, errorElement) {
        input.classList.remove('error');
        errorElement.classList.remove('show');
    }

    function showGlobalError(message) {
        const alertText = errorMessage.querySelector('.alert-text');
        alertText.textContent = message;
        errorMessage.style.display = 'flex';
        
        // Scroll al error
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function hideGlobalError() {
        errorMessage.style.display = 'none';
    }

    // ============================================
    // SUBMIT DEL FORMULARIO
    // ============================================
    // NOTA: El submit es manejado por auth-demo.js
    // Este código solo maneja validaciones visuales

    // ============================================
    // FUNCIONES DE LOADER
    // ============================================
    function showLoader() {
        if (loginLoader) {
            loginLoader.style.display = 'flex';
        }
    }

    function hideLoader() {
        if (loginLoader) {
            loginLoader.style.display = 'none';
        }
    }

    // ============================================
    // REDIRECCIÓN POR ROL
    // ============================================
    function redirectByRole(user) {
        const roleRedirects = {
            'director': 'dashboard.html',
            'docente': 'dashboard.html',
            'tecnico': 'dashboard.html',
            'admin': 'admin-global.html'
        };
        
        const redirectUrl = roleRedirects[user.role] || 'dashboard.html';
        
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 500);
    }

    // ============================================
    // CARGAR EMAIL GUARDADO (RECORDARME)
    // ============================================
    function loadRememberedEmail() {
        const remember = localStorage.getItem('edugest_remember');
        const savedEmail = localStorage.getItem('edugest_email');
        
        if (remember === 'true' && savedEmail) {
            emailInput.value = savedEmail;
            rememberMeCheckbox.checked = true;
        }
    }

    // Cargar email al iniciar
    loadRememberedEmail();

    // ============================================
    // ANIMACIÓN DE ENTRADA
    // ============================================
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // ============================================
    // CONSOLE INFO
    // ============================================
    console.log('%c🎓 EDUGEST - Sistema de Gestión Educativa', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cLogin Moderno v2.0 - Diseño Profesional SaaS', 'color: #764ba2; font-size: 12px;');
    console.log('%c\n📧 Usuarios de prueba disponibles:', 'color: #4b5563; font-weight: bold;');
    console.log('   director@mistral.cl / Director2026');
    console.log('   docente@mistral.cl / Docente2026');
    console.log('   utp@mistral.cl / UTP2026');
    console.log('   director@edugest.cl / EduGest2026');
    console.log('   admin@edugest.cl / Admin2026 (Super Admin)');
});
