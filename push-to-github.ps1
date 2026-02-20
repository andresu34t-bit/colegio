# Script para subir a GitHub con autenticación

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SUBIR EDUGEST PME A GITHUB" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar estado de Git
Write-Host "1. Verificando estado de Git..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "2. Verificando remote..." -ForegroundColor Yellow
git remote -v

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  IMPORTANTE: AUTENTICACIÓN" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Cuando ejecutes 'git push', te pedirá:" -ForegroundColor White
Write-Host "  Username: andresu34t-bit" -ForegroundColor Cyan
Write-Host "  Password: TU_TOKEN_DE_GITHUB" -ForegroundColor Cyan
Write-Host ""
Write-Host "Si no tienes un token:" -ForegroundColor Yellow
Write-Host "  1. Ve a: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "  2. Generate new token (classic)" -ForegroundColor White
Write-Host "  3. Marca: repo" -ForegroundColor White
Write-Host "  4. Copia el token (empieza con ghp_)" -ForegroundColor White
Write-Host ""

# Preguntar si quiere continuar
$continuar = Read-Host "¿Quieres hacer push ahora? (s/n)"

if ($continuar -eq "s" -or $continuar -eq "S") {
    Write-Host ""
    Write-Host "3. Haciendo push a GitHub..." -ForegroundColor Yellow
    Write-Host ""
    
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  ¡ÉXITO! Archivos subidos a GitHub" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Verifica en: https://github.com/andresu34t-bit/colegio" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Siguiente paso: Desplegar en Render" -ForegroundColor Yellow
        Write-Host "  1. Ve a: https://render.com" -ForegroundColor White
        Write-Host "  2. New + → Static Site" -ForegroundColor White
        Write-Host "  3. Conecta: andresu34t-bit/colegio" -ForegroundColor White
        Write-Host "  4. Publish directory: ." -ForegroundColor White
        Write-Host "  5. Create Static Site" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Red
        Write-Host "  ERROR AL HACER PUSH" -ForegroundColor Red
        Write-Host "========================================" -ForegroundColor Red
        Write-Host ""
        Write-Host "Posibles soluciones:" -ForegroundColor Yellow
        Write-Host "  1. Verifica que el repositorio existe en GitHub" -ForegroundColor White
        Write-Host "  2. Usa tu token como contraseña (no tu contraseña de GitHub)" -ForegroundColor White
        Write-Host "  3. Verifica que el token tenga permisos 'repo'" -ForegroundColor White
        Write-Host ""
        Write-Host "O usa GitHub Desktop:" -ForegroundColor Cyan
        Write-Host "  https://desktop.github.com/" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "Push cancelado. Cuando estés listo, ejecuta:" -ForegroundColor Yellow
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Presiona Enter para salir..."
Read-Host
