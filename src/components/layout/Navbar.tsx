import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
            IA
          </div>
          <span className="text-sm font-semibold tracking-tight">
            IA Solutions
          </span>
        </Link>

        <div className="hidden gap-6 text-sm text-slate-300 md:flex">
          <a href="#servicios" className="hover:text-white">
            Servicios
          </a>
          <a href="#como-funciona" className="hover:text-white">
            Cómo trabajamos
          </a>
          <a href="#testimonios" className="hover:text-white">
            Testimonios
          </a>
          <a href="#contacto" className="hover:text-white">
            Contacto
          </a>
        </div>

        <a
          href="#contacto"
          className="hidden rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-600 md:inline-block"
        >
          Pedir cita
        </a>
      </nav>
    </header>
  );
};
