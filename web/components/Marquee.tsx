const items = ["AI email writer", "Smart segments", "Automated campaigns", "Drag & drop builder", "Open & click tracking", "Your own sending domain", "Landing pages & forms", "White-label ready"];

export function Marquee() {
  return (
    <div className="relative mt-20 overflow-hidden border-y border-white/10 bg-white/[0.02] py-5" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-lg text-haze">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t} <span className="text-lime">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
