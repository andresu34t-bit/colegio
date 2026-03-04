# 🚀 Cómo Probar el Login - Guía Rápida

## ✅ Problema Solucionado

El sistema ahora inicia sesión correctamente. El problema era que había funciones que creaban sesiones automáticas que interferían con el login normal.

## 📋 Pasos para Probar

### Método 1: Prueba Rápida con Herramienta de Diagnóstico

1. **Abre** `test-session.html` en tu navegador
2. **Haz clic** en "Limpiar Sesión" (para empezar limpio)
3. **Haz clic** en "Ir al Login"
4. **Ingresa** estas credenciales:
   - Email: `director@mistral.cl`
   - Contraseña: `Director2026`
5. **Haz clic** en "Iniciar sesión"
6. **Deberías** ser redirigido al dashboard automáticamente

### Método 2: Prueba Normal

1. **Abre** `index.html` en tu navegador
2. **Ingresa** cualquiera de estas credenciales:

   | Email | Contraseña |
   |-------|-----------|
   | director@mistral.cl | Director2026 |
   | docente@mistral.cl | Docente2026 |
   | utp@mistral.cl | UTP2026 |
   | director@edugest.cl | EduGest2026 |
   | admin@edugest.cl | Admin2026 |

3. **Haz clic** en "Iniciar sesión"
4. **Deberías** ver el dashboard con tus datos

## 🔍 Cómo Verificar que Funciona

### En la Consola del Navegador (F12)

Deberías ver estos mensajes:

```
✅ Datos demo inicializados
📧 Usuarios disponibles:
   director@mistral.cl / Director2026
   docente@mistral.cl / Docente2026
   ...
🔐 Intentando login con: director@mistral.cl
✅ Login exitoso: director@mistral.cl
📚 Colegio: Liceo Gabriela Mistral
💾 Sesión guardada: {...}
🚀 Redirigiendo a dashboard.html...
```

### En el Dashboard

Deberías ver:
- Tu nombre en el sidebar (ej: "Ana María González")
- Tu rol (ej: "Director")
- El nombre del colegio en el título
- Los datos del PME

## 🛠️ Si Algo No Funciona

### Opción 1: Usar la Herramienta de Diagnóstico

1. Abre `test-session.html`
2. Haz clic en "Verificar Sesión"
3. Si hay problemas, haz clic en "Limpiar Sesión"
4. Haz clic en "Crear Sesión de Prueba"
5. Haz clic en "Ir al Dashboard"

### Opción 2: Limpiar Manualmente

1. Abre las Herramientas de Desarrollo (F12)
2. Ve a la pestaña "Application" o "Aplicación"
3. En el menú izquierdo, busca "Local Storage"
4. Haz clic derecho y selecciona "Clear" o "Limpiar"
5. Recarga la página (F5)
6. Intenta hacer login nuevamente

### Opción 3: Recarga Completa

1. Presiona `Ctrl + Shift + R` (Windows) o `Cmd + Shift + R` (Mac)
2. Esto recarga la página ignorando la caché
3. Intenta hacer login nuevamente

## 📝 Notas Importantes

- **Primera vez**: La primera vez que abras `index.html`, el sistema creará automáticamente los usuarios de prueba
- **Recordarme**: Si marcas "Recordarme", tu email se guardará para la próxima vez
- **Sesión activa**: Si ya tienes una sesión activa, serás redirigido automáticamente al dashboard
- **Logout**: Para cerrar sesión, haz clic en el botón de logout en el dashboard

## 🎯 Resultado Esperado

Después de hacer login correctamente:
1. Verás una pantalla de carga por medio segundo
2. Serás redirigido a `dashboard.html`
3. Verás tu información personal en el sidebar
4. Verás los datos del PME de tu colegio
5. Podrás navegar por todas las secciones del sistema

## ❓ ¿Necesitas Ayuda?

Si después de seguir estos pasos aún tienes problemas:
1. Abre la consola del navegador (F12)
2. Busca mensajes de error en rojo
3. Copia el mensaje de error
4. Revisa el archivo `SOLUCION-LOGIN.md` para más detalles técnicos
