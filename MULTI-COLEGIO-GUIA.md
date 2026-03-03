# 🏫 SISTEMA MULTI-COLEGIO - GUÍA COMPLETA

## 📋 DESCRIPCIÓN GENERAL

El sistema EDUGEST ahora soporta **múltiples colegios completamente independientes**. Cada institución tiene sus propios datos separados y protegidos.

---

## ✨ CARACTERÍSTICAS PRINCIPALES

### 🔒 Separación Total de Datos
- Cada colegio tiene su propio espacio de datos
- Los datos NO se comparten entre colegios
- Cada institución es completamente independiente

### 👥 Usuarios por Colegio
- Cada usuario pertenece a UN solo colegio
- No pueden ver datos de otros colegios
- Autenticación separada por institución

### 📊 Datos Independientes
Cada colegio tiene sus propios:
- ✅ Eventos PME
- ✅ Informaciones Generales
- ✅ Informes
- ✅ Finanzas
- ✅ Observaciones de Clases
- ✅ Usuarios y roles

---

## 🚀 FLUJO DE TRABAJO

### 1. Seleccionar Colegio
```
Abrir: seleccionar-colegio.html
```
- Ver lista de colegios registrados
- Seleccionar el colegio deseado
- O registrar un nuevo colegio

### 2. Registrar Nuevo Colegio
```
Clic en: "Registrar Nuevo Colegio"
```
- Completar datos del colegio
- Crear cuenta de Director/Administrador
- El colegio queda registrado

### 3. Iniciar Sesión
```
Después de seleccionar colegio
```
- Ingresar email y contraseña
- Solo usuarios del colegio seleccionado pueden entrar
- Acceso al dashboard del colegio

---

## 📁 ESTRUCTURA DE DATOS

### Almacenamiento por Colegio

Cada colegio tiene un prefijo único:
```
colegio_{ID}_eventos
colegio_{ID}_informacionesGenerales
colegio_{ID}_informes
colegio_{ID}_finanzas
colegio_{ID}_observaciones
colegio_{ID}_usuarios
```

### Ejemplo:
```javascript
// Colegio 1
colegio_001_eventos
colegio_001_usuarios

// Colegio 2
colegio_002_eventos
colegio_002_usuarios

// Los datos NO se mezclan
```

---

## 🔐 SEGURIDAD Y PRIVACIDAD

### Aislamiento de Datos
```
✅ Cada colegio solo ve sus propios datos
✅ No hay acceso cruzado entre colegios
✅ Los usuarios están vinculados a un colegio
✅ Las sesiones son independientes
```

### Control de Acceso
```
1. Selección de colegio obligatoria
2. Autenticación por colegio
3. Verificación de permisos
4. Datos filtrados por colegio
```

---

## 📊 FUNCIONES PRINCIPALES

### JavaScript: `multi-colegio.js`

#### Obtener Colegios
```javascript
const colegios = obtenerColegios();
// Retorna array de todos los colegios
```

#### Obtener Colegio Actual
```javascript
const colegio = obtenerColegioActual();
// Retorna el colegio seleccionado
```

#### Registrar Colegio
```javascript
registrarColegio(colegio, director);
// Crea nuevo colegio con su director
```

#### Obtener Datos del Colegio
```javascript
const eventos = obtenerDatosColegio('eventos');
// Retorna solo eventos del colegio actual
```

#### Agregar Dato
```javascript
agregarDatoColegio('eventos', nuevoEvento);
// Agrega evento al colegio actual
```

#### Eliminar Dato
```javascript
eliminarDatoColegio('eventos', eventoId);
// Elimina evento del colegio actual
```

---

## 🎯 CASOS DE USO

### Caso 1: Red de Colegios
```
Escenario: Una red tiene 5 colegios

Solución:
1. Registrar cada colegio por separado
2. Cada uno tiene su director
3. Cada uno gestiona sus datos
4. No hay interferencia entre ellos
```

### Caso 2: Colegio Individual
```
Escenario: Un solo colegio usa el sistema

Solución:
1. Registrar el colegio
2. Crear usuarios (director, docentes, etc.)
3. Gestionar datos normalmente
4. Sistema funciona igual que antes
```

### Caso 3: Migración de Datos
```
Escenario: Ya tenías datos en el sistema

Solución:
✅ El sistema migra automáticamente
✅ Crea un colegio "Mi Colegio"
✅ Mueve todos los datos existentes
✅ No se pierde información
```

---

## 🔄 MIGRACIÓN AUTOMÁTICA

### ¿Qué hace?
Si detecta datos antiguos (sin sistema multi-colegio):
1. Crea un colegio por defecto
2. Migra todos los usuarios
3. Migra todos los eventos
4. Migra todas las informaciones
5. Migra todos los datos existentes

### ¿Cuándo ocurre?
- Automáticamente al cargar el sistema
- Solo si NO hay colegios registrados
- Solo si HAY datos antiguos

### Resultado
```
Antes: Datos globales
Después: Datos en "Mi Colegio"
```

---

## 📝 REGISTRO DE COLEGIO

### Datos Requeridos

#### Información del Colegio:
- ✅ Nombre del colegio
- ✅ RBD (opcional)
- ✅ Dirección
- ✅ Comuna
- ✅ Región
- ✅ Teléfono (opcional)
- ✅ Email del colegio

#### Datos del Director:
- ✅ Nombre completo
- ✅ Email
- ✅ Contraseña
- ✅ Confirmación de contraseña

---

## 🎨 INTERFAZ DE USUARIO

### Pantalla de Selección
```
┌─────────────────────────────────────┐
│  🏫 Seleccionar Colegio             │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │ Colegio  │  │ Colegio  │       │
│  │    A     │  │    B     │       │
│  │ 5 users  │  │ 8 users  │       │
│  └──────────┘  └──────────┘       │
│                                     │
│  [➕ Registrar Nuevo Colegio]      │
│                                     │
└─────────────────────────────────────┘
```

### Pantalla de Registro
```
┌─────────────────────────────────────┐
│  🏫 Registrar Nuevo Colegio         │
├─────────────────────────────────────┤
│                                     │
│  Nombre: [________________]         │
│  RBD:    [________________]         │
│  Dirección: [_____________]         │
│  Comuna: [________________]         │
│  Región: [Seleccionar... ▼]        │
│                                     │
│  👨‍💼 Datos del Director              │
│  Nombre: [________________]         │
│  Email:  [________________]         │
│  Pass:   [________________]         │
│                                     │
│  [🚀 Crear Colegio]                │
│                                     │
└─────────────────────────────────────┘
```

---

## 🔧 CONFIGURACIÓN TÉCNICA

### Archivos Creados

1. **seleccionar-colegio.html**
   - Pantalla de selección de colegios
   - Lista de instituciones registradas

2. **registro-colegio.html**
   - Formulario de registro
   - Validaciones incluidas

3. **js/multi-colegio.js**
   - Lógica del sistema multi-colegio
   - Funciones de gestión de datos
   - Migración automática

### Archivos Modificados

1. **index.html**
   - Integración con sistema multi-colegio
   - Verificación de colegio seleccionado

2. **informaciones-generales.html**
   - Uso de funciones multi-colegio

3. **js/informaciones-generales.js**
   - Adaptado para datos por colegio

---

## 📊 ESTADÍSTICAS POR COLEGIO

### Obtener Estadísticas
```javascript
const stats = obtenerEstadisticasColegio();

// Retorna:
{
    eventos: 42,
    informacionesGenerales: 15,
    usuarios: 8,
    informes: 23,
    observaciones: 31
}
```

---

## 🎯 VENTAJAS DEL SISTEMA

### Para Redes de Colegios
✅ Gestión centralizada de múltiples instituciones  
✅ Datos completamente separados  
✅ Cada colegio es independiente  
✅ Fácil administración  

### Para Colegios Individuales
✅ Sistema profesional y escalable  
✅ Preparado para crecer  
✅ Datos organizados  
✅ Fácil de usar  

### Para Administradores
✅ Control total por institución  
✅ Seguridad de datos  
✅ Privacidad garantizada  
✅ Gestión eficiente  

---

## 🚨 IMPORTANTE

### Separación de Datos
```
⚠️ Los datos NO se comparten entre colegios
⚠️ Cada institución es independiente
⚠️ No hay acceso cruzado
⚠️ La privacidad está garantizada
```

### Usuarios
```
⚠️ Cada usuario pertenece a UN colegio
⚠️ No pueden cambiar de colegio
⚠️ No ven datos de otros colegios
⚠️ Autenticación por institución
```

---

## 🔄 CAMBIAR DE COLEGIO

### Desde la Sesión
```javascript
cambiarColegio();
// Cierra sesión y vuelve a selección
```

### Manualmente
```
1. Cerrar sesión
2. Volver a seleccionar-colegio.html
3. Elegir otro colegio
4. Iniciar sesión
```

---

## 📱 FLUJO COMPLETO

```
1. Abrir sistema
   ↓
2. Seleccionar colegio
   ↓
3. Iniciar sesión
   ↓
4. Usar el sistema
   ↓
5. Todos los datos se guardan
   en el colegio actual
   ↓
6. Cerrar sesión
   ↓
7. Volver a paso 2
```

---

## 🎓 EJEMPLOS DE USO

### Ejemplo 1: Registrar Evento
```javascript
// El evento se guarda automáticamente
// en el colegio actual
const evento = {
    area: 'Currículum',
    accion: 'Taller de lectura',
    // ... más datos
};

agregarDatoColegio('eventos', evento);
// ✅ Guardado en el colegio actual
```

### Ejemplo 2: Ver Eventos
```javascript
// Solo muestra eventos del colegio actual
const eventos = obtenerDatosColegio('eventos');
// ✅ Solo eventos de este colegio
```

### Ejemplo 3: Eliminar Dato
```javascript
// Solo elimina del colegio actual
eliminarDatoColegio('eventos', eventoId);
// ✅ Solo afecta a este colegio
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [x] Sistema de selección de colegios
- [x] Registro de nuevos colegios
- [x] Separación total de datos
- [x] Usuarios por colegio
- [x] Autenticación por institución
- [x] Migración automática de datos
- [x] Funciones de gestión
- [x] Interfaz de usuario
- [x] Documentación completa

---

## 🎉 CONCLUSIÓN

El sistema EDUGEST ahora soporta **múltiples colegios completamente independientes**.

### Características:
✅ Datos separados por colegio  
✅ Usuarios vinculados a instituciones  
✅ Privacidad garantizada  
✅ Fácil de usar  
✅ Escalable  
✅ Seguro  

### Listo para:
✅ Redes de colegios  
✅ Colegios individuales  
✅ Crecimiento futuro  
✅ Uso profesional  

---

**¡Sistema Multi-Colegio Implementado! 🎉**

*Cada institución con sus propios datos, completamente separados y protegidos*

---

*Versión 2.0 - Sistema Multi-Colegio*  
*Marzo 2026*
