# 🚀 Instrucciones de Despliegue

## Paso 1: Subir a GitHub

### 1.1 Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre del repositorio: `edugest-pme` (o el que prefieras)
3. Descripción: "Sistema de Gestión PME para Colegios"
4. Selecciona: **Público** o **Privado**
5. NO marques "Initialize with README" (ya tenemos archivos)
6. Click en "Create repository"

### 1.2 Conectar y subir
Copia la URL de tu repositorio y ejecuta estos comandos:

```bash
# Conectar con tu repositorio (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/edugest-pme.git

# Cambiar a rama main (si es necesario)
git branch -M main

# Subir los archivos
git push -u origin main
```

## Paso 2: Desplegar en Render

### 2.1 Crear cuenta en Render
1. Ve a https://render.com
2. Regístrate con tu cuenta de GitHub
3. Autoriza a Render para acceder a tus repositorios

### 2.2 Crear nuevo Static Site
1. Click en "New +" → "Static Site"
2. Conecta tu repositorio de GitHub
3. Selecciona el repositorio `edugest-pme`

### 2.3 Configuración del Static Site

**Configuración básica:**
- **Name**: `edugest-pme` (o el nombre que prefieras)
- **Branch**: `main`
- **Root Directory**: (dejar vacío)
- **Build Command**: (dejar vacío - no necesitamos build)
- **Publish Directory**: `.` (punto - directorio raíz)

**Configuración avanzada (opcional):**
- **Auto-Deploy**: Yes (para despliegue automático con cada push)

### 2.4 Variables de Entorno (si usas Firebase)
Si estás usando Firebase, agrega estas variables en "Environment":

```
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_STORAGE_BUCKET=tu_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id
```

### 2.5 Desplegar
1. Click en "Create Static Site"
2. Render comenzará a desplegar tu sitio
3. Espera 2-3 minutos
4. Tu sitio estará disponible en: `https://edugest-pme.onrender.com`

## Paso 3: Configurar Dominio Personalizado (Opcional)

### 3.1 En Render
1. Ve a tu Static Site en Render
2. Click en "Settings" → "Custom Domain"
3. Agrega tu dominio: `tudominio.com`
4. Render te dará registros DNS para configurar

### 3.2 En tu proveedor de dominio
Agrega estos registros DNS:
- **Tipo**: CNAME
- **Name**: www (o @)
- **Value**: el valor que te dio Render

## Paso 4: Actualizaciones Futuras

Cada vez que hagas cambios:

```bash
# Ver archivos modificados
git status

# Agregar todos los cambios
git add .

# Hacer commit con mensaje descriptivo
git commit -m "Descripción de los cambios"

# Subir a GitHub
git push

# Render desplegará automáticamente los cambios
```

## 🔥 Comandos Rápidos

```bash
# Estado del repositorio
git status

# Agregar todos los cambios
git add .

# Commit
git commit -m "Mensaje descriptivo"

# Push a GitHub
git push

# Ver historial
git log --oneline

# Ver ramas
git branch

# Crear nueva rama
git checkout -b nombre-rama

# Cambiar de rama
git checkout main
```

## 📝 Notas Importantes

1. **Archivos sensibles**: El archivo `.gitignore` ya está configurado para excluir:
   - `node_modules/`
   - `.env`
   - `venv/`
   - `edugest.db`

2. **Firebase**: Si usas Firebase, asegúrate de configurar las reglas de seguridad en la consola de Firebase.

3. **HTTPS**: Render proporciona HTTPS automáticamente para todos los sitios.

4. **Despliegue automático**: Con Auto-Deploy activado, cada push a GitHub desplegará automáticamente en Render.

## 🆘 Solución de Problemas

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/edugest-pme.git
```

### Error: "failed to push"
```bash
git pull origin main --rebase
git push origin main
```

### Render no despliega
1. Verifica que el repositorio esté conectado
2. Revisa los logs en Render Dashboard
3. Asegúrate de que "Auto-Deploy" esté activado

## 🎉 ¡Listo!

Tu sistema EduGest PME ahora está:
- ✅ Versionado en Git
- ✅ Respaldado en GitHub
- ✅ Desplegado en Render
- ✅ Accesible desde cualquier lugar

**URL de tu sitio**: https://edugest-pme.onrender.com (o tu dominio personalizado)

---

**Última actualización**: 16 de febrero de 2026
