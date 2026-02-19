"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject, type PointerEventHandler } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type IconKind = "chat" | "gear" | "chart" | "cloud" | "db" | "flow" | "bot" | "shield";

type PlanetConfig = {
  icon: IconKind;
  orbit: 0 | 1 | 2 | 3;
  angleOffset: number;
  speedFactor: number;
  size: number;
};

const CORE_RADIUS = 0.86;
const CORE_BASE_ROTATION_SPEED = 0.13;
const CORE_IDLE_TILT_X = -0.18;
const CORE_IDLE_TILT_Z = -0.05;
const TILE_DEPTH = 0.12;
const TILE_FLOAT_AMPLITUDE = 0.03;
const MOBILE_PLANET_COUNT = 5;
const CORE_TEXT_Z = CORE_RADIUS * 0.7;
const BASE_RING_RADIUS = 1.68;
const BASE_RING_Y = -1.18;
const SYSTEM_SCALE_DESKTOP = 0.82;
const SYSTEM_SCALE_MOBILE = 0.74;
const DRAG_SENSITIVITY = 0.0056;
const MAX_DRAG_TILT_X = 0.34;
const MAX_DRAG_TILT_Y = 0.9;

type OrbitConfig = {
  radiusX: number;
  radiusZ: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
  thickness: number;
  opacity: number;
};

const ORBITS: OrbitConfig[] = [
  { radiusX: 2.08, radiusZ: 1.34, tiltX: 1.22, tiltZ: 0.36, speed: 0.32, thickness: 0.012, opacity: 0.26 },
  { radiusX: 1.82, radiusZ: 1.14, tiltX: 1.04, tiltZ: -0.46, speed: -0.41, thickness: 0.011, opacity: 0.22 },
  { radiusX: 1.56, radiusZ: 1.02, tiltX: 1.36, tiltZ: 0.91, speed: 0.5, thickness: 0.01, opacity: 0.2 },
  { radiusX: 1.22, radiusZ: 0.86, tiltX: 1.12, tiltZ: -0.82, speed: -0.58, thickness: 0.01, opacity: 0.18 },
];

const PLANETS: PlanetConfig[] = [
  { icon: "chat", orbit: 0, angleOffset: 0.2, speedFactor: 0.95, size: 0.52 },
  { icon: "gear", orbit: 1, angleOffset: 1.65, speedFactor: 0.92, size: 0.5 },
  { icon: "chart", orbit: 0, angleOffset: 3.72, speedFactor: 1.01, size: 0.52 },
  { icon: "cloud", orbit: 2, angleOffset: 0.86, speedFactor: 1.06, size: 0.48 },
  { icon: "db", orbit: 1, angleOffset: 3.02, speedFactor: 0.98, size: 0.48 },
  { icon: "flow", orbit: 3, angleOffset: 5.18, speedFactor: 1.08, size: 0.46 },
  { icon: "bot", orbit: 2, angleOffset: 2.26, speedFactor: 1.1, size: 0.44 },
  { icon: "shield", orbit: 3, angleOffset: 4.5, speedFactor: 1.12, size: 0.44 },
];

export const IconOrbit = ({ compact = false }: { compact?: boolean }) => {
  const reduceMotion = usePrefersReducedMotion();
  const dragTilt = useRef({ x: 0, y: 0 });
  const dragState = useRef({ active: false, pointerId: -1, lastX: 0, lastY: 0 });

  const planets = compact ? PLANETS.slice(0, MOBILE_PLANET_COUNT) : PLANETS;
  const quality = !compact && !reduceMotion;

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    dragState.current = {
      active: true,
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    const state = dragState.current;
    if (!state.active || state.pointerId !== event.pointerId) return;

    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;
    state.lastX = event.clientX;
    state.lastY = event.clientY;

    dragTilt.current.y = THREE.MathUtils.clamp(
      dragTilt.current.y + dx * DRAG_SENSITIVITY,
      -MAX_DRAG_TILT_Y,
      MAX_DRAG_TILT_Y,
    );
    dragTilt.current.x = THREE.MathUtils.clamp(
      dragTilt.current.x + dy * DRAG_SENSITIVITY,
      -MAX_DRAG_TILT_X,
      MAX_DRAG_TILT_X,
    );
  };

  const endPointerDrag: PointerEventHandler<HTMLDivElement> = (event) => {
    const state = dragState.current;
    if (state.pointerId === event.pointerId) {
      dragState.current.active = false;
      dragState.current.pointerId = -1;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    }
  };

  return (
    <div
      className="relative mx-auto h-[23rem] w-full max-w-[32rem] cursor-grab active:cursor-grabbing md:h-[28rem]"
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointerDrag}
      onPointerLeave={endPointerDrag}
      onPointerCancel={endPointerDrag}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(460px_260px_at_48%_46%,rgba(112,158,255,0.16),rgba(7,10,16,0)_70%)]" />
      <Canvas
        dpr={compact ? [1, 1.2] : [1, 1.7]}
        camera={{ position: compact ? [0.58, 0.66, 8.35] : [0.66, 0.74, 7.9], fov: compact ? 37 : 34 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = compact ? 1.06 : 1.12;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <ambientLight intensity={0.42} color="#9bb9f5" />
        <hemisphereLight intensity={0.44} color="#e9f1ff" groundColor="#070b13" />
        <directionalLight position={[5, 4.1, 5]} intensity={1.05} color="#f6f9ff" />
        <directionalLight position={[-4, 1.8, -3]} intensity={0.45} color="#4f7be6" />
        <pointLight position={[0.1, 0.05, 1.85]} intensity={0.75} color="#85b3ff" />
        <pointLight position={[-2.8, -1, 3.8]} intensity={0.42} color="#376ff1" />
        <SolarSystem
          planets={planets}
          compact={compact}
          quality={quality}
          reduceMotion={reduceMotion}
          dragTilt={dragTilt}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-7 bottom-5 h-16 rounded-full border border-white/15 bg-[radial-gradient(180px_55px_at_50%_46%,rgba(179,203,255,0.2),rgba(9,12,20,0.45)_72%)] blur-[0.4px]" />
    </div>
  );
};

const SolarSystem = ({
  planets,
  compact,
  quality,
  reduceMotion,
  dragTilt,
}: {
  planets: PlanetConfig[];
  compact: boolean;
  quality: boolean;
  reduceMotion: boolean;
  dragTilt: MutableRefObject<{ x: number; y: number }>;
}) => {
  const rigRef = useRef<THREE.Group | null>(null);
  const spinRef = useRef(0);
  const planetRefs = useRef<THREE.Group[]>([]);

  const iconTextures = useMemo(() => makeIconTextures(), []);
  const iaTextTexture = useMemo(() => makeIATextTexture(), []);
  const coreHighlight = useMemo(() => makeCoreHighlightTexture(), []);
  const sceneHalo = useMemo(() => makeSceneHaloTexture(), []);
  const spikeTexture = useMemo(() => makeSpikeTexture(), []);

  useEffect(
    () => () => {
      Object.values(iconTextures).forEach((texture) => texture.dispose());
      iaTextTexture.dispose();
      coreHighlight.dispose();
      sceneHalo.dispose();
      spikeTexture.dispose();
    },
    [coreHighlight, iaTextTexture, iconTextures, sceneHalo, spikeTexture],
  );

  useFrame(({ clock, camera }, delta) => {
    const rig = rigRef.current;
    if (!rig) return;

    const elapsed = clock.getElapsedTime();
    const motionFactor = reduceMotion ? 0.16 : 1;
    spinRef.current += delta * CORE_BASE_ROTATION_SPEED * motionFactor;

    const targetX = CORE_IDLE_TILT_X + dragTilt.current.x;
    const targetY = spinRef.current + dragTilt.current.y;
    const targetZ = CORE_IDLE_TILT_Z + dragTilt.current.y * 0.08;

    rig.rotation.x = THREE.MathUtils.damp(rig.rotation.x, targetX, 3.3, delta);
    rig.rotation.y = THREE.MathUtils.damp(rig.rotation.y, targetY, 2.8, delta);
    rig.rotation.z = THREE.MathUtils.damp(rig.rotation.z, targetZ, 3.3, delta);

    const cameraX = (reduceMotion ? 0.04 : 0.12) * dragTilt.current.y;
    const cameraY = compact ? 0.66 : 0.74;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraX, 2.4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraY + dragTilt.current.x * 0.2, 2.2, delta);
    camera.lookAt(0, 0.06, 0);

    planetRefs.current.forEach((planet, index) => {
      const cfg = planets[index];
      const orbit = ORBITS[cfg.orbit];
      const phase = elapsed * orbit.speed * cfg.speedFactor * motionFactor + cfg.angleOffset;
      const base = new THREE.Vector3(
        Math.cos(phase) * orbit.radiusX,
        Math.sin(phase * 1.5 + index * 0.5) * 0.012,
        Math.sin(phase) * orbit.radiusZ,
      );
      base.applyEuler(new THREE.Euler(orbit.tiltX, 0, orbit.tiltZ));
      base.y += Math.sin(elapsed * 1.08 + index * 0.72) * (TILE_FLOAT_AMPLITUDE * 0.72) * motionFactor;

      planet.position.copy(base);
      planet.lookAt(camera.position);
      planet.rotateX(0.07);
      planet.rotateY(Math.sin(elapsed + index) * 0.015);

      const pulse = 1 + Math.sin(elapsed * 1.5 + index) * 0.012;
      planet.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={rigRef} scale={compact ? SYSTEM_SCALE_MOBILE : SYSTEM_SCALE_DESKTOP}>
      <mesh position={[0, -0.28, -0.1]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[3.15, quality ? 120 : 84]} />
        <meshBasicMaterial map={sceneHalo} transparent opacity={0.34} />
      </mesh>

      <mesh position={[0, BASE_RING_Y - 0.04, 0]} rotation-x={Math.PI / 2}>
        <ringGeometry args={[BASE_RING_RADIUS * 0.66, BASE_RING_RADIUS * 1.6, quality ? 140 : 84]} />
        <meshBasicMaterial color="#6ca4ff" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>

      <group position={[0, BASE_RING_Y, 0]} rotation-x={Math.PI / 2}>
        <mesh>
          <torusGeometry args={[BASE_RING_RADIUS, 0.07, 20, quality ? 180 : 110]} />
          <meshPhysicalMaterial
            color="#59bcff"
            transparent
            opacity={0.95}
            roughness={0.2}
            metalness={0.08}
            emissive="#24b4ff"
            emissiveIntensity={0.62}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
        <mesh>
          <torusGeometry args={[BASE_RING_RADIUS, 0.115, 14, quality ? 150 : 96]} />
          <meshBasicMaterial color="#55b7ff" transparent opacity={0.16} />
        </mesh>
        {Array.from({ length: 10 }).map((_, index) => {
          const t = (index / 10) * Math.PI * 2;
          return (
            <mesh
              key={index}
              position={[Math.cos(t) * BASE_RING_RADIUS, Math.sin(t) * BASE_RING_RADIUS, 0]}
              rotation={[Math.PI / 2, 0, -t]}
            >
              <planeGeometry args={[0.08, 0.42]} />
              <meshBasicMaterial map={spikeTexture} transparent opacity={0.58} depthWrite={false} />
            </mesh>
          );
        })}
      </group>

      <group position={[0, 0.08, 0]}>
        {ORBITS.map((orbit, index) => (
          <OrbitTube key={index} orbit={orbit} quality={quality} compact={compact} />
        ))}

        <mesh>
          <sphereGeometry args={[CORE_RADIUS, quality ? 82 : 52, quality ? 82 : 52]} />
          <meshPhysicalMaterial
            color="#9bd4ff"
            transparent
            opacity={compact ? 0.46 : 0.36}
            transmission={compact ? 0.45 : 0.95}
            thickness={compact ? 0.45 : 1.35}
            ior={1.12}
            roughness={compact ? 0.14 : 0.07}
            metalness={0.01}
            clearcoat={1}
            clearcoatRoughness={0.04}
            emissive="#34c3ff"
            emissiveIntensity={0.28}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[CORE_RADIUS * 0.98, quality ? 72 : 44, quality ? 72 : 44]} />
          <meshBasicMaterial
            color="#8ad4ff"
            transparent
            opacity={0.12}
            wireframe
          />
        </mesh>
        <mesh position={[0, 0.0, 0]} rotation-x={Math.PI / 2}>
          <torusGeometry args={[CORE_RADIUS, 0.028, 12, quality ? 120 : 76]} />
          <meshBasicMaterial color="#67d8ff" transparent opacity={0.82} />
        </mesh>
        <mesh position={[0, 0.02, CORE_TEXT_Z]} renderOrder={10}>
          <planeGeometry args={[0.62, 0.3]} />
          <meshBasicMaterial map={iaTextTexture} transparent depthWrite={false} depthTest={false} />
        </mesh>
        <mesh position={[0.2, 0.34, CORE_RADIUS * 0.92]}>
          <planeGeometry args={[0.56, 0.3]} />
          <meshBasicMaterial map={coreHighlight} transparent opacity={0.56} />
        </mesh>
      </group>

      {planets.map((planet, index) => (
        <group
          key={`${planet.icon}-${index}`}
          ref={(node) => {
            if (!node) return;
            planetRefs.current[index] = node;
          }}
        >
          <RoundedBox args={[planet.size, planet.size * 0.76, TILE_DEPTH]} radius={0.07} smoothness={5}>
            <meshPhysicalMaterial
              color="#0a0f1a"
              roughness={0.34}
              metalness={0.46}
              clearcoat={1}
              clearcoatRoughness={0.24}
              emissive="#101b31"
              emissiveIntensity={0.14}
            />
          </RoundedBox>
          <mesh position={[0, 0, TILE_DEPTH * 0.52 + 0.006]}>
            <planeGeometry args={[planet.size * 0.58, planet.size * 0.58]} />
            <meshStandardMaterial
              map={iconTextures[planet.icon]}
              transparent
              emissive="#284b8f"
              emissiveIntensity={0.17}
              roughness={0.24}
              metalness={0.16}
            />
          </mesh>
          <mesh position={[0, 0, TILE_DEPTH * 0.5]} rotation-x={-0.01}>
            <planeGeometry args={[planet.size * 0.74, planet.size * 0.53]} />
            <meshBasicMaterial color="#d9e7ff" transparent opacity={0.06} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const OrbitTube = ({
  orbit,
  quality,
  compact,
}: {
  orbit: OrbitConfig;
  quality: boolean;
  compact: boolean;
}) => {
  const geometry = useMemo(() => {
    const curve2d = new THREE.EllipseCurve(0, 0, orbit.radiusX, orbit.radiusZ, 0, Math.PI * 2, false);
    const points = curve2d.getSpacedPoints(quality ? 220 : 120);
    const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(point.x, 0, point.y)), true);
    return new THREE.TubeGeometry(curve, quality ? 180 : 110, orbit.thickness, quality ? 10 : 6, true);
  }, [orbit, quality]);

  return (
    <mesh geometry={geometry} rotation={[orbit.tiltX, 0, orbit.tiltZ]}>
      <meshPhysicalMaterial
        color="#d6e5ff"
        transparent
        opacity={compact ? orbit.opacity * 0.9 : orbit.opacity}
        roughness={0.42}
        metalness={0.14}
        emissive="#6b94f3"
        emissiveIntensity={0.1}
        clearcoat={0.92}
        clearcoatRoughness={0.34}
      />
    </mesh>
  );
};

function makeCoreHighlightTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 192;
  canvas.height = 120;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const gradient = ctx.createRadialGradient(76, 54, 8, 96, 60, 68);
  gradient.addColorStop(0, "rgba(255,255,255,0.72)");
  gradient.addColorStop(0.5, "rgba(214,228,255,0.32)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 192, 120);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function makeIATextTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 176;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "rgba(238,247,255,0.98)");
  gradient.addColorStop(1, "rgba(174,209,255,0.98)");
  ctx.fillStyle = gradient;
  ctx.shadowColor = "rgba(149,196,255,0.55)";
  ctx.shadowBlur = 18;
  ctx.font = "700 118px Manrope, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("IA", canvas.width / 2, canvas.height / 2 + 2);
  ctx.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function makeIconTextures() {
  const kinds: IconKind[] = ["chat", "gear", "chart", "cloud", "db", "flow", "bot", "shield"];
  const result = {} as Record<IconKind, THREE.Texture>;

  kinds.forEach((kind) => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawTileFace(ctx, kind, canvas.width);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    result[kind] = texture;
  });

  return result;
}

function makeSceneHaloTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const radial = ctx.createRadialGradient(320, 300, 30, 320, 320, 280);
  radial.addColorStop(0, "rgba(190,216,255,0.42)");
  radial.addColorStop(0.35, "rgba(114,156,255,0.18)");
  radial.addColorStop(0.8, "rgba(68,98,170,0.06)");
  radial.addColorStop(1, "rgba(6,9,15,0)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 640, 640);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function makeSpikeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "rgba(98,214,255,0)");
  grad.addColorStop(0.25, "rgba(98,214,255,0.58)");
  grad.addColorStop(0.5, "rgba(190,240,255,0.96)");
  grad.addColorStop(0.75, "rgba(98,214,255,0.5)");
  grad.addColorStop(1, "rgba(98,214,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function drawTileFace(ctx: CanvasRenderingContext2D, type: IconKind, width: number) {
  const panel = ctx.createLinearGradient(0, 0, width, width);
  panel.addColorStop(0, "rgba(34,48,74,0.95)");
  panel.addColorStop(1, "rgba(10,16,27,0.96)");
  ctx.fillStyle = panel;
  ctx.fillRect(0, 0, width, width);

  const glow = ctx.createRadialGradient(width * 0.5, width * 0.32, 10, width * 0.5, width * 0.48, width * 0.46);
  glow.addColorStop(0, "rgba(133,177,255,0.26)");
  glow.addColorStop(1, "rgba(10,16,27,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, width);

  ctx.strokeStyle = "rgba(210,228,255,0.98)";
  ctx.lineWidth = 11;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  drawIcon(ctx, type, width);
}

function drawIcon(ctx: CanvasRenderingContext2D, type: IconKind, width: number) {
  const c = width / 2;
  drawIconPath(ctx, type, c);
}

function drawIconPath(ctx: CanvasRenderingContext2D, type: IconKind, c: number) {
  if (type === "chat") {
    roundRectPath(ctx, c - 48, c - 44, 96, 70, 16);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(c - 14, c + 26);
    ctx.lineTo(c - 32, c + 46);
    ctx.lineTo(c - 4, c + 31);
    ctx.stroke();
    return;
  }
  if (type === "gear") {
    ctx.beginPath();
    ctx.arc(c, c, 42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(c, c, 18, 0, Math.PI * 2);
    ctx.stroke();
    return;
  }
  if (type === "chart") {
    ctx.beginPath();
    ctx.moveTo(c - 52, c + 44);
    ctx.lineTo(c - 52, c + 6);
    ctx.moveTo(c - 6, c + 44);
    ctx.lineTo(c - 6, c - 30);
    ctx.moveTo(c + 42, c + 44);
    ctx.lineTo(c + 42, c - 10);
    ctx.stroke();
    return;
  }
  if (type === "cloud") {
    ctx.beginPath();
    ctx.arc(c - 34, c + 8, 24, Math.PI * 0.7, Math.PI * 1.95);
    ctx.arc(c - 2, c - 12, 32, Math.PI, Math.PI * 2);
    ctx.arc(c + 36, c + 10, 20, Math.PI * 1.1, Math.PI * 2);
    ctx.stroke();
    return;
  }
  if (type === "db") {
    ctx.beginPath();
    ctx.ellipse(c, c - 34, 36, 14, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(c - 36, c - 34);
    ctx.lineTo(c - 36, c + 38);
    ctx.moveTo(c + 36, c - 34);
    ctx.lineTo(c + 36, c + 38);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(c, c + 38, 36, 14, 0, 0, Math.PI);
    ctx.stroke();
    return;
  }
  if (type === "flow") {
    ctx.beginPath();
    ctx.moveTo(c - 54, c - 28);
    ctx.lineTo(c - 12, c - 28);
    ctx.lineTo(c - 12, c + 24);
    ctx.lineTo(c + 48, c + 24);
    ctx.stroke();
    return;
  }
  if (type === "bot") {
    roundRectPath(ctx, c - 42, c - 38, 84, 68, 14);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(c, c - 56);
    ctx.lineTo(c, c - 40);
    ctx.moveTo(c - 16, c - 6);
    ctx.lineTo(c - 15, c - 6);
    ctx.moveTo(c + 16, c - 6);
    ctx.lineTo(c + 15, c - 6);
    ctx.stroke();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(c, c - 56);
  ctx.lineTo(c - 42, c - 22);
  ctx.lineTo(c - 33, c + 44);
  ctx.lineTo(c + 33, c + 44);
  ctx.lineTo(c + 42, c - 22);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(c - 16, c + 4);
  ctx.lineTo(c - 2, c + 18);
  ctx.lineTo(c + 20, c - 12);
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
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}
