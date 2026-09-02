// ============================================
// Aditya Sharma Portfolio — Interactions
// ============================================

// --- Theme Toggle ---
const themeToggle = document.getElementById('themeToggle');
const toggleThumb = themeToggle?.querySelector('.toggle-thumb');
const body = document.body;

function setTheme(light) {
  if (light) {
    body.classList.add('light');
    toggleThumb.textContent = '🌙';
    themeToggle.classList.add('light');
  } else {
    body.classList.remove('light');
    toggleThumb.textContent = '☀️';
    themeToggle.classList.remove('light');
  }
  localStorage.setItem('theme', light ? 'light' : 'dark');
}

// Load saved theme
const saved = localStorage.getItem('theme');
if (saved === 'light') setTheme(true);

themeToggle?.addEventListener('click', () => {
  setTheme(!body.classList.contains('light'));
});

// Keyboard support for theme toggle
themeToggle?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    setTheme(!body.classList.contains('light'));
  }
});

// --- Mobile Nav ---
const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close nav on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close nav on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }
});

// --- Scroll Animations ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in, .project-card, .tool-group, .skill-badge, .section-title, h2').forEach(el => observer.observe(el));

// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${id}`) a.classList.add('active');
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// --- Email Reveal ---
const emailReveal = document.getElementById('emailReveal');
if (emailReveal) {
  // Email split into parts to avoid scrapers
  const parts = ['hello', '@', 'adityasharma', '.', 'in'];
  function toggleEmail() {
    const placeholder = emailReveal.querySelector('.email-placeholder');
    const address = emailReveal.querySelector('.email-address');
    if (address.style.display === 'none') {
      address.textContent = parts.join('');
      address.style.display = 'inline';
      placeholder.style.display = 'none';
    } else {
      // Copy to clipboard
      navigator.clipboard.writeText(address.textContent).then(() => {
        address.textContent = 'Copied!';
        setTimeout(() => { address.textContent = parts.join(''); }, 1500);
      });
    }
  }
  emailReveal.addEventListener('click', toggleEmail);
  emailReveal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleEmail();
    }
  });
}

// --- Stagger delays for skill badges ---
document.querySelectorAll('.skills-container .skill-badge').forEach((badge, i) => {
  badge.style.transitionDelay = (i * 0.04) + 's';
});

// --- Stagger delays for project cards ---
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.1) + 's';
});

// --- Stagger delays for tool groups ---
document.querySelectorAll('.tool-group').forEach((group, i) => {
  group.style.transitionDelay = (i * 0.1) + 's';
});

// --- Tilt effect on project cards ---
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) perspective(600px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// --- Nav scroll shadow ---
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
});

// --- Smooth Scroll for Safari ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================
// ADVANCED ANIMATIONS
// ============================================

// --- Floating Particles ---
(function initParticles() {
  // Skip on mobile or if user prefers reduced motion
  if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;
  let animating = true;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    animating = !document.hidden;
    if (animating) animate();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 197, 71, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 25; i++) particles.push(new Particle());

  function animate() {
    if (!animating) return;
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(232, 197, 71, ${0.05 * (1 - dist / 100)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// --- Typing Effect on Tagline ---
(function initTyping() {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;
  const text = tagline.textContent;
  tagline.textContent = '';
  tagline.style.visibility = 'visible';
  let i = 0;
  function type() {
    if (i < text.length) {
      tagline.textContent += text.charAt(i);
      i++;
      setTimeout(type, 55 + Math.random() * 35);
    }
  }
  setTimeout(type, 350);
})();

// --- Counter Animation for Stats ---
(function initCounters() {
  const stats = document.querySelectorAll('.hero-stats .stat-number');
  stats.forEach(stat => {
    const text = stat.textContent;
    const match = text.match(/(\d+)/);
    if (!match) return;
    const target = parseInt(match[1]);
    const prefix = text.split(match[1])[0];
    const suffix = text.substring(text.indexOf(match[1]) + match[1].length);
    stat.textContent = prefix + '0' + suffix;
    const duration = 1200;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      stat.textContent = prefix + Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    setTimeout(() => requestAnimationFrame(update), 600);
  });
})();

// --- Magnetic Cursor on Buttons ---
document.querySelectorAll('.btn, .contact-link').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});


