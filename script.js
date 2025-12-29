/* ============================================
   7J Marketing Website - Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
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

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections and cards for scroll animations
    document.querySelectorAll('section, .feature-card, .step, .badge').forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });

    // Navbar scroll effect
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // EXTREME Hero Phone - Mouse Parallax Effect
    const heroPhone = document.getElementById('heroPhone');
    const phone3dWrapper = document.querySelector('.phone-3d-wrapper');

    if (heroPhone && phone3dWrapper) {
        let targetRotateX = 5;
        let targetRotateY = -15;
        let currentRotateX = 5;
        let currentRotateY = -15;

        document.addEventListener('mousemove', (e) => {
            const rect = heroPhone.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance from center (normalized -1 to 1)
            const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
            const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

            // More dramatic rotation range
            targetRotateY = -15 + (deltaX * 20);
            targetRotateX = 5 - (deltaY * 15);
        });

        // Smooth animation loop
        function animatePhone() {
            // Lerp towards target
            currentRotateX += (targetRotateX - currentRotateX) * 0.08;
            currentRotateY += (targetRotateY - currentRotateY) * 0.08;

            // Get current float offset from animation
            const time = Date.now() / 1000;
            const floatY = Math.sin(time * 0.8) * 20;

            phone3dWrapper.style.transform = `
                rotateY(${currentRotateY}deg) 
                rotateX(${currentRotateX}deg) 
                rotateZ(2deg) 
                translateY(${floatY}px)
            `;

            requestAnimationFrame(animatePhone);
        }

        // Stop CSS animation and start JS animation
        phone3dWrapper.style.animation = 'none';
        animatePhone();

        // Also move the glows slightly
        const glowMassive = document.querySelector('.phone-glow-massive');
        const glowAccent = document.querySelector('.phone-glow-accent');

        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 30;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 30;

            if (glowMassive) {
                glowMassive.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            }
            if (glowAccent) {
                glowAccent.style.transform = `translate(calc(-50% + ${-moveX * 0.5}px), calc(-50% + ${-moveY * 0.5}px))`;
            }
        });
    }

    // Parallax effect for gradient orbs
    const orbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        orbs.forEach((orb, index) => {
            const speed = 0.05 + (index * 0.02);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // Mouse move effect for interactive cards
    const cards = document.querySelectorAll('.interactive-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // Magnetic button effect
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-3px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Animate stats numbers
    const animateNumber = (element, target, duration = 1500) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };

    // Observe stat numbers for animation
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateNumber(entry.target, target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statObserver.observe(stat));

    // Cursor glow effect (subtle)
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(34, 197, 94, 0.03) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);

    let cursorTimeout;
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';

        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(() => {
            cursorGlow.style.opacity = '0';
        }, 1000);
    });

    // Phone tilt effect on scroll
    const phones = document.querySelectorAll('.phone-frame');

    window.addEventListener('scroll', () => {
        phones.forEach(phone => {
            const rect = phone.getBoundingClientRect();
            const centerY = window.innerHeight / 2;
            const offset = (rect.top + rect.height / 2 - centerY) / centerY;
            const tilt = offset * 5;

            if (!phone.closest('.floating')) return;
            phone.style.transform = `rotateX(${tilt}deg)`;
        });
    });

    // Add typing effect to hero title (optional enhancement)
    const heroLines = document.querySelectorAll('.hero-line');
    heroLines.forEach((line, index) => {
        line.style.animationDelay = `${0.1 + index * 0.15}s`;
    });
});
