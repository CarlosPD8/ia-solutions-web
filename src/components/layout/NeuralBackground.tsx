// src/components/layout/NeuralBackground.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * Fondo: rejilla HEX a pantalla completa (canvas)
 * - Base: hexágonos sutiles
 * - Hover: el hex bajo el ratón se ilumina con azul eléctrico (con decay suave)
 * - No bloquea clicks (pointer-events: none) y escucha el ratón desde window
 * - Colores desde CSS vars:
 *   --color-bg
 *   --color-secondary-500 (azul eléctrico)
 */
export const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cfg = useMemo(
    () => ({
      // tamaño del hex (radio)
      hexSize: 26,
      // intensidad base del grid
      baseStrokeAlpha: 0.075,
      // brillo hover
      glowAlpha: 0.9,
      // velocidad de “apagado” (más alto = se apaga más rápido)
      decayPerSecond: 1.4,
      // “respirar” muy suave
      breatheSpeed: 0.6,
      breatheAmount: 0.02,
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Offscreen para el grid estático
    const baseCanvas = document.createElement("canvas");
    const baseCtx = baseCanvas.getContext("2d");
    if (!baseCtx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const css = getComputedStyle(document.documentElement);
    const bg = css.getPropertyValue("--color-bg").trim() || "#0B0D10";
    const secondary = css.getPropertyValue("--color-secondary-500").trim() || "#1F6BFF";

    const secRgb = hexToRgb(secondary) ?? { r: 31, g: 107, b: 255 };

    let w = 0;
    let h = 0;

    // Mouse en coords CSS (no DPR)
    const mouse = { x: -9999, y: -9999 };

    // Intensidades por celda (q,r) => [0..1]
    const intensities = new Map<string, number>();

    // Cache de path hex para dibujar rápido
    const size = cfg.hexSize;
    const hexPath = makeHexPath(size);

    // Control animation loop
    let raf = 0;
    let lastT = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      baseCanvas.width = canvas.width;
      baseCanvas.height = canvas.height;

      // Dibuja grid base UNA vez
      drawBaseGrid(baseCtx, w, h, dpr, bg, cfg.baseStrokeAlpha, hexPath, size);
    };

    const onMouseMove = (e: MouseEvent) => {
      // coords relativas al canvas
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseout", onMouseLeave, { passive: true });

    resize();

    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - lastT) / 1000);
      lastT = t;

      // clear + base
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseCanvas, 0, 0);

      // breathe (muy sutil)
      const breathe = 1 + Math.sin(t * 0.001 * cfg.breatheSpeed) * cfg.breatheAmount;

      // Resolver hex bajo ratón (axial coords)
      const hovered = pixelToAxial(mouse.x, mouse.y, size);
      if (hovered) {
        const key = `${hovered.q},${hovered.r}`;
        intensities.set(key, 1);
      }

      // Decay + dibujar glows
      // (dibujamos solo los que tengan intensidad > 0)
      ctx.save();
      ctx.scale(dpr, dpr);

      for (const [key, val] of intensities) {
        const next = val - cfg.decayPerSecond * dt;
        if (next <= 0) {
          intensities.delete(key);
          continue;
        }
        intensities.set(key, next);

        const [qStr, rStr] = key.split(",");
        const q = Number(qStr);
        const r = Number(rStr);
        const { x, y } = axialToPixel(q, r, size);

        // glow
        const alpha = next * cfg.glowAlpha * breathe;

        // halo exterior
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.scale(1, 1);

        // glow shadow
        ctx.save();
        ctx.shadowBlur = 22;
        ctx.shadowColor = `rgba(${secRgb.r},${secRgb.g},${secRgb.b},${alpha})`;
        ctx.strokeStyle = `rgba(${secRgb.r},${secRgb.g},${secRgb.b},${alpha})`;
        ctx.lineWidth = 2.2;
        ctx.stroke(hexPath);
        ctx.restore();

        // borde nítido
        ctx.strokeStyle = `rgba(${secRgb.r},${secRgb.g},${secRgb.b},${Math.min(1, alpha + 0.15)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke(hexPath);

        // fill sutil
        ctx.fillStyle = `rgba(${secRgb.r},${secRgb.g},${secRgb.b},${alpha * 0.08})`;
        ctx.fill(hexPath);

        // reset transform local
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.restore();

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
    };
  }, [cfg]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden bg-transparent">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

/* ------------------------ helpers ------------------------ */

// Pointy-top hex axial <-> pixel
function axialToPixel(q: number, r: number, size: number) {
  const x = size * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
  const y = size * ((3 / 2) * r);
  // desplazamos un poco para que rellene desde (0,0)
  return { x: x + size * 2, y: y + size * 2 };
}

function pixelToAxial(px: number, py: number, size: number) {
  if (!Number.isFinite(px) || !Number.isFinite(py)) return null;

  // undo offset
  const x = px - size * 2;
  const y = py - size * 2;

  const q = ((Math.sqrt(3) / 3) * x - (1 / 3) * y) / size;
  const r = ((2 / 3) * y) / size;

  const rounded = axialRound(q, r);
  return rounded;
}

function axialRound(q: number, r: number) {
  // cube coords
  let x = q;
  let z = r;
  let y = -x - z;

  let rx = Math.round(x);
  let ry = Math.round(y);
  let rz = Math.round(z);

  const xDiff = Math.abs(rx - x);
  const yDiff = Math.abs(ry - y);
  const zDiff = Math.abs(rz - z);

  if (xDiff > yDiff && xDiff > zDiff) rx = -ry - rz;
  else if (yDiff > zDiff) ry = -rx - rz;
  else rz = -rx - ry;

  // axial back: q=rx, r=rz
  return { q: rx, r: rz };
}

function makeHexPath(size: number) {
  const path = new Path2D();
  // pointy-top: angle 30deg offset
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    const x = Math.cos(a) * size;
    const y = Math.sin(a) * size;
    if (i === 0) path.moveTo(x, y);
    else path.lineTo(x, y);
  }
  path.closePath();
  return path;
}

function drawBaseGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  dpr: number,
  bg: string,
  strokeAlpha: number,
  hexPath: Path2D,
  size: number
) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // fondo
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // grid
  ctx.save();
  ctx.scale(dpr, dpr);

  const stroke = `rgba(255,255,255,${strokeAlpha})`;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;

  // Rango axial que cubra viewport
  // Aproximación: iterar r por filas y q por columnas usando pixel bounds
  const pad = size * 4;
  const maxX = w + pad;
  const maxY = h + pad;

  // estimación de cuántas filas/cols hacen falta
  const rows = Math.ceil(maxY / (size * 1.5)) + 6;
  const cols = Math.ceil(maxX / (size * Math.sqrt(3))) + 6;

  for (let r = -6; r < rows; r++) {
    for (let q = -6; q < cols; q++) {
      const { x, y } = axialToPixel(q, r, size);

      if (x < -pad || x > w + pad || y < -pad || y > h + pad) continue;

      ctx.setTransform(dpr, 0, 0, dpr, x * dpr, y * dpr);
      // truco: Path2D se dibuja en coords locales; ya estamos posicionados
      ctx.stroke(hexPath);
    }
  }

  ctx.restore();

  // oscurecer un pelín para profundidad
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
