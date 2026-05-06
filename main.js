document.addEventListener('DOMContentLoaded', () => {
    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled');
            // actually let's just make it always sticky or transition
            if(window.scrollY <= 50) {
               navbar.classList.remove('scrolled');
            }
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Counter Animation
    const counters = document.querySelectorAll('.counter-value');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // ms
                const frameRate = 1000 / 60;
                const totalFrames = Math.round(duration / frameRate);
                let currentFrame = 0;
                
                const updateCounter = () => {
                    currentFrame++;
                    const progress = currentFrame / totalFrames;
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const currentVal = Math.round(endValue * easeOutQuart);
                    
                    if (currentFrame < totalFrames) {
                        target.innerText = currentVal;
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.innerText = endValue;
                    }
                };
                
                updateCounter();
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(other => {
                other.classList.remove('active');
                other.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
