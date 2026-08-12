/* ---- SECTION 1: MOBILE NAV ---- 
   Toggle hamburger menu open/close on mobile
   Closes menu when a nav link is clicked */
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});
links.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

/* ---- SECTION 6: REVEAL ON SCROLL ----
   Fade in elements as they scroll into view
   Change threshold value to adjust when animation triggers */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* ---- SECTION 7: HERO SVG ANIMATION ----
   Animates the curved line in hero section
   Change "2.4s" in transition to make animation faster/slower */
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const p = document.getElementById("ascent");
  if (p) {
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
    p.style.transition = "stroke-dashoffset 2.4s ease-out";
    requestAnimationFrame(() => { p.style.strokeDashoffset = "0"; });
  }
}
