'use client';

/** Cute cyber-gamer panda mascot for the mission hero. */
export default function MissionHeroVector({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="gp-suit" x1="150" y1="140" x2="150" y2="420" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B3A52" />
          <stop offset="0.45" stopColor="#5C1424" />
          <stop offset="1" stopColor="#1A080E" />
        </linearGradient>
        <linearGradient id="gp-suit-light" x1="110" y1="160" x2="190" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E5B7A1" />
          <stop offset="1" stopColor="#7A1F38" />
        </linearGradient>
        <linearGradient id="gp-fur" x1="150" y1="20" x2="150" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F0E4DC" />
        </linearGradient>
        <linearGradient id="gp-dark" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#2C181E" />
          <stop offset="1" stopColor="#0C0608" />
        </linearGradient>
        <linearGradient id="gp-neon" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#FFD0DC" />
          <stop offset="0.4" stopColor="#E8366A" />
          <stop offset="1" stopColor="#9B1C3D" />
        </linearGradient>
        <linearGradient id="gp-bamboo" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#C8F5E0" />
          <stop offset="0.5" stopColor="#5EE0B0" />
          <stop offset="1" stopColor="#2A9A78" />
        </linearGradient>
        <linearGradient id="gp-visor" x1="110" y1="70" x2="190" y2="130" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(232,54,106,0.15)" />
          <stop offset="0.5" stopColor="rgba(155,28,61,0.35)" />
          <stop offset="1" stopColor="rgba(232,54,106,0.2)" />
        </linearGradient>
        <filter id="gp-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="gp-sh" x="-30%" y="-10%" width="160%" height="130%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      <g filter="url(#gp-sh)">
        {/* Soft ground */}
        <ellipse cx="150" cy="448" rx="78" ry="11" fill="rgba(0,0,0,0.32)" />

        {/* —— Bamboo staff (back hand) —— */}
        <g filter="url(#gp-glow)">
          <rect x="238" y="120" width="10" height="220" rx="5" fill="url(#gp-bamboo)" transform="rotate(8 243 230)" />
          <rect x="236" y="148" width="14" height="8" rx="2" fill="#9AF0D0" transform="rotate(8 243 152)" />
          <rect x="236" y="188" width="14" height="8" rx="2" fill="#9AF0D0" transform="rotate(8 243 192)" />
          <rect x="236" y="228" width="14" height="8" rx="2" fill="#9AF0D0" transform="rotate(8 243 232)" />
          {/* Leaf tip */}
          <ellipse cx="252" cy="118" rx="18" ry="10" fill="#E8366A" opacity="0.9" transform="rotate(-25 252 118)" />
          <ellipse cx="258" cy="108" rx="12" ry="7" fill="#C8F5E0" transform="rotate(-10 258 108)" />
        </g>

        {/* —— Legs —— */}
        <path
          d="M108 300c-4 0-16 6-18 18l-4 96c-1 14 10 24 24 24h20c14 0 24-10 23-24l-2-100c0-8-8-14-16-14h-27z"
          fill="url(#gp-suit)"
        />
        <path
          d="M192 300c4 0 16 6 18 18l4 96c1 14-10 24-24 24h-20c-14 0-24-10-23-24l2-100c0-8 8-14 16-14h27z"
          fill="url(#gp-suit)"
        />
        {/* Neon leg strips */}
        <rect x="118" y="318" width="4" height="88" rx="2" fill="url(#gp-neon)" filter="url(#gp-glow)" />
        <rect x="178" y="318" width="4" height="88" rx="2" fill="url(#gp-neon)" filter="url(#gp-glow)" />
        {/* Boots */}
        <path d="M86 420c2-10 14-16 34-16h16c16 0 26 8 24 20-2 10-14 16-32 16H108c-14 0-24-8-22-20z" fill="url(#gp-dark)" />
        <path d="M164 420c2-10 14-16 34-16h16c16 0 26 8 24 20-2 10-14 16-32 16H186c-14 0-24-8-22-20z" fill="url(#gp-dark)" />
        <rect x="100" y="428" width="28" height="4" rx="2" fill="#E8366A" opacity="0.7" />
        <rect x="178" y="428" width="28" height="4" rx="2" fill="#E8366A" opacity="0.7" />

        {/* —— Arms —— */}
        <path
          d="M96 188c-20 8-34 32-28 58l14 72c4 14 18 18 28 10l8-8V200c-4-8-12-12-22-12z"
          fill="url(#gp-suit)"
        />
        <path
          d="M204 188c20 8 34 32 28 58l-14 72c-4 14-18 18-28 10l-8-8V200c4-8 12-12 22-12z"
          fill="url(#gp-suit)"
        />
        <rect x="78" y="220" width="3.5" height="70" rx="1.75" fill="url(#gp-neon)" filter="url(#gp-glow)" />
        <rect x="218" y="220" width="3.5" height="70" rx="1.75" fill="url(#gp-neon)" filter="url(#gp-glow)" />
        {/* Paws */}
        <ellipse cx="78" cy="332" rx="20" ry="18" fill="url(#gp-dark)" />
        <ellipse cx="222" cy="328" rx="20" ry="18" fill="url(#gp-dark)" />
        <ellipse cx="74" cy="328" rx="6" ry="5" fill="rgba(232,54,106,0.35)" />
        <ellipse cx="218" cy="324" rx="6" ry="5" fill="rgba(232,54,106,0.35)" />

        {/* —— Torso armor —— */}
        <path
          d="M98 175c12-14 28-22 52-22s40 8 52 22l6 14c-12 8-32 14-58 14s-46-6-58-14l6-14z"
          fill="url(#gp-suit-light)"
        />
        <path
          d="M90 186c8-4 26-10 60-10s52 6 60 10v112c0 28-26 46-60 46s-60-18-60-46V186z"
          fill="url(#gp-suit)"
        />
        {/* Shoulder pads */}
        <ellipse cx="96" cy="196" rx="22" ry="16" fill="#5C2038" />
        <ellipse cx="204" cy="196" rx="22" ry="16" fill="#5C2038" />
        <path d="M84 192h20M196 192h20" stroke="#E8366A" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

        {/* Controller chest plate */}
        <rect
          x="114"
          y="218"
          width="72"
          height="58"
          rx="14"
          fill="#1A1424"
          stroke="#E5B7A1"
          strokeWidth="1.8"
        />
        {/* D-pad */}
        <rect x="128" y="236" width="18" height="6" rx="2" fill="#E8366A" />
        <rect x="134" y="230" width="6" height="18" rx="2" fill="#E8366A" />
        {/* Action buttons */}
        <circle cx="168" cy="234" r="5" fill="#FF6B8A" />
        <circle cx="178" cy="242" r="5" fill="#E8366A" />
        <circle cx="168" cy="250" r="5" fill="#E5B7A1" />
        <circle cx="158" cy="242" r="5" fill="#FFE08A" />
        {/* Soft glow line under plate */}
        <rect x="126" y="282" width="48" height="3" rx="1.5" fill="#E8366A" opacity="0.55" filter="url(#gp-glow)" />

        {/* —— Head —— */}
        <circle cx="150" cy="108" r="78" fill="url(#gp-fur)" />

        {/* Ears */}
        <circle cx="88" cy="48" r="30" fill="url(#gp-dark)" />
        <circle cx="212" cy="48" r="30" fill="url(#gp-dark)" />
        <circle cx="88" cy="48" r="13" fill="#4A3F58" />
        <circle cx="212" cy="48" r="13" fill="#4A3F58" />

        {/* Eye patches */}
        <ellipse cx="120" cy="110" rx="26" ry="30" fill="url(#gp-dark)" transform="rotate(-12 120 110)" />
        <ellipse cx="180" cy="110" rx="26" ry="30" fill="url(#gp-dark)" transform="rotate(12 180 110)" />

        {/* Big glossy eyes */}
        <ellipse cx="122" cy="112" rx="14" ry="16" fill="#fff" />
        <ellipse cx="178" cy="112" rx="14" ry="16" fill="#fff" />
        <ellipse cx="124" cy="114" rx="8" ry="9" fill="#1A1424" />
        <ellipse cx="180" cy="114" rx="8" ry="9" fill="#1A1424" />
        <circle cx="128" cy="108" r="3.5" fill="#fff" />
        <circle cx="184" cy="108" r="3.5" fill="#fff" />
        <circle cx="118" cy="120" r="1.6" fill="#fff" opacity="0.75" />
        <circle cx="174" cy="120" r="1.6" fill="#fff" opacity="0.75" />

        {/* Nose + smile */}
        <ellipse cx="150" cy="142" rx="11" ry="8" fill="#0E0A14" />
        <ellipse cx="147" cy="140" rx="3.2" ry="2" fill="rgba(255,255,255,0.4)" />
        <path
          d="M136 154c6 11 22 11 28 0"
          stroke="#0E0A14"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="98" cy="138" rx="12" ry="7" fill="rgba(255,150,170,0.35)" />
        <ellipse cx="202" cy="138" rx="12" ry="7" fill="rgba(255,150,170,0.35)" />

        {/* Headset band */}
        <path
          d="M78 100c8-36 36-58 72-58s64 22 72 58"
          stroke="#2A1A3A"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M80 100c8-34 34-54 70-54s62 20 70 54"
          stroke="#E8366A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
          filter="url(#gp-glow)"
        />
        {/* Ear cups */}
        <rect x="58" y="88" width="28" height="40" rx="12" fill="url(#gp-dark)" stroke="#E8366A" strokeWidth="2" />
        <rect x="214" y="88" width="28" height="40" rx="12" fill="url(#gp-dark)" stroke="#E8366A" strokeWidth="2" />
        {/* Mic boom */}
        <path
          d="M72 120c-18 8-28 28-22 44"
          stroke="#E8366A"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#gp-glow)"
        />
        <circle cx="52" cy="166" r="8" fill="#1A1424" stroke="#E8366A" strokeWidth="2" />
        <circle cx="52" cy="166" r="3" fill="#E8366A" />

        {/* Soft visor */}
        <path
          d="M98 96c12-8 28-12 52-12s40 4 52 12v28c-14 10-34 16-52 16s-38-6-52-16V96z"
          fill="url(#gp-visor)"
          stroke="rgba(232,54,106,0.45)"
          strokeWidth="1.5"
        />
        <path
          d="M108 102c10-4 24-6 42-6"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Forehead shine */}
        <ellipse cx="150" cy="72" rx="26" ry="12" fill="rgba(255,255,255,0.35)" />
      </g>
    </svg>
  );
}
