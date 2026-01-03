
// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat, .contact-method');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
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
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing animation for hero text
function typeWriter(element, text, speed = 100, callback = null) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            setTimeout(callback, 500); // Small delay before next animation
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const typewriterText = document.getElementById('typewriter-text');
    const typewriterSubtitle = document.getElementById('typewriter-subtitle');
    
    if (typewriterText && typewriterSubtitle) {
        // Only run typing animation on first load
        if (!sessionStorage.getItem('typingAnimationShown')) {
            // Start with the main title
            typeWriter(typewriterText, "Hi, I'm ", 80, () => {
                // Add the highlighted name
                typewriterText.innerHTML += '<span class="highlight">Caleb Owusu</span>';
                setTimeout(() => {
                    // Then type the subtitle
                    typeWriter(typewriterSubtitle, "A Frontend Developer and a Critical Thinker", 100);
                }, 300);
            });
            sessionStorage.setItem('typingAnimationShown', 'true');
        } else {
            // If animation already shown, just display the text normally
            typewriterText.innerHTML = 'Hi, I\'m <span class="highlight">Caleb Owusu</span>';
            typewriterSubtitle.innerHTML = 'A Frontend Developer and a Critical Thinker';
        }
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Binary code animation
function createBinaryAnimation() {
    const binaryBg = document.getElementById('binary-bg');
    if (!binaryBg) return;
    
    const binaryChars = ['0', '1'];
    
    function calculateGridSize() {
        const heroSection = document.querySelector('.hero');
        const heroRect = heroSection.getBoundingClientRect();
        const charWidth = 8; // Approximate character width in pixels
        const charHeight = 14; // Approximate character height in pixels
        const columns = Math.floor((heroRect.width - 40) / charWidth); // Account for padding
        const rows = Math.floor((heroRect.height - 40) / charHeight); // Account for padding
        return { columns, rows };
    }
    
    let { columns, rows } = calculateGridSize();
    
    // Create binary matrix
    let binaryMatrix = [];
    for (let i = 0; i < rows; i++) {
        binaryMatrix[i] = [];
        for (let j = 0; j < columns; j++) {
            binaryMatrix[i][j] = binaryChars[Math.floor(Math.random() * 2)];
        }
    }
    
    // Function to update binary display
    function updateBinary() {
        let binaryText = '';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                // Randomly change some characters
                if (Math.random() < 0.1) {
                    binaryMatrix[i][j] = binaryChars[Math.floor(Math.random() * 2)];
                }
                binaryText += binaryMatrix[i][j] + ' ';
            }
            binaryText += '\n';
        }
        binaryBg.textContent = binaryText;
    }
    
    // Handle window resize
    function handleResize() {
        const newSize = calculateGridSize();
        if (newSize.columns !== columns || newSize.rows !== rows) {
            columns = newSize.columns;
            rows = newSize.rows;
            
            // Recreate matrix with new size
            binaryMatrix = [];
            for (let i = 0; i < rows; i++) {
                binaryMatrix[i] = [];
                for (let j = 0; j < columns; j++) {
                    binaryMatrix[i][j] = binaryChars[Math.floor(Math.random() * 2)];
                }
            }
        }
    }
    
    // Initial display
    updateBinary();
    
    // Update every 200ms for smooth animation
    setInterval(updateBinary, 200);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

// Binary overlay for about image
function createImageBinaryOverlay() {
    const binaryOverlay = document.querySelector('.binary-overlay');
    if (!binaryOverlay) return;
    
    const binaryChars = ['0', '1'];
    const rows = 20;
    const cols = 15;
    
    function generateBinaryText() {
        let text = '';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                text += binaryChars[Math.floor(Math.random() * 2)] + ' ';
            }
            text += '\n';
        }
        return text;
    }
    
    function updateBinaryOverlay() {
        binaryOverlay.textContent = generateBinaryText();
    }
    
    // Initial display
    updateBinaryOverlay();
    
    // Update every 500ms for subtle animation
    setInterval(updateBinaryOverlay, 500);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    createBinaryAnimation();
    createImageBinaryOverlay();
});

// Add CSS for loading state
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
    }
`;
document.head.appendChild(loadingStyles);
