import svgPaths from "./svg-e6r5yydb6e";

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

function Frame19() {
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

function Frame23() {
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

function Frame24() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center right-[32px] top-[24px]">
      <Frame19 />
      <Frame23 />
      <ProfileAvatar />
    </div>
  );
}

function Header() {
  return (
    <div className="-translate-x-1/2 absolute backdrop-blur-[20px] border-[rgba(255,255,255,0.1)] border-b border-solid h-[84px] left-1/2 top-0 w-[1440px]" data-name="header">
      <Logo />
      <Frame24 />
    </div>
  );
}

function HeadingText() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start relative shrink-0 whitespace-nowrap" data-name="heading-text">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white">Choose Your Design</p>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)]">Select the version that best fits your vision</p>
    </div>
  );
}

function HeadingSection() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[120px] top-[24px] w-[1200px]" data-name="heading-section">
      <HeadingText />
    </div>
  );
}

function ConfirmButton() {
  return (
    <div className="bg-[#6fccdd] content-stretch drop-shadow-[0px_8px_12px_rgba(0,0,0,0.25)] flex items-center justify-center px-[24px] py-[16px] relative rounded-[8px] shrink-0 w-[360px]" data-name="confirm-button">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[#090909] text-[18px] whitespace-nowrap">Confirm Selection</p>
    </div>
  );
}

function ConfirmSelection() {
  return (
    <div className="absolute content-stretch flex flex-col h-[52px] items-center left-[960px] top-[32px] w-[360px]" data-name="confirm-selection">
      <ConfirmButton />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex gap-[20px] items-start pb-[20px] relative shrink-0 w-full" data-name="header">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] min-w-px relative text-[18px] text-white">Version 1</p>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="check-box">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-3.75%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
              <circle cx="10.75" cy="10.75" id="Vector" r="10" stroke="var(--stroke-0, white)" strokeOpacity="0.2" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#0a0a0a] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="Frame">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <div className="bg-[rgba(255,255,255,0.1)] h-[8px] relative rounded-[2px] shrink-0 w-[80px]" data-name="Rectangle" />
          <div className="bg-[rgba(255,255,255,0.1)] h-[8px] relative rounded-[2px] shrink-0 w-[40px]" data-name="Rectangle" />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#0a0a0a] h-full relative rounded-[4px] shrink-0 w-[60px]" data-name="Frame">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[8px] relative size-full">
        <div className="bg-[rgba(255,255,255,0.1)] h-[40px] relative rounded-[2px] shrink-0 w-full" data-name="Rectangle" />
        <div className="bg-[rgba(255,255,255,0.1)] h-[40px] relative rounded-[2px] shrink-0 w-full" data-name="Rectangle" />
        <div className="bg-[rgba(255,255,255,0.1)] h-[40px] relative rounded-[2px] shrink-0 w-full" data-name="Rectangle" />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px relative w-full" data-name="Frame">
      <div className="bg-[rgba(255,255,255,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[4px]" data-name="Rectangle" />
      <div className="bg-[rgba(255,255,255,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[4px]" data-name="Rectangle" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#0a0a0a] flex-[1_0_0] h-full min-w-px relative rounded-[4px]" data-name="Frame">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] relative size-full">
        <div className="bg-[rgba(255,255,255,0.1)] h-[120px] relative rounded-[4px] shrink-0 w-full" data-name="Rectangle" />
        <Frame4 />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px relative w-full" data-name="Frame">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function PreviewPlaceholder() {
  return (
    <div className="bg-[#0a0a0a] flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Preview Placeholder">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative size-full">
        <Frame />
        <Frame1 />
      </div>
    </div>
  );
}

function Version1Card() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] h-[520px] min-w-px relative rounded-[8px]" data-name="Version 1 Card">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[20px] relative size-full">
        <Header1 />
        <PreviewPlaceholder />
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex gap-[20px] items-start pb-[20px] relative shrink-0 w-full" data-name="header">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] min-w-px relative text-[18px] text-white">Version 2</p>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="check-box">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.p1e585400} fill="var(--fill-0, #6FCCDD)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#0a0a0a] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="Frame">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <div className="bg-[rgba(255,255,255,0.1)] h-[8px] relative rounded-[2px] shrink-0 w-[80px]" data-name="Rectangle" />
          <div className="bg-[rgba(255,255,255,0.1)] h-[8px] relative rounded-[2px] shrink-0 w-[40px]" data-name="Rectangle" />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#0a0a0a] h-full relative rounded-[4px] shrink-0 w-[60px]" data-name="Frame">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[8px] relative size-full">
        <div className="bg-[rgba(255,255,255,0.1)] h-[40px] relative rounded-[2px] shrink-0 w-full" data-name="Rectangle" />
        <div className="bg-[rgba(255,255,255,0.1)] h-[40px] relative rounded-[2px] shrink-0 w-full" data-name="Rectangle" />
        <div className="bg-[rgba(255,255,255,0.1)] h-[40px] relative rounded-[2px] shrink-0 w-full" data-name="Rectangle" />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px relative w-full" data-name="Frame">
      <div className="bg-[rgba(255,255,255,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[4px]" data-name="Rectangle" />
      <div className="bg-[rgba(255,255,255,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[4px]" data-name="Rectangle" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#0a0a0a] flex-[1_0_0] h-full min-w-px relative rounded-[4px]" data-name="Frame">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] relative size-full">
        <div className="bg-[rgba(255,255,255,0.1)] h-[120px] relative rounded-[4px] shrink-0 w-full" data-name="Rectangle" />
        <Frame9 />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px relative w-full" data-name="Frame">
      <Frame7 />
      <Frame8 />
    </div>
  );
}

function PreviewPlaceholder1() {
  return (
    <div className="bg-[#0a0a0a] flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Preview Placeholder">
      <div aria-hidden className="absolute border border-[#6fccdd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative size-full">
        <Frame5 />
        <Frame6 />
      </div>
    </div>
  );
}

function Version2Card() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] h-[520px] min-w-px relative rounded-[8px]" data-name="Version 2 Card">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[20px] relative size-full">
        <Header2 />
        <PreviewPlaceholder1 />
      </div>
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex gap-[20px] items-start pb-[20px] relative shrink-0 w-full" data-name="header">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] min-w-px relative text-[18px] text-white">Version 3</p>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="check-box">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-3.75%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
              <circle cx="10.75" cy="10.75" id="Vector" r="10" stroke="var(--stroke-0, white)" strokeOpacity="0.2" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#0a0a0a] h-[40px] relative rounded-[4px] shrink-0 w-full" data-name="Frame">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <div className="bg-[rgba(255,255,255,0.1)] h-[8px] relative rounded-[2px] shrink-0 w-[80px]" data-name="Rectangle" />
          <div className="bg-[rgba(255,255,255,0.1)] h-[8px] relative rounded-[2px] shrink-0 w-[40px]" data-name="Rectangle" />
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#0a0a0a] h-full relative rounded-[4px] shrink-0 w-[60px]" data-name="Frame">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[8px] relative size-full">
        <div className="bg-[rgba(255,255,255,0.1)] h-[40px] relative rounded-[2px] shrink-0 w-full" data-name="Rectangle" />
        <div className="bg-[rgba(255,255,255,0.1)] h-[40px] relative rounded-[2px] shrink-0 w-full" data-name="Rectangle" />
        <div className="bg-[rgba(255,255,255,0.1)] h-[40px] relative rounded-[2px] shrink-0 w-full" data-name="Rectangle" />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px relative w-full" data-name="Frame">
      <div className="bg-[rgba(255,255,255,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[4px]" data-name="Rectangle" />
      <div className="bg-[rgba(255,255,255,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[4px]" data-name="Rectangle" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#0a0a0a] flex-[1_0_0] h-full min-w-px relative rounded-[4px]" data-name="Frame">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] relative size-full">
        <div className="bg-[rgba(255,255,255,0.1)] h-[120px] relative rounded-[4px] shrink-0 w-full" data-name="Rectangle" />
        <Frame14 />
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px relative w-full" data-name="Frame">
      <Frame12 />
      <Frame13 />
    </div>
  );
}

function PreviewPlaceholder2() {
  return (
    <div className="bg-[#0a0a0a] flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Preview Placeholder">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[20px] relative size-full">
        <Frame10 />
        <Frame11 />
      </div>
    </div>
  );
}

function Version3Card() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] h-[520px] min-w-px relative rounded-[8px]" data-name="Version 3 Card">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[20px] relative size-full">
        <Header3 />
        <PreviewPlaceholder2 />
      </div>
    </div>
  );
}

function CardsRow() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-start left-[120px] top-[115px] w-[1200px]" data-name="cards-row">
      <Version1Card />
      <Version2Card />
      <Version3Card />
    </div>
  );
}

function MainContent() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[804px] items-start left-0 px-[120px] py-[64px] top-[156px] w-[1440px]" data-name="main-content">
      <HeadingSection />
      <ConfirmSelection />
      <CardsRow />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 size-[44px]">
      <div className="absolute left-[10px] overflow-clip size-[24px] top-[10px]" data-name="arrow-left">
        <div className="absolute inset-[16.67%]" data-name="Vector (Stroke)">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path clipRule="evenodd" d={svgPaths.p8122280} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[125px]">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white w-full">AI Launch Kit</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center left-0 top-0">
      <Frame16 />
      <div className="h-[22.5px] relative shrink-0 w-0">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 22.5">
            <path d="M0.5 0V22.5" id="Vector 7692" stroke="var(--stroke-0, white)" strokeOpacity="0.1" />
          </svg>
        </div>
      </div>
      <Frame15 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Bold / Essentional, UI / Check Circle">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.p1e585400} fill="var(--fill-0, #6FCCDD)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.4)] whitespace-nowrap">Business</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Bold / Essentional, UI / Check Circle">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.p1e585400} fill="var(--fill-0, #6FCCDD)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.4)] whitespace-nowrap">{`Design Category & Mood`}</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Bold / Essentional, UI / Check Circle">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.p1e585400} fill="var(--fill-0, #6FCCDD)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.4)] whitespace-nowrap">{`Colors & Fonts`}</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Bold / Essentional, UI / Check Circle">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.p1e585400} fill="var(--fill-0, #6FCCDD)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-white whitespace-nowrap">Pick Pages</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[16px] items-center left-1/2 top-1/2">
      <Frame18 />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Arrow / Caret_Right">
        <div className="absolute inset-[37.5%_41.67%_37.5%_45.83%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 7.5">
              <path d={svgPaths.pb873b80} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <Frame21 />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Arrow / Caret_Right">
        <div className="absolute inset-[37.5%_41.67%_37.5%_45.83%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 7.5">
              <path d={svgPaths.pb873b80} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <Frame25 />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Arrow / Caret_Right">
        <div className="absolute inset-[37.5%_41.67%_37.5%_45.83%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 7.5">
              <path d={svgPaths.pb873b80} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <Frame26 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute content-stretch flex h-[44px] items-center justify-between left-[32px] top-[92px] w-[1376px]">
      <Frame17 />
      <Frame20 />
    </div>
  );
}

export default function AiLaunchKitPreviewingGeneratedWebsitesPage() {
  return (
    <div className="bg-[#0b0b0b] relative size-full" data-name="AI Launch Kit - Previewing generated websites page">
      <Header />
      <MainContent />
      <Frame22 />
    </div>
  );
}