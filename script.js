// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-links a, .mobile-cta').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ============================================
// SERVICES ACCORDION
// ============================================
document.querySelectorAll('.service-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.service-item').forEach(i => {
      i.classList.remove('active');
    });

    // Toggle clicked
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add reveal class to elements
function initRevealAnimations() {
  const selectors = [
    '.section-header',
    '.project-card',
    '.case-intro',
    '.case-card',
    '.stat-item',
    '.service-item',
    '.about-grid',
    '.process-card',
    '.contact-info',
    '.contact-details',
    '.newsletter-box',
    '.section-label'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.1}s`;
      observer.observe(el);
    });
  });
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(eased * target);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
  counterObserver.observe(counter);
});

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const position = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  });
});

// ============================================
// CONTACT FORM HANDLER
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    btn.textContent = 'Mensagem enviada!';
    btn.style.background = 'var(--accent)';
    btn.style.color = 'var(--text-primary)';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  }, 1500);
});

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();

  // Open first service by default
  const firstService = document.querySelector('.service-item');
  if (firstService) {
    firstService.classList.add('active');
  }
});
