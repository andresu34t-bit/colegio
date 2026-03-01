# 🎨 Instrucciones para Agregar el Logo de EduGest PME

## 📋 Pasos para Agregar el Logo

### 1. Guardar la Imagen del Logo

1. Guarda la imagen del logo que te proporcioné como: **`logo-edugest.png`**
2. Colócala en la carpeta: **`images/`**
3. Ruta completa: `images/logo-edugest.png`

### 2. Especificaciones Recomendadas

- **Formato**: PNG con fondo transparente (preferido) o JPG
- **Tamaño**: 200x200px a 300x300px
- **Peso**: Máximo 100KB para carga rápida
- **Calidad**: Alta resolución para verse bien en pantallas retina

### 3. Ubicaciones donde Aparecerá el Logo

El logo se mostrará automáticamente en:

#### 📱 Páginas de Autenticación:
- ✅ **index.html** - Página de login (180px)
- ✅ **registro.html** - Página de registro (180px)

#### 🏢 Páginas Internas (Sidebar):
- ✅ **dashboard.html** - Dashboard PME (80px)
- ✅ **areas.html** - Selección de áreas (80px)
- ✅ **formulario.html** - Registro de eventos (80px)
- ✅ **formulario-area.html** - Formulario por área (80px)
- ✅ **informes.html** - Informes PME (80px)
- ✅ **finanzas.html** - Finanzas (80px)
- ✅ **admin-global.html** - Administración global (80px)
- ✅ **seo-dashboard.html** - Dashboard observaciones (80px)
- ✅ **seo-observacion.html** - Nueva observación (80px)

### 4. Características Implementadas

#### ✨ Fallback Automático:
Si el logo no se encuentra, se mostrará automáticamente el emoji 📚 como respaldo.

#### 📱 Responsive:
- **Desktop**: Logo completo (180px en login, 80px en sidebar)
- **Tablet**: Logo mediano (140px en login, 60px en sidebar)
- **Móvil**: Logo pequeño (140px en login, 60px en sidebar)

#### 🎨 Efectos Visuales:
- Animación de pulso suave
- Drop shadow para destacar
- Transiciones suaves
- Centrado perfecto

### 5. Formatos Alternativos Soportados

Si prefieres usar otro formato, puedes usar:
- `logo-edugest.jpg`
- `logo-edugest.svg` (recomendado para mejor calidad)
- `logo-edugest.webp` (mejor compresión)

**Nota**: Si cambias el formato, actualiza el nombre en el atributo `src` de las imágenes.

### 6. Verificación

Para verificar que el logo se muestra correctamente:

1. Abre cualquier página en el navegador
2. Si ves el logo: ✅ Todo correcto
3. Si ves el emoji 📚: ⚠️ El archivo no se encontró, verifica:
   - Nombre del archivo: `logo-edugest.png`
   - Ubicación: carpeta `images/`
   - Permisos de lectura del archivo

### 7. Optimización del Logo (Opcional)

Para mejor rendimiento, puedes optimizar el logo:

#### Herramientas Online:
- **TinyPNG**: https://tinypng.com/ (PNG)
- **Squoosh**: https://squoosh.app/ (Todos los formatos)
- **SVGOMG**: https://jakearchibald.github.io/svgomg/ (SVG)

#### Objetivo:
- Reducir peso sin perder calidad
- Mantener transparencia (si aplica)
- Formato web-optimizado

### 8. Personalización Avanzada

Si deseas cambiar el tamaño del logo, edita en `css/style.css`:

```css
/* Logo en página de login */
.login-logo-img {
    max-width: 180px;  /* Cambia este valor */
    max-height: 180px; /* Cambia este valor */
}

/* Logo en sidebar */
.sidebar-logo-img {
    max-width: 80px;   /* Cambia este valor */
    max-height: 80px;  /* Cambia este valor */
}
```

### 9. Solución de Problemas

#### El logo no aparece:
1. Verifica que el archivo existe en `images/logo-edugest.png`
2. Verifica que el nombre es exacto (sensible a mayúsculas/minúsculas)
3. Limpia la caché del navegador (Ctrl + F5)
4. Verifica la consola del navegador (F12) para errores

#### El logo se ve pixelado:
1. Usa una imagen de mayor resolución
2. Considera usar formato SVG para escalado perfecto
3. Asegúrate de que la imagen original sea de alta calidad

#### El logo es muy grande/pequeño:
1. Ajusta los valores en CSS (ver sección 8)
2. O redimensiona la imagen antes de subirla

### 10. Resultado Final

Una vez agregado el logo:
- ✅ Branding profesional en toda la aplicación
- ✅ Identidad visual consistente
- ✅ Mejor experiencia de usuario
- ✅ Aspecto más profesional y confiable

---

## 🎯 Resumen Rápido

1. Guarda el logo como `logo-edugest.png`
2. Colócalo en la carpeta `images/`
3. Refresca el navegador
4. ¡Listo! El logo aparecerá automáticamente

**¿Necesitas ayuda?** Revisa la consola del navegador (F12) para ver mensajes de error.
