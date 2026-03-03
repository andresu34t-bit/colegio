// chat-init-example.js - Ejemplo de cómo inicializar datos de usuario para el chat
// Este archivo es solo de referencia. Integra esta lógica en tu sistema de autenticación.

/**
 * IMPORTANTE: Este código debe ejecutarse después del login exitoso del usuario
 * Guarda los datos necesarios en localStorage para que el chat funcione correctamente
 */

// Ejemplo 1: Después de login con Firebase Authentication
async function onLoginSuccess(userCredential) {
    const user = userCredential.user;
    
    // Obtener datos adicionales del usuario desde Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();
    
    // Guardar en localStorage para el chat
    localStorage.setItem('userId', user.uid);
    localStorage.setItem('userName', userData.nombre || user.displayName);
    localStorage.setItem('userRole', userData.rol); // 'director', 'administrador', 'profesor'
    localStorage.setItem('schoolId', userData.colegioId);
    localStorage.setItem('userEmail', user.email);
    
    // Redirigir al dashboard
    window.location.href = 'dashboard.html';
}

// Ejemplo 2: Configuración manual para desarrollo/testing
function setupDemoUser() {
    localStorage.setItem('userId', 'demo-user-001');
    localStorage.setItem('userName', 'Juan Pérez');
    localStorage.setItem('userRole', 'profesor');
    localStorage.setItem('schoolId', 'colegio-demo');
    localStorage.setItem('userEmail', 'juan.perez@colegio.cl');
}

// Ejemplo 3: Limpiar datos al cerrar sesión
function onLogout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('schoolId');
    localStorage.removeItem('userEmail');
    
    window.location.href = 'index.html';
}

// Ejemplo 4: Verificar si el usuario está autenticado
function checkUserAuthentication() {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');
    const schoolId = localStorage.getItem('schoolId');
    
    if (!userId || !userName || !userRole || !schoolId) {
        console.warn('⚠️ Usuario no autenticado o datos incompletos');
        // Redirigir al login si es necesario
        // window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// Ejemplo 5: Obtener datos del usuario actual
function getCurrentUser() {
    return {
        userId: localStorage.getItem('userId'),
        userName: localStorage.getItem('userName'),
        userRole: localStorage.getItem('userRole'),
        schoolId: localStorage.getItem('schoolId'),
        userEmail: localStorage.getItem('userEmail')
    };
}

// Ejemplo 6: Actualizar nombre de usuario en la UI
function updateUserUI() {
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');
    
    const userNameElement = document.getElementById('userName');
    const userRoleElement = document.getElementById('userRole');
    
    if (userNameElement) {
        userNameElement.textContent = userName || 'Usuario';
    }
    
    if (userRoleElement) {
        const roleLabels = {
            'director': 'Director',
            'administrador': 'Administrador',
            'profesor': 'Profesor'
        };
        userRoleElement.textContent = roleLabels[userRole] || 'Usuario';
    }
}

// Ejemplo 7: Estructura de datos de usuario en Firestore
/*
users/{userId}
{
    nombre: "Juan Pérez",
    email: "juan.perez@colegio.cl",
    rol: "profesor", // 'director', 'administrador', 'profesor'
    colegioId: "colegio-demo",
    colegioNombre: "Colegio Demo",
    activo: true,
    fechaCreacion: timestamp,
    ultimoAcceso: timestamp
}
*/

// Ejemplo 8: Crear usuario en Firestore al registrarse
async function createUserInFirestore(userId, userData) {
    try {
        await setDoc(doc(db, 'users', userId), {
            nombre: userData.nombre,
            email: userData.email,
            rol: userData.rol,
            colegioId: userData.colegioId,
            colegioNombre: userData.colegioNombre,
            activo: true,
            fechaCreacion: serverTimestamp(),
            ultimoAcceso: serverTimestamp()
        });
        
        console.log('✅ Usuario creado en Firestore');
    } catch (error) {
        console.error('❌ Error al crear usuario:', error);
    }
}

// Ejemplo 9: Actualizar último acceso
async function updateLastAccess(userId) {
    try {
        await updateDoc(doc(db, 'users', userId), {
            ultimoAcceso: serverTimestamp()
        });
    } catch (error) {
        console.error('❌ Error al actualizar último acceso:', error);
    }
}

// Ejemplo 10: Integración completa en auth.js
/*
import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase-auth';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase-firestore';

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        // Login con Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Obtener datos del usuario desde Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
            throw new Error('Usuario no encontrado en la base de datos');
        }
        
        const userData = userDoc.data();
        
        // Guardar datos en localStorage para el chat
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userName', userData.nombre);
        localStorage.setItem('userRole', userData.rol);
        localStorage.setItem('schoolId', userData.colegioId);
        localStorage.setItem('userEmail', user.email);
        
        // Actualizar último acceso
        await updateDoc(doc(db, 'users', user.uid), {
            ultimoAcceso: serverTimestamp()
        });
        
        console.log('✅ Login exitoso');
        
        // Redirigir según rol
        if (userData.rol === 'director' || userData.rol === 'administrador') {
            window.location.href = 'admin-global.html';
        } else {
            window.location.href = 'dashboard.html';
        }
        
    } catch (error) {
        console.error('❌ Error de login:', error);
        alert('Error al iniciar sesión: ' + error.message);
    }
});
*/

// NOTAS IMPORTANTES:
// 1. Los roles válidos son: 'director', 'administrador', 'profesor'
// 2. El schoolId debe ser el mismo para todos los usuarios del mismo colegio
// 3. Todos los datos deben estar presentes para que el chat funcione correctamente
// 4. El chat se inicializa automáticamente cuando detecta estos datos en localStorage
