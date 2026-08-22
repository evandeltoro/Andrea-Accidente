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

// Contact form — submits natively to Formspree (CORS blocks fetch/AJAX on
// their free no-signup endpoint), then shows a success message when the
// visitor is redirected back here after submitting.
const form = document.getElementById('contact-form');
const isSpanish = document.documentElement.lang === 'es';

if (form) {
  // Just show a "sending" state; let the browser do a normal form POST.
  form.addEventListener('submit', () => {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = isSpanish ? 'Enviando…' : 'Sending…';
    }
  });
}

// If we've just been redirected back from Formspree, show the success message
if (new URLSearchParams(window.location.search).get('submitted') === '1') {
  const successMsg = isSpanish
    ? '<p class="form-success">Gracias — tu solicitud de revisión de caso ha sido enviada. Nuestro equipo se pondrá en contacto contigo pronto.</p>'
    : '<p class="form-success">Thank you — your case review request has been submitted. Our team will reach out shortly.</p>';
  const formEl = document.getElementById('contact-form');
  if (formEl) formEl.innerHTML = successMsg;
  // Clean the URL so refreshing doesn't re-show the message
  const cleanUrl = window.location.pathname + window.location.hash;
  window.history.replaceState({}, document.title, cleanUrl);
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
