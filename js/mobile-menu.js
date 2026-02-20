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
});
