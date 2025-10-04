export function BaseFace() {
  return (
    <g>
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="4" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        <radialGradient id="grad1" cx="50%" cy="40%" r="60%" fx="50%" fy="40%">
          <stop offset="0%" style={{stopColor: 'hsl(54, 100%, 70%)', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: 'hsl(51, 100%, 50%)', stopOpacity: 1}} />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill="url(#grad1)" filter="url(#shadow)" />
    </g>
  );
}
