import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Servicios from "./pages/Servicios";
import Recursos from "./pages/Recursos";
import Contacto from "./pages/Contacto";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import PoliticaCookies from "./pages/PoliticaCookies";
import DeclaracionAccesibilidad from "./pages/DeclaracionAccesibilidad";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/declaracion-accesibilidad",
    Component: DeclaracionAccesibilidad,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/aviso-legal",
    Component: AvisoLegal,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/politica-privacidad",
    Component: PoliticaPrivacidad,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/politica-cookies",
    Component: PoliticaCookies,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/inicio",
    Component: Home,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/sobre-mi",
    Component: AboutMe,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/servicios",
    Component: Servicios,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/recursos",
    Component: Recursos,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/contacto",
    Component: Contacto,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    Component: Home,
    errorElement: <ErrorBoundary />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}