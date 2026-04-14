# Requerimientos: EDUGEST Mejoras v2

## Introducción

Este documento define los requerimientos funcionales y no funcionales para el plan de mejoras de EDUGEST, derivados del diseño técnico. Las mejoras se organizan en cuatro ejes priorizados: seguridad, persistencia, calidad de código y nuevas funcionalidades.

---

## Requerimientos

### 1. Seguridad — Autenticación con Firebase Auth

#### 1.1 Reemplazar autenticación simulada

**Como** cualquier usuario del sistema,
**quiero** que mi autenticación sea verificada por Firebase Auth,
**para** que mis credenciales no estén expuestas en el código fuente del cliente.

**Criterios de aceptación:**
- DADO que el usuario ingresa email y contraseña válidos, CUANDO hace clic en "Ingresar", ENTONCES Firebase Auth verifica las credenciales y retorna un token JWT real.
- DADO que el usuario ingresa credenciales incorrectas, CUANDO hace clic en "Ingresar", ENTONCES se muestra un mensaje de error específico (contraseña incorrecta / usuario no encontrado) sin revelar cuál de los dos falló.
- DADO que el sistema está en producción, ENTONCES el objeto `DEMO_USERS` con contraseñas en texto plano no existe en ningún archivo JavaScript cargado por el browser.
- DADO que el usuario cierra el browser, CUANDO vuelve a abrir la aplicación, ENTONCES debe volver a autenticarse (sesión no persiste en localStorage).

#### 1.2 Perfil de usuario en Firestore

**Como** administrador global,
**quiero** que los datos de perfil de cada usuario (rol, colegio asignado, nombre) estén en Firestore,
**para** poder gestionar usuarios sin modificar código fuente.

**Criterios de aceptación:**
- DADO que un usuario se autentica exitosamente, CUANDO Firebase Auth confirma la identidad, ENTONCES el sistema lee `users/{uid}` en Firestore para obtener `role`, `schoolId` y `name`.
- DADO que un usuario no tiene documento en `users/{uid}`, CUANDO intenta acceder al sistema, ENTONCES se le muestra un error "Cuenta no configurada" y se cierra la sesión.
- DADO que el admin_global crea un nuevo usuario, CUANDO completa el formulario, ENTONCES se crea la cuenta en Firebase Auth Y el documento en `users/{uid}` en una operación atómica.

#### 1.3 Protección de rutas por rol

**Como** sistema,
**quiero** que cada página verifique el rol del usuario antes de renderizar,
**para** que un docente no pueda acceder al panel de admin_global.

**Criterios de aceptación:**
- DADO que un usuario sin sesión intenta acceder a cualquier página protegida, ENTONCES es redirigido a `login.html`.
- DADO que un docente intenta acceder a `admin-global.html`, ENTONCES es redirigido a `dashboard.html` con mensaje "Acceso denegado".
- DADO que un director intenta acceder a datos de otro colegio, ENTONCES Firestore rechaza la operación con `permission-denied`.

---

### 2. Persistencia — Firestore como fuente de verdad

#### 2.1 Migrar datos de colegios a Firestore

**Como** administrador global,
**quiero** que los datos de colegios estén en Firestore,
**para** poder agregar, editar y desactivar colegios sin modificar código.

**Criterios de aceptación:**
- DADO que el admin_global accede al panel de colegios, CUANDO la página carga, ENTONCES los colegios se leen desde la colección `schools` en Firestore (no desde `SCHOOLS_DATA` hardcodeado).
- DADO que el admin_global crea un nuevo colegio, CUANDO guarda el formulario, ENTONCES se crea un documento en `schools/{schoolId}` con todos los campos requeridos.
- DADO que el admin_global desactiva un colegio, CUANDO confirma la acción, ENTONCES `schools/{schoolId}.active` se actualiza a `false` y los usuarios de ese colegio no pueden iniciar sesión.

#### 2.2 Migrar eventos PME a Firestore

**Como** docente,
**quiero** que los eventos PME que registro se guarden en Firestore,
**para** que persistan entre sesiones y sean visibles para el director.

**Criterios de aceptación:**
- DADO que un docente crea un evento PME, CUANDO guarda el formulario, ENTONCES se crea un documento en `eventos/{eventoId}` con `schoolId` del docente autenticado.
- DADO que un director consulta los eventos de su colegio, ENTONCES solo ve eventos donde `eventos.schoolId == usuario.schoolId`.
- DADO que el admin_global consulta eventos, ENTONCES puede ver eventos de todos los colegios.
- DADO que dos colegios distintos tienen eventos, ENTONCES un director del colegio A no puede leer eventos del colegio B (verificado por reglas Firestore).

#### 2.3 Aislamiento de datos por colegio

**Como** sistema,
**quiero** que las reglas de seguridad de Firestore refuercen el aislamiento por colegio,
**para** que la seguridad no dependa solo del código cliente.

**Criterios de aceptación:**
- DADO que las reglas de Firestore están desplegadas, CUANDO un usuario autenticado intenta leer un evento de otro colegio directamente via SDK, ENTONCES Firestore retorna error `permission-denied`.
- DADO que un docente intenta crear un evento con un `schoolId` diferente al suyo, ENTONCES Firestore rechaza la escritura.

---

### 3. Calidad de Código — Módulos ES6

#### 3.1 Refactorizar a módulos ES6

**Como** desarrollador,
**quiero** que el código JavaScript use módulos ES6 con imports/exports explícitos,
**para** eliminar las variables globales `window.EdugestXxx` y mejorar la mantenibilidad.

**Criterios de aceptación:**
- DADO que se implementan los módulos, ENTONCES `window.EdugestAuth`, `window.EdugestRoles`, `window.EdugestSchools` no son necesarios para las páginas refactorizadas.
- DADO que una página HTML carga un módulo, ENTONCES usa `<script type="module" src="...">` y el módulo importa solo sus dependencias directas.
- DADO que el módulo `auth.module.js` exporta `login`, `logout`, `getCurrentUser`, ENTONCES estas funciones son importables por otros módulos sin acceder a `window`.

#### 3.2 Consolidar documentación

**Como** desarrollador,
**quiero** que los ~70 archivos `.md` sueltos en la raíz sean consolidados o eliminados,
**para** que el repositorio sea navegable.

**Criterios de aceptación:**
- DADO que se completa la consolidación, ENTONCES la raíz del proyecto contiene máximo 3 archivos `.md` (README.md, CHANGELOG.md, CONTRIBUTING.md).
- DADO que existe documentación relevante en los `.md` actuales, ENTONCES se migra al directorio `docs/` antes de eliminar los archivos originales.

---

### 4. Nuevas Funcionalidades

#### 4.1 Exportar informes PME a PDF

**Como** director,
**quiero** exportar el informe PME de mi colegio a PDF,
**para** presentarlo en reuniones o enviarlo a la DAEM.

**Criterios de aceptación:**
- DADO que el director está en el dashboard con eventos cargados, CUANDO hace clic en "Exportar PDF", ENTONCES se descarga un archivo PDF con nombre `PME_{NombreColegio}_{Fecha}.pdf`.
- DADO que el director aplicó filtros antes de exportar, ENTONCES el PDF contiene solo los eventos que pasan los filtros activos.
- DADO que el PDF se genera, ENTONCES incluye: portada con nombre del colegio y RBD, tabla de eventos con columnas (área, acción, responsable, estado, meta, % éxito), y estadísticas resumen.
- DADO que jsPDF no está cargado aún, CUANDO el usuario solicita el PDF, ENTONCES se carga dinámicamente (lazy loading) antes de generar el documento.

#### 4.2 Notificaciones push con Firebase Cloud Messaging

**Como** docente o director,
**quiero** recibir notificaciones push en el browser cuando hay cambios relevantes en el PME,
**para** estar informado sin tener que revisar la aplicación constantemente.

**Criterios de aceptación:**
- DADO que el usuario accede por primera vez, CUANDO el sistema solicita permiso de notificaciones, ENTONCES el usuario puede aceptar o rechazar sin que esto bloquee el uso de la aplicación.
- DADO que el usuario aceptó notificaciones, CUANDO se crea un nuevo evento en su colegio, ENTONCES recibe una notificación push con título y descripción del evento.
- DADO que el usuario tiene la aplicación abierta, CUANDO llega una notificación, ENTONCES se muestra como un toast en la UI (no como notificación del sistema operativo).
- DADO que el usuario tiene la aplicación cerrada, CUANDO llega una notificación, ENTONCES el Service Worker la muestra como notificación nativa del browser.
- DADO que el usuario hace clic en la notificación, ENTONCES es dirigido a la página del evento correspondiente.

#### 4.3 Historial de cambios por evento

**Como** director,
**quiero** ver quién modificó cada evento PME y qué cambió,
**para** tener trazabilidad de las modificaciones del plan.

**Criterios de aceptación:**
- DADO que un docente modifica un evento, CUANDO guarda los cambios, ENTONCES se crea automáticamente una entrada en `eventos/{eventoId}/historial/` con: timestamp, nombre del usuario, campos modificados, valor anterior y valor nuevo.
- DADO que el director abre la ficha de un evento, CUANDO hace clic en "Ver historial", ENTONCES se muestra una lista cronológica de cambios con fecha, usuario y descripción del cambio.
- DADO que un evento fue creado, ENTONCES el historial incluye la entrada de creación como primer registro.
- DADO que el historial tiene más de 20 entradas, ENTONCES se muestran las 20 más recientes con opción de cargar más.

#### 4.4 Filtros avanzados en dashboard

**Como** director o admin_global,
**quiero** filtrar los eventos del dashboard por área, responsable, estado y rango de fechas,
**para** analizar el avance del PME por dimensiones específicas.

**Criterios de aceptación:**
- DADO que el usuario está en el dashboard, ENTONCES ve un panel de filtros con: selector de área (Currículum/Liderazgo/Convivencia/Recursos), selector de responsable (lista de docentes del colegio), selector de estado (pendiente/en progreso/completado/cancelado), y selector de rango de fechas (fecha inicio y fecha fin).
- DADO que el usuario selecciona uno o más filtros, CUANDO cambia cualquier filtro, ENTONCES la tabla y los gráficos se actualizan inmediatamente sin recargar la página.
- DADO que el usuario aplica filtros, ENTONCES los parámetros de filtro se reflejan en la URL para permitir compartir la vista.
- DADO que el usuario limpia todos los filtros, ENTONCES se muestran todos los eventos del colegio.
- DADO que ningún evento coincide con los filtros activos, ENTONCES se muestra el mensaje "No hay eventos que coincidan con los filtros seleccionados".

---

## Requerimientos No Funcionales

### NF-1 Compatibilidad de browser
El sistema debe funcionar en Chrome 90+, Firefox 88+, Safari 14+ y Edge 90+. No se requiere soporte para IE11.

### NF-2 Tiempo de carga
La carga inicial de cualquier página no debe superar 3 segundos en una conexión de 10 Mbps. jsPDF se carga solo bajo demanda.

### NF-3 Sin bundler en producción
El sistema no introduce Webpack, Vite ni ningún bundler en el flujo de producción. Los módulos ES6 se cargan nativamente con `type="module"`.

### NF-4 Compatibilidad con chat existente
El módulo de chat (`js/chat-firebase.js`, `js/chat.js`) que usa Firebase Realtime DB no debe ser modificado. Los nuevos módulos usan Firestore y no interfieren con el chat.

### NF-5 Datos de prueba
Durante el desarrollo, el script `scripts/migrate-to-firestore.js` puede poblar el Firebase Emulator con los datos actuales de `DEMO_USERS` y `SCHOOLS_DATA` para facilitar el testing.
