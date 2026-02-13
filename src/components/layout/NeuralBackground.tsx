// src/components/layout/NeuralBackground.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

export const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cfg = useMemo(
    () => ({
      density: 14000,
      maxPoints: 140,
      minPoints: 60,

      speed: 0.22,
      wander: 0.08,
      edgeBounce: 1,

      linkDist: 140,
      linkDistNearMouse: 210,

      mouseInfluenceRadius: 220,
      mouseAttract: 0.018,
      mouseRepel: 0.02,
      mouseRepelRadius: 55,

      pointSize: 1.2,
      pointSizeNearMouse: 2.0,
      baseLineAlpha: 0.18,
      glowLineAlpha: 0.55,
      basePointAlpha: 0.55,
      glowPointAlpha: 0.95,

      breatheSpeed: 0.0008,
      breatheAmp: 0.22,

      glowBlur: 14,

      // ✅ NUEVO: hard caps para rendimiento
      maxLinksPerFrame: 2200, // limita líneas dibujadas por frame
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const bg = (css.getPropertyValue("--color-bg") || "").trim() || "#0B0D10";
    const blue = (css.getPropertyValue("--color-secondary-500") || "").trim() || "#1F6BFF";
    const blueRGB = hexToRgb(blue) ?? { r: 31, g: 107, b: 255 };

    // ✅ Detectar móvil / iOS (y/o dispositivos lentos)
    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const lowPower = isTouch || isIOS;

    // ✅ DPR: en móvil fijamos 1 para evitar render pesado
    const getDpr = () => {
      const raw = window.devicePixelRatio || 1;
      if (lowPower) return 1; // clave para iPhone 11
      return Math.max(1, Math.min(2, raw));
    };

    let dpr = getDpr();
    let w = 1;
    let h = 1;

    // mouse (en móvil casi siempre inactive, pero dejamos por si iPad/trackpad)
    const mouse = { x: -9999, y: -9999, active: false };

    type P = { x: number; y: number; vx: number; vy: number; seed: number };
    let points: P[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));

      dpr = getDpr();

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // ✅ En lowPower: menos puntos y menos densidad de red
      const baseDensity = cfg.density;
      const density = lowPower ? baseDensity * 1.6 : baseDensity; // menos puntos en móvil
      const target = Math.round((w * h) / density);

      const maxP = lowPower ? Math.min(90, cfg.maxPoints) : cfg.maxPoints;
      const minP = lowPower ? Math.min(40, cfg.minPoints) : cfg.minPoints;
      const count = Math.max(minP, Math.min(maxP, target));

      if (points.length === 0) {
        points = new Array(count).fill(0).map((_, i) => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: rand(-cfg.speed, cfg.speed),
          vy: rand(-cfg.speed, cfg.speed),
          seed: i * 0.6180339887,
        }));
      } else if (points.length < count) {
        const add = count - points.length;
        for (let i = 0; i < add; i++) {
          points.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: rand(-cfg.speed, cfg.speed),
            vy: rand(-cfg.speed, cfg.speed),
            seed: (points.length + i) * 0.6180339887,
          });
        }
      } else if (points.length > count) {
        points = points.slice(0, count);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });

    // ✅ Pausar cuando la pestaña no está visible
    let running = true;
    const onVis = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    resize();

    let raf = 0;
    let last = performance.now();

    const loop = (t: number) => {
      if (!running) {
        raf = requestAnimationFrame(loop);
        return;
      }

      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;

      const breathe = 1 + Math.sin(t * cfg.breatheSpeed) * cfg.breatheAmp;

      // clear
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      // ✅ En lowPower: menos blur (lo más caro)
      const glowBlur = lowPower ? 6 : cfg.glowBlur;

      // update points
      const speedMul = lowPower ? 0.85 : 1; // un pelín menos movimiento en móvil
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        const ang = (t * 0.0003 + p.seed) * Math.PI * 2;
        p.vx += Math.cos(ang) * cfg.wander * dt;
        p.vy += Math.sin(ang) * cfg.wander * dt;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          const r = cfg.mouseInfluenceRadius;
          const r2 = r * r;

          if (d2 < r2) {
            const d = Math.sqrt(d2) || 0.0001;
            const nx = dx / d;
            const ny = dy / d;

            if (d < cfg.mouseRepelRadius) {
              const f = (1 - d / cfg.mouseRepelRadius) * cfg.mouseRepel;
              p.vx -= nx * f;
              p.vy -= ny * f;
            } else {
              const f = (1 - d / r) * cfg.mouseAttract;
              p.vx += nx * f;
              p.vy += ny * f;
            }
          }
        }

        const v = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const vmax = cfg.speed * 2.2;
        if (v > vmax) {
          p.vx = (p.vx / v) * vmax;
          p.vy = (p.vy / v) * vmax;
        }

        p.x += p.vx * (60 * dt) * speedMul;
        p.y += p.vy * (60 * dt) * speedMul;

        if (p.x < 0) {
          p.x = 0;
          p.vx = Math.abs(p.vx) * cfg.edgeBounce;
        } else if (p.x > w) {
          p.x = w;
          p.vx = -Math.abs(p.vx) * cfg.edgeBounce;
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy = Math.abs(p.vy) * cfg.edgeBounce;
        } else if (p.y > h) {
          p.y = h;
          p.vy = -Math.abs(p.vy) * cfg.edgeBounce;
        }
      }

      // ✅ En lowPower: reduce distancias de enlace (menos líneas)
      const baseLink = (lowPower ? cfg.linkDist * 0.82 : cfg.linkDist) * breathe;
      const nearLink = (lowPower ? cfg.linkDistNearMouse * 0.82 : cfg.linkDistNearMouse) * breathe;

      let linksDrawn = 0;

      // links
      for (let i = 0; i < points.length; i++) {
        const a = points[i];

        const aNear = mouse.active
          ? dist(a.x, a.y, mouse.x, mouse.y) < cfg.mouseInfluenceRadius
          : false;

        const linkLimit = aNear ? nearLink : baseLink;
        const lim2 = linkLimit * linkLimit;

        for (let j = i + 1; j < points.length; j++) {
          if (linksDrawn >= cfg.maxLinksPerFrame) break;

          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;

          if (d2 > lim2) continue;

          const d = Math.sqrt(d2);
          const pwr = 1 - d / linkLimit;

          let glowBoost = 0;
          if (mouse.active) {
            const am = dist(a.x, a.y, mouse.x, mouse.y);
            const bm = dist(b.x, b.y, mouse.x, mouse.y);
            const m = Math.min(am, bm);
            if (m < cfg.mouseInfluenceRadius) glowBoost = (1 - m / cfg.mouseInfluenceRadius) * 0.9;
          }

          const alpha =
            (cfg.baseLineAlpha * pwr + cfg.glowLineAlpha * glowBoost * pwr) * 0.9;

          if (alpha <= 0.01) continue;

          ctx.save();
          // ✅ shadowBlur reducido en móvil
          ctx.shadowBlur = glowBlur * (0.5 + glowBoost);
          ctx.shadowColor = `rgba(${blueRGB.r},${blueRGB.g},${blueRGB.b},${Math.min(
            1,
            0.55 * alpha
          )})`;
          ctx.strokeStyle = `rgba(${blueRGB.r},${blueRGB.g},${blueRGB.b},${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.restore();

          linksDrawn++;
        }
      }

      // points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        let near = 0;
        if (mouse.active) {
          const d = dist(p.x, p.y, mouse.x, mouse.y);
          if (d < cfg.mouseInfluenceRadius) near = 1 - d / cfg.mouseInfluenceRadius;
        }

        const r = cfg.pointSize + near * (cfg.pointSizeNearMouse - cfg.pointSize);
        const a = (cfg.basePointAlpha + near * (cfg.glowPointAlpha - cfg.basePointAlpha)) * 0.9;

        ctx.save();
        ctx.shadowBlur = glowBlur * (0.5 + near);
        ctx.shadowColor = `rgba(${blueRGB.r},${blueRGB.g},${blueRGB.b},${0.55 * a})`;
        ctx.fillStyle = `rgba(${blueRGB.r},${blueRGB.g},${blueRGB.b},${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // vignette
      const grad = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        Math.min(w, h) * 0.1,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.75
      );
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.restore();

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [cfg]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(900px 520px at 30% 65%, rgba(31,107,255,0.10), transparent 60%)," +
            "radial-gradient(760px 480px at 70% 30%, rgba(96,165,255,0.08), transparent 62%)",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );
};

function dist(x1: number, y1: number, x2: number, y2: number) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return { r, g, b };
}
