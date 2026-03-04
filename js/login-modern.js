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
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Limpiar errores previos
        hideGlobalError();
        
        // Obtener valores
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberMeCheckbox.checked;
        
        // Validar campos
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        
        if (!isEmailValid || !isPasswordValid) {
            showGlobalError('Por favor, corrige los errores en el formulario');
            return;
        }
        
        // Mostrar loader
        showLoader();
        
        // Deshabilitar botón
        const submitBtn = loginForm.querySelector('.btn-login');
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Iniciando...';
        
        try {
            // Simular delay de red (remover en producción)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Aquí va la lógica de autenticación real
            // Por ahora, llamamos a la función del auth-demo.js si existe
            if (typeof handleLogin === 'function') {
                const result = await handleLogin(email, password);
                
                if (result.success) {
                    // Guardar "recordarme" si está marcado
                    if (rememberMe) {
                        localStorage.setItem('edugest_remember', 'true');
                        localStorage.setItem('edugest_email', email);
                    } else {
                        localStorage.removeItem('edugest_remember');
                        localStorage.removeItem('edugest_email');
                    }
                    
                    // Redireccionar según rol
                    redirectByRole(result.user);
                } else {
                    throw new Error(result.message || 'Credenciales incorrectas');
                }
            } else {
                // Fallback: validación básica de demo
                const demoUsers = {
                    'director@colegio.cl': { password: '123456', role: 'director' },
                    'docente@colegio.cl': { password: '123456', role: 'docente' },
                    'tecnico@colegio.cl': { password: '123456', role: 'tecnico' }
                };
                
                const user = demoUsers[email];
                
                if (user && user.password === password) {
                    // Login exitoso
                    if (rememberMe) {
                        localStorage.setItem('edugest_remember', 'true');
                        localStorage.setItem('edugest_email', email);
                    }
                    
                    // Guardar sesión
                    sessionStorage.setItem('edugest_user', JSON.stringify({
                        email: email,
                        role: user.role
                    }));
                    
                    // Redireccionar
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 500);
                } else {
                    throw new Error('Correo o contraseña incorrectos');
                }
            }
        } catch (error) {
            // Ocultar loader
            hideLoader();
            
            // Habilitar botón
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').textContent = 'Iniciar sesión';
            
            // Mostrar error
            showGlobalError(error.message || 'Error al iniciar sesión. Intenta nuevamente.');
            
            // Marcar campos como error
            emailInput.classList.add('error');
            passwordInput.classList.add('error');
            
            // Shake animation en el formulario
            loginForm.classList.add('shake');
            setTimeout(() => loginForm.classList.remove('shake'), 500);
        }
    });

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
    // PREVENIR DOBLE SUBMIT
    // ============================================
    let isSubmitting = false;
    
    loginForm.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return false;
        }
    });

    // ============================================
    // ANIMACIÓN DE ENTRADA
    // ============================================
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // ============================================
    // DETECTAR ENTER EN CAMPOS
    // ============================================
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }
    });

    // ============================================
    // CONSOLE INFO
    // ============================================
    console.log('%c🎓 EDUGEST - Sistema de Gestión Educativa', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cLogin Moderno v2.0', 'color: #764ba2; font-size: 12px;');
    console.log('%c\nUsuarios de prueba:', 'color: #4b5563; font-weight: bold;');
    console.log('📧 director@colegio.cl / 123456');
    console.log('📧 docente@colegio.cl / 123456');
    console.log('📧 tecnico@colegio.cl / 123456');
});

// ============================================
// FUNCIÓN GLOBAL PARA COMPATIBILIDAD
// ============================================
async function handleLogin(email, password) {
    // Esta función puede ser sobrescrita por auth-demo.js
    // o implementada con la lógica real de autenticación
    return {
        success: false,
        message: 'Función de autenticación no implementada'
    };
}
