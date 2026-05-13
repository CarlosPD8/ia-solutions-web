"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, type MutableRefObject, type PointerEventHandler } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type IconKind = "react" | "whatsapp" | "n8n" | "sql" | "nextjs" | "docker" | "gmail" | "github";

type PlanetConfig = {
  icon: IconKind;
  orbit: 0 | 1 | 2 | 3;
  angleOffset: number;
  speedFactor: number;
  size: number;
};

const CORE_RADIUS = 0.86;
const CORE_BASE_ROTATION_SPEED = 0.14;
const CORE_IDLE_TILT_X = -0.18;
const CORE_IDLE_TILT_Z = -0.05;
const TILE_FLOAT_AMPLITUDE = 0.034;
const MOBILE_PLANET_COUNT = 5;
const CORE_TEXT_Z = CORE_RADIUS * 0.7;
const BASE_RING_RADIUS = 1.84;
const BASE_RING_Y = -1.44;
const SYSTEM_SCALE_DESKTOP = 0.98;
const SYSTEM_SCALE_MOBILE = 0.9;
const DRAG_SENSITIVITY = 0.0056;
const MAX_DRAG_TILT_X = 0.24;
const MAX_DRAG_TILT_Y = 0.58;
const IA_LABEL_Y = 0.12;
const IA_LABEL_Z = 1.16;

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
  { radiusX: 2.2, radiusZ: 1.42, tiltX: 1.22, tiltZ: 0.36, speed: 0.32, thickness: 0.012, opacity: 0.26 },
  { radiusX: 1.94, radiusZ: 1.2, tiltX: 1.04, tiltZ: -0.46, speed: -0.41, thickness: 0.011, opacity: 0.22 },
  { radiusX: 1.66, radiusZ: 1.08, tiltX: 1.36, tiltZ: 0.91, speed: 0.5, thickness: 0.01, opacity: 0.2 },
  { radiusX: 1.28, radiusZ: 0.9, tiltX: 1.12, tiltZ: -0.82, speed: -0.58, thickness: 0.01, opacity: 0.18 },
];

const PLANETS: PlanetConfig[] = [
  { icon: "react", orbit: 0, angleOffset: 0.2, speedFactor: 0.95, size: 0.60 },
  { icon: "whatsapp", orbit: 1, angleOffset: 1.65, speedFactor: 0.92, size: 0.58 },
  { icon: "n8n", orbit: 0, angleOffset: 3.72, speedFactor: 1.01, size: 0.60 },
  { icon: "sql", orbit: 2, angleOffset: 0.86, speedFactor: 1.06, size: 0.56 },
  { icon: "nextjs", orbit: 1, angleOffset: 3.02, speedFactor: 0.98, size: 0.56 },
  { icon: "docker", orbit: 3, angleOffset: 5.18, speedFactor: 1.08, size: 0.53 },
  { icon: "gmail", orbit: 2, angleOffset: 2.26, speedFactor: 1.1, size: 0.51 },
  { icon: "github", orbit: 3, angleOffset: 4.5, speedFactor: 1.12, size: 0.51 },
];

const ICON_TEXTURE_URLS: Record<IconKind, string> = {
  react: "/brand-icons/react.svg",
  whatsapp: "/brand-icons/whatsapp.svg",
  n8n: "/brand-icons/n8n.svg",
  sql: "/brand-icons/sql.svg",
  nextjs: "/brand-icons/nextjs.svg",
  docker: "/brand-icons/docker.svg",
  gmail: "/brand-icons/gmail.svg",
  github: "/brand-icons/github.svg",
};

const ICON_META: Record<IconKind, { bg: string; glow: string }> = {
  react:    { bg: "#0d2a3b", glow: "#61dafb" },
  whatsapp: { bg: "#075e54", glow: "#25d366" },
  n8n:      { bg: "#2a1020", glow: "#ea4b71" },
  sql:      { bg: "#0d3349", glow: "#00758f" },
  nextjs:   { bg: "#111111", glow: "#e0e0e0" },
  docker:   { bg: "#0e3a5a", glow: "#2496ed" },
  gmail:    { bg: "#2a0d0d", glow: "#ea4335" },
  github:   { bg: "#0d1117", glow: "#8b949e" },
};

export const IconOrbit = ({ compact = false }: { compact?: boolean }) => {
  const reduceMotion = usePrefersReducedMotion();
  const dragTilt = useRef({ x: 0, y: 0 });
  const dragState = useRef({ active: false, pointerId: -1, lastX: 0, lastY: 0 });

  const planets = compact ? PLANETS.slice(0, MOBILE_PLANET_COUNT) : PLANETS;
  const quality = !compact && !reduceMotion;

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragState.current = {
      active: true,
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY,
    };

    if (event.pointerType !== "mouse") {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
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
      if (event.pointerType !== "mouse" && event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    }
  };

  return (
    <div
      className="relative mx-auto h-[23rem] w-full max-w-[32rem] cursor-grab active:cursor-grabbing md:h-[28rem]"
      style={{ touchAction: compact ? "none" : "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointerDrag}
      onPointerLeave={endPointerDrag}
      onPointerCancel={endPointerDrag}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(460px_260px_at_48%_46%,rgba(112,158,255,0.16),rgba(7,10,16,0)_70%)]" />
      <Canvas
        dpr={compact ? [1, 1.2] : [1, 1.7]}
        camera={{ position: compact ? [0.56, 0.67, 7.95] : [0.64, 0.76, 7.25], fov: compact ? 37 : 34 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = compact ? 1.12 : 1.22;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <ambientLight intensity={0.22} color="#8ab5f8" />
        <hemisphereLight intensity={0.26} color="#e8eeff" groundColor="#04060f" />
        <directionalLight position={[6, 5, 6]} intensity={1.3} color="#f0f5ff" />
        <directionalLight position={[-5, 3, -4]} intensity={0.62} color="#818cf8" />
        <pointLight position={[0.1, 0.1, 2.2]} intensity={1.1} color="#6e95ff" />
        <pointLight position={[-3.2, -2, 4.5]} intensity={0.48} color="#5046e5" />
        <pointLight position={[2.5, 3.2, -3.5]} intensity={0.62} color="#c7d2fe" />
        <pointLight position={[-1.5, -2.5, -2]} intensity={0.26} color="#2255dd" />
        <Suspense fallback={<SolarFallback compact={compact} />}>
          <SolarSystem
            planets={planets}
            compact={compact}
            quality={quality}
            reduceMotion={reduceMotion}
            dragTilt={dragTilt}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

const SolarFallback = ({ compact }: { compact: boolean }) => (
  <group scale={compact ? SYSTEM_SCALE_MOBILE : SYSTEM_SCALE_DESKTOP}>
    <mesh position={[0, BASE_RING_Y, 0]} rotation-x={Math.PI / 2}>
      <torusGeometry args={[BASE_RING_RADIUS, 0.07, 20, 96]} />
      <meshBasicMaterial color="#59bcff" transparent opacity={0.7} />
    </mesh>
    <mesh position={[0, 0.08, 0]}>
      <sphereGeometry args={[CORE_RADIUS * 0.96, 38, 38]} />
      <meshBasicMaterial color="#3abfff" transparent opacity={0.22} />
    </mesh>
  </group>
);

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
  const iaLabelRef = useRef<THREE.Mesh | null>(null);
  const spinRef = useRef(0);
  const planetRefs = useRef<THREE.Group[]>([]);

  const iconTextures = useMemo(() => {
    const map = {} as Record<IconKind, THREE.CanvasTexture>;
    (Object.keys(ICON_TEXTURE_URLS) as IconKind[]).forEach((kind) => {
      map[kind] = makeIconTexture(kind, ICON_TEXTURE_URLS[kind]);
    });
    return map;
  }, []);
  const iaTextTexture = useMemo(() => makeIATextTexture(), []);
  const sceneHalo = useMemo(() => makeSceneHaloTexture(), []);

  useEffect(
    () => () => {
      Object.values(iconTextures).forEach((t) => t.dispose());
      iaTextTexture.dispose();
      sceneHalo.dispose();
    },
    [iconTextures, iaTextTexture, sceneHalo],
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

    if (iaLabelRef.current) {
      iaLabelRef.current.quaternion.copy(camera.quaternion);
    }

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
    <>
    <group ref={rigRef} scale={compact ? SYSTEM_SCALE_MOBILE : SYSTEM_SCALE_DESKTOP}>
      <mesh position={[0, -0.34, -0.1]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[2.86, quality ? 120 : 84]} />
        <meshBasicMaterial map={sceneHalo} transparent opacity={0.22} depthWrite={false} depthTest={false} />
      </mesh>

      <group position={[0, BASE_RING_Y, 0]} rotation-x={Math.PI / 2}>
        <mesh>
          <torusGeometry args={[BASE_RING_RADIUS, 0.065, 24, quality ? 200 : 120]} />
          <meshPhysicalMaterial
            color="#5080ff"
            transparent
            opacity={1}
            roughness={0.12}
            metalness={0.08}
            emissive="#2a50ff"
            emissiveIntensity={1.3}
            clearcoat={1}
            clearcoatRoughness={0.18}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <torusGeometry args={[BASE_RING_RADIUS, 0.2, 12, quality ? 160 : 96]} />
          <meshBasicMaterial
            color="#6080ff"
            transparent
            opacity={0.16}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <torusGeometry args={[BASE_RING_RADIUS * 0.96, 0.038, 12, quality ? 120 : 72]} />
          <meshBasicMaterial
            color="#a0b8ff"
            transparent
            opacity={0.28}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      <group position={[0, 0.08, 0]}>
        {ORBITS.map((orbit, index) => (
          <OrbitTube key={index} orbit={orbit} quality={quality} compact={compact} />
        ))}

        <mesh>
          <sphereGeometry args={[CORE_RADIUS, quality ? 100 : 58, quality ? 100 : 58]} />
          <meshPhysicalMaterial
            color="#1640ff"
            transparent
            opacity={0.15}
            transmission={0.82}
            thickness={1.6}
            roughness={0.03}
            metalness={0.0}
            emissive="#3560ff"
            emissiveIntensity={0.68}
            clearcoat={1}
            clearcoatRoughness={0.04}
            iridescence={0.78}
            iridescenceIOR={1.46}
            iridescenceThicknessRange={[120, 900]}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[CORE_RADIUS * 0.984, quality ? 24 : 14, quality ? 16 : 10]} />
          <meshBasicMaterial
            color="#4f72ff"
            wireframe
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh rotation={[0.18, 0.48, 0.1]}>
          <sphereGeometry args={[CORE_RADIUS * 1.012, quality ? 17 : 11, quality ? 12 : 8]} />
          <meshBasicMaterial
            color="#8090ff"
            wireframe
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[CORE_RADIUS * 1.05, quality ? 64 : 40, quality ? 64 : 40]} />
          <meshBasicMaterial
            color="#4060ff"
            transparent
            opacity={0.2}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
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
          <mesh renderOrder={1}>
            <circleGeometry args={[planet.size * 0.58, 48]} />
            <meshBasicMaterial
              color={ICON_META[planet.icon].glow}
              transparent
              opacity={0.28}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <mesh renderOrder={3}>
            <planeGeometry args={[planet.size * 0.88, planet.size * 0.88]} />
            <meshBasicMaterial
              map={iconTextures[planet.icon]}
              transparent
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
    <mesh ref={iaLabelRef} position={[0, IA_LABEL_Y, IA_LABEL_Z]} renderOrder={30}>
      <planeGeometry args={[0.74, 0.36]} />
      <meshBasicMaterial map={iaTextTexture} transparent depthWrite={false} depthTest={false} />
    </mesh>
    </>
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
        color="#b0c4ff"
        transparent
        opacity={compact ? orbit.opacity * 0.95 : orbit.opacity * 1.3}
        roughness={0.08}
        metalness={0.0}
        emissive="#7080ff"
        emissiveIntensity={1.6}
        clearcoat={1}
        clearcoatRoughness={0.08}
      />
    </mesh>
  );
};

function makeIconTexture(kind: IconKind, svgUrl: string): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const meta = ICON_META[kind];
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 3;

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = meta.bg;
  ctx.fill();

  const inner = ctx.createRadialGradient(cx, cy * 0.7, 4, cx, cy, r);
  inner.addColorStop(0, "rgba(255,255,255,0.14)");
  inner.addColorStop(1, "rgba(0,0,0,0)");
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = inner;
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  const img = new window.Image();
  img.onload = () => {
    const pad = size * 0.18;
    ctx.drawImage(img, pad, pad, size - pad * 2, size - pad * 2);
    texture.needsUpdate = true;
  };
  img.src = svgUrl;

  return texture;
}

function makeIATextTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 224;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "800 148px Manrope, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.shadowColor = "rgba(90, 150, 255, 0.7)";
  ctx.shadowBlur = 52;
  const gradient = ctx.createLinearGradient(80, 0, canvas.width - 80, canvas.height);
  gradient.addColorStop(0, "rgba(232, 244, 255, 1)");
  gradient.addColorStop(0.48, "rgba(200, 225, 255, 0.99)");
  gradient.addColorStop(1, "rgba(170, 202, 255, 0.97)");
  ctx.fillStyle = gradient;
  ctx.fillText("IA", canvas.width / 2, canvas.height / 2 + 2);

  ctx.shadowColor = "rgba(70, 120, 255, 0.45)";
  ctx.shadowBlur = 90;
  ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
  ctx.fillText("IA", canvas.width / 2, canvas.height / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function makeSceneHaloTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 800;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  const radial = ctx.createRadialGradient(400, 388, 14, 400, 400, 380);
  radial.addColorStop(0, "rgba(140, 188, 255, 0.58)");
  radial.addColorStop(0.22, "rgba(80, 138, 255, 0.38)");
  radial.addColorStop(0.48, "rgba(105, 68, 240, 0.16)");
  radial.addColorStop(0.72, "rgba(38, 68, 200, 0.07)");
  radial.addColorStop(1, "rgba(6, 9, 15, 0)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 800, 800);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

