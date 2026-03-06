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

export default function AvisoLegal() {
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
                                Aviso Legal
                            </h1>
                            <p className="text-[#666666] text-lg">
                                Última actualización: 1 de diciembre de 2025
                            </p>
                        </div>

                        <div className="prose prose-lg max-w-none text-[#444444] space-y-12 font-sans leading-relaxed text-left">
                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">1. Datos identificativos</h2>
                                <p>
                                    En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico, se informa que:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Titular:</strong> María Luisa Gara Colmenero</li>
                                    <li><strong>DNI:</strong> 12775238A</li>
                                    <li><strong>Actividad:</strong> Psicología Sanitaria</li>
                                    <li><strong>Correo electrónico:</strong> marluisagar@hotmail.com</li>
                                    <li><strong>Teléfono:</strong> 678524163</li>
                                    <li><strong>Domicilio Fiscal:</strong> Calle Alhondiga nº 11 37671 San Esteban de la Sierra (Salamanca)</li>
                                    <li><strong>Sitio web:</strong> www.quilamaspsicologia.com</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">2. Objeto</h2>
                                <p>
                                    El presente aviso legal regula el uso del sitio web www.quilamaspsicologia.com (en adelante, el "Sitio Web"). La navegación por el Sitio Web atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">3. Condiciones de acceso y uso</h2>
                                <p>
                                    El acceso y navegación en el Sitio Web implica la aceptación expresa y sin reservas de los presentes términos y condiciones. El usuario se compromete a:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Hacer un uso adecuado y lícito del Sitio Web</li>
                                    <li>No utilizar el Sitio Web para fines ilegales o no autorizados</li>
                                    <li>No causar daños en el Sitio Web o en los sistemas informáticos de terceros</li>
                                    <li>No introducir o difundir virus informáticos o cualesquiera otros sistemas que sean susceptibles de causar daños</li>
                                    <li>No realizar actividades publicitarias o de explotación comercial no autorizadas</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">4. Propiedad intelectual e industrial</h2>
                                <p>
                                    Todos los contenidos del Sitio Web, incluyendo sin carácter limitativo, textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual de María Luisa Gara Colmenero, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la normativa vigente en materia de propiedad intelectual sobre los mismos.
                                </p>
                                <p>
                                    Queda estrictamente prohibida su reproducción, distribución o uso comercial sin autorización expresa de la titular.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">5. Exclusión de responsabilidad</h2>
                                <p>
                                    La titular no se hace responsable de:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Los posibles errores de seguridad que se puedan producir ni de los posibles daños que puedan causarse al sistema informático del usuario</li>
                                    <li>Las interrupciones o el mal funcionamiento del Sitio Web</li>
                                    <li>Los contenidos de aquellas páginas a las que los usuarios puedan acceder desde enlaces incluidos en el Sitio Web</li>
                                    <li>La presencia de virus u otros elementos en las páginas web que puedan producir alteraciones en los sistemas informáticos</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">6. Protección de datos</h2>
                                <p>
                                    Para toda la información relativa al tratamiento de datos personales, le rogamos consulte nuestra Política de Privacidad, donde encontrará información detallada sobre cómo tratamos sus datos personales, sus derechos y cómo ejercerlos.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">7. Legislación aplicable y jurisdicción</h2>
                                <p>
                                    Las presentes condiciones generales se rigen por la legislación española. Para la resolución de cualquier conflicto que pueda surgir con ocasión de la visita al Sitio Web o del uso de los servicios que en él se puedan ofertar, la titular y el usuario acuerdan someterse a los Juzgados y Tribunales del domicilio del usuario.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">8. Modificaciones</h2>
                                <p>
                                    La titular se reserva el derecho a modificar el presente Aviso Legal en cualquier momento. En todo caso, se recomienda consultar periódicamente los presentes términos de uso del Sitio Web, ya que pueden ser modificados.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">9. Contacto</h2>
                                <p>
                                    Para cualquier consulta relacionada con este Aviso Legal, puede ponerse en contacto a través de: marluisagar@hotmail.com
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
