// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Dynamically measure fixed bar heights so layout never breaks
// (handles font/padding changes and mobile text wrapping automatically)
const utilityBar = document.querySelector('.utility-bar');
const navBar = document.querySelector('.nav');
function updateBarOffsets() {
  if (!utilityBar || !navBar) return;
  document.documentElement.style.setProperty('--utility-h', utilityBar.offsetHeight + 'px');
  document.documentElement.style.setProperty('--nav-h', navBar.offsetHeight + 'px');
}
window.addEventListener('load', updateBarOffsets);
window.addEventListener('resize', updateBarOffsets);
updateBarOffsets();

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-question');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Contact form (placeholder submit handler — wire to real backend/email service later)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks — this form is a placeholder. Connect it to an email/CRM service to go live.');
    form.reset();
  });
}

// Nav background on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(16, 25, 43, 0.97)';
  } else {
    nav.style.background = 'rgba(16, 25, 43, 0.85)';
  }
});
