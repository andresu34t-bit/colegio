# 🚀 Instalación del Sistema de Informes - EDUGEST

## ✅ Archivos Incluidos

El sistema de informes está completamente implementado. Estos son los archivos que se han creado:

### JavaScript
```
js/
├── informes.js          (Motor principal de generación)
├── informes-ui.js       (Interfaz de informes consolidados)
└── lista-eventos.js     (Gestión de lista de eventos)
```

### HTML
```
├── lista-eventos.html   (Nueva página - Lista de eventos)
├── informes.html        (Actualizada - Informes consolidados)
└── test-informes.html   (Página de pruebas)
```

### CSS
```
css/
└── design-system.css    (Actualizado con estilos de badges y botones)
```

### Documentación
```
├── SISTEMA-INFORMES-README.md        (Documentación completa)
├── INFORMES-GUIA-RAPIDA.md          (Guía rápida de uso)
├── SISTEMA-INFORMES-COMPLETADO.md   (Resumen de implementación)
└── INSTALACION-INFORMES.md          (Este archivo)
```

---

## 🔧 Verificación de Instalación

### Paso 1: Verificar Archivos
Asegúrate de que todos los archivos listados arriba existen en tu proyecto.

### Paso 2: Probar el Sistema
1. Abre `test-informes.html` en tu navegador
2. Haz clic en "📦 Cargar Datos de Prueba"
3. Haz clic en "🔍 Verificar Librerías" (todas deben estar ✅)
4. Haz clic en "📄 Generar Informe Individual"
5. Haz clic en "📊 Generar Informe Consolidado"

Si todos los pasos funcionan, ¡el sistema está correctamente instalado! ✅

---

## 🌐 Dependencias CDN

El sistema usa estas librerías desde CDN (no requieren instalación):

```html
<!-- Chart.js para gráficos -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<!-- jsPDF para generación de PDF -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<!-- jsPDF-AutoTable para tablas en PDF -->
<script src="https://unpkg.com/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.js"></script>
```

Estas librerías se cargan automáticamente desde internet. No necesitas descargar nada.

---

## 📋 Integración con Páginas Existentes

### Opción 1: Agregar Enlace en el Menú (Recomendado)

Para agregar el enlace a "Lista de Eventos" en tus páginas existentes, agrega esto en el menú de navegación:

```html
<a href="lista-eventos.html" class="nav-item">
    <span class="nav-icon">📋</span>
    <span>Lista de Eventos</span>
</a>
```

### Opción 2: Usar las Páginas Directamente

Puedes acceder directamente a:
- `lista-eventos.html` - Para ver eventos y generar informes individuales
- `informes.html` - Para generar informes consolidados

---

## 🧪 Pruebas Recomendadas

### Test Básico (5 minutos)
1. ✅ Abrir `test-informes.html`
2. ✅ Cargar datos de prueba
3. ✅ Generar informe individual
4. ✅ Generar informe consolidado
5. ✅ Verificar que los PDFs se descargan

### Test Completo (15 minutos)
1. ✅ Registrar un evento real desde `areas-new.html`
2. ✅ Ir a `lista-eventos.html`
3. ✅ Verificar que el evento aparece
4. ✅ Generar informe individual del evento
5. ✅ Ir a `informes.html`
6. ✅ Seleccionar un área
7. ✅ Generar informe consolidado
8. ✅ Probar filtros (área, mes, búsqueda)
9. ✅ Verificar gráficos
10. ✅ Verificar estadísticas

---

## 🔍 Solución de Problemas

### Problema: "No se genera el PDF"

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica que las librerías CDN están cargadas:
   ```javascript
   console.log(typeof window.jspdf); // debe mostrar "object"
   console.log(typeof Chart); // debe mostrar "function"
   ```

### Problema: "No hay eventos"

**Solución:**
1. Usa `test-informes.html` para cargar datos de prueba
2. O registra eventos desde `areas-new.html`

### Problema: "Faltan datos en el informe"

**Solución:**
1. Verifica que los eventos tienen todos los campos completos
2. Revisa localStorage:
   ```javascript
   console.log(localStorage.getItem('eventos'));
   ```

### Problema: "Los gráficos no aparecen"

**Solución:**
1. Verifica que Chart.js está cargado
2. Espera unos segundos (se generan de forma asíncrona)
3. Revisa la consola por errores

---

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+
- ✅ Opera 76+

### Dispositivos
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablets
- ✅ Móviles (con limitaciones en generación de PDF)

---

## 🎯 Primeros Pasos

### Para Usuarios Nuevos

1. **Lee la guía rápida**
   ```
   Abre: INFORMES-GUIA-RAPIDA.md
   ```

2. **Prueba el sistema**
   ```
   Abre: test-informes.html
   Carga datos de prueba
   Genera informes
   ```

3. **Usa el sistema real**
   ```
   Registra eventos desde areas-new.html
   Ve a lista-eventos.html
   Genera informes
   ```

### Para Desarrolladores

1. **Lee la documentación técnica**
   ```
   Abre: SISTEMA-INFORMES-README.md
   ```

2. **Revisa el código**
   ```
   js/informes.js - Motor principal
   js/informes-ui.js - Interfaz
   js/lista-eventos.js - Lista de eventos
   ```

3. **Personaliza según necesites**
   ```
   Colores, logos, textos, etc.
   ```

---

## 🔐 Seguridad y Privacidad

- ✅ Todos los datos se almacenan localmente (localStorage)
- ✅ No se envía información a servidores externos
- ✅ Los PDFs se generan en el navegador
- ✅ Las librerías CDN son de fuentes confiables

---

## 📊 Estructura de Datos

### localStorage Keys
```javascript
// Eventos
localStorage.getItem('eventos') // Array de eventos

// Información del colegio
localStorage.getItem('informacionesGenerales') // Objeto con datos del colegio
```

### Formato de Evento
```javascript
{
    id: "uuid",
    area: "Currículum",
    subdimension: "...",
    objetivoEstrategico: "...",
    estrategia: "...",
    accion: "...",
    descripcion: "...",
    numeroEventos: 5,
    porcentajeLogro: 85,
    porcentajeMeta: 90,
    fecha: "2026-03-15",
    mes: "MARZO",
    responsable: "Juan Pérez"
}
```

---

## 🎨 Personalización

### Cambiar Colores
Edita `css/design-system.css`:
```css
:root {
    --curriculum-500: #3b82f6;  /* Azul */
    --liderazgo-500: #a855f7;   /* Morado */
    --convivencia-500: #22c55e; /* Verde */
}
```

### Cambiar Logo
Reemplaza el archivo `LOGO EDUGEST.png` con tu logo.

### Cambiar Textos
Edita los archivos HTML según necesites.

---

## 📞 Soporte

### Recursos Disponibles
1. **SISTEMA-INFORMES-README.md** - Documentación completa
2. **INFORMES-GUIA-RAPIDA.md** - Guía rápida
3. **test-informes.html** - Página de pruebas
4. **Código comentado** - Todos los archivos JS tienen comentarios

### Debugging
```javascript
// Ver eventos en consola
console.log(JSON.parse(localStorage.getItem('eventos')));

// Ver info del colegio
console.log(JSON.parse(localStorage.getItem('informacionesGenerales')));

// Verificar librerías
console.log('jsPDF:', typeof window.jspdf);
console.log('Chart.js:', typeof Chart);
console.log('InformesGenerator:', typeof InformesGenerator);
```

---

## ✅ Checklist de Instalación

- [ ] Todos los archivos JS están en la carpeta `js/`
- [ ] Todos los archivos HTML están en la raíz
- [ ] El archivo CSS está actualizado
- [ ] Las librerías CDN están en los HTML
- [ ] `test-informes.html` funciona correctamente
- [ ] Se pueden generar informes individuales
- [ ] Se pueden generar informes consolidados
- [ ] Los PDFs se descargan correctamente
- [ ] Los gráficos se muestran correctamente
- [ ] La documentación está disponible

---

## 🎉 ¡Listo!

Si completaste el checklist, el sistema está correctamente instalado y listo para usar.

### Próximos Pasos:
1. ✅ Registra eventos reales
2. ✅ Genera informes
3. ✅ Presenta a dirección
4. ✅ Disfruta del sistema automatizado

---

**Sistema de Informes EDUGEST v1.0**
*Instalación completada exitosamente* ✅
