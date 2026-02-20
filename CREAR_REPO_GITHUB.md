# 🎯 Crear Repositorio en GitHub - Paso a Paso

## Opción 1: Crear desde la Web (Más Fácil)

### Paso 1: Ir a GitHub
1. Abre tu navegador
2. Ve a: https://github.com/new
3. O desde tu perfil: Click en "+" → "New repository"

### Paso 2: Configurar el Repositorio
- **Owner**: `andresu34t-bit` (tu usuario)
- **Repository name**: `colegio`
- **Description** (opcional): "Sistema EduGest PME - Gestión de Colegios"
- **Visibilidad**: 
  - ☑️ Public (cualquiera puede ver)
  - ☐ Private (solo tú puedes ver)
- **NO marques ninguna de estas opciones**:
  - ☐ Add a README file
  - ☐ Add .gitignore
  - ☐ Choose a license

### Paso 3: Crear
- Click en **"Create repository"**

### Paso 4: Verás una página con instrucciones
GitHub te mostrará comandos, pero ya los tenemos configurados.

## Opción 2: Crear desde la Terminal

Si prefieres usar comandos:

```bash
# Instalar GitHub CLI (si no lo tienes)
winget install --id GitHub.cli

# Reiniciar PowerShell y autenticarte
gh auth login

# Crear el repositorio
gh repo create andresu34t-bit/colegio --public --source=. --remote=origin --push
```

## 🔐 Después de Crear el Repositorio

### Si usaste la Opción 1 (Web):

Ejecuta en PowerShell:

```powershell
# Verificar configuración
git remote -v

# Subir los archivos
git push -u origin main
```

Te pedirá:
- **Username**: `andresu34t-bit`
- **Password**: Tu Personal Access Token (NO tu contraseña)

### Crear Personal Access Token:

1. Ve a: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. **Note**: `EduGest Deploy`
4. **Expiration**: 90 days
5. **Select scopes**: Marca ☑️ `repo`
6. Click "Generate token"
7. **COPIA EL TOKEN** (empieza con `ghp_`)

## ✅ Verificar que Funcionó

Después de hacer push:
1. Ve a: https://github.com/andresu34t-bit/colegio
2. Deberías ver todos tus archivos
3. Verifica el commit en "Commits"

## 🆘 Solución de Problemas

### Error: "Repository not found"
- El repositorio no existe → Créalo en GitHub
- No tienes acceso → Verifica que seas el dueño

### Error: "Permission denied"
- Necesitas autenticarte con un token
- Ve a: https://github.com/settings/tokens

### Error: "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/andresu34t-bit/colegio.git
```

## 📱 Alternativa: GitHub Desktop

Si prefieres una interfaz gráfica:

1. Descarga: https://desktop.github.com/
2. Instala y abre GitHub Desktop
3. Sign in con tu cuenta
4. File → Add Local Repository
5. Selecciona: `C:\Users\johan\OneDrive\Escritorio\COLEGIOS`
6. Click "Publish repository"
7. Nombre: `colegio`
8. Click "Publish repository"

¡Listo! Mucho más fácil con interfaz gráfica.

---

## 🎉 Siguiente Paso: Render

Una vez que los archivos estén en GitHub:

1. Ve a: https://render.com
2. Sign up con GitHub
3. New + → Static Site
4. Conecta el repositorio `colegio`
5. Publish directory: `.`
6. Click "Create Static Site"

Tu sitio estará en: `https://colegio.onrender.com`
