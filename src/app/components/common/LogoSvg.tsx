import { LOGO_MARK, LOGO_WORDMARK } from "./logo-paths";

export function LogoSvg() {
  return (
    <svg
      width="165"
      height="36"
      viewBox="0 0 165 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AI Launch Kit"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#85D2DB" />
          <stop offset="0.09" stopColor="#83CCD8" />
          <stop offset="0.2" stopColor="#81BCD2" />
          <stop offset="0.32" stopColor="#7CA2C7" />
          <stop offset="0.45" stopColor="#757EB7" />
          <stop offset="0.53" stopColor="#7165AD" />
          <stop offset="0.64" stopColor="#645CA8" />
          <stop offset="0.81" stopColor="#5A54A4" />
          <stop offset="1" stopColor="#5752A3" />
        </linearGradient>
      </defs>
      <path d={LOGO_MARK.p3be92e00} fill="url(#logoGrad)" />
      <path d={LOGO_MARK.p2287a280} fill="#5752A3" />
      {LOGO_WORDMARK.map((d, i) => (
        <path key={i} d={d} fill="white" />
      ))}
    </svg>
  );
}
