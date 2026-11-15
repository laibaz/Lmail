// The LMAIL mark: a white L on the pink-to-blue brand gradient. Matches branding/lmail-icon.png.
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 512 512" aria-hidden="true">
        <defs>
          <linearGradient id="lmail-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#DB82AF" />
            <stop offset="0.55" stopColor="#7458A0" />
            <stop offset="1" stopColor="#244697" />
          </linearGradient>
        </defs>
        <rect width="512" height="512" rx="120" fill="url(#lmail-mark)" />
        <path d="M176 112h72v216h112v72H176z" fill="#fff" />
      </svg>
      <span className={`text-lg font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>LMAIL</span>
    </span>
  );
}
