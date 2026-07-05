import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

function HeroLogo({ logo }) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const smoothX = useSpring(mouseX, {
    stiffness: 160,
    damping: 22,
    mass: 0.4,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 160,
    damping: 22,
    mass: 0.4,
  });

  const rotateY = useTransform(smoothX, [0, 100], [-10, 10]);
  const rotateX = useTransform(smoothY, [0, 100], [10, -10]);

  const lightX = useTransform(smoothX, (value) => `${value}%`);
  const lightY = useTransform(smoothY, (value) => `${value}%`);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(50);
    mouseY.set(50);
  };

  return (
    <motion.div
      className="hero-logo-stage"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: [0, -8, 0, 6, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="hero-logo-orbit"
        style={{
          rotateX,
          rotateY,
          "--light-x": lightX,
          "--light-y": lightY,
        }}
      >
        <div className="hero-orb-glow" />

        <div className="hero-tech-ring hero-tech-ring-one" />
        <div className="hero-tech-ring hero-tech-ring-two" />
        <div className="hero-tech-ring hero-tech-ring-three" />
        <div className="hero-tech-ring-dots" />

        <div className="hero-cross-line hero-cross-line-horizontal" />
        <div className="hero-cross-line hero-cross-line-vertical" />

        <div className="hero-logo-card">
          <span className="hero-logo-reflection" />
          <img src={logo} alt="GD 1968" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default HeroLogo;