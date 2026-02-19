"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type Sector = "Ecommerce" | "Clínica" | "Inmobiliaria" | "Educación" | "SaaS" | "Otro";
type Clientes = "0-50" | "50-200" | "200-1000" | "+1000";
type Canal = "WhatsApp" | "Web" | "Instagram" | "Email" | "Teléfono";

type Answers = {
  sector?: Sector;
  clientes?: Clientes;
  canal?: Canal;
};

const QUESTIONS = [
  {
    key: "sector" as const,
    title: "¿En qué sector está tu empresa?",
    options: ["Ecommerce", "Clínica", "Inmobiliaria", "Educación", "SaaS", "Otro"] as Sector[],
  },
  {
    key: "clientes" as const,
    title: "¿Cuántos clientes atiendes al mes?",
    options: ["0-50", "50-200", "200-1000", "+1000"] as Clientes[],
  },
  {
    key: "canal" as const,
    title: "¿Cuál es tu canal principal?",
    options: ["WhatsApp", "Web", "Instagram", "Email", "Teléfono"] as Canal[],
  },
];

export const QuizAutomatizacion = ({ className = "" }: { className?: string }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const progress = ((Math.min(step, 3)) / 3) * 100;
  const result = useMemo(() => calculateResult(answers), [answers]);

  const onSelect = (value: Sector | Clientes | Canal) => {
    const question = QUESTIONS[step];
    if (!question) return;

    setAnswers((prev) => ({ ...prev, [question.key]: value }));
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const currentQuestion = QUESTIONS[step];

  return (
    <div
      className={`mt-7 rounded-2xl border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_34px_rgba(0,0,0,0.32)] backdrop-blur-md ${className}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-blue-300/20 bg-blue-500/10 text-blue-200">
          <SparkIcon />
        </span>
        <p className="text-sm font-medium text-primary">Diagnóstico rápido de automatización</p>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,#5da8ff,#2563ff)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step < 3 && currentQuestion ? (
          <motion.div
            key={currentQuestion.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
          >
            <p className="mb-3 text-base font-semibold text-primary">{currentQuestion.title}</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onSelect(option)}
                  className="rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-primary transition hover:border-blue-300/35 hover:bg-blue-500/10 hover:shadow-[0_0_0_1px_rgba(93,168,255,0.22),0_0_24px_rgba(37,99,255,0.22)]"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            className="rounded-2xl border border-blue-300/20 bg-[radial-gradient(520px_220px_at_35%_0%,rgba(92,164,255,0.2),rgba(14,23,38,0.1)_58%)] p-4"
          >
            <p className="text-sm text-blue-200/90">Resultado estimado</p>
            <p className="mt-2 text-lg font-semibold leading-8 text-primary">
              Tu empresa puede automatizar el {result.percent}% del soporte y ahorrar hasta{" "}
              {formatEuros(result.savings)}/mes
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-blue-300/30 bg-[linear-gradient(180deg,#3f86ff,#1f6bff)] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_24px_rgba(31,107,255,0.35)] transition hover:brightness-110"
              >
                Repetir quiz
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function calculateResult(answers: Answers) {
  const sector = answers.sector ?? "Otro";
  const clientes = answers.clientes ?? "0-50";
  const canal = answers.canal ?? "Web";

  let min = 30;
  let max = 50;

  if (sector === "Clínica") {
    min = 40;
    max = 60;
  } else if (sector === "Inmobiliaria") {
    min = 60;
    max = 75;
  } else if (sector === "Ecommerce") {
    min = 58;
    max = 76;
  } else if (sector === "SaaS") {
    min = 55;
    max = 72;
  } else if (sector === "Educación") {
    min = 45;
    max = 62;
  }

  const ecommerceHigh =
    sector === "Ecommerce" &&
    canal === "WhatsApp" &&
    (clientes === "200-1000" || clientes === "+1000");
  if (ecommerceHigh) {
    min = 70;
    max = 85;
  }

  const clientBonus = clientes === "+1000" ? 4 : clientes === "200-1000" ? 2 : clientes === "50-200" ? 1 : 0;
  const channelBonus = canal === "WhatsApp" ? 2 : canal === "Email" ? 1 : 0;

  const spread = Math.max(max - min, 1);
  const base = min + Math.floor(spread * 0.55);
  const percent = Math.min(max, Math.max(min, base + clientBonus + channelBonus));
  const savings = Math.round((percent * 18 + (clientes === "+1000" ? 260 : 0)) / 10) * 10;

  return { percent, savings };
}

function formatEuros(value: number) {
  return `${new Intl.NumberFormat("es-ES").format(value)}€`;
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M10 2.4 11.7 6l3.9.5-2.9 2.7.8 3.8L10 11.1 6.5 13l.8-3.8L4.4 6.5 8.3 6 10 2.4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
