import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { NeuralBackground } from "./NeuralBackground";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen" id="inicio">
      {/* Fondo IA con conexiones neuronales */}
      <NeuralBackground />

      {/* Contenido de la web encima del fondo */}
      <div className="app-shell flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};
