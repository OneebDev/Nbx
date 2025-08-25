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










// Form validation and animation controller
class ContactFormController {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.services = Array.from(document.querySelectorAll('input[name="services"]'));
    this.submitBtn = document.getElementById('submitBtn');
    
    this.init();
  }

  init() {
    this.setupFormValidation();
    this.setupScrollAnimations();
    this.setupButtonEffects();
    this.setupScrollIndicator();
  }

  // Form validation methods
  setError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message || '';
  }

  validateServices() {
    const anyChecked = this.services.some(cb => cb.checked);
    this.setError('err-services', anyChecked ? '' : 'Please select at least one of the following services.');
    return anyChecked;
  }

  attachFieldValidation(fieldId, messageRequired, messagePattern) {
    const field = document.getElementById(fieldId);
    
    field.addEventListener('invalid', (e) => {
      e.preventDefault();
      let msg = '';
      if (field.validity.valueMissing) msg = messageRequired;
      else if (field.validity.typeMismatch || field.validity.patternMismatch) {
        msg = messagePattern || messageRequired;
      }
      this.setError('err-' + fieldId, msg);
    });
    
    field.addEventListener('input', () => {
      this.setError('err-' + fieldId, '');
      this.addFieldSuccessState(field);
    });
    
    field.addEventListener('blur', () => {
      if (field.checkValidity()) {
        this.setError('err-' + fieldId, '');
        this.addFieldSuccessState(field);
      }
    });
  }

  addFieldSuccessState(field) {
    if (field.value.trim() && field.checkValidity()) {
      field.style.borderColor = '#10b981';
      field.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.25)';
    }
  }

  setupFormValidation() {
    // Attach validation to all fields
    this.attachFieldValidation('name', 'Please provide your name.');
    this.attachFieldValidation('phone', 'Please provide a valid number.', 'Please provide a valid number.');
    this.attachFieldValidation('email', 'Please provide a valid email address.', 'Please provide a valid email address.');
    this.attachFieldValidation('zip', 'Please provide a zip code.', 'Please provide a zip code.');
    this.attachFieldValidation('ref', 'Please provide information on how you heard about us.');
    this.attachFieldValidation('message', 'Please provide a message.');

    // Services validation
    this.services.forEach(cb => {
      cb.addEventListener('change', () => {
        this.validateServices();
        this.animateChipSelection(cb);
      });
    });

    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission();
    });
  }

  animateChipSelection(checkbox) {
    const label = checkbox.nextElementSibling;
    if (checkbox.checked) {
      label.style.transform = 'translateY(-2px) scale(1.02)';
      setTimeout(() => {
        label.style.transform = 'translateY(-2px)';
      }, 150);
    }
  }

  async handleFormSubmission() {
    // Validate all fields
    const isValid = this.form.checkValidity() && this.validateServices();
    
    if (!isValid) {
      this.form.reportValidity();
      return;
    }

    // Show loading state
    this.setButtonLoading(true);

    try {
      // Simulate form submission
      await this.simulateFormSubmission();
      this.showSuccessMessage();
    } catch (error) {
      this.showErrorMessage();
    } finally {
      this.setButtonLoading(false);
    }
  }

  setButtonLoading(loading) {
    const btnText = this.submitBtn.querySelector('.btn-text');
    
    if (loading) {
      this.submitBtn.disabled = true;
      btnText.textContent = 'Submitting...';
      this.submitBtn.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
    } else {
      this.submitBtn.disabled = false;
      btnText.textContent = 'Submit';
      this.submitBtn.style.background = 'linear-gradient(135deg, var(--red), var(--red-600))';
    }
  }

  simulateFormSubmission() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000); // Simulate network delay
    });
  }

  showSuccessMessage() {
    const card = document.querySelector('.card');
    const successHTML = `
      <div class="success-message" style="text-align: center; padding: 40px 20px;">
        <div style="width: 64px; height: 64px; margin: 0 auto 20px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        <h3 style="font-size: 24px; margin-bottom: 12px; color: var(--white);">Thank You!</h3>
        <p style="color: var(--muted); margin-bottom: 24px;">Your message has been sent successfully. We'll get back to you soon.</p>
        <button onclick="location.reload()" class="btn" style="background: linear-gradient(135deg, #10b981, #059669);">Send Another Message</button>
      </div>
    `;
    
    card.innerHTML = successHTML;
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
      card.style.transform = 'scale(1)';
    }, 100);
  }

  showErrorMessage() {
    // Show error state
    this.submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    this.submitBtn.querySelector('.btn-text').textContent = 'Try Again';
    
    setTimeout(() => {
      this.submitBtn.style.background = 'linear-gradient(135deg, var(--red), var(--red-600))';
      this.submitBtn.querySelector('.btn-text').textContent = 'Submit';
    }, 3000);
  }

  // Animation and scroll effects
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, delay);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  setupButtonEffects() {
    // Add ripple effect to submit button
    this.submitBtn.addEventListener('click', (e) => {
      const ripple = this.submitBtn.querySelector('.btn-ripple');
      ripple.style.width = '0';
      ripple.style.height = '0';
      
      setTimeout(() => {
        ripple.style.width = '300px';
        ripple.style.height = '300px';
      }, 10);
    });

    // Add hover effects to all interactive elements
    document.querySelectorAll('.control').forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
      });
      
      input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
      });
    });
  }

  setupScrollIndicator() {
    // Scroll indicator removed - no longer needed
  }
}

// Parallax effect for hero section
class ParallaxController {
  constructor() {
    this.heroBackground = document.querySelector('.hero-background');
    this.heroContent = document.querySelector('.hero-content');
    this.init();
  }

  init() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const opacity = Math.max(0, 1 - scrolled / window.innerHeight);
    
    if (this.heroBackground) {
      this.heroBackground.style.transform = `translateY(${rate}px)`;
    }
    
    if (this.heroContent) {
      this.heroContent.style.opacity = opacity;
    }
  }
}

// Performance optimized scroll handler
class PerformanceOptimizer {
  constructor() {
    this.ticking = false;
    this.init();
  }

  init() {
    // Throttle scroll events
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    });
  }

  handleScroll() {
    // Add any additional scroll-based animations here
    this.updateScrollProgress();
  }

  updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrolled / maxScroll;
    
    // You can use this progress value for additional effects
    document.documentElement.style.setProperty('--scroll-progress', progress);
  }
}

// Enhanced loading animations
class LoadingAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Stagger animations for form elements
    this.staggerFormAnimations();
    this.setupPreloader();
  }

  staggerFormAnimations() {
    const formElements = document.querySelectorAll('.field');
    formElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.1}s`;
    });
  }

  setupPreloader() {
    // Add a subtle loading state for the page
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    });
  }
}

// Initialize all controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ContactFormController();
  new ParallaxController();
  new PerformanceOptimizer();
  new LoadingAnimations();
});

// Custom cursor effect removed

// Add keyboard navigation enhancements
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});
