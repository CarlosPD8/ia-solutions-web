// src/components/layout/MainLayout.tsx
import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { NeuralBackground } from "./NeuralBackground";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-[100dvh] bg-transparent" id="inicio">
      <NeuralBackground />

      {/* Contenido de la web encima del fondo */}
      <div className="app-shell relative z-10 flex min-h-[100dvh] flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
};
