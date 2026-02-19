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
          "Disenamos e implementamos soluciones de IA para automatizar procesos, mejorar la atencion al cliente y tomar mejores decisiones basadas en datos.",
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
            "Reduccion de carga en el equipo de soporte",
            "Respuestas consistentes y rapidas",
            "Integracion con tus canales actuales",
          ],
        },
        {
          id: "automation",
          title: "Automatizacion de procesos",
          shortDescription:
            "Identificamos tareas repetitivas y disenamos flujos automatizados para ahorrar tiempo y costes.",
          benefits: [
            "Menos errores manuales",
            "Mas tiempo para tareas de valor",
            "Escalabilidad de operaciones",
          ],
        },
        {
          id: "analytics",
          title: "Analitica avanzada con IA",
          shortDescription:
            "Transformamos datos en decisiones accionables con modelos de machine learning y analitica.",
          benefits: [
            "Mejor entendimiento de tus clientes",
            "Prediccion de demanda y comportamiento",
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
              "Analizamos tu situacion actual, procesos y objetivos para detectar oportunidades concretas de IA.",
          },
          {
            id: "2",
            title: "Diseno de solucion",
            description:
              "Definimos la solucion ideal, el alcance del proyecto y un plan realista de implantacion.",
          },
          {
            id: "3",
            title: "Implementacion y pruebas",
            description:
              "Construimos, integramos con tus herramientas y validamos la solucion con tu equipo.",
          },
          {
            id: "4",
            title: "Acompañamiento",
            description:
              "Formacion, soporte y mejora continua de los modelos y flujos implementados.",
          },
        ],
      },
      testimonials: [
        {
          id: "1",
          name: "Maria Lopez",
          role: "Directora de Operaciones",
          company: "TechCorp",
          quote:
            "El asistente virtual que nos implementaron redujo en un 40% el volumen de consultas repetitivas al equipo.",
        },
        {
          id: "2",
          name: "Carlos Garcia",
          role: "CEO",
          company: "LogiTrans",
          quote:
            "La automatizacion de procesos nos permitio escalar operaciones sin aumentar el tamano del equipo.",
        },
        {
          id: "3",
          name: "Laura Mendez",
          role: "Gerente Comercial",
          company: "NovaRetail",
          quote:
            "Con los modelos de recomendacion mejoramos la conversion online y ahora tomamos decisiones con mucha mas certeza.",
        },
        {
          id: "4",
          name: "Andres Rojas",
          role: "Director de Servicio",
          company: "Clinica Vida",
          quote:
            "Pasamos de respuestas tardias a atencion 24/7. El equipo se enfoca en casos complejos y los pacientes reciben soporte inmediato.",
        },
        {
          id: "5",
          name: "Paula Serrano",
          role: "COO",
          company: "FinCore",
          quote:
            "La automatizacion de backoffice nos ahorro horas cada semana y redujo errores en procesos criticos.",
        },
        {
          id: "6",
          name: "Diego Alvarez",
          role: "Head of Growth",
          company: "EduConnect",
          quote:
            "Integramos IA en marketing y soporte en menos de un mes. El impacto en productividad se noto desde la primera semana.",
        },
      ],
      cta: {
        title: "Listo para explorar como la IA puede ayudarte?",
        description:
          "Agenda una llamada de valoracion gratuita y te mostraremos ideas concretas para tu negocio.",
        buttonText: "Pedir cita gratuita",
      },
    };
  },
};
