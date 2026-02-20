import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Verificar autenticación
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('userName').textContent = user.email.split('@')[0];
    
    // Determinar rol
    const isDirector = user.email.includes('director');
    document.getElementById('userRole').textContent = isDirector ? 'Director' : 'Docente';
    
    // Mostrar finanzas solo para director
    if (isDirector) {
        document.getElementById('navFinanzas').style.display = 'block';
    }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'index.html';
});

// Formulario de eventos
const eventoForm = document.getElementById('eventoForm');

eventoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Recopilar datos del formulario
    const eventoData = {
        dia: parseInt(document.getElementById('dia').value),
        mes: document.getElementById('mes').value,
        area: document.getElementById('area').value,
        accion: parseInt(document.getElementById('accion').value),
        n_eventos: parseInt(document.getElementById('n_eventos').value),
        exito_objetivo: parseInt(document.getElementById('exito_objetivo').value),
        meta: parseInt(document.getElementById('meta').value),
        exito_meta: parseInt(document.getElementById('exito_meta').value),
        docente: document.getElementById('docente').value,
        descripcion: document.getElementById('descripcion').value,
        timestamp: Date.now(),
        createdBy: auth.currentUser.email
    };
    
    try {
        // Guardar en Firestore
        const docRef = await addDoc(collection(db, 'eventos'), eventoData);
        console.log('✅ Evento guardado con ID:', docRef.id);
        
        // Mostrar mensaje de éxito
        alert('✅ Evento registrado exitosamente');
        
        // Limpiar formulario
        eventoForm.reset();
        
        // Opcional: redirigir al dashboard
        // window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('❌ Error guardando evento:', error);
        alert('❌ Error al guardar el evento. Verifica tu conexión a Firebase.');
    }
});
