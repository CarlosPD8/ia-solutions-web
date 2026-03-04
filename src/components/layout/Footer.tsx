import Image from "next/image";
import Link from "next/link";
import avanciaLogo from "@/assets/images/avancia.png";

const CALENDLY_URL = "https://calendly.com/avancia-avanciatech/30min";

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-black/30">
      <div className="section-shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={avanciaLogo}
                alt="Avancia logo"
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-md object-contain"
              />
              <span className="text-[1.8rem] font-semibold leading-none tracking-tight text-primary">Avancia</span>
            </div>
            <p className="max-w-xs text-sm leading-7 text-muted">
              Implementamos soluciones de Inteligencia Artificial que mejoran procesos reales en tu empresa:
              automatización, asistentes inteligentes y analítica avanzada.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Servicios</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="#servicios" className="focus-ring hover:text-primary">
                  Chatbots IA
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="focus-ring hover:text-primary">
                  Automatización
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="focus-ring hover:text-primary">
                  Analítica avanzada
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="#como-funciona" className="focus-ring hover:text-primary">
                  Cómo trabajamos
                </Link>
              </li>
              <li>
                <Link href="#testimonios" className="focus-ring hover:text-primary">
                  Clientes
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="focus-ring hover:text-primary">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>info@avancia.es</li>
              <li>España</li>
            </ul>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple-primary focus-ring mt-4 px-4 py-2 text-sm font-medium"
            >
              Pedir cita
            </a>
          </div>
        </div>

        <div className="my-10 h-px bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Avancia. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/legal" className="focus-ring hover:text-primary">
              Aviso legal
            </Link>
            <Link href="/privacidad" className="focus-ring hover:text-primary">
              Privacidad
            </Link>
            <Link href="/cookies" className="focus-ring hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
