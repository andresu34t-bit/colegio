// Mobile Menu Handler - Versión Mejorada
document.addEventListener('DOMContentLoaded', function() {
    // Crear botón hamburguesa si no existe
    if (!document.querySelector('.mobile-menu-btn')) {
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
        
        if (sidebar) {
            // Toggle menu
            menuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
                menuBtn.innerHTML = sidebar.classList.contains('active') ? '✕' : '☰';
                
                // Prevenir scroll del body cuando el menú está abierto
                if (sidebar.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Cerrar con overlay
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                menuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            });
            
            // Cerrar al hacer click en un nav-item
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (window.innerWidth <= 1024) {
                        sidebar.classList.remove('active');
                        overlay.classList.remove('active');
                        menuBtn.innerHTML = '☰';
                        document.body.style.overflow = '';
                    }
                });
            });
            
            // Cerrar con tecla ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    menuBtn.innerHTML = '☰';
                    document.body.style.overflow = '';
                }
            });
        }
    }
    
    // Swipe para abrir/cerrar sidebar
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (!sidebar) return;
        
        const swipeDistanceX = touchEndX - touchStartX;
        const swipeDistanceY = Math.abs(touchEndY - touchStartY);
        
        // Solo procesar si el swipe es más horizontal que vertical
        if (Math.abs(swipeDistanceX) > swipeDistanceY) {
            // Swipe derecha desde el borde izquierdo - abrir sidebar
            if (swipeDistanceX > 100 && touchStartX < 50 && !sidebar.classList.contains('active')) {
                sidebar.classList.add('active');
                if (overlay) overlay.classList.add('active');
                if (menuBtn) menuBtn.innerHTML = '✕';
                document.body.style.overflow = 'hidden';
            } 
            // Swipe izquierda - cerrar sidebar
            else if (swipeDistanceX < -100 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                if (menuBtn) menuBtn.innerHTML = '☰';
                document.body.style.overflow = '';
            }
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
            document.body.style.overflow = '';
        }
    });
    
    // Indicador visual de swipe (opcional)
    if (window.innerWidth <= 1024) {
        const swipeHint = document.createElement('div');
        swipeHint.className = 'swipe-indicator';
        swipeHint.innerHTML = '→';
        swipeHint.style.cssText = `
            position: fixed;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            color: rgba(99, 102, 241, 0.4);
            font-size: 32px;
            z-index: 100;
            pointer-events: none;
            animation: swipeHint 2s ease-in-out 3;
        `;
        document.body.appendChild(swipeHint);
        
        // Ocultar después de 6 segundos
        setTimeout(() => {
            swipeHint.style.display = 'none';
        }, 6000);
        
        // Ocultar al interactuar
        document.addEventListener('touchstart', function() {
            swipeHint.style.display = 'none';
        }, { once: true });
    }
    
    // Toast notification helper
    window.showMobileToast = function(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'mobile-toast show';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(31, 41, 55, 0.95);
            color: white;
            padding: 12px 24px;
            border-radius: 24px;
            font-size: 14px;
            font-weight: 600;
            z-index: 10001;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            animation: toastSlideUp 0.3s ease;
        `;
        document.body.appendChild(toast);
        
        setTimeout(function() {
            toast.style.animation = 'toastSlideDown 0.3s ease';
            setTimeout(function() {
                toast.remove();
            }, 300);
        }, duration);
    };
    
    // Agregar animaciones CSS si no existen
    if (!document.querySelector('#mobile-animations')) {
        const style = document.createElement('style');
        style.id = 'mobile-animations';
        style.textContent = `
            @keyframes swipeHint {
                0%, 100% {
                    opacity: 0.3;
                    transform: translateY(-50%) translateX(0);
                }
                50% {
                    opacity: 0.8;
                    transform: translateY(-50%) translateX(10px);
                }
            }
            
            @keyframes toastSlideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            
            @keyframes toastSlideDown {
                from {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Mejorar accesibilidad del scroll en sidebar
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav && window.innerWidth <= 1024) {
        // Hacer el scrollbar más visible en móvil
        sidebarNav.style.scrollbarWidth = 'thin';
        sidebarNav.style.scrollbarColor = 'rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.1)';
    }
});
