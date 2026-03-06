import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Componente auxiliar para animaciones de entrada con duración mayor
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

// Componente para animación desde lateral  
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

  const initialX = direction === "left" ? -100 : 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: initialX }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: initialX }}
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

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<
    number | null
  >(null);

  const approaches = [
    {
      id: "sistemica",
      title: "Terapia familiar sistémica",
      content:
        "Este enfoque terapéutico sitúa a las personas formando parte de un sistema relacional; se aplica para comprender y tratar problemas emocionales y crisis personales por medio del trabajo con la familia y con el individuo. En este proceso se pasa de lo intrapsíquico a lo relacional, del análisis del pasado al estudio de lo que gobierna la relación aquí y ahora. El objetivo final es mejorar la capacidad familiar de afrontar las dificultades que se presentan y lograr un mejor entendimiento y funcionamiento como equipo.",
    },
    {
      id: "soluciones",
      title: "Terapia centrada en soluciones",
      content:
        "Lo característico de este enfoque es que no pone el énfasis en el problema, sino que subraya lo que funciona en cada caso a fin de señalar y ampliar las secuencias de solución. El terapeuta trabaja en base a objetivos acordados con el paciente que deben ser claros, observables y estar conductualmente bien definidos. Nos centraremos en aquellos momentos en los que no se presenta la dificultad o cuando la persona o familia logra controlar la situación, identificando pautas de solución y poniendo énfasis en lo que funcionó.",
    },
    {
      id: "tcc",
      title: "Cognitivo-conductual",
      content:
        "Es uno de los modelos más recomendados por su amplio estudio experimental y científico; se centra en los pensamientos, emociones y comportamientos, enseñando a los pacientes cómo cada uno de ellos tiene un efecto sobre el otro. Para ello, combina técnicas de reestructuración cognitiva, terapia racional-emotiva, toma de decisiones, entrenamiento en relajación y autocontrol emocional, entre otros.",
    },
    {
      id: "emdr",
      title: "Terapia EMDR",
      content:
        "EMDR es una terapia que facilita la conexión entre los dos hemisferios cerebrales logrando el procesamiento de la información y la disminución de la carga emocional. Este método de psicoterapia efectivo ha demostrado ayudar a las personas a recuperarse de un trauma y otras experiencias vitales angustiosas asociadas a problemas de salud mental como el estrés postraumático (TEPT), ansiedad, estrés o depresión. El terapeuta trabajará con el paciente en comprender las raíces de las experiencias traumáticas para elaborar un plan de trabajo global y eliminar su influencia en el presente.\n\nAprenderemos a focalizarnos en la propia experiencia somática, en la relación entre la mente y el cuerpo, para reestablecer el equilibrio psico-fisiológico, logrando que se sientan más conectadas con su cuerpo y emociones, liberar tensiones acumuladas y síntomas físicos asociados al trauma. El objetivo es ganar resiliencia en su vida diaria para afrontar emociones difíciles.",
    },
    {
      id: "neurofeedback",
      title: "Neurofeedback",
      content:
        "La Terapia Neurofeedback se fundamenta en las técnicas de biofeedback y está enfocado en aprender a regular el funcionamiento cortical del cerebro, optimizando su rendimiento y focalizando la atención de forma más eficaz. El objetivo es ayudar a las personas a mejorar el funcionamiento cognitivo, conductual y emocional, entrenando a los pacientes a aumentar ciertas ondas cerebrales mientras se inhiben otras, para fomentar una regulación cerebral óptima. Con la repetición, el cerebro afianzará lo aprendido y logrará mantenerse en ese estado de equilibrio después del tratamiento.",
    },
    {
      id: "biofeedback",
      title: "Terapia biofeedback",
      content:
        "Son procedimientos que permiten que el individuo, mediante instrumentos electrónicos que generan señales auditivas o visuales, obtenga consciencia de aquellos cambios fisiológicos y biológicos que normalmente no son perceptibles. Con estas técnicas, el paciente puede modificar sus propios estados orgánicos e inducir un funcionamiento más normalizado y funcional. El objetivo final es conseguir en el sujeto un cierto control voluntario, sin el uso de instrumentos, de sus propios estados biológicos.",
    },
    {
      id: "hrv",
      title: "HRV",
      content:
        "Es un moderno método de Biofeedback que correlaciona el estado emocional y la ansiedad de la persona mediante la Variabilidad de su Frecuencia Cardiaca. La Coherencia Cardiaca puede ser muy útil a nivel terapéutico en el afrontamiento del estrés y en el estado de armonía de la persona. Su aplicación resulta ser un medio muy valorado como refuerzo de la psicoterapia, tanto en tiempo como en profundidad, para el desarrollo psicoemocional en general.",
    },
    {
      id: "mindfulness",
      title: "Mindfulness",
      content:
        "En un mundo lleno de distracciones constantes, esta práctica ofrece un refugio tranquilo donde puedes encontrar serenidad y reconectar contigo mismo/a. El Mindfulness te invita a descubrir la riqueza de cada momento, cultivando una relación más saludable contigo mismo/a y con el mundo que te rodea, experimentando el presente sin juicio ni prejuicio. El enfoque es proporcionar las herramientas necesarias para incorporar la atención plena en la vida cotidiana de manera práctica y realista.",
    },
  ];

  const pilares = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "Conexión auténtica",
      desc: "Establezco un vínculo de confianza y empatía, donde te sientas plenamente comprendido y apoyado en tu proceso.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Claridad y enfoque",
      desc: "Te ofrezco herramientas prácticas y una dirección clara para abordar tus problemas y alcanzar tus objetivos.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Crecimiento sostenible",
      desc: "Fomento tu autoconocimiento y resiliencia para que los cambios que logres perduren en el tiempo.",
    },
  ];

  const quotes = [
    "Domine todas las teorías, conozca todas las técnicas… pero al final sea un alma humana la que toque otro alma humana — Carl Gustav Jung",
    "Un pájaro posado en un árbol nunca tiene miedo a que la rama se rompa. Porque su confianza no está en la rama, sino en sus propias alas",
    "El organismo se reorganizará cuando se sienta a salvo — Stephen Porges",
    "El primer paso para el cambio es la conciencia. El segundo es la aceptación — N. Branden",
  ];

  const allQuotes = [
    ...quotes,
    ...quotes,
    ...quotes,
    ...quotes,
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .marquee-wrapper {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }

        .marquee-content {
          animation: marquee 120s linear infinite;
        }
        
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>

      <Header isHomePage={false} />

      <div className="bg-white pt-24">
        {/* Hero Section Simple */}
        <section className="py-0 bg-white relative min-h-[300px] sm:min-h-[380px] md:min-h-[450px]">
          {/* Background Image - FIXED */}
          <div className="fixed inset-0 z-0 h-screen">
            <img
              src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314317/ROM_6808_wfdx9w.webp"
              alt="Sobre mí"
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
                <TypewriterText text="Sobre mí" delay={0.5} />
              </h1>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="relative py-16 sm:py-20 lg:py-28 bg-[#738048]/95 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
            <div className="max-w-7xl mx-auto space-y-8 lg:space-y-12">
              {/* Primera fila: Foto izquierda + Texto derecha */}
              <FadeInWhenVisible delay={0.1}>
                <div className="bg-[#ebebe1] overflow-hidden grid grid-cols-1 lg:grid-cols-2 rounded-2xl">
                  {/* Foto principal */}
                  <div className="flex items-stretch order-2 lg:order-1">
                    <img
                      src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314312/Malu-36_shkvn5.webp"
                      alt="Psicóloga profesional"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Nombre y primer texto */}
                  <div className="flex flex-col justify-center order-1 lg:order-2 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="space-y-5 border-l-2 border-[#DEBC5A] pl-6">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] tracking-tight leading-[1.1]">
                          Luisa García Colmenero
                        </h2>
                        <p className="text-lg font-medium text-[#666666]">
                          Nº COL: CL3792
                        </p>
                      </div>
                      <p className="text-base sm:text-lg text-[#1A1A1A] leading-relaxed">
                        Soy psicóloga sanitaria, con más de 20
                        años de experiencia en el mundo de las
                        adicciones, salud mental y vulnerabilidad
                        social. Me define mi deseo constante de
                        aprender y formarme, personal y
                        profesionalmente, para poder ayudar desde
                        mi consulta de psicología, creando una
                        relación terapéutica para poder ser,
                        sentir y relacionarte en un espacio
                        seguro.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>

              {/* Segunda fila: Texto izquierda + Foto derecha */}
              <FadeInWhenVisible delay={0.2}>
                <div className="bg-[#ebebe1] overflow-hidden grid grid-cols-1 lg:grid-cols-2 rounded-2xl">
                  {/* Texto restante y botón */}
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <p className="text-base sm:text-lg text-[#1A1A1A] leading-relaxed">
                          Me gustaría ayudarte a reducir el
                          sufrimiento y dotarte de herramientas
                          prácticas para afrontar problemas como
                          la ansiedad, trauma, adicciones o
                          conflictos familiares. Mi propósito es
                          impulsarte a mejorar tu salud y
                          bienestar psicológico.
                        </p>
                        <p className="text-base sm:text-lg text-[#1A1A1A] leading-relaxed">
                          Si estás buscando una terapia basada en
                          la evidencia que combine la rigurosidad
                          técnica con la calidez humana, estás en
                          el lugar correcto.
                        </p>
                      </div>

                      <div className="pt-4">
                        <a
                          href="/contacto"
                          className="group inline-flex items-center gap-2 border-2 border-[#1A1A1A] text-[#1A1A1A] bg-transparent hover:bg-[#1A1A1A] hover:text-white transition-all px-8 py-4 rounded-lg text-base font-medium"
                        >
                          Solicitar cita
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Foto de luz */}
                  <div className="flex items-stretch">
                    <img
                      src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314317/Tarabilla_vn15wq.webp"
                      alt="Luz decorativa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* Pilares */}
        <section className="py-20 sm:py-24 lg:py-32 bg-[#f8f6f3]/95 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
            <FadeInWhenVisible delay={0.1}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 sm:mb-20 lg:mb-24 space-y-6">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-primary-dark tracking-tight leading-[1.1]">
                    El modelo de trabajo
                  </h2>
                  <div className="w-20 h-0.5 bg-gold-quilamas mx-auto"></div>
                  <p className="text-lg sm:text-xl text-secondary-gray leading-relaxed max-w-3xl mx-auto">
                    Mi compromiso es ayudarte de manera efectiva
                    en tu crecimiento. Estos son los pilares de mi
                    modelo de trabajo:
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>

            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {/* Tarjeta Destacada - desliza desde la izquierda */}
                <div className="relative md:col-span-3">
                  <SlideInFromSide delay={0.2} direction="left">
                    <div className="relative bg-white p-8 sm:p-10 lg:p-12 xl:p-14 rounded-lg shadow-md border-l-4 border-gold-quilamas">
                      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-lg bg-gold-quilamas flex items-center justify-center mb-5">
                            <svg
                              className="w-8 h-8 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-3xl sm:text-4xl font-serif text-primary-dark mb-3">
                            Centrado en la persona
                          </h3>
                        </div>

                        <div className="flex-1 space-y-5">
                          <p className="text-xl text-secondary-gray mb-6">
                            El énfasis de la terapia está en:
                          </p>
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-secondary-gray text-lg leading-relaxed border-l-2 border-gold-quilamas/30 pl-4">
                              <span>
                                Los propios recursos y fortalezas
                                de las personas y la familia
                              </span>
                            </li>
                            <li className="flex items-start gap-3 text-secondary-gray text-lg leading-relaxed border-l-2 border-gold-quilamas/30 pl-4">
                              <span>
                                Las dinámicas de los procesos de
                                comunicación y de relación con uno
                                mismo
                              </span>
                            </li>
                            <li className="flex items-start gap-3 text-secondary-gray text-lg leading-relaxed border-l-2 border-gold-quilamas/30 pl-4">
                              <span>
                                La interacción con el contexto
                                interpersonal
                              </span>
                            </li>
                            <li className="flex items-start gap-3 text-secondary-gray text-lg leading-relaxed border-l-2 border-gold-quilamas/30 pl-4">
                              <span>
                                El enfoque en el futuro, ayudando
                                a mirar hacia adelante
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </SlideInFromSide>
                </div>

                {/* Tarjetas pequeñas - alternan desde izquierda y derecha */}
                {pilares.map((p, i) => (
                  <SlideInFromSide
                    key={i}
                    delay={0.3 + (i * 0.15)}
                    direction="left"
                  >
                    <div className="relative bg-white p-6 lg:p-8 rounded-lg shadow-sm border-t-2 border-gold-quilamas/20 h-full flex flex-col hover:shadow-md transition-shadow">
                      <div className="mb-6">
                        <div className="w-14 h-14 rounded-lg bg-gold-quilamas flex items-center justify-center mb-5">
                          <div className="[&>svg]:text-white [&>svg]:stroke-[2.5]">
                            {p.icon}
                          </div>
                        </div>
                        <h3 className="text-2xl font-serif text-primary-dark mb-4">
                          {p.title}
                        </h3>
                      </div>
                      <p className="text-base text-secondary-gray leading-relaxed flex-grow">
                        {p.desc}
                      </p>
                    </div>
                  </SlideInFromSide>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Marquee de Frases */}
        <section className="py-16 sm:py-20 overflow-hidden relative">
          {/* Imagen de fondo */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771314310/prueba-5_ekpwy0.webp"
              alt="Fondo decorativo"
              className="w-full h-full object-cover"
            />
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Contenido del marquee */}
          <div className="relative z-10 marquee-wrapper">
            <div className="flex w-max marquee-content">
              {allQuotes.map((q, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-16 flex items-center justify-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-quilamas"></div>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-serif text-white italic whitespace-nowrap drop-shadow-lg">
                      "{q}"
                    </p>
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-quilamas"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metodología Integrativa */}
        <section className="py-20 sm:py-24 lg:py-32 xl:py-40 bg-[#738048]/95 relative overflow-hidden">
          <FadeInWhenVisible delay={0.1}>
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 lg:mb-24 space-y-6">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                    Metodología integrativa
                  </h2>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 h-1 bg-gold-quilamas rounded-full"></div>
                    <div className="w-2 h-2 bg-gold-quilamas rounded-full"></div>
                  </div>
                  <p className="text-lg sm:text-xl text-white/95 leading-relaxed max-w-3xl mx-auto">
                    Mi enfoque terapéutico se fundamenta en una
                    metodología humana e integradora combinando
                    diferentes{" "}
                    <strong className="font-semibold text-white">
                      modelos e instrumentos
                    </strong>{" "}
                    terapéuticos validados científicamente para
                    ofrecerte el mejor tratamiento personalizado.
                  </p>
                </div>

                {/* Desktop: Tabs */}
                <div className="hidden lg:block max-w-6xl mx-auto rounded-3xl bg-white shadow-2xl overflow-hidden border border-gray-100">
                  <div className="flex flex-row">
                    <div className="flex flex-col bg-white border-r border-gray-100 min-w-[300px]">
                      {approaches.map((a, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTab(i)}
                          className={`group px-8 py-5 text-left w-full font-medium transition-all duration-300 border-l-4 relative ${i === activeTab
                            ? "text-primary-dark bg-white border-l-gold-quilamas"
                            : "text-secondary-gray hover:text-primary-dark hover:bg-white/50 border-l-transparent"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeTab
                                ? "bg-gold-quilamas scale-125"
                                : "bg-gray-300"
                                }`}
                            ></div>
                            <span className="text-base lg:text-lg">
                              {a.title}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex-1 bg-white p-10 sm:p-12 lg:p-16 xl:p-20 min-h-[650px]">
                      {approaches.map((a, i) => (
                        <div
                          key={i}
                          className={`${i === activeTab ? "block" : "hidden"
                            } space-y-8 animate-fadeIn`}
                        >
                          <div className="space-y-5">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-12 h-1 bg-gold-quilamas rounded-full"></div>
                              <div className="w-2 h-2 bg-gold-quilamas rounded-full"></div>
                            </div>
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-dark leading-tight">
                              {a.title}
                            </h3>
                          </div>
                          <div className="prose prose-lg max-w-none">
                            <p className="text-lg lg:text-xl text-secondary-gray leading-relaxed whitespace-pre-line">
                              {a.content}
                            </p>
                          </div>
                          <div className="pt-6 flex items-center gap-3">
                            <div className="w-2 h-2 bg-gold-quilamas rounded-full"></div>
                            <div className="w-8 h-1 bg-gold-quilamas/30 rounded-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile: Accordion */}
                <div className="lg:hidden max-w-6xl mx-auto space-y-4">
                  {approaches.map((a, i) => (
                    <div
                      key={i}
                      className="rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-100"
                    >
                      <button
                        onClick={() => toggleAccordion(i)}
                        className={`w-full px-6 py-5 text-left font-medium transition-all duration-300 border-l-4 ${openAccordion === i
                          ? "text-primary-dark bg-white border-l-gold-quilamas"
                          : "text-secondary-gray bg-white border-l-transparent"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${openAccordion === i
                              ? "bg-gold-quilamas scale-125"
                              : "bg-gray-300"
                              }`}
                          ></div>
                          <span className="text-base font-medium">
                            {a.title}
                          </span>
                        </div>
                      </button>
                      {openAccordion === i && (
                        <div className="px-6 pb-6 pt-4 bg-white animate-fadeIn">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-1 bg-gold-quilamas rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-gold-quilamas rounded-full"></div>
                          </div>
                          <p className="text-base text-secondary-gray leading-relaxed whitespace-pre-line">
                            {a.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </section>

        {/* CTA Final */}
        <section className="relative py-20 sm:py-24 lg:py-32 xl:py-40 bg-[#333333]/95 text-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight">
                  ¿Empezamos a
                  <br />
                  trabajar juntos?
                </h2>
                <div className="w-20 h-0.5 bg-gold-quilamas mx-auto"></div>
              </div>

              <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Si resuenas con mi enfoque y estás listo para
                dar el primer paso hacia un cambio
                significativo, me encantaría acompañarte en este
                camino.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 lg:gap-6 justify-center pt-8">
                <a
                  href="/contacto"
                  className="group inline-flex items-center justify-center gap-2 bg-white text-[#333333] hover:bg-gold-quilamas hover:text-white px-10 lg:px-12 py-5 lg:py-6 text-base lg:text-lg font-medium tracking-wide transition-all rounded-lg shadow-lg duration-300"
                >
                  Solicitar primera sesión
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
                <a
                  href="/servicios"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-[#333333] hover:border-white px-10 lg:px-12 py-5 lg:py-6 text-base lg:text-lg font-medium tracking-wide transition-all rounded-lg duration-300"
                >
                  Consultar servicios
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}