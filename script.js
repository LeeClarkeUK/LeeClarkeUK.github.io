const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function setupReveal() {
  if (prefersReducedMotion) return;

  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 55, 280)}ms`;
    observer.observe(item);
  });
}

function setupHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const glyphs = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const fontSize = prefersReducedMotion ? 22 : 20;
  let drops = [];
  let speed = [];
  let width = canvas.width;
  let height = canvas.height;
  let pointerX = null;

  function setPointerFromClientX(clientX) {
    const rect = canvas.getBoundingClientRect();
    pointerX = ((clientX - rect.left) / rect.width) * width;
  }

  function createDrops() {
    const count = Math.max(10, Math.floor(width / fontSize));
    drops = Array.from({ length: count }, () => -Math.floor(Math.random() * 30));
    speed = Array.from(
      { length: count },
      () => (prefersReducedMotion ? 0.22 : 0.58) + Math.random() * (prefersReducedMotion ? 0.16 : 0.34)
    );
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(320, Math.floor(rect.width));
    height = Math.max(240, Math.floor((rect.width * 3) / 4));
    canvas.width = width;
    canvas.height = height;
    createDrops();
  }

  function draw() {
    context.fillStyle = "rgba(0, 4, 0, 0.15)";
    context.fillRect(0, 0, width, height);
    context.font = `700 ${fontSize}px "Space Grotesk", monospace`;
    context.textBaseline = "top";

    for (let i = 0; i < drops.length; i += 1) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      const glyph = glyphs[(Math.random() * glyphs.length) | 0];

      const proximity =
        pointerX === null ? 0 : Math.max(0, 110 - Math.abs(x - pointerX)) / 110;
      const boost = prefersReducedMotion ? 0 : proximity * 0.95;

      for (let tail = 0; tail < 8; tail += 1) {
        const tailY = y - tail * fontSize;
        if (tailY < -fontSize || tailY > height + fontSize) continue;

        if (tail === 0) {
          context.fillStyle = "rgba(228, 255, 228, 0.95)";
        } else {
          const alpha = Math.max(0.08, 0.65 - tail * 0.09);
          context.fillStyle = `rgba(25, 255, 130, ${alpha})`;
        }

        context.fillText(glyph, x, tailY);
      }

      drops[i] += speed[i] + boost;

      if (y > height && Math.random() > 0.975) {
        drops[i] = -Math.floor(Math.random() * 30);
        speed[i] = (prefersReducedMotion ? 0.22 : 0.58) + Math.random() * (prefersReducedMotion ? 0.16 : 0.34);
      }
    }

    requestAnimationFrame(draw);
  }

  canvas.addEventListener("mousemove", (event) => {
    setPointerFromClientX(event.clientX);
  });

  canvas.addEventListener("mouseleave", () => {
    pointerX = null;
  });

  canvas.addEventListener("pointerdown", (event) => {
    setPointerFromClientX(event.clientX);
  });

  canvas.addEventListener("pointermove", (event) => {
    setPointerFromClientX(event.clientX);
  });

  canvas.addEventListener("pointerup", () => {
    pointerX = null;
  });

  canvas.addEventListener("pointercancel", () => {
    pointerX = null;
  });

  canvas.addEventListener(
    "touchstart",
    (event) => {
      if (!event.touches.length) return;
      setPointerFromClientX(event.touches[0].clientX);
    },
    { passive: true }
  );

  canvas.addEventListener(
    "touchmove",
    (event) => {
      if (!event.touches.length) return;
      setPointerFromClientX(event.touches[0].clientX);
    },
    { passive: true }
  );

  canvas.addEventListener("touchend", () => {
    pointerX = null;
  });

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  context.fillStyle = "#000300";
  context.fillRect(0, 0, width, height);
  draw();
}

setupReveal();
setupHeroCanvas();
