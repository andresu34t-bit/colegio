# 🚀 Pasos Rápidos para Subir a GitHub

## ⚠️ IMPORTANTE: Primero crea el repositorio

1. **Ve a**: https://github.com/new
2. **Repository name**: `colegio`
3. **NO marques** "Initialize this repository with a README"
4. Click en **"Create repository"**

## 🔐 Crear Personal Access Token

1. **Ve a**: https://github.com/settings/tokens
2. Click en **"Generate new token"** → **"Generate new token (classic)"**
3. **Note**: `EduGest Deploy`
4. **Expiration**: 90 days (o el que prefieras)
5. **Marca**: ☑️ `repo` (todos los permisos de repositorio)
6. Click en **"Generate token"**
7. **COPIA EL TOKEN** (se muestra solo una vez) - Ejemplo: `ghp_xxxxxxxxxxxxxxxxxxxx`

## 📤 Subir los archivos

Ejecuta estos comandos en PowerShell:

```powershell
# 1. Verificar que el repositorio esté configurado
git remote -v

# 2. Hacer push (te pedirá usuario y contraseña)
git push -u origin main
```

Cuando te pida:
- **Username**: `andresu34t-bit`
- **Password**: Pega tu token (ghp_xxxxxxxxxxxxxxxxxxxx)

## ✅ Verificar

Después de hacer push:
1. Ve a: https://github.com/andresu34t-bit/colegio
2. Deberías ver todos tus archivos
3. Verifica el commit en el historial

## 🎯 Alternativa: Usar GitHub Desktop

Si prefieres una interfaz gráfica:

1. **Descargar**: https://desktop.github.com/
2. **Instalar** GitHub Desktop
3. **Sign in** con tu cuenta de GitHub
4. **File** → **Add Local Repository**
5. Selecciona la carpeta: `C:\Users\johan\OneDrive\Escritorio\COLEGIOS`
6. Click en **"Publish repository"**
7. Marca o desmarca "Keep this code private"
8. Click en **"Publish repository"**

## 🔄 Para futuras actualizaciones

Una vez configurado, solo necesitas:

```powershell
git add .
git commit -m "Descripción de cambios"
git push
```

---

## 📝 Notas

- El token es como una contraseña temporal
- Guárdalo en un lugar seguro
- No lo compartas con nadie
- Si lo pierdes, genera uno nuevo

## 🆘 Si algo falla

Verifica que:
1. ✅ El repositorio existe en GitHub
2. ✅ El token tiene permisos de `repo`
3. ✅ Estás usando el token como contraseña (no tu contraseña de GitHub)
