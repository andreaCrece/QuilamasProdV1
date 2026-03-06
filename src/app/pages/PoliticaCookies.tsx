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

export default function PoliticaCookies() {
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
                                Política de Cookies
                            </h1>
                            <p className="text-[#666666] text-lg">
                                Última actualización: 1 de diciembre de 2025
                            </p>
                        </div>

                        <div className="prose prose-lg max-w-none text-[#444444] space-y-12 font-sans leading-relaxed text-left">
                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">¿Qué son las cookies?</h2>
                                <p>
                                    Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo cuando los visita. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">Cookies que utilizamos</h2>
                                <p>En nuestro sitio web utilizamos los siguientes tipos de cookies:</p>

                                <h3 className="text-xl font-bold text-[#1A1A1A] mt-6">Cookies estrictamente necesarias</h3>
                                <p>
                                    Estas cookies son esenciales para el funcionamiento del sitio web y no pueden desactivarse en nuestros sistemas. Generalmente se establecen solo en respuesta a acciones realizadas por usted, como establecer sus preferencias de privacidad o completar formularios.
                                </p>

                                <h3 className="text-xl font-bold text-[#1A1A1A] mt-6">Cookies de rendimiento</h3>
                                <p>
                                    Estas cookies nos permiten contar las visitas y fuentes de tráfico para poder medir y mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más y las menos populares, y a ver cómo los visitantes se mueven por el sitio.
                                </p>

                                <h3 className="text-xl font-bold text-[#1A1A1A] mt-6">Cookies funcionales</h3>
                                <p>
                                    Estas cookies permiten que el sitio web proporcione funcionalidad y personalización mejoradas. Pueden ser establecidas por nosotros o por proveedores externos cuyos servicios hemos agregado a nuestras páginas.
                                </p>

                                <h3 className="text-xl font-bold text-[#1A1A1A] mt-6">Cookies de análisis</h3>
                                <p>
                                    Utilizamos Google Analytics para analizar el uso de nuestro sitio web. Estas cookies recopilan información de forma anónima sobre cómo los visitantes utilizan nuestro sitio, incluyendo el número de visitantes, de dónde vienen y las páginas que visitan.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">Cookies de terceros</h2>
                                <p>Además de nuestras propias cookies, también podemos utilizar cookies de terceros para informar estadísticas de uso del sitio web. Estas cookies son:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Google Analytics: Para análisis de tráfico web</li>
                                    <li>Redes sociales: Para compartir contenido en redes sociales</li>
                                    <li>Proveedores de contenido: Para mostrar contenido embebido</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">Gestión de cookies</h2>
                                <p>
                                    Puede controlar y/o eliminar las cookies como desee. Puede eliminar todas las cookies que ya están en su ordenador y puede configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si hace esto, es posible que tenga que ajustar manualmente algunas preferencias cada vez que visite un sitio y algunos servicios y funcionalidades pueden no funcionar.
                                </p>
                                <p>Para obtener más información sobre cómo administrar las cookies en los navegadores más populares, visite:</p>
                                <ul className="list-disc pl-6 space-y-2 font-medium">
                                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#8B7028] hover:underline">Google Chrome</a></li>
                                    <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-[#8B7028] hover:underline">Mozilla Firefox</a></li>
                                    <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#8B7028] hover:underline">Safari</a></li>
                                    <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-[#8B7028] hover:underline">Microsoft Edge</a></li>
                                    <li><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" className="text-[#8B7028] hover:underline">Opera</a></li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">Actualizaciones de esta política</h2>
                                <p>
                                    Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en las cookies que utilizamos o por razones operativas, legales o reglamentarias. Le recomendamos que revise esta política periódicamente para estar informado sobre nuestro uso de cookies.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">Contacto</h2>
                                <p>
                                    Si tiene alguna pregunta sobre nuestra Política de Cookies, puede contactarnos en: marluisagar@hotmail.com
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
