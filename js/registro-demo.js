// Sistema de registro multi-colegio

const registroForm = document.getElementById('registroForm');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

registroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Limpiar mensajes
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    
    // Obtener datos del formulario
    const nombreColegio = document.getElementById('nombreColegio').value.trim();
    const rbd = document.getElementById('rbd').value.trim();
    const region = document.getElementById('region').value;
    const nombreDirector = document.getElementById('nombreDirector').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validaciones
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Las contraseñas no coinciden';
        errorMessage.style.display = 'block';
        return;
    }
    
    if (password.length < 6) {
        errorMessage.textContent = 'La contraseña debe tener al menos 6 caracteres';
        errorMessage.style.display = 'block';
        return;
    }
    
    // Generar ID único para el colegio
    const colegioId = 'colegio_' + Date.now();
    
    // Cargar colegios existentes
    const colegiosStr = localStorage.getItem('colegios');
    const colegios = colegiosStr ? JSON.parse(colegiosStr) : {};
    
    // Verificar si el email ya existe
    const usuariosStr = localStorage.getItem('usuarios');
    const usuarios = usuariosStr ? JSON.parse(usuariosStr) : {};
    
    if (usuarios[email]) {
        errorMessage.textContent = 'Este email ya está registrado';
        errorMessage.style.display = 'block';
        return;
    }
    
    // Crear colegio
    colegios[colegioId] = {
        id: colegioId,
        nombre: nombreColegio,
        rbd: rbd,
        region: region,
        fechaRegistro: new Date().toISOString(),
        activo: true
    };
    
    // Crear usuario director
    usuarios[email] = {
        email: email,
        password: password, // En producción, esto debe estar hasheado
        nombre: nombreDirector,
        rol: 'director',
        colegioId: colegioId,
        permisoFinanzas: true,
        activo: true
    };
    
    // Guardar en localStorage
    localStorage.setItem('colegios', JSON.stringify(colegios));
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    console.log('✅ Colegio registrado:', colegioId);
    console.log('✅ Director registrado:', email);
    
    // Mostrar mensaje de éxito
    successMessage.textContent = '✅ Colegio registrado exitosamente. Redirigiendo al login...';
    successMessage.style.display = 'block';
    
    // Limpiar formulario
    registroForm.reset();
    
    // Redirigir al login después de 2 segundos
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});
