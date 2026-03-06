import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Componente auxiliar para animaciones de entrada
function FadeInWhenVisible({ children, delay = 0, trigger = true }: { children: React.ReactNode; delay?: number, trigger?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldAnimate = isInView && trigger;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Componente auxiliar para animaciones de "Pop Up" con zoom
function PopUpWhenVisible({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
        duration: 0.5
      }}
    >
      {children}
    </motion.div>
  );
}

// Componente para efecto de escritura
function TypewriterText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 25); // Velocidad de escritura: 25ms por carácter (más rápido)

    return () => clearInterval(interval);
  }, [hasStarted, text]);

  return (
    <span className={className}>
      {displayedText}
      {hasStarted && displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}

export default function Home() {
  const [heroFinished, setHeroFinished] = useState(false);

  useEffect(() => {
    // El hero termina todas sus animaciones aprox en 4s 
    // (Último FadeIn empieza en 3.4s)
    const timer = setTimeout(() => {
      setHeroFinished(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Service Tabs
    const setupServiceTabs = () => {
      const tabButtons = document.querySelectorAll(
        ".service-tab-button",
      );
      const contents = document.querySelectorAll(
        ".service-content",
      );

      if (!tabButtons.length || !contents.length) return;

      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const target = button.getAttribute("data-service");
          if (!target) return;

          // Reset botones
          tabButtons.forEach((btn) => {
            btn.classList.remove("text-primary-dark");
            btn.classList.add("text-gray-400");
            btn
              .querySelectorAll(".service-tab-indicator")
              .forEach((ind) => {
                ind.classList.add("hidden");
              });
          });

          // Activar botón actual
          button.classList.remove("text-gray-400");
          button.classList.add("text-primary-dark");
          button
            .querySelectorAll(".service-tab-indicator")
            .forEach((ind) => {
              ind.classList.remove("hidden");
            });

          // Mostrar contenido correspondiente
          contents.forEach((content) => {
            if (
              content.getAttribute("data-service") === target
            ) {
              content.classList.remove("hidden");
              content.classList.remove("animate-fade-in");
              void (content as HTMLElement).offsetWidth;
              content.classList.add("animate-fade-in");
            } else {
              content.classList.add("hidden");
            }
          });
        });
      });
    };

    // Process Slider
    const setupProcessSlider = () => {
      const stepButtons = document.querySelectorAll(
        ".process-step-button",
      );
      const details = document.querySelectorAll(
        ".process-detail",
      );

      if (!stepButtons.length || !details.length) return;

      stepButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const index = parseInt(
            button.getAttribute("data-index") || "0",
            10,
          );
          if (isNaN(index)) return;

          // Actualizar estados de los steps
          stepButtons.forEach((btn, i) => {
            const circle = btn.querySelector(".rounded-full");
            const label = btn.querySelector(".font-medium");

            if (i === index) {
              // Activo
              btn.classList.add("active");
              if (circle) {
                circle.classList.remove(
                  "bg-white",
                  "border-[#CFCFCF]",
                  "text-primary-dark",
                );
                circle.classList.add(
                  "bg-gold-quilamas",
                  "border-gold-quilamas",
                  "text-white",
                );
              }
              if (label) {
                label.classList.remove("text-[#999999]");
                label.classList.add("text-gold-quilamas");
              }
            } else {
              // Inactivo
              btn.classList.remove("active");
              if (circle) {
                circle.classList.remove(
                  "bg-gold-quilamas",
                  "border-gold-quilamas",
                  "text-white",
                );
                circle.classList.add(
                  "bg-white",
                  "border-[#CFCFCF]",
                  "text-primary-dark",
                );
              }
              if (label) {
                label.classList.remove("text-gold-quilamas");
                label.classList.add("text-[#999999]");
              }
            }
          });

          // Mostrar detalle correspondiente
          details.forEach((detail, i) => {
            if (i === index) {
              detail.classList.remove("hidden");
              detail.classList.remove("animate-fade-in");
              void (detail as HTMLElement).offsetWidth;
              detail.classList.add("animate-fade-in");
            } else {
              detail.classList.add("hidden");
            }
          });
        });
      });
    };

    // Hero Scroll
    const setupHeroScroll = () => {
      const btn = document.querySelector(
        "#hero-explorar-servicios",
      );
      if (!btn) return;

      btn.addEventListener("click", () => {
        const target = document.getElementById("servicios");
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    };

    // Carousel
    const setupCarousel = () => {
      const carousel = document.getElementById(
        "audience-carousel",
      );
      const prevBtn = document.getElementById("carousel-prev");
      const nextBtn = document.getElementById("carousel-next");
      const dots = document.querySelectorAll(".carousel-dot");

      if (!carousel || !prevBtn || !nextBtn) return;

      const getScrollWidth = () => {
        const firstChild = carousel.children[0];
        return firstChild
          ? (firstChild as HTMLElement).offsetWidth + 32
          : 350;
      };

      const updateDots = (activeIndex: number) => {
        dots.forEach((dot, idx) => {
          if (idx === activeIndex) {
            dot.classList.remove("bg-gray-300", "w-2");
            dot.classList.add("bg-gold-quilamas", "w-12");
          } else {
            dot.classList.remove("bg-gold-quilamas", "w-12");
            dot.classList.add("bg-gray-300", "w-2");
          }
        });
      };

      prevBtn.addEventListener("click", () => {
        carousel.scrollBy({
          left: -getScrollWidth(),
          behavior: "smooth",
        });
      });

      nextBtn.addEventListener("click", () => {
        carousel.scrollBy({
          left: getScrollWidth(),
          behavior: "smooth",
        });
      });

      dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
          const scrollLeft = idx * getScrollWidth();
          carousel.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
          });
          updateDots(idx);
        });
      });

      // Update dots on scroll
      let isScrolling: number;
      carousel.addEventListener("scroll", () => {
        window.clearTimeout(isScrolling);
        isScrolling = window.setTimeout(() => {
          const activeIndex = Math.round(
            carousel.scrollLeft / getScrollWidth(),
          );
          updateDots(activeIndex);
        }, 100);
      });
    };

    setupServiceTabs();
    setupProcessSlider();
    setupHeroScroll();
    setupCarousel();
  }, []);

  const carouselItems = [
    {
      title: "Adicciones",
      desc: "Tratamiento especializado para superar conductas adictivas y recuperar el control de tu vida.",
      img: "https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314288/1_adicciones_trgz1y.webp",
    },
    {
      title: "Duelo",
      desc: "Acompañamiento respetuoso para transitar el dolor de la pérdida y encontrar un nuevo sentido.",
      img: "https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314289/2_duelo_nunfxm.webp",
    },
    {
      title: "Trauma",
      desc: "Terapia enfocada en sanar heridas del pasado y superar experiencias traumáticas para avanzar.",
      img: "https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314290/3_trauma_cze8xr.webp",
    },
    {
      title: "Tensiones familiares",
      desc: "Facilito un espacio de comunicación y mediación para resolver conflictos y fortalecer los vínculos dentro del sistema familiar.",
      img: "https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314292/4_tensiones_familiares_bkhdj0.webp",
    },
    {
      title: "Ansiedad",
      desc: "Aprende a gestionar la ansiedad y recupera la calma en tu día a día con herramientas prácticas y efectivas.",
      img: "https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314303/GROVE_xjk6vd.webp",
    },
    {
      title: "Estrés",
      desc: "Reduce el estrés laboral o personal y encuentra un equilibrio saludable para vivir con mayor tranquilidad.",
      img: "https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314308/LUZ_nzhsih.webp",
    },
    {
      title: "Autoestima y relaciones",
      desc: "Trabaja en tu amor propio y construye relaciones más sanas y satisfactorias contigo mismo y con los demás.",
      img: "https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314311/PECHITO_AZUL_v8tlnq.webp",
    },
    {
      title: "Terapia familiar",
      desc: "Espacio para resolver conflictos, mejorar la comunicación y fortalecer los lazos familiares.",
      img: "https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314287/TERAPIA_FAMILIAR_m9cxn7.webp",
    },
    {
      title: "Terapia de pareja",
      desc: "Trabajo conjunto para reconstruir la confianza, mejorar la convivencia y recuperar la intimidad.",
      img: "https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314297/TERAPIA_PEREJA_bd7fxw.webp",
    },
  ];

  const reviews = [
    {
      init: "MG",
      name: "María González",
      text: "Un espacio seguro donde me sentí escuchada desde el primer día. Luisa tiene una capacidad increíble para conectar y guiar.",
    },
    {
      init: "CR",
      name: "Carlos Ruiz",
      text: "La terapia online ha sido un descubrimiento. La flexibilidad y la cercanía que transmite hacen que parezca presencial.",
    },
    {
      init: "AP",
      name: "Ana Pérez",
      text: "Gracias a las herramientas de mindfulness he logrado reducir mi ansiedad y vivir con más calma. Totalmente recomendable.",
    },
    {
      init: "ES",
      name: "Elena Sánchez",
      text: "Me ha ayudado mucho en mi proceso de duelo. Sentí un acompañamiento muy humano y respetuoso en todo momento.",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.35s ease-out;
        }
      `}</style>

      <Header isHomePage={true} />

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex flex-col pt-24 sm:pt-28">
        {/* Background Image with Overlay - FIXED */}
        <div className="fixed inset-0 z-0 h-screen">
          <img
            src="https://images.unsplash.com/photo-1627401315191-f565b13d479a?q=80&w=1171&auto=format&fit=crop"
            alt="Hero background"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/1176x1600/1A1A1A/FFFFFF?text=Fondo+Quilamas";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 pb-24 sm:pb-32 -mt-[15px]">
            <div className="max-w-5xl space-y-4 sm:space-y-6">
              {/* Título con animación de escritura */}
              <h1 className="text-[#DEBC5A] font-serif tracking-wide -mt-1 text-left space-y-2 sm:space-y-4">
                <div className="flex flex-wrap items-baseline gap-x-8 sm:gap-x-12 lg:gap-x-16">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold">
                    <TypewriterText text="PSICOLOGÍA" delay={0} />
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight italic opacity-90">
                    <TypewriterText text="sanitaria" delay={0.7} />
                  </div>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-8 sm:gap-x-12 lg:gap-x-16">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold">
                    <TypewriterText text="TERAPIA" delay={1.4} />
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight italic opacity-90">
                    <TypewriterText text="familiar y de pareja" delay={1.9} />
                  </div>
                </div>
              </h1>

              {/* Textos de debajo con animación fade-in */}
              <div className="space-y-4 sm:space-y-5 pt-1 mt-4 text-left">
                <FadeInWhenVisible delay={2.8}>
                  <p className="text-[#DEBC5A] text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide max-w-3xl">
                    Un espacio seguro para reconstruir tu
                    bienestar.
                  </p>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={3.1}>
                  <div className="inline-block px-4 sm:px-6 py-2 border border-[#DEBC5A]/30 backdrop-blur-sm rounded-full">
                    <span className="text-[#DEBC5A] text-sm font-medium tracking-wider">
                      Consulta presencial en Salamanca, Sierra de
                      Francia y on-line
                    </span>
                  </div>
                </FadeInWhenVisible>
              </div>

              <FadeInWhenVisible delay={3.4}>
                <div className="pt-2 sm:pt-4 text-left">
                  <a
                    href="/servicios"
                    id="hero-explorar-servicios"
                    className="bg-transparent backdrop-blur-sm text-[#8B7028] border-2 border-[#8B7028] hover:bg-[#8B7028] hover:text-white px-8 sm:px-12 py-5 sm:py-7 h-auto text-base sm:text-lg tracking-wide transition-all w-full sm:w-auto rounded-full shadow-lg hover:shadow-2xl inline-flex items-center justify-center font-semibold active:translate-y-1"
                  >
                    Explorar servicios
                  </a>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>

        {/* Services Card Section - Overlapping */}
        <div
          id="servicios"
          className="relative z-20 container mx-auto px-4 sm:px-8 lg:px-16 pb-8 sm:pb-16 mt-[-60px] sm:mt-[-80px]"
        >
          <FadeInWhenVisible delay={0.2} trigger={heroFinished}>
            <div className="bg-white/85 backdrop-blur-sm shadow-2xl border-0 rounded-xl">
              <div className="p-6 sm:p-10 lg:p-16">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-dark mb-4 sm:mb-6 tracking-tight px-2">
                    Psicología integradora y humana
                  </h2>
                  <p className="text-secondary-gray text-base sm:text-lg tracking-wide px-2">
                    Acompañamiento personalizado adaptado a tus
                    necesidades y ritmo vital
                  </p>
                </div>

                {/* Custom Tabs */}
                <div className="max-w-5xl mx-auto">
                  {/* Tab Headers */}
                  <div
                    id="service-tabs-header"
                    className="grid grid-cols-3 gap-0 mb-8 sm:mb-12 border-b border-gray-200"
                  >
                    <button
                      data-service="individual"
                      className="service-tab-button py-4 sm:py-6 text-center transition-all relative text-primary-dark"
                    >
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span className="text-sm sm:text-base lg:text-lg tracking-wide">
                          Individual
                        </span>
                      </div>
                      <div className="service-tab-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-primary-dark"></div>
                    </button>

                    <button
                      data-service="pareja"
                      className="service-tab-button py-4 sm:py-6 text-center transition-all relative border-l border-r border-gray-100 text-gray-400 hover:text-gray-600"
                    >
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span className="text-sm sm:text-base lg:text-lg tracking-wide">
                          Pareja
                        </span>
                      </div>
                      <div className="service-tab-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-primary-dark hidden"></div>
                    </button>

                    <button
                      data-service="online"
                      className="service-tab-button py-4 sm:py-6 text-center transition-all relative text-gray-400 hover:text-gray-600"
                    >
                      <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                        <span className="text-sm sm:text-base lg:text-lg tracking-wide">
                          Online
                        </span>
                      </div>
                      <div className="service-tab-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-primary-dark hidden"></div>
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div
                    id="service-tabs-content"
                    className="text-center max-w-3xl mx-auto py-6 sm:py-8 px-2 min-h-[280px] sm:min-h-[320px] flex items-center"
                  >
                    <div
                      data-service="individual"
                      className="service-content space-y-6 sm:space-y-8 animate-fade-in w-full"
                    >
                      <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-tight">
                        Terapia individual
                      </h3>
                      <p className="text-[#666666] text-base sm:text-lg leading-relaxed tracking-wide">
                        Un proceso de autoconocimiento profundo
                        para gestionar la ansiedad, el estrés y
                        fortalecer tu autoestima. Trabaja en tu
                        crecimiento personal con herramientas
                        terapéuticas basadas en la evidencia.
                      </p>
                      <a
                        href="/servicios"
                        className="bg-white text-[#666666] border-2 border-[#666666] hover:bg-[#8B7028] hover:border-[#8B7028] hover:text-white px-8 sm:px-10 py-3 tracking-wide transition-all w-full sm:w-auto rounded-lg inline-flex items-center justify-center font-medium active:translate-y-1"
                      >
                        Ver detalles
                      </a>
                    </div>

                    <div
                      data-service="pareja"
                      className="service-content hidden space-y-6 sm:space-y-8 w-full"
                    >
                      <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-tight">
                        Terapia familiar y de pareja
                      </h3>
                      <p className="text-[#666666] text-base sm:text-lg leading-relaxed tracking-wide">
                        Herramientas efectivas para mejorar la
                        comunicación, resolver conflictos y
                        reconectar emocionalmente. Un espacio
                        seguro para fortalecer vuestros vínculos.
                      </p>
                      <a
                        href="/servicios"
                        className="bg-white text-[#666666] border-2 border-[#666666] hover:bg-[#8B7028] hover:border-[#8B7028] hover:text-white px-8 sm:px-10 py-3 tracking-wide transition-all w-full sm:w-auto rounded-lg inline-flex items-center justify-center font-medium active:translate-y-1"
                      >
                        Ver detalles
                      </a>
                    </div>

                    <div
                      data-service="online"
                      className="service-content hidden space-y-6 sm:space-y-8 w-full"
                    >
                      <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-tight">
                        Terapia online
                      </h3>
                      <p className="text-[#666666] text-base sm:text-lg leading-relaxed tracking-wide">
                        La misma cercanía y profesionalidad desde
                        la comodidad de tu hogar, sin barreras
                        geográficas. Sesiones por videollamada con
                        total confidencialidad.
                      </p>
                      <a
                        href="/servicios"
                        className="bg-white text-[#666666] border-2 border-[#666666] hover:bg-[#8B7028] hover:border-[#8B7028] hover:text-white px-8 sm:px-10 py-3 tracking-wide transition-all w-full sm:w-auto rounded-lg inline-flex items-center justify-center font-medium active:translate-y-1"
                      >
                        Ver detalles
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Methodology Section */}
      <section
        id="sobre-mi"
        className="relative z-20 py-12 sm:py-16 lg:py-20 bg-[#FDFCF8]/97"
      >
        <FadeInWhenVisible delay={0.1}>
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="grid lg:grid-cols-[35%_65%] gap-8 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Image - Efecto Polaroid más estrecho */}
              <div className="order-2 lg:order-1">
                <div className="max-w-sm mx-auto">
                  <div className="bg-white p-4 sm:p-5 shadow-2xl rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314312/Malu-36_shkvn5.webp"
                        alt="Luisa García"
                        className="w-full h-full object-cover object-[42%_center]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/1080x1350/999999/FFFFFF?text=Luisa+García";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content - Más espacio */}
              <div className="space-y-5 sm:space-y-6 order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight leading-[1.1]">
                  Terapia psicológica para lograr el bienestar
                  consciente
                </h2>

                <p className="text-[#666666] text-lg sm:text-xl leading-relaxed tracking-wide">
                  Soy Luisa García, y mi propósito es ayudarte en
                  los cambios que necesitas para encontrar una
                  vida más equilibrada y en coherencia con uno
                  mismo.
                </p>

                <div className="pt-3 sm:pt-4 space-y-4 px-[5px]">
                  {/* Tarjeta 1 - Izquierda - Estilo Post-it */}
                  <PopUpWhenVisible delay={0.1}>
                    <div className="bg-[#D4D9BB] p-4 sm:p-5 rounded-2xl shadow-[4px_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_16px_rgba(0,0,0,0.2)] hover:scale-105 transition-all max-w-[88%] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-2xl before:pointer-events-none cursor-pointer">
                      <h4 className="text-lg sm:text-xl text-[#1A1A1A] mb-2 tracking-wide font-bold font-sans">
                        Atención plena
                      </h4>
                      <p className="text-[#555555] text-sm sm:text-base tracking-wide leading-snug">
                        Favorecer la conexión holística entre el
                        cuerpo, la mente y el entorno.
                      </p>
                    </div>
                  </PopUpWhenVisible>

                  {/* Tarjeta 2 - Derecha - Estilo Post-it */}
                  <PopUpWhenVisible delay={0.2}>
                    <div className="bg-[#FDEFD5] p-4 sm:p-5 rounded-2xl shadow-[4px_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_16px_rgba(0,0,0,0.2)] hover:scale-105 transition-all max-w-[88%] ml-auto relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-2xl before:pointer-events-none cursor-pointer">
                      <h4 className="text-lg sm:text-xl text-[#1A1A1A] mb-2 tracking-wide font-bold font-sans">
                        Integración realista
                      </h4>
                      <p className="text-[#555555] text-sm sm:text-base tracking-wide leading-snug">
                        Herramientas aplicables a tu rutina diaria.
                      </p>
                    </div>
                  </PopUpWhenVisible>

                  {/* Tarjeta 3 - Izquierda - Estilo Post-it */}
                  <PopUpWhenVisible delay={0.3}>
                    <div className="bg-[#C0C293] p-4 sm:p-5 rounded-2xl shadow-[4px_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_16px_rgba(0,0,0,0.2)] hover:scale-105 transition-all max-w-[88%] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:rounded-2xl before:pointer-events-none cursor-pointer">
                      <h4 className="text-lg sm:text-xl text-[#1A1A1A] mb-2 tracking-wide font-bold font-sans">
                        Calidez y cercanía
                      </h4>
                      <p className="text-[#555555] text-sm sm:text-base tracking-wide leading-snug">
                        Acompañamiento para nutrir tu bienestar de
                        manera integral.
                      </p>
                    </div>
                  </PopUpWhenVisible>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Process Section */}
      <section
        id="proceso"
        className="relative z-20 py-16 sm:py-24 lg:py-32 bg-[#738048]/90"
      >
        <FadeInWhenVisible delay={0.1}>
          <div className="px-4 sm:px-8 lg:px-16">
            <div className="container mx-auto">
              <div className="bg-white/70 backdrop-blur-sm shadow-2xl border-0 rounded-xl">
                <div className="p-6 sm:p-10 lg:p-16">
                  <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-primary-dark mb-4 sm:mb-6 tracking-tight px-2">
                      El proceso
                    </h2>
                    <p className="text-lg sm:text-xl text-secondary-gray max-w-2xl mx-auto tracking-wide px-4">
                      Un camino estructurado diseñado para tu
                      transformación
                    </p>
                  </div>

                  {/* ProcesoSlider Component */}
                  <div
                    id="proceso-slider"
                    className="max-w-5xl mx-auto space-y-8 sm:space-y-12"
                  >
                    {/* Timeline */}
                    <div className="relative px-2">
                      {/* Línea horizontal (solo en desktop) */}
                      <div className="hidden md:block absolute top-6 sm:top-7 left-0 right-0 h-px bg-[#DEBC5A]/30"></div>

                      <div
                        id="process-steps"
                        className="flex justify-between gap-2 sm:gap-4 md:gap-0"
                      >
                        {/* Paso 01 */}
                        <button
                          data-index="0"
                          className="process-step-button flex-1 flex flex-col items-center gap-2 sm:gap-3 group active"
                        >
                          <div className="relative flex items-center justify-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all bg-gold-quilamas border-gold-quilamas text-white shadow-lg group-[.active]:hover:bg-gold-quilamas group-[.active]:hover:border-gold-quilamas group-[.active]:hover:text-white group-hover:border-[#DEBC5A] group-hover:bg-[#DEBC5A]/5 group-hover:text-[#1A1A1A]">
                              <svg
                                className="w-5 h-5 sm:w-6 sm:h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                            </div>
                          </div>
                          <div className="text-center space-y-0.5 sm:space-y-1">
                            <div className="text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#DEBC5A] font-semibold">
                              Paso 01
                            </div>
                            <div className="text-xs sm:text-sm md:text-base font-medium tracking-wide text-[#1A1A1A]">
                              Contacta conmigo
                            </div>
                          </div>
                        </button>

                        {/* Paso 02 */}
                        <button
                          data-index="1"
                          className="process-step-button flex-1 flex flex-col items-center gap-2 sm:gap-3 group"
                        >
                          <div className="relative flex items-center justify-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all bg-white border-[#CFCFCF] text-[#1A1A1A] group-[.active]:hover:bg-gold-quilamas group-[.active]:hover:border-gold-quilamas group-[.active]:hover:text-white group-hover:border-[#bea9cf] group-hover:bg-[#bea9cf]/5 shadow-md">
                              <svg
                                className="w-5 h-5 sm:w-6 sm:h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                <rect
                                  x="8"
                                  y="2"
                                  width="8"
                                  height="4"
                                  rx="1"
                                  ry="1"
                                ></rect>
                              </svg>
                            </div>
                          </div>
                          <div className="text-center space-y-0.5 sm:space-y-1">
                            <div className="text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#999999]">
                              Paso 02
                            </div>
                            <div className="text-xs sm:text-sm md:text-base font-medium tracking-wide text-[#999999] group-hover:text-[#1A1A1A]">
                              Primera sesión
                            </div>
                          </div>
                        </button>

                        {/* Paso 03 */}
                        <button
                          data-index="2"
                          className="process-step-button flex-1 flex flex-col items-center gap-2 sm:gap-3 group"
                        >
                          <div className="relative flex items-center justify-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all bg-white border-[#CFCFCF] text-[#1A1A1A] group-[.active]:hover:bg-gold-quilamas group-[.active]:hover:border-gold-quilamas group-[.active]:hover:text-white group-hover:border-[#7db4d9] group-hover:bg-[#7db4d9]/5 shadow-md">
                              <svg
                                className="w-5 h-5 sm:w-6 sm:h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="10"
                                ></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line
                                  x1="12"
                                  y1="17"
                                  x2="12.01"
                                  y2="17"
                                ></line>
                              </svg>
                            </div>
                          </div>
                          <div className="text-center space-y-0.5 sm:space-y-1">
                            <div className="text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#999999]">
                              Paso 03
                            </div>
                            <div className="text-xs sm:text-sm md:text-base font-medium tracking-wide text-[#999999] group-hover:text-[#1A1A1A]">
                              Sesiones siguientes
                            </div>
                          </div>
                        </button>

                        {/* Paso 04 */}
                        <button
                          data-index="3"
                          className="process-step-button flex-1 flex flex-col items-center gap-2 sm:gap-3 group"
                        >
                          <div className="relative flex items-center justify-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all bg-white border-[#CFCFCF] text-[#1A1A1A] group-[.active]:hover:bg-gold-quilamas group-[.active]:hover:border-gold-quilamas group-[.active]:hover:text-white group-hover:border-[#88c5a0] group-hover:bg-[#88c5a0]/5 shadow-md">
                              <svg
                                className="w-5 h-5 sm:w-6 sm:h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                            </div>
                          </div>
                          <div className="text-center space-y-0.5 sm:space-y-1">
                            <div className="text-[9px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#999999]">
                              Paso 04
                            </div>
                            <div className="text-xs sm:text-sm md:text-base font-medium tracking-wide text-[#999999] group-hover:text-[#1A1A1A]">
                              Seguimiento
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Detalle del paso activo */}
                    <div
                      id="process-content"
                      className="bg-white border-2 border-[#DEBC5A]/20 px-6 sm:px-8 md:px-10 py-8 sm:py-10 lg:py-12 shadow-lg rounded-xl"
                    >
                      <div
                        id="process-detail-0"
                        className="process-detail space-y-3 sm:space-y-4 animate-fade-in"
                      >
                        <div className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-[#DEBC5A] uppercase font-semibold">
                          Paso 01
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-tight">
                          Contacta conmigo
                        </h3>
                        <p className="text-[#666666] text-base sm:text-lg leading-relaxed tracking-wide">
                          Tendremos un primer contacto breve,
                          donde recogeremos información y motivo
                          de la consulta antes de llevar a cabo la
                          primera sesión en función de tu
                          disponibilidad.
                        </p>
                      </div>

                      <div
                        id="process-detail-1"
                        className="process-detail space-y-3 sm:space-y-4 hidden"
                      >
                        <div className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-[#bea9cf] uppercase font-semibold">
                          Paso 02
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-tight">
                          Primera sesión de valoración
                        </h3>
                        <p className="text-[#666666] text-base sm:text-lg leading-relaxed tracking-wide">
                          En esta primera sesión, se realiza una
                          valoración e hipótesis de trabajo y
                          estableceremos los objetivos de la
                          terapia en un proyecto de trabajo
                        </p>
                      </div>

                      <div
                        id="process-detail-2"
                        className="process-detail space-y-3 sm:space-y-4 hidden"
                      >
                        <div className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-[#7db4d9] uppercase font-semibold">
                          Paso 03
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-tight">
                          Segunda sesión y siguientes
                        </h3>
                        <p className="text-[#666666] text-base sm:text-lg leading-relaxed tracking-wide">
                          Las siguientes sesiones trabajaremos
                          centrados en las mejorías y en los
                          patrones que impiden avanzar, para
                          orientarte de una manera personalizada y
                          adaptada a tus necesidades.
                        </p>
                      </div>

                      <div
                        id="process-detail-3"
                        className="process-detail space-y-3 sm:space-y-4 hidden"
                      >
                        <div className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-[#88c5a0] uppercase font-semibold">
                          Paso 04
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] tracking-tight">
                          Seguimiento
                        </h3>
                        <p className="text-[#666666] text-base sm:text-lg leading-relaxed tracking-wide">
                          A medida que avancemos en el proceso se
                          irán ampliando las sesiones en el tiempo
                          y tras alcanzar los objetivos se
                          realizará un seguimiento posterior.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Target Audience Section */}
      <section className="relative z-20 py-16 sm:py-24 lg:py-32 bg-[#FDFCF8]/97 overflow-hidden">
        <FadeInWhenVisible>
          <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-[1.1] tracking-tight px-2 mb-6">
                ¿Para quién es esto?
              </h2>
              <p className="text-lg sm:text-xl text-secondary-gray max-w-3xl mx-auto tracking-wide px-4">
                Si te identificas con alguna de estas situaciones,
                puedo acompañarte en tu proceso de cambio
              </p>
            </div>

            <div className="relative group max-w-7xl mx-auto px-4 sm:px-12">
              {/* Arrows */}
              <button
                id="carousel-prev"
                className="hidden sm:flex absolute left-0 top-[180px] z-10 w-10 h-10 items-center justify-center rounded-full bg-white shadow-lg transition-all text-gray-400 hover:text-[#DEBC5A] hover:border-[#DEBC5A] border border-gray-100"
                aria-label="Anterior"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <button
                id="carousel-next"
                className="hidden sm:flex absolute right-0 top-[180px] z-10 w-10 h-10 items-center justify-center rounded-full bg-white shadow-lg transition-all text-gray-400 hover:text-[#DEBC5A] hover:border-[#DEBC5A] border border-gray-100"
                aria-label="Siguiente"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              {/* Dots */}
              <div
                id="carousel-dots"
                className="flex justify-center gap-3 mt-6 mb-8"
              >
                {/* En móvil: 9 dots (1 item a la vez), en tablet: 5 dots (2 items), en desktop: 3 dots (3 items) */}
                {Array.from({ length: 7 }).map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot h-2 transition-all rounded-full ${index === 0
                      ? "bg-gold-quilamas w-12"
                      : "bg-gray-300 w-2"
                      }`}
                    data-index={index}
                    aria-label={`Ir a slide ${index + 1}`}
                  ></button>
                ))}
              </div>

              {/* Carousel */}
              <div
                id="audience-carousel"
                className="flex gap-6 sm:gap-8 overflow-x-auto sm:overflow-hidden snap-x sm:snap-none snap-mandatory pb-8 px-4 sm:px-0 scrollbar-hide touch-pan-x"
              >
                {carouselItems.map((item, index) => (
                  <div
                    key={index}
                    className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] snap-center space-y-5 sm:space-y-6"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg border-2 border-[#DEBC5A]/10">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="space-y-3 sm:space-y-4 pt-2">
                      <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                        {item.desc}
                      </p>
                      <a
                        href="/servicios"
                        className="inline-flex items-center text-[#DEBC5A] hover:text-[#bea9cf] hover:gap-3 gap-2 transition-all tracking-wide font-medium"
                      >
                        Saber más{" "}
                        <span className="text-xl leading-none">
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Reviews Section */}
      <section className="relative z-20 py-16 sm:py-24 overflow-hidden bg-[#738048]/90">
        <FadeInWhenVisible>
          <div className="container mx-auto px-4 sm:px-8 mb-10 sm:mb-14 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight">
              Lo que dicen mis pacientes
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
            {[0, 1].map((i) => (
              <div key={i} className="flex gap-6 sm:gap-8 px-4">
                {reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="w-80 sm:w-96 bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-sm border-2 border-[#bea9cf]/10 flex-shrink-0 hover:border-[#bea9cf]/30 hover:shadow-md transition-all"
                  >
                    <div className="flex text-[#DEBC5A] text-sm mb-4">
                      ★ ★ ★ ★ ★
                    </div>
                    <p className="text-[#666666] text-sm sm:text-base leading-relaxed mb-6">
                      "{rev.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#bea9cf]/10 border-2 border-[#bea9cf]/20 flex items-center justify-center text-[#1A1A1A] font-bold text-sm">
                        {rev.init}
                      </div>
                      <div className="text-sm font-medium text-[#1A1A1A]">
                        {rev.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-20 py-16 sm:py-24 lg:py-32 text-white overflow-hidden">
        {/* Overlay oscuro semi-transparente */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"></div>

        <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-[1.1] tracking-tight px-2">
              El primer paso es el más difícil.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Te acompaño en el resto.
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto tracking-wide px-4">
              Agenda tu sesión exploratoria sin compromiso. Un
              espacio de 50 minutos donde conocernos y explorar
              cómo puedo ayudarte.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4 sm:pt-8 px-4">
              <a
                href="/servicios"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-dark px-8 sm:px-10 py-3 tracking-wide transition-all w-full sm:w-auto rounded-lg inline-flex items-center justify-center font-medium active:translate-y-1"
              >
                Explorar servicios
              </a>
              <a
                href="/contacto"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-dark px-8 sm:px-10 py-3 tracking-wide transition-all w-full sm:w-auto rounded-lg inline-flex items-center justify-center font-medium active:translate-y-1"
              >
                Contactar ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 120s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}