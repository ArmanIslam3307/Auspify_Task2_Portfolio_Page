const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});


 const revealEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

   const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  function showError(input, message) {
    const p = input.closest('div').querySelector('.error-msg');
    p.textContent = message;
    p.classList.remove('hidden');
    input.classList.add('border-red-400');
  }
  function clearError(input) {
    const p = input.closest('div').querySelector('.error-msg');
    p.classList.add('hidden');
    input.classList.remove('border-red-400');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    [name, email, message].forEach(clearError);

    if (name.value.trim().length < 2) {
      showError(name, 'Enter your name.');
      valid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      showError(email, 'Enter a valid email.');
      valid = false;
    }
    if (message.value.trim().length < 10) {
      showError(message, 'Message should be at least 10 characters.');
      valid = false;
    }

    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      statusEl.textContent = 'Message ready — opening your email client to send it.';
      statusEl.classList.remove('hidden');
      statusEl.classList.add('text-server');

      const subject = encodeURIComponent('Portfolio inquiry from ' + name.value.trim());
      const body = encodeURIComponent(message.value.trim() + '\n\n— ' + name.value.trim() + ' (' + email.value.trim() + ')');
      window.location.href = `mailto:your.armanislam3307@gmail.com?subject=${subject}&body=${body}`;

      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      form.reset();
    }, 500);
  });