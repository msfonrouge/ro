// Mobile accordion toggle (no scroll lock, no auto-close on outside taps)
(function () {
  const btn = document.getElementById("navToggle");
  const panel = document.getElementById("navLinks");

  function setOpen(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
  }

  btn?.addEventListener("click", () => {
    const open = panel.style.maxHeight && panel.style.maxHeight !== "0px";
    setOpen(!open);
  });

  // Close after clicking a link (optional)
  panel
    .querySelectorAll("a.navlink")
    .forEach((a) => a.addEventListener("click", () => setOpen(false)));

  // Ensure closed on load
  setOpen(false);
})();

// Keep nav light on scroll (just a tiny change, no dark overlay)
(function () {
  const nav = document.getElementById("mainNav");
  const add = [
    "bg-[rgba(12,12,12,0.28)]",
    "supports-[backdrop-filter]:bg-[rgba(12,12,12,0.18)]",
    "border-white/10",
  ];
  const remove = [
    "bg-[rgba(12,12,12,0.22)]",
    "supports-[backdrop-filter]:bg-[rgba(12,12,12,0.14)]",
    "border-white/10",
  ];

  function onScroll() {
    if (window.scrollY > 10) nav.classList.add(...add);
    else nav.classList.remove(...add);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// Active section underline + color
(function () {
  const links = Array.from(document.querySelectorAll('a.navlink[href^="#"]'));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = "#" + entry.target.id;
        const link = links.find((a) => a.getAttribute("href") === id);
        if (!link) return;
        if (entry.isIntersecting) {
          link.classList.add("text-white", "after:w-full");
          link.classList.remove("text-white/80");
        } else {
          link.classList.remove("text-white", "after:w-full");
          link.classList.add("text-white/80");
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );
  sections.forEach((sec) => io.observe(sec));
})();
