/**
 * EDUGEST - Sistema de Gestión Educativa
 * App Principal - Manejo de UI y Interacciones
 */

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAnimations();
    initTooltips();
});

/**
 * Menú Móvil
 */
function initMobileMenu() {
    // Crear botón de menú móvil si no existe
    if (!document.querySelector('.mobile-menu-btn')) {
        const btn = document.createElement('button');
        btn.className = 'mobile-menu-btn';
        btn.innerHTML = '☰';
        btn.setAttribute('aria-label', 'Abrir menú');
        document.body.appendChild(btn);
    }
    
    // Crear overlay si no existe
    if (!document.querySelector('.sidebar-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }
    
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (!menuBtn || !sidebar || !overlay) return;
    
    // Toggle menú
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        menuBtn.innerHTML = sidebar.classList.contains('active') ? '✕' : '☰';
    });
    
    // Cerrar al hacer click en overlay
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        menuBtn.innerHTML = '☰';
    });
    
    // Cerrar al hacer click en un link (móvil)
    const navLinks = sidebar.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                menuBtn.innerHTML = '☰';
            }
        });
    });
}

/**
 * Animaciones al hacer scroll
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar cards y elementos animables
    document.querySelectorAll('.card, .stat-card, .module-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Tooltips simples
 */
function initTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    
    elements.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = el.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--gray-900);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                z-index: 10000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = el.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
            tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
            
            el._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', () => {
            if (el._tooltip) {
                el._tooltip.remove();
                el._tooltip = null;
            }
        });
    });
}

/**
 * Utilidades
 */
const Utils = {
    // Formatear números
    formatNumber(num) {
        return new Intl.NumberFormat('es-CL').format(num);
    },
    
    // Formatear porcentaje
    formatPercent(num) {
        return `${Math.round(num)}%`;
    },
    
    // Formatear fecha
    formatDate(date) {
        return new Intl.DateTimeFormat('es-CL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },
    
    // Mostrar notificación
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            z-index: 10000;
            min-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Exportar para uso global
window.EdugestApp = {
    Utils
};
