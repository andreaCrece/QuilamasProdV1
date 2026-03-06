import { useState, useEffect } from "react";

interface HeaderProps {
  isHomePage?: boolean;
}

export default function Header({ isHomePage = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled
            ? "pt-3"
            : ""
          }`}
      >
        <div className={`mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[98%] transition-all duration-300 ${isScrolled
            ? "bg-[#f5f9f7]/50 backdrop-blur-md shadow-lg rounded-full py-2"
            : "py-2 bg-transparent"
          } flex items-center justify-between`}>
          {/* LOGO */}
          <a href="/">
            <img
              src="https://res.cloudinary.com/ds3eoolhn/image/upload/v1771312737/logo_quilamas_bcjgus.png"
              alt="Quilamas"
              className="h-14 w-auto"
            />
          </a>

          {/* MENÚ ESCRITORIO - Alineado a la derecha */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-lg font-medium">
            <a
              href="/"
              className={`relative group transition-colors uppercase tracking-wide ${isScrolled ? "text-[#8B7028]" : "text-[#DEBC5A]"
                }`}
            >
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/sobre-mi"
              className={`relative group transition-colors uppercase tracking-wide ${isScrolled ? "text-[#8B7028]" : "text-[#DEBC5A]"
                }`}
            >
              Sobre mí
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/servicios"
              className={`relative group transition-colors uppercase tracking-wide ${isScrolled ? "text-[#8B7028]" : "text-[#DEBC5A]"
                }`}
            >
              Servicios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/recursos"
              className={`relative group transition-colors uppercase tracking-wide ${isScrolled ? "text-[#8B7028]" : "text-[#DEBC5A]"
                }`}
            >
              Recursos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* CONTACTAR ESCRITORIO - Integrado en el nav */}
            <a
              href="/contacto"
              className={`flex items-center justify-center px-6 h-10 rounded-lg border-2 transition-all font-semibold ${isScrolled
                  ? "border-[#8B7028] text-[#8B7028] hover:bg-[#8B7028] hover:text-white"
                  : "border-[#DEBC5A] text-[#DEBC5A] hover:bg-[#DEBC5A] hover:text-white"
                }`}
            >
              Contactar
            </a>
          </div>

          {/* HAMBURGUESA MÓVIL */}
          <button
            id="btn-open-menu"
            className={`md:hidden p-2 rounded border transition-colors ${isScrolled
                ? "border-[#8B7028] text-[#8B7028]"
                : isHomePage
                  ? "border-white text-white"
                  : "border-primary-dark text-primary-dark"
              }`}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* MENÚ MÓVIL COMPACTO */}
      <div
        id="mobile-menu"
        className="fixed top-4 right-4 w-64 bg-white rounded-xl shadow-2xl p-6 space-y-4 z-50 hidden border border-gray-100"
      >
        {/* Cerrar */}
        <button
          id="btn-close-menu"
          className="absolute top-3 right-3 text-xl text-primary-dark"
        >
          ×
        </button>

        <a
          href="/sobre-mi"
          className="block text-primary-dark tracking-wide mobile-link"
        >
          Sobre mí
        </a>
        <a
          href="/servicios"
          className="block text-primary-dark tracking-wide mobile-link"
        >
          Servicios
        </a>

        <a
          href="/contacto"
          className="block w-full text-center bg-primary-dark text-white py-3 rounded-lg font-medium mobile-link"
        >
          Contactar
        </a>
      </div>

      {/* OVERLAY OSCURO PARA CERRAR */}
      <div id="menu-overlay" className="fixed inset-0 bg-black/40 z-40 hidden"></div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
        document.addEventListener("DOMContentLoaded", () => {
          const openBtn = document.getElementById("btn-open-menu");
          const closeBtn = document.getElementById("btn-close-menu");
          const menu = document.getElementById("mobile-menu");
          const overlay = document.getElementById("menu-overlay");
          const links = document.querySelectorAll(".mobile-link");

          function openMenu() {
            menu.classList.remove("hidden");
            overlay.classList.remove("hidden");
            document.body.classList.add("overflow-hidden");
          }

          function closeMenu() {
            menu.classList.add("hidden");
            overlay.classList.add("hidden");
            document.body.classList.remove("overflow-hidden");
          }

          openBtn.addEventListener("click", openMenu);
          closeBtn.addEventListener("click", closeMenu);
          overlay.addEventListener("click", closeMenu);
          links.forEach(l => l.addEventListener("click", closeMenu));
        });
      `,
        }}
      />
    </>
  );
}