// src/components/layout/Footer.tsx
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="relative border-t border-default bg-[color:var(--color-bg-soft)]/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-14">
        {/* TOP */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* BRAND */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-white">
                A
              </div>
              <span className="text-sm font-semibold text-primary">
                Avancia
              </span>
            </div>

            <p className="max-w-xs text-xs text-muted">
              Implementamos soluciones de Inteligencia Artificial que mejoran
              procesos reales en tu empresa: automatización, asistentes
              inteligentes y analítica avanzada.
            </p>
          </div>

          {/* PRODUCTO */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
              Servicios
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link href="#servicios" className="hover:text-primary">
                  Chatbots IA
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="hover:text-primary">
                  Automatización
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="hover:text-primary">
                  Analítica avanzada
                </Link>
              </li>
            </ul>
          </div>

          {/* EMPRESA */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
              Empresa
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link href="#como-funciona" className="hover:text-primary">
                  Cómo trabajamos
                </Link>
              </li>
              <li>
                <Link href="#testimonios" className="hover:text-primary">
                  Clientes
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="hover:text-primary">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACTO */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
              Contacto
            </h4>

            <ul className="space-y-2 text-xs text-muted">
              <li>info@avancia.es</li>
              <li>España</li>
            </ul>

            <a
              href="#contacto"
              className="btn-primary mt-4 inline-flex rounded-full px-4 py-2 text-xs font-medium"
            >
              Pedir cita
            </a>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-[color:var(--color-primary-700)]/40" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Avancia. Todos los derechos reservados.</p>

          <div className="flex gap-4">
            <Link href="/legal" className="hover:text-primary">
              Aviso legal
            </Link>
            <Link href="/privacidad" className="hover:text-primary">
              Privacidad
            </Link>
            <Link href="/cookies" className="hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* glow decorativo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-[color:var(--color-secondary-500)]/10 to-transparent blur-3xl" />
    </footer>
  );
};
