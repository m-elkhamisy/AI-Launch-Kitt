import { LogoSvg } from "./LogoSvg";

export function TopHeader() {
  return (
    <div
      className="relative flex items-center"
      style={{
        height: 84,
        background: "#0b0b0b",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "'Montserrat', sans-serif",
        padding: "0 clamp(16px, 4vw, 32px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <LogoSvg />
      </div>

      {/* Right side actions */}
      
    </div>
  );
}
