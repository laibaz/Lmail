// "Elle", the LMAIL envelope mascot — violet edition.
export function Mascot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} role="img" aria-label="Elle, the LMAIL mascot">
      <defs>
        <linearGradient id="ms-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A995FF" />
          <stop offset="1" stopColor="#6A48F5" />
        </linearGradient>
      </defs>
      {/* antenna */}
      <path d="M120 44V24" stroke="#F5F3FF" strokeWidth="5" strokeLinecap="round" />
      <circle cx="120" cy="18" r="9" fill="#C6FF3D" />
      {/* arms */}
      <circle cx="36" cy="118" r="17" fill="#FF6B9A" />
      <circle cx="204" cy="146" r="17" fill="#FF6B9A" />
      {/* feet */}
      <ellipse cx="94" cy="208" rx="17" ry="12" fill="#5B3DF0" />
      <ellipse cx="146" cy="208" rx="17" ry="12" fill="#5B3DF0" />
      {/* body */}
      <rect x="52" y="44" width="136" height="150" rx="34" fill="url(#ms-body)" />
      {/* envelope flap */}
      <path d="M58 74l62 54 62-54" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {/* eyes */}
      <circle cx="96" cy="100" r="22" fill="#fff" />
      <circle cx="146" cy="96" r="22" fill="#fff" />
      <circle cx="102" cy="104" r="9" fill="#0B0B1A" />
      <circle cx="151" cy="99" r="9" fill="#0B0B1A" />
      <circle cx="105" cy="101" r="3" fill="#fff" />
      <circle cx="154" cy="96" r="3" fill="#fff" />
      {/* smile */}
      <path d="M98 150q22 20 46 0" fill="none" stroke="#0B0B1A" strokeWidth="6" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="80" cy="140" r="7" fill="#FF6B9A" opacity=".7" />
      <circle cx="162" cy="138" r="7" fill="#FF6B9A" opacity=".7" />
    </svg>
  );
}
