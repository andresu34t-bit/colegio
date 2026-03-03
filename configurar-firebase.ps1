# Script de Configuración de Firebase para EDUGEST Chat
# PowerShell Script para Windows

Write-Host ""
Write-Host "🔥 Configurador de Firebase para EDUGEST Chat" -ForegroundColor Cyan
Write-Host ""
Write-Host "Este script te ayudará a configurar Firebase paso a paso." -ForegroundColor White
Write-Host ""

# Verificar si Node.js está instalado
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Node.js detectado: $nodeVersion" -ForegroundColor Green
    Write-Host ""
    Write-Host "Ejecutando script de configuración..." -ForegroundColor Yellow
    Write-Host ""
    node configurar-firebase.js
} else {
    Write-Host "⚠️  Node.js no está instalado" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Configuración manual:" -ForegroundColor Cyan
    Write-Host ""
    
    # Recopilar credenciales manualmente
    Write-Host "📝 Ingresa las credenciales de Firebase:" -ForegroundColor White
    Write-Host ""
    
    $apiKey = Read-Host "API Key (ej: AIzaSyC...)"
    $authDomain = Read-Host "Auth Domain (ej: edugest-pme.firebaseapp.com)"
    $projectId = Read-Host "Project ID (ej: edugest-pme)"
    $storageBucket = Read-Host "Storage Bucket (ej: edugest-pme.appspot.com)"
    $messagingSenderId = Read-Host "Messaging Sender ID (ej: 123456789012)"
    $appId = Read-Host "App ID (ej: 1:123456789012:web:abc...)"
    $databaseURL = Read-Host "Database URL (ej: https://edugest-pme-default-rtdb.firebaseio.com)"
    
    Write-Host ""
    Write-Host "📋 Resumen de configuración:" -ForegroundColor Cyan
    Write-Host "─────────────────────────────────────" -ForegroundColor Gray
    Write-Host "apiKey: $($apiKey.Substring(0, [Math]::Min(10, $apiKey.Length)))..." -ForegroundColor White
    Write-Host "authDomain: $authDomain" -ForegroundColor White
    Write-Host "projectId: $projectId" -ForegroundColor White
    Write-Host "storageBucket: $storageBucket" -ForegroundColor White
    Write-Host "messagingSenderId: $messagingSenderId" -ForegroundColor White
    Write-Host "appId: $($appId.Substring(0, [Math]::Min(20, $appId.Length)))..." -ForegroundColor White
    Write-Host "databaseURL: $databaseURL" -ForegroundColor White
    Write-Host "─────────────────────────────────────" -ForegroundColor Gray
    Write-Host ""
    
    $confirmar = Read-Host "¿Deseas guardar esta configuración? (S/N)"
    
    if ($confirmar -eq "S" -or $confirmar -eq "s") {
        # Crear backup
        $configPath = "js\firebase-config.js"
        if (Test-Path $configPath) {
            Copy-Item $configPath "js\firebase-config.backup.js"
            Write-Host "💾 Backup creado: js\firebase-config.backup.js" -ForegroundColor Green
        }
        
        # Generar nuevo contenido
        $nuevoContenido = @"
// Configuración de Firebase
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto Firebase

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
    apiKey: "$apiKey",
    authDomain: "$authDomain",
    projectId: "$projectId",
    storageBucket: "$storageBucket",
    messagingSenderId: "$messagingSenderId",
    appId: "$appId",
    databaseURL: "$databaseURL"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);

console.log('✅ Firebase inicializado');
"@
        
        # Guardar archivo
        Set-Content -Path $configPath -Value $nuevoContenido -Encoding UTF8
        Write-Host "✅ Configuración guardada en: js\firebase-config.js" -ForegroundColor Green
        Write-Host ""
        
        # Guardar credenciales en archivo de texto
        $credencialesTexto = @"
# Credenciales de Firebase - EDUGEST
# Generado: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
# IMPORTANTE: No compartir este archivo públicamente

apiKey: $apiKey
authDomain: $authDomain
projectId: $projectId
storageBucket: $storageBucket
messagingSenderId: $messagingSenderId
appId: $appId
databaseURL: $databaseURL
"@
        
        Set-Content -Path "firebase-credentials.txt" -Value $credencialesTexto -Encoding UTF8
        Write-Host "📄 Credenciales guardadas en: firebase-credentials.txt" -ForegroundColor Green
        Write-Host "⚠️  IMPORTANTE: Agrega este archivo a .gitignore" -ForegroundColor Yellow
        Write-Host ""
        
        Write-Host "🎉 ¡Configuración completada!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
        Write-Host "   1. Abre test-chat.html en tu navegador" -ForegroundColor White
        Write-Host "   2. Configura dos usuarios con el mismo colegio" -ForegroundColor White
        Write-Host "   3. ¡Prueba el chat en tiempo real!" -ForegroundColor White
        Write-Host ""
        Write-Host "📚 Documentación: GUIA-FIREBASE-CHAT.md" -ForegroundColor Cyan
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "❌ Configuración cancelada." -ForegroundColor Red
        Write-Host ""
    }
}

Write-Host ""
Write-Host "Presiona cualquier tecla para salir..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
