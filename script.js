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
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    const wasOpen = links.classList.contains("open");
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    // Closing the mobile menu animates it out via CSS transform; jumping to the
    // anchor in the same click can race that transition on some mobile browsers
    // and silently drop the navigation. Do it explicitly on the next frame instead.
    if (wasOpen && href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    }
  })
);

/* ---- SECTION 6: REVEAL ON SCROLL ----
   Fade in elements as they scroll into view
   Change threshold value to adjust when animation triggers */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Safety net: if IntersectionObserver never fires for an element (JS error,
// browser quirk, timing issue), don't leave it permanently invisible.
setTimeout(() => {
  document.querySelectorAll(".reveal:not(.in)").forEach(el => el.classList.add("in"));
}, 2000);

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
