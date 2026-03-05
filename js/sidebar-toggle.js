// Sidebar Toggle - Menú hamburguesa para móvil
(function() {
    'use strict';
    
    // Crear botón de toggle si no existe
    function createToggleButton() {
        if (document.querySelector('.sidebar-toggle')) return;
        
        const button = document.createElement('button');
        button.className = 'sidebar-toggle';
        button.setAttribute('aria-label', 'Abrir menú');
        button.innerHTML = '<span>☰</span>';
        
        document.body.appendChild(button);
        
        return button;
    }
    
    // Crear overlay si no existe
    function createOverlay() {
        if (document.querySelector('.sidebar-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        
        document.body.appendChild(overlay);
        
        return overlay;
    }
    
    // Inicializar sidebar toggle
    function initSidebarToggle() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;
        
        const toggleBtn = createToggleButton();
        const overlay = createOverlay();
        
        // Toggle sidebar
        function toggleSidebar() {
            const isActive = sidebar.classList.contains('active');
            
            if (isActive) {
                closeSidebar();
            } else {
                openSidebar();
            }
        }
        
        // Abrir sidebar
        function openSidebar() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            toggleBtn.setAttribute('aria-label', 'Cerrar menú');
            toggleBtn.querySelector('span').textContent = '✕';
            document.body.style.overflow = 'hidden';
        }
        
        // Cerrar sidebar
        function closeSidebar() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            toggleBtn.setAttribute('aria-label', 'Abrir menú');
            toggleBtn.querySelector('span').textContent = '☰';
            document.body.style.overflow = '';
        }
        
        // Event listeners
        toggleBtn.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', closeSidebar);
        
        // Cerrar al hacer click en un link (móvil)
        const navLinks = sidebar.querySelectorAll('.nav-item');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            });
        });
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
        
        // Cerrar sidebar al cambiar a desktop
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768) {
                    closeSidebar();
                }
            }, 250);
        });
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebarToggle);
    } else {
        initSidebarToggle();
    }
})();
