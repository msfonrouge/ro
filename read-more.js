// Toggle read more/less sin dependencias
(function () {
  const btn = document.getElementById("overview-toggle");
  const more = document.getElementById("overview-more");
  if (!btn || !more) return;

  function setState(expanded) {
    btn.setAttribute("aria-expanded", expanded ? "true" : "false");
    btn.textContent = expanded ? "Leer menos" : "Leer más";
    more.classList.toggle("hidden", !expanded);
  }

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    setState(!expanded);
  });

  // Estado inicial (oculto)
  setState(false);
})();
