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

// Contact form — submits to Formspree via AJAX, shows inline success/error message
const form = document.getElementById('contact-form');
const isSpanish = document.documentElement.lang === 'es';

if (form) {
  const successMsg = isSpanish
    ? '<p class="form-success">Gracias — tu solicitud de revisión de caso ha sido enviada. Nuestro equipo se pondrá en contacto contigo pronto.</p>'
    : '<p class="form-success">Thank you — your case review request has been submitted. Our team will reach out shortly.</p>';
  const errorMsg = isSpanish
    ? 'Hubo un problema al enviar el formulario. Por favor intenta de nuevo o llámanos directamente.'
    : 'Something went wrong submitting the form. Please try again or call us directly.';
  const sendingText = isSpanish ? 'Enviando…' : 'Sending…';

  const invalidPhoneMsg = isSpanish
    ? 'Por favor ingresa un número de teléfono válido de 10 dígitos.'
    : 'Please enter a valid 10-digit phone number.';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate phone has exactly 10 digits (ignoring formatting characters)
    const phoneInput = form.querySelector('input[name="phone"]');
    const digitsOnly = phoneInput.value.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      phoneInput.setCustomValidity(invalidPhoneMsg);
      form.reportValidity();
      phoneInput.addEventListener('input', function clearCustom() {
        phoneInput.setCustomValidity('');
        phoneInput.removeEventListener('input', clearCustom);
      });
      return;
    }
    phoneInput.setCustomValidity('');

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = sendingText;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.innerHTML = successMsg;
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        alert(errorMsg);
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      alert(errorMsg);
    }
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
