import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import {
  Inicio,
  Mapa,
  Actividades,
  Detalle,
  Calendario,
  Perfil,
  Favoritos,
  FAQ,
  Auth,
  Protected,
} from './pages/Pages';
import './styles/global.css';
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/mapa" element={<Mapa />} />
              <Route path="/actividades" element={<Actividades />} />
              <Route path="/actividad/:id" element={<Detalle />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route
                path="/perfil"
                element={
                  <Protected>
                    <Perfil />
                  </Protected>
                }
              />
              <Route
                path="/favoritos"
                element={
                  <Protected>
                    <Favoritos />
                  </Protected>
                }
              />
              <Route path="/login" element={<Auth />} />
              <Route path="/registro" element={<Auth register />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<Inicio />} />
            </Routes>
          </main>
          <Footer />
          <BottomNav />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
createRoot(document.getElementById('root')).render(<App />);
