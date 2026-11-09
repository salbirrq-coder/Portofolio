    document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2500);
    });

    setTimeout(() => {
        loader.classList.add('hidden');
    }, 3000);

    // Particles
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '0, 240, 255' : '123, 47, 255';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                this.x -= dx * 0.01;
                this.y -= dy * 0.01;
            }

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const numberOfParticles = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // Navbar
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active Nav Link
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Typing Animation
    const typingText = document.getElementById('typing-text');
    const texts = [
        'Programmer',
        'Web Developer',
        'Digital Creator',
        'UI/UX Enthusiast',
        'Tech Lover'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();

    // Scroll Reveal
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Smooth Scroll
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

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
    });

    // Tilt Effect on Code Window
    const codeWindow = document.querySelector('.code-window');

    if (codeWindow) {
        codeWindow.addEventListener('mousemove', (e) => {
            const rect = codeWindow.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            codeWindow.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        codeWindow.addEventListener('mouseleave', () => {
            codeWindow.style.transform = '';
        });
    }

    // 3D Tilt on Cards
    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
        card.classList.add('tiltable');

        const glare = document.createElement('span');
        glare.className = 'tilt-glare';
        glare.setAttribute('aria-hidden', 'true');
        card.appendChild(glare);

        const maxTilt = 9;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            const rotateX = ((0.5 - py) * maxTilt * 2).toFixed(2);
            const rotateY = ((px - 0.5) * maxTilt * 2).toFixed(2);

            card.style.transition = 'transform 0.1s ease-out';
            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            glare.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
            glare.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)';
            card.style.transform = '';
        });
    });

    // Magnetic Effect on Buttons
    document.querySelectorAll('.btn, .social-link').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    // Text Scramble Effect on Hover
    const scrambleChars = '!<>-_\\/[]{}—=+*^?#________';

    function scrambleText(element) {
        const originalText = element.textContent;
        let iterations = 0;

        const interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                })
                .join('');

            if (iterations >= originalText.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);
    }

    document.querySelectorAll('.nav-link, .project-info h3').forEach(el => {
        el.addEventListener('mouseenter', () => scrambleText(el));
    });

    // Random Glitch Effect
    function glitchEffect() {
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.classList.add('glitch');
            setTimeout(() => logo.classList.remove('glitch'), 100);
        }
    }

    setInterval(glitchEffect, 5000);

    // Add Glitch CSS
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        .glitch {
            animation: glitch 0.3s ease;
        }
        @keyframes glitch {
            0% { transform: translate(0); filter: hue-rotate(0deg); }
            20% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
            40% { transform: translate(-2px, -2px); filter: hue-rotate(180deg); }
            60% { transform: translate(2px, 2px); filter: hue-rotate(270deg); }
            80% { transform: translate(2px, -2px); filter: hue-rotate(360deg); }
            100% { transform: translate(0); filter: hue-rotate(0deg); }
        }
    `;
    document.head.appendChild(glitchStyle);

    // 3D Holographic Hero Scene
    const sceneCanvas = document.getElementById('scene-3d');
    const heroSection = document.querySelector('.hero');

    if (sceneCanvas && sceneCanvas.getContext && heroSection) {
        const sceneCtx = sceneCanvas.getContext('2d');
        const TAU = Math.PI * 2;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const codeWindowEl = document.querySelector('.code-window');

        let viewW = 0;
        let viewH = 0;
        let centerX = 0;
        let centerY = 0;
        let globeR = 260;
        let pixelRatio = 1;
        let pointerX = 0;
        let pointerY = 0;
        let targetX = 0;
        let targetY = 0;
        let inView = true;
        let running = false;
        let frameId = null;

        // Globe geometry: latitude circles + meridians
        const globeRings = [];

        [-64, -32, 0, 32, 64].forEach(latDeg => {
            const lat = latDeg * Math.PI / 180;
            const pts = [];
            for (let i = 0; i <= 80; i++) {
                const a = i / 80 * TAU;
                pts.push([Math.cos(a) * Math.cos(lat), Math.sin(lat), Math.sin(a) * Math.cos(lat)]);
            }
            globeRings.push({ pts, color: '0, 240, 255', alpha: 0.85 });
        });

        for (let lonDeg = 0; lonDeg < 180; lonDeg += 30) {
            const lon = lonDeg * Math.PI / 180;
            const pts = [];
            for (let i = 0; i <= 80; i++) {
                const a = i / 80 * TAU;
                pts.push([Math.sin(a) * Math.cos(lon), Math.cos(a), Math.sin(a) * Math.sin(lon)]);
            }
            globeRings.push({ pts, color: '123, 47, 255', alpha: 0.7 });
        }

        // Orbiting rings
        const orbits = [
            { tiltX: 1.18, tiltZ: 0.28, speed: 0.32, radius: 1.12, color: '0, 240, 255', nodes: 2, alpha: 0.85 },
            { tiltX: -0.5, tiltZ: -0.92, speed: -0.22, radius: 1.22, color: '123, 47, 255', nodes: 3, alpha: 0.8 },
            { tiltX: 0.42, tiltZ: 1.48, speed: 0.16, radius: 1.32, color: '255, 0, 255', nodes: 1, alpha: 0.6 }
        ];

        orbits.forEach(orbit => {
            orbit.pts = [];
            for (let i = 0; i <= 96; i++) {
                const a = i / 96 * TAU;
                orbit.pts.push([Math.cos(a) * orbit.radius, 0, Math.sin(a) * orbit.radius]);
            }
        });

        // Glowing dust on the globe surface
        const dust = [];
        for (let i = 0; i < 16; i++) {
            const theta = Math.random() * TAU;
            const phi = Math.acos(Math.random() * 2 - 1);
            dust.push([
                Math.sin(phi) * Math.cos(theta),
                Math.cos(phi),
                Math.sin(phi) * Math.sin(theta)
            ]);
        }

        function rotatePoint(p, rx, ry, rz) {
            let cos = Math.cos(rx);
            let sin = Math.sin(rx);
            let y = p[1] * cos - p[2] * sin;
            let z = p[1] * sin + p[2] * cos;
            let x = p[0];

            cos = Math.cos(ry);
            sin = Math.sin(ry);
            const x1 = x * cos + z * sin;
            z = -x * sin + z * cos;
            x = x1;

            cos = Math.cos(rz);
            sin = Math.sin(rz);
            const y1 = x * sin + y * cos;
            x = x * cos - y * sin;
            y = y1;

            return [x, y, z];
        }

        function projectPoint(p, radius) {
            const camera = 3.6;
            const factor = camera / (camera - p[2]);
            return [centerX + p[0] * radius * factor, centerY + p[1] * radius * factor, p[2]];
        }

        function strokeDepth(pts, color, alpha, width) {
            const buckets = [[], [], [], [], []];

            for (let i = 0; i < pts.length - 1; i++) {
                const a = pts[i];
                const b = pts[i + 1];
                const z = (a[2] + b[2]) / 2;
                const bucket = Math.max(0, Math.min(4, Math.floor((z + 1.3) / 2.6 * 5)));
                buckets[bucket].push(a, b);
            }

            for (let b = 0; b < buckets.length; b++) {
                const segments = buckets[b];
                if (!segments.length) continue;

                const depth = (b + 0.5) / buckets.length;
                sceneCtx.strokeStyle = `rgba(${color}, ${((0.06 + depth * 0.55) * alpha).toFixed(3)})`;
                sceneCtx.lineWidth = (0.5 + depth * 1.4) * width;
                sceneCtx.beginPath();

                for (let i = 0; i < segments.length; i += 2) {
                    sceneCtx.moveTo(segments[i][0], segments[i][1]);
                    sceneCtx.lineTo(segments[i + 1][0], segments[i + 1][1]);
                }

                sceneCtx.stroke();
            }
        }

        function drawGlowNode(p, color, scale, radius) {
            const pr = projectPoint(p, radius || globeR);
            const depth = Math.max(0, Math.min(1, (p[2] + 1.3) / 2.6));
            const size = (1.2 + depth * 2.6) * scale;
            const glow = sceneCtx.createRadialGradient(pr[0], pr[1], 0, pr[0], pr[1], size * 6);

            glow.addColorStop(0, `rgba(${color}, ${0.5 + depth * 0.4})`);
            glow.addColorStop(0.3, `rgba(${color}, ${0.18 + depth * 0.22})`);
            glow.addColorStop(1, `rgba(${color}, 0)`);

            sceneCtx.fillStyle = glow;
            sceneCtx.beginPath();
            sceneCtx.arc(pr[0], pr[1], size * 6, 0, TAU);
            sceneCtx.fill();

            sceneCtx.fillStyle = `rgba(255, 255, 255, ${0.35 + depth * 0.55})`;
            sceneCtx.beginPath();
            sceneCtx.arc(pr[0], pr[1], Math.max(0.6, size * 0.55), 0, TAU);
            sceneCtx.fill();
        }

        function renderScene(timestamp) {
            if (!viewW || !viewH) return;

            const t = timestamp / 1000;

            pointerX += (targetX - pointerX) * 0.045;
            pointerY += (targetY - pointerY) * 0.045;

            const radius = globeR * (1 + Math.sin(t * 0.8) * 0.015);
            const tiltX = -0.28 + pointerY * 0.32;
            const spin = t * 0.18 + pointerX * 0.7;

            sceneCtx.clearRect(0, 0, viewW, viewH);

            // Soft bloom behind the hologram
            const bloom = sceneCtx.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, radius * 1.9);
            bloom.addColorStop(0, 'rgba(0, 240, 255, 0.10)');
            bloom.addColorStop(0.35, 'rgba(123, 47, 255, 0.07)');
            bloom.addColorStop(1, 'rgba(5, 5, 9, 0)');
            sceneCtx.fillStyle = bloom;
            sceneCtx.beginPath();
            sceneCtx.arc(centerX, centerY, radius * 1.9, 0, TAU);
            sceneCtx.fill();

            // Globe
            globeRings.forEach(ring => {
                const projected = ring.pts.map(p => projectPoint(rotatePoint(p, tiltX, spin, 0), radius));
                strokeDepth(projected, ring.color, ring.alpha, 1);
            });

            dust.forEach(p => {
                drawGlowNode(rotatePoint(p, tiltX, spin, 0), '255, 255, 255', 0.4, radius);
            });

            // Orbits + travelling nodes
            orbits.forEach(orbit => {
                const orbitSpin = t * orbit.speed;
                const place = p => {
                    let q = rotatePoint(p, 0, orbitSpin, 0);
                    q = rotatePoint(q, orbit.tiltX, 0, orbit.tiltZ);
                    return rotatePoint(q, tiltX * 0.6, spin * 0.5, 0);
                };

                strokeDepth(orbit.pts.map(p => projectPoint(place(p), radius)), orbit.color, orbit.alpha, 0.9);

                for (let n = 0; n < orbit.nodes; n++) {
                    const angle = n * TAU / orbit.nodes + t * 0.45;
                    const node = [Math.cos(angle) * orbit.radius, 0, Math.sin(angle) * orbit.radius];
                    drawGlowNode(place(node), orbit.color, 0.85, radius);
                }
            });
        }

        function sceneLoop(timestamp) {
            if (!running) return;
            renderScene(timestamp);
            frameId = requestAnimationFrame(sceneLoop);
        }

        function startScene() {
            if (running || reducedMotion || !inView || document.hidden) return;
            running = true;
            frameId = requestAnimationFrame(sceneLoop);
        }

        function stopScene() {
            running = false;
            if (frameId !== null) cancelAnimationFrame(frameId);
            frameId = null;
        }

        function resizeScene() {
            const rect = sceneCanvas.getBoundingClientRect();
            viewW = rect.width;
            viewH = rect.height;

            if (!viewW || !viewH) {
                stopScene();
                return;
            }

            pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            sceneCanvas.width = Math.round(viewW * pixelRatio);
            sceneCanvas.height = Math.round(viewH * pixelRatio);
            sceneCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

            if (codeWindowEl) {
                const winRect = codeWindowEl.getBoundingClientRect();
                if (winRect.width) {
                    centerX = winRect.left - rect.left + winRect.width / 2;
                    centerY = winRect.top - rect.top + winRect.height / 2;
                } else {
                    centerX = viewW / 2;
                    centerY = viewH / 2;
                }
            } else {
                centerX = viewW / 2;
                centerY = viewH / 2;
            }

            globeR = Math.max(180, Math.min(viewW * 0.30, viewH * 0.40, 360));

            if (reducedMotion) {
                renderScene(0);
            } else {
                startScene();
            }
        }

        resizeScene();
        window.addEventListener('resize', resizeScene);
        window.addEventListener('load', resizeScene);

        if (window.ResizeObserver) {
            const sceneObserver = new ResizeObserver(resizeScene);
            sceneObserver.observe(heroSection);
            if (codeWindowEl) sceneObserver.observe(codeWindowEl);
        }

        if ('IntersectionObserver' in window) {
            const sceneVisibility = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    inView = entry.isIntersecting;
                    if (inView) {
                        startScene();
                    } else {
                        stopScene();
                    }
                });
            }, { threshold: 0.05 });
            sceneVisibility.observe(heroSection);
        }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopScene();
            } else {
                startScene();
            }
        });

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        });

        heroSection.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
        });
    }

    // Page Visibility
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = 'KAL - Come Back!';
        } else {
            document.title = 'Kaisyalbi Asyrafi Launi — Programmer';
        }
    });
});
