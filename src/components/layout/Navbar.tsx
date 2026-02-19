"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#como-funciona", label: "Cómo trabajamos" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/45 backdrop-blur-[6px]">
      <nav className="section-shell flex h-[4.5rem] items-center justify-between">
        <Link href="/" className="focus-ring flex items-center gap-2.5 rounded-xl px-1 py-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-white">
            IA
          </span>
          <span className="text-[1.8rem] font-semibold tracking-tight text-primary">Avancia</span>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="https://wa.me/34670294712?text=Hola%20quiero%20información%20sobre%20una%20solución%20con%20IA"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-apple-primary focus-ring hidden px-4 py-2 text-sm font-medium md:inline-flex"
        >
          Pedir cita
        </a>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-primary md:hidden"
        >
          <div className="flex h-4 w-5 flex-col justify-between">
            <span
              className={`h-[2px] w-full rounded bg-white transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span className={`h-[2px] w-full rounded bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-[2px] w-full rounded bg-white transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10 bg-[#07090f] md:hidden"
          >
            <div className="section-shell flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="focus-ring rounded-xl px-3 py-2.5 text-sm text-primary hover:bg-white/[0.04]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                className="btn-apple-primary focus-ring mt-2 px-4 py-2.5 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                Pedir cita
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};
