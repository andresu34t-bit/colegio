// Configuración - Sistema de gestión de preferencias
class ConfiguracionManager {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.init();
    }
    
    init() {
        this.setupTabs();
        this.loadUserData();
        this.loadColegioData();
        this.loadSystemInfo();
        this.setupForms();
        this.updateUserInfo();
        
        console.log('✅ Configuración inicializada');
    }
    
    getCurrentUser() {
        const session = JSON.parse(localStorage.getItem('edugest_session') || '{}');
        return {
            id: session.userId || 'user-1',
            name: session.userName || 'Usuario Demo',
            role: session.userRole || 'director',
            schoolId: session.schoolId || 'colegio-1',
            email: session.userEmail || 'usuario@demo.cl',
            rut: session.userRut || '12.345.678-9'
        };
    }
    
    setupTabs() {
        const tabs = document.querySelectorAll('.config-tab');
        const panels = document.querySelectorAll('.config-panel');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // Actualizar tabs activos
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Actualizar paneles activos
                panels.forEach(p => p.classList.remove('active'));
                document.getElementById(`panel-${targetTab}`).classList.add('active');
            });
        });
    }
    
    loadUserData() {
        // Cargar datos del usuario
        const userData = JSON.parse(localStorage.getItem('user_profile') || '{}');
        
        document.getElementById('nombreCompleto').value = userData.nombre || this.currentUser.name;
        document.getElementById('rut').value = userData.rut || this.currentUser.rut;
        document.getElementById('email').value = userData.email || this.currentUser.email;
        document.getElementById('telefono').value = userData.telefono || '+56 9 1234 5678';
        document.getElementById('cargo').value = this.getRoleName(this.currentUser.role);
        
        // Avatar
        const avatarLetter = (userData.nombre || this.currentUser.name).charAt(0).toUpperCase();
        document.getElementById('avatarLetter').textContent = avatarLetter;
    }
    
    loadColegioData() {
        // Cargar datos del colegio
        const colegioData = JSON.parse(localStorage.getItem('colegio_info') || '{}');
        
        document.getElementById('colegioNombre').textContent = colegioData.nombre || 'Colegio Demo';
        document.getElementById('colegioRBD').textContent = colegioData.rbd || '12345-6';
        document.getElementById('colegioDireccion').textContent = colegioData.direccion || 'Av. Principal 123';
        document.getElementById('colegioComuna').textContent = colegioData.comuna || 'Santiago';
        document.getElementById('colegioRegion').textContent = colegioData.region || 'Región Metropolitana';
        document.getElementById('colegioTelefono').textContent = colegioData.telefono || '+56 2 2345 6789';
        document.getElementById('colegioEmail').textContent = colegioData.email || 'contacto@colegio.cl';
        document.getElementById('colegioTipo').textContent = colegioData.tipo || 'Municipal';
    }
    
    loadSystemInfo() {
        // Información del navegador y sistema
        const userAgent = navigator.userAgent;
        let navegador = 'Desconocido';
        let sistema = 'Desconocido';
        
        // Detectar navegador
        if (userAgent.indexOf('Chrome') > -1) navegador = 'Google Chrome';
        else if (userAgent.indexOf('Safari') > -1) navegador = 'Safari';
        else if (userAgent.indexOf('Firefox') > -1) navegador = 'Mozilla Firefox';
        else if (userAgent.indexOf('Edge') > -1) navegador = 'Microsoft Edge';
        
        // Detectar sistema operativo
        if (userAgent.indexOf('Win') > -1) sistema = 'Windows';
        else if (userAgent.indexOf('Mac') > -1) sistema = 'macOS';
        else if (userAgent.indexOf('Linux') > -1) sistema = 'Linux';
        else if (userAgent.indexOf('Android') > -1) sistema = 'Android';
        else if (userAgent.indexOf('iOS') > -1) sistema = 'iOS';
        
        document.getElementById('navegadorInfo').textContent = navegador;
        document.getElementById('sistemaInfo').textContent = sistema;
        
        // Cargar preferencias del sistema
        const prefs = JSON.parse(localStorage.getItem('system_preferences') || '{}');
        
        document.getElementById('idioma').value = prefs.idioma || 'es';
        document.getElementById('zonaHoraria').value = prefs.zonaHoraria || 'America/Santiago';
        document.getElementById('notificacionesEmail').checked = prefs.notificacionesEmail !== false;
        document.getElementById('notificacionesPush').checked = prefs.notificacionesPush !== false;
        document.getElementById('sonidoNotificaciones').checked = prefs.sonidoNotificaciones !== false;
    }
    
    setupForms() {
        // Form: Perfil
        document.getElementById('formPerfil').addEventListener('submit', (e) => {
            e.preventDefault();
            this.guardarPerfil();
        });
        
        // Form: Contraseña
        document.getElementById('formPassword').addEventListener('submit', (e) => {
            e.preventDefault();
            this.cambiarPassword();
        });
        
        // Form: Sistema
        document.getElementById('formSistema').addEventListener('submit', (e) => {
            e.preventDefault();
            this.guardarPreferencias();
        });
        
        // Password strength
        document.getElementById('passwordNueva').addEventListener('input', (e) => {
            this.checkPasswordStrength(e.target.value);
        });
    }
    
    guardarPerfil() {
        const userData = {
            nombre: document.getElementById('nombreCompleto').value,
            rut: document.getElementById('rut').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            cargo: document.getElementById('cargo').value
        };
        
        // Guardar en localStorage
        localStorage.setItem('user_profile', JSON.stringify(userData));
        
        // Actualizar sesión
        const session = JSON.parse(localStorage.getItem('edugest_session') || '{}');
        session.userName = userData.nombre;
        session.userEmail = userData.email;
        localStorage.setItem('edugest_session', JSON.stringify(session));
        
        // Actualizar UI
        this.updateUserInfo();
        
        this.showToast('Perfil actualizado correctamente', 'success');
    }
    
    cambiarPassword() {
        const passwordActual = document.getElementById('passwordActual').value;
        const passwordNueva = document.getElementById('passwordNueva').value;
        const passwordConfirmar = document.getElementById('passwordConfirmar').value;
        
        // Validaciones
        if (!passwordActual || !passwordNueva || !passwordConfirmar) {
            this.showToast('Por favor completa todos los campos', 'error');
            return;
        }
        
        if (passwordNueva.length < 8) {
            this.showToast('La contraseña debe tener al menos 8 caracteres', 'error');
            return;
        }
        
        if (passwordNueva !== passwordConfirmar) {
            this.showToast('Las contraseñas no coinciden', 'error');
            return;
        }
        
        // Validar contraseña actual (en producción, esto se haría en el backend)
        const session = JSON.parse(localStorage.getItem('edugest_session') || '{}');
        if (passwordActual !== (session.userPassword || 'demo123')) {
            this.showToast('La contraseña actual es incorrecta', 'error');
            return;
        }
        
        // Guardar nueva contraseña
        session.userPassword = passwordNueva;
        localStorage.setItem('edugest_session', JSON.stringify(session));
        
        // Limpiar formulario
        document.getElementById('formPassword').reset();
        document.getElementById('passwordStrength').className = 'password-strength';
        
        this.showToast('Contraseña cambiada correctamente', 'success');
    }
    
    guardarPreferencias() {
        const prefs = {
            idioma: document.getElementById('idioma').value,
            zonaHoraria: document.getElementById('zonaHoraria').value,
            notificacionesEmail: document.getElementById('notificacionesEmail').checked,
            notificacionesPush: document.getElementById('notificacionesPush').checked,
            sonidoNotificaciones: document.getElementById('sonidoNotificaciones').checked
        };
        
        localStorage.setItem('system_preferences', JSON.stringify(prefs));
        
        this.showToast('Preferencias guardadas correctamente', 'success');
    }
    
    checkPasswordStrength(password) {
        const strengthBar = document.getElementById('passwordStrength');
        
        if (!password) {
            strengthBar.className = 'password-strength';
            return;
        }
        
        let strength = 0;
        
        // Longitud
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Mayúsculas
        if (/[A-Z]/.test(password)) strength++;
        
        // Números
        if (/[0-9]/.test(password)) strength++;
        
        // Caracteres especiales
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        // Clasificar
        if (strength <= 2) {
            strengthBar.className = 'password-strength weak';
        } else if (strength <= 4) {
            strengthBar.className = 'password-strength medium';
        } else {
            strengthBar.className = 'password-strength strong';
        }
    }
    
    updateUserInfo() {
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const userRole = document.getElementById('userRole');
        const userSchool = document.getElementById('userSchool');
        
        const userData = JSON.parse(localStorage.getItem('user_profile') || '{}');
        const name = userData.nombre || this.currentUser.name;
        
        if (userAvatar) {
            userAvatar.textContent = name.charAt(0).toUpperCase();
        }
        
        if (userName) {
            userName.textContent = name;
        }
        
        if (userRole) {
            userRole.textContent = this.getRoleName(this.currentUser.role);
        }
        
        if (userSchool) {
            const colegioData = JSON.parse(localStorage.getItem('colegio_info') || '{}');
            userSchool.textContent = colegioData.nombre || 'Colegio Demo';
        }
    }
    
    getRoleName(role) {
        const roles = {
            'director': 'Director',
            'administrador': 'Administrador',
            'profesor': 'Profesor',
            'tecnico': 'Técnico'
        };
        return roles[role] || role;
    }
    
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Funciones globales
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.btn-toggle-password');
    
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}

function cambiarAvatar() {
    const colores = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];
    
    const avatar = document.getElementById('avatarPreview');
    const randomColor = colores[Math.floor(Math.random() * colores.length)];
    avatar.style.background = randomColor;
    
    // Guardar preferencia
    localStorage.setItem('avatar_color', randomColor);
}

function cancelarCambios(tab) {
    if (confirm('¿Deseas descartar los cambios?')) {
        if (tab === 'perfil') {
            configuracion.loadUserData();
        } else if (tab === 'seguridad') {
            document.getElementById('formPassword').reset();
            document.getElementById('passwordStrength').className = 'password-strength';
        } else if (tab === 'sistema') {
            configuracion.loadSystemInfo();
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.configuracion = new ConfiguracionManager();
    
    // Cargar color de avatar guardado
    const savedColor = localStorage.getItem('avatar_color');
    if (savedColor) {
        document.getElementById('avatarPreview').style.background = savedColor;
    }
});
