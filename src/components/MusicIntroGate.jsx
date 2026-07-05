import { motion } from "motion/react";
import gdOnTopLogo from "../assets/logos/gd-ontop.png";

function MusicIntroGate({ onStart }) {
  return (
    <section className="fixed inset-0 z-[9999999] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.16),transparent_35%,#000_80%)]" />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.img
          src={gdOnTopLogo}
          alt="GD On Top"
          className="h-32 w-32 object-contain drop-shadow-[0_0_30px_rgba(0,245,255,0.65)] md:h-40 md:w-40"
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300">
          Gangster Disciples
        </p>

        <h1 className="intro-final-title mt-3 text-4xl font-bold uppercase md:text-6xl">
          Welcome to GD
        </h1>

        <p className="mt-5 max-w-xl text-sm uppercase tracking-[0.25em] text-zinc-400">
          The best mafia in FiveM Peru
        </p>

        <button
          type="button"
          onClick={onStart}
          className="mt-10 rounded-full border border-cyan-300/50 bg-cyan-300 px-9 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-105 hover:shadow-[0_0_35px_rgba(0,245,255,0.85)]"
        >
          Entrar a GD
        </button>
      </motion.div>
    </section>
  );
}

export default MusicIntroGate;