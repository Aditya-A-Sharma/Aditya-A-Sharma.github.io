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
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- Scroll Animations ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

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
  emailReveal.addEventListener('click', () => {
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
  });
}

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
