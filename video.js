const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const videoBtn = document.querySelector('button[onclick="openVideo()"]');

function openVideo() {
  videoModal.classList.remove("hidden");
  videoModal.classList.add("flex");
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const base =
    "https://www.youtube.com/embed/9wwh_6eA33M?rel=0&modestbranding=1";
  videoFrame.src = prefersReduced ? base : base + "&autoplay=1";
  setTimeout(() => videoModal.querySelector("button").focus(), 0);
}
function closeVideo() {
  videoModal.classList.add("hidden");
  videoModal.classList.remove("flex");
  videoFrame.src = "";
  videoBtn?.focus();
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !videoModal.classList.contains("hidden"))
    closeVideo();
});
