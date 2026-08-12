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
   Change threshold value to adjust when animation triggers
   Includes fallback for iOS Safari where IntersectionObserver can misfire */
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px 50px 0px" });
  revealEls.forEach(el => io.observe(el));

  /* Safety net: if any .reveal element still lacks .in after 3s, force visible */
  setTimeout(() => {
    revealEls.forEach(el => {
      if (!el.classList.contains("in")) {
        el.classList.add("reveal-fallback");
      }
    });
  }, 3000);
} else {
  revealEls.forEach(el => el.classList.add("reveal-fallback"));
}

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
