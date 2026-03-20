// Sidebar Toggle - Menú hamburguesa responsive
// Activo en tablet (≤1024px) y móvil (≤768px)
(function() {
    'use strict';

    var BREAKPOINT = 1024; // px - sidebar oculto por debajo de este valor

    function init() {
        var sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        // Reutilizar o crear botón toggle
        var toggleBtn = document.querySelector('.sidebar-toggle') || document.querySelector('.mobile-menu-btn');
        if (!toggleBtn) {
            toggleBtn = document.createElement('button');
            toggleBtn.className = 'sidebar-toggle';
            toggleBtn.setAttribute('aria-label', 'Abrir menú');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.innerHTML = '<span aria-hidden="true">☰</span>';
            document.body.appendChild(toggleBtn);
        }

        // Reutilizar o crear overlay
        var overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            overlay.setAttribute('aria-hidden', 'true');
            document.body.appendChild(overlay);
        }

        function openSidebar() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            toggleBtn.setAttribute('aria-expanded', 'true');
            toggleBtn.querySelector('span').textContent = '✕';
            document.body.style.overflow = 'hidden';
        }

        function closeSidebar() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.querySelector('span').textContent = '☰';
            document.body.style.overflow = '';
        }

        function toggleSidebar() {
            sidebar.classList.contains('active') ? closeSidebar() : openSidebar();
        }

        // Eventos
        toggleBtn.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', closeSidebar);

        // Cerrar al navegar en mobile/tablet
        sidebar.querySelectorAll('.nav-item').forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= BREAKPOINT) closeSidebar();
            });
        });

        // Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) closeSidebar();
        });

        // Al pasar a desktop, cerrar sidebar y restaurar scroll
        var resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > BREAKPOINT) closeSidebar();
            }, 200);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
