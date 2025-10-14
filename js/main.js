// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            navList.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterButtons.length > 0 && portfolioCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease-in';
                    } else {
                        const cardCategories = card.getAttribute('data-category');
                        if (cardCategories && cardCategories.includes(filterValue)) {
                            card.style.display = 'block';
                            card.style.animation = 'fadeIn 0.5s ease-in';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Form Validation and Submission
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    field.style.borderColor = '#e2e8f0';
                }
            });

            if (isValid) {
                // Show success message
                showNotification('Thank you for your submission! We\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });

    // Simple carousel controller for #featured-carousel
    const carousel = document.getElementById('featured-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-button.prev');
    const nextBtn = carousel.querySelector('.carousel-button.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const items = Array.from(track.children);
    let index = 0;

    // Create dots
    const totalSlides = items.length;
    for (let i = 0; i < totalSlides; i++) {
        const btn = document.createElement('button');
        btn.dataset.index = i;
        if (i === 0) btn.classList.add('active');
        btn.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(btn);
    }

    function update() {
        const cardWidth = items[0].getBoundingClientRect().width;
        const offset = -(cardWidth * index);
        track.style.transform = `translateX(${offset}px)`;
        // update dots
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach(d => d.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
    }

    function goTo(i) {
        const visibleCards = Math.floor(carousel.offsetWidth / items[0].offsetWidth);
        const maxIndex = totalSlides - visibleCards;

        if (i < 0) i = maxIndex;
        if (i > maxIndex) i = 0;

        index = i;
        update();
    }

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));

    // Touch support
    let startX = 0;
    let isDragging = false;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; isDragging = true; });
    track.addEventListener('touchmove', e => { if (!isDragging) return; const dx = e.touches[0].clientX - startX; track.style.transform = `translateX(${-(items[0].getBoundingClientRect().width + 16) * index + dx}px)`; });
    track.addEventListener('touchend', e => { isDragging = false; const dx = e.changedTouches[0].clientX - startX; if (dx > 40) goTo(index - 1); else if (dx < -40) goTo(index + 1); else update(); });

    // Resize observer to adjust transform when layout changes
    window.addEventListener('resize', update);

    // Initial layout
    setTimeout(update, 50);
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);
