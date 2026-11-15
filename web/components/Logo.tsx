// The LMAIL mark: a flat violet tile with a white L and a lime dot. Matches branding/lmail-icon.png.
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 512 512" aria-hidden="true">
        <rect width="512" height="512" rx="120" fill="#7C5CFF" />
        <path d="M176 112h72v216h112v72H176z" fill="#fff" />
        <circle cx="388" cy="132" r="36" fill="#C6FF3D" />
      </svg>
      <span className="text-lg font-semibold tracking-tight text-white">LMAIL</span>
    </span>
  );
}
