# 📊 Sistema de Generación de Informes - EDUGEST

## 🎯 Descripción General

Sistema completo de generación de informes automáticos en PDF para el módulo PME de EDUGEST. Permite generar informes individuales por evento y consolidados por área o generales.

---

## ✨ Características Principales

### 1. Informes Individuales por Evento
- ✅ Generación de PDF profesional por cada evento registrado
- ✅ Incluye toda la información del evento
- ✅ Diseño limpio con logos y branding
- ✅ Métricas e indicadores visuales

### 2. Informes Consolidados
- ✅ Informe general con todas las áreas
- ✅ Informes por área específica (Currículum, Liderazgo, Convivencia, Recursos)
- ✅ Estadísticas y análisis comparativos
- ✅ Gráficos integrados en el PDF

### 3. Análisis Automático
- ✅ Resumen ejecutivo
- ✅ Avance mensual
- ✅ Rendimiento por docente
- ✅ Comparación entre áreas
- ✅ Porcentajes de logro y cumplimiento

---

## 📁 Archivos del Sistema

### JavaScript
- **`js/informes.js`** - Motor de generación de informes (clase InformesGenerator)
- **`js/informes-ui.js`** - Interfaz de usuario para informes consolidados
- **`js/lista-eventos.js`** - Gestión de lista de eventos e informes individuales

### HTML
- **`informes.html`** - Página de informes consolidados
- **`lista-eventos.html`** - Lista de eventos con botón de informe individual

### Librerías Externas (CDN)
- **jsPDF** - Generación de PDFs
- **jsPDF-AutoTable** - Tablas en PDF
- **Chart.js** - Gráficos

---

## 🚀 Cómo Usar

### Generar Informe Individual

1. Ve a **"Lista de Eventos"** en el menú lateral
2. Busca el evento del que quieres generar el informe
3. Haz clic en el botón **"📄 Generar Informe"**
4. El PDF se descargará automáticamente

**Contenido del informe individual:**
- Información del colegio
- Área de gestión
- Subdimensión
- Objetivo estratégico
- Estrategia
- Indicadores (N° eventos, % logro objetivo, % logro meta)
- Fecha y responsable
- Descripción del evento

### Generar Informe Consolidado

1. Ve a **"Informes PME"** en el menú lateral
2. Selecciona un área específica O "Informe Consolidado" para todas
3. Revisa las estadísticas y gráficos en pantalla
4. Haz clic en **"📄 Generar PDF"**
5. El informe completo se descargará

**Contenido del informe consolidado:**
- Resumen ejecutivo
- Estadísticas por área
- Gráficos de distribución
- Avance mensual
- Rendimiento por docente
- Comparativas y análisis

---

## 📊 Estructura de los Informes

### Informe Individual
```
┌─────────────────────────────────────┐
│ HEADER (Logo + Título)              │
├─────────────────────────────────────┤
│ Información del Colegio             │
├─────────────────────────────────────┤
│ ÁREA DE GESTIÓN                     │
│ - Subdimensión                      │
│ - Objetivo Estratégico              │
│ - Estrategia                        │
├─────────────────────────────────────┤
│ INDICADORES Y MÉTRICAS              │
│ [Tabla con indicadores]             │
├─────────────────────────────────────┤
│ DESCRIPCIÓN DEL EVENTO              │
├─────────────────────────────────────┤
│ Footer (Paginación)                 │
└─────────────────────────────────────┘
```

### Informe Consolidado
```
Página 1:
┌─────────────────────────────────────┐
│ HEADER                              │
├─────────────────────────────────────┤
│ RESUMEN EJECUTIVO                   │
│ - Total eventos                     │
│ - Promedio logro                    │
│ - Áreas activas                     │
│ - Docentes participantes            │
├─────────────────────────────────────┤
│ RESUMEN POR ÁREA                    │
│ [Tabla comparativa]                 │
└─────────────────────────────────────┘

Página 2:
┌─────────────────────────────────────┐
│ ANÁLISIS GRÁFICO                    │
│ [Gráficos de distribución]          │
└─────────────────────────────────────┘

Página 3:
┌─────────────────────────────────────┐
│ AVANCE MENSUAL                      │
│ [Tabla por mes]                     │
├─────────────────────────────────────┤
│ RENDIMIENTO POR DOCENTE             │
│ [Tabla top 10 docentes]             │
└─────────────────────────────────────┘
```

---

## 🎨 Diseño y Branding

### Colores por Área
- **Currículum**: Azul (#3b82f6)
- **Liderazgo**: Morado (#a855f7)
- **Convivencia**: Verde (#22c55e)
- **Recursos**: Naranja (#f59e0b)

### Elementos de Diseño
- Logos: EDUGEST (superior derecha)
- Tipografía: Helvetica (profesional y legible)
- Márgenes: 20mm laterales
- Espaciado: Consistente y profesional
- Tablas: Estilo striped con colores suaves

---

## 🔧 Configuración Técnica

### Dependencias CDN
```html
<!-- Chart.js para gráficos -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<!-- jsPDF para generación de PDF -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<!-- jsPDF-AutoTable para tablas en PDF -->
<script src="https://unpkg.com/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.js"></script>
```

### Datos Requeridos
Los informes se generan automáticamente desde los datos almacenados en `localStorage`:

```javascript
// Estructura de evento
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

## 📥 Nombres de Archivos Generados

### Informe Individual
```
informe_evento_[ÁREA]_[TIMESTAMP].pdf
Ejemplo: informe_evento_Currículum_1709654321000.pdf
```

### Informe Consolidado
```
informe_general_[NOMBRE_COLEGIO]_[TIMESTAMP].pdf
Ejemplo: informe_general_Colegio_Demo_1709654321000.pdf
```

---

## 🎯 Casos de Uso

### 1. Presentación a Dirección
- Generar informe consolidado mensual
- Mostrar avance y cumplimiento de objetivos
- Comparar áreas de gestión

### 2. Seguimiento Individual
- Generar informe de evento específico
- Documentar actividades realizadas
- Evidencia para auditorías

### 3. Análisis de Desempeño
- Revisar rendimiento por docente
- Identificar áreas con mejor desempeño
- Planificar mejoras

### 4. Reportes Mensuales
- Filtrar por mes en informes consolidados
- Generar reportes periódicos
- Seguimiento de metas anuales

---

## ⚡ Características Técnicas

### Rendimiento
- ✅ Generación rápida (< 3 segundos)
- ✅ Sin necesidad de servidor
- ✅ Procesamiento en el navegador
- ✅ Archivos PDF optimizados

### Compatibilidad
- ✅ Chrome, Firefox, Edge, Safari
- ✅ Dispositivos móviles
- ✅ Tablets
- ✅ Funciona offline (datos en localStorage)

### Seguridad
- ✅ Datos locales (no se envían a servidor)
- ✅ Sin dependencias de backend
- ✅ Privacidad garantizada

---

## 🔄 Flujo de Trabajo

```
1. Registrar Evento
   ↓
2. Evento guardado en localStorage
   ↓
3. Ver en Lista de Eventos
   ↓
4. Generar Informe Individual (opcional)
   ↓
5. Acumular eventos
   ↓
6. Generar Informe Consolidado
   ↓
7. Descargar PDF profesional
```

---

## 📝 Notas Importantes

1. **Sin modificar funcionalidades existentes**: El sistema se integra como módulo adicional
2. **Datos automáticos**: No requiere ingreso manual de datos
3. **Profesional**: Listo para presentar a dirección o autoridades
4. **Escalable**: Fácil de extender con nuevas métricas o gráficos

---

## 🆘 Solución de Problemas

### El PDF no se genera
- Verificar que hay eventos registrados
- Revisar la consola del navegador (F12)
- Asegurar que las librerías CDN están cargadas

### Faltan datos en el informe
- Verificar que los eventos tienen todos los campos completos
- Revisar localStorage: `localStorage.getItem('eventos')`

### Gráficos no aparecen
- Esperar unos segundos (se generan de forma asíncrona)
- Verificar que Chart.js está cargado

---

## 🎓 Próximas Mejoras (Opcionales)

- [ ] Exportar a Excel
- [ ] Enviar por email
- [ ] Programar generación automática
- [ ] Comparación año anterior
- [ ] Gráficos más avanzados
- [ ] Filtros por fecha personalizada
- [ ] Firma digital
- [ ] Marca de agua personalizada

---

## 📞 Soporte

Para dudas o problemas con el sistema de informes, revisar:
1. Esta documentación
2. Código comentado en `js/informes.js`
3. Ejemplos en `lista-eventos.html`

---

**✅ Sistema de Informes EDUGEST - Listo para Producción**

*Generación automática de informes profesionales para colegios*
