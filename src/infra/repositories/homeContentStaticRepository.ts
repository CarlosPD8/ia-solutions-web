import { Service } from "@/core/domain/service";
import { Testimonial } from "@/core/domain/testimonial";

export type HomeContent = {
  hero: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  services: Service[];
  howItWorks: {
    steps: { id: string; title: string; description: string }[];
  };
  testimonials: Testimonial[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
};

export const homeContentStaticRepository = {
  getHomeContent(): HomeContent {
    return {
      hero: {
        title: "Impulsa tu empresa con Inteligencia Artificial",
        subtitle:
          "Diseñamos e implementamos soluciones de IA para automatizar procesos, mejorar la atención al cliente y tomar mejores decisiones basadas en datos.",
        primaryCta: "Pedir una cita",
        secondaryCta: "Ver servicios",
      },
      services: [
        {
          id: "chatbots",
          title: "Chatbots y asistentes virtuales",
          shortDescription:
            "Atiende a tus clientes 24/7 con asistentes entrenados con el conocimiento de tu negocio.",
          benefits: [
            "Reducción de carga en el equipo de soporte",
            "Respuestas consistentes y rápidas",
            "Integración con tus canales actuales",
          ],
        },
        {
          id: "automation",
          title: "Automatización de procesos",
          shortDescription:
            "Identificamos tareas repetitivas y diseñamos flujos automatizados para ahorrar tiempo y costes.",
          benefits: ["Menos errores manuales", "Más tiempo para tareas de valor", "Escalabilidad de operaciones"],
        },
        {
          id: "analytics",
          title: "Analítica avanzada con IA",
          shortDescription:
            "Transformamos datos en decisiones accionables con modelos de machine learning y analítica.",
          benefits: [
            "Mejor entendimiento de tus clientes",
            "Predicción de demanda y comportamiento",
            "Cuadros de mando claros",
          ],
        },
      ],
      howItWorks: {
        steps: [
          {
            id: "1",
            title: "Descubrimiento",
            description:
              "Analizamos tu situación actual, procesos y objetivos para detectar oportunidades concretas de IA.",
          },
          {
            id: "2",
            title: "Diseño de solución",
            description:
              "Definimos la solución ideal, el alcance del proyecto y un plan realista de implantación.",
          },
          {
            id: "3",
            title: "Implementación y pruebas",
            description:
              "Construimos, integramos con tus herramientas y validamos la solución con tu equipo.",
          },
          {
            id: "4",
            title: "Acompañamiento",
            description:
              "Formación, soporte y mejora continua de los modelos y flujos implementados.",
          },
        ],
      },
      testimonials: [
        {
          id: "1",
          name: "María López",
          role: "Directora de Operaciones",
          company: "TechCorp",
          quote:
            "El asistente virtual que nos implementaron redujo en un 40% el volumen de consultas repetitivas al equipo.",
        },
        {
          id: "2",
          name: "Carlos García",
          role: "CEO",
          company: "LogiTrans",
          quote:
            "La automatización de procesos nos permitió escalar operaciones sin aumentar el tamaño del equipo.",
        },
        {
          id: "3",
          name: "Laura Méndez",
          role: "Gerente Comercial",
          company: "NovaRetail",
          quote:
            "Con los modelos de recomendación mejoramos la conversión online y ahora tomamos decisiones con mucha más certeza.",
        },
        {
          id: "4",
          name: "Andrés Rojas",
          role: "Director de Servicio",
          company: "Clínica Vida",
          quote:
            "Pasamos de respuestas tardías a atención 24/7. El equipo se enfoca en casos complejos y los pacientes reciben soporte inmediato.",
        },
        {
          id: "5",
          name: "Paula Serrano",
          role: "COO",
          company: "FinCore",
          quote:
            "La automatización de backoffice nos ahorró horas cada semana y redujo errores en procesos críticos.",
        },
        {
          id: "6",
          name: "Diego Alvarez",
          role: "Head of Growth",
          company: "EduConnect",
          quote:
            "Integramos IA en marketing y soporte en menos de un mes. El impacto en productividad se notó desde la primera semana.",
        },
      ],
      cta: {
        title: "¿Listo para explorar cómo la IA puede ayudarte?",
        description:
          "Agenda una llamada de valoración gratuita y te mostraremos ideas concretas para tu negocio.",
        buttonText: "Pedir cita gratuita",
      },
    };
  },
};
