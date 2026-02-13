// src/components/layout/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      // si pasamos a desktop, cerramos el menú
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-default bg-[color:var(--color-bg-soft)]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-white">
            IA
          </div>
          <span className="text-sm font-semibold tracking-tight text-primary">
            Avancia
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden gap-6 text-sm text-muted md:flex">
          <a href="#servicios" className="hover:text-primary">
            Servicios
          </a>
          <a href="#como-funciona" className="hover:text-primary">
            Cómo trabajamos
          </a>
          <a href="#testimonios" className="hover:text-primary">
            Testimonios
          </a>
          <a href="#contacto" className="hover:text-primary">
            Contacto
          </a>
        </div>

        {/* Desktop CTA */}
        <a
          href="https://wa.me/34670294712?text=Hola%20quiero%20información%20sobre%20una%20solución%20de%20IA"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary hidden rounded-full px-4 py-2 text-sm font-medium md:inline-flex"
        >
          Pedir cita
        </a>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full border border-default bg-[color:var(--color-primary-900)]/60 p-2 text-primary shadow-sm transition-colors hover:border-[color:var(--color-secondary-400)] md:hidden"
        >
          <span className="sr-only">Menú</span>
          <div className="flex h-4 w-5 flex-col justify-between">
            <span
              className={`h-[2px] w-full rounded bg-[color:var(--color-text)] transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full rounded bg-[color:var(--color-text)] transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-[2px] w-full rounded bg-[color:var(--color-text)] transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden ${
          open ? "block" : "hidden"
        } border-t border-default bg-[color:var(--color-bg-soft)]/95 backdrop-blur`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm">
          <a
            href="#servicios"
            className="rounded-xl px-3 py-2 text-primary hover:bg-[color:var(--color-primary-700)]/40"
            onClick={() => setOpen(false)}
          >
            Servicios
          </a>
          <a
            href="#como-funciona"
            className="rounded-xl px-3 py-2 text-primary hover:bg-[color:var(--color-primary-700)]/40"
            onClick={() => setOpen(false)}
          >
            Cómo trabajamos
          </a>
          <a
            href="#testimonios"
            className="rounded-xl px-3 py-2 text-primary hover:bg-[color:var(--color-primary-700)]/40"
            onClick={() => setOpen(false)}
          >
            Testimonios
          </a>
          <a
            href="#contacto"
            className="rounded-xl px-3 py-2 text-primary hover:bg-[color:var(--color-primary-700)]/40"
            onClick={() => setOpen(false)}
          >
            Contacto
          </a>

          <a
            href="#contacto"
            className="btn-primary mt-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Pedir cita
          </a>
        </div>
      </div>
    </header>
  );
};
