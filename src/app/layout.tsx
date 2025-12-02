import type { Metadata } from "next";
import { siteConfig } from "@/core/config/site";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Soluciones de Inteligencia Artificial para empresas`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* NO ponemos bg-* aquí para no tapar el fondo neuronal */}
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
