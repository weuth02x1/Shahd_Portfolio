// Stars Background Animation
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.fadeSpeed = (Math.random() - 0.5) * 0.02;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.fadeSpeed;
        
        if (this.opacity <= 0.2 || this.opacity >= 1) {
            this.fadeSpeed = -this.fadeSpeed;
        }
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.shadowBlur = 3;
        ctx.shadowColor = `rgba(255, 255, 255, ${this.opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

let stars = [];
for (let i = 0; i < 300; i++) {
    stars.push(new Star());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mobile Menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Contact Form with Formspree (SIMPLIFIED)
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch('https://formspree.io/f/mvzqvkad', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = '✓ Thank you! Your message has been sent successfully!';
                formStatus.style.display = 'block';
                form.reset();
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            } else {
                const data = await response.json();
                formStatus.className = 'form-status error';
                formStatus.textContent = '✗ ' + (data.error || 'There was a problem sending your message.');
                formStatus.style.display = 'block';
            }
        } catch (error) {
            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Network error. Please check your connection and try again.';
            formStatus.style.display = 'block';
        }
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('🚀 Portfolio loaded! Stars are shining! ✨');

// Read More / Show Less in Projects
const readMoreBtns = document.querySelectorAll('.read-more-btn');

readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectContent = btn.closest('.project-content');
        const isExpanded = projectContent.classList.contains('expanded');
        
        if (isExpanded) {
            projectContent.classList.remove('expanded');
            btn.textContent = 'Show More';
        } else {
            projectContent.classList.add('expanded');
            btn.textContent = 'Show Less';
        }
    });
});

// Show More / Show Less in Project Descriptions (FIXED)
document.addEventListener('DOMContentLoaded', () => {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectDesc = btn.previousElementSibling;
            const isExpanded = projectDesc.classList.contains('expanded');
            
            if (isExpanded) {
                projectDesc.classList.remove('expanded');
                btn.textContent = 'Show More';
            } else {
                projectDesc.classList.add('expanded');
                btn.textContent = 'Show Less';
            }
        });
    });
});