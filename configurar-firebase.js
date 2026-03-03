#!/usr/bin/env node

/**
 * Script de Configuración Automática de Firebase
 * 
 * Este script te ayuda a configurar las credenciales de Firebase
 * de forma interactiva y segura.
 * 
 * Uso:
 *   node configurar-firebase.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\n🔥 Configurador de Firebase para EDUGEST Chat\n');
console.log('Este script te ayudará a configurar Firebase paso a paso.\n');

const preguntas = [
    {
        key: 'apiKey',
        pregunta: '📝 API Key (ej: AIzaSyC...): ',
        placeholder: 'TU_API_KEY'
    },
    {
        key: 'authDomain',
        pregunta: '🌐 Auth Domain (ej: edugest-pme.firebaseapp.com): ',
        placeholder: 'TU_AUTH_DOMAIN'
    },
    {
        key: 'projectId',
        pregunta: '📦 Project ID (ej: edugest-pme): ',
        placeholder: 'edugest-pme',
        default: 'edugest-pme'
    },
    {
        key: 'storageBucket',
        pregunta: '💾 Storage Bucket (ej: edugest-pme.appspot.com): ',
        placeholder: 'TU_STORAGE_BUCKET'
    },
    {
        key: 'messagingSenderId',
        pregunta: '📬 Messaging Sender ID (ej: 123456789012): ',
        placeholder: 'TU_MESSAGING_SENDER_ID'
    },
    {
        key: 'appId',
        pregunta: '🆔 App ID (ej: 1:123456789012:web:abc...): ',
        placeholder: 'TU_APP_ID'
    },
    {
        key: 'databaseURL',
        pregunta: '🔗 Database URL (ej: https://edugest-pme-default-rtdb.firebaseio.com): ',
        placeholder: 'https://edugest-pme-default-rtdb.firebaseio.com'
    }
];

const credenciales = {};

function hacerPregunta(index) {
    if (index >= preguntas.length) {
        finalizarConfiguracion();
        return;
    }

    const pregunta = preguntas[index];
    const defaultText = pregunta.default ? ` [${pregunta.default}]` : '';
    
    rl.question(`${pregunta.pregunta}${defaultText}`, (respuesta) => {
        respuesta = respuesta.trim();
        
        if (!respuesta && pregunta.default) {
            respuesta = pregunta.default;
        }
        
        if (!respuesta) {
            console.log('⚠️  Este campo es requerido. Intenta nuevamente.');
            hacerPregunta(index);
            return;
        }
        
        credenciales[pregunta.key] = respuesta;
        hacerPregunta(index + 1);
    });
}

function finalizarConfiguracion() {
    console.log('\n✅ Credenciales recopiladas correctamente.\n');
    console.log('📋 Resumen de configuración:');
    console.log('─────────────────────────────────────');
    
    Object.keys(credenciales).forEach(key => {
        const valor = credenciales[key];
        const valorMostrar = key === 'apiKey' ? valor.substring(0, 10) + '...' : valor;
        console.log(`${key}: ${valorMostrar}`);
    });
    
    console.log('─────────────────────────────────────\n');
    
    rl.question('¿Deseas guardar esta configuración? (s/n): ', (respuesta) => {
        if (respuesta.toLowerCase() === 's' || respuesta.toLowerCase() === 'si') {
            guardarConfiguracion();
        } else {
            console.log('\n❌ Configuración cancelada.');
            rl.close();
        }
    });
}

function guardarConfiguracion() {
    const configPath = path.join(__dirname, 'js', 'firebase-config.js');
    
    // Crear backup del archivo original
    if (fs.existsSync(configPath)) {
        const backupPath = path.join(__dirname, 'js', 'firebase-config.backup.js');
        fs.copyFileSync(configPath, backupPath);
        console.log('\n💾 Backup creado: js/firebase-config.backup.js');
    }
    
    // Generar nuevo contenido
    const nuevoContenido = `// Configuración de Firebase
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto Firebase

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
    apiKey: "${credenciales.apiKey}",
    authDomain: "${credenciales.authDomain}",
    projectId: "${credenciales.projectId}",
    storageBucket: "${credenciales.storageBucket}",
    messagingSenderId: "${credenciales.messagingSenderId}",
    appId: "${credenciales.appId}",
    databaseURL: "${credenciales.databaseURL}"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);

console.log('✅ Firebase inicializado');
`;
    
    // Guardar archivo
    fs.writeFileSync(configPath, nuevoContenido, 'utf8');
    
    console.log('✅ Configuración guardada en: js/firebase-config.js\n');
    
    // Guardar también en archivo de texto para referencia
    const credencialesPath = path.join(__dirname, 'firebase-credentials.txt');
    const credencialesTexto = `# Credenciales de Firebase - EDUGEST
# Generado: ${new Date().toLocaleString()}
# IMPORTANTE: No compartir este archivo públicamente

apiKey: ${credenciales.apiKey}
authDomain: ${credenciales.authDomain}
projectId: ${credenciales.projectId}
storageBucket: ${credenciales.storageBucket}
messagingSenderId: ${credenciales.messagingSenderId}
appId: ${credenciales.appId}
databaseURL: ${credenciales.databaseURL}
`;
    
    fs.writeFileSync(credencialesPath, credencialesTexto, 'utf8');
    console.log('📄 Credenciales guardadas en: firebase-credentials.txt');
    console.log('⚠️  IMPORTANTE: Agrega este archivo a .gitignore\n');
    
    // Actualizar .gitignore
    actualizarGitignore();
    
    console.log('🎉 ¡Configuración completada!\n');
    console.log('📝 Próximos pasos:');
    console.log('   1. Abre test-chat.html en tu navegador');
    console.log('   2. Configura dos usuarios con el mismo colegio');
    console.log('   3. ¡Prueba el chat en tiempo real!\n');
    console.log('📚 Documentación: GUIA-FIREBASE-CHAT.md\n');
    
    rl.close();
}

function actualizarGitignore() {
    const gitignorePath = path.join(__dirname, '.gitignore');
    
    const lineasAgregar = [
        '',
        '# Firebase credentials',
        'firebase-credentials.txt',
        'js/firebase-config.backup.js',
        '.firebase/',
        'firebase-debug.log'
    ];
    
    let contenidoActual = '';
    if (fs.existsSync(gitignorePath)) {
        contenidoActual = fs.readFileSync(gitignorePath, 'utf8');
    }
    
    // Verificar si ya existen las líneas
    if (!contenidoActual.includes('firebase-credentials.txt')) {
        const nuevoContenido = contenidoActual + '\n' + lineasAgregar.join('\n') + '\n';
        fs.writeFileSync(gitignorePath, nuevoContenido, 'utf8');
        console.log('✅ .gitignore actualizado');
    }
}

// Iniciar el proceso
console.log('📖 Antes de comenzar, asegúrate de tener:');
console.log('   1. Un proyecto Firebase creado');
console.log('   2. Realtime Database habilitado');
console.log('   3. Las credenciales de tu proyecto\n');
console.log('💡 Si no tienes esto, consulta: GUIA-FIREBASE-CHAT.md\n');

rl.question('¿Estás listo para continuar? (s/n): ', (respuesta) => {
    if (respuesta.toLowerCase() === 's' || respuesta.toLowerCase() === 'si') {
        console.log('\n🚀 ¡Comencemos!\n');
        hacerPregunta(0);
    } else {
        console.log('\n📚 Consulta GUIA-FIREBASE-CHAT.md para más información.');
        rl.close();
    }
});
