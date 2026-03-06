import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { motion, useInView } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type FilterType =
  | "all"
  | "novedades"
  | "guias"
  | "articulos"
  | "libros";

interface Resource {
  id: number;
  category: FilterType;
  title: string;
  date: string;
  description: string;
  badge: string;
  badgeColor: string;
  icon: JSX.Element;
  imageUrl?: string;
  linkText: string;
  linkUrl: string;
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

// Componente para animación de entrada con fade hacia arriba
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

// Componente para animación de deslizamiento desde la izquierda
function SlideInFromLeft({
  children,
  delay = 0
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Recursos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] =
    useState<FilterType>("all");

  useEffect(() => {
    const filter = searchParams.get("filter") as FilterType;
    if (
      filter &&
      [
        "all",
        "novedades",
        "guias",
        "articulos",
        "libros",
      ].includes(filter)
    ) {
      setActiveFilter(filter);
    }
  }, [searchParams]);

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
    setSearchParams({ filter });
  };

  const resources: Resource[] = [
    {
      id: 1,
      category: "guias",
      title: "Manejo de la ansiedad",
      date: "Enero 2026",
      description:
        "Guía práctica con ejercicios de respiración y técnicas cognitivas para momentos de crisis.",
      badge: "PDF",
      badgeColor: "text-gold-quilamas",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
      ),
      linkText: "Descargar ahora",
      linkUrl: "#",
    },
    {
      id: 2,
      category: "articulos",
      title: "La importancia de los límites",
      date: "Diciembre 2025",
      description:
        "Aprender a decir no es un acto de amor propio. Descubre por qué nos cuesta tanto.",
      badge: "Blog",
      badgeColor: "text-[#1A1A1A]",
      imageUrl:
        "https://images.unsplash.com/photo-1718975592728-7b594fb035b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwcmVhZGluZyUyMG1lbnRhbCUyMGhlYWx0aHxlbnwxfHx8fDE3Njg1NTA3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: <></>,
      linkText: "Leer artículo",
      linkUrl: "#",
    },
    {
      id: 3,
      category: "novedades",
      title: "Taller de mindfulness",
      date: "Marzo 2026",
      description:
        "Próximo taller grupal centrado en la reducción del estrés a través de la atención plena.",
      badge: "Taller",
      badgeColor: "text-[#1A1A1A]",
      imageUrl:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      icon: <></>,
      linkText: "Ver detalles",
      linkUrl: "#",
    },
    {
      id: 4,
      category: "novedades",
      title: "Seminario de relaciones sanas",
      date: "Abril 2026",
      description:
        "Charla divulgativa sobre cómo construir vínculos seguros y comunicación asertiva.",
      badge: "Evento",
      badgeColor: "text-[#1A1A1A]",
      imageUrl:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      icon: <></>,
      linkText: "Ver detalles",
      linkUrl: "#",
    },
    {
      id: 5,
      category: "guias",
      title: "Diario de gratitud",
      date: "Noviembre 2025",
      description:
        "Plantilla imprimible para comenzar tus mañanas con una mentalidad positiva.",
      badge: "PDF",
      badgeColor: "text-gold-quilamas",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      linkText: "Descargar ahora",
      linkUrl: "#",
    },
    {
      id: 6,
      category: "libros",
      title: "El cuerpo lleva la cuenta",
      date: "Octubre 2025",
      description:
        "Lectura recomendada para entender cómo el trauma afecta a nuestro cuerpo y mente.",
      badge: "Libro",
      badgeColor: "text-orange-400",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      ),
      linkText: "Ver en Amazon",
      linkUrl: "#",
    },
  ];

  const filteredResources =
    activeFilter === "all"
      ? resources
      : resources.filter((r) => r.category === activeFilter);

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "Todos" },
    { id: "novedades", label: "Novedades" },
    { id: "guias", label: "Guías y PDF" },
    { id: "articulos", label: "Artículos" },
    { id: "libros", label: "Lecturas" },
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
              src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314309/LUCES_Y_SOMBRAS_dhm95a.webp"
              alt="Recursos"
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
                <TypewriterText text="Recursos" delay={0.5} />
              </h1>
            </div>
          </div>
        </section>

        {/* Resources Card Section - Overlapping Floating Box */}
        <div className="relative z-20 px-5 pb-8 sm:pb-16 mt-[-80px] sm:mt-[-100px]">
          <FadeInWhenVisible delay={2}>
            <div className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-xl">
              <div className="p-6 sm:p-10 lg:p-16">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-dark mb-4 sm:mb-6 tracking-tight px-2">
                    Recursos para tu bienestar
                  </h2>
                  <p className="text-secondary-gray text-base sm:text-lg tracking-wide px-2">
                    Explora guías, videos y lecturas diseñadas
                    para cultivar tu salud emocional
                  </p>
                </div>

                {/* Filters */}
                <div
                  className="flex flex-wrap gap-4 mb-12"
                  id="resource-filters"
                >
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => handleFilterClick(filter.id)}
                      className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === filter.id
                        ? "bg-gold-quilamas text-white shadow-md"
                        : "bg-white text-gray-400 border border-gray-200 hover:text-gold-quilamas hover:border-gold-quilamas"
                        }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Resources Grid */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  id="resources-grid"
                >
                  {filteredResources.map((resource, index) => (
                    <SlideInFromLeft key={resource.id} delay={0.1 + (index * 0.1)}>
                      <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        {/* Card Image/Icon */}
                        {resource.imageUrl ? (
                          <div className="aspect-video bg-gray-100 rounded-xl mb-6 overflow-hidden relative">
                            <img
                              src={resource.imageUrl}
                              alt={resource.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase text-[#1A1A1A]">
                              {resource.badge}
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`aspect-video ${resource.category === "guias"
                              ? "bg-gold-quilamas/10 group-hover:bg-gold-quilamas/20"
                              : "bg-orange-50 group-hover:bg-orange-100"
                              } rounded-xl flex items-center justify-center mb-6 relative transition-colors`}
                          >
                            <div
                              className={
                                resource.category === "guias"
                                  ? "text-gold-quilamas"
                                  : "text-orange-400"
                              }
                            >
                              {resource.icon}
                            </div>
                            <div
                              className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase ${resource.badgeColor}`}
                            >
                              {resource.badge}
                            </div>
                          </div>
                        )}

                        {/* Card Content */}
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-serif text-[#1A1A1A] group-hover:text-gold-quilamas transition-colors">
                            {resource.title}
                          </h3>
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                            {resource.date}
                          </span>
                        </div>
                        <p className="text-sm text-[#666666] mb-6 leading-relaxed">
                          {resource.description}
                        </p>
                        <a
                          href={resource.linkUrl}
                          className="inline-flex items-center text-sm font-semibold text-[#1A1A1A] hover:text-gold-quilamas transition-colors gap-2"
                        >
                          {resource.linkText}
                          {resource.linkText.includes(
                            "Descargar",
                          ) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line
                                x1="12"
                                y1="15"
                                x2="12"
                                y2="3"
                              ></line>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line
                                x1="10"
                                y1="14"
                                x2="21"
                                y2="3"
                              ></line>
                            </svg>
                          )}
                        </a>
                      </div>
                    </SlideInFromLeft>
                  ))}
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Instagram Section */}
        <section className="relative py-20 sm:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <FadeInWhenVisible delay={0.1}>
                <div className="text-center mb-16 space-y-6">
                  <h2 className="text-gold-quilamas text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider uppercase flex items-center gap-3 sm:gap-4 justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
                      aria-hidden="true"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line
                        x1="17.5"
                        y1="6.5"
                        x2="17.51"
                        y2="6.5"
                      ></line>
                    </svg>
                    Sígueme en Instagram
                  </h2>
                </div>
              </FadeInWhenVisible>

              {/* Instagram Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* Post 1 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=1080&auto=format&fit=crop"
                    alt="Instagram Post 1"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white w-8 h-8"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line
                        x1="17.5"
                        y1="6.5"
                        x2="17.51"
                        y2="6.5"
                      ></line>
                    </svg>
                  </div>
                </motion.div>
                {/* Post 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1080&auto=format&fit=crop"
                    alt="Instagram Post 2"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white w-8 h-8"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line
                        x1="17.5"
                        y1="6.5"
                        x2="17.51"
                        y2="6.5"
                      ></line>
                    </svg>
                  </div>
                </motion.div>
                {/* Post 3 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1080&auto=format&fit=crop"
                    alt="Instagram Post 3"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white w-8 h-8"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line
                        x1="17.5"
                        y1="6.5"
                        x2="17.51"
                        y2="6.5"
                      ></line>
                    </svg>
                  </div>
                </motion.div>
              </div>

              <div className="mt-12 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "backOut" }}
                >
                  <a
                    href="https://www.instagram.com/malu_gcolmenero/#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-gold-quilamas text-white hover:bg-[#c9a847] px-10 py-5 text-lg font-medium tracking-wide transition-all rounded-xl shadow-lg hover:shadow-xl duration-300"
                  >
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
                      className="w-6 h-6"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line
                        x1="17.5"
                        y1="6.5"
                        x2="17.51"
                        y2="6.5"
                      ></line>
                    </svg>
                    Seguir en Instagram
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}