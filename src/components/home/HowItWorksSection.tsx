"use client";

import { motion, type Variants } from "framer-motion";

type Step = { id: string; title: string; description: string };

type Props = {
  steps: Step[];
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const HowItWorksSection = ({ steps }: Props) => {
  return (
    <section
      id="como-funciona"
      className="border-b border-slate-200 bg-transparent"
    >
      <motion.div
        className="mx-auto max-w-6xl px-4 py-14"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Cómo trabajamos contigo
          </h2>
          <p className="max-w-2xl text-sm text-slate-600">
            Un proceso claro de principio a fin: desde entender tu contexto
            hasta acompañarte en la mejora continua de las soluciones de IA.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.article
              key={step.id}
              className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-[0_22px_55px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_28px_70px_rgba(16,185,129,0.25)]"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Panel superior oscuro con animación por paso */}
              <div className="mb-4 h-32 rounded-2xl border border-emerald-500/30 bg-slate-950 px-4 py-3 text-emerald-50">
                {renderStepPreview(index)}
              </div>

              {/* Texto del paso */}
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-500">
                  {String(index + 1).padStart(2, "0")}.
                </p>
                <h3 className="text-sm font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600">{step.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ========= PREVIEWS ANIMADOS POR PASO ========= */

function renderStepPreview(index: number) {
  if (index === 0) return <ContactPreview />;
  if (index === 1) return <ProposalPreview />;
  if (index === 2) return <DevelopmentPreview />;
  return <TestPreview />;
}

/* Paso 1: contacto */
const ContactPreview = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>Nivel proyecto</span>
        <motion.div
          className="inline-flex items-center rounded-full bg-slate-800 px-2 py-1"
          animate={{ backgroundColor: ["#020617", "#16a34a", "#020617"] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <span className="mr-1 text-[10px] text-slate-300">On</span>
          <div className="flex h-4 w-8 items-center rounded-full bg-slate-900">
            <motion.div
              className="h-3 w-3 rounded-full bg-emerald-400"
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

      <div className="space-y-2 text-[11px] text-slate-400">
        <p>Scope inicial</p>
        <div className="relative h-1.5 w-full rounded-full bg-slate-800">
          <motion.div
            className="absolute left-0 top-0 h-1.5 rounded-full bg-emerald-400"
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

/* Paso 2: propuesta */
const ProposalPreview = () => {
  const items = ["API", "CRM", "Support", "Ops", "Data", "Custom"];

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between text-[11px] text-slate-400">
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
            className="flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-[10px] text-slate-100"
          >
            {label}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* Paso 3: desarrollo */
const DevelopmentPreview = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
        <span>IA Workflow</span>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-200">
          Agile
        </span>
      </div>
      <div className="relative flex-1 rounded-xl bg-slate-900/80 p-3 text-[10px] font-mono text-emerald-100">
        <p>
          <span className="text-emerald-300">
            {"const result = await runPipeline({"}
          </span>
        </p>
        <p className="ml-4 text-slate-300">{"input,"}</p>
        <p className="ml-4 text-slate-300">{'model: "enterprise-ia",'} </p>
        <p className="ml-4 text-slate-300">
          {'callbacks: ["logging", "metrics"]'}
        </p>
        <p>{"});"}</p>
        <motion.span
          className="absolute bottom-2 left-3 h-3 w-[1px] bg-emerald-300"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

/* Paso 4: test & mejora */
const TestPreview = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>Monitoreo</span>
        <span>Iteración</span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          className="relative h-20 w-20 rounded-full bg-linear-to-b from-emerald-400/80 via-emerald-500/70 to-slate-900 shadow-[0_0_40px_rgba(16,185,129,0.6)]"
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: [0, 0, 1, 1],
          }}
        >
          <div className="absolute inset-[18%] rounded-full border border-emerald-200/70" />
          <div className="absolute inset-[35%] rounded-full bg-slate-900/80" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-full bg-slate-950/60" />
        </motion.div>
      </div>
    </div>
  );
};
