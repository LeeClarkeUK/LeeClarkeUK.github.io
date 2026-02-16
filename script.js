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
  if (!canvas || prefersReducedMotion) return;

  const context = canvas.getContext("2d");
  if (!context) return;

  const pointer = { x: canvas.width * 0.5, y: canvas.height * 0.5 };
  const points = [];
  const spacing = 32;

  for (let y = spacing; y < canvas.height; y += spacing) {
    for (let x = spacing; x < canvas.width; x += spacing) {
      points.push({ x, y, ox: x, oy: y });
    }
  }

  function setPointerFromClientPosition(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * canvas.width;
    pointer.y = ((clientY - rect.top) / rect.height) * canvas.height;
  }

  function resetPointer() {
    pointer.x = canvas.width * 0.5;
    pointer.y = canvas.height * 0.5;
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(7, 16, 24, 0.9)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    points.forEach((p) => {
      const dx = pointer.x - p.x;
      const dy = pointer.y - p.y;
      const distance = Math.hypot(dx, dy) || 1;
      const force = Math.max(0, 120 - distance) / 120;
      const angle = Math.atan2(dy, dx);

      p.x += (p.ox - p.x) * 0.07 - Math.cos(angle) * force * 2.5;
      p.y += (p.oy - p.y) * 0.07 - Math.sin(angle) * force * 2.5;

      const alpha = 0.2 + force * 0.7;
      context.beginPath();
      context.arc(p.x, p.y, 1.75, 0, Math.PI * 2);
      context.fillStyle = `rgba(61, 214, 198, ${alpha})`;
      context.fill();
    });

    requestAnimationFrame(draw);
  }

  canvas.addEventListener("mousemove", (event) => {
    setPointerFromClientPosition(event.clientX, event.clientY);
  });

  canvas.addEventListener("mouseleave", () => {
    resetPointer();
  });

  canvas.addEventListener("pointerdown", (event) => {
    setPointerFromClientPosition(event.clientX, event.clientY);
  });

  canvas.addEventListener("pointermove", (event) => {
    setPointerFromClientPosition(event.clientX, event.clientY);
  });

  canvas.addEventListener("pointerup", () => {
    resetPointer();
  });

  canvas.addEventListener("pointercancel", () => {
    resetPointer();
  });

  canvas.addEventListener(
    "touchstart",
    (event) => {
      if (!event.touches.length) return;
      setPointerFromClientPosition(
        event.touches[0].clientX,
        event.touches[0].clientY
      );
    },
    { passive: true }
  );

  canvas.addEventListener(
    "touchmove",
    (event) => {
      if (!event.touches.length) return;
      setPointerFromClientPosition(
        event.touches[0].clientX,
        event.touches[0].clientY
      );
    },
    { passive: true }
  );

  canvas.addEventListener("touchend", () => {
    resetPointer();
  });

  canvas.addEventListener("touchcancel", () => {
    resetPointer();
  });

  draw();
}

setupReveal();
setupHeroCanvas();
