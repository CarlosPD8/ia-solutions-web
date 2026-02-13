// src/components/layout/Footer.tsx
export const Footer = () => {
  return (
    <footer className="border-t border-default">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-muted md:flex-row">
        <p>
          © {new Date().getFullYear()} IA Solutions. Todos los derechos
          reservados.
        </p>
        <div className="flex gap-4">
          <a href="#inicio" className="hover:text-primary">
            Volver arriba
          </a>
          <a href="#contacto" className="hover:text-primary">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};
