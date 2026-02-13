// src/components/layout/Navbar.tsx
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-default bg-[color:var(--color-bg-soft)]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-white">
            IA
          </div>
          <span className="text-sm font-semibold tracking-tight text-primary">
            IA Solutions
          </span>
        </Link>

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

        <a
          href="#contacto"
          className="btn-primary hidden rounded-full px-4 py-2 text-sm font-medium md:inline-flex"
        >
          Pedir cita
        </a>
      </nav>
    </header>
  );
};
