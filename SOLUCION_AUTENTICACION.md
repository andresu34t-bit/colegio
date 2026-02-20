# 🔐 Solución: Error de Autenticación

## Problema Detectado
Estás autenticado como `Andres3r` pero el repositorio es de `andresu34t-bit`.

## ✅ Solución Rápida: Usar Token en la URL

### Paso 1: Crear Personal Access Token
1. Ve a: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. **Note**: `EduGest Deploy`
4. **Expiration**: 90 days
5. **Select scopes**: Marca ☑️ `repo`
6. Click "Generate token"
7. **COPIA EL TOKEN** (empieza con `ghp_`)

### Paso 2: Actualizar el Remote con el Token
Ejecuta en PowerShell (reemplaza `TU_TOKEN` con tu token real):

```powershell
# Remover el remote actual
git remote remove origin

# Agregar con token en la URL
git remote add origin https://TU_TOKEN@github.com/andresu34t-bit/colegio.git

# Hacer push
git push -u origin main
```

**Ejemplo:**
```powershell
git remote remove origin
git remote add origin https://ghp_xxxxxxxxxxxxxxxxxxxx@github.com/andresu34t-bit/colegio.git
git push -u origin main
```

## 🎯 Alternativa: Limpiar Credenciales de Windows

### Opción A: Credential Manager
1. Presiona `Win + R`
2. Escribe: `control /name Microsoft.CredentialManager`
3. Click en "Windows Credentials"
4. Busca entradas de `git:https://github.com`
5. Elimínalas todas
6. Intenta `git push` de nuevo

### Opción B: Comando Git
```powershell
# Limpiar credenciales guardadas
git credential-manager-core erase https://github.com

# O usar este comando
cmdkey /delete:git:https://github.com

# Intentar push de nuevo
git push -u origin main
```

## 🖥️ Alternativa: GitHub Desktop (Más Fácil)

1. **Descargar**: https://desktop.github.com/
2. **Instalar** y abrir GitHub Desktop
3. **Sign in** con la cuenta `andresu34t-bit`
4. **File** → **Add Local Repository**
5. Selecciona: `C:\Users\johan\OneDrive\Escritorio\COLEGIOS`
6. Click en **"Publish repository"**
7. Nombre: `colegio`
8. Click en **"Publish repository"**

¡Listo! GitHub Desktop maneja la autenticación automáticamente.

## 🔄 Verificar Usuario Actual de Git

```powershell
# Ver configuración actual
git config --list | Select-String "user"

# Cambiar usuario si es necesario
git config --global user.name "andresu34t-bit"
git config --global user.email "tu_email@ejemplo.com"
```

## 📝 Comandos Completos (Copia y Pega)

```powershell
# 1. Limpiar credenciales
cmdkey /delete:git:https://github.com

# 2. Remover remote actual
git remote remove origin

# 3. Agregar remote con token (REEMPLAZA TU_TOKEN)
git remote add origin https://TU_TOKEN@github.com/andresu34t-bit/colegio.git

# 4. Hacer push
git push -u origin main
```

## ⚠️ Importante

- **NO compartas tu token** con nadie
- **NO subas el token** a GitHub
- El token es como una contraseña temporal
- Si lo pierdes, genera uno nuevo

## ✅ Verificación Final

Después de hacer push exitosamente:
1. Ve a: https://github.com/andresu34t-bit/colegio
2. Deberías ver todos tus archivos
3. Verifica el commit en "Commits"

## 🚀 Siguiente Paso: Render

Una vez que los archivos estén en GitHub:

1. Ve a: https://render.com
2. Sign up con GitHub (usa la cuenta `andresu34t-bit`)
3. New + → Static Site
4. Conecta el repositorio `colegio`
5. **Publish directory**: `.` (punto)
6. Click "Create Static Site"

Tu sitio estará en: `https://colegio.onrender.com`

---

## 🆘 Si Nada Funciona

Usa **GitHub Desktop** - es la forma más fácil y confiable:
https://desktop.github.com/
