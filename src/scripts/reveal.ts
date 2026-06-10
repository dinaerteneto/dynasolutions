const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
if (prefersReduced) {
  items.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  items.forEach((el) => io.observe(el));
}
