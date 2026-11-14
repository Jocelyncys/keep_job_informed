// Lightweight zero-dependency confetti effect
export const triggerConfetti = () => {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles: Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
    rotation: number;
    vRot: number;
  }> = [];

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
      y: window.innerHeight / 3 + (Math.random() - 0.5) * 100,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -12 - 4,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  let animationFrame: number;
  let opacity = 1;

  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    opacity -= 0.015;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vRot;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, opacity);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (opacity > 0) {
      animationFrame = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(animationFrame);
      canvas.remove();
    }
  };

  animationFrame = requestAnimationFrame(update);
};
