# 🔐 Credenciales de Acceso - EduGest

## 🏫 COLEGIO 1: San José

### 👔 Director - Colegio San José
```
Email:    director.sanjose@edugest.cl
Password: director123
```

**Datos del Colegio:**
- Nombre: Colegio San José
- ID: colegio-001
- Ubicación: Santiago Centro
- Tipo: Particular Subvencionado

**Permisos del Director:**
- ✅ Ver Dashboard completo con estadísticas
- ✅ Registrar eventos en las 4 áreas del PME
- ✅ Ver y gestionar finanzas
- ✅ Registrar gastos
- ✅ Generar informes PDF
- ✅ Chat con todos los usuarios del colegio
- ✅ Acceso a calendario completo
- ✅ Gestión de notificaciones

**Datos Disponibles:**
- **50 eventos PME** del Colegio San José
- **15 eventos de calendario**
- **12 notificaciones**
- **Estadísticas completas** por área
- **Gráficos interactivos**
- **3 docentes** del colegio

### 👨‍🏫 Docente - Colegio San José
```
Email:    docente1.sanjose@edugest.cl
Password: docente123
```

**Permisos:**
- ✅ Ver Dashboard
- ✅ Registrar Eventos
- ✅ Chat con equipo del colegio
- ❌ NO puede ver Finanzas

### 🔧 Técnico - Colegio San José
```
Email:    tecnico.sanjose@edugest.cl
Password: tecnico123
```

**Permisos:**
- ✅ Soporte técnico
- ✅ Chat con todos los usuarios del colegio
- ✅ Ver estadísticas
- ✅ Ayuda general

---

## 🏫 COLEGIO 2: Santa María

### 👔 Director - Colegio Santa María
```
Email:    director.santamaria@edugest.cl
Password: director456
```

**Datos del Colegio:**
- Nombre: Colegio Santa María
- ID: colegio-002
- Ubicación: Providencia
- Tipo: Particular Pagado

**Permisos del Director:**
- ✅ Ver Dashboard completo con estadísticas
- ✅ Registrar eventos en las 4 áreas del PME
- ✅ Ver y gestionar finanzas
- ✅ Registrar gastos
- ✅ Generar informes PDF
- ✅ Chat con todos los usuarios del colegio
- ✅ Acceso a calendario completo
- ✅ Gestión de notificaciones

**Datos Disponibles:**
- **50 eventos PME** del Colegio Santa María (diferentes a San José)
- **15 eventos de calendario**
- **12 notificaciones**
- **Estadísticas completas** por área
- **Gráficos interactivos**
- **3 docentes** del colegio

### 👨‍🏫 Docente - Colegio Santa María
```
Email:    docente1.santamaria@edugest.cl
Password: docente456
```

**Permisos:**
- ✅ Ver Dashboard
- ✅ Registrar Eventos
- ✅ Chat con equipo del colegio
- ❌ NO puede ver Finanzas

### 🔧 Técnico - Colegio Santa María
```
Email:    tecnico.santamaria@edugest.cl
Password: tecnico456
```

**Permisos:**
- ✅ Soporte técnico
- ✅ Chat con todos los usuarios del colegio
- ✅ Ver estadísticas
- ✅ Ayuda general

---

## 👨‍� ADMINISTRADOR GLOBAL

### Super Admin (Ve todos los colegios)
```
Email:    admin@edugest.cl
Password: admin123
```

**Permisos:**
- ✅ Acceso a todos los colegios
- ✅ Panel administrativo global
- ✅ Gestión de usuarios
- ✅ Estadísticas globales
- ✅ Ver datos de los 3 colegios

---

## 🎯 CÓMO PROBAR LA SEPARACIÓN DE DATOS

### Prueba 1: Login con Colegio San José

1. **Iniciar sesión:**
   ```
   Email: director.sanjose@edugest.cl
   Password: director123
   ```

2. **Verificar datos:**
   - Dashboard muestra eventos del Colegio San José
   - Chat solo muestra usuarios del Colegio San José
   - Calendario con eventos del Colegio San José
   - Notificaciones específicas del colegio

3. **Cerrar sesión**

### Prueba 2: Login con Colegio Santa María

1. **Iniciar sesión:**
   ```
   Email: director.santamaria@edugest.cl
   Password: director456
   ```

2. **Verificar datos:**
   - Dashboard muestra eventos DIFERENTES (Colegio Santa María)
   - Chat solo muestra usuarios del Colegio Santa María
   - Calendario con eventos del Colegio Santa María
   - Notificaciones específicas del colegio

3. **Comparar:**
   - Los datos son completamente diferentes
   - No hay cruce de información entre colegios
   - Cada colegio tiene su propio conjunto de datos

### Prueba 3: Comparar Lado a Lado

```bash
# 1. Abrir en navegador normal
Login: director.sanjose@edugest.cl

# 2. Abrir en modo incógnito
Login: director.santamaria@edugest.cl

# 3. Comparar
- Datos completamente diferentes
- Sin cruce de información
- Chat separado por colegio
```

---

## 📋 TABLA RESUMEN DE CUENTAS

| Colegio | Rol | Email | Password |
|---------|-----|-------|----------|
| **San José** | Director | director.sanjose@edugest.cl | director123 |
| San José | Docente | docente1.sanjose@edugest.cl | docente123 |
| San José | Técnico | tecnico.sanjose@edugest.cl | tecnico123 |
| **Santa María** | Director | director.santamaria@edugest.cl | director456 |
| Santa María | Docente | docente1.santamaria@edugest.cl | docente456 |
| Santa María | Técnico | tecnico.santamaria@edugest.cl | tecnico456 |
| **Global** | Admin | admin@edugest.cl | admin123 |

---

## 📊 DATOS POR COLEGIO

### Colegio San José (colegio-001)
- **50 eventos PME** únicos
- **Currículum**: 18 eventos
- **Liderazgo**: 12 eventos
- **Convivencia**: 12 eventos
- **Recursos**: 8 eventos
- **Usuarios**: 6 (1 director, 3 docentes, 1 técnico, 1 admin)

### Colegio Santa María (colegio-002)
- **50 eventos PME** únicos (diferentes a San José)
- **Currículum**: 18 eventos
- **Liderazgo**: 12 eventos
- **Convivencia**: 12 eventos
- **Recursos**: 8 eventos
- **Usuarios**: 6 (1 director, 3 docentes, 1 técnico, 1 admin)

### Total Global
- **100 eventos PME** (50 por colegio)
- **30 eventos de calendario** (15 por colegio)
- **40+ notificaciones**
- **12 usuarios** activos
- **2 colegios** independientes

---

## 💬 CHAT - SEPARACIÓN POR COLEGIO

### Colegio San José
**Usuarios que pueden chatear entre sí:**
- Director San José
- Docente 1 San José
- Docente 2 San José
- Docente 3 San José
- Técnico San José
- Admin San José

**NO pueden chatear con:**
- Usuarios del Colegio Santa María

### Colegio Santa María
**Usuarios que pueden chatear entre sí:**
- Director Santa María
- Docente 1 Santa María
- Docente 2 Santa María
- Docente 3 Santa María
- Técnico Santa María
- Admin Santa María

**NO pueden chatear con:**
- Usuarios del Colegio San José

### Admin Global
**Puede chatear con:**
- Todos los usuarios de todos los colegios

---

## 🚀 INICIO RÁPIDO

### Opción 1: Probar Colegio San José
```bash
# 1. Abrir navegador
http://localhost:8080

# 2. Login
Email: director.sanjose@edugest.cl
Password: director123

# 3. Explorar
- Ver Dashboard con datos de San José
- Registrar eventos
- Usar chat con usuarios de San José
```

### Opción 2: Probar Colegio Santa María
```bash
# 1. Cerrar sesión del Colegio San José

# 2. Login
Email: director.santamaria@edugest.cl
Password: director456

# 3. Explorar
- Ver Dashboard con datos DIFERENTES
- Datos de Santa María
- Chat con usuarios de Santa María
```

---

## 🔍 VERIFICAR SEPARACIÓN DE DATOS

### En Consola del Navegador (F12)

```javascript
// Ver datos del colegio actual
const session = JSON.parse(localStorage.getItem('edugest_session'));
console.log('Colegio:', session.schoolId);
console.log('Usuario:', session.userName);

// Ver eventos del colegio
const eventos = JSON.parse(localStorage.getItem(`edugest_events_${session.schoolId}`));
console.log('Eventos:', eventos.length);

// Ver usuarios del chat
const chatUsers = JSON.parse(localStorage.getItem('chat_demo_users'));
const miColegio = chatUsers.filter(u => u.schoolId === session.schoolId);
console.log('Usuarios de mi colegio:', miColegio);
```

---

## � ALMACEuNAMIENTO POR COLEGIO

Los datos se guardan separados por colegio:

```
localStorage:
  - edugest_events_colegio-001     → Eventos San José
  - edugest_events_colegio-002     → Eventos Santa María
  - edugest_calendar_colegio-001   → Calendario San José
  - edugest_calendar_colegio-002   → Calendario Santa María
  - chat_demo_users                → Todos los usuarios (filtrados por schoolId)
  - chat_demo_messages             → Mensajes (filtrados por schoolId)
```

---

## ✅ VENTAJAS DEL SISTEMA MULTI-COLEGIO

- ✅ **Separación total** - Cada colegio ve solo sus datos
- ✅ **Chat aislado** - Solo chatean usuarios del mismo colegio
- ✅ **Datos independientes** - 50 eventos únicos por colegio
- ✅ **Seguridad** - No hay cruce de información
- ✅ **Escalable** - Fácil agregar más colegios
- ✅ **Admin global** - Puede ver todos los colegios
- ✅ **Realista** - Simula un sistema SaaS real

---

## 🎉 ¡LISTO PARA PROBAR!

**Prueba recomendada:**

1. Login como Director San José
2. Ver datos y registrar un evento
3. Cerrar sesión
4. Login como Director Santa María
5. Ver que los datos son completamente diferentes
6. ¡Comprueba la separación total!

---

**¡Disfruta probando el sistema multi-colegio! 🏫🚀**

*Última actualización: Marzo 2026*
