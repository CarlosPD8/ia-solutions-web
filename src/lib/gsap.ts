"use client";

let isRegistered = false;

export async function getGsap() {
  if (typeof window === "undefined") return null;

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }

  return { gsap, ScrollTrigger };
}
