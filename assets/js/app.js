// --- 1. PARTICULAS VOXEL NA SIDEBAR ---
function createVoxels() {
    const container = document.getElementById('particles');
    const particleCount = 20;
    const colors = ['#00f3ff', '#9d4edd', '#ff007f', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
        const voxel = document.createElement('div');
        voxel.classList.add('voxel-particle');
        voxel.style.left = Math.random() * 100 + '%';
        voxel.style.animationDelay = Math.random() * 5 + 's';
        voxel.style.animationDuration = (Math.random() * 4 + 4) + 's';
        voxel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        voxel.style.boxShadow = `0 0 6px ${voxel.style.backgroundColor}`;
        container.appendChild(voxel);
    }
}

// --- 2. PARTICULAS GEOMÉTRICAS NO CANVAS (BACKGROUND) ---
function initBackgroundParticles() {
    const canvas = document.getElementById('bg-particles');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const shapes = ['circle', 'triangle', 'square', 'x'];
    const colors = ['#00f3ff', '#9d4edd', '#ff007f', '#ff8c00', '#00f2fe'];
    const particleCount = 45;
    const particles = [];

    class ShapeParticle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 12 + 8;
            this.speedY = Math.random() * 1.2 + 0.4;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.shape = shapes[Math.floor(Math.random() * shapes.length)];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.2;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y < -50 || this.x < -50 || this.x > canvas.width + 50) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;

            switch (this.shape) {
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                    ctx.stroke();
                    break;

                case 'square':
                    ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
                    break;

                case 'triangle':
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size / 2);
                    ctx.lineTo(this.size / 2, this.size / 2);
                    ctx.lineTo(-this.size / 2, this.size / 2);
                    ctx.closePath();
                    ctx.stroke();
                    break;

                case 'x':
                    ctx.beginPath();
                    ctx.moveTo(-this.size / 2, -this.size / 2);
                    ctx.lineTo(this.size / 2, this.size / 2);
                    ctx.moveTo(this.size / 2, -this.size / 2);
                    ctx.lineTo(-this.size / 2, this.size / 2);
                    ctx.stroke();
                    break;
            }

            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        const p = new ShapeParticle();
        p.y = Math.random() * canvas.height;
        particles.push(p);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// --- 3. MENU HAMBÚRGUER MOBILE ---
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Fecha o menu ao clicar em qualquer item
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createVoxels();
    initBackgroundParticles();
    initMobileMenu();
});
