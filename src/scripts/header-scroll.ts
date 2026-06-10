const header = document.getElementById("site-header");
if (header) {
  const update = () => header.classList.toggle("scrolled", window.scrollY > 8);
  update();
  window.addEventListener("scroll", update, { passive: true });
}
