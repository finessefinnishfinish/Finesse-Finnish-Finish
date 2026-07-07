// Finesse Finnish Finish — site interactions

document.getElementById("year").textContent = new Date().getFullYear();

/* Mobile nav toggle */
const navToggle = document.getElementById("nav-toggle");
const primaryNav = document.getElementById("primary-nav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* Scroll-reveal */
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

/* Starfield canvas in hero */
(function starfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [];
  let width, height;

  function resize() {
    const hero = canvas.parentElement;
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
    const count = Math.round((width * height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.008 + 0.002,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const s of stars) {
      s.a += s.speed;
      const alpha = (Math.sin(s.a) + 1) / 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(26, 99, 224, ${0.15 + alpha * 0.5})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.addEventListener("resize", resize);
  resize();
  if (!prefersReducedMotion) draw();
})();
