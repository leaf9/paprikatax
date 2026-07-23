// The beard-token medallion — the page's visual anchor tying back to the ad.
// Inspired by the 1698 Russian beard-tax token: a stamped coin proving the
// bearer paid for the right to keep his beard.
export default function TokenCoin({ className }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Beard tax token, 1698">
      <defs>
        <radialGradient id="coinFace" cx="38%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#e8b45a" />
          <stop offset="55%" stopColor="#d9a441" />
          <stop offset="100%" stopColor="#a8752a" />
        </radialGradient>
        <radialGradient id="coinRim" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#c58f33" />
          <stop offset="100%" stopColor="#8a5d1f" />
        </radialGradient>
        <path id="arcTop" d="M 100 100 m -68 0 a 68 68 0 1 1 136 0" />
        <path id="arcBottom" d="M 100 100 m -68 0 a 68 68 0 1 0 136 0" />
      </defs>

      <circle cx="100" cy="100" r="97" fill="url(#coinRim)" />
      <circle cx="100" cy="100" r="88" fill="url(#coinFace)" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#7a521b" strokeWidth="1.5" opacity="0.6" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="#7a521b" strokeWidth="1.5" opacity="0.55" />

      {/* rim notches */}
      {Array.from({ length: 48 }).map((_, i) => {
        const a = (i / 48) * Math.PI * 2
        const x1 = 100 + Math.cos(a) * 90
        const y1 = 100 + Math.sin(a) * 90
        const x2 = 100 + Math.cos(a) * 95
        const y2 = 100 + Math.sin(a) * 95
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7a521b" strokeWidth="2" opacity="0.5" />
      })}

      <text fontFamily="Georgia, serif" fontSize="13.5" fontWeight="700" letterSpacing="3.2" fill="#6b4718">
        <textPath href="#arcTop" startOffset="50%" textAnchor="middle">
          THE BEARD TAX
        </textPath>
      </text>
      <text fontFamily="Georgia, serif" fontSize="13.5" fontWeight="700" letterSpacing="3.4" fill="#6b4718">
        <textPath href="#arcBottom" startOffset="50%" textAnchor="middle">
          TOKEN · PAID · 1698
        </textPath>
      </text>

      {/* mustache + beard mark, stamped style */}
      <g fill="#6b4718">
        <path d="M100 76 c -7 -8 -20 -9 -26 -2 c -5 6 -12 6 -16 3 c 3 8 14 11 21 7 c 8 -4 13 -4 21 -1 c 8 -3 13 -3 21 1 c 7 4 18 1 21 -7 c -4 3 -11 3 -16 -3 c -6 -7 -19 -6 -26 2 z" />
        <path d="M74 92 c 0 -3 52 -3 52 0 c 2 16 -4 34 -26 42 c -22 -8 -28 -26 -26 -42 z M84 96 c -0.5 10 3 22 16 28 c 13 -6 16.5 -18 16 -28 c -10 2 -22 2 -32 0 z" />
      </g>
    </svg>
  )
}
