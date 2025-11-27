export const Footer = () => {
  return (
    <footer className="border-t border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-slate-500 md:flex-row">
        <p>© {new Date().getFullYear()} IA Solutions. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <a href="#inicio" className="hover:text-slate-300">
            Volver arriba
          </a>
          <a href="#contacto" className="hover:text-slate-300">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};
