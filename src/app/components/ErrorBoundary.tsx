import { useRouteError, isRouteErrorResponse } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] px-4">
        <div className="text-center">
          <h1 className="text-6xl font-serif text-[#1A1A1A] mb-4">
            {error.status}
          </h1>
          <p className="text-xl text-[#666666] mb-8">
            {error.statusText || "Página no encontrada"}
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-[#DEBC5A] text-[#1A1A1A] font-medium hover:bg-[#DEBC5A]/90 transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] px-4">
      <div className="text-center">
        <h1 className="text-6xl font-serif text-[#1A1A1A] mb-4">
          Oops!
        </h1>
        <p className="text-xl text-[#666666] mb-8">
          Ha ocurrido un error inesperado
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-[#DEBC5A] text-[#1A1A1A] font-medium hover:bg-[#DEBC5A]/90 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
