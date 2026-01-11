/* =====================================================
   Nova AI - Main JavaScript
   Handles all interactive functionality
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Preloader.init();
    Navigation.init();
    CustomCursor.init();
    ScrollAnimations.init();
    CounterAnimation.init();
    ParticleSystem.init();
    ContactForm.init();
    SmoothScroll.init();
});

/* =====================================================
   Preloader Module
   ===================================================== */
const Preloader = {
    init() {
        const preloader = document.getElementById('preloader');

        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.style.overflow = 'auto';
            }, 500);
        });
    }
};

/* =====================================================
   Navigation Module
   ===================================================== */
const Navigation = {
    init() {
        this.header = document.getElementById('header');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.bindEvents();
        this.handleScroll();
    },

    bindEvents() {
        // Scroll event for header styling
        window.addEventListener('scroll', () => this.handleScroll());

        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => this.toggleMenu());

        // Nav links click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
                this.setActiveLink(link);
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
                this.closeMenu();
            }
        });

        // Update active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    },

    handleScroll() {
        if (window.scrollY > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    },

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    },

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    },

    setActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    },

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

/* =====================================================
   Custom Cursor Module
   ===================================================== */
const CustomCursor = {
    init() {
        if (window.innerWidth <= 1024) return;

        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');

        if (!this.cursor || !this.follower) return;

        this.bindEvents();
    },

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                this.follower.style.left = e.clientX + 'px';
                this.follower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-card');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.follower.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                this.follower.classList.remove('hover');
            });
        });
    }
};

/* =====================================================
   Scroll Animations Module (AOS Alternative)
   ===================================================== */
const ScrollAnimations = {
    init() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.bindEvents();
        this.checkElements();
    },

    bindEvents() {
        window.addEventListener('scroll', () => this.checkElements());
        window.addEventListener('resize', () => this.checkElements());
    },

    checkElements() {
        this.elements.forEach(el => {
            if (this.isInViewport(el)) {
                const delay = el.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    el.classList.add('aos-animate');
                }, delay);
            }
        });
    },

    isInViewport(el) {
        const rect = el.getBoundingClientRect();
        const threshold = 100;

        return (
            rect.top <= (window.innerHeight - threshold) &&
            rect.bottom >= threshold
        );
    }
};

/* =====================================================
   Counter Animation Module
   ===================================================== */
const CounterAnimation = {
    init() {
        this.counters = document.querySelectorAll('.stat-number[data-count]');
        this.animated = new Set();

        this.bindEvents();
        this.checkCounters();
    },

    bindEvents() {
        window.addEventListener('scroll', () => this.checkCounters());
    },

    checkCounters() {
        this.counters.forEach(counter => {
            if (this.animated.has(counter)) return;

            const rect = counter.getBoundingClientRect();
            if (rect.top <= window.innerHeight - 100) {
                this.animateCounter(counter);
                this.animated.add(counter);
            }
        });
    },

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    }
};

/* =====================================================
   Particle System Module
   ===================================================== */
const ParticleSystem = {
    init() {
        this.container = document.getElementById('particles');
        if (!this.container) return;

        this.createParticles();
    },

    createParticles() {
        const particleCount = window.innerWidth > 768 ? 50 : 25;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 4 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(138, 92, 245, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                animation: float ${duration}s ease-in-out ${delay}s infinite;
                pointer-events: none;
            `;

            this.container.appendChild(particle);
        }

        // Add keyframes for particle animation
        if (!document.getElementById('particle-keyframes')) {
            const style = document.createElement('style');
            style.id = 'particle-keyframes';
            style.textContent = `
                @keyframes float {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.5;
                    }
                    25% {
                        transform: translate(20px, -30px) scale(1.1);
                        opacity: 0.8;
                    }
                    50% {
                        transform: translate(-10px, -50px) scale(0.9);
                        opacity: 0.6;
                    }
                    75% {
                        transform: translate(-20px, -20px) scale(1.05);
                        opacity: 0.7;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
};

/* =====================================================
   Contact Form Module
   AJAX submission to Formspree with custom success message
   ===================================================== */
const ContactForm = {
    init() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;

        this.bindEvents();
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    async handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!this.validateForm(data)) {
            return;
        }

        const button = this.form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        // Show loading state
        button.innerHTML = `
            <svg class="spinner" viewBox="0 0 24 24" style="width: 20px; height: 20px; margin-right: 8px; animation: spin 1s linear infinite;">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="30 70"/>
            </svg>
            Sending...
        `;
        button.disabled = true;

        try {
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.showSuccess(button, originalText);
                this.form.reset();
            } else {
                const errorData = await response.json();
                button.innerHTML = originalText;
                button.disabled = false;
                if (errorData.errors) {
                    this.showError(errorData.errors.map(err => err.message).join(', '));
                } else {
                    this.showError('Something went wrong. Please try again.');
                }
            }
        } catch (error) {
            button.innerHTML = originalText;
            button.disabled = false;
            this.showError('Network error. Please check your connection and try again.');
        }
    },

    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!data.name || data.name.length < 2) {
            this.showError('Please enter a valid name');
            return false;
        }

        if (!emailRegex.test(data.email)) {
            this.showError('Please enter a valid email address');
            return false;
        }

        if (!data.message || data.message.length < 10) {
            this.showError('Please enter a message (at least 10 characters)');
            return false;
        }

        return true;
    },

    showSuccess(button, originalText) {
        button.disabled = false;
        button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; margin-right: 8px;">
                <path d="M5 13l4 4L19 7"/>
            </svg>
            Message Sent!
        `;
        button.style.background = '#10B981';

        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 3000);
    },

    showError(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast toast-error';
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            padding: 16px 24px;
            background: #EF4444;
            color: white;
            border-radius: 8px;
            font-size: 0.9375rem;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);

        // Add keyframes if not present
        if (!document.getElementById('toast-keyframes')) {
            const style = document.createElement('style');
            style.id = 'toast-keyframes';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
};

/* =====================================================
   Smooth Scroll Module
   ===================================================== */
const SmoothScroll = {
    init() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

/* =====================================================
   Typing Effect (Optional Enhancement)
   ===================================================== */
const TypingEffect = {
    init(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;

        this.type();
    },

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
};

/* =====================================================
   Intersection Observer for Performance
   ===================================================== */
const LazyLoad = {
    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
};

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', () => {
    LazyLoad.init();
});
