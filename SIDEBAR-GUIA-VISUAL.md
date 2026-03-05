# 🎨 Sidebar - Guía Visual Rápida

## 📱 Vista en Diferentes Dispositivos

### Desktop (> 1024px)

```
┌────────────────────────────────────────────────────────┐
│ ┌──────────────┐                                       │
│ │              │                                       │
│ │   [LOGO]     │     CONTENIDO PRINCIPAL              │
│ │              │                                       │
│ │   EDUGEST    │     Dashboard, gráficos, etc.        │
│ │              │                                       │
│ │ ┌──────────┐ │                                       │
│ │ │ AVATAR   │ │                                       │
│ │ └──────────┘ │                                       │
│ │ María G.     │                                       │
│ │ DIRECTOR     │                                       │
│ │              │                                       │
│ │ MÓDULO PME   │                                       │
│ │ 📊 Dashboard │                                       │
│ │ ⚙️ Config    │                                       │
│ │ 📝 Eventos   │                                       │
│ │              │                                       │
│ │ COMUNICACIÓN │                                       │
│ │ 💬 Chat  [2] │                                       │
│ │ 🔔 Notif     │                                       │
│ │              │                                       │
│ │ 🚪 Salir     │                                       │
│ └──────────────┘                                       │
│    280px              Resto de la pantalla             │
└────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1024px)

```
┌──────────────────────────────────────────────┐
│ ┌────────────┐                               │
│ │            │                               │
│ │  [LOGO]    │   CONTENIDO                  │
│ │            │                               │
│ │  EDUGEST   │   Adaptado                   │
│ │            │                               │
│ │ [AVATAR]   │                               │
│ │ María G.   │                               │
│ │ DIRECTOR   │                               │
│ │            │                               │
│ │ 📊 Dash    │                               │
│ │ 💬 Chat    │                               │
│ │            │                               │
│ │ 🚪 Salir   │                               │
│ └────────────┘                               │
│    240px         Resto                       │
└──────────────────────────────────────────────┘
```

### Móvil (< 768px)

**Cerrado:**
```
┌────────────────────────────┐
│ ☰                          │
│                            │
│    CONTENIDO COMPLETO      │
│                            │
│    Sin sidebar visible     │
│                            │
│                            │
└────────────────────────────┘
```

**Abierto:**
```
┌────────────────────────────┐
│ ┌──────────────┐ ✕         │
│ │              │░░░░░░░░░░░│
│ │   [LOGO]     │░ Overlay ░│
│ │              │░  Oscuro ░│
│ │   EDUGEST    │░░░░░░░░░░░│
│ │              │░░░░░░░░░░░│
│ │ [AVATAR]     │░░░░░░░░░░░│
│ │ María G.     │░░░░░░░░░░░│
│ │              │░░░░░░░░░░░│
│ │ 📊 Dashboard │░░░░░░░░░░░│
│ │ 💬 Chat      │░░░░░░░░░░░│
│ │              │░░░░░░░░░░░│
│ │ 🚪 Salir     │░░░░░░░░░░░│
│ └──────────────┘░░░░░░░░░░░│
│    280px                    │
└────────────────────────────┘
```

---

## 🎨 Elementos del Sidebar

### 1. Header

```
┌─────────────────────────┐
│                         │
│      ┌─────────┐        │
│      │         │        │
│      │  LOGO   │        │  64x64px
│      │ 64x64   │        │  Border radius: 14px
│      │         │        │  Sombra azul
│      └─────────┘        │
│                         │
│       EDUGEST           │  Font: 22px
│                         │  Peso: 800
│                         │  Degradado blanco-azul
└─────────────────────────┘
```

### 2. Usuario

```
┌─────────────────────────┐
│                         │
│       ┌───────┐         │
│       │   M   │         │  56x56px
│       │ 56x56 │         │  Circular
│       └───────┘         │  Degradado azul-morado
│                         │
│   María González        │  Font: 15px, Peso: 600
│      DIRECTOR           │  Font: 13px, Uppercase
│                         │
└─────────────────────────┘
```

### 3. Nav Item

```
┌─────────────────────────┐
│ │ 📊  Dashboard PME     │  Altura: 44px
│ │                       │  Padding: 10px 20px
│ │                       │  Gap: 14px
│ │                       │  Border radius: 10px
└─────────────────────────┘
  ↑
  Indicador 4px (activo)
```

### 4. Nav Item con Badge

```
┌─────────────────────────┐
│ │ 💬  Chat Interno  [2] │  Badge: 20px min
│ │                       │  Color: rojo
│ │                       │  Sombra
└─────────────────────────┘
```

### 5. Botón Logout

```
┌─────────────────────────┐
│                         │
│  🚪  Cerrar Sesión      │  Altura: 44px
│                         │  Border: 2px rojo
│                         │  Hover: fondo rojo
└─────────────────────────┘
```

---

## 🎯 Estados Visuales

### Normal

```
┌─────────────────────────┐
│   📊  Dashboard PME     │  Color: rgba(255,255,255,0.85)
│                         │  Fondo: transparente
└─────────────────────────┘
```

### Hover

```
┌─────────────────────────┐
│ │ 📊  Dashboard PME  →  │  Color: #ffffff
│ │                       │  Fondo: rgba(255,255,255,0.06)
└─────────────────────────┘  Transform: translateX(2px)
  ↑
  Indicador 60%
```

### Activo

```
┌─────────────────────────┐
│█│ 📊  Dashboard PME     │  Color: #ffffff
│█│                       │  Fondo: rgba(59,130,246,0.12)
└─────────────────────────┘  Peso: 600
  ↑
  Indicador 100%
```

---

## 📏 Medidas Exactas

### Espaciado

```
Header padding:        28px 20px
Usuario padding:       20px 20px
Nav padding:           12px 0
Nav item padding:      10px 20px
Nav item margin:       0 8px
Footer padding:        20px 20px

Gap logo-texto:        12px
Gap avatar-nombre:     10px
Gap icono-texto:       14px
```

### Tamaños

```
Logo:                  64x64px
Avatar:                56x56px
Nav icon:              20x20px
Nav item height:       44px
Badge min-width:       20px
Toggle button:         44x44px
```

### Tipografía

```
EDUGEST:               22px / 800
Nombre usuario:        15px / 600
Rol usuario:           13px / 600
Sección título:        11px / 700
Nav item:              15px / 500
Nav item activo:       15px / 600
```

---

## 🎨 Paleta de Colores

### Fondo

```
Degradado:
  Inicio: #1a1d29
  Final:  #0f1117
```

### Texto

```
Principal:  rgba(255, 255, 255, 0.85)
Hover:      #ffffff
Muted:      rgba(255, 255, 255, 0.5)
```

### Acento

```
Azul:       #3b82f6
Hover bg:   rgba(255, 255, 255, 0.06)
Active bg:  rgba(59, 130, 246, 0.12)
```

### Bordes

```
Separador:  rgba(255, 255, 255, 0.08)
```

### Badges

```
Rojo:       #ef4444
Sombra:     rgba(239, 68, 68, 0.4)
```

---

## 🎬 Animaciones

### Sidebar Slide

```
Duración:   300ms
Easing:     cubic-bezier(0.4, 0, 0.2, 1)
Propiedad:  transform
```

### Nav Item Hover

```
Duración:   200ms
Easing:     cubic-bezier(0.4, 0, 0.2, 1)
Propiedades:
  - background
  - color
  - transform
```

### Indicador

```
Duración:   200ms
Easing:     cubic-bezier(0.4, 0, 0.2, 1)
Propiedad:  height
```

### Overlay Fade

```
Duración:   300ms
Easing:     ease
Propiedad:  opacity
```

---

## 📱 Interacciones Móvil

### Abrir Menú

```
1. Click en ☰
2. Sidebar slide in (300ms)
3. Overlay fade in (300ms)
4. Body scroll bloqueado
5. Botón cambia a ✕
```

### Cerrar Menú

```
1. Click en ✕ / overlay / link
2. Sidebar slide out (300ms)
3. Overlay fade out (300ms)
4. Body scroll desbloqueado
5. Botón cambia a ☰
```

### Tecla Escape

```
1. Presionar Escape
2. Cerrar menú (igual que click)
```

---

## 🎯 Puntos Clave

### ✅ Profesional

- Colores elegantes
- Tipografía clara
- Espaciado consistente
- Sombras sutiles

### ✅ Responsive

- Desktop: 280px fijo
- Tablet: 240px fijo
- Móvil: 280px colapsable

### ✅ Accesible

- Tamaños táctiles: 44px
- Contraste: WCAG AA
- Navegación por teclado
- ARIA labels

### ✅ Animado

- Transiciones suaves
- Hover effects
- Indicador activo
- Slide in/out

---

## 🚀 Cómo Probar

### Desktop

1. Abre en navegador (> 1024px)
2. Sidebar visible a la izquierda
3. Hover sobre items
4. Click para navegar

### Tablet

1. Redimensiona a 768-1024px
2. Sidebar reducido pero visible
3. Elementos más compactos

### Móvil

1. Redimensiona a < 768px
2. Sidebar oculto
3. Botón ☰ visible
4. Click para abrir
5. Click overlay para cerrar

---

## 📊 Comparación

### Antes

```
❌ Ancho fijo sin responsive
❌ Elementos desalineados
❌ Espaciado inconsistente
❌ No funciona en móvil
❌ Tipografía pequeña
```

### Ahora

```
✅ Responsive completo
✅ Elementos perfectamente alineados
✅ Espaciado uniforme
✅ Menú hamburguesa en móvil
✅ Tipografía legible
✅ Diseño profesional SaaS
```

---

**¡El sidebar ahora se ve profesional en todos los dispositivos!** 🎉
