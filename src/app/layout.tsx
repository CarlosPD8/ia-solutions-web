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
      <body className="min-h-screen bg-slate-950 text-slate-50">
        {children}
      </body>
    </html>
  );
}
