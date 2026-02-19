"use client";

const orbitNodesDesktop = [
  { top: "12%", left: "50%" },
  { top: "22%", left: "77%" },
  { top: "44%", left: "88%" },
  { top: "69%", left: "80%" },
  { top: "84%", left: "58%" },
  { top: "84%", left: "38%" },
  { top: "66%", left: "17%" },
  { top: "42%", left: "10%" },
  { top: "20%", left: "22%" },
];

const orbitNodesMobile = orbitNodesDesktop.slice(0, 6);

export const IconOrbit = ({ compact = false }: { compact?: boolean }) => {
  const nodes = compact ? orbitNodesMobile : orbitNodesDesktop;

  return (
    <div className="scene-orbit-stage relative mx-auto h-[23rem] w-full max-w-[32rem] md:h-[28rem]">
      <div className="scene-orbit-inner absolute inset-0 will-change-transform">
        <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10" />
        <div className="absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/15" />
        <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10" />

        <svg
          viewBox="0 0 600 420"
          className="scene-orbit-wire absolute inset-0 h-full w-full opacity-60"
          aria-hidden="true"
        >
          <ellipse cx="300" cy="210" rx="235" ry="115" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
          <ellipse cx="300" cy="210" rx="185" ry="86" fill="none" stroke="rgba(43,111,255,0.36)" strokeWidth="1.2" />
          <path
            d="M85 243 C 180 118, 420 118, 515 243"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
        </svg>

        <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),rgba(43,111,255,0.28)_40%,rgba(7,10,16,0.95)_80%)] shadow-[inset_0_1px_10px_rgba(255,255,255,0.16)]">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[2.3rem] font-semibold tracking-tight text-primary">
            IA
          </span>
        </div>

        {nodes.map((node, index) => (
          <div
            key={index}
            className="scene-orbit-node absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-white/[0.05] will-change-transform"
            style={{ top: node.top, left: node.left }}
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/60 bg-blue-400/30" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-10 bottom-6 h-16 rounded-full border border-white/10 bg-white/[0.02]" />
    </div>
  );
};
