// Navbar scroll effect
(function () {
  const nav = document.querySelector('.navbar-vs');
  if (!nav) return;
  const isHome = nav.classList.contains('transparent');
  const onScroll = () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
      if (isHome) nav.classList.remove('transparent');
    } else {
      nav.classList.remove('scrolled');
      if (isHome) nav.classList.add('transparent');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Reveal on scroll
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
})();

// Animated counters
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const animate = (el) => {
    const target = +el.dataset.count;
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => io.observe(el));
})();

// Contact form (demo)
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const msg = `Hi Virat Safety Nets!%0AName: ${encodeURIComponent(data.name||'')}%0APhone: ${encodeURIComponent(data.phone||'')}%0AService: ${encodeURIComponent(data.service||'')}%0AMessage: ${encodeURIComponent(data.message||'')}`;
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
    form.reset();
    const ok = document.getElementById('formSuccess');
    if (ok) { ok.classList.remove('d-none'); setTimeout(() => ok.classList.add('d-none'), 5000); }
  });
})();
const images = [
  "images/terrace-invisible-grills.png",
  "images/staircase-invisible-grills.png",
  "images/pigeon-nets21.jpeg",
  "images/duct-area-nets13.jpeg",
];

let index = 0;

function changeHeroBg() {
  const hero = document.querySelector(".hero");

  hero.style.backgroundImage =
    `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${images[index]}')`;

  index = (index + 1) % images.length;
}

// slower & smooth
setInterval(changeHeroBg, 5000);

// initial load
changeHeroBg();