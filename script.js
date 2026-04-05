// ==================== LOADING SCREEN ====================
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    // Wait for loading animation to complete
    setTimeout(() => {
        loader.classList.add('hidden');
        // Initialize animations after loader is hidden
        initParticles();
        initScrollAnimations();
        initTypewriter();
    }, 2200);
});

// ==================== PARTICLES BACKGROUND ====================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load('particles', {
            fullScreen: false,
            background: {
                color: 'transparent'
            },
            fpsLimit: 120,
            particles: {
                color: {
                    value: ['#00D4FF', '#7B2FFF', '#FFFFFF']
                },
                links: {
                    color: '#00D4FF',
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: false,
                    straight: false,
                    outModes: {
                        default: 'bounce'
                    }
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 60
                },
                opacity: {
                    value: 0.5,
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1
                    }
                },
                shape: {
                    type: ['circle', 'triangle']
                },
                size: {
                    value: { min: 1, max: 3 },
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.5
                    }
                }
            },
            detectRetina: true,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onClick: {
                        enable: true,
                        mode: 'push'
                    }
                },
                modes: {
                    grab: {
                        distance: 200,
                        links: {
                            opacity: 0.8
                        }
                    },
                    push: {
                        quantity: 4
                    }
                }
            }
        });
    } else {
        // Fallback: Create simple animated dots if tsParticles fails
        createFallbackParticles(particlesContainer);
    }
}

function createFallbackParticles(container) {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'fallback-particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color
        const colors = ['#00D4FF', '#7B2FFF', '#FFFFFF'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = duration + 's';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
    }
    
    // Add fallback particle styles
    const style = document.createElement('style');
    style.textContent = `
        .fallback-particle {
            position: absolute;
            border-radius: 50%;
            opacity: 0.5;
            animation: particleFloat 15s infinite linear;
        }
        
        @keyframes particleFloat {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0.3;
            }
            50% {
                opacity: 0.7;
            }
            100% {
                transform: translate(100px, -100px) rotate(360deg);
                opacity: 0.3;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation for stat numbers
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                if (statNumbers.length > 0) {
                    animateCounters(statNumbers);
                }
            }
        });
    }, observerOptions);

    // Observe all animate-on-scroll elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el, index) => {
        // Add staggered delay based on index
        if (index % 6 === 0) el.classList.add('delay-1');
        else if (index % 6 === 1) el.classList.add('delay-2');
        else if (index % 6 === 2) el.classList.add('delay-3');
        else if (index % 6 === 3) el.classList.add('delay-4');
        else if (index % 6 === 4) el.classList.add('delay-5');
        else el.classList.add('delay-6');
        
        observer.observe(el);
    });
}

function animateCounters(elements) {
    elements.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            el.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// ==================== TYPEWRITER EFFECT ====================
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const phrases = ['ML Engineer', 'Signal Processing', 'Computer Vision', 'Predictive Maintenance'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Word complete, pause before deleting
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted, move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
}

// ==================== NAVBAR ====================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

// ==================== PROJECT FILTER ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.classList.remove('hidden');
                card.classList.add('animate-on-scroll', 'visible');
            } else {
                card.classList.add('hidden');
                card.classList.remove('animate-on-scroll', 'visible');
            }
        });
    });
});

// ==================== PROJECT CARD 3D TILT EFFECT ====================
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:suthikshank@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your message! Your email client should open shortly.');
        
        // Reset form
        contactForm.reset();
    });
}

// ==================== FLOATING ICONS ANIMATION DELAY ====================
document.addEventListener('DOMContentLoaded', () => {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    // Stagger the animation of floating icons
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.3}s`;
    });
});

// ==================== PARALLAX EFFECT FOR HERO ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 700;
    }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Update parallax and navbar here if needed
            ticking = false;
        });
        ticking = true;
    }
});

// Lazy load images (if any added in future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
}