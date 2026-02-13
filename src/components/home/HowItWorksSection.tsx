// src/components/home/HowItWorksSection.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { enterBlurUp, stagger, easeApple } from "@/components/motion/presets";

type Step = { id: string; title: string; description: string };
type Props = { steps: Step[] };

const containerVariants: Variants = stagger(0.08, 0.06);

// ✅ Card enter SIN filter para evitar “flash/repaint” al terminar
const cardEnterNoFilter: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeApple },
  },
};

export const HowItWorksSection = ({ steps }: Props) => {
  return (
    <section
      id="como-funciona"
      className="border-b border-default bg-transparent"
    >
      <motion.div
        className="mx-auto max-w-6xl px-4 py-14"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* ✅ Aquí sí dejamos blur (no suele dar problemas) */}
        <motion.div className="mb-8 space-y-3" variants={enterBlurUp}>
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            Cómo trabajamos contigo
          </h2>
          <p className="max-w-2xl text-sm text-muted">
            Un proceso claro de principio a fin: desde entender tu contexto
            hasta acompañarte en la mejora continua de las soluciones de IA.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.article
              key={step.id}
              variants={cardEnterNoFilter}
              // ✅ Lift por Framer (sin conflicto con transform)
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease: easeApple }}
              className="card group relative flex flex-col rounded-3xl p-5 will-change-transform hover:border-[color:var(--color-secondary-400)] hover:shadow-[0_0_30px_rgba(31,107,255,0.25)]"
            >
              {/* Panel superior (INTACTO) */}
              <div className="mb-4 overflow-hidden rounded-2xl border border-default bg-[color:var(--color-primary-900)] px-4 py-3 text-primary shadow-inner">
                {renderStepPreview(index)}
              </div>

              {/* Texto (INTACTO) */}
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">
                  {String(index + 1).padStart(2, "0")}.
                </p>
                <h3 className="text-sm font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="text-xs text-muted">{step.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ========= PREVIEWS (INTACTOS) ========= */

function renderStepPreview(index: number) {
  if (index === 0) return <ContactPreview />;
  if (index === 1) return <ProposalPreview />;
  if (index === 2) return <DevelopmentPreview />;
  return <TestPreview />;
}

const ContactPreview = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span>Nivel proyecto</span>
        <motion.div
          className="inline-flex items-center rounded-full bg-[color:var(--color-primary-700)] px-2 py-1"
          animate={{ backgroundColor: ["#050608", "#1F6BFF", "#050608"] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <span className="mr-1 text-[10px] text-primary">On</span>
          <div className="flex h-4 w-8 items-center rounded-full bg-[color:var(--color-primary-900)]">
            <motion.div
              className="h-3 w-3 rounded-full bg-secondary"
              animate={{ x: [1, 9, 1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            />
          </div>
        </motion.div>
      </div>

      <div className="space-y-2 text-[11px] text-muted">
        <p>Scope inicial</p>
        <div className="relative h-1.5 w-full rounded-full bg-[color:var(--color-primary-700)]">
          <motion.div
            className="absolute left-0 top-0 h-1.5 rounded-full bg-secondary"
            animate={{ width: ["40%", "80%", "55%"] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ProposalPreview = () => {
  const items = ["API", "CRM", "Support", "Ops", "Data", "Custom"];

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span>Integraciones</span>
        <span>Blueprint</span>
      </div>
      <motion.div
        className="mt-2 grid flex-1 grid-cols-3 gap-2"
        animate={{ x: [-4, 4, -4] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: [0.22, 0.61, 0.36, 1],
        }}
      >
        {items.map((label) => (
          <div
            key={label}
            className="flex items-center justify-center rounded-xl border border-default bg-[color:var(--color-primary-900)]/70 text-[10px] text-primary"
          >
            {label}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const DevelopmentPreview = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="mb-2 flex items-center justify-between text-[11px] text-muted">
        <span>IA Workflow</span>
        <span className="rounded-full bg-[color:var(--color-secondary-500)]/15 px-2 py-0.5 text-[10px] text-secondary">
          Agile
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl border border-default bg-[color:var(--color-primary-900)]/70 p-3 text-[10px] font-mono text-primary">
        <p>
          <span className="text-secondary">
            {"const result = await runPipeline({"}
          </span>
        </p>
        <p className="ml-4 text-muted">{"input,"}</p>
        <p className="ml-4 text-muted">{'model: "enterprise-ia",'} </p>
        <p className="ml-4 text-muted">{'callbacks: ["logging", "metrics"]'}</p>
        <p>{"});"}</p>

        <motion.span
          className="absolute bottom-3 left-3 h-3 w-[1px] bg-secondary"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        <motion.div
          className="pointer-events-none absolute -inset-10 opacity-60"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(220px 80px at 35% 30%, rgba(31,107,255,0.18), transparent 60%)",
          }}
        />
      </div>
    </div>
  );
};

const TestPreview = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span>Monitoreo</span>
        <span>Iteración</span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          className="relative h-20 w-20 rounded-full bg-linear-to-b from-[color:var(--color-secondary-300)]/80 via-[color:var(--color-secondary-500)]/70 to-[color:var(--color-primary-900)] shadow-[0_0_40px_rgba(31,107,255,0.55)]"
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: [0, 0, 1, 1],
          }}
        >
          <div className="absolute inset-[18%] rounded-full border border-[color:var(--color-secondary-300)]/70" />
          <div className="absolute inset-[35%] rounded-full bg-[color:var(--color-primary-900)]/70" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-full bg-[color:var(--color-primary-900)]/60" />
        </motion.div>
      </div>
    </div>
  );
};
