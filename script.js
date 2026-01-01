
document.addEventListener('DOMContentLoaded', () => {
    // === Mobile Navigation ===
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle Nav
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');

            // Animate Links
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        // Close nav when link is clicked
        document.querySelectorAll('.nav-links li a').forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
                links.forEach(link => link.style.animation = '');
            });
        });
    }

    // === Smooth Scrolling for Navigation ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed nav
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Scroll-Triggered Animations ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Start typing after a small delay
    // Assuming 'typeWriter' function is defined elsewhere or will be added.
    // setTimeout(typeWriter, 500); // Commented out as typeWriter is not defined in this snippet.

    // === Contact Form Handling ===
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const button = contactForm.querySelector('button');
            const originalText = button.innerText;

            // Loading State
            button.innerText = 'Sending...';
            button.disabled = true;
            button.style.background = '#64748b'; // Gray out

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    button.innerText = 'Message Sent!';
                    button.style.background = '#22c55e'; // Green success
                    contactForm.reset();
                    setTimeout(() => {
                        button.innerText = originalText;
                        button.disabled = false;
                        button.style.background = ''; // Reset to gradient
                    }, 3000);
                } else {
                    throw new Error('Failed to send');
                }
            } catch (error) {
                alert('Oops! There was a problem sending your message. Please try again.');
                button.innerText = originalText;
                button.disabled = false;
                button.style.background = '';
            }
        });
    }

    // Targets to animate
    const animatedElements = document.querySelectorAll('.hero-content, .about-alt-container, .section-title, .card');

    animatedElements.forEach(el => {
        el.classList.add('fade-in-up'); // Add base class
        observer.observe(el);
    });
});


