import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gdOnTopLogo from "../assets/logos/gd-ontop.png";

function IntroLoader({ onFinish }) {
  const videoRef = useRef(null);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const closeIntro = () => {
    setIsLeaving(true);

    setTimeout(() => {
      onFinish();
    }, 800);
  };

  const handleVideoEnd = () => {
    if (!showFinalScreen) {
      setShowFinalScreen(true);

      setTimeout(() => {
        closeIntro();
      }, 1300);

      return;
    }

    setTimeout(() => {
      closeIntro();
    }, 1200);
  };

 

  useEffect(() => {
    // Hace que el texto final aparezca antes de que termine el video
    const showFinalBeforeEnd = setTimeout(() => {
      setShowFinalScreen(true);
    }, 4900);

    // Seguridad por si el video no dispara onEnded
    const fallback = setTimeout(() => {
      closeIntro();
    }, 7200);

    return () => {
      clearTimeout(showFinalBeforeEnd);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLeaving && (
        <motion.section
          className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.video
            ref={videoRef}
            src="/videos/gd-intro.mp4"
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            animate={{
              opacity: showFinalScreen ? 0.2 : 1,
              scale: showFinalScreen ? 1.08 : 1,
              filter: showFinalScreen ? "blur(6px)" : "blur(0px)",
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.82)_100%)]" />

          <AnimatePresence>
            {showFinalScreen && (
              <motion.div
                className="relative z-10 flex flex-col items-center px-6 text-center"
                initial={{ opacity: 0, y: 28, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              >
                <motion.div
                  className="relative mb-8 flex h-40 w-40 items-center justify-center"
                  initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 rounded-full bg-cyan-300/20 blur-3xl" />
                  <div className="absolute inset-0 rounded-full border border-cyan-300/30" />
                  <div className="absolute h-[78%] w-[78%] rounded-full border border-cyan-300/20" />

                  <motion.img
                    src={gdOnTopLogo}
                    alt="GD On Top"
                    className="relative z-10 h-24 w-24 object-contain drop-shadow-[0_0_28px_rgba(0,245,255,0.85)]"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <motion.h1
                  className="intro-final-title text-4xl font-bold uppercase md:text-6xl"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                >
                  Gangster Disciples
                </motion.h1>

                <motion.div
                  className="mt-5 h-[2px] w-72 rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_rgba(0,245,255,0.9)]"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                />

                <motion.p
                  className="mt-5 max-w-xl text-xs uppercase tracking-[0.28em] text-zinc-300 md:text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.45 }}
                >
                  From Peru to Spain, GD on top
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default IntroLoader;