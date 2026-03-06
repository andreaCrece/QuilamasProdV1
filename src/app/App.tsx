import { HashRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Servicios from './pages/Servicios';
import Recursos from './pages/Recursos';
import Contacto from './pages/Contacto';
import AvisoLegal from './pages/AvisoLegal';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import PoliticaCookies from './pages/PoliticaCookies';
import DeclaracionAccesibilidad from './pages/DeclaracionAccesibilidad';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/sobre-mi" element={<AboutMe />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        <Route path="/declaracion-accesibilidad" element={<DeclaracionAccesibilidad />} />
        {/* Ruta fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;