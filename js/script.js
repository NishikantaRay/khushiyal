/* ============================================================
   KHUSIYAL SERVICES — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ---- Initialize AOS (Animate on Scroll) ----
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }


    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('mainNav');

    function handleNavScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();


    // ---- Active nav link on scroll (index page only) ----
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('#navMenu .nav-link');

    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    if (sections.length > 2) {
        window.addEventListener('scroll', setActiveLink, { passive: true });
    }


    // ---- Close mobile nav on link click ----
    const navCollapse = document.getElementById('navMenu');

    if (navCollapse) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    bsCollapse.hide();
                }
            });
        });
    }


    // ---- Back-to-top button ----
    const backBtn = document.getElementById('backToTop');

    if (backBtn) {
        function handleBackToTop() {
            if (window.scrollY > 400) {
                backBtn.classList.add('visible');
            } else {
                backBtn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', handleBackToTop, { passive: true });

        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // ---- Counter Animation (Stats Bar) ----
    const counters = document.querySelectorAll('.stat-number[data-count]');

    if (counters.length) {
        const animateCounter = (el) => {
            const target = +el.dataset.count;
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const tick = () => {
                current += step;
                if (current >= target) {
                    el.textContent = target;
                } else {
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(tick);
                }
            };

            tick();
        };

        const counterObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach(c => counterObserver.observe(c));
    }


    // ---- Gallery Filtering (gallery page) ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryCols = document.querySelectorAll('.gallery-col');

    if (filterBtns.length && galleryCols.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                galleryCols.forEach(col => {
                    if (filter === 'all' || col.dataset.category === filter) {
                        col.classList.remove('hidden');
                    } else {
                        col.classList.add('hidden');
                    }
                });

                // Re-init AOS after filtering
                if (typeof AOS !== 'undefined') {
                    setTimeout(() => AOS.refresh(), 400);
                }
            });
        });
    }


    // ---- Form submission (demo) ----
    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');

    function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Sending...';

        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-circle-check me-2"></i>Sent Successfully!';
            btn.classList.add('btn-success');

            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.classList.remove('btn-success');
            }, 2500);
        }, 1500);
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmit);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }


    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
