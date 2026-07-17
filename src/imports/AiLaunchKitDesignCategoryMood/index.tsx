import svgPaths from "./svg-aiiheluzwm";
import { imgLight } from "./svg-x4lhq";

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

function Frame11() {
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

function Frame15() {
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

function Frame16() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center right-[32px] top-[24px]">
      <Frame11 />
      <Frame15 />
      <ProfileAvatar />
    </div>
  );
}

function Header() {
  return (
    <div className="-translate-x-1/2 absolute backdrop-blur-[20px] border-[rgba(255,255,255,0.1)] border-b border-solid h-[84px] left-1/2 top-0 w-[1440px]" data-name="header">
      <Logo />
      <Frame16 />
    </div>
  );
}

function Frame8() {
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

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[125px]">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white w-full">AI Launch Kit</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Frame8 />
      <div className="h-[22.5px] relative shrink-0 w-0">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 22.5">
            <path d="M0.5 0V22.5" id="Vector 7692" stroke="var(--stroke-0, white)" strokeOpacity="0.1" />
          </svg>
        </div>
      </div>
      <Frame7 />
    </div>
  );
}

function Frame10() {
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

function Frame13() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative rounded-[5px] shrink-0 size-[24px]" data-name="Bold / Settings, Fine Tuning / Widget 2">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p2679c280} fill="var(--fill-0, #6FCCDD)" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p35bacd00} fill="var(--fill-0, #6FCCDD)" fillRule="evenodd" />
              <path d={svgPaths.p2fcdb978} fill="var(--fill-0, #6FCCDD)" />
              <path d={svgPaths.p3947a280} fill="var(--fill-0, #6FCCDD)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-white whitespace-nowrap">{`Design Category & Mood`}</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Bold / Design, Tools / Pallete 2">
        <div className="absolute inset-[8.33%_8.33%_8.55%_8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19.9479">
            <path clipRule="evenodd" d={svgPaths.p34bed280} fill="var(--fill-0, white)" fillOpacity="0.2" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">{`Colors & Fonts`}</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Bold / Notes / Document Text">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
            <path clipRule="evenodd" d={svgPaths.p33f2580} fill="var(--fill-0, white)" fillOpacity="0.2" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">Pick Pages</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[16px] items-center left-1/2 top-1/2">
      <Frame10 />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Arrow / Caret_Right">
        <div className="absolute inset-[37.5%_41.67%_37.5%_45.83%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 7.5">
              <path d={svgPaths.pb873b80} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <Frame13 />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Arrow / Caret_Right">
        <div className="absolute inset-[37.5%_41.67%_37.5%_45.83%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 7.5">
              <path d={svgPaths.pb873b80} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <Frame17 />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Arrow / Caret_Right">
        <div className="absolute inset-[37.5%_41.67%_37.5%_45.83%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 7.5">
              <path d={svgPaths.pb873b80} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <Frame18 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[32px] top-[116px] w-[1376px]">
      <Frame9 />
      <div className="bg-[#6fccdd] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[12px] relative rounded-[8px] shrink-0" data-name="Button new">
        <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[14px] text-black uppercase whitespace-nowrap" style={{ fontFeatureSettings: '"case"' }}>
          <p className="leading-[20px]">Next</p>
        </div>
      </div>
      <Frame12 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white w-full">Corporate Enterprise</p>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Ideal for established businesses that need a professional online presence to build trust and attract clients.</p>
    </div>
  );
}

function Title() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[420px]" data-name="title">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] text-center uppercase whitespace-nowrap">Business category</p>
      <Frame2 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[9.04%_8.33%_8.33%_8.33%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19.8291">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p19985800} fill="var(--fill-0, #85D2DB)" fillRule="evenodd" id="Vector" />
          <path d={svgPaths.p3370aa80} fill="var(--fill-0, #85D2DB)" id="Vector_2" />
          <path d={svgPaths.p16ca8900} fill="var(--fill-0, #85D2DB)" id="Vector_3" />
          <path d={svgPaths.p148cf200} fill="var(--fill-0, #85D2DB)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Building() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="building 1">
      <Group />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[rgba(255,255,255,0.06)] content-stretch flex flex-col items-center justify-center p-[16px] relative rounded-bl-[16px] rounded-tl-[16px] rounded-tr-[16px] shrink-0 size-[56px]" data-name="Container">
      <Building />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Title />
      <Container />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function IconMargin() {
  return (
    <div className="relative shrink-0" data-name="Icon (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pl-[8px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[4px] h-[36px] items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6fccdd] text-[14px] text-center whitespace-nowrap">Choose a different category</p>
      <IconMargin />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-center flex flex-wrap gap-y-[4px] items-center pt-[12px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Button />
    </div>
  );
}

function Card() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.03)] relative rounded-[16px] shrink-0 w-[566px]" data-name="card">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[26px] relative rounded-[inherit] size-full">
        <Frame19 />
        <Frame />
      </div>
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white w-full">{`Professional & Trustworthy`}</p>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Clean and credible design focused on building confidence, strengthening reputation, and driving engagement.</p>
    </div>
  );
}

function Title1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[420px]" data-name="title">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] text-center uppercase whitespace-nowrap">Design Mood</p>
      <Frame3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[rgba(255,255,255,0.06)] content-stretch flex flex-col items-center justify-center p-[16px] relative rounded-bl-[16px] rounded-tl-[16px] rounded-tr-[16px] shrink-0 size-[56px]" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Bold / Security / Shield Check">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
            <path clipRule="evenodd" d={svgPaths.p2c9a4a00} fill="var(--fill-0, #6FCCDD)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Title1 />
      <Container1 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function IconMargin1() {
  return (
    <div className="relative shrink-0" data-name="Icon (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pl-[8px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[36px] items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6fccdd] text-[14px] text-center whitespace-nowrap">Choose a different category</p>
      <IconMargin1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-center flex flex-wrap gap-y-[4px] items-center pt-[12px] relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Button1 />
    </div>
  );
}

function Card1() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.03)] relative rounded-[16px] shrink-0 w-[566px]" data-name="card">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[26px] relative rounded-[inherit] size-full">
        <Frame20 />
        <Frame1 />
      </div>
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Card />
      <Card1 />
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[12px] relative shrink-0 w-full" data-name="title">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] min-w-px relative text-[14px] text-[rgba(255,255,255,0.6)] uppercase" style={{ fontFeatureSettings: '"case"' }}>
        Theme Mode
      </p>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[rgba(11,11,11,0.1)] col-1 h-[4px] ml-0 mt-0 relative rounded-[100px] row-1 w-[22px]" />
      <div className="bg-[rgba(11,11,11,0.1)] col-1 h-[3px] ml-0 mt-[19px] relative rounded-[100px] row-1 w-[45px]" />
      <div className="bg-[rgba(11,11,11,0.1)] col-1 h-[3px] ml-0 mt-[23px] relative rounded-[100px] row-1 w-[45px]" />
      <div className="bg-[rgba(11,11,11,0.1)] col-1 h-[3px] ml-0 mt-[27px] relative rounded-[100px] row-1 w-[30px]" />
      <div className="bg-[rgba(11,11,11,0.1)] col-1 h-[8px] ml-0 mt-[6px] relative rounded-[100px] row-1 w-[45px]" />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full">
      <div className="bg-[#6fccdd] flex-[1_0_0] h-[8px] min-w-px relative rounded-[2px]" />
      <div className="flex-[1_0_0] h-[8px] min-w-px relative rounded-[2px]">
        <div aria-hidden className="absolute border border-[rgba(11,11,11,0.1)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7px] items-start left-[14px] top-[29px] w-[45px]">
      <Group1 />
      <Frame24 />
    </div>
  );
}

function Light() {
  return (
    <div className="bg-white h-[90px] overflow-clip relative rounded-[8px] shrink-0 w-[144px]" data-name="light">
      <div className="absolute bg-[rgba(11,11,11,0.1)] h-[14px] left-0 top-0 w-[144px]" />
      <div className="absolute left-[5px] size-[5px] top-[5px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
          <circle cx="2.5" cy="2.5" fill="var(--fill-0, #5752A3)" id="Ellipse 13" r="2.5" />
        </svg>
      </div>
      <div className="absolute left-[13px] size-[5px] top-[5px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
          <circle cx="2.5" cy="2.5" fill="var(--fill-0, #6FCCDD)" id="Ellipse 14" r="2.5" />
        </svg>
      </div>
      <div className="absolute left-[21px] size-[5px] top-[5px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
          <circle cx="2.5" cy="2.5" fill="var(--fill-0, white)" id="Ellipse 15" r="2.5" />
        </svg>
      </div>
      <Frame21 />
      <div className="absolute bg-[rgba(11,11,11,0.1)] h-[45px] left-[76px] rounded-[4px] top-[29px] w-[54px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center px-[16px] relative size-full">
          <Light />
          <div className="absolute overflow-clip right-[0.33px] size-[24px] top-0" data-name="check-box">
            <div className="absolute inset-[8.33%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <path clipRule="evenodd" d={svgPaths.p1e585400} fill="var(--fill-0, #6FCCDD)" fillRule="evenodd" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-center text-white w-full">Light Mode</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative" data-name="Container">
      <Container3 />
      <Frame4 />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[rgba(255,255,255,0.1)] col-1 h-[4px] ml-0 mt-0 relative rounded-[100px] row-1 w-[22px]" />
      <div className="bg-[rgba(255,255,255,0.1)] col-1 h-[3px] ml-0 mt-[19px] relative rounded-[100px] row-1 w-[45px]" />
      <div className="bg-[rgba(255,255,255,0.1)] col-1 h-[3px] ml-0 mt-[23px] relative rounded-[100px] row-1 w-[45px]" />
      <div className="bg-[rgba(255,255,255,0.1)] col-1 h-[3px] ml-0 mt-[27px] relative rounded-[100px] row-1 w-[30px]" />
      <div className="bg-[rgba(255,255,255,0.1)] col-1 h-[8px] ml-0 mt-[6px] relative rounded-[100px] row-1 w-[45px]" />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full">
      <div className="bg-[#6fccdd] flex-[1_0_0] h-[8px] min-w-px relative rounded-[2px]" />
      <div className="flex-[1_0_0] h-[8px] min-w-px relative rounded-[2px]">
        <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7px] items-start left-[14px] top-[29px] w-[45px]">
      <Group2 />
      <Frame26 />
    </div>
  );
}

function Light1() {
  return (
    <div className="bg-[#050505] h-[90px] relative rounded-[8px] shrink-0 w-[144px]" data-name="light">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,255,255,0.05)] h-[14px] left-0 top-0 w-[144px]" />
        <div className="absolute left-[5px] size-[5px] top-[5px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <circle cx="2.5" cy="2.5" fill="var(--fill-0, #5752A3)" id="Ellipse 13" r="2.5" />
          </svg>
        </div>
        <div className="absolute left-[13px] size-[5px] top-[5px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <circle cx="2.5" cy="2.5" fill="var(--fill-0, #6FCCDD)" id="Ellipse 14" r="2.5" />
          </svg>
        </div>
        <div className="absolute left-[21px] size-[5px] top-[5px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <circle cx="2.5" cy="2.5" fill="var(--fill-0, white)" id="Ellipse 15" r="2.5" />
          </svg>
        </div>
        <Frame25 />
        <div className="absolute bg-[rgba(255,255,255,0.1)] h-[45px] left-[76px] rounded-[4px] top-[29px] w-[54px]" />
      </div>
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center px-[16px] relative size-full">
          <Light1 />
          <div className="absolute overflow-clip right-[0.33px] size-[24px] top-0" data-name="check-box">
            <div className="absolute inset-[8.33%]" data-name="Vector">
              <div className="absolute inset-[-3.75%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
                  <circle cx="10.75" cy="10.75" id="Vector" r="10" stroke="var(--stroke-0, #6FCCDD)" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] min-w-full relative shrink-0 text-[#6fccdd] text-[18px] text-center w-[min-content]">Dark Mode</p>
      <div className="absolute left-[267.67px] size-[32px] top-[-22px]" data-name="Cursor">
        <div className="absolute inset-[6.25%_15.63%]" data-name="Shape">
          <div className="absolute inset-[-5.36%_-13.64%_-16.07%_-13.64%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 34">
              <g filter="url(#filter0_d_1_1741)" id="Shape">
                <path clipRule="evenodd" d={svgPaths.pe00cd80} fill="var(--fill-0, white)" fillRule="evenodd" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="34" id="filter0_d_1_1741" width="28" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dy="1.5" />
                  <feGaussianBlur stdDeviation="1.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.0745098 0 0 0 0 0.101961 0 0 0 0.25 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1741" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1741" mode="normal" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute inset-[6.25%_15.63%]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 28">
            <path clipRule="evenodd" d={svgPaths.pd35b180} fill="var(--fill-0, #12131A)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative" data-name="Container">
      <Container5 />
      <Frame5 />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[rgba(255,255,255,0.1)] col-1 h-[4px] ml-0 mt-0 relative rounded-[100px] row-1 w-[22px]" />
      <div className="bg-[rgba(255,255,255,0.1)] col-1 h-[3px] ml-0 mt-[19px] relative rounded-[100px] row-1 w-[45px]" />
      <div className="bg-[rgba(255,255,255,0.1)] col-1 h-[3px] ml-0 mt-[23px] relative rounded-[100px] row-1 w-[45px]" />
      <div className="bg-[rgba(255,255,255,0.1)] col-1 h-[3px] ml-0 mt-[27px] relative rounded-[100px] row-1 w-[30px]" />
      <div className="bg-[rgba(255,255,255,0.1)] col-1 h-[8px] ml-0 mt-[6px] relative rounded-[100px] row-1 w-[45px]" />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full">
      <div className="bg-[#6fccdd] flex-[1_0_0] h-[8px] min-w-px relative rounded-[2px]" />
      <div className="flex-[1_0_0] h-[8px] min-w-px relative rounded-[2px]">
        <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7px] items-start left-[14px] top-[29px] w-[45px]">
      <Group3 />
      <Frame28 />
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[rgba(11,11,11,0.1)] col-1 h-[4px] ml-0 mt-0 relative rounded-[100px] row-1 w-[22px]" />
      <div className="bg-[rgba(11,11,11,0.1)] col-1 h-[3px] ml-0 mt-[19px] relative rounded-[100px] row-1 w-[45px]" />
      <div className="bg-[rgba(11,11,11,0.1)] col-1 h-[3px] ml-0 mt-[23px] relative rounded-[100px] row-1 w-[45px]" />
      <div className="bg-[rgba(11,11,11,0.1)] col-1 h-[3px] ml-0 mt-[27px] relative rounded-[100px] row-1 w-[30px]" />
      <div className="bg-[rgba(11,11,11,0.1)] col-1 h-[8px] ml-0 mt-[6px] relative rounded-[100px] row-1 w-[45px]" />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0 w-full">
      <div className="bg-[#6fccdd] flex-[1_0_0] h-[8px] min-w-px relative rounded-[2px]" />
      <div className="flex-[1_0_0] h-[8px] min-w-px relative rounded-[2px]">
        <div aria-hidden className="absolute border border-[rgba(11,11,11,0.1)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7px] items-start left-[14px] top-[29px] w-[45px]">
      <Group5 />
      <Frame30 />
    </div>
  );
}

function Light3() {
  return (
    <div className="absolute bg-white h-[90px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[33px_0px] mask-size-[111px_90px] overflow-clip rounded-[8px] top-0 w-[144px]" style={{ maskImage: `url("${imgLight}")` }} data-name="light">
      <div className="absolute bg-[rgba(11,11,11,0.1)] h-[14px] left-0 top-0 w-[144px]" />
      <div className="absolute left-[5px] size-[5px] top-[5px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
          <circle cx="2.5" cy="2.5" fill="var(--fill-0, #5752A3)" id="Ellipse 13" r="2.5" />
        </svg>
      </div>
      <div className="absolute left-[13px] size-[5px] top-[5px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
          <circle cx="2.5" cy="2.5" fill="var(--fill-0, #6FCCDD)" id="Ellipse 14" r="2.5" />
        </svg>
      </div>
      <div className="absolute left-[21px] size-[5px] top-[5px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
          <circle cx="2.5" cy="2.5" fill="var(--fill-0, white)" id="Ellipse 15" r="2.5" />
        </svg>
      </div>
      <Frame29 />
      <div className="absolute bg-[rgba(11,11,11,0.1)] h-[45px] left-[76px] rounded-[4px] top-[29px] w-[54px]" />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-0 top-0">
      <Light3 />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents left-[33px] top-0" data-name="Mask group">
      <Group4 />
    </div>
  );
}

function Light2() {
  return (
    <div className="bg-[#050505] h-[90px] relative rounded-[8px] shrink-0 w-[144px]" data-name="light">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[rgba(255,255,255,0.05)] h-[14px] left-0 top-0 w-[144px]" />
        <div className="absolute left-[5px] size-[5px] top-[5px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <circle cx="2.5" cy="2.5" fill="var(--fill-0, #5752A3)" id="Ellipse 13" r="2.5" />
          </svg>
        </div>
        <div className="absolute left-[13px] size-[5px] top-[5px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <circle cx="2.5" cy="2.5" fill="var(--fill-0, #6FCCDD)" id="Ellipse 14" r="2.5" />
          </svg>
        </div>
        <div className="absolute left-[21px] size-[5px] top-[5px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <circle cx="2.5" cy="2.5" fill="var(--fill-0, white)" id="Ellipse 15" r="2.5" />
          </svg>
        </div>
        <Frame27 />
        <div className="absolute bg-[rgba(255,255,255,0.1)] h-[45px] left-[76px] rounded-[4px] top-[29px] w-[54px]" />
        <MaskGroup />
      </div>
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center px-[16px] relative size-full">
          <Light2 />
          <div className="absolute overflow-clip right-[0.33px] size-[24px] top-0" data-name="check-box">
            <div className="absolute inset-[8.33%]" data-name="Vector">
              <div className="absolute inset-[-3.75%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
                  <circle cx="10.75" cy="10.75" id="Vector" r="10" stroke="var(--stroke-0, white)" strokeOpacity="0.2" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-center text-white w-full">Light + Dark Mode</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative" data-name="Container">
      <Container7 />
      <Frame6 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Container2 />
      <Container4 />
      <Container6 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Title2 />
      <Frame22 />
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[12px] relative shrink-0 w-full" data-name="title">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] min-w-px relative text-[14px] text-[rgba(255,255,255,0.6)] uppercase" style={{ fontFeatureSettings: '"case"' }}>
        Animation Level
      </p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start justify-center min-w-px mr-[-100px] py-[7px] relative">
      <div className="bg-[rgba(255,255,255,0.1)] h-[2px] relative shrink-0 w-full" />
    </div>
  );
}

function Txt() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-center relative shrink-0 text-center w-[120px]" data-name="txt">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-white w-full">Minimal</p>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">{`Subtle & clean`}</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame 1410068700">
          <circle cx="11.9" cy="12" fill="var(--fill-0, white)" fillOpacity="0.1" id="Ellipse 19" r="8" />
        </g>
      </svg>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center mr-[-100px] relative shrink-0 w-[254.6px]">
      <Txt />
      <Frame36 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start justify-center min-w-px mr-[-100px] py-[7px] relative">
      <div className="bg-[rgba(255,255,255,0.1)] h-[2px] relative shrink-0 w-full" />
    </div>
  );
}

function Txt1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-center relative shrink-0 text-center w-full" data-name="txt">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#6fccdd] text-[16px] w-full">Low</p>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Light movements</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame 1410068700">
          <circle cx="11.9" cy="12" fill="var(--fill-0, #6FCCDD)" id="Ellipse 19" r="8" />
        </g>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center mr-[-100px] relative shrink-0 w-[254.6px]">
      <Txt1 />
      <Frame38 />
      <div className="absolute left-[115.16px] size-[32px] top-[70px]" data-name="Cursor">
        <div className="absolute inset-[6.25%_15.63%]" data-name="Shape">
          <div className="absolute inset-[-5.36%_-13.64%_-16.07%_-13.64%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 34">
              <g filter="url(#filter0_d_1_1741)" id="Shape">
                <path clipRule="evenodd" d={svgPaths.pe00cd80} fill="var(--fill-0, white)" fillRule="evenodd" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="34" id="filter0_d_1_1741" width="28" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dy="1.5" />
                  <feGaussianBlur stdDeviation="1.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.0745098 0 0 0 0 0.101961 0 0 0 0.25 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1741" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1741" mode="normal" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute inset-[6.25%_15.63%]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 28">
            <path clipRule="evenodd" d={svgPaths.pd35b180} fill="var(--fill-0, #12131A)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start justify-center min-w-px mr-[-100px] py-[7px] relative">
      <div className="bg-[rgba(255,255,255,0.1)] h-[2px] relative shrink-0 w-full" />
    </div>
  );
}

function Txt2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-center relative shrink-0 text-center w-full" data-name="txt">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-white w-full">Balanced</p>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Recommended</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center mr-[-100px] relative shrink-0 w-[254.6px]">
      <Txt2 />
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

function Frame44() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start justify-center min-w-px mr-[-100px] py-[7px] relative">
      <div className="bg-[rgba(255,255,255,0.1)] h-[2px] relative shrink-0 w-full" />
    </div>
  );
}

function Txt3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-center relative shrink-0 text-center w-full" data-name="txt">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[16px] text-white w-full">High</p>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">More dynamic</p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame 1410068700">
          <circle cx="11.9" cy="12" fill="var(--fill-0, white)" fillOpacity="0.1" id="Ellipse 19" r="8" />
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center mr-[-100px] relative shrink-0 w-[254.6px]">
      <Txt3 />
      <Frame45 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start justify-center min-w-px py-[7px] relative">
      <div className="bg-[rgba(255,255,255,0.1)] h-[2px] relative shrink-0 w-full" />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-end justify-center relative shrink-0 w-full" data-name="row">
      <Frame39 />
      <Frame31 />
      <Frame37 />
      <Frame32 />
      <Frame43 />
      <Frame33 />
      <Frame44 />
      <Frame34 />
      <Frame35 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Title3 />
      <Row />
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] items-start left-[calc(8.33%+28px)] top-[192px] w-[1144px]">
      <Frame41 />
      <Frame23 />
      <Frame40 />
    </div>
  );
}

export default function AiLaunchKitDesignCategoryMood() {
  return (
    <div className="bg-[#0b0b0b] relative size-full" data-name="AI Launch Kit - Design Category & Mood">
      <Header />
      <Frame14 />
      <Frame42 />
    </div>
  );
}