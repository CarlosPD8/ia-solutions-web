"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type IconKind = "chat" | "gear" | "chart" | "cloud" | "db" | "flow" | "bot" | "shield";

type OrbitSprite = {
  icon: IconKind;
  radius: number;
  angle: number;
  speed: number;
  depthScale: number;
  yScale: number;
};

const SPRITES: OrbitSprite[] = [
  { icon: "chat", radius: 2.2, angle: 0.1, speed: 0.45, depthScale: 0.9, yScale: 0.16 },
  { icon: "gear", radius: 2.2, angle: 2.0, speed: 0.45, depthScale: 0.9, yScale: 0.16 },
  { icon: "chart", radius: 2.2, angle: 4.1, speed: 0.45, depthScale: 0.9, yScale: 0.16 },
  { icon: "cloud", radius: 1.75, angle: 0.9, speed: -0.58, depthScale: 0.86, yScale: 0.22 },
  { icon: "db", radius: 1.75, angle: 3.0, speed: -0.58, depthScale: 0.86, yScale: 0.22 },
  { icon: "flow", radius: 1.75, angle: 5.2, speed: -0.58, depthScale: 0.86, yScale: 0.22 },
  { icon: "bot", radius: 1.25, angle: 1.8, speed: 0.72, depthScale: 0.82, yScale: 0.26 },
  { icon: "shield", radius: 1.25, angle: 4.4, speed: 0.72, depthScale: 0.82, yScale: 0.26 },
];

export const IconOrbit = ({ compact = false }: { compact?: boolean }) => {
  const reduceMotion = usePrefersReducedMotion();
  const scrollRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (compact || reduceMotion) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const modules = await getGsap();
      if (!modules) return;

      const { ScrollTrigger } = modules;

      const trigger = document.querySelector<HTMLElement>('[data-scene="hero"]');
      if (!trigger) return;

      const st = ScrollTrigger.create({
        trigger,
        start: "top top",
        end: "+=140%",
        scrub: 0.7,
        onUpdate: (self) => {
          scrollRotation.current.y = self.progress * 1.05;
          scrollRotation.current.x = self.progress * -0.2;
        },
      });

      cleanup = () => st.kill();
    })();

    return () => cleanup?.();
  }, [compact, reduceMotion]);

  if (compact || reduceMotion) {
    return (
      <div className="relative mx-auto h-[23rem] w-full max-w-[32rem] md:h-[28rem]">
        <div className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10" />
        <div className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/12" />
        <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[radial-gradient(circle_at_28%_20%,rgba(255,255,255,0.25),rgba(43,111,255,0.34)_42%,rgba(7,10,18,0.96)_82%)]">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[2.3rem] font-semibold tracking-tight text-primary">
            IA
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[23rem] w-full max-w-[32rem] md:h-[28rem]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.5, 7], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#050608", 7, 13]} />
        <ambientLight intensity={0.55} color="#8ab7ff" />
        <directionalLight position={[4, 4, 5]} intensity={1.25} color="#e6f1ff" />
        <pointLight position={[-4, -2, 5]} intensity={0.8} color="#2b6fff" />
        <OrbitScene scrollRotation={scrollRotation} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-10 bottom-6 h-16 rounded-full border border-white/10 bg-white/[0.02]" />
    </div>
  );
};

const OrbitScene = ({ scrollRotation }: { scrollRotation: MutableRefObject<{ x: number; y: number }> }) => {
  const groupRef = useRef<THREE.Group | null>(null);
  const spriteRefs = useRef<THREE.Sprite[]>([]);
  const textures = useMemo(() => makeTextures(), []);

  useEffect(
    () => () => {
      Object.values(textures).forEach((texture) => texture.dispose());
    },
    [textures],
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const elapsed = state.clock.getElapsedTime();
    const targetY = scrollRotation.current.y;
    const targetX = -0.2 + scrollRotation.current.x;

    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 3.8, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 3.8, delta);

    spriteRefs.current.forEach((sprite, index) => {
      const cfg = SPRITES[index];
      const angle = elapsed * cfg.speed + cfg.angle;
      const x = Math.cos(angle) * cfg.radius;
      const z = Math.sin(angle) * cfg.radius * cfg.depthScale;
      const y = Math.sin(angle * 1.3) * cfg.yScale;

      sprite.position.set(x, y, z);
      const depth = THREE.MathUtils.mapLinear(z, -cfg.radius, cfg.radius, 0.72, 1.12);
      sprite.scale.setScalar(depth);
      sprite.material.opacity = THREE.MathUtils.mapLinear(z, -cfg.radius, cfg.radius, 0.62, 1);
    });
  });

  return (
    <group ref={groupRef}>
      <mesh rotation-x={Math.PI / 2.5}>
        <ringGeometry args={[2.15, 2.2, 96]} />
        <meshBasicMaterial color="#4f82ff" transparent opacity={0.34} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2.7, 0.5, 0]}>
        <ringGeometry args={[1.68, 1.72, 90]} />
        <meshBasicMaterial color="#99bfff" transparent opacity={0.27} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, -0.2, 0.6]}>
        <ringGeometry args={[1.18, 1.205, 80]} />
        <meshBasicMaterial color="#8cb4ff" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.95, 64, 64]} />
        <meshStandardMaterial
          color="#1b3f99"
          emissive="#1e4fbc"
          emissiveIntensity={0.4}
          metalness={0.35}
          roughness={0.22}
        />
      </mesh>

      <sprite scale={[0.72, 0.28, 1]} position={[0, -0.02, 0.96]}>
        <spriteMaterial color="#f5f7ff" transparent opacity={0.98} />
      </sprite>

      {SPRITES.map((node, index) => (
        <sprite
          key={`${node.icon}-${index}`}
          ref={(nodeRef) => {
            if (!nodeRef) return;
            spriteRefs.current[index] = nodeRef;
          }}
          scale={[0.58, 0.58, 0.58]}
        >
          <spriteMaterial map={textures[node.icon]} transparent depthWrite={false} />
        </sprite>
      ))}
    </group>
  );
};

function makeTextures() {
  const kinds: IconKind[] = ["chat", "gear", "chart", "cloud", "db", "flow", "bot", "shield"];
  const result = {} as Record<IconKind, THREE.Texture>;

  kinds.forEach((kind) => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawSpriteBase(ctx, canvas.width, canvas.height);
    drawIcon(ctx, kind, canvas.width);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    result[kind] = texture;
  });

  return result;
}

function drawSpriteBase(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const radius = 24;
  const x = 12;
  const y = 12;
  const w = width - 24;
  const h = height - 24;

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  roundRectPath(ctx, x, y, w, h, radius);
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(22,30,48,0.95)");
  gradient.addColorStop(1, "rgba(8,12,20,0.95)");
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.stroke();
}

function drawIcon(ctx: CanvasRenderingContext2D, type: IconKind, width: number) {
  const c = width / 2;
  ctx.strokeStyle = "rgba(200,224,255,0.95)";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.fillStyle = "rgba(140,184,255,0.25)";

  if (type === "chat") {
    ctx.strokeRect(c - 22, c - 18, 44, 30);
    ctx.beginPath();
    ctx.moveTo(c - 4, c + 12);
    ctx.lineTo(c - 14, c + 24);
    ctx.lineTo(c + 4, c + 14);
    ctx.stroke();
    return;
  }
  if (type === "gear") {
    ctx.beginPath();
    ctx.arc(c, c, 17, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(c, c, 7, 0, Math.PI * 2);
    ctx.stroke();
    return;
  }
  if (type === "chart") {
    ctx.beginPath();
    ctx.moveTo(c - 24, c + 22);
    ctx.lineTo(c - 24, c + 2);
    ctx.moveTo(c - 2, c + 22);
    ctx.lineTo(c - 2, c - 16);
    ctx.moveTo(c + 20, c + 22);
    ctx.lineTo(c + 20, c - 4);
    ctx.stroke();
    return;
  }
  if (type === "cloud") {
    ctx.beginPath();
    ctx.arc(c - 13, c + 2, 11, Math.PI * 0.6, Math.PI * 1.95);
    ctx.arc(c + 2, c - 4, 14, Math.PI, Math.PI * 2);
    ctx.arc(c + 16, c + 4, 9, Math.PI * 1.15, Math.PI * 2);
    ctx.stroke();
    return;
  }
  if (type === "db") {
    ctx.beginPath();
    ctx.ellipse(c, c - 12, 18, 8, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(c - 18, c - 12);
    ctx.lineTo(c - 18, c + 18);
    ctx.moveTo(c + 18, c - 12);
    ctx.lineTo(c + 18, c + 18);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(c, c + 18, 18, 8, 0, 0, Math.PI);
    ctx.stroke();
    return;
  }
  if (type === "flow") {
    ctx.beginPath();
    ctx.moveTo(c - 24, c - 16);
    ctx.lineTo(c - 4, c - 16);
    ctx.lineTo(c - 4, c + 14);
    ctx.lineTo(c + 22, c + 14);
    ctx.stroke();
    return;
  }
  if (type === "bot") {
    ctx.strokeRect(c - 20, c - 16, 40, 30);
    ctx.beginPath();
    ctx.moveTo(c, c - 24);
    ctx.lineTo(c, c - 16);
    ctx.moveTo(c - 8, c - 2);
    ctx.lineTo(c - 8, c - 2);
    ctx.moveTo(c + 8, c - 2);
    ctx.lineTo(c + 8, c - 2);
    ctx.stroke();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(c, c - 24);
  ctx.lineTo(c - 18, c - 10);
  ctx.lineTo(c - 14, c + 18);
  ctx.lineTo(c + 14, c + 18);
  ctx.lineTo(c + 18, c - 10);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(c - 8, c - 1);
  ctx.lineTo(c - 1, c + 8);
  ctx.lineTo(c + 10, c - 6);
  ctx.stroke();
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}
