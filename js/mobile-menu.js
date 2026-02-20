// Mobile Menu Handler
document.addEventListener('DOMContentLoaded', function() {
    // Crear botón hamburguesa si no existe
    if (window.innerWidth <= 1024 && !document.querySelector('.mobile-menu-btn')) {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '☰';
        menuBtn.setAttribute('aria-label', 'Abrir menú');
        document.body.appendChild(menuBtn);
        
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        
        const sidebar = document.querySelector('.sidebar');
        
        // Toggle menu
        menuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            menuBtn.innerHTML = sidebar.classList.contains('active') ? '✕' : '☰';
        });
        
        // Cerrar con overlay
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            menuBtn.innerHTML = '☰';
        });
        
        // Cerrar al hacer click en un nav-item
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    menuBtn.innerHTML = '☰';
                }
            });
        });
    }
    
    // Botón flotante de volver (solo en páginas internas)
    if (window.innerWidth <= 768 && window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
        const backBtn = document.createElement('button');
        backBtn.className = 'mobile-nav-fab back-btn';
        backBtn.innerHTML = '←';
        backBtn.setAttribute('aria-label', 'Volver');
        backBtn.onclick = function() {
            window.history.back();
        };
        document.body.appendChild(backBtn);
    }
    
    // Botón flotante de menú rápido
    if (window.innerWidth <= 768) {
        const fabMenu = document.createElement('button');
        fabMenu.className = 'mobile-nav-fab menu-btn';
        fabMenu.innerHTML = '⋮';
        fabMenu.setAttribute('aria-label', 'Menú rápido');
        document.body.appendChild(fabMenu);
        
        // Crear menú rápido
        const quickMenu = document.createElement('div');
        quickMenu.className = 'mobile-quick-menu';
        quickMenu.innerHTML = `
            <a href="dashboard.html" class="mobile-quick-menu-item">
                <span>📊</span>
                <span>Dashboard</span>
            </a>
            <a href="areas.html" class="mobile-quick-menu-item">
                <span>📝</span>
                <span>Registrar Evento</span>
            </a>
            <a href="informes.html" class="mobile-quick-menu-item">
                <span>📄</span>
                <span>Informes</span>
            </a>
            <a href="seo-dashboard.html" class="mobile-quick-menu-item">
                <span>👨‍🏫</span>
                <span>Observaciones</span>
            </a>
        `;
        document.body.appendChild(quickMenu);
        
        // Toggle menú rápido
        fabMenu.addEventListener('click', function() {
            quickMenu.classList.toggle('active');
            fabMenu.innerHTML = quickMenu.classList.contains('active') ? '✕' : '⋮';
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!fabMenu.contains(e.target) && !quickMenu.contains(e.target)) {
                quickMenu.classList.remove('active');
                fabMenu.innerHTML = '⋮';
            }
        });
    }
    
    // Breadcrumb móvil
    if (window.innerWidth <= 768) {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            const breadcrumb = document.createElement('div');
            breadcrumb.className = 'mobile-breadcrumb';
            
            const pageName = document.title.split(' - ')[0];
            breadcrumb.innerHTML = `
                <a href="dashboard.html">🏠 Inicio</a>
                <span>›</span>
                <span>${pageName}</span>
            `;
            
            mainContent.insertBefore(breadcrumb, mainContent.firstChild);
        }
    }
    
    // Swipe para abrir sidebar
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (touchEndX - touchStartX > 100 && touchStartX < 50) {
            // Swipe derecha desde el borde izquierdo - abrir sidebar
            if (sidebar && !sidebar.classList.contains('active')) {
                sidebar.classList.add('active');
                overlay.classList.add('active');
                if (menuBtn) menuBtn.innerHTML = '✕';
            }
        } else if (touchStartX - touchEndX > 100 && sidebar && sidebar.classList.contains('active')) {
            // Swipe izquierda - cerrar sidebar
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            if (menuBtn) menuBtn.innerHTML = '☰';
        }
    }
    
    // Ajustar en resize
    window.addEventListener('resize', function() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth > 1024) {
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            if (menuBtn) menuBtn.innerHTML = '☰';
        }
    });
    
    // Toast notification helper
    window.showMobileToast = function(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'mobile-toast show';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() {
                toast.remove();
            }, 300);
        }, duration);
    };
});
