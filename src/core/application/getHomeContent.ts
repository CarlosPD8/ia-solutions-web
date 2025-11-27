import { homeContentStaticRepository } from "@/infra/repositories/homeContentStaticRepository";

export const getHomeContent = () => {
  // Aquí podrías añadir lógica de negocio si hiciera falta
  return homeContentStaticRepository.getHomeContent();
};
