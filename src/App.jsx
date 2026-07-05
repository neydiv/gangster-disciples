import { useEffect, useRef, useState } from "react";
import MusicIntroGate from "./components/MusicIntroGate";
import { AnimatePresence, motion } from "motion/react";
import IntroLoader from "./components/IntroLoader";
import {
  Crown,
  Shield,
  Users,
  Skull,
  Star,
  Eye,
  Lock,
  Zap,
  Send,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

import Snowfall from "./components/Snowfall";
import CustomCursor from "./components/CustomCursor";
import HeroLogo from "./components/HeroLogo";
import MusicControls from "./components/MusicControls";


import gdLogo from "./assets/logos/gd-main.png";
import bdpLogo from "./assets/logos/bdp-logo.png";
import fivemLogo from "./assets/logos/fivem-logo.png";
import teamImage from "./assets/gallery/gd-team-main.png";


import neyPhoto from "./assets/members/ney.png";
import neymarPhoto from "./assets/members/neymar.png";
import dragonPhoto from "./assets/members/dragon.png";
import whysinoPhoto from "./assets/members/whysino.jpg";
import saperokoPhoto from "./assets/members/saperoko.png";

function App() {
  const audioRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [hoveredRank, setHoveredRank] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const startExperience = async () => {
    setHasEntered(true);

    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.35;
        await audioRef.current.play();
      }
    } catch (error) {
      console.log("El navegador bloqueó la música:", error);
    }
  };



  useEffect(() => {
    const sectionIds = ["inicio", "jerarquia", "postular"];

    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 25);

      let currentSection = "inicio";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);

        if (section) {
          const sectionTop = section.offsetTop - 180;

          if (window.scrollY >= sectionTop) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleNavClick = (event, href) => {
    event.preventDefault();

    const sectionId = href.replace("#", "");

    setIsMobileMenuOpen(false);

    setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (!section) return;

      const headerOffset = 110;
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: sectionPosition - headerOffset,
        behavior: "smooth",
      });

      window.history.pushState(null, "", href);
    }, 120);
  };

  const navItems = [
    {
      label: "Inicio",
      href: "#inicio",
    },
    {
      label: "Jerarquía",
      href: "#jerarquia",
    },
    {
      label: "Postular",
      href: "#postular",
    },
  ];

  const identityCards = [
    {
      icon: <Shield />,
      title: "Lealtad",
      text: "Cada miembro representa a la facción dentro de la ciudad.",
    },
    {
      icon: <Crown />,
      title: "Respeto",
      text: "La jerarquía se mantiene con orden, presencia y disciplina.",
    },
    {
      icon: <Eye />,
      title: "Presencia",
      text: "GD se mueve con identidad propia en Baje de Pepa RP.",
    },
  ];

  const hierarchy = [
    {
      icon: <Crown />,
      rank: "Jefes",
      desc: "Marcan la dirección, el orden y las decisiones más importantes de la facción.",
      members: [
        { name: "Litzen", photo: null },
        { name: "Ney", photo: neyPhoto },
        { name: "Arlequin", photo: null },
      ],
    },
    {
      icon: <Star />,
      rank: "Mano derecha",
      desc: "Coordina movimientos clave y mantiene la conexión entre liderazgo y organización.",
      members: [
        { name: "Saperoko", photo: saperokoPhoto },
      ],
    },
    {
      icon: <Skull />,
      rank: "Sub Jefes",
      desc: "Apoyan la organización interna, guían miembros y mantienen la presencia activa de GD.",
      members: [
        { name: "Neymar", photo: neymarPhoto },
        { name: "Dragon", photo: dragonPhoto },
        { name: "Whysiño", photo: whysinoPhoto },
      ],
    },
  ];

  return (
    <>
      <audio ref={audioRef} src="/audio/gd-music.mp3" preload="auto" />
      {hasEntered && <MusicControls audioRef={audioRef} />}

      {!hasEntered ? (
        <MusicIntroGate onStart={startExperience} />
      ) : showIntro ? (
        <IntroLoader onFinish={() => setShowIntro(false)} />
      ) : (
        <main className="font-soft min-h-screen overflow-hidden bg-[#020407] text-white antialiased">
          {/* Background effects */}
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,#00f5ff22,transparent_35%),radial-gradient(circle_at_bottom_right,#008dff22,transparent_35%),#020407]" />
          <div className="fixed inset-0 -z-10 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

          <Snowfall />
          <CustomCursor />

          {/* Header */}

          {/* Header */}
          <motion.header
            initial={{
              x: "-50%",
              y: -120,
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              x: "-50%",
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
              mass: 0.8,
              delay: 0.15,
            }}
            className={`fixed left-1/2 z-50 w-[92%] max-w-7xl backdrop-blur-xl transition-all duration-500 ${isHeaderScrolled
              ? "top-3 rounded-[1.7rem] border border-cyan-300/20 bg-black/70 px-4 py-3 shadow-[0_0_40px_rgba(0,245,255,0.18)] sm:top-4 md:top-5 md:rounded-full md:px-5"
              : "top-3 rounded-[1.7rem] border border-cyan-300/5 bg-black/20 px-4 py-3 shadow-none sm:top-4 md:top-5 md:rounded-full md:px-5"
              }`}
          >
            <nav className="flex items-center justify-between gap-3">
              {/* Logo */}
              <a
                href="#inicio"
                className="group flex h-11 w-14 items-center justify-start sm:h-12 sm:w-20 md:h-14 md:w-28"
                onClick={(event) => handleNavClick(event, "#inicio")}
              >
                <div
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full transition duration-300 sm:h-12 sm:w-12 md:h-14 md:w-14 ${isHeaderScrolled
                    ? "border border-cyan-300/25 bg-cyan-300/5 shadow-[0_0_22px_rgba(0,245,255,0.15)]"
                    : "border border-cyan-300/10 bg-transparent"
                    } group-hover:border-cyan-300/60 group-hover:bg-cyan-300/10 group-hover:shadow-[0_0_25px_rgba(0,245,255,0.35)]`}
                >
                  <img
                    src={gdLogo}
                    alt="GD Logo"
                    className="h-9 w-9 object-contain drop-shadow-[0_0_14px_rgba(0,245,255,0.55)] transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_24px_rgba(0,245,255,0.9)] sm:h-10 sm:w-10 md:h-12 md:w-12"
                  />
                </div>
              </a>

              {/* Desktop Menu */}
              <div className="hidden items-center gap-7 lg:flex">
                {navItems.map((item) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(event) => handleNavClick(event, item.href)}
                      className={`relative text-sm font-semibold transition after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:rounded-full after:bg-cyan-300 after:shadow-[0_0_10px_rgba(0,245,255,0.9)] after:transition-all hover:text-cyan-300 hover:drop-shadow-[0_0_10px_#00f5ff] ${isActive
                        ? "text-cyan-200 after:w-full"
                        : "text-zinc-300 after:w-0 hover:after:w-full"
                        }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="https://discord.gg/TU-INVITE"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm md:px-5 ${isHeaderScrolled
                    ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-200 hover:bg-cyan-300 hover:text-black hover:shadow-[0_0_25px_rgba(0,245,255,0.8)]"
                    : "border-cyan-300/25 bg-black/20 text-cyan-100 hover:border-cyan-300/60 hover:bg-cyan-300 hover:text-black hover:shadow-[0_0_25px_rgba(0,245,255,0.75)]"
                    }`}
                >
                  <FaDiscord size={18} />
                  <span className="hidden sm:inline">Discord</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 transition hover:bg-cyan-300 hover:text-black lg:hidden"
                  aria-label="Abrir menú"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden lg:hidden"
                >
                  <div className="mt-4 grid gap-2 border-t border-white/10 pt-4">
                    {navItems.map((item) => {
                      const sectionId = item.href.replace("#", "");
                      const isActive = activeSection === sectionId;

                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(event) => handleNavClick(event, item.href)}
                          className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${isActive
                              ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-200 shadow-[0_0_18px_rgba(0,245,255,0.16)]"
                              : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-200"
                            }`}
                        >
                          {item.label}
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>

          {/* Hero */}
          <section id="inicio" className="relative min-h-screen px-6 pt-36">
            <div className="absolute inset-0 -z-10">
              <img
                src={teamImage}
                alt="Gangster Disciples Team"
                className="h-full w-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#020407]/60 via-[#020407]/80 to-[#020407]" />
            </div>

            <div className="mx-auto grid min-h-[75vh] max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">
                  <Zap size={15} />
                  Facción oficial RP
                </div>

                <h1 className="font-display max-w-4xl text-5xl font-bold uppercase leading-[0.9] tracking-[0.03em] md:text-7xl lg:text-8xl">
                  <span className="animated-gradient-text block">Gangster</span>
                  <span className="animated-gradient-text block">Disciples</span>
                </h1>

                <div className="mt-7 max-w-2xl">
                  <p className="text-xl leading-9 text-zinc-200 md:text-2xl">
                    GD no es una facción más. Es una organización con historia, presencia y
                    respeto dentro de{" "}
                    <span className="font-semibold text-cyan-200 drop-shadow-[0_0_12px_rgba(0,245,255,0.45)]">
                      Baje de Pepa RP
                    </span>
                    .
                  </p>


                </div>



                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#jerarquia"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-7 py-4 font-bold text-black transition hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(0,245,255,0.85)]"
                  >
                    Conocer jerarquía
                    <ChevronRight className="transition group-hover:translate-x-1" size={20} />
                  </a>

                  <a
                    href="#postular"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur transition hover:scale-[1.03] hover:border-cyan-300/70 hover:text-cyan-200 hover:shadow-[0_0_25px_rgba(0,245,255,0.25)]"
                  >
                    Solicitar ingreso
                  </a>
                </div>

                <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
                  {[
                    {
                      value: "PE / ES",
                      title: "Presencia internacional",
                      text: "GD dejó marca en ciudades de Perú y España dentro del mundo RP.",
                    },
                    {
                      value: "TOP 1",
                      title: "Mafias peruanas",
                      text: "Reconocida como una de las facciones más fuertes del FiveM peruano.",
                    },
                    {
                      value: "GD",
                      title: "Trayectoria",
                      text: "Una historia sólida, respetada e impecable dentro de la escena FiveM.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/45 hover:shadow-[0_0_35px_rgba(0,245,255,0.18)]"
                    >
                      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-cyan-300/10 blur-2xl transition group-hover:bg-cyan-300/20" />

                      <p className="font-display text-3xl font-semibold text-cyan-200 drop-shadow-[0_0_14px_rgba(0,245,255,0.45)]">
                        {item.value}
                      </p>

                      <h3 className="mt-3 text-base font-bold uppercase tracking-[0.18em] text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <HeroLogo logo={gdLogo} />
            </div>
          </section>

          {/* Trajectory */}
          {/* <section id="identidad" className="relative overflow-hidden px-6 py-24">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_left,rgba(0,245,255,0.10),transparent_35%)]" />

            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
              <motion.div
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
                  Trayectoria
                </p>

                <h2 className="font-display mt-4 text-4xl font-semibold uppercase leading-tight tracking-[0.04em] md:text-6xl">
                  De Perú a España, GD dejó marca
                </h2>

                <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400 md:text-lg">
                  GD no apareció de la nada. Su nombre se fue construyendo ciudad por
                  ciudad, manteniendo presencia, historia y peso dentro de la escena FiveM.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Perú", "España", "FiveM", "GD 1968"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-2">
                {[
                  {
                    title: "Origen",
                    text: "Una identidad que empezó a tomar fuerza desde sus primeras ciudades.",
                  },
                  {
                    title: "Expansión",
                    text: "GD logró presencia en Perú y España, llevando su nombre más allá de una sola ciudad.",
                  },
                  {
                    title: "Consolidación",
                    text: "Su recorrido la posicionó como una de las facciones más reconocidas del entorno peruano.",
                  },
                  {
                    title: "Actualidad",
                    text: "Hoy mantiene una imagen fuerte, una jerarquía activa y una presencia que se hace notar.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="group relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,rgba(0,245,255,0.18),rgba(255,255,255,0.035))] p-[1px] shadow-[0_0_35px_rgba(0,245,255,0.08)]"
                  >
                    <div className="relative h-full rounded-[2rem] bg-[#050b0f]/90 p-7 backdrop-blur-xl transition group-hover:bg-[#071014]/95">
                      <div className="absolute inset-x-7 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-60 transition group-hover:opacity-100 group-hover:shadow-[0_0_18px_rgba(0,245,255,0.8)]" />

                      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl transition group-hover:bg-cyan-300/20" />

                      <p className="font-display text-5xl font-semibold text-cyan-200/20">
                        0{index + 1}
                      </p>

                      <h3 className="mt-2 text-2xl font-bold uppercase tracking-[0.08em] text-white">
                        {item.title}
                      </h3>

                      <p className="mt-4 leading-7 text-zinc-400">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section> */}

          {/* Hierarchy */}
          <section id="jerarquia" className="relative overflow-visible px-6 py-24">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Jerarquía"
                title="Estructura interna de la facción"
                text="Pasa el mouse por encima de cada rango para ver los miembros principales de GD."
              />

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {hierarchy.map((item, index) => (
                  <motion.div
                    key={item.rank}
                    className={`relative ${hoveredRank === item.rank ? "z-50" : "z-10"}`}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    onMouseEnter={() => setHoveredRank(item.rank)}
                    onMouseLeave={() => setHoveredRank(null)}
                    onClick={() =>
                      setHoveredRank((current) => (current === item.rank ? null : item.rank))
                    }
                  >
                    <motion.div
                      whileHover={{ y: -8, scale: 1.025 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="group relative min-h-[310px] overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-[1px] shadow-[0_0_40px_rgba(0,245,255,0.06)]"
                    >
                      <div className="relative h-full rounded-[2rem] bg-[#050b0f]/90 p-7 backdrop-blur-xl">
                        <div className="absolute inset-x-8 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-70 transition group-hover:opacity-100 group-hover:shadow-[0_0_18px_rgba(0,245,255,0.9)]" />

                        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl transition duration-500 group-hover:bg-cyan-300/20" />
                        <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl transition duration-500 group-hover:bg-cyan-300/15" />

                        <div className="relative flex items-start justify-between gap-5">
                          <div>
                            <h3 className="font-display text-4xl font-semibold uppercase tracking-[0.04em] text-white drop-shadow-[0_0_16px_rgba(0,245,255,0.25)] transition group-hover:text-cyan-100 group-hover:drop-shadow-[0_0_22px_rgba(0,245,255,0.55)]">
                              {item.rank}
                            </h3>

                            <div className="mt-4 h-[2px] w-20 rounded-full bg-gradient-to-r from-cyan-300 to-transparent shadow-[0_0_14px_rgba(0,245,255,0.65)] transition-all duration-300 group-hover:w-32" />
                          </div>

                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200 shadow-[inset_0_0_18px_rgba(0,245,255,0.16)] transition group-hover:bg-cyan-300 group-hover:text-black group-hover:shadow-[0_0_28px_rgba(0,245,255,0.75)]">
                            {item.icon}
                          </div>
                        </div>

                        <p className="relative mt-7 min-h-[88px] leading-7 text-zinc-400">
                          {item.desc}
                        </p>

                        <div className="relative mt-8 flex items-center justify-between border-t border-white/[0.06] pt-5">
                          <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,245,255,0.9)]" />
                            Revelar integrantes
                          </span>

                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-black group-hover:translate-x-1">
                            <ChevronRight size={18} />
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    <AnimatePresence>
                      {hoveredRank === item.rank && (
                        <motion.div
                          className="relative z-50 mt-5 grid w-full gap-3 sm:grid-cols-3 md:absolute md:left-1/2 md:top-[calc(100%+18px)] md:mt-0 md:flex md:w-max md:-translate-x-1/2 md:gap-4"
                          initial={{ opacity: 0, y: -10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.96 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                        >
                          {item.members.map((member, memberIndex) => (
                            <motion.div
                              key={member.name}
                              initial={{ opacity: 0, y: 12, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.92 }}
                              transition={{ delay: memberIndex * 0.06 }}
                              className="relative w-full overflow-hidden rounded-2xl bg-[linear-gradient(145deg,rgba(0,245,255,0.2),rgba(255,255,255,0.04))] p-[1px] shadow-[0_0_30px_rgba(0,245,255,0.18)] md:min-w-[170px]"
                            >
                              <div className="relative rounded-2xl bg-black/85 p-5 text-center backdrop-blur-xl">
                                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-cyan-300/15 blur-2xl" />

                                <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-cyan-300/35 bg-cyan-300/10 text-cyan-200 shadow-[0_0_22px_rgba(0,245,255,0.28)]">
                                  {member.photo ? (
                                    <img
                                      src={member.photo}
                                      alt={member.name}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <Users size={25} />
                                  )}
                                </div>

                                <h4 className="mt-4 text-xl font-bold text-white">
                                  {member.name}
                                </h4>

                                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
                                  {item.rank}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>




          {/* Application */}
          <section id="postular" className="relative overflow-hidden px-6 py-24">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.10),transparent_38%)]" />

            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(145deg,rgba(0,245,255,0.22),rgba(255,255,255,0.04))] p-[1px] shadow-[0_0_55px_rgba(0,245,255,0.14)]"
              >
                <div className="relative rounded-[2.5rem] bg-[#050b0f]/95 px-7 py-14 text-center backdrop-blur-xl md:px-14">
                  <div className="absolute left-1/2 top-0 h-[2px] w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_22px_rgba(0,245,255,0.9)]" />

                  <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
                  <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 shadow-[0_0_35px_rgba(0,245,255,0.22)]">
                    <FaDiscord size={38} />
                  </div>

                  <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
                    Postulación
                  </p>

                  <h2 className="font-display mx-auto mt-4 max-w-3xl text-4xl font-semibold uppercase leading-tight tracking-[0.04em] md:text-6xl">
                    Solicitar entrada a GD
                  </h2>

                  <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
                    Las postulaciones se realizan directamente por Discord. Para iniciar el proceso,
                    solicita la presencia de un entrevistador y únete al canal de entrevista.
                  </p>

                  <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-zinc-200">
                    No buscamos cantidad. Buscamos gente que quiera elevar su nivel dentro del rol ilegal.
                  </p>

                  <div className="mt-10 flex justify-center">
                    <a
                      href="https://discord.gg/nrrjKzGNAB"
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-cyan-300 px-9 py-4 font-bold text-black transition hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(0,245,255,0.85)]"
                    >
                      <FaDiscord size={23} />
                      Postular por Discord
                      <ChevronRight
                        size={20}
                        className="transition group-hover:translate-x-1"
                      />
                    </a>
                  </div>

                  <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
                    {[
                      {
                        title: "Normativas ilegales",
                        text: "Conocer las reglas del servidor relacionadas con facciones ilegales y aplicarlas correctamente dentro del rol. ",
                      },
                      {
                        title: "Control en rol  ",
                        text: "Mantener calma, orden y buen criterio durante situaciones intensas, evitando acciones que rompan la experiencia GD",
                      },
                      {
                        title: "Entrevista Discord",
                        text: "Solicita un entrevistador, entra al canal indicado y realiza las pruebas correspondientes. Si vienes referido, el proceso es el mismo.",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/45 hover:shadow-[0_0_30px_rgba(0,245,255,0.16)]"
                      >
                        <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-cyan-300/10 blur-2xl transition group-hover:bg-cyan-300/20" />



                        <h3 className="text-lg font-bold uppercase tracking-[0.14em] text-white">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-zinc-400">
                          {item.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="relative overflow-hidden border-t border-cyan-300/10 px-6 pt-16 pb-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(0,245,255,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(0,141,255,0.10),transparent_34%)]" />

            <div className="absolute left-1/2 top-0 h-[1px] w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent shadow-[0_0_20px_rgba(0,245,255,0.75)]" />

            <div className="mx-auto max-w-7xl">
              <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr_0.8fr]">

                {/* Logo GD */}
                <div className="flex justify-center md:justify-start">
                  <div className="group flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/5 shadow-[0_0_30px_rgba(0,245,255,0.16)] transition hover:border-cyan-300/50 hover:shadow-[0_0_45px_rgba(0,245,255,0.28)]">
                    <img
                      src={gdLogo}
                      alt="Gangster Disciples"
                      className="h-20 w-20 object-contain drop-shadow-[0_0_18px_rgba(0,245,255,0.55)] transition group-hover:scale-105 group-hover:drop-shadow-[0_0_26px_rgba(0,245,255,0.85)]"
                    />
                  </div>
                </div>

                {/* Texto corto + logos */}
                <div className="text-center">
                  <p className="mx-auto max-w-xl text-base leading-8 text-zinc-400">
                    GD. Una facción que pesa donde pisa.
                  </p>

                  <div className="mt-7 flex items-center justify-center gap-5">
                    <a
                      href="https://www.bajedepepa.com/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Ir a la web de Baje de Pepa RP"
                      className="transition hover:scale-105"
                    >
                      <img
                        src={bdpLogo}
                        alt="Baje de Pepa RP"
                        className="h-10 object-contain opacity-70 transition hover:opacity-100 hover:drop-shadow-[0_0_18px_rgba(0,245,255,0.45)]"
                      />
                    </a>

                    <div className="h-8 w-[1px] bg-white/10" />

                    <a
                      href="https://fivem.net/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Ir a la web de FiveM"
                      className="transition hover:scale-105"
                    >
                      <img
                        src={fivemLogo}
                        alt="FiveM"
                        className="h-9 object-contain opacity-70 transition hover:opacity-100 hover:drop-shadow-[0_0_18px_rgba(0,245,255,0.45)]"
                      />
                    </a>
                  </div>
                </div>

                {/* Redes */}
                <div className="flex justify-center md:justify-end">
                  <div className="flex items-center gap-3">
                    <a
                      href="https://discord.gg/nrrjKzGNAB"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 font-bold text-cyan-200 transition hover:scale-[1.03] hover:bg-cyan-300 hover:text-black hover:shadow-[0_0_28px_rgba(0,245,255,0.75)]"
                    >
                      <FaDiscord size={22} />
                      Discord
                    </a>

                    <a
                      href="https://www.tiktok.com/@gd.on.top3"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="TikTok GD"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/25 bg-white/[0.04] text-cyan-200 transition hover:scale-110 hover:border-cyan-300/60 hover:bg-cyan-300 hover:text-black hover:shadow-[0_0_28px_rgba(0,245,255,0.75)]"
                    >
                      <SiTiktok size={21} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 border-t border-white/10 pt-7 text-center">
                <p className="text-sm text-zinc-500">
                  © {new Date().getFullYear()} Gangster Disciples. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </footer>










        </main>
      )}
    </>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="font-display mt-4 text-4xl font-semibold leading-tight tracking-[0.03em] md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 leading-8 text-zinc-400">{text}</p>
    </div>
  );
}

function Input({ label, placeholder }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-zinc-300">{label}</span>
      <input
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300/60 focus:shadow-[0_0_25px_rgba(0,245,255,0.2)]"
      />
    </label>
  );
}

export default App;