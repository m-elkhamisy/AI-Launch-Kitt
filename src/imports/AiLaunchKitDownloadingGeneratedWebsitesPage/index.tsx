import svgPaths from "./svg-7argp47g3q";

function Logo() {
  return (
    <div className="absolute h-[36px] left-[32px] top-[24px] w-[165px]" data-name="logo">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 165 36">
        <g id="logo">
          <g id="Vector">
            <path d={svgPaths.p3be92e00} fill="url(#paint0_linear_1_1777)" />
            <path d={svgPaths.p2287a280} fill="var(--fill-0, #5752A3)" />
          </g>
          <g id="Vector_2">
            <path d={svgPaths.p2fa07e00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2f3d3c70} fill="var(--fill-0, white)" />
            <path d={svgPaths.pe78e200} fill="var(--fill-0, white)" />
            <path d={svgPaths.p27836100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2fc8e300} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3941f000} fill="var(--fill-0, white)" />
            <path d={svgPaths.p26151d0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1ca86300} fill="var(--fill-0, white)" />
            <path d={svgPaths.p9dbcb00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p244d5780} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1b270770} fill="var(--fill-0, white)" />
            <path d={svgPaths.p26b86d00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p30825a00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p13646200} fill="var(--fill-0, white)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1777" x1="8.87992" x2="44.4204" y1="18" y2="18">
            <stop stopColor="#85D2DB" />
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
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Bold / Essentional, UI / Bolt">
        <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
            <path d={svgPaths.p3e76600} fill="var(--fill-0, white)" fillOpacity="0.2" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-white whitespace-nowrap">Ask AI</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Bold / Essentional, UI / Question Circle">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.pbcad900} fill="var(--fill-0, white)" fillOpacity="0.2" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-white whitespace-nowrap">{`Help & Support`}</p>
    </div>
  );
}

function User() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="user">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="user">
          <path d={svgPaths.p61d9400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ProfileAvatar() {
  return (
    <div className="bg-[#0f766e] content-stretch flex flex-col items-center justify-center relative rounded-[18px] shrink-0 size-[36px]" data-name="profile-avatar">
      <User />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center right-[32px] top-[24px]">
      <Frame />
      <Frame1 />
      <ProfileAvatar />
    </div>
  );
}

function Header() {
  return (
    <div className="-translate-x-1/2 absolute backdrop-blur-[20px] border-[rgba(255,255,255,0.1)] border-b border-solid h-[84px] left-1/2 top-0 w-[1440px]" data-name="header">
      <Logo />
      <Frame2 />
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="check">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="check">
          <path d={svgPaths.pf2a7e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SuccessIcon() {
  return (
    <div className="bg-[#6fccdd] content-stretch flex flex-col items-center justify-center relative rounded-[28px] shrink-0 size-[56px]" data-name="success-icon">
      <Check />
    </div>
  );
}

function SuccessText() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center relative shrink-0 text-center w-[640px]" data-name="success-text">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white whitespace-nowrap">Your website is ready!</p>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] min-w-full relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-[min-content]">Download it, connect a domain, or deploy it live.</p>
    </div>
  );
}

function SuccessSection() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="success-section">
      <SuccessIcon />
      <SuccessText />
    </div>
  );
}

function WindowControls() {
  return (
    <div className="h-[10px] relative shrink-0 w-[46px]" data-name="window-controls">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 10">
        <g id="window-controls">
          <circle cx="5" cy="5" fill="var(--fill-0, #6FCCDD)" id="Ellipse" opacity="0.9" r="5" />
          <circle cx="23" cy="5" fill="var(--fill-0, #6FCCDD)" id="Ellipse_2" opacity="0.55" r="5" />
          <circle cx="41" cy="5" fill="var(--fill-0, #6FCCDD)" id="Ellipse_3" opacity="0.25" r="5" />
        </g>
      </svg>
    </div>
  );
}

function Lock() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="lock">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_2169)" id="lock">
          <path d={svgPaths.p28fe0540} id="Vector" stroke="var(--stroke-0, #8A8A9A)" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_1_2169">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AddressBar() {
  return (
    <div className="bg-[#1a1a1a] content-stretch flex gap-[8px] h-[28px] items-center px-[12px] relative rounded-[8px] shrink-0 w-[420px]" data-name="address-bar">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Lock />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] min-w-px overflow-hidden relative text-[#8a8a9a] text-[12px] text-ellipsis whitespace-nowrap">{`https://example.com`}</p>
    </div>
  );
}

function RotateCw() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="rotate-cw">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="rotate-cw">
          <path d={svgPaths.p10b47de0} id="Vector" stroke="var(--stroke-0, #8A8A9A)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Share() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="share-2">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="share-2">
          <path d={svgPaths.p1a8f0a00} id="Vector" stroke="var(--stroke-0, #8A8A9A)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ChromeActions() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="chrome-actions">
      <RotateCw />
      <Share />
    </div>
  );
}

function BrowserChrome() {
  return (
    <div className="bg-[#0d0d0d] h-[44px] relative shrink-0 w-full" data-name="browser-chrome">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] relative size-full">
          <WindowControls />
          <AddressBar />
          <ChromeActions />
        </div>
      </div>
    </div>
  );
}

function Logo1() {
  return <div className="bg-[#2a2a2a] h-[20px] relative rounded-[6px] shrink-0 w-[72px]" data-name="logo" />;
}

function NavPill() {
  return <div className="bg-[#2a2a2a] h-[18px] relative rounded-[999px] shrink-0 w-[28px]" data-name="nav-pill-1" />;
}

function NavPill1() {
  return <div className="bg-[#2a2a2a] h-[18px] relative rounded-[999px] shrink-0 w-[28px]" data-name="nav-pill-2" />;
}

function NavPill2() {
  return <div className="bg-[#2a2a2a] h-[18px] relative rounded-[999px] shrink-0 w-[28px]" data-name="nav-pill-3" />;
}

function NavLinks() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="nav-links">
      <NavPill />
      <NavPill1 />
      <NavPill2 />
    </div>
  );
}

function Navbar() {
  return (
    <div className="bg-[#1e1e1e] content-stretch flex h-[32px] items-center justify-between relative rounded-[8px] shrink-0 w-full" data-name="navbar">
      <Logo1 />
      <NavLinks />
    </div>
  );
}

function H() {
  return <div className="bg-white h-[18px] relative rounded-[6px] shrink-0 w-[520px]" data-name="h1-1" />;
}

function H1() {
  return <div className="bg-white h-[18px] relative rounded-[6px] shrink-0 w-[420px]" data-name="h1-2" />;
}

function Headline() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="headline">
      <H />
      <H1 />
    </div>
  );
}

function Sub() {
  return <div className="bg-[#8a8a9a] h-[10px] opacity-55 relative rounded-[4px] shrink-0 w-[360px]" data-name="sub-1" />;
}

function Sub1() {
  return <div className="bg-[#8a8a9a] h-[10px] opacity-55 relative rounded-[4px] shrink-0 w-[300px]" data-name="sub-2" />;
}

function Subtitle() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="subtitle">
      <Sub />
      <Sub1 />
    </div>
  );
}

function Cta() {
  return (
    <div className="bg-[#6fccdd] content-stretch flex h-[28px] items-center justify-center px-[14px] relative rounded-[999px] shrink-0" data-name="cta">
      <p className="[word-break:break-word] font-['Montserrat:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0b0b0b] text-[12px] whitespace-nowrap">Get started</p>
    </div>
  );
}

function Hero() {
  return (
    <div className="bg-gradient-to-r from-[#0d1f2d] h-[200px] relative rounded-[10px] shrink-0 to-[#0b0b0b] w-full" data-name="hero">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative size-full">
          <div className="-translate-y-1/2 absolute right-[-40px] size-[220px] top-1/2" data-name="teal-glow">
            <div className="absolute inset-[-27.27%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 340 340">
                <g filter="url(#filter0_f_1_2155)" id="teal-glow" opacity="0.12">
                  <circle cx="170" cy="170" fill="var(--fill-0, #6FCCDD)" r="110" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="340" id="filter0_f_1_2155" width="340" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1_2155" stdDeviation="30" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
          <Headline />
          <Subtitle />
          <Cta />
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return <div className="bg-[#6fccdd] relative rounded-[5px] shrink-0 size-[18px]" data-name="icon" />;
}

function Line() {
  return <div className="bg-[#8a8a9a] h-[10px] opacity-55 relative rounded-[4px] shrink-0 w-[180px]" data-name="line-1" />;
}

function Line1() {
  return <div className="bg-[#8a8a9a] h-[10px] opacity-55 relative rounded-[4px] shrink-0 w-[140px]" data-name="line-2" />;
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="text">
      <Line />
      <Line1 />
    </div>
  );
}

function FeatureCard() {
  return (
    <div className="bg-[#1a1a1a] flex-[1_0_0] h-full min-w-px relative rounded-[10px]" data-name="feature-card">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[10px] items-start p-[14px] relative size-full">
        <Icon />
        <Text />
      </div>
    </div>
  );
}

function Icon1() {
  return <div className="bg-[#6fccdd] relative rounded-[5px] shrink-0 size-[18px]" data-name="icon" />;
}

function Line2() {
  return <div className="bg-[#8a8a9a] h-[10px] opacity-55 relative rounded-[4px] shrink-0 w-[180px]" data-name="line-1" />;
}

function Line3() {
  return <div className="bg-[#8a8a9a] h-[10px] opacity-55 relative rounded-[4px] shrink-0 w-[140px]" data-name="line-2" />;
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="text">
      <Line2 />
      <Line3 />
    </div>
  );
}

function FeatureCard1() {
  return (
    <div className="bg-[#1a1a1a] flex-[1_0_0] h-full min-w-px relative rounded-[10px]" data-name="feature-card">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[10px] items-start p-[14px] relative size-full">
        <Icon1 />
        <Text1 />
      </div>
    </div>
  );
}

function Icon2() {
  return <div className="bg-[#6fccdd] relative rounded-[5px] shrink-0 size-[18px]" data-name="icon" />;
}

function Line4() {
  return <div className="bg-[#8a8a9a] h-[10px] opacity-55 relative rounded-[4px] shrink-0 w-[180px]" data-name="line-1" />;
}

function Line5() {
  return <div className="bg-[#8a8a9a] h-[10px] opacity-55 relative rounded-[4px] shrink-0 w-[140px]" data-name="line-2" />;
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="text">
      <Line4 />
      <Line5 />
    </div>
  );
}

function FeatureCard2() {
  return (
    <div className="bg-[#1a1a1a] flex-[1_0_0] h-full min-w-px relative rounded-[10px]" data-name="feature-card">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[10px] items-start p-[14px] relative size-full">
        <Icon2 />
        <Text2 />
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="content-stretch flex gap-[16px] h-[140px] items-start relative shrink-0 w-full" data-name="features">
      <FeatureCard />
      <FeatureCard1 />
      <FeatureCard2 />
    </div>
  );
}

function FooterDot() {
  return <div className="bg-[#8a8a9a] opacity-60 relative rounded-[3px] shrink-0 size-[6px]" data-name="footer-dot-1" />;
}

function FooterDot1() {
  return <div className="bg-[#8a8a9a] opacity-60 relative rounded-[3px] shrink-0 size-[6px]" data-name="footer-dot-2" />;
}

function FooterDot2() {
  return <div className="bg-[#8a8a9a] opacity-60 relative rounded-[3px] shrink-0 size-[6px]" data-name="footer-dot-3" />;
}

function FooterLeft() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="footer-left">
      <FooterDot />
      <FooterDot1 />
      <FooterDot2 />
    </div>
  );
}

function FooterPill() {
  return <div className="bg-[#2a2a2a] h-[10px] relative rounded-[999px] shrink-0 w-[18px]" data-name="footer-pill-1" />;
}

function FooterPill1() {
  return <div className="bg-[#2a2a2a] h-[10px] relative rounded-[999px] shrink-0 w-[18px]" data-name="footer-pill-2" />;
}

function FooterRight() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="footer-right">
      <FooterPill />
      <FooterPill1 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#111] content-stretch flex h-[32px] items-center justify-between relative rounded-[8px] shrink-0 w-full" data-name="footer">
      <FooterLeft />
      <FooterRight />
    </div>
  );
}

function PreviewContent() {
  return (
    <div className="bg-[#0d0d0d] flex-[1_0_0] min-h-px relative w-full" data-name="preview-content">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <Navbar />
        <Hero />
        <Features />
        <Footer />
      </div>
    </div>
  );
}

function BrowserMockup() {
  return (
    <div className="h-[240px] relative rounded-[16px] shrink-0 w-[680px]" data-name="browser-mockup">
      <div aria-hidden className="absolute bg-[#141414] inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <BrowserChrome />
        <PreviewContent />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_18px_0px_rgba(0,0,0,0.5)]" />
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_28px_-10px_rgba(0,0,0,0.4)]" />
    </div>
  );
}

function PreviewSection() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="preview-section">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] text-center uppercase whitespace-nowrap" style={{ fontFeatureSettings: '"case"' }}>
        Website preview
      </p>
      <BrowserMockup />
    </div>
  );
}

function Download() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="download">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="download">
          <path d={svgPaths.pdba8e90} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function DownloadIcon() {
  return (
    <div className="bg-[rgba(111,204,221,0.13)] content-stretch flex flex-col items-center justify-center relative rounded-[10px] shrink-0 size-[40px]" data-name="download-icon">
      <Download />
    </div>
  );
}

function DownloadText() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="download-text">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-white w-full">Download as HTML</p>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Export the source code and host it anywhere</p>
    </div>
  );
}

function Spacer() {
  return <div className="flex-[1_0_0] min-h-px relative w-full" data-name="spacer" />;
}

function DownloadBtn() {
  return (
    <div className="bg-[#6fccdd] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="download-btn">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[16px] py-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Montserrat:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0b0b0b] text-[14px] whitespace-nowrap">Download HTML</p>
        </div>
      </div>
    </div>
  );
}

function CardDownload() {
  return (
    <div className="bg-[#141414] content-stretch flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] shrink-0 size-[216px]" data-name="card-download">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <DownloadIcon />
      <DownloadText />
      <Spacer />
      <DownloadBtn />
    </div>
  );
}

function Globe() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="globe">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="globe">
          <path d={svgPaths.p163a41e0} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function DomainIcon() {
  return (
    <div className="bg-[rgba(111,204,221,0.13)] content-stretch flex flex-col items-center justify-center relative rounded-[10px] shrink-0 size-[40px]" data-name="domain-icon">
      <Globe />
    </div>
  );
}

function DomainText() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="domain-text">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-white w-full">Buy a Domain</p>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Register a domain and connect it instantly</p>
    </div>
  );
}

function Spacer1() {
  return <div className="flex-[1_0_0] min-h-px relative w-full" data-name="spacer" />;
}

function DomainBtn() {
  return (
    <div className="bg-[#0b0b0b] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="domain-btn">
      <div aria-hidden className="absolute border border-[#6fccdd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[16px] py-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#6fccdd] text-[14px] uppercase whitespace-nowrap" style={{ fontFeatureSettings: '"case"' }}>
            Buy a Domain
          </p>
        </div>
      </div>
    </div>
  );
}

function CardDomain() {
  return (
    <div className="bg-[#141414] content-stretch flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] shrink-0 size-[216px]" data-name="card-domain">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <DomainIcon />
      <DomainText />
      <Spacer1 />
      <DomainBtn />
    </div>
  );
}

function Rocket() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="rocket">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="rocket">
          <path d={svgPaths.p3d0d0400} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function DeployIcon() {
  return (
    <div className="bg-[rgba(111,204,221,0.13)] content-stretch flex flex-col items-center justify-center relative rounded-[10px] shrink-0 size-[40px]" data-name="deploy-icon">
      <Rocket />
    </div>
  );
}

function DeployText() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="deploy-text">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-white w-full">Deploy to Domain</p>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Already own a domain? Go live in one click</p>
    </div>
  );
}

function Spacer2() {
  return <div className="flex-[1_0_0] min-h-px relative w-full" data-name="spacer" />;
}

function DeployBtn() {
  return (
    <div className="bg-[#0b0b0b] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="deploy-btn">
      <div aria-hidden className="absolute border border-[#6fccdd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[16px] py-[10px] relative size-full">
          <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#6fccdd] text-[14px] uppercase whitespace-nowrap" style={{ fontFeatureSettings: '"case"' }}>
            Deploy Now
          </p>
        </div>
      </div>
    </div>
  );
}

function DeployBtnRow() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="deploy-btn-row">
      <DeployBtn />
      <p className="[word-break:break-word] absolute font-['Roboto:Medium',sans-serif] font-medium leading-[16px] left-[12px] opacity-80 text-[11px] text-[rgba(255,255,255,0.6)] top-[35px] tracking-[0.5px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Requires a connected domain
      </p>
    </div>
  );
}

function CardDeploy() {
  return (
    <div className="bg-[#141414] content-stretch flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] shrink-0 size-[216px]" data-name="card-deploy">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <DeployIcon />
      <DeployText />
      <Spacer2 />
      <DeployBtnRow />
    </div>
  );
}

function ActionCardsRow() {
  return (
    <div className="content-stretch flex gap-[16px] h-[216px] items-start relative shrink-0 w-[680px]" data-name="action-cards-row">
      <CardDownload />
      <CardDomain />
      <CardDeploy />
    </div>
  );
}

function ActionsSection() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[248px] items-center relative shrink-0 w-full" data-name="actions-section">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] text-center uppercase whitespace-nowrap" style={{ fontFeatureSettings: '"case"' }}>
        Next actions
      </p>
      <ActionCardsRow />
    </div>
  );
}

function DeliveryContent() {
  return (
    <div className="absolute bg-[#0b0b0b] content-stretch flex flex-col gap-[48px] h-[840px] items-center left-0 px-[40px] py-[56px] top-[60px] w-[1440px]" data-name="delivery-content">
      <SuccessSection />
      <PreviewSection />
      <ActionsSection />
    </div>
  );
}

export default function AiLaunchKitDownloadingGeneratedWebsitesPage() {
  return (
    <div className="bg-[#0b0b0b] relative size-full" data-name="AI Launch Kit - downloading generated websites page">
      <Header />
      <DeliveryContent />
    </div>
  );
}