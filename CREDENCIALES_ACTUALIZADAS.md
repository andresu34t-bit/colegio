# 🔐 Credenciales Actualizadas - Sistema Multi-Colegio

## ⚠️ ¿Problemas para iniciar sesión?

Si ves "Email o contraseña incorrectos", sigue estos pasos:

### Solución Rápida:
1. Abre: **http://localhost:3000/reset.html**
2. Click en "🔄 Resetear Sistema y Cargar Datos Demo"
3. Vuelve al login: **http://localhost:3000**
4. Usa cualquiera de las credenciales de abajo

---

## 📧 CREDENCIALES DISPONIBLES

### Opción 1: Credenciales Simples (Recomendado)

**Director:**
```
Email:    director@edugest.cl
Password: EduGest2026
```

**Docente:**
```
Email:    docente@edugest.cl
Password: Docente2026
```

---

### Opción 2: Liceo Gabriela Mistral

**Director (acceso total):**
```
Email:    director@mistral.cl
Password: Director2026
```

**Docente (sin finanzas):**
```
Email:    docente@mistral.cl
Password: Docente2026
```

**UTP (con finanzas):**
```
Email:    utp@mistral.cl
Password: UTP2026
```

---

### Opción 3: Colegio Pablo Neruda

**Director:**
```
Email:    director@neruda.cl
Password: Director2026
```

**Docente:**
```
Email:    docente@neruda.cl
Password: Docente2026
```

---

## 🔧 Herramienta de Diagnóstico

Si tienes problemas, usa la página de reset:

```
http://localhost:3000/reset.html
```

Esta página te muestra:
- ✅ Cuántos usuarios están registrados
- ✅ Lista completa de emails y contraseñas
- ✅ Botón para resetear el sistema

---

## 🚀 Pasos para Probar

### 1. Resetear Sistema (si es necesario)
```
http://localhost:3000/reset.html
```
Click en "Resetear Sistema"

### 2. Ir al Login
```
http://localhost:3000
```

### 3. Usar Credenciales
```
Email:    director@edugest.cl
Password: EduGest2026
```

### 4. Explorar
- Dashboard con gráficos
- Registrar eventos
- Ver finanzas (solo director)

---

## 💡 Consejos

### Si el login no funciona:

1. **Abre la consola del navegador** (F12)
2. Ve a la pestaña "Console"
3. Busca mensajes como:
   - "✅ Datos demo inicializados"
   - "📧 Usuarios disponibles:"
4. Verás la lista de emails y contraseñas disponibles

### Resetear manualmente:

Abre la consola (F12) y ejecuta:
```javascript
localStorage.clear();
location.reload();
```

Luego vuelve a cargar la página y los datos demo se crearán automáticamente.

---

## 📊 Diferencias entre Roles

| Rol | Dashboard | Eventos | Finanzas |
|-----|-----------|---------|----------|
| **Director** | ✅ | ✅ | ✅ |
| **UTP** | ✅ | ✅ | ✅ |
| **Docente** | ✅ | ✅ | ❌ |

---

## 🎯 Pruebas Recomendadas

### Test 1: Login como Director
```
1. Email: director@edugest.cl
2. Password: EduGest2026
3. Verás: Dashboard + Finanzas disponible
```

### Test 2: Login como Docente
```
1. Email: docente@edugest.cl
2. Password: Docente2026
3. Verás: Dashboard (sin opción de Finanzas)
4. Si intentas acceder a finanzas: Bloqueado
```

### Test 3: Separación de Colegios
```
1. Login: director@mistral.cl
2. Registra un evento
3. Cierra sesión
4. Login: director@neruda.cl
5. NO verás los eventos de Mistral
```

---

## 🆘 Solución de Problemas

### Problema: "Email o contraseña incorrectos"

**Solución 1:** Usa reset.html
```
http://localhost:3000/reset.html
```

**Solución 2:** Verifica que estés escribiendo correctamente:
- Email: `director@edugest.cl` (todo en minúsculas)
- Password: `EduGest2026` (con mayúsculas en E y G)

**Solución 3:** Abre consola (F12) y verifica los usuarios:
```javascript
console.log(JSON.parse(localStorage.getItem('usuarios')));
```

---

## ✅ Resumen Rápido

**URL del sistema:**
```
http://localhost:3000
```

**Credenciales más simples:**
```
director@edugest.cl / EduGest2026
docente@edugest.cl / Docente2026
```

**Página de ayuda:**
```
http://localhost:3000/reset.html
```

---

**¡El sistema está funcionando! Si tienes problemas, usa reset.html para reiniciar.** 🚀
