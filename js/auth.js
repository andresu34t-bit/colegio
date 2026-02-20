import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('✅ Login exitoso:', userCredential.user);
        
        // Guardar datos del usuario en localStorage
        localStorage.setItem('userEmail', email);
        
        // Redirigir al dashboard
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('❌ Error de login:', error);
        errorMessage.textContent = 'Email o contraseña incorrectos';
        errorMessage.style.display = 'block';
    }
});
