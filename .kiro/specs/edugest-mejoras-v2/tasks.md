# Plan de Tareas: EDUGEST Mejoras v2

## Tareas de Implementación

- [ ] 1. Configurar Firebase y estructura base
  - [ ] 1.1 Completar `js/firebase-config.js` con credenciales reales desde `.env` (reemplazar placeholders "TU_API_KEY" etc.)
  - [ ] 1.2 Crear `firestore.rules` con reglas de aislamiento por colegio (colecciones: users, schools, eventos, notificaciones)
  - [ ] 1.3 Crear `firestore.indexes.json` con índices compuestos para `(schoolId, estado)` y `(schoolId, area, fechaInicio)`
  - [ ] 1.4 Crear `firebase-messaging-sw.js` en la raíz para soporte de notificaciones push en segundo plano

- [ ] 2. Módulo de autenticación (`js/modules/auth.module.js`)
  - [ ] 2.1 Implementar `login(email, password)` usando `signInWithEmailAndPassword` de Firebase Auth
  - [ ] 2.2 Implementar `logout()` usando `signOut` y limpiando sessionStorage
  - [ ] 2.3 Implementar `getCurrentUser()` que lee desde sessionStorage con fallback a Firestore `users/{uid}`
  - [ ] 2.4 Implementar `requireAuth(requiredRole)` para protección de páginas
  - [ ] 2.5 Actualizar `login.html` para usar `auth.module.js` en lugar de `login-modern.js`
  - [ ] 2.6 Crear script de migración `scripts/migrate-to-firestore.js` que sube `DEMO_USERS` y `SCHOOLS_DATA` a Firebase Emulator

- [ ] 3. Módulo de roles (`js/modules/roles.module.js`)
  - [ ] 3.1 Refactorizar `js/roles-permissions.js` como módulo ES6 con exports explícitos (sin `window.EdugestRoles`)
  - [ ] 3.2 Exportar: `ROLES`, `hasPermission`, `canAccessModule`, `getRoleName`

- [ ] 4. Módulo de colegios y admin (`js/modules/admin.module.js`)
  - [ ] 4.1 Implementar `getAllSchools()` leyendo desde colección `schools` en Firestore
  - [ ] 4.2 Implementar `saveSchool(data)` para crear/actualizar colegios en Firestore
  - [ ] 4.3 Implementar `getUsersBySchool(schoolId)` leyendo desde colección `users`
  - [ ] 4.4 Implementar `createUser(data)` creando cuenta en Firebase Auth + documento en `users/{uid}`
  - [ ] 4.5 Implementar `toggleUserStatus(uid, active)` actualizando `users/{uid}.active`
  - [ ] 4.6 Actualizar `admin-global.html` para usar `admin.module.js` en lugar de datos hardcodeados de `admin-global.js`

- [ ] 5. Módulo PME (`js/modules/pme.module.js`)
  - [ ] 5.1 Implementar `crearEvento(data)` con `addDoc` a colección `eventos`, incluyendo `schoolId` del usuario autenticado
  - [ ] 5.2 Implementar `actualizarEvento(eventoId, cambios)` como transacción Firestore que actualiza el evento y crea entrada de historial
  - [ ] 5.3 Implementar `getEventos(filtros)` con query Firestore filtrada por `schoolId` del usuario
  - [ ] 5.4 Implementar `eliminarEvento(eventoId)` como soft delete (actualiza `estado` a "cancelado")
  - [ ] 5.5 Implementar `suscribirEventos(filtros, callback)` con `onSnapshot` para actualizaciones en tiempo real

- [ ] 6. Módulo de historial (`js/modules/historial.module.js`)
  - [ ] 6.1 Implementar `calcularDiff(anterior, nuevo)` que retorna `{ camposModificados, valorAnterior, valorNuevo }`
  - [ ] 6.2 Implementar `registrarCambio(eventoId, tipo, valorAnterior, valorNuevo)` con `addDoc` a subcolección `historial`
  - [ ] 6.3 Implementar `getHistorial(eventoId)` ordenado por timestamp descendente con `limit(20)`
  - [ ] 6.4 Agregar UI de historial en `pme-ficha.html`: botón "Ver historial" que abre panel lateral con lista de cambios

- [ ] 7. Módulo de filtros avanzados (`js/modules/filtros.module.js`)
  - [ ] 7.1 Implementar `aplicarFiltros(eventos, filtros)` como función pura sin mutación del array original
  - [ ] 7.2 Implementar `construirQuery(baseRef, filtros)` para queries Firestore con filtros combinados
  - [ ] 7.3 Implementar `filtrosToURL(filtros)` y `filtrosFromURL(searchParams)` para serialización en URL
  - [ ] 7.4 Agregar panel de filtros en `dashboard.html`: selectores de área, responsable, estado y rango de fechas
  - [ ] 7.5 Conectar cambios de filtros con actualización reactiva de tabla y gráficos (sin recarga de página)

- [ ] 8. Módulo de exportación PDF (`js/modules/pdf.module.js`)
  - [ ] 8.1 Implementar carga lazy de jsPDF desde CDN (`https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js`)
  - [ ] 8.2 Implementar `generarInformePME(schoolId, filtros)` con portada, tabla de eventos y estadísticas resumen
  - [ ] 8.3 Implementar `generarFichaEvento(eventoId)` para PDF de un evento individual
  - [ ] 8.4 Agregar botón "Exportar PDF" en `dashboard.html` y en `pme-ficha.html`

- [ ] 9. Módulo de notificaciones FCM (`js/modules/fcm.module.js`)
  - [ ] 9.1 Implementar `registrarDispositivo()` que solicita permiso y guarda token FCM en `users/{uid}.fcmToken`
  - [ ] 9.2 Implementar `onNotificacionRecibida(callback)` usando `onMessage` de Firebase Messaging para notificaciones en primer plano
  - [ ] 9.3 Implementar `getNoLeidas()` leyendo colección `notificaciones` donde `destinatario == uid && leida == false`
  - [ ] 9.4 Implementar `marcarLeida(notifId)` actualizando `notificaciones/{notifId}.leida = true`
  - [ ] 9.5 Agregar componente de notificaciones en el header del dashboard (ícono con badge de no leídas)
  - [ ] 9.6 Configurar `firebase-messaging-sw.js` para mostrar notificaciones nativas cuando la app está en segundo plano

- [ ] 10. Módulo de utilidades (`js/modules/utils.module.js`)
  - [ ] 10.1 Migrar funciones de `js/app.js` (formatNumber, formatDate, formatPercent, showNotification) como exports ES6
  - [ ] 10.2 Agregar `sanitizeHTML(input)` usando DOMPurify para sanitizar inputs antes de guardar en Firestore
  - [ ] 10.3 Agregar `validateFileUpload(file)` que verifica tipo MIME y tamaño máximo (10MB)

- [ ] 11. Consolidación de documentación
  - [ ] 11.1 Crear directorio `docs/` y mover contenido relevante de los archivos `.md` de la raíz
  - [ ] 11.2 Reescribir `README.md` con instrucciones de setup actualizadas (Firebase Emulator, variables de entorno)
  - [ ] 11.3 Eliminar archivos `.md` redundantes de la raíz (mantener solo README.md, CHANGELOG.md)

- [ ] 12. Testing
  - [ ] 12.1 Configurar Vitest con soporte para módulos ES6 (`vitest.config.js`)
  - [ ] 12.2 Escribir tests unitarios para `aplicarFiltros()` con casos: sin filtros, filtro único, múltiples filtros, sin resultados
  - [ ] 12.3 Escribir tests unitarios para `calcularDiff()` con casos: sin cambios, un campo, múltiples campos, campos anidados
  - [ ] 12.4 Escribir tests unitarios para `filtrosToURL()` / `filtrosFromURL()` verificando round-trip
  - [ ] 12.5 Escribir property-based tests con fast-check para `aplicarFiltros()` verificando idempotencia y monotonía
  - [ ] 12.6 Escribir property-based tests con fast-check para `calcularDiff()` verificando que captura exactamente los campos modificados
  - [ ] 12.7 Configurar Firebase Emulator Suite para tests de integración de reglas Firestore
