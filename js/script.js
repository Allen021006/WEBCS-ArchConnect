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
});

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
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
});

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
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
});

// File Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const fileUpload = document.getElementById('file-upload');
    
    if (fileUpload) {
        fileUpload.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = 'image/*';
            
            input.addEventListener('change', function(e) {
                const files = Array.from(e.target.files);
                if (files.length > 0) {
                    fileUpload.innerHTML = `<p>${files.length} file(s) selected</p>`;
                    fileUpload.style.borderColor = '#10b981';
                }
            });
            
            input.click();
        });

        // Drag and drop functionality
        fileUpload.addEventListener('dragover', function(e) {
            e.preventDefault();
            fileUpload.style.borderColor = '#3b82f6';
            fileUpload.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        });

        fileUpload.addEventListener('dragleave', function(e) {
            e.preventDefault();
            fileUpload.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            fileUpload.style.backgroundColor = 'transparent';
        });

        fileUpload.addEventListener('drop', function(e) {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
                fileUpload.innerHTML = `<p>${files.length} file(s) selected</p>`;
                fileUpload.style.borderColor = '#10b981';
                fileUpload.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            }
        });
    }
});

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
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

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.goal-card, .step-card, .feature-card, .portfolio-card, .project-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Video Play Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.play-button');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            // In a real implementation, this would open a video modal or redirect to a video
            //showNotification('Video play functionality is not implemented in this demo.', 'info');
        });
    }
});

// Project Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card, .portfolio-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Form Reset Functionality
document.addEventListener('DOMContentLoaded', function() {
    const resetButtons = document.querySelectorAll('button[type="reset"]');
    
    resetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const form = this.closest('form');
            if (form) {
                // Reset all form fields
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.style.borderColor = '#e2e8f0';
                    input.value = '';
                });
                
                // Reset file upload area
                const fileUpload = document.getElementById('file-upload');
                if (fileUpload) {
                    fileUpload.innerHTML = '<p>Drag & Drop Images Here</p>';
                    fileUpload.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                    fileUpload.style.backgroundColor = 'transparent';
                }
                
                showNotification('Form has been reset.', 'info');
            }
        });
    });
});

// Header Scroll Effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(248, 250, 252, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#F8FAFC';
                header.style.backdropFilter = 'none';
            }
        });
    }
});

// Loading Animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

let map;
const chicago = { lat: 41.85, lng: -87.65 };

/**
 * Creates a control that recenters the map on Chicago.
 */
function createCenterControl(map) {
  const controlButton = document.createElement("button");

  // Set CSS for the control.
  controlButton.classList.add('buttonStyle');

  controlButton.textContent = "Center Map";
  controlButton.title = "Click to recenter the map";
  controlButton.type = "button";
  // Setup the click event listeners: simply set the map to Chicago.
  controlButton.addEventListener("click", () => {
    map.setCenter(chicago);
  });
  return controlButton;
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 49.496675, lng: -102.65625 },
  });

  var georssLayer = new google.maps.KmlLayer({
    url: "http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss",
  });
  georssLayer.setMap(map);

  // Create the DIV to hold the control.
  const centerControlDiv = document.createElement("div");
  // Create the control.
  const centerControl = createCenterControl(map);

  // Append the control to the DIV.
  centerControlDiv.appendChild(centerControl);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    centerControlDiv
  );
}

// Video play control: ensure video does not autoplay and only plays when user clicks the play button
document.addEventListener('DOMContentLoaded', function() {
    const videoThumb = document.querySelector('.video-thumbnail video');
    const playBtn = document.querySelector('.video-thumbnail .play-button');

    if (videoThumb) {
        // Prevent any accidental autoplay
        try { videoThumb.pause(); videoThumb.currentTime = 0; } catch (e) {}
        // Show controls only when playing
        videoThumb.controls = false;
    }

    if (playBtn && videoThumb) {
        playBtn.addEventListener('click', function() {
            if (videoThumb.paused) {
                videoThumb.play().catch(err => console.error('Video play prevented:', err));
                playBtn.style.display = 'none';
                videoThumb.controls = true;
            } else {
                videoThumb.pause();
                playBtn.style.display = '';
                videoThumb.controls = false;
            }
        });

        // If the video ends, show the play button again
        videoThumb.addEventListener('ended', function() {
            playBtn.style.display = '';
            videoThumb.controls = false;
        });
    }
});

// Simple carousel controller for #featured-carousel
document.addEventListener('DOMContentLoaded', function() {
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
    const visibleCards = Math.floor(carousel.offsetWidth / items[0].offsetWidth); // how many fit in viewport
    const maxIndex = totalSlides - visibleCards; // last valid starting slide

    if (i < 0) i = maxIndex;
    if (i > maxIndex) i = 3;

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
