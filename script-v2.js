// Particle Background Animation
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 60;
    const connectionDistance = 140;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 2.5 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#CAD4DF';
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    const opacity = 1 - distance / connectionDistance;
                    ctx.strokeStyle = `rgba(202, 212, 223, ${opacity * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Navigation - Active Link on Scroll
function initNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('.content-section');

    function updateActiveNav() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 120;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Card hover effects
function initCardEffects() {
    const cards = document.querySelectorAll('.project-card, .exp-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Carousel functionality
let currentSlideIndex = 0;

function moveCarousel(direction) {
    const images = document.querySelectorAll('.carousel-image');
    const dots = document.querySelectorAll('.dot');

    images[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');

    currentSlideIndex += direction;

    if (currentSlideIndex >= images.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = images.length - 1;
    }

    images[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function currentSlide(index) {
    const images = document.querySelectorAll('.carousel-image');
    const dots = document.querySelectorAll('.dot');

    images[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');

    currentSlideIndex = index - 1;

    images[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// MVP Carousel functionality
let currentMVPIndex = 0;

function updateMVPCarousel() {
    const images = document.querySelectorAll('.mvp-image');

    images.forEach((img, index) => {
        img.classList.remove('active', 'prev', 'next');
    });

    const prevIndex = (currentMVPIndex - 1 + images.length) % images.length;
    const nextIndex = (currentMVPIndex + 1) % images.length;

    images[currentMVPIndex].classList.add('active');
    images[prevIndex].classList.add('prev');
    images[nextIndex].classList.add('next');
}

function moveMVPCarousel(direction) {
    const images = document.querySelectorAll('.mvp-image');

    currentMVPIndex += direction;

    if (currentMVPIndex >= images.length) {
        currentMVPIndex = 0;
    } else if (currentMVPIndex < 0) {
        currentMVPIndex = images.length - 1;
    }

    updateMVPCarousel();
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initNavigation();
    initScrollAnimations();
    initCardEffects();
    updateMVPCarousel();

    // Console easter egg
    console.log('%c🚀 Hey there!', 'color: #CAD4DF; font-size: 20px; font-weight: bold;');
    console.log('%c💻 Like what you see? Let\'s build something amazing together!', 'color: #9BA5AE; font-size: 14px;');
});

// Handle window resize for particle canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
