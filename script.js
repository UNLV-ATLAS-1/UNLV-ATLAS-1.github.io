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

/* ---- SECTION 1B: IN-PAGE ANCHOR LINKS ----
   Safari can silently fail to jump to an in-page #anchor when the page
   also uses `scroll-behavior: smooth` on <html> together with a sticky
   header - the native jump sometimes just never happens. Handle every
   local hash link (nav, hero CTA, inline text links) explicitly instead
   of relying on native anchor navigation. */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", href);
  });
});

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
