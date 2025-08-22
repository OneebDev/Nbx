document.addEventListener('DOMContentLoaded', function () {
    // Navbar
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

    // Testimonials Slider
    const track = document.querySelector('.home-sec3-testimonials-track');
    const cards = document.querySelectorAll('.home-sec3-testimonial-card');
    const navDots = document.querySelectorAll('.home-sec3-nav-dot, .home-sec3-nav-active');
    const containerforsec3 = document.querySelector('.home-sec3-testimonials-container');

    if (track && cards.length && navDots.length && containerforsec3) {
        let currentIndex = 0;
        let cardWidth = cards[0].offsetWidth;
        let cardMargin = 16;
        let cardsPerView = calculateCardsPerView();
        let autoplayInterval;
        let isDraggingforsec3 = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        function calculateCardsPerView() {
            const containerWidth = containerforsec3.offsetWidth;
            const fullCardWidth = cardWidth + cardMargin;
            if (window.innerWidth <= 500) return 1;
            return Math.min(3, Math.max(1, Math.floor(containerWidth / fullCardWidth)));
        }

        function setupInfiniteLoop() {
            const firstClones = Array.from(cards).map(card => card.cloneNode(true));
            const lastClones = Array.from(cards).map(card => card.cloneNode(true)).reverse();
            firstClones.forEach(card => track.appendChild(card));
            lastClones.forEach(card => track.prepend(card));
            updateTrackPosition(cards.length, false);
        }

        function updateTrackPosition(index = currentIndex, withAnimation = true) {
            track.style.transition = withAnimation ? 'transform 0.5s ease-in-out' : 'none';
            const totalOffset = -index * (cardWidth + cardMargin);
            track.style.transform = `translateX(${totalOffset}px)`;
            currentTranslate = prevTranslate = totalOffset;

            if (withAnimation) {
                setTimeout(checkInfiniteScroll, 500);
            }
        }

        function checkInfiniteScroll() {
            const allCards = document.querySelectorAll('.home-sec3-testimonial-card');
            if (currentIndex >= cards.length * 2 || currentIndex < cards.length) {
                currentIndex = cards.length;
                updateTrackPosition(currentIndex, false);
            }
        }

        function nextSlide() {
            currentIndex++;
            updateTrackPosition();
            updateActiveDot();
        }

        function prevSlide() {
            currentIndex--;
            updateTrackPosition();
            updateActiveDot();
        }

        function updateActiveDot() {
            const normalizedIndex = ((currentIndex - cards.length) % cards.length + cards.length) % cards.length;
            navDots.forEach((dot, i) => {
                dot.classList.toggle('home-sec3-nav-active', i === normalizedIndex);
                dot.classList.toggle('home-sec3-nav-dot', i !== normalizedIndex);
            });
        }

        navDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentIndex = i + cards.length;
                updateTrackPosition();
                updateActiveDot();
                resetAutoplay();
            });
        });

        function getPositionX(e) {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        }

        function touchStart(e) {
            isDraggingforsec3 = true;
            startPos = getPositionX(e);
            track.style.transition = 'none';
            track.style.cursor = 'grabbing';
        }

        function touchMove(e) {
            if (!isDraggingforsec3) return;
            const currentPosition = getPositionX(e);
            const diff = currentPosition - startPos;
            currentTranslate = prevTranslate + diff;
            track.style.transform = `translateX(${currentTranslate}px)`;
        }

        function touchEnd() {
            isDraggingforsec3 = false;
            track.style.cursor = 'grab';
            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -100) nextSlide();
            else if (movedBy > 100) prevSlide();
            else updateTrackPosition();
            resetAutoplay();
        }

        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        function handleResize() {
            cardWidth = cards[0].offsetWidth;
            cardsPerView = calculateCardsPerView();
            setTimeout(() => updateTrackPosition(currentIndex, false), 100);
        }

        function initSlider() {
            setupInfiniteLoop();
            currentIndex = cards.length;
            updateTrackPosition(currentIndex, false);
            updateActiveDot();

            track.addEventListener('mousedown', touchStart);
            track.addEventListener('touchstart', touchStart);
            window.addEventListener('mousemove', touchMove);
            window.addEventListener('touchmove', touchMove);
            window.addEventListener('mouseup', touchEnd);
            window.addEventListener('touchend', touchEnd);
            window.addEventListener('mouseleave', touchEnd);
            window.addEventListener('resize', handleResize);

            startAutoplay();
        }

        initSlider();
    }

    // Image Comparison (Section 7)
    const container = document.querySelector('.home-sec7-comparison-container');
    const afterImage = document.querySelector('.home-sec7-after-image');
    const slider = document.querySelector('.home-sec7-image-slider');

    if (container && afterImage && slider) {
        let isDragging = false;

        function updateSlider(x) {
            const rect = container.getBoundingClientRect();
            const position = Math.max(0, Math.min(x - rect.left, rect.width));
            const percentage = (position / rect.width) * 100;

            slider.style.left = percentage + '%';
            afterImage.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
            const bgPositionX = (percentage / 100) * rect.width;
            afterImage.style.backgroundPosition = `${bgPositionX}px center`;
        }

        function startDragging(e) {
            isDragging = true;
            updateSlider(e.clientX);
            container.style.cursor = 'grabbing';
            e.preventDefault();
        }

        function stopDragging() {
            isDragging = false;
            container.style.cursor = 'grab';
        }

        function handleMouseMove(e) {
            if (isDragging) {
                updateSlider(e.clientX);
                e.preventDefault();
            }
        }

        function handleTouchMove(e) {
            if (isDragging) {
                updateSlider(e.touches[0].clientX);
                e.preventDefault();
            }
        }

        function handleTouchStart(e) {
            isDragging = true;
            updateSlider(e.touches[0].clientX);
            e.preventDefault();
        }

        slider.addEventListener('mousedown', startDragging);
        container.addEventListener('mousedown', startDragging);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopDragging);

        slider.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', stopDragging, { passive: false });

        container.addEventListener('dragstart', e => e.preventDefault());
        slider.addEventListener('dragstart', e => e.preventDefault());

        setTimeout(() => {
            const rect = container.getBoundingClientRect();
            updateSlider(rect.left + rect.width / 2);
        }, 100);

        window.addEventListener('resize', () => {
            if (!isDragging) {
                const rect = container.getBoundingClientRect();
                const currentPercentage = parseFloat(slider.style.left) || 50;
                updateSlider(rect.left + (rect.width * currentPercentage / 100));
            }
        });

        container.addEventListener('keydown', e => {
            const rect = container.getBoundingClientRect();
            const currentPercentage = parseFloat(slider.style.left) || 50;
            let newPercentage = currentPercentage;

            switch (e.key) {
                case 'ArrowLeft': newPercentage = Math.max(0, currentPercentage - 5); break;
                case 'ArrowRight': newPercentage = Math.min(100, currentPercentage + 5); break;
                case 'Home': newPercentage = 0; break;
                case 'End': newPercentage = 100; break;
                default: return;
            }

            const newPosition = rect.left + (rect.width * newPercentage / 100);
            updateSlider(newPosition);
            e.preventDefault();
        });

        container.setAttribute('tabindex', '0');
        container.setAttribute('role', 'slider');
        container.setAttribute('aria-label', 'Image comparison slider');
        container.setAttribute('aria-valuemin', '0');
        container.setAttribute('aria-valuemax', '100');
        container.setAttribute('aria-valuenow', '50');
    }

    // FAQ Accordion
    document.querySelectorAll('.home-sec8-faq-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
            document.querySelectorAll('.home-sec8-faq-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
        });
    });
});
