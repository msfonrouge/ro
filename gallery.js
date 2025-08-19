//Lightbox script (no deps)
(function () {
  const items = Array.from(
    document.querySelectorAll("#galleryGrid [data-index]")
  );
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const prev = document.getElementById("lbPrev");
  const next = document.getElementById("lbNext");
  const closeBtn = document.getElementById("lbClose");
  let i = 0;

  function open(idx = 0) {
    i = Math.max(0, Math.min(idx, items.length - 1));
    lbImg.src = items[i].dataset.full;
    lb.classList.remove("hidden");
    lb.classList.add("flex");
    document.body.style.overflow = "hidden"; // lock scroll
  }
  function close() {
    lb.classList.add("hidden");
    lb.classList.remove("flex");
    lbImg.src = "";
    document.body.style.overflow = ""; // restore scroll
  }
  function nav(dir) {
    i = (i + dir + items.length) % items.length;
    lbImg.src = items[i].dataset.full;
  }

  // expose opener (used by gallery links)
  window.lbOpen = open;

  // open by clicking any tile
  items.forEach((btn) =>
    btn.addEventListener("click", () => open(+btn.dataset.index))
  );

  // controls
  closeBtn.addEventListener("click", close);
  prev.addEventListener("click", () => nav(-1));
  next.addEventListener("click", () => nav(1));

  // keyboard
  document.addEventListener("keydown", (e) => {
    if (lb.classList.contains("hidden")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") nav(-1);
    if (e.key === "ArrowRight") nav(1);
  });

  // click backdrop to close (but not when clicking overlays or image)
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });

  // Make any "View Gallery" link open fullscreen at the featured image
  document.querySelectorAll('a[href="#gallery"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      open(0);
    });
  });

  /* --------------------------
                       Touch swipe (mobile)
                       -------------------------- */
  let startX = 0,
    startY = 0,
    isTouching = false,
    hasMoved = false;
  const SWIPE_THRESHOLD = 50; // px min X distance
  const VERTICAL_TOLERANCE = 80; // ignore vertical swipes

  function onTouchStart(e) {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    isTouching = true;
    hasMoved = false;
  }
  function onTouchMove(e) {
    if (!isTouching) return;
    const t = e.touches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dy) < VERTICAL_TOLERANCE) {
      // horizontal gesture -> prevent page scroll while swiping
      e.preventDefault();
      hasMoved = true;
    }
  }
  function onTouchEnd(e) {
    if (!isTouching) return;
    isTouching = false;
    if (!hasMoved) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - startX;

    if (dx <= -SWIPE_THRESHOLD) nav(1); // swipe left -> next
    else if (dx >= SWIPE_THRESHOLD) nav(-1); // swipe right -> prev
  }

  // Attach to the large visual surface (image + overlays)
  [lbImg, prev, next].forEach((el) => {
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
  });
})();
