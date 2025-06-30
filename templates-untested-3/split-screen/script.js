document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const dishSplits = document.querySelectorAll('.dish-split');
    const navDots = document.querySelectorAll('.nav-dot');
    const orderBtns = document.querySelectorAll('.order-btn');
    
    let currentDish = 1;
    let isScrolling = false;

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    function showDish(dishNumber) {
        dishSplits.forEach(split => {
            split.classList.remove('active');
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        const targetSplit = document.querySelector(`[data-dish="${dishNumber}"]`);
        const targetDot = document.querySelector(`[data-dish="${dishNumber}"]`);
        
        if (targetSplit) {
            targetSplit.classList.add('active');
        }
        
        if (targetDot && targetDot.classList.contains('nav-dot')) {
            targetDot.classList.add('active');
        }
        
        currentDish = dishNumber;
    }

    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const dishNumber = parseInt(this.getAttribute('data-dish'));
            showDish(dishNumber);
        });
    });

    function handleDishScroll(e) {
        if (isScrolling) return;
        
        const dishesSection = document.getElementById('dishes');
        const rect = dishesSection.getBoundingClientRect();
        
        if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
            e.preventDefault();
            isScrolling = true;
            
            if (e.deltaY > 0) {
                if (currentDish < dishSplits.length) {
                    showDish(currentDish + 1);
                } else {
                    isScrolling = false;
                    return;
                }
            } else {
                if (currentDish > 1) {
                    showDish(currentDish - 1);
                } else {
                    isScrolling = false;
                    return;
                }
            }
            
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    }

    window.addEventListener('wheel', handleDishScroll, { passive: false });

    document.addEventListener('keydown', function(e) {
        const dishesSection = document.getElementById('dishes');
        const rect = dishesSection.getBoundingClientRect();
        
        if (rect.top <= 100 && rect.bottom >= window.innerHeight - 100) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                if (currentDish < dishSplits.length) {
                    showDish(currentDish + 1);
                }
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                if (currentDish > 1) {
                    showDish(currentDish - 1);
                }
            }
        }
    });

    orderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.textContent;
            const originalBg = this.style.background;
            
            this.style.background = '#28a745';
            this.textContent = 'Added!';
            this.disabled = true;
            
            setTimeout(() => {
                this.style.background = originalBg;
                this.textContent = originalText;
                this.disabled = false;
            }, 2500);
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.category-card, .stat, .detail-group');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const timer = setInterval(() => {
                    currentValue = Math.min(currentValue + increment, finalValue);
                    target.textContent = Math.floor(currentValue) + (finalValue > 100 ? '+' : '');
                    
                    if (currentValue >= finalValue) {
                        clearInterval(timer);
                        target.textContent = finalValue + (finalValue > 100 ? '+' : '');
                    }
                }, 30);
                
                statObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });

    const form = document.querySelector('.reservation-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Booking...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your reservation! We will contact you shortly to confirm your table.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (this.getAttribute('href') === '#dishes') {
                    showDish(1);
                }
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleTouchSwipe();
    });

    function handleTouchSwipe() {
        const dishesSection = document.getElementById('dishes');
        const rect = dishesSection.getBoundingClientRect();
        
        if (rect.top <= 100 && rect.bottom >= window.innerHeight - 100) {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    if (currentDish < dishSplits.length) {
                        showDish(currentDish + 1);
                    }
                } else {
                    if (currentDish > 1) {
                        showDish(currentDish - 1);
                    }
                }
            }
        }
    }

    showDish(1);
});