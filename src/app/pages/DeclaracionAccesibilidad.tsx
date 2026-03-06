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

export default function DeclaracionAccesibilidad() {
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
                                Declaración de accesibilidad
                            </h1>
                            <p className="text-[#666666] text-lg">
                                Última actualización: 21 de noviembre de 2024
                            </p>
                        </div>

                        <div className="prose prose-lg max-w-none text-[#444444] space-y-12 font-sans leading-relaxed text-left">
                            <section className="space-y-4">
                                <p>
                                    Quilamas Psicología se ha comprometido a hacer accesibles sus sitios web de conformidad con la directiva Europea se basa en la norma EN 301 549 “Requisitos de accesibilidad de productos y servicios TIC” y esta, a su vez, es una adaptación de las Pautas de Accesibilidad para el Contenido Web (WCAG 2.1) del W3C.
                                </p>
                                <p>
                                    La presente declaración de accesibilidad se aplica a los siguientes sitios web: <a href="https://quilamaspsicologia.com" className="text-[#8B7028] hover:underline">https://quilamaspsicologia.com</a>
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">SITUACIÓN DE CUMPLIMIENTO</h2>
                                <p>
                                    Este sitio web es parcialmente conforme con [RD 1112/2018 o UNE-EN 301 549] debido a las excepciones que se indican a continuación.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">CONTENIDO NO ACCESIBLE</h2>
                                <p>El contenido que se recoge a continuación no es accesible por lo siguiente:</p>
                                <ul className="list-disc pl-6 space-y-4">
                                    <li>
                                        <strong>Falta de conformidad con el RD 1112/2018 de 7 de Septiembre.</strong> En algunas de las páginas podrían existir los siguientes criterios no cumplidos relacionados con la norma EN 301 549 “Requisitos de accesibilidad de productos y servicios TIC” y esta, a su vez, es una adaptación de las Pautas de Accesibilidad para el Contenido Web (WCAG 2.1):
                                        <ul className="list-circle pl-6 mt-2">
                                            <li>No aplica</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>Carga desproporcionada.</strong>
                                        <ul className="list-circle pl-6 mt-2">
                                            <li>No aplica</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>El contenido no entra dentro del ámbito de la legislación aplicable:</strong>
                                        <ul className="list-circle pl-6 mt-2 space-y-2 text-sm italic">
                                            <li>Formatos de archivo de ofimática publicados antes de la entrada en vigor de este real decreto, 20 de septiembre de 2018, siempre y cuando no sean necesarios para tareas administrativas activas, como por ejemplo un manual de ayuda o formulario para iniciar un procedimiento.</li>
                                            <li>Contenido multimedia de base temporal pregrabado publicado antes de la entrada en vigor de este real decreto.</li>
                                            <li>Servicios de mapas y cartografía en línea, siempre y cuando la información esencial se proporcione de manera accesible digitalmente en el caso de mapas destinados a fines de navegación.</li>
                                            <li>Contenidos de terceros que no estén bajo el control de Quilamas Psicología.</li>
                                        </ul>
                                    </li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">PREPARACIÓN DE LA PRESENTE DECLARACIÓN DE ACCESIBILIDAD</h2>
                                <p>La presente declaración fue preparada el 21 de noviembre de 2024.</p>
                                <p>El método empleado para preparar la declaración ha sido una autoevaluación llevada a cabo por la propia empresa proveedora de servicios web.</p>
                                <p>Última revisión de la declaración: 21 de noviembre de 2024 OBSERVACIONES Y DATOS DE CONTACTO</p>
                                <p>Puede realizar comunicaciones sobre requisitos de accesibilidad (artículo 10.2.a) del Real Decreto 1112/2018, de 7 de septiembre) como, por ejemplo:</p>
                                <ul className="list-disc pl-6 space-y-2 text-sm">
                                    <li>Informar sobre cualquier posible incumplimiento por parte de este sitio web.</li>
                                    <li>Transmitir otras dificultades de acceso al contenido.</li>
                                    <li>Formular cualquier otra consulta o sugerencia de mejora relativa a la accesibilidad del sitio web.</li>
                                </ul>
                                <p>A través de las siguientes vías:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Correo electrónico: <a href="mailto:marluisagar@hotmail.com" className="text-[#8B7028] hover:underline">marluisagar@hotmail.com</a></li>
                                </ul>
                                <p>Las comunicaciones serán recibidas y tratadas por María Luisa Gara Colmenero.</p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">PROCEDIMIENTO DE APLICACIÓN</h2>
                                <p>El procedimiento de reclamación recogido en el artículo 13 del RD 1112/2018 puede iniciarse a través del email <a href="mailto:marluisagar@hotmail.com" className="text-[#8B7028] hover:underline">marluisagar@hotmail.com</a></p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">COMPROMISO DE LA EMPRESA</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Se establece como objetivo alcanzar el cumplimiento de todos los requisitos de nivel A y AA de la WCAG 2.1 junto a ciertos requisitos de nivel AAA considerados relevantes para la mejora de la experiencia de uso de la web por parte del usuario.</li>
                                </ul>
                            </section>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </main>

            <Footer />
        </div>
    );
}
