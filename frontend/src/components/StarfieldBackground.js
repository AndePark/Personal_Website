import { useEffect, useRef } from "react";

export default function StarfieldBackground({ children }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");

    let width = container.offsetWidth;
    let height = container.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;

    const maxDepth = 1500;
    const speed = 0.5;

    let tick = 0;
    let animationId;

    const createStar = () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * maxDepth,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2
    });

    const stars = Array.from({ length: 400 }, createStar);

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);

    const animate = () => {
      tick++;

      ctx.fillStyle = "rgba(10,10,15,0.2)";
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        star.z -= speed * 2;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.z = maxDepth;
        }

        const scale = 400 / star.z;
        const x = centerX + star.x * scale;
        const y = centerY + star.y * scale;

        if (x < -10 || x > width + 10 || y < -10 || y > height + 10) continue;

        const size = Math.max(0.5, (1 - star.z / maxDepth) * 3);
        const opacity = (1 - star.z / maxDepth) * 0.9 + 0.1;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = opacity;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animate);
    };

    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, width, height);

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

    return (
    <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden"
        style={{ zIndex: -1 }}
    >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
    );
}