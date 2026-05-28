// ── FAQ accordion ─────────────────────────────────────────────────────────

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── Ambient glow ──────────────────────────────────────────────────────────

(function () {
  const canvas = document.getElementById('glow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Primary upper-right glow
    const x1 = canvas.width  * 0.82;
    const y1 = canvas.height * 0.10;
    const r1 = Math.min(canvas.width, canvas.height) * 0.72;
    const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, r1);
    g1.addColorStop(0,   'rgba(25, 70, 180, 0.22)');
    g1.addColorStop(0.45,'rgba(15, 50, 140, 0.09)');
    g1.addColorStop(1,   'rgba(2, 12, 24, 0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Faint secondary lower-left glow for depth
    const x2 = canvas.width  * 0.1;
    const y2 = canvas.height * 0.85;
    const r2 = Math.min(canvas.width, canvas.height) * 0.5;
    const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, r2);
    g2.addColorStop(0,  'rgba(20, 55, 150, 0.1)');
    g2.addColorStop(1,  'rgba(2, 12, 24, 0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  resize();
  window.addEventListener('resize', resize);
})();

// ── Nav scroll state ───────────────────────────────────────────────────────

(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// ── Scroll-in animations ──────────────────────────────────────────────────

(function () {
  // Inject the in-view class style once — scale(0.97) baseline for a settling feel
  document.head.insertAdjacentHTML('beforeend',
    '<style>.reveal{opacity:0;transform:translateY(12px) scale(0.97);transition:opacity 0.9s var(--ease-out,cubic-bezier(0.23,1,0.32,1)),transform 0.9s var(--ease-out,cubic-bezier(0.23,1,0.32,1))}.reveal.in-view{opacity:1;transform:translateY(0) scale(1)}@media(prefers-reduced-motion:reduce){.reveal{transform:none}.reveal.in-view{opacity:1;transform:none}}</style>'
  );

  const selectors = [
    '.hero-badge', '.hero-headline', '.hero-sub', '.hero-actions',
    '.mockup-window',
    '.proof-stat',
    '.step',
    '.showcase-card',
    '.privacy-box',
    '.download-icon', '.download-badge', '.download-title', '.download-sub', '.btn-large'
  ];

  const els = document.querySelectorAll(selectors.join(','));

  // Stagger per section so each section's elements cascade independently
  const groups = new Map();
  els.forEach(el => {
    const parent = el.closest('section, .testimonial-strip, footer') || document.body;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach(group => {
    group.forEach((el, j) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(j * 0.12, 0.5)}s`;
    });
  });

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );

  els.forEach(el => observer.observe(el));
})();
