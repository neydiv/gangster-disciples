import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

function CustomCursor() {
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      const isInsideViewport =
        x >= 0 &&
        y >= 0 &&
        x <= window.innerWidth &&
        y <= window.innerHeight;

      if (!isInsideViewport) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x - 22}px, ${y - 22}px, 0)`;
      }

      setPosition({ x, y });
    };

    const handleMouseOver = (event) => {
      const target = event.target;

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const hideCursor = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    const handleMouseOut = (event) => {
      if (!event.relatedTarget) {
        hideCursor();
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("blur", hideCursor);
    document.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("blur", hideCursor);
      document.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor-main ${isVisible ? "cursor-visible" : "cursor-hidden"}`}
      >
        <div className={`custom-cursor-ring ${isHovering ? "cursor-hover" : ""}`} />
      </div>

      <motion.div
        className="custom-cursor-glow"
        animate={{
          x: position.x - 45,
          y: position.y - 45,
          scale: isHovering ? 1.35 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 24,
          mass: 0.9,
        }}
      />
    </>
  );
}

export default CustomCursor;