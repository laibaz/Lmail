export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="lm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A995FF" />
          <stop offset="0.55" stopColor="#7C5CFF" />
          <stop offset="1" stopColor="#FF6B9A" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#lm-g)" />
      <path d="M17 11h6.5v20H34v6H17z" fill="#fff" />
      <circle cx="36.5" cy="12.5" r="4" fill="#C6FF3D" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-xl font-bold tracking-tight text-white">LMAIL</span>
    </span>
  );
}
