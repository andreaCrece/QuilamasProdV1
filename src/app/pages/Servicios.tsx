import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Componente para animación de escala y rotación sutil
function ScaleRotateIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Componente para animación deslizamiento lateral
function SlideInFromSide({
  children,
  delay = 0,
  direction = "left"
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right"
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === "left" ? -100 : 100 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Componente para efecto de escritura (typewriter)
function TypewriterText({
  text,
  delay = 0,
  className = ""
}: {
  text: string;
  delay?: number;
  className?: string
}) {
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
    }, 50);

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

// Componente para animación de entrada con fade
function FadeInWhenVisible({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Servicios() {
  const [specializedExpanded, setSpecializedExpanded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const individualItems = [
    "Ansiedad y trastornos de ansiedad",
    "Depresión y bajo estado de ánimo",
    "Estrés crónico y burnout",
    "Baja autoestima y autocrítica",
    "Dificultades en relaciones interpersonales",
    "Duelo y pérdidas significativas",
    "Trastornos del sueño",
    "Gestión emocional y autocontrol",
  ];

  const familiarItems = [
    "Conflictos entre padres e hijos",
    "Problemas de comunicación familiar",
    "Dificultades en la crianza",
    "Adaptación a cambios (divorcio, mudanzas)",
    "Apoyo en enfermedades o duelos",
    "Límites y normas en el hogar",
    "Relaciones entre hermanos",
    "Mediación familiar",
  ];

  const parejaItems = [
    "Problemas de comunicación",
    "Infidelidad y reconstrucción de confianza",
    "Conflictos recurrentes",
    "Distanciamiento emocional",
    "Dificultades en la intimidad",
    "Transiciones vitales (hijos, mudanzas)",
    "Diferencias en valores o expectativas",
    "Decisión de continuar o separarse",
  ];

  const especializadoItems = [
    "Talleres de gestión emocional (ansiedad, miedo, soledad, rabia, autorregulación)",
    "Seminarios sobre duelo y pérdidas",
    "Grupo de autoestima, desarrollo y crecimiento personal",
    "Autocuidados, soledad no deseada, violencia de género",
    "Habilidades sociales y parentales",
    "Formaciones para ampas, asociaciones, empresas y equipos",
    "Charlas divulgativas sobre salud mental",
    "Cursos de mindfulness y reducción de estrés en la naturaleza",
    "Arte-terapia",
  ];

  const faqs = [
    {
      q: "¿Cuánto dura el proceso terapéutico?",
      a: "La duración varía según cada persona y sus objetivos. Generalmente, procesos de terapia breve van de 8 a 12 sesiones, mientras que procesos más profundos pueden extenderse varios meses. Evaluamos el progreso continuamente y ajustamos según tus necesidades.",
    },
    {
      q: "¿Ofreces terapia online?",
      a: "Sí, ofrecemos terapia online con el mismo rigor y cercanía que en las sesiones presenciales. Este formato te permite realizar las sesiones desde la comodidad de tu hogar o cualquier lugar donde te sientas seguro, eliminando desplazamientos y facilitando la conciliación con tu rutina",
    },
    {
      q: "¿Qué diferencia hay entre psicólogo y psiquiatra?",
      a: "El psicólogo trabaja mediante terapia y técnicas psicológicas. El psiquiatra es médico y puede recetar medicación. En muchos casos, trabajamos de forma complementaria. Si considero que necesitas valoración psiquiátrica, te lo comunicaré.",
    },
    {
      q: "¿Cómo sé si necesito terapia?",
      a: "Si sientes que tus emociones o pensamientos interfieren en tu día a día, si tienes dificultades para gestionar situaciones, o simplemente deseas conocerte mejor y crecer personalmente, la terapia puede ayudarte. La primera consulta te ayudará a determinarlo.",
    },
    {
      q: "¿Qué pasa si necesito cancelar una sesión?",
      a: "Puedes cancelar o reprogramar con al menos 24 horas de antelación sin coste. Cancelaciones con menos de 24 horas se cobrarán el 50% de la sesión, salvo emergencias justificadas.",
    },
    {
      q: "¿La información que comparto es confidencial?",
      a: "Absolutamente. El secreto profesional es sagrado. Solo podría romperse en casos excepcionales donde haya riesgo grave para ti o terceros, y siempre se te informaría. Toda la información está protegida según la normativa de protección de datos.",
    },
    {
      q: "¿Cómo es la primera sesión y qué debo esperar?",
      a: "La primera sesión es una toma de contacto para conocernos. Tú me cuentas qué te trae a consulta y yo te explico cómo podemos trabajar. No es un interrogatorio, sino un espacio seguro para ver si te sientes cómodo/a conmigo. Al final, te daré una primera impresión y trazaremos una hoja de ruta.",
    },
    {
      q: "¿Qué métodos de pago aceptas?",
      a: "Acepto pagos mediante tarjeta de débito, transferencia bancaria y Bizum. El pago se realiza generalmente antes de la sesión o al finalizar la misma, según lo acordado.",
    },
  ];

  return (
    <>
      <Header isHomePage={false} />

      <div className="bg-white pt-24">
        {/* Hero Section */}
        <section className="py-0 bg-white relative min-h-[300px] sm:min-h-[380px] md:min-h-[450px]">
          {/* Background Image - FIXED */}
          <div className="fixed inset-0 z-0 h-screen">
            <img
              src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314290/FONDO_3_x70twt.webp"
              alt="Servicios de Psicología"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex items-center justify-center text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 min-h-[300px] sm:min-h-[380px] md:min-h-[450px]">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
              {/* Flor decorativa */}
              <div className="flex-shrink-0 -mt-6 sm:mt-0 sm:-translate-y-4 md:-translate-y-6 lg:-translate-y-8">
                <svg
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
                  style={{ color: "#DEBC5A" }}
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Centro de la flor */}
                  <circle
                    cx="100"
                    cy="100"
                    r="20"
                    fill="currentColor"
                    opacity="0.9"
                  />

                  {/* Pétalos */}
                  <ellipse
                    cx="100"
                    cy="50"
                    rx="25"
                    ry="45"
                    fill="currentColor"
                    opacity="0.7"
                  />
                  <ellipse
                    cx="100"
                    cy="150"
                    rx="25"
                    ry="45"
                    fill="currentColor"
                    opacity="0.7"
                  />
                  <ellipse
                    cx="50"
                    cy="100"
                    rx="45"
                    ry="25"
                    fill="currentColor"
                    opacity="0.7"
                  />
                  <ellipse
                    cx="150"
                    cy="100"
                    rx="45"
                    ry="25"
                    fill="currentColor"
                    opacity="0.7"
                  />

                  {/* Pétalos diagonales */}
                  <ellipse
                    cx="65"
                    cy="65"
                    rx="25"
                    ry="45"
                    fill="currentColor"
                    opacity="0.6"
                    transform="rotate(-45 65 65)"
                  />
                  <ellipse
                    cx="135"
                    cy="135"
                    rx="25"
                    ry="45"
                    fill="currentColor"
                    opacity="0.6"
                    transform="rotate(-45 135 135)"
                  />
                  <ellipse
                    cx="135"
                    cy="65"
                    rx="25"
                    ry="45"
                    fill="currentColor"
                    opacity="0.6"
                    transform="rotate(45 135 65)"
                  />
                  <ellipse
                    cx="65"
                    cy="135"
                    rx="25"
                    ry="45"
                    fill="currentColor"
                    opacity="0.6"
                    transform="rotate(45 65 135)"
                  />
                </svg>
              </div>

              {/* Título */}
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.1] mb-8 sm:mb-12 lg:mb-16"
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 600,
                  color: "#DEBC5A",
                }}
              >
                <TypewriterText text="Servicios" delay={0.5} />
              </h1>
            </div>
          </div>
        </section>

        {/* Services Card Section - Overlapping Floating Box */}
        <div className="relative z-20 container mx-auto px-4 sm:px-8 lg:px-16 pb-8 sm:pb-16 mt-[-80px] sm:mt-[-100px]">
          <FadeInWhenVisible delay={2}>
            <div className="bg-white/85 backdrop-blur-sm shadow-2xl border-0 rounded-xl">
              <div className="p-6 sm:p-10 lg:p-16">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-dark mb-4 sm:mb-6 tracking-tight px-2">
                    Psicología integradora y humana
                  </h2>
                  <p className="text-secondary-gray text-base sm:text-lg tracking-wide px-2 mb-6">
                    Un espacio profesional donde encontrarás el acompañamiento psicológico que necesitas. Terapia personalizada, basada en evidencia y centrada en tus objetivos de bienestar.
                  </p>
                  <div className="pt-2 sm:pt-4">
                    <a
                      href="/contacto"
                      className="border-2 border-[#666666] text-[#666666] bg-transparent hover:bg-gold-quilamas hover:text-white hover:border-gold-quilamas px-8 sm:px-10 md:px-12 py-4 sm:py-5 h-auto text-sm sm:text-base lg:text-lg tracking-wide transition-all w-full sm:w-auto rounded-lg shadow-lg hover:shadow-xl inline-flex items-center justify-center"
                    >
                      Agendar primera cita
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Tipos de Servicios - Cards */}
        <section className="hidden md:block py-16 sm:py-24 lg:py-32 bg-[#FDFCF8]/95 relative z-10">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <FadeInWhenVisible delay={0.1}>
              <div className="text-center mb-12 sm:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#1A1A1A] mb-6 tracking-tight">
                  Tipos de servicios
                </h2>
                <p className="text-lg sm:text-xl text-[#666666] max-w-3xl mx-auto tracking-wide">
                  Selecciona el servicio que mejor se adapte a tus necesidades
                </p>
              </div>
            </FadeInWhenVisible>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {/* Card 1 - Terapia Individual */}
              <ScaleRotateIn delay={0.1}>
                <button
                  onClick={() => scrollToSection("individual")}
                  className="group text-left w-full"
                >
                  <div className="bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 h-full overflow-hidden rounded-xl">
                    <div className="p-0">
                      <div className="aspect-[2/1] overflow-hidden">
                        <img
                          src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314288/TERAPIA_INDIVIDUAL_amx68c.webp"
                          alt="Terapia Individual"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="inline-flex items-center justify-center w-12 h-12 border border-[#1A1A1A] rounded-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 text-[#1A1A1A]"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <h3 className="text-2xl font-serif text-[#1A1A1A] tracking-tight">
                          Terapia individual
                        </h3>
                        <p className="text-[#666666] leading-relaxed tracking-wide">
                          Adultos y adolescentes. Un espacio seguro para trabajar en tu
                          bienestar emocional.
                        </p>
                        <div className="inline-flex items-center text-[#1A1A1A] group-hover:gap-3 gap-2 transition-all tracking-wide pt-2 font-medium">
                          Ver más <span className="text-xl leading-none">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </ScaleRotateIn>

              {/* Card 2 - Terapia Familiar */}
              <ScaleRotateIn delay={0.2}>
                <button
                  onClick={() => scrollToSection("familiar")}
                  className="group text-left w-full"
                >
                  <div className="bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 h-full overflow-hidden rounded-xl">
                    <div className="p-0">
                      <div className="aspect-[2/1] overflow-hidden">
                        <img
                          src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314287/TERAPIA_FAMILIAR_m9cxn7.webp"
                          alt="Terapia Familiar"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="inline-flex items-center justify-center w-12 h-12 border border-[#1A1A1A] rounded-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 text-[#1A1A1A]"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <h3 className="text-2xl font-serif text-[#1A1A1A] tracking-tight">
                          Terapia familiar
                        </h3>
                        <p className="text-[#666666] leading-relaxed tracking-wide">
                          Mejora la convivencia, resuelve conflictos y fortalece los
                          vínculos familiares.
                        </p>
                        <div className="inline-flex items-center text-[#1A1A1A] group-hover:gap-3 gap-2 transition-all tracking-wide pt-2 font-medium">
                          Ver más <span className="text-xl leading-none">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </ScaleRotateIn>

              {/* Card 3 - Terapia de Pareja */}
              <ScaleRotateIn delay={0.3}>
                <button
                  onClick={() => scrollToSection("pareja")}
                  className="group text-left w-full"
                >
                  <div className="bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 h-full overflow-hidden rounded-xl">
                    <div className="p-0">
                      <div className="aspect-[2/1] overflow-hidden">
                        <img
                          src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314297/TERAPIA_PEREJA_bd7fxw.webp"
                          alt="Terapia de Pareja"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="inline-flex items-center justify-center w-12 h-12 border border-[#1A1A1A] rounded-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 text-[#1A1A1A]"
                          >
                            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.02-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </div>
                        <h3 className="text-2xl font-serif text-[#1A1A1A] tracking-tight">
                          Terapia de pareja
                        </h3>
                        <p className="text-[#666666] leading-relaxed tracking-wide">
                          Reconstruye la confianza y mejora la comunicación en tu relación.
                        </p>
                        <div className="inline-flex items-center text-[#1A1A1A] group-hover:gap-3 gap-2 transition-all tracking-wide pt-2 font-medium">
                          Ver más <span className="text-xl leading-none">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </ScaleRotateIn>

              {/* Card 4 - Servicios Especializados */}
              <ScaleRotateIn delay={0.4}>
                <button
                  onClick={() => scrollToSection("especializado")}
                  className="group text-left w-full"
                >
                  <div className="bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 h-full overflow-hidden rounded-xl">
                    <div className="p-0">
                      <div className="aspect-[2/1] overflow-hidden">
                        <img
                          src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314315/prueba-71_rqiwpz.webp"
                          alt="Servicios Especializados"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="inline-flex items-center justify-center w-12 h-12 border border-[#1A1A1A] rounded-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 text-[#1A1A1A]"
                          >
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                          </svg>
                        </div>
                        <h3 className="text-2xl font-serif text-[#1A1A1A] tracking-tight">
                          Servicios Especializados
                        </h3>
                        <p className="text-[#666666] leading-relaxed tracking-wide">
                          Formación, talleres, cursos y seminarios adaptados a diferentes
                          necesidades.
                        </p>
                        <div className="inline-flex items-center text-[#1A1A1A] group-hover:gap-3 gap-2 transition-all tracking-wide pt-2 font-medium">
                          Ver más <span className="text-xl leading-none">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </ScaleRotateIn>
            </div>
          </div>
        </section>

        {/* Camino zigzag con líneas discontinuas */}
        <div className="absolute inset-0 pointer-events-none" style={{ top: '2100px', height: '3800px', zIndex: 5 }}>
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 3800"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 200 400 Q 400 500, 900 700 Q 1050 800, 1100 900 Q 1050 1000, 300 1200 Q 150 1300, 100 1400 Q 150 1500, 850 1700 Q 1000 1800, 1100 1900 Q 1000 2000, 400 2200 Q 200 2300, 100 2400 Q 200 2500, 800 2700 Q 1000 2800, 1100 2900 Q 1000 3000, 350 3200 Q 200 3300, 200 3400 Q 250 3500, 900 3700"
              stroke="#DEBC5A"
              strokeWidth="12"
              strokeDasharray="40 40"
              fill="none"
              strokeLinecap="round"
              opacity="1"
            />
          </svg>
        </div>

        {/* Detalle Terapia Individual */}
        <section
          id="individual"
          className="py-16 sm:py-24 lg:py-32 bg-[#738048]/95 relative z-10 scroll-mt-32 lg:scroll-mt-40"
        >
          <SlideInFromSide delay={0.1}>
            <div style={{ marginLeft: '20px', marginRight: '30px' }}>
              <div className="bg-white rounded-xl shadow-xl p-8 sm:p-12 lg:p-16">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="aspect-[2/3] overflow-hidden rounded-xl shadow-xl">
                      <img
                        src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314288/TERAPIA_INDIVIDUAL_amx68c.webp"
                        alt="Terapia Individual"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight leading-[1.1]">
                      Terapia individual para adultos y adolescentes
                    </h3>

                    <p className="text-lg sm:text-xl text-[#666666] leading-relaxed tracking-wide">
                      Un proceso terapéutico personalizado donde trabajaremos juntos para
                      superar los desafíos que te impiden vivir plenamente. Utilizando la
                      terapia cognitivo-conductual integrativa, te acompaño en tu camino
                      hacia el bienestar emocional.
                    </p>

                    <div className="pt-4">
                      <h4 className="text-xl sm:text-2xl text-[#1A1A1A] mb-6 tracking-wide">
                        Desafíos comunes que abordamos:
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-y-2 gap-x-8">
                        {individualItems.map((text, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-1.5 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-5 h-5 text-gold-quilamas flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <p className="text-[#666666] tracking-wide text-base">{text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <a
                        href="/contacto"
                        className="border-2 border-[#666666] text-[#666666] bg-transparent hover:bg-gold-quilamas hover:text-white hover:border-gold-quilamas px-10 py-3 tracking-wide transition-all rounded-lg inline-block"
                      >
                        Reservar consulta
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideInFromSide>
        </section>

        {/* Detalle Terapia Familiar */}
        <section
          id="familiar"
          className="py-16 sm:py-24 lg:py-32 bg-[#738048]/95 relative z-10 scroll-mt-32 lg:scroll-mt-40"
        >
          <SlideInFromSide delay={0.1} direction="right">
            <div style={{ marginLeft: '30px', marginRight: '20px' }}>
              <div className="bg-white rounded-xl shadow-xl p-8 sm:p-12 lg:p-16">
                <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-center">
                  <div className="order-2 lg:order-2">
                    <div className="aspect-[2/3] overflow-hidden rounded-xl shadow-xl">
                      <img
                        src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314287/TERAPIA_FAMILIAR_m9cxn7.webp"
                        alt="Terapia Familiar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-6 sm:space-y-8 order-1 lg:order-1">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight leading-[1.1]">
                      Terapia familiar
                    </h3>

                    <p className="text-lg sm:text-xl text-[#666666] leading-relaxed tracking-wide">
                      Un espacio para mejorar la convivencia y fortalecer los vínculos.
                      Trabajamos para resolver conflictos, mejorar la comunicación y construir
                      relaciones más sanas y comprensivas dentro del núcleo familiar.
                    </p>

                    <div className="pt-4">
                      <h4 className="text-xl sm:text-2xl text-[#1A1A1A] mb-6 tracking-wide">
                        Áreas de trabajo:
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-y-2 gap-x-8">
                        {familiarItems.map((text, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-1.5 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-5 h-5 text-gold-quilamas flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <p className="text-[#666666] tracking-wide text-base">{text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <a
                        href="/contacto"
                        className="border-2 border-[#666666] text-[#666666] bg-transparent hover:bg-gold-quilamas hover:text-white hover:border-gold-quilamas px-10 py-3 tracking-wide transition-all rounded-lg inline-block"
                      >
                        Reservar consulta
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideInFromSide>
        </section>

        {/* Detalle Terapia de Pareja */}
        <section
          id="pareja"
          className="py-16 sm:py-24 lg:py-32 bg-[#738048]/95 relative z-10 scroll-mt-32 lg:scroll-mt-40"
        >
          <SlideInFromSide delay={0.1}>
            <div style={{ marginLeft: '20px', marginRight: '30px' }}>
              <div className="bg-white rounded-xl shadow-xl p-8 sm:p-12 lg:p-16">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="aspect-[2/3] overflow-hidden rounded-xl shadow-xl">
                      <img
                        src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314297/TERAPIA_PEREJA_bd7fxw.webp"
                        alt="Terapia de Pareja"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight leading-[1.1]">
                      Terapia de pareja
                    </h3>

                    <p className="text-lg sm:text-xl text-[#666666] leading-relaxed tracking-wide">
                      Un espacio neutral y seguro donde ambos podéis expresaros sin juicio.
                      Trabajamos en la mejora de la comunicación, la resolución de conflictos
                      y el fortalecimiento del vínculo emocional que os une.
                    </p>

                    <div className="pt-4">
                      <h4 className="text-xl sm:text-2xl text-[#1A1A1A] mb-6 tracking-wide">
                        Motivos frecuentes de consulta:
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-y-2 gap-x-8">
                        {parejaItems.map((text, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-1.5 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-5 h-5 text-gold-quilamas flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <p className="text-[#666666] tracking-wide text-base">{text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <a
                        href="/contacto"
                        className="border-2 border-[#666666] text-[#666666] bg-transparent hover:bg-gold-quilamas hover:text-white hover:border-gold-quilamas px-10 py-3 tracking-wide transition-all rounded-lg inline-block"
                      >
                        Reservar consulta
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideInFromSide>
        </section>

        {/* Servicios Especializados */}
        <section
          id="especializado"
          className="py-16 sm:py-24 lg:py-32 bg-[#738048]/95 relative z-10 scroll-mt-32 lg:scroll-mt-40"
        >
          <SlideInFromSide delay={0.1} direction="right">
            <div style={{ marginLeft: '30px', marginRight: '20px' }}>
              <div className="bg-white rounded-xl shadow-xl p-8 sm:p-12 lg:p-16">
                <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start">
                  <div className="order-1 lg:order-2">
                    <div className="aspect-[2/3] overflow-hidden rounded-xl shadow-xl">
                      <img
                        src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314315/prueba-71_rqiwpz.webp"
                        alt="Servicios Especializados"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight leading-[1.1]">
                      Servicios especializados: formación y talleres
                    </h3>

                    <div className="text-lg sm:text-xl text-[#666666] leading-relaxed tracking-wide space-y-4">
                      <p>
                        Además de la terapia, ofrezco espacios de aprendizaje y crecimiento
                        grupal. Esta sección incluye formaciones, talleres, cursos y
                        seminarios diseñados para abordar temáticas específicas desde la
                        psicología integrativa.
                      </p>

                      <div
                        className={`space-y-4 overflow-hidden transition-all duration-500 ${specializedExpanded
                          ? "max-h-[1000px] opacity-100"
                          : "max-h-0 opacity-0"
                          }`}
                      >
                        <p>
                          Además de la terapia desde QP ofrecemos programas de formación
                          especializados diseñados para necesidades específicas. Estos
                          servicios combinan intervención psicológica con herramientas
                          prácticas de desarrollo personal en formato grupal. Ofrecen un
                          espacio seguro y cercano donde podrás aprender, explorar y cuidarte.
                        </p>
                        <p>
                          Nuestros talleres de psicología te acompañan a profundizar en tu
                          bienestar emocional con herramientas prácticas y vivenciales con una
                          mirada terapéutica. Cada taller está pensado para que puedas avanzar
                          a tu ritmo, sostener lo que sientes y aprender sobre más sobre ti y
                          sobre lo que te inquieta.
                        </p>
                        <p className="font-medium text-[#1A1A1A]">
                          Un entorno seguro para el auto descubrimiento y el fortalecimiento
                          emocional.
                        </p>
                      </div>

                      <button
                        onClick={() => setSpecializedExpanded(!specializedExpanded)}
                        className="text-[#1A1A1A] font-medium border-b-2 border-gold-quilamas hover:text-gold-quilamas transition-colors"
                      >
                        {specializedExpanded ? "Leer menos" : "Leer más"}
                      </button>
                    </div>

                    <div className="pt-4">
                      <h4 className="text-xl sm:text-2xl text-[#1A1A1A] mb-6 tracking-wide">
                        Propuestas formativas:
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-y-2 gap-x-8">
                        {especializadoItems.map((text, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-1.5 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-5 h-5 text-gold-quilamas flex-shrink-0"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <p className="text-[#666666] tracking-wide text-base">{text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8">
                      <a
                        href="/recursos?filter=novedades"
                        className="border-2 border-[#666666] text-[#666666] bg-transparent hover:bg-gold-quilamas hover:text-white hover:border-gold-quilamas px-10 py-3 text-lg tracking-wide transition-all rounded-lg inline-block font-medium"
                      >
                        Consultar próximos eventos
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideInFromSide>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <FadeInWhenVisible delay={0.1}>
                <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-6 tracking-tight">
                    Preguntas frecuentes
                  </h2>
                  <p className="text-lg sm:text-xl text-white tracking-wide">
                    Resolvemos tus dudas más comunes
                  </p>
                </div>
              </FadeInWhenVisible>

              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <FadeInWhenVisible key={index} delay={0.2 + (index * 0.1)}>
                    <div className="bg-white border-0 px-6 sm:px-8 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden h-full min-h-[120px] flex flex-col">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="text-left text-lg sm:text-xl text-[#1A1A1A] hover:text-gold-quilamas tracking-wide py-6 w-full flex justify-between items-center"
                        aria-expanded={openFaqIndex === index}
                      >
                        <span className="pr-2">{faq.q}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`w-6 h-6 flex-shrink-0 ml-4 text-[#666666] transition-transform ${openFaqIndex === index ? "rotate-180" : ""
                            }`}
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </button>
                      {openFaqIndex === index && (
                        <div className="pb-6">
                          <p className="text-[#666666] leading-relaxed tracking-wide">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  </FadeInWhenVisible>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}