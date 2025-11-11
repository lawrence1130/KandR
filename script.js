// Mobile-first interaction script
document.addEventListener("DOMContentLoaded", () => {
  const left = document.getElementById("leftPanel");
  const right = document.getElementById("rightPanel");
  const stage = document.getElementById("invitation-stage");
  const inside = document.getElementById("inside");
  const openBtn = document.getElementById("openBtn");
  const pages = document.getElementById("pages");
  const dots = document.querySelectorAll(".dot");
  const bgMusic = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");

  // Click/tap either panel or the button to open the envelope.
  function openEnvelope() {
    // add class to body so CSS moves panels
    document.body.classList.add("envelope-open");
    stage.classList.add("envelope-open");
    // mark inside visible for screen readers
    inside.setAttribute("aria-hidden", "false");
    // After a short delay, reveal the inside (CSS handles opacity)
    setTimeout(() => {
      // show a gentle focus on the KR logo
      const logo = document.getElementById("kr-logo");
      if (logo) logo.focus?.();
    }, 700);
    // hide the CTA button after opening
    openBtn.style.display = "none";
  }

  left.addEventListener("click", openEnvelope);
  right.addEventListener("click", openEnvelope);
  openBtn.addEventListener("click", openEnvelope);

  // Page dots update on scroll
  pages.addEventListener("scroll", () => {
    // width of single page
    const w = pages.clientWidth;
    const idx = Math.round(pages.scrollLeft / w);
    updateDots(idx);
  });

  function updateDots(i) {
    dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  }

  // Swipe 'snap' helper for keyboard (arrow) navigation
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowRight") {
      pages.scrollLeft += pages.clientWidth;
    } else if (ev.key === "ArrowLeft") {
      pages.scrollLeft -= pages.clientWidth;
    }
  });

  // Music controls
  let playing = false;
  musicToggle.addEventListener("click", () => {
    if (!playing) {
      // Try to play (some browsers require user interaction)
      bgMusic.play().then(() => {
        playing = true;
        musicToggle.textContent = "Pause music";
      }).catch((e) => {
        // If autoplay or play disallowed, still flip state visually
        playing = false;
        musicToggle.textContent = "Play music";
        console.warn("Autoplay blocked:", e);
      });
    } else {
      bgMusic.pause();
      playing = false;
      musicToggle.textContent = "Play music";
    }
  });

  // initial label
  musicToggle.textContent = "Play music";

  // Optional: when user taps the center logo, open envelope
  const logo = document.getElementById("logo");
  if (logo) {
    logo.addEventListener("click", openEnvelope);
  }

  // Touch: short tap to open for mobile
  let touchStartTs = 0;
  document.addEventListener("touchstart", (e) => {
    touchStartTs = Date.now();
  }, {passive:true});
  document.addEventListener("touchend", (e) => {
    const t = Date.now() - touchStartTs;
    if (t < 200) {
      // short tap -> open
      // but only if not yet opened
      if (!document.body.classList.contains("envelope-open")) {
        openEnvelope();
      }
    }
  });

  // If user uploaded a PNG for the KR logo, place its path in images/kr.png and replace src.
  // (We assume you will replace images/kr-placeholder.png with your real logo file)
});
