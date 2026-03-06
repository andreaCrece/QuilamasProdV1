import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SobreMi() {
  return (
    <>
      <Header isHomePage={false} />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold">Sobre Mí</h1>
          <p className="mt-4">Contenido de la página Sobre Mí</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
