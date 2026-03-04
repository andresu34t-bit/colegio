# 📦 INSTALACIÓN Y DESPLIEGUE - EDUGEST

## 🎯 Guía Completa para Poner en Marcha el Sistema

---

## 🚀 OPCIÓN 1: Uso Local (Desarrollo)

### Requisitos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- No requiere servidor web (funciona con file://)
- No requiere instalación de dependencias

### Pasos

1. **Descargar o Clonar el Proyecto**
   ```bash
   # Si tienes Git
   git clone [url-del-repositorio]
   
   # O simplemente descargar el ZIP y extraer
   ```

2. **Abrir el Sistema**
   - Navegar a la carpeta del proyecto
   - Hacer doble clic en `index.html`
   - O abrir `INICIO-RAPIDO.html` directamente

3. **Cargar Datos de Prueba**
   - Hacer clic en "Cargar Datos de Prueba"
   - O abrir consola (F12) y ejecutar:
     ```javascript
     EdugestDemoData.loadAllDemoData();
     ```

4. **Iniciar Sesión**
   - Usar cualquier usuario de prueba
   - Ejemplo: `admin@edugest.cl` / `admin123`

5. **¡Listo!** 🎉
   - El sistema está funcionando
   - Todos los datos se guardan en localStorage

---

## 🌐 OPCIÓN 2: Servidor Web Local

### Con Python (Recomendado)

```bash
# Python 3
cd ruta/al/proyecto
python -m http.server 8000

# Abrir en navegador
http://localhost:8000
```

### Con Node.js

```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar en la carpeta del proyecto
cd ruta/al/proyecto
http-server -p 8000

# Abrir en navegador
http://localhost:8000
```

### Con PHP

```bash
cd ruta/al/proyecto
php -S localhost:8000

# Abrir en navegador
http://localhost:8000
```

---

## ☁️ OPCIÓN 3: Despliegue en Producción

### 3.1 Netlify (Gratis y Fácil)

1. **Crear cuenta en Netlify**
   - Ir a https://netlify.com
   - Registrarse gratis

2. **Desplegar**
   - Arrastrar la carpeta del proyecto a Netlify
   - O conectar con GitHub
   - Netlify detecta automáticamente el sitio estático

3. **Configurar**
   - Netlify asigna un dominio automático
   - Opcional: configurar dominio personalizado

4. **¡Listo!**
   - El sitio está en línea
   - URL: `https://tu-sitio.netlify.app`

### 3.2 Vercel (Gratis y Rápido)

1. **Crear cuenta en Vercel**
   - Ir a https://vercel.com
   - Registrarse gratis

2. **Desplegar**
   ```bash
   # Instalar Vercel CLI
   npm i -g vercel
   
   # Desplegar
   cd ruta/al/proyecto
   vercel
   ```

3. **Seguir instrucciones**
   - Vercel hace el resto automáticamente

4. **¡Listo!**
   - URL: `https://tu-sitio.vercel.app`

### 3.3 GitHub Pages (Gratis)

1. **Subir a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [tu-repo]
   git push -u origin main
   ```

2. **Activar GitHub Pages**
   - Ir a Settings → Pages
   - Source: main branch
   - Guardar

3. **¡Listo!**
   - URL: `https://tu-usuario.github.io/tu-repo`

### 3.4 Servidor Propio (VPS)

#### Con Nginx

1. **Instalar Nginx**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Copiar archivos**
   ```bash
   sudo cp -r /ruta/al/proyecto/* /var/www/html/
   ```

3. **Configurar Nginx**
   ```nginx
   server {
       listen 80;
       server_name tu-dominio.com;
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Reiniciar Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

#### Con Apache

1. **Instalar Apache**
   ```bash
   sudo apt update
   sudo apt install apache2
   ```

2. **Copiar archivos**
   ```bash
   sudo cp -r /ruta/al/proyecto/* /var/www/html/
   ```

3. **Configurar .htaccess** (opcional)
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ index.html [L]
   ```

4. **Reiniciar Apache**
   ```bash
   sudo systemctl restart apache2
   ```

---

## 🔧 CONFIGURACIÓN AVANZADA

### Integrar con Backend Real

1. **Crear API REST**
   - Node.js + Express
   - Python + Django/Flask
   - PHP + Laravel
   - Java + Spring Boot

2. **Modificar archivos JS**
   - Reemplazar localStorage por llamadas API
   - Ejemplo en `js/roles-permissions.js`:
   
   ```javascript
   // Antes (localStorage)
   const stored = localStorage.getItem('edugest_session');
   
   // Después (API)
   const response = await fetch('/api/auth/session');
   const session = await response.json();
   ```

3. **Implementar autenticación JWT**
   ```javascript
   // Login
   const response = await fetch('/api/auth/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
   });
   const { token } = await response.json();
   localStorage.setItem('token', token);
   
   // Requests autenticados
   fetch('/api/events', {
       headers: { 'Authorization': `Bearer ${token}` }
   });
   ```

### Configurar Base de Datos

#### PostgreSQL (Recomendado)

```sql
-- Crear base de datos
CREATE DATABASE edugest;

-- Tabla de colegios
CREATE TABLE schools (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rbd VARCHAR(20) UNIQUE,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    school_id VARCHAR(50) REFERENCES schools(id),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de eventos
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    school_id VARCHAR(50) REFERENCES schools(id),
    area VARCHAR(100) NOT NULL,
    mes VARCHAR(20) NOT NULL,
    actividad TEXT NOT NULL,
    responsable VARCHAR(255),
    meta_esperada INTEGER,
    meta_alcanzada INTEGER,
    observaciones TEXT,
    fecha DATE,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_events_school ON events(school_id);
CREATE INDEX idx_events_fecha ON events(fecha);
CREATE INDEX idx_users_school ON users(school_id);
```

#### MySQL

```sql
-- Similar a PostgreSQL, ajustar tipos de datos
-- SERIAL → INT AUTO_INCREMENT
-- TEXT → TEXT o VARCHAR(max)
-- TIMESTAMP → DATETIME
```

### Configurar Servidor de Archivos

#### AWS S3

```javascript
// Instalar AWS SDK
// npm install aws-sdk

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

// Subir archivo
async function uploadFile(file, schoolId) {
    const params = {
        Bucket: 'edugest-documents',
        Key: `${schoolId}/${Date.now()}_${file.name}`,
        Body: file,
        ContentType: file.type
    };
    
    return await s3.upload(params).promise();
}
```

#### Cloudinary (Imágenes)

```javascript
// npm install cloudinary

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Subir imagen
async function uploadImage(file) {
    return await cloudinary.uploader.upload(file.path, {
        folder: 'edugest'
    });
}
```

---

## 🔒 SEGURIDAD EN PRODUCCIÓN

### 1. Variables de Entorno

Crear archivo `.env`:
```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=edugest
DB_USER=edugest_user
DB_PASSWORD=secure_password

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRATION=24h

# AWS
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
AWS_BUCKET=edugest-documents

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 2. HTTPS

```bash
# Con Let's Encrypt (Gratis)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
```

### 3. Firewall

```bash
# UFW (Ubuntu)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 4. Rate Limiting

```javascript
// Express.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // máximo 100 requests
});

app.use('/api/', limiter);
```

---

## 📊 MONITOREO

### Google Analytics

```html
<!-- En el <head> de todas las páginas -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry (Errores)

```html
<script src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"></script>
<script>
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    environment: 'production'
  });
</script>
```

---

## 🧪 TESTING

### Pruebas Manuales

1. **Login**
   - Probar con cada rol
   - Verificar redirección
   - Comprobar sesión persistente

2. **Dashboard**
   - Verificar KPIs
   - Comprobar gráficos
   - Probar filtros

3. **Notificaciones**
   - Crear notificación
   - Marcar como leída
   - Verificar badge

4. **Calendario**
   - Navegar entre meses
   - Ver eventos
   - Crear evento

5. **Documentos**
   - Subir archivo
   - Descargar archivo
   - Eliminar archivo

### Pruebas Automatizadas (Opcional)

```javascript
// Con Jest
npm install --save-dev jest

// test/auth.test.js
test('login con credenciales válidas', () => {
    const user = login('admin@edugest.cl', 'admin123');
    expect(user).toBeDefined();
    expect(user.role).toBe('admin_global');
});
```

---

## 📱 PWA (Progressive Web App)

### 1. Crear manifest.json

```json
{
  "name": "EDUGEST",
  "short_name": "EDUGEST",
  "description": "Sistema de Gestión Educativa",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Crear service-worker.js

```javascript
const CACHE_NAME = 'edugest-v1';
const urlsToCache = [
  '/',
  '/css/design-system.css',
  '/js/app.js',
  '/login.html',
  '/dashboard.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### 3. Registrar en HTML

```html
<link rel="manifest" href="/manifest.json">
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
</script>
```

---

## ✅ CHECKLIST DE DESPLIEGUE

- [ ] Código probado localmente
- [ ] Datos de prueba funcionando
- [ ] Variables de entorno configuradas
- [ ] Base de datos creada (si aplica)
- [ ] Servidor web configurado
- [ ] HTTPS habilitado
- [ ] Dominio configurado
- [ ] Firewall configurado
- [ ] Backups configurados
- [ ] Monitoreo activado
- [ ] Documentación actualizada

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "Cannot read property of undefined"
- Verificar que todos los scripts estén cargados
- Revisar orden de carga de scripts
- Comprobar consola del navegador

### Error: "Session not found"
- Limpiar localStorage
- Volver a cargar datos de prueba
- Verificar que el login funcione

### Error: "CORS policy"
- Configurar CORS en el servidor
- Usar proxy en desarrollo
- Verificar headers HTTP

### Archivos no se cargan
- Verificar rutas relativas
- Comprobar permisos de archivos
- Revisar configuración del servidor

---

## 📞 SOPORTE

Para más ayuda:
1. Revisar documentación completa
2. Verificar consola del navegador
3. Comprobar que los datos estén cargados
4. Limpiar caché y volver a intentar

---

**¡El sistema está listo para desplegarse! 🚀**
