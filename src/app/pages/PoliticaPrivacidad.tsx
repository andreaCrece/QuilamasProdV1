import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FadeInWhenVisible({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

export default function PoliticaPrivacidad() {
    return (
        <div className="min-h-screen bg-[#FDFCF8]">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 sm:px-8 lg:px-16 max-w-4xl text-center">
                    <FadeInWhenVisible>
                        <div className="mb-16">
                            <span className="text-sm uppercase tracking-[0.3em] text-[#8B7028] font-medium mb-4 block">
                                LEGAL
                            </span>
                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-[#1A1A1A] mb-6 tracking-tight">
                                Política de Privacidad
                            </h1>
                            <p className="text-[#666666] text-lg">
                                Última actualización: 1 de diciembre de 2025
                            </p>
                        </div>

                        <div className="prose prose-lg max-w-none text-[#444444] space-y-12 font-sans leading-relaxed text-left">
                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">1. Información que recopilamos</h2>
                                <p>
                                    En Quilamas Psicología, recopilamos información que usted nos proporciona directamente cuando se pone en contacto con nosotros a través de nuestro formulario de contacto, incluyendo su nombre, dirección de correo electrónico y cualquier mensaje que nos envíe.
                                </p>
                                <p>
                                    También podemos recopilar información automáticamente sobre su visita a nuestro sitio web, como su dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia en el sitio.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">2. Uso de la información</h2>
                                <p>
                                    Utilizamos la información recopilada para:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Responder a sus consultas y solicitudes</li>
                                    <li>Enviarle información relevante sobre nuestros servicios de psicología</li>
                                    <li>Mejorar nuestro sitio web y servicios</li>
                                    <li>Cumplir con obligaciones legales</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">3. Compartir información</h2>
                                <p>
                                    No vendemos, alquilamos ni compartimos su información personal con terceros para fines de marketing. Podemos compartir su información con proveedores de servicios que nos ayudan a operar nuestro sitio web y negocio, siempre bajo estrictas obligaciones de confidencialidad.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">4. Seguridad</h2>
                                <p>
                                    Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra el acceso no autorizado, la alteración, divulgación o destrucción.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">5. Sus derechos</h2>
                                <p>
                                    Según el RGPD, usted tiene derecho a:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Acceder a sus datos personales</li>
                                    <li>Rectificar datos inexactos o incompletos</li>
                                    <li>Solicitar la supresión de sus datos</li>
                                    <li>Oponerse al tratamiento de sus datos</li>
                                    <li>Solicitar la limitación del tratamiento</li>
                                    <li>Portabilidad de los datos</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">6. Contacto</h2>
                                <p>
                                    Para ejercer sus derechos o si tiene preguntas sobre esta política de privacidad, puede contactarnos en: marluisagar@hotmail.com
                                </p>
                            </section>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </main>

            <Footer />
        </div>
    );
}
