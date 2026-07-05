import { memo, useEffect, useMemo, useRef } from "react";

const TOTAL_SNOWFLAKES = 80;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function Snowfall() {
  const layerRef = useRef(null);

  const snowflakes = useMemo(() => {
    return Array.from({ length: TOTAL_SNOWFLAKES }, (_, index) => ({
      id: index,
      size: randomBetween(2, 6),
      left: randomBetween(0, 100),
      duration: randomBetween(8, 18),
      delay: randomBetween(0, 10),
      opacity: randomBetween(0.25, 0.85),
      drift: randomBetween(-40, 40),
    }));
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    let animationFrame = null;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 28;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 28;

      if (animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        layer.style.setProperty("--snow-move-x", `${mouseX}px`);
        layer.style.setProperty("--snow-move-y", `${mouseY}px`);
        layer.style.setProperty("--snow-glow-x", `${event.clientX}px`);
        layer.style.setProperty("--snow-glow-y", `${event.clientY}px`);
        animationFrame = null;
      });
    };

    const handleMouseLeave = () => {
      layer.style.setProperty("--snow-move-x", "0px");
      layer.style.setProperty("--snow-move-y", "0px");
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div ref={layerRef} className="snowfall-layer">
      <div className="snowfall-mouse-glow" />

      {snowflakes.map((flake) => (
        <span
          key={flake.id}
          className="snowflake"
          style={{
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            left: `${flake.left}%`,
            opacity: flake.opacity,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            "--snow-drift": `${flake.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export default memo(Snowfall);