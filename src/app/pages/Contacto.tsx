import { useState, FormEvent, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Componente auxiliar para animaciones de entrada
function FadeInWhenVisible({ children, delay = 0, direction = "up" }: { children: React.ReactNode; delay?: number; direction?: "up" | "down" | "left" | "right" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const yOffset = direction === "up" ? 50 : direction === "down" ? -50 : 0;
  const xOffset = direction === "left" ? 50 : direction === "right" ? -50 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: yOffset, x: xOffset }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// New component for scroll-triggered typewriter
function ScrollTypewriter({ text, delay = 0, speed = 50, className = "" }: { text: string; delay?: number; speed?: number; className?: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) {
      const timeout = setTimeout(() => {
        setStarted(true);
        let i = 0;
        const timer = setInterval(() => {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          if (i === text.length) clearInterval(timer);
        }, speed);
        return () => clearInterval(timer);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, text, delay, speed, started]);

  return (
    <span ref={ref} className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[2px] h-[1em] bg-gold-quilamas ml-1 align-middle"
        style={{ display: started && displayedText.length < text.length ? "inline-block" : "none" }}
      />
    </span>
  );
}

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Gracias por tu mensaje. Te contactaré pronto.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Header isHomePage={false} />

      <div className="bg-[#fdfbf4] pt-24">
        {/* Hero Section con imagen fija de fondo */}
        <section className="relative min-h-screen bg-[#fdfbf4] overflow-hidden">
          {/* Background Image - Pájaro fijo que llega hasta arriba */}
          <div className="fixed inset-0 pointer-events-none">
            <img
              src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771329072/MEROPS-3_-_Editada_ukmvcs.png"
              alt=""
              className="absolute right-0 top-0 h-full w-auto max-w-[50%] object-cover object-right opacity-40"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          {/* Main Content - Recuadro flotante blanco */}
          <div className="relative py-20 sm:py-24 lg:py-32">
            <div className="container mx-auto px-5">
              <FadeInWhenVisible delay={0.7} direction="up">
                {/* Recuadro flotante con márgenes de 20px */}
                <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 sm:p-12 lg:p-16 shadow-xl">

                  {/* Intro */}
                  <div className="text-center mb-24 space-y-6">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-primary-dark tracking-tight leading-[1.1]">
                      Hablemos
                    </h1>
                    <p className="text-xl sm:text-2xl text-secondary-gray max-w-3xl mx-auto leading-relaxed">
                      Dar el primer paso es lo más importante. Estoy aquí para acompañarte en tu proceso.
                    </p>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">

                    {/* Left: Form */}
                    <div>
                      <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-7">
                          <div className="space-y-6">
                            <div>
                              <label htmlFor="name" className="block text-sm font-semibold text-primary-dark mb-3">
                                Nombre *
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-12 px-4 bg-white border border-gray-200 focus:border-gold-quilamas focus:ring-2 focus:ring-gold-quilamas/20 text-base text-primary-dark rounded-lg transition-all placeholder:text-gray-400"
                                placeholder="Tu nombre completo"
                              />
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-sm font-semibold text-primary-dark mb-3">
                                Email *
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-12 px-4 bg-white border border-gray-200 focus:border-gold-quilamas focus:ring-2 focus:ring-gold-quilamas/20 text-base text-primary-dark rounded-lg transition-all placeholder:text-gray-400"
                                placeholder="tu@email.com"
                              />
                            </div>

                            <div>
                              <label htmlFor="phone" className="block text-sm font-semibold text-primary-dark mb-3">
                                Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full h-12 px-4 bg-white border border-gray-200 focus:border-gold-quilamas focus:ring-2 focus:ring-gold-quilamas/20 text-base text-primary-dark rounded-lg transition-all placeholder:text-gray-400"
                                placeholder="+34 600 000 000"
                              />
                            </div>

                            <div>
                              <label htmlFor="message" className="block text-sm font-semibold text-primary-dark mb-3">
                                Mensaje *
                              </label>
                              <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-gold-quilamas focus:ring-2 focus:ring-gold-quilamas/20 resize-none text-base text-primary-dark rounded-lg transition-all placeholder:text-gray-400"
                                placeholder="Cuéntame cómo puedo ayudarte..."
                              ></textarea>
                            </div>
                          </div>

                          <div className="pt-2">
                            <button
                              type="submit"
                              className="w-full bg-gold-quilamas text-white hover:bg-[#c9a847] px-8 py-4 text-base font-semibold tracking-wide transition-all shadow-md hover:shadow-lg rounded-lg"
                            >
                              Enviar mensaje
                            </button>
                          </div>

                          <div className="pt-2 flex items-start gap-3">
                            <svg className="w-5 h-5 text-gold-quilamas flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <p className="text-sm text-secondary-gray leading-relaxed">
                              Te responderé en menos de 24 horas. Toda la información compartida es <strong>confidencial</strong>.
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Right: Contact Info */}
                    <div className="space-y-6">

                      {/* Email Card */}
                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-gold-quilamas/30 transition-all">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 bg-gold-quilamas/10 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gold-quilamas" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-primary-dark">Email</h3>
                        </div>
                        <div className="space-y-3 pl-1">
                          <a
                            href="mailto:info@quilamaspsicologia.com"
                            className="block text-base text-secondary-gray hover:text-gold-quilamas transition-colors font-medium"
                          >
                            info@quilamaspsicologia.com
                          </a>
                          <a
                            href="mailto:marluisagar@hotmail.com"
                            className="block text-base text-secondary-gray hover:text-gold-quilamas transition-colors font-medium"
                          >
                            marluisagar@hotmail.com
                          </a>
                        </div>
                      </div>

                      {/* Ubicaciones Card */}
                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-gold-quilamas/30 transition-all">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 bg-gold-quilamas/10 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gold-quilamas" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-primary-dark">Consultas presenciales</h3>
                        </div>

                        <div className="space-y-5 pl-1">
                          {/* Linares */}
                          <div>
                            <p className="font-semibold text-primary-dark mb-1">Linares de Riofrío</p>
                            <p className="text-secondary-gray text-sm leading-relaxed">C/La Mata (Espacio Coworking)</p>
                            <p className="text-secondary-gray text-sm leading-relaxed">Linares de Riofrío, Salamanca</p>
                          </div>

                          <div className="border-t border-gray-100"></div>

                          {/* Salamanca */}
                          <div>
                            <p className="font-semibold text-primary-dark mb-1">Salamanca</p>
                            <p className="text-secondary-gray text-sm leading-relaxed">C/ San Justo N2, 1D</p>
                            <p className="text-secondary-gray text-sm leading-relaxed">37001 Salamanca</p>
                          </div>
                        </div>
                      </div>

                      {/* Online Card */}
                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-gold-quilamas/30 transition-all">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 bg-gold-quilamas/10 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gold-quilamas" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-primary-dark">Terapia online</h3>
                        </div>
                        <p className="text-secondary-gray leading-relaxed pl-1">
                          Sesiones virtuales con la misma calidad y cercanía que las presenciales. Desde cualquier lugar, en el momento que mejor se adapte a tu rutina.
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* Sección de cita - sin fondo */}
        <section className="py-16 sm:py-20 bg-[#fdfbf4]">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-16 h-1 bg-gold-quilamas mx-auto origin-left"
              ></motion.div>

              <div className="relative">
                <p className="text-2xl sm:text-3xl font-serif text-secondary-gray tracking-tight leading-relaxed italic">
                  <ScrollTypewriter
                    text='"El primer paso hacia el cambio es la conciencia. El segundo paso es la aceptación."'
                    delay={0}
                    speed={25}
                  />
                </p>
                <div className="mt-6">
                  <ScrollTypewriter
                    text="— Nathaniel Branden"
                    delay={2.5}
                    speed={25}
                    className="text-base sm:text-lg text-gray-400 tracking-wide"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 sm:py-24 lg:py-32 bg-[#333333]/95 border-t border-gray-700">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-[1.1]">
                  ¿Tienes dudas?
                </h2>
                <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  Visita la sección de preguntas frecuentes o agenda una llamada informativa sin compromiso.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <a
                  href="/servicios#faq"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#333333] px-8 py-4 text-lg font-medium tracking-wide transition-all rounded-lg"
                >
                  Ver preguntas frecuentes
                </a>
                <a
                  href="/recursos"
                  className="inline-flex items-center justify-center gap-2 bg-gold-quilamas border-2 border-gold-quilamas text-white hover:bg-[#c9a847] hover:border-[#c9a847] px-8 py-4 text-lg font-medium tracking-wide transition-all rounded-lg"
                >
                  Explorar recursos
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