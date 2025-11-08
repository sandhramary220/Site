/* ==============================
   Lightbox + Image Navigation
============================== */
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const thumbs = document.querySelectorAll(".thumb");
  const closeBtn = document.getElementById("close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;
  let currentGroup = [];

  // Open Lightbox
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      const parentGrid = thumb.closest(".gallery-grid, .masonry-grid");
      currentGroup = Array.from(parentGrid.querySelectorAll(".thumb"));
      currentIndex = currentGroup.indexOf(thumb);
      openLightbox(thumb.dataset.src);
    });
  });

  function openLightbox(src) {
    lightbox.classList.add("active");
    lightboxImg.classList.remove("fade-in");
    void lightboxImg.offsetWidth; // Reset animation
    lightboxImg.src = src;
    lightboxImg.classList.add("fade-in");
  }

  // Navigation Buttons
  prevBtn?.addEventListener("click", () => navigate(-1));
  nextBtn?.addEventListener("click", () => navigate(1));

  function navigate(direction) {
    if (!currentGroup.length) return;
    currentIndex = (currentIndex + direction + currentGroup.length) % currentGroup.length;
    const nextImg = currentGroup[currentIndex].dataset.src;
    lightboxImg.classList.remove("fade-in");
    void lightboxImg.offsetWidth;
    lightboxImg.src = nextImg;
    lightboxImg.classList.add("fade-in");
  }

  // Close Lightbox
  closeBtn?.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  // Close on outside click
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active");
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") lightbox.classList.remove("active");
    if (e.key === "ArrowRight") navigate(1);
    if (e.key === "ArrowLeft") navigate(-1);
  });

  /* ==============================
     Autoplay & Loop for Reel
  ==============================
  */
  const reelVideo = document.querySelector("#reel-video");
  if (reelVideo) {
    reelVideo.loop = true;
    reelVideo.muted = true;
    reelVideo.play().catch(() => {
      // Some browsers block autoplay; fallback
      reelVideo.addEventListener("click", () => reelVideo.play());
    });
  }
});

/* ==============================
   Fade Animation
============================== */
const style = document.createElement("style");
style.textContent = `
  .fade-in {
    opacity: 0;
    animation: fadeIn 0.4s forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);
