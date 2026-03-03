/**
 * SISTEMA MULTI-COLEGIO
 * Gestión de múltiples colegios con datos completamente separados
 */

// ============================================
// FUNCIONES DE GESTIÓN DE COLEGIOS
// ============================================

/**
 * Obtener todos los colegios registrados
 */
function obtenerColegios() {
    const colegios = localStorage.getItem('colegios');
    return colegios ? JSON.parse(colegios) : [];
}

/**
 * Obtener un colegio específico por ID
 */
function obtenerColegio(colegioId) {
    const colegios = obtenerColegios();
    return colegios.find(c => c.id === colegioId);
}

/**
 * Obtener el colegio actual seleccionado
 */
function obtenerColegioActual() {
    const colegioId = localStorage.getItem('colegioActual');
    if (!colegioId) return null;
    return obtenerColegio(colegioId);
}

/**
 * Registrar un nuevo colegio
 */
function registrarColegio(colegio, director) {
    try {
        // Obtener colegios existentes
        const colegios = obtenerColegios();
        
        // Verificar que no exista un colegio con el mismo nombre
        if (colegios.some(c => c.nombre.toLowerCase() === colegio.nombre.toLowerCase())) {
            alert('Ya existe un colegio con ese nombre');
            return false;
        }
        
        // Agregar nuevo colegio
        colegios.push(colegio);
        localStorage.setItem('colegios', JSON.stringify(colegios));
        
        // Registrar usuario director
        const usuarios = obtenerUsuariosPorColegio(colegio.id);
        usuarios.push(director);
        guardarUsuariosPorColegio(colegio.id, usuarios);
        
        // Inicializar datos del colegio
        inicializarDatosColegio(colegio.id);
        
        return true;
    } catch (error) {
        console.error('Error al registrar colegio:', error);
        return false;
    }
}

/**
 * Inicializar estructura de datos para un nuevo colegio
 */
function inicializarDatosColegio(colegioId) {
    const prefijo = `colegio_${colegioId}_`;
    
    // Inicializar arrays vacíos para cada tipo de dato
    localStorage.setItem(prefijo + 'eventos', JSON.stringify([]));
    localStorage.setItem(prefijo + 'informacionesGenerales', JSON.stringify([]));
    localStorage.setItem(prefijo + 'informes', JSON.stringify([]));
    localStorage.setItem(prefijo + 'finanzas', JSON.stringify([]));
    localStorage.setItem(prefijo + 'observaciones', JSON.stringify([]));
}

// ============================================
// FUNCIONES DE GESTIÓN DE USUARIOS
// ============================================

/**
 * Obtener usuarios de un colegio específico
 */
function obtenerUsuariosPorColegio(colegioId) {
    const key = `colegio_${colegioId}_usuarios`;
    const usuarios = localStorage.getItem(key);
    return usuarios ? JSON.parse(usuarios) : [];
}

/**
 * Guardar usuarios de un colegio específico
 */
function guardarUsuariosPorColegio(colegioId, usuarios) {
    const key = `colegio_${colegioId}_usuarios`;
    localStorage.setItem(key, JSON.stringify(usuarios));
}

/**
 * Autenticar usuario en un colegio específico
 */
function autenticarUsuario(colegioId, email, password) {
    const usuarios = obtenerUsuariosPorColegio(colegioId);
    return usuarios.find(u => u.email === email && u.password === password);
}

/**
 * Registrar nuevo usuario en un colegio
 */
function registrarUsuario(colegioId, usuario) {
    const usuarios = obtenerUsuariosPorColegio(colegioId);
    
    // Verificar que no exista el email
    if (usuarios.some(u => u.email === usuario.email)) {
        return false;
    }
    
    usuario.id = 'user_' + Date.now();
    usuario.colegioId = colegioId;
    usuario.fechaCreacion = new Date().toISOString();
    
    usuarios.push(usuario);
    guardarUsuariosPorColegio(colegioId, usuarios);
    
    // Actualizar contador de usuarios del colegio
    actualizarContadorUsuarios(colegioId);
    
    return true;
}

/**
 * Actualizar contador de usuarios de un colegio
 */
function actualizarContadorUsuarios(colegioId) {
    const colegios = obtenerColegios();
    const colegio = colegios.find(c => c.id === colegioId);
    
    if (colegio) {
        const usuarios = obtenerUsuariosPorColegio(colegioId);
        colegio.usuarios = usuarios.length;
        localStorage.setItem('colegios', JSON.stringify(colegios));
    }
}

// ============================================
// FUNCIONES DE DATOS POR COLEGIO
// ============================================

/**
 * Obtener datos de un tipo específico para el colegio actual
 */
function obtenerDatosColegio(tipo) {
    const colegioId = localStorage.getItem('colegioActual');
    if (!colegioId) return [];
    
    const key = `colegio_${colegioId}_${tipo}`;
    const datos = localStorage.getItem(key);
    return datos ? JSON.parse(datos) : [];
}

/**
 * Guardar datos de un tipo específico para el colegio actual
 */
function guardarDatosColegio(tipo, datos) {
    const colegioId = localStorage.getItem('colegioActual');
    if (!colegioId) return false;
    
    const key = `colegio_${colegioId}_${tipo}`;
    localStorage.setItem(key, JSON.stringify(datos));
    return true;
}

/**
 * Agregar un dato al colegio actual
 */
function agregarDatoColegio(tipo, dato) {
    const datos = obtenerDatosColegio(tipo);
    dato.id = Date.now();
    dato.colegioId = localStorage.getItem('colegioActual');
    dato.fechaCreacion = new Date().toISOString();
    datos.push(dato);
    return guardarDatosColegio(tipo, datos);
}

/**
 * Actualizar un dato del colegio actual
 */
function actualizarDatoColegio(tipo, id, datoActualizado) {
    const datos = obtenerDatosColegio(tipo);
    const index = datos.findIndex(d => d.id === id);
    
    if (index !== -1) {
        datos[index] = { ...datos[index], ...datoActualizado };
        return guardarDatosColegio(tipo, datos);
    }
    
    return false;
}

/**
 * Eliminar un dato del colegio actual
 */
function eliminarDatoColegio(tipo, id) {
    const datos = obtenerDatosColegio(tipo);
    const datosFiltrados = datos.filter(d => d.id !== id);
    return guardarDatosColegio(tipo, datosFiltrados);
}

// ============================================
// FUNCIONES DE MIGRACIÓN DE DATOS
// ============================================

/**
 * Migrar datos existentes al sistema multi-colegio
 * Esta función se ejecuta automáticamente si detecta datos antiguos
 */
function migrarDatosExistentes() {
    // Verificar si ya hay colegios registrados
    const colegios = obtenerColegios();
    if (colegios.length > 0) return; // Ya hay colegios, no migrar
    
    // Verificar si hay datos antiguos
    const eventosAntiguos = localStorage.getItem('eventos');
    const usuariosAntiguos = localStorage.getItem('usuarios');
    
    if (!eventosAntiguos && !usuariosAntiguos) return; // No hay datos antiguos
    
    // Crear colegio por defecto
    const colegioDefault = {
        id: 'colegio_default',
        nombre: 'Mi Colegio',
        rbd: '',
        direccion: '',
        comuna: '',
        region: '',
        telefono: '',
        email: '',
        fechaCreacion: new Date().toISOString(),
        usuarios: 0
    };
    
    // Registrar colegio default
    const colegiosArray = [colegioDefault];
    localStorage.setItem('colegios', JSON.stringify(colegiosArray));
    
    // Migrar usuarios
    if (usuariosAntiguos) {
        const usuarios = JSON.parse(usuariosAntiguos);
        usuarios.forEach(u => {
            u.colegioId = colegioDefault.id;
        });
        guardarUsuariosPorColegio(colegioDefault.id, usuarios);
        colegioDefault.usuarios = usuarios.length;
    }
    
    // Migrar eventos
    if (eventosAntiguos) {
        const eventos = JSON.parse(eventosAntiguos);
        localStorage.setItem(`colegio_${colegioDefault.id}_eventos`, eventosAntiguos);
    }
    
    // Migrar informaciones generales
    const infosAntiguos = localStorage.getItem('informacionesGenerales');
    if (infosAntiguos) {
        localStorage.setItem(`colegio_${colegioDefault.id}_informacionesGenerales`, infosAntiguos);
    }
    
    // Migrar otros datos
    const tiposDatos = ['informes', 'finanzas', 'observaciones'];
    tiposDatos.forEach(tipo => {
        const datosAntiguos = localStorage.getItem(tipo);
        if (datosAntiguos) {
            localStorage.setItem(`colegio_${colegioDefault.id}_${tipo}`, datosAntiguos);
        }
    });
    
    // Actualizar colegios con contador de usuarios
    localStorage.setItem('colegios', JSON.stringify(colegiosArray));
    
    console.log('✅ Datos migrados al sistema multi-colegio');
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

/**
 * Verificar si hay un colegio seleccionado
 */
function verificarColegioSeleccionado() {
    const colegioId = localStorage.getItem('colegioActual');
    if (!colegioId) {
        window.location.href = 'seleccionar-colegio.html';
        return false;
    }
    return true;
}

/**
 * Obtener nombre del colegio actual
 */
function obtenerNombreColegioActual() {
    const colegio = obtenerColegioActual();
    return colegio ? colegio.nombre : 'Colegio';
}

/**
 * Cambiar de colegio
 */
function cambiarColegio() {
    // Limpiar sesión actual
    const keysToKeep = ['colegios']; // Mantener lista de colegios
    const colegios = localStorage.getItem('colegios');
    
    // Limpiar solo datos de sesión
    localStorage.removeItem('colegioActual');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    // Redirigir a selección de colegios
    window.location.href = 'seleccionar-colegio.html';
}

/**
 * Obtener estadísticas del colegio actual
 */
function obtenerEstadisticasColegio() {
    const colegioId = localStorage.getItem('colegioActual');
    if (!colegioId) return null;
    
    return {
        eventos: obtenerDatosColegio('eventos').length,
        informacionesGenerales: obtenerDatosColegio('informacionesGenerales').length,
        usuarios: obtenerUsuariosPorColegio(colegioId).length,
        informes: obtenerDatosColegio('informes').length,
        observaciones: obtenerDatosColegio('observaciones').length
    };
}

// ============================================
// INICIALIZACIÓN
// ============================================

// Ejecutar migración automática al cargar el script
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        migrarDatosExistentes();
    });
}

// Exportar funciones para uso global
if (typeof window !== 'undefined') {
    window.multiColegio = {
        obtenerColegios,
        obtenerColegio,
        obtenerColegioActual,
        registrarColegio,
        obtenerUsuariosPorColegio,
        autenticarUsuario,
        registrarUsuario,
        obtenerDatosColegio,
        guardarDatosColegio,
        agregarDatoColegio,
        actualizarDatoColegio,
        eliminarDatoColegio,
        verificarColegioSeleccionado,
        obtenerNombreColegioActual,
        cambiarColegio,
        obtenerEstadisticasColegio
    };
}
