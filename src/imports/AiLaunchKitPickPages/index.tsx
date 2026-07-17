import svgPaths from "./svg-w96mex1cgs";

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

function Frame4() {
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

function Frame8() {
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

function Frame9() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center right-[32px] top-[24px]">
      <Frame4 />
      <Frame8 />
      <ProfileAvatar />
    </div>
  );
}

function Header() {
  return (
    <div className="-translate-x-1/2 absolute backdrop-blur-[20px] border-[rgba(255,255,255,0.1)] border-b border-solid h-[84px] left-1/2 top-0 w-[1440px]" data-name="header">
      <Logo />
      <Frame9 />
    </div>
  );
}

function Frame1() {
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

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[125px]">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white w-full">AI Launch Kit</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Frame1 />
      <div className="h-[22.5px] relative shrink-0 w-0">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 22.5">
            <path d="M0.5 0V22.5" id="Vector 7692" stroke="var(--stroke-0, white)" strokeOpacity="0.1" />
          </svg>
        </div>
      </div>
      <Frame />
    </div>
  );
}

function Frame3() {
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

function Frame6() {
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
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.4)] whitespace-nowrap">{`Colors & Fonts`}</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Bold / Notes / Document Text">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
            <path clipRule="evenodd" d={svgPaths.p33f2580} fill="var(--fill-0, #6FCCDD)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-white whitespace-nowrap">Pick Pages</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[16px] items-center left-1/2 top-1/2">
      <Frame3 />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Arrow / Caret_Right">
        <div className="absolute inset-[37.5%_41.67%_37.5%_45.83%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 7.5">
              <path d={svgPaths.pb873b80} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <Frame6 />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Arrow / Caret_Right">
        <div className="absolute inset-[37.5%_41.67%_37.5%_45.83%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 7.5">
              <path d={svgPaths.pb873b80} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
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
      <Frame11 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[32px] top-[116px] w-[1376px]">
      <Frame2 />
      <div className="bg-[#6fccdd] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[12px] relative rounded-[8px] shrink-0" data-name="Button new">
        <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[14px] text-black uppercase whitespace-nowrap" style={{ fontFeatureSettings: '"case"' }}>
          <p className="leading-[20px]">Review and generate</p>
        </div>
      </div>
      <Frame5 />
    </div>
  );
}

function IconMargin() {
  return (
    <div className="relative shrink-0" data-name="Icon (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pl-[8px] relative size-full">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Edit / Add_Plus">
          <div className="absolute inset-1/4" data-name="Vector">
            <div className="absolute inset-[-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.2 9.2">
                <path d="M0.6 4.6H8.6M4.6 8.6V0.6" id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[4px] h-[36px] items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6fccdd] text-[14px] text-center whitespace-nowrap">Add new page</p>
      <IconMargin />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center pb-[12px] relative shrink-0 w-full" data-name="title">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] min-w-px relative text-[14px] text-[rgba(255,255,255,0.6)] uppercase" style={{ fontFeatureSettings: '"case"' }}>
        Theme Mode
      </p>
      <Button />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex gap-[20px] items-start justify-end pb-[20px] relative shrink-0 w-full" data-name="header">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] min-w-px relative text-[18px] text-white">Home</p>
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

function Frame15() {
  return (
    <div className="h-[24px] relative shrink-0 w-[53px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] left-[26.5px] text-[#6fccdd] text-[12px] text-center top-[6px] uppercase whitespace-nowrap">locked</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-end min-w-px relative">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Navigation</p>
      <Frame15 />
    </div>
  );
}

function Row1() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <Frame13 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Hero Section</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Features</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Testimonials</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Close() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[15.434px] left-[calc(50%-0.21px)] top-[calc(50%+0.21px)] w-[17.097px]" data-name="close">
      <div className="absolute inset-[-3.24%_-9.16%_-18.79%_-9.16%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.2306 18.8339">
          <g filter="url(#filter0_d_1_2048)" id="close">
            <path d={svgPaths.p27073b40} fill="var(--fill-0, white)" id="Shape" />
            <path clipRule="evenodd" d={svgPaths.p22648571} fillRule="evenodd" id="Shape_2" stroke="var(--stroke-0, black)" strokeLinejoin="round" />
            <path d={svgPaths.p2a386300} fill="var(--fill-0, black)" id="Shape_3" />
            <path d={svgPaths.p385e7200} fill="var(--fill-0, black)" id="Shape_4" />
            <path d={svgPaths.p124a03a0} fill="var(--fill-0, black)" id="Shape_5" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="18.8339" id="filter0_d_1_2048" width="20.2306" x="-2.98023e-08" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.33333" />
              <feGaussianBlur stdDeviation="0.533333" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_2048" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_2048" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Call To Action</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute left-[157px] overflow-clip size-[32px] top-[-2px]" data-name="Cursor/Grabbed">
            <Close />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[53px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] left-[26.5px] text-[#6fccdd] text-[12px] text-center top-[6px] uppercase whitespace-nowrap">locked</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-end min-w-px relative">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Footer</p>
      <Frame16 />
    </div>
  );
}

function Row6() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <Frame14 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row7() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-dashed inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[21px] items-center p-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Add section</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Edit / Add_Plus">
            <div className="absolute inset-1/4" data-name="Vector">
              <div className="absolute inset-[-7.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.2 9.2">
                  <path d="M0.6 4.6H8.6M4.6 8.6V0.6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="list">
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
      <Row5 />
      <Row6 />
      <Row7 />
    </div>
  );
}

function Card() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="card">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[20px] relative size-full">
        <Header1 />
        <List />
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex gap-[20px] items-start justify-end pb-[20px] relative shrink-0 w-full" data-name="header">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] min-w-px relative text-[18px] text-white">About us</p>
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

function Frame18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[53px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] left-[26.5px] text-[#6fccdd] text-[12px] text-center top-[6px] uppercase whitespace-nowrap">locked</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-end min-w-px relative">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Navigation</p>
      <Frame18 />
    </div>
  );
}

function Row8() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <Frame17 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row9() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Hero Section</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row10() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Features</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row11() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Testimonials</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row12() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Call To Action</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="h-[24px] relative shrink-0 w-[53px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] left-[26.5px] text-[#6fccdd] text-[12px] text-center top-[6px] uppercase whitespace-nowrap">locked</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-end min-w-px relative">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Footer</p>
      <Frame20 />
    </div>
  );
}

function Row13() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <Frame19 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row14() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-dashed inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[21px] items-center p-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Add section</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Edit / Add_Plus">
            <div className="absolute inset-1/4" data-name="Vector">
              <div className="absolute inset-[-7.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.2 9.2">
                  <path d="M0.6 4.6H8.6M4.6 8.6V0.6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="list">
      <Row8 />
      <Row9 />
      <Row10 />
      <Row11 />
      <Row12 />
      <Row13 />
      <Row14 />
    </div>
  );
}

function Card1() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="card">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[20px] relative size-full">
        <Header2 />
        <List1 />
      </div>
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex gap-[20px] items-start justify-end pb-[20px] relative shrink-0 w-full" data-name="header">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] min-w-px relative text-[18px] text-white">Contact us</p>
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

function Frame22() {
  return (
    <div className="h-[24px] relative shrink-0 w-[53px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] left-[26.5px] text-[#6fccdd] text-[12px] text-center top-[6px] uppercase whitespace-nowrap">locked</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-end min-w-px relative">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Navigation</p>
      <Frame22 />
    </div>
  );
}

function Row15() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <Frame21 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row16() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Hero Section</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row17() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Features</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row18() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Testimonials</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row19() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Call To Action</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="h-[24px] relative shrink-0 w-[53px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] left-[26.5px] text-[#6fccdd] text-[12px] text-center top-[6px] uppercase whitespace-nowrap">locked</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-end min-w-px relative">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Footer</p>
      <Frame24 />
    </div>
  );
}

function Row20() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <Frame23 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row21() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-dashed inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[21px] items-center p-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Add section</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Edit / Add_Plus">
            <div className="absolute inset-1/4" data-name="Vector">
              <div className="absolute inset-[-7.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.2 9.2">
                  <path d="M0.6 4.6H8.6M4.6 8.6V0.6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="list">
      <Row15 />
      <Row16 />
      <Row17 />
      <Row18 />
      <Row19 />
      <Row20 />
      <Row21 />
    </div>
  );
}

function Card2() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="card">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[20px] relative size-full">
        <Header3 />
        <List2 />
      </div>
    </div>
  );
}

function Header4() {
  return (
    <div className="content-stretch flex gap-[20px] items-start pb-[20px] relative shrink-0 w-full" data-name="header">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] min-w-px relative text-[18px] text-white">Services</p>
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

function Frame26() {
  return (
    <div className="h-[24px] relative shrink-0 w-[53px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] left-[26.5px] text-[#6fccdd] text-[12px] text-center top-[6px] uppercase whitespace-nowrap">locked</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-end min-w-px relative">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Navigation</p>
      <Frame26 />
    </div>
  );
}

function Row22() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <Frame25 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row23() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Hero Section</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row24() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Features</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row25() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Testimonials</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row26() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Call To Action</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="h-[24px] relative shrink-0 w-[53px]">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] left-[26.5px] text-[#6fccdd] text-[12px] text-center top-[6px] uppercase whitespace-nowrap">locked</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-end min-w-px relative">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">Footer</p>
      <Frame28 />
    </div>
  );
}

function Row27() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Menu / More_Grid_Small">
            <div className="absolute inset-[58.33%_33.33%_33.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[58.33%_58.33%_33.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_33.33%_58.33%_58.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[33.33%_58.33%_58.33%_33.33%]" data-name="Vector">
              <div className="absolute inset-[-37.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5 3.5">
                  <path d={svgPaths.p15d825c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
          <Frame27 />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Menu / More_Vertical">
            <div className="absolute inset-[70.83%_45.83%_20.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[20.83%_45.83%_70.83%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-45%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.53333 2.53333">
                  <path d={svgPaths.p83de000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row28() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="row">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-dashed inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[21px] items-center p-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[16px] text-[rgba(255,255,255,0.6)]">Add section</p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Edit / Add_Plus">
            <div className="absolute inset-1/4" data-name="Vector">
              <div className="absolute inset-[-7.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.2 9.2">
                  <path d="M0.6 4.6H8.6M4.6 8.6V0.6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function List3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="list">
      <Row22 />
      <Row23 />
      <Row24 />
      <Row25 />
      <Row26 />
      <Row27 />
      <Row28 />
    </div>
  );
}

function Card3() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="card">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[20px] relative size-full">
        <Header4 />
        <List3 />
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] content-stretch flex items-center justify-center p-[10px] relative rounded-[12px] shrink-0 w-[100px]">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-white whitespace-nowrap">Edit</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative rounded-[8px] shrink-0 w-[100px]">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#f45959] text-[14px] whitespace-nowrap">Delete</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute backdrop-blur-[30px] bg-[rgba(255,255,255,0.02)] content-stretch flex flex-col items-start left-[398px] p-[6px] rounded-[16px] top-[314px]">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
      <Frame30 />
      <Frame31 />
      <div className="absolute left-[80px] size-[32px] top-[30px]" data-name="Cursor">
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

function Row() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[1144px]" data-name="row">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
      <Frame29 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[calc(8.33%+28px)] top-[192px] w-[1144px]">
      <Title />
      <Row />
    </div>
  );
}

export default function AiLaunchKitPickPages() {
  return (
    <div className="bg-[#0b0b0b] relative size-full" data-name="AI Launch Kit - Pick Pages">
      <Header />
      <Frame7 />
      <Frame12 />
    </div>
  );
}