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







    



// Project data for modal content
const projectData = {
    'citywide-highway': {
        title: 'Citywide Highway Expansion',
        location: 'Baridwood, CA',
        category: 'Civil Infrastructure',
        investment: '$270,000',
        roi: '+45%',
        timeline: '18 months',
        description: 'A comprehensive highway expansion project that improved traffic flow and reduced congestion by 35%. The project included the addition of two new lanes, upgraded traffic management systems, and enhanced safety features.',
        challenges: [
            'Managing traffic during construction phases',
            'Environmental impact mitigation',
            'Coordination with multiple stakeholders'
        ],
        solutions: [
            'Implemented phased construction approach',
            'Used eco-friendly materials and methods',
            'Established regular stakeholder communication'
        ],
        outcomes: [
            '35% reduction in traffic congestion',
            '50% improvement in safety metrics',
            'Enhanced local economic activity'
        ]
    },
    'northbrook-luxury': {
        title: 'Northbrook Luxury Complex',
        location: 'Northbrook, IL',
        category: 'Residential',
        investment: '$575,000',
        roi: '+38%',
        timeline: '24 months',
        description: 'A premium residential development featuring modern amenities and sustainable design principles. The complex includes 45 luxury units with smart home technology and energy-efficient systems.',
        challenges: [
            'Zoning approval complexities',
            'Market demand uncertainty',
            'Construction material costs'
        ],
        solutions: [
            'Engaged community stakeholders early',
            'Conducted thorough market research',
            'Negotiated long-term supplier contracts'
        ],
        outcomes: [
            '95% occupancy rate within 6 months',
            '25% above market rental rates',
            'LEED Gold certification achieved'
        ]
    },
    'oak-avenue-business': {
        title: 'Oak Avenue Business Park',
        location: 'Northbrook, IL',
        category: 'Commercial',
        investment: '$890,000',
        roi: '+52%',
        timeline: '30 months',
        description: 'A state-of-the-art business park designed to accommodate growing tech companies and startups. Features flexible office spaces, modern conference facilities, and collaborative work environments.',
        challenges: [
            'Attracting quality tenants',
            'Technology infrastructure requirements',
            'Parking and transportation access'
        ],
        solutions: [
            'Pre-leasing marketing campaign',
            'Invested in fiber optic infrastructure',
            'Partnered with local transit authority'
        ],
        outcomes: [
            '85% pre-leasing before completion',
            'Attracted 12 high-growth companies',
            'Created 300+ new local jobs'
        ]
    },
    'naperville-tech': {
        title: 'Naperville Tech Hub',
        location: 'Naperville, IL',
        category: 'Urban Development',
        investment: '$1.2M',
        roi: '+67%',
        timeline: '36 months',
        description: 'An innovative mixed-use development combining office spaces, retail, and recreational facilities. Designed to foster innovation and collaboration in the tech sector.',
        challenges: [
            'Complex zoning requirements',
            'Integration with existing infrastructure',
            'Balancing multiple use cases'
        ],
        solutions: [
            'Worked closely with city planning',
            'Phased development approach',
            'Flexible design architecture'
        ],
        outcomes: [
            'Became a regional innovation hub',
            'Increased property values by 40%',
            'Attracted major tech companies'
        ]
    },
    'schaumburg-center': {
        title: 'Schaumburg City Center',
        location: 'Schaumburg, IL',
        category: 'Mixed-Use',
        investment: '$2.1M',
        roi: '+73%',
        timeline: '42 months',
        description: 'A comprehensive urban redevelopment project transforming the city center into a vibrant mixed-use destination with retail, dining, entertainment, and residential components.',
        challenges: [
            'Revitalizing declining area',
            'Managing large-scale construction',
            'Coordinating multiple stakeholders'
        ],
        solutions: [
            'Community engagement initiatives',
            'Experienced project management team',
            'Regular stakeholder meetings'
        ],
        outcomes: [
            'Increased foot traffic by 200%',
            'Created 500+ new jobs',
            'Boosted local tax revenue by 45%'
        ]
    },
    'evanston-marina': {
        title: 'Evanston Marina District',
        location: 'Evanston, IL',
        category: 'Waterfront',
        investment: '$3.5M',
        roi: '+89%',
        timeline: '48 months',
        description: 'A premium waterfront development featuring luxury condominiums, marina facilities, and recreational amenities. The project transformed an underutilized waterfront area into a desirable residential destination.',
        challenges: [
            'Environmental regulations',
            'Waterfront construction complexities',
            'Weather-related delays'
        ],
        solutions: [
            'Environmental impact assessments',
            'Specialized marine construction team',
            'Flexible timeline planning'
        ],
        outcomes: [
            'Premium pricing 60% above market',
            'Waitlist of prospective buyers',
            'Enhanced waterfront accessibility'
        ]
    }
};

// Modal functionality
function openModal(projectId) {
    const modal = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const project = projectData[projectId];
    
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }
    
    // Generate modal content
    modalContent.innerHTML = `
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-location">
            <i data-feather="map-pin" style="width: 16px; height: 16px;"></i>
            ${project.location}
        </p>
        
        <div class="modal-stats">
            <div class="modal-stat">
                <span class="modal-stat-label">Investment</span>
                <span class="modal-stat-value">${project.investment}</span>
            </div>
            <div class="modal-stat">
                <span class="modal-stat-label">ROI</span>
                <span class="modal-stat-value positive">${project.roi}</span>
            </div>
        </div>

        <div class="modal-timeline">
            <span class="modal-timeline-label">Timeline</span>
            <span class="modal-timeline-value">${project.timeline}</span>
        </div>


    `;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Initialize feather icons for the new content
    feather.replace();
    
    // Focus management for accessibility
    const firstFocusable = modal.querySelector('.modal-close');
    if (firstFocusable) {
        firstFocusable.focus();
    }
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth scrolling for CTA button
document.addEventListener('DOMContentLoaded', function() {
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#featured-projects');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Close modal on overlay click
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Interaction/Reveal behavior across breakpoints
    const cards = Array.from(document.querySelectorAll('.project-card'));
    const isDesktop = () => window.matchMedia('(min-width: 1025px)').matches;
    const isTablet  = () => window.matchMedia('(min-width: 769px) and (max-width: 1024px)').matches;
    const isMobile  = () => window.matchMedia('(max-width: 768px)').matches;

    // Desktop: reveal text on hover
    function bindDesktopHover() {
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => card.classList.add('show-text'));
            card.addEventListener('mouseleave', () => card.classList.remove('show-text'));
        });
    }

    // Tablet: reveal in batches of two while scrolling
    function bindTabletScroll() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-text');
                }
            });
        }, { threshold: 0.35 });

        // observe in pairs
        cards.forEach((card, idx) => {
            if (idx % 2 === 0) {
                io.observe(card);
                if (cards[idx + 1]) io.observe(cards[idx + 1]);
            }
        });
    }

    // Mobile: reveal one-by-one on scroll
    function bindMobileScroll() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('show-text');
            });
        }, { threshold: 0.35 });
        cards.forEach(card => io.observe(card));
    }

    function setupByBreakpoint() {
        // reset
        cards.forEach(c => c.classList.remove('show-text'));
        if (isDesktop()) {
            bindDesktopHover();
        } else if (isTablet()) {
            bindTabletScroll();
        } else if (isMobile()) {
            bindMobileScroll();
        }
    }

    setupByBreakpoint();
    window.addEventListener('resize', debounce(setupByBreakpoint, 200));
    
    // Add event listeners to card buttons to prevent event bubbling
    document.querySelectorAll('.card-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Touch event optimization for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-4px)';
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, { passive: true });
        });
    }
    
    // Performance optimization: Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        document.documentElement.style.setProperty('--reduce-animations', '1');
        
        // Disable floating elements on low-end devices
        const floatingElements = document.querySelector('.floating-elements');
        if (floatingElements) {
            floatingElements.style.display = 'none';
        }
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    });
    
    // Optimize images for retina displays
    const images = document.querySelectorAll('.card-image img');
    images.forEach(img => {
        if (window.devicePixelRatio > 1) {
            const src = img.src;
            // Increase quality for retina displays
            img.src = src.replace('q=80', 'q=90');
        }
    });
});

// Utility function for debouncing scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const handleScroll = debounce(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-image');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 10);

// Add scroll event listener with passive option for better performance
window.addEventListener('scroll', handleScroll, { passive: true });



// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Fallback to a placeholder if image fails to load
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY0NzQ4YiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIFVuYXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4K';
        });
    });
});
