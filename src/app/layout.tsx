import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { siteConfig } from "@/core/config/site";
import "../styles/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} min-h-screen font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
