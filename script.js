// ============================================
// VORTX FRAGRANCES — INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Sticky nav background on scroll ---- */
  const nav = document.getElementById('siteNav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ---- Scroll reveal ---- */
  const revealTargets = document.querySelectorAll(
    '.narrative-label, .narrative-copy, .note-card, .offer-frame, .order-form, .section-head'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => io.observe(el));

  /* ---- Countdown timer ---- */
  const offerEnd = new Date();
  offerEnd.setDate(offerEnd.getDate() + 2);
  offerEnd.setHours(offerEnd.getHours() + 14);
  offerEnd.setMinutes(offerEnd.getMinutes() + 36);

  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');

  const pad = (n) => String(n).padStart(2, '0');

  function tickCountdown() {
    const now = new Date();
    let diff = Math.max(0, offerEnd - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);
    const secs = Math.floor(diff / 1000);

    if (cdDays) cdDays.textContent = pad(days);
    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMins) cdMins.textContent = pad(mins);
    if (cdSecs) cdSecs.textContent = pad(secs);
  }

  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---- Order form ---- */
  const form = document.getElementById('orderForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('fullName')?.trim();

      // رسالة نجاح مسبوكة بالعربية تواجه العميل
      formNote.textContent = `تسلم يا ${name || 'يا خويي'} — تم حجز طلبك بنجاح! بـ نتصل بك طيارة لتأكيد الشحن طال عمرك.`;
      form.reset();

      const qty = document.getElementById('quantity');
      if (qty) qty.value = 1;
    });
  }

});
