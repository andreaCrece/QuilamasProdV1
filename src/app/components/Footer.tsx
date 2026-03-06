export default function Footer() {
  return (
    <>
      <footer className="relative z-20 py-12 sm:py-16 bg-[#fffbf2] text-[#1A1A1A] border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 space-y-12">
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 lg:gap-8">
            {/* Col 1: Brand */}
            <div className="space-y-6 max-w-sm flex flex-col items-center text-center md:items-start md:text-left mx-auto md:mx-0">
              <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
                <a href="/" className="shrink-0 text-center">
                  <img
                    src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771312737/logo_quilamas_bcjgus.png"
                    alt="Quilamas Psicología"
                    className="h-28 w-auto object-contain mx-auto"
                  />
                </a>
                <div className="space-y-1 pt-1">
                  <a href="/" className="block">
                    <span className="text-2xl font-serif font-bold text-[#1A1A1A] tracking-tight block mb-2">
                      Quilamas Psicología
                    </span>
                  </a>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    Nº Registro Sanitario: 37-C22-0660
                  </p>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    Nº de Colegiación: CL3792
                  </p>
                </div>
              </div>

              {/* Logos - Uno al lado del otro */}
              <div className="flex gap-4 items-center justify-center md:justify-start pt-2">
                <img
                  src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1772799079/logo-ue-nextgen-negro_suvetn.png"
                  alt="Financiado por la Unión Europea - NextGenerationEU"
                  className="h-10 w-auto object-contain"
                />
                <img
                  src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1772799079/logo-plan-recuperacion-negro_xe2grn.png"
                  alt="Plan de Recuperación, Transformación y Resiliencia"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>

            {/* Container for Explorar & Legales - 2 columns on mobile and tablet */}
            <div className="grid grid-cols-2 md:contents gap-8 md:gap-4 lg:gap-8 justify-items-center md:justify-items-start">
              {/* Col 2: Enlaces */}
              <div className="space-y-4 text-left">
                <h4 className="text-xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                  Explorar
                </h4>
                <nav className="flex flex-col items-start space-y-3 text-[#666666]">
                  <a
                    href="/"
                    className="hover:text-[#bea9cf] transition-colors w-fit"
                  >
                    Inicio
                  </a>
                  <a
                    href="/sobre-mi"
                    className="hover:text-[#bea9cf] transition-colors w-fit"
                  >
                    Sobre mí
                  </a>
                  <a
                    href="/servicios"
                    className="hover:text-[#bea9cf] transition-colors w-fit"
                  >
                    Servicios
                  </a>
                  <a
                    href="/recursos"
                    className="hover:text-[#bea9cf] transition-colors w-fit"
                  >
                    Recursos
                  </a>
                  <a
                    href="/contacto"
                    className="hover:text-[#bea9cf] transition-colors w-fit"
                  >
                    Contacto
                  </a>
                </nav>
              </div>

              {/* Col 3: Legales */}
              <div className="space-y-4 text-left">
                <h4 className="text-xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                  Páginas legales
                </h4>
                <nav className="flex flex-col items-start space-y-3 text-[#666666]">
                  <a
                    href="/aviso-legal"
                    className="hover:text-[#bea9cf] transition-colors w-fit"
                  >
                    Aviso Legal
                  </a>
                  <a
                    href="/politica-privacidad"
                    className="hover:text-[#bea9cf] transition-colors w-fit"
                  >
                    Política de Privacidad
                  </a>
                  <a
                    href="/politica-cookies"
                    className="hover:text-[#bea9cf] transition-colors w-fit"
                  >
                    Política de Cookies
                  </a>
                  <a
                    href="/declaracion-accesibilidad"
                    className="hover:text-[#bea9cf] transition-colors w-fit"
                  >
                    Declaración de Accesibilidad
                  </a>
                </nav>
              </div>
            </div>

            {/* Col 4: Conectar */}
            <div className="space-y-4 sm:space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                Contactar
              </h4>
              <div className="flex gap-4 justify-center md:justify-start">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "info@quilamaspsicologia.com",
                    );
                    const tooltip =
                      document.getElementById("copied-tooltip");
                    if (tooltip) {
                      tooltip.classList.remove("hidden");
                      setTimeout(() => {
                        tooltip.classList.add("hidden");
                      }, 2000);
                    }
                  }}
                  className="relative w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1A1A1A] hover:border-[#bea9cf] hover:text-[#bea9cf] transition-all group"
                  aria-label="Copiar email"
                >
                  <svg
                    className="w-5 h-5"
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
                    <rect
                      width="20"
                      height="16"
                      x="2"
                      y="4"
                      rx="2"
                    ></rect>
                    <path d="m22 6-10 7L2 6"></path>
                  </svg>
                  <span
                    id="copied-tooltip"
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap hidden"
                  >
                    ¡Copiado!
                  </span>
                </button>
                <a
                  href="https://www.instagram.com/malu_gcolmenero/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1A1A1A] hover:border-[#bea9cf] hover:text-[#bea9cf] transition-all group"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5"
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
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line
                      x1="17.5"
                      x2="17.51"
                      y1="6.5"
                      y2="6.5"
                    ></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#666666] gap-4">
            <div>
              © {new Date().getFullYear()} Quilamas Psicología.
              Todos los derechos reservados.
            </div>
            <div>
              Página desarrollada por{" "}
              <a
                href="https://crecedigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DEBC5A] hover:underline font-medium"
              >
                Crece Digital
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        id="scrollToTop"
        className="fixed bottom-8 right-8 bg-white text-[#666666] border border-gray-200 shadow-lg rounded-full p-3 transition-all duration-300 hover:bg-white hover:text-[#666666] hover:border-gray-300 z-50 translate-y-16 opacity-0 pointer-events-none"
        aria-label="Volver arriba"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
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
          <path d="m18 15-6-6-6 6"></path>
        </svg>
      </button>

      <script
        dangerouslySetInnerHTML={{
          __html: `
        document.addEventListener('DOMContentLoaded', function() {
          const scrollBtn = document.getElementById('scrollToTop');
          
          window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
              scrollBtn.classList.remove('opacity-0', 'translate-y-16', 'pointer-events-none');
              scrollBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
            } else {
              scrollBtn.classList.add('opacity-0', 'translate-y-16', 'pointer-events-none');
              scrollBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            }
          });
        });
      `,
        }}
      />
    </>
  );
}