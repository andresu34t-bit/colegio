# 📸 Guía: Imágenes de Alta Resolución para Login

## 🎯 Para Máxima Nitidez

El login ahora soporta imágenes de alta resolución (Retina/2x). Para aprovechar esto:

### 1. Preparar Imágenes

Necesitas **2 versiones** del logo:

#### Versión Normal (1x)
- **Nombre**: `LOGO EDUGEST.png`
- **Tamaño**: 180x180 px
- **Ubicación**: `images/LOGO EDUGEST.png`

#### Versión Retina (2x)
- **Nombre**: `LOGO EDUGEST@2x.png`
- **Tamaño**: 360x360 px (el doble)
- **Ubicación**: `images/LOGO EDUGEST@2x.png`

### 2. Formato Recomendado

**Opción 1: PNG** (actual)
- ✅ Buena calidad
- ✅ Transparencia
- ⚠️ Tamaño de archivo mayor

**Opción 2: SVG** (recomendado)
- ✅ Calidad perfecta en cualquier tamaño
- ✅ Archivo muy ligero
- ✅ Escalable infinitamente
- ✅ No necesita versión 2x

### 3. Cómo Usar SVG (Opcional)

Si tienes el logo en SVG, cambia en `login.html`:

```html
<!-- Reemplazar -->
<img 
    src="images/LOGO EDUGEST.png" 
    srcset="images/LOGO EDUGEST.png 1x, images/LOGO EDUGEST@2x.png 2x"
    alt="EDUGEST Logo"
>

<!-- Por -->
<img 
    src="images/LOGO EDUGEST.svg" 
    alt="EDUGEST Logo"
>
```

### 4. Optimizar Imágenes PNG

Si usas PNG, optimízalas con:
- **TinyPNG**: https://tinypng.com/
- **ImageOptim** (Mac)
- **RIOT** (Windows)

**Objetivo**: Reducir tamaño sin perder calidad

### 5. Verificar Calidad

Prueba el login en:
- ✅ Pantalla normal (1080p)
- ✅ Pantalla Retina (MacBook, iPhone)
- ✅ Pantalla 4K
- ✅ Zoom del navegador (150%, 200%)

---

## 🎨 Especificaciones Técnicas

### Logo Principal
- **Formato**: PNG o SVG
- **Tamaño 1x**: 180x180 px
- **Tamaño 2x**: 360x360 px
- **Fondo**: Transparente
- **Colores**: RGB o RGBA

### Calidad de Exportación
- **PNG**: 24-bit con transparencia
- **Compresión**: Sin pérdida (lossless)
- **DPI**: 72 para web (suficiente)

---

## 📁 Estructura de Archivos

```
images/
├── LOGO EDUGEST.png      (180x180 - versión normal)
├── LOGO EDUGEST@2x.png   (360x360 - versión Retina)
└── LOGO EDUGEST.svg      (opcional - mejor opción)
```

---

## ✨ Resultado

Con imágenes optimizadas:
- ✅ Logo nítido en todas las pantallas
- ✅ Sin pixelación en Retina
- ✅ Carga rápida
- ✅ Apariencia profesional

---

## 🚀 Próximos Pasos

1. Crear versión 2x del logo (360x360 px)
2. Guardar como `LOGO EDUGEST@2x.png`
3. Colocar en carpeta `images/`
4. Recargar login y verificar

**Nota**: Si no tienes la versión 2x, el login seguirá funcionando perfectamente con la versión 1x, pero se verá aún mejor con ambas versiones.
