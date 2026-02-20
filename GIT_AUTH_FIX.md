# 🔐 Solución de Autenticación Git

## Problema
Error 403: Permission denied - No tienes permisos para subir al repositorio.

## Soluciones

### Opción 1: Usar GitHub CLI (Recomendado)

1. **Instalar GitHub CLI**:
   - Descarga desde: https://cli.github.com/
   - O con winget: `winget install --id GitHub.cli`

2. **Autenticarte**:
   ```bash
   gh auth login
   ```
   - Selecciona: GitHub.com
   - Selecciona: HTTPS
   - Autentícate con tu navegador

3. **Subir los archivos**:
   ```bash
   git push -u origin main
   ```

### Opción 2: Usar Personal Access Token (PAT)

1. **Crear un Token en GitHub**:
   - Ve a: https://github.com/settings/tokens
   - Click en "Generate new token" → "Generate new token (classic)"
   - Nombre: `EduGest PME Deploy`
   - Selecciona: `repo` (todos los permisos de repositorio)
   - Click en "Generate token"
   - **COPIA EL TOKEN** (solo se muestra una vez)

2. **Usar el token al hacer push**:
   ```bash
   git push -u origin main
   ```
   - Usuario: tu_usuario_github
   - Password: pega_tu_token_aqui (no tu contraseña)

### Opción 3: Usar SSH (Más seguro)

1. **Generar clave SSH**:
   ```bash
   ssh-keygen -t ed25519 -C "tu_email@ejemplo.com"
   ```
   - Presiona Enter para ubicación por defecto
   - Presiona Enter para sin contraseña (o agrega una)

2. **Copiar la clave pública**:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

3. **Agregar a GitHub**:
   - Ve a: https://github.com/settings/keys
   - Click en "New SSH key"
   - Título: `Mi PC - EduGest`
   - Pega la clave pública
   - Click en "Add SSH key"

4. **Cambiar URL del repositorio a SSH**:
   ```bash
   git remote set-url origin git@github.com:andresu34t-bit/colegio.git
   ```

5. **Subir los archivos**:
   ```bash
   git push -u origin main
   ```

## Verificar Configuración

```bash
# Ver tu configuración de Git
git config --list

# Ver el remote configurado
git remote -v

# Verificar tu usuario
git config user.name
git config user.email
```

## Configurar Usuario (si es necesario)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu_email@ejemplo.com"
```

## 🚀 Después de Autenticarte

Una vez que te hayas autenticado correctamente, ejecuta:

```bash
# Subir los archivos
git push -u origin main

# Verificar que se subió
git log --oneline
```

## 📝 Notas

- **GitHub ya no acepta contraseñas** para autenticación HTTPS desde 2021
- Debes usar un **Personal Access Token** o **SSH**
- El token es como una contraseña temporal con permisos específicos
- Guarda tu token en un lugar seguro (no lo compartas)

## ✅ Verificación Final

Después de hacer push exitosamente:
1. Ve a: https://github.com/andresu34t-bit/colegio
2. Deberías ver todos tus archivos
3. Verifica que el commit aparezca en el historial

---

**¿Cuál opción elegir?**
- **GitHub CLI**: Más fácil y rápido
- **PAT**: Bueno para uso temporal
- **SSH**: Más seguro para uso a largo plazo
