/* ============================================
   DR. G. SOMESHWARAN — INTERACTIVE SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. AOS INIT
    // ==========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 750,
            once: true,
            offset: 70,
            easing: 'ease-out-cubic'
        });
    }

    // ==========================================
    // 2. PRELOADER
    // ==========================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 700);
        });
        // Fallback: remove after 3s even if load event is late
        setTimeout(() => {
            if (preloader && preloader.parentNode) {
                preloader.classList.add('hidden');
                setTimeout(() => { if (preloader.parentNode) preloader.remove(); }, 700);
            }
        }, 3000);
    }

    // ==========================================
    // 3. SCROLL PROGRESS BAR
    // ==========================================
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        const updateProgress = () => {
            const scrollable = document.body.scrollHeight - window.innerHeight;
            const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
            progressBar.style.width = pct + '%';
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
    }

    // ==========================================
    // 4. NAVBAR SCROLL SHRINK + SCROLL-SPY
    // ==========================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
        // Shrink navbar
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        }

        // Scroll-spy: highlight active nav link
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 140) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) link.classList.add('active');
        });

        // Back-to-top visibility
        const btt = document.getElementById('back-to-top');
        if (btt) btt.classList.toggle('visible', window.scrollY > 400);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

    // ==========================================
    // 5. MOBILE HAMBURGER NAVIGATION
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navLinksEl = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    if (hamburger && navLinksEl) {
        hamburger.addEventListener('click', () => {
            navLinksEl.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');

            navItems.forEach((item, i) => {
                item.style.animation = navLinksEl.classList.contains('nav-active')
                    ? `navLinkFade 0.4s ease forwards ${i / 7 + 0.2}s`
                    : '';
            });
        });

        // Close nav on link click
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.addEventListener('click', () => {
                navLinksEl.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
                navItems.forEach(item => item.style.animation = '');
            });
        });
    }

    // ==========================================
    // 6. SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 7. TYPEWRITER EFFECT (Hero)
    // ==========================================
    const typedEl = document.getElementById('typed-name');
    if (typedEl) {
        const words = [
            'Dr. G. Someshwaran',
            'an AI Researcher',
            'a Deep Learning Expert',
            'an Assistant Professor'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;
        let paused = false;

        const type = () => {
            if (paused) return;
            const current = words[wordIndex];

            if (!deleting) {
                typedEl.textContent = current.slice(0, ++charIndex);
                if (charIndex === current.length) {
                    paused = true;
                    setTimeout(() => { paused = false; deleting = true; type(); }, 2000);
                    return;
                }
                setTimeout(type, 80);
            } else {
                typedEl.textContent = current.slice(0, --charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, 45);
            }
        };

        setTimeout(type, 600); // start after a moment
    }

    // ==========================================
    // 8. ANIMATED COUNT-UP (Stats)
    // ==========================================
    const counters = document.querySelectorAll('.count');
    if (counters.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                const duration = 1400;
                const step = Math.ceil(duration / (target || 1));
                let current = 0;

                const tick = () => {
                    current = Math.min(current + 1, target);
                    el.textContent = current;
                    if (current < target) setTimeout(tick, step);
                };
                tick();
                countObserver.unobserve(el);
            });
        }, { threshold: 0.6 });

        counters.forEach(c => countObserver.observe(c));
    }

    // ==========================================
    // 9. ANIMATED SKILL BARS
    // ==========================================
    const skillFills = document.querySelectorAll('.skill-fill');
    if (skillFills.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const bar = entry.target;
                const level = bar.dataset.level || '0';
                // Slight delay for visual flair
                setTimeout(() => { bar.style.width = level + '%'; }, 200);
                skillObserver.unobserve(bar);
            });
        }, { threshold: 0.4 });

        skillFills.forEach(bar => skillObserver.observe(bar));
    }

    // ==========================================
    // 10. PUBLICATION FILTER
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const pubCards = document.querySelectorAll('.publication-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            pubCards.forEach(card => {
                const type = card.dataset.type;
                const show = filter === 'all' || type === filter;
                card.classList.toggle('hidden', !show);

                // Re-animate visible cards
                if (show) {
                    card.style.animation = 'none';
                    card.offsetHeight; // force reflow
                    card.style.animation = '';
                }
            });
        });
    });

    // ==========================================
    // 11. CONTACT FORM
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const toastSuccess = document.getElementById('toast-success');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btnText = submitBtn.querySelector('.btn-text');
            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.reset();
                    btnText.textContent = 'Message Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

                    // Show toast
                    if (toastSuccess) {
                        toastSuccess.classList.add('show');
                        setTimeout(() => toastSuccess.classList.remove('show'), 4000);
                    }

                    setTimeout(() => {
                        btnText.textContent = 'Send Message';
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3500);
                } else {
                    throw new Error('Server error');
                }
            } catch {
                alert('Oops! Could not send your message. Please try again or email directly.');
                btnText.textContent = 'Send Message';
                submitBtn.disabled = false;
            }
        });
    }

    // ==========================================
    // 12. BACK TO TOP
    // ==========================================
    const bttBtn = document.getElementById('back-to-top');
    if (bttBtn) {
        bttBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 13. CARD 3D TILT MICRO-INTERACTION
    // ==========================================
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `translateY(-7px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

});
