    const mobileMenuToggle = document.querySelector('.Mobile-Menu-Toggle');
    const navLinks = document.querySelector('.Nav-Links');
    const header = document.querySelector('.Header');
    const sentinel = document.querySelector('.Navbar-Sentinel');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        const navLinkElements = document.querySelectorAll('.Nav-Link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 1000) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
    }

    if (header && sentinel) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    header.classList.add('nav-hidden');
                } else {
                    header.classList.remove('nav-hidden');
                }
            });
        });
        observer.observe(sentinel);
    }







// Global variables
let particles = [];
let animationFrame;

// Initialize the application with enhanced features
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeScrollAnimations();
    initializeParallaxEffect();
    initializeCardStability();
    initializeInteractiveElements();
    initializePerformanceOptimizations();
    startAnimationLoop();
    
    // Run initial resize to set proper responsive behavior
    setTimeout(handleResize, 100);
});

// Initialize interactive elements with enhanced animations
function initializeInteractiveElements() {
    // Simple button effects without animations
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        // Remove any existing transform animations
        button.style.transform = 'none';
    });
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Lazy load animations for better initial page load
    const heavyAnimations = document.querySelectorAll('[class*="gradient-animated"]');
    heavyAnimations.forEach(element => {
        // Start animations only when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        });
        
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
    
    // Optimize animations based on device capabilities
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations for users who prefer reduced motion
        const root = document.documentElement;
        root.style.setProperty('--animation-duration', '0.01s');
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.display = 'none';
        });
    }
}

// Particle system
function initializeParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    // Create 9 particles
    for (let i = 0; i < 9; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${(i + 1) * 10}%`;
        particle.style.animationDelay = `${Math.random() * 4}s`;
        particlesContainer.appendChild(particle);
        particles.push(particle);
    }
}

// Enhanced scroll animations system
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with a slight delay for smoother effect
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 100);
                
                // Stop observing once animated to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll-animate elements
    const scrollAnimateElements = document.querySelectorAll(
        '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
    );
    
    scrollAnimateElements.forEach((el, index) => {
        observer.observe(el);
        
        // Add staggered animation delays for elements in same section
        if (el.classList.contains('step-card') || 
            el.classList.contains('option-card') || 
            el.classList.contains('stat-item')) {
            el.style.transitionDelay = `${index * 0.1}s`;
        }
    });
    
    // Initialize reveal animations for hero section
    initializeHeroAnimations();
}

// Hero section entrance animations
function initializeHeroAnimations() {
    const heroElements = {
        title: document.querySelector('.hero-title'),
        description: document.querySelector('.hero-description'),
        buttons: document.querySelector('.hero-buttons'),
        floatingIcons: document.querySelectorAll('.floating-icon')
    };
    
    // Animate hero elements on load
    if (heroElements.title) {
        heroElements.title.style.animation = 'slide-up 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    }
    
    if (heroElements.description) {
        heroElements.description.style.animation = 'fade-in-up 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards';
        heroElements.description.style.opacity = '0';
    }
    
    if (heroElements.buttons) {
        heroElements.buttons.style.animation = 'scale-in 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s forwards';
        heroElements.buttons.style.opacity = '0';
    }
    
    // Animate floating icons
    heroElements.floatingIcons.forEach((icon, index) => {
        icon.style.animation = `bounce-in 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${0.8 + index * 0.2}s forwards`;
        icon.style.opacity = '0';
    });
}

// Parallax effect
// Disable parallax movement for hero background on Service page
function initializeParallaxEffect() {
    // Intentionally left blank to keep background fixed and not moving
}

function handleParallax() {
    // No-op: background remains fixed, no translate applied
}

// Card stability system - prevents horizontal movement
function initializeCardStability() {
    const cards = document.querySelectorAll('.step-card, .option-card, .trust-content');
    
    cards.forEach(card => {
        // Ensure cards are properly centered and stable
        card.classList.add('card-stable');
        
        // Store original position
        const originalTransform = getComputedStyle(card).transform;
        
        // Enhanced hover handlers with position constraints
        card.addEventListener('mouseenter', function(e) {
            if (this.classList.contains('premium-hover')) {
                // Only allow vertical movement and slight scale
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            }
        });
        
        card.addEventListener('mouseleave', function(e) {
            if (this.classList.contains('premium-hover')) {
                // Return to original position
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
        
        // Prevent any forced repositioning
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const currentTransform = card.style.transform;
                    // Ensure only translateY and scale are allowed
                    if (currentTransform && !currentTransform.match(/^translateY\([^)]*\)\s*scale\([^)]*\)$|^translateY\([^)]*\)$|^scale\([^)]*\)$|^$|^none$/)) {
                        card.style.transform = 'translateY(0) scale(1)';
                    }
                }
            });
        });
        
        observer.observe(card, {
            attributes: true,
            attributeFilter: ['style']
        });
    });
}

// Button click handler without animations
function handleButtonClick(button) {
    // Simple click handler without animations
    console.log('Button clicked:', button);
}

// Animation loop for continuous effects
function startAnimationLoop() {
    function animate() {
        // Continuous card position monitoring
        monitorCardPositions();
        animationFrame = requestAnimationFrame(animate);
    }
    animate();
}

// Monitor and correct card positions
function monitorCardPositions() {
    const cards = document.querySelectorAll('.step-card, .option-card, .trust-content');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const container = card.closest('.steps-grid, .options-grid, .container');
        
        if (container) {
            const containerRect = container.getBoundingClientRect();
            // Ensure card is within reasonable bounds of its container
            if (rect.left < containerRect.left - 50 || rect.right > containerRect.right + 50) {
                // Reset position if card has moved too far horizontally
                card.style.transform = 'translateY(0) scale(1)';
                card.style.left = 'auto';
                card.style.right = 'auto';
            }
        }
    });
}

// Smooth scrolling for internal links
function smoothScrollTo(targetId) {
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced click handlers
document.addEventListener('click', function(e) {
    // Handle all glow buttons
    if (e.target.classList.contains('glow-button') || e.target.closest('.glow-button')) {
        const button = e.target.classList.contains('glow-button') ? e.target : e.target.closest('.glow-button');
        handleButtonClick(button);
    }
    
    // Handle scroll to sections
    if (e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        smoothScrollTo(targetId);
    }
});

// Enhanced responsive handler with improved mobile experience
function handleResize() {
    const windowWidth = window.innerWidth;
    
    // Reset all card positions on resize
    const cards = document.querySelectorAll('.step-card, .option-card, .trust-content');
    cards.forEach(card => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.left = 'auto';
        card.style.right = 'auto';
    });
    
    // Responsive animations and effects
    if (windowWidth < 768) {
        // Mobile optimizations
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach(icon => {
            icon.style.display = 'none';
        });
        
        // Reduce particle count on mobile for better performance
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 4) { // Keep only 5 particles on mobile
                particle.style.display = 'none';
            }
        });
        
        // Optimize animations for mobile
        optimizeAnimationsForMobile();
    } else if (windowWidth < 1024) {
        // Tablet optimizations
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach(icon => {
            icon.style.display = 'block';
            icon.style.opacity = '0.1'; // Reduce opacity on tablets
        });
        
        // Show all particles but reduce opacity
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.display = 'block';
            particle.style.opacity = '0.2';
        });
    } else {
        // Desktop - full effects
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach(icon => {
            icon.style.display = 'block';
            icon.style.opacity = '0.2';
        });
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.display = 'block';
            particle.style.opacity = '0.3';
        });
    }
    
    // Adjust section spacing based on screen size
    adjustSectionSpacing(windowWidth);
}

// Optimize animations for mobile devices
function optimizeAnimationsForMobile() {
    const isMobile = window.innerWidth < 768;
    const root = document.documentElement;
    
    if (isMobile) {
        // Reduce animation duration and complexity on mobile
        root.style.setProperty('--animation-duration', '0.6s');
        
        // Disable complex animations that might cause performance issues
        const complexAnimations = document.querySelectorAll('[class*="gradient-animated"]');
        complexAnimations.forEach(el => {
            el.style.animation = 'none';
        });
    } else {
        root.style.setProperty('--animation-duration', '1.2s');
    }
}

// Adjust section spacing based on screen size
function adjustSectionSpacing(width) {
    const sections = document.querySelectorAll('section');
    const paddingClass = width < 768 ? '3rem 0' : '5rem 0';
    
    sections.forEach(section => {
        if (!section.classList.contains('hero-section')) {
            section.style.padding = paddingClass;
        }
    });
}

// Performance optimization - throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Event listeners
window.addEventListener('resize', throttle(handleResize, 100));

// Loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Start entrance animations
    const heroContent = document.querySelector('.hero-text-content');
    if (heroContent) {
        heroContent.style.animation = 'slide-up 0.8s ease-out forwards';
    }
    
    // Ensure all cards are in correct position after load
    setTimeout(() => {
        const cards = document.querySelectorAll('.step-card, .option-card, .trust-content');
        cards.forEach(card => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    }, 100);
});

// Simple button interactions without animations
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        // Remove any transform styles
        button.style.transform = 'none';
    });
});

// Intersection Observer for card stability
function initializeCardObserver() {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ensure card is in correct position when it comes into view
                const card = entry.target;
                if (card.classList.contains('step-card') || 
                    card.classList.contains('option-card') || 
                    card.classList.contains('trust-content')) {
                    card.style.transform = 'translateY(0) scale(1)';
                }
            }
        });
    }, {
        threshold: 0.1
    });

    const cards = document.querySelectorAll('.step-card, .option-card, .trust-content');
    cards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Initialize card observer
document.addEventListener('DOMContentLoaded', function() {
    initializeCardObserver();
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
});

// Force position reset function (can be called if needed)
function resetAllCardPositions() {
    const cards = document.querySelectorAll('.step-card, .option-card, .trust-content');
    cards.forEach(card => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.left = 'auto';
        card.style.right = 'auto';
        card.style.position = 'relative';
    });
}

// Expose reset function globally for debugging
window.resetCardPositions = resetAllCardPositions;
