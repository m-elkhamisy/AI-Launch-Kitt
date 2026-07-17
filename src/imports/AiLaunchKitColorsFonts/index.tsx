import svgPaths from "./svg-f4nnorilyc";

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
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Bold / Design, Tools / Pallete 2">
        <div className="absolute inset-[8.33%_8.33%_8.55%_8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19.9479">
            <path clipRule="evenodd" d={svgPaths.p34bed280} fill="var(--fill-0, #6FCCDD)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-white whitespace-nowrap">{`Colors & Fonts`}</p>
    </div>
  );
}

function Frame11() {
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
          <p className="leading-[20px]">Next</p>
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
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Arrow / Arrows_Reload_01">
          <div className="absolute inset-[12.5%_19.09%]" data-name="Vector">
            <div className="absolute inset-[-5%_-6.07%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0904 13.2">
                <path d={svgPaths.paf2e100} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
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
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6fccdd] text-[14px] text-center whitespace-nowrap">Regenerate</p>
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

function Example() {
  return (
    <div className="flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="example">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#293681] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#4274d9] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#95ccdd] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#d0e7e6] flex-[1_0_0] h-full min-w-px relative" />
      </div>
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] h-[80px] min-w-px relative" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center pr-[32px] relative size-full">
          <Example />
          <div className="absolute overflow-clip right-[-0.5px] size-[24px] top-0" data-name="check-box">
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

function Example1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="example">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#659287] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#88bda4] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#b1d3b9] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#e6f2dd] flex-[1_0_0] h-full min-w-px relative" />
      </div>
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[80px] min-w-px relative" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center pr-[32px] relative size-full">
          <Example1 />
          <div className="absolute overflow-clip right-[-0.5px] size-[24px] top-0" data-name="check-box">
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

function Example2() {
  return (
    <div className="flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="example">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-black flex-[1_0_0] h-full min-w-px relative">
          <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none" />
        </div>
        <div className="bg-[#cb2957] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#ddd] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#eee] flex-[1_0_0] h-full min-w-px relative" />
      </div>
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] h-[80px] min-w-px relative" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center pr-[32px] relative size-full">
          <Example2 />
          <div className="absolute overflow-clip right-[-0.5px] size-[24px] top-0" data-name="check-box">
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

function Example3() {
  return (
    <div className="flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="example">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#111844] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#4b5694] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#7288ae] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#eae0cf] flex-[1_0_0] h-full min-w-px relative" />
      </div>
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[80px] min-w-px relative" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center pr-[32px] relative size-full">
          <Example3 />
          <div className="absolute overflow-clip right-[-0.5px] size-[24px] top-0" data-name="check-box">
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

function Example4() {
  return (
    <div className="flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="example">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#7f2020] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#869b7e] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#c9caac] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#f6f3eb] flex-[1_0_0] h-full min-w-px relative" />
      </div>
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] h-[80px] min-w-px relative" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center pr-[32px] relative size-full">
          <Example4 />
          <div className="absolute overflow-clip right-[-0.5px] size-[24px] top-0" data-name="check-box">
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

function Example5() {
  return (
    <div className="flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="example">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#c0e1d2] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#e5eee4] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#f6f4e8] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#dc9b9b] flex-[1_0_0] h-full min-w-px relative" />
      </div>
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] h-[80px] min-w-px relative" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center pr-[32px] relative size-full">
          <Example5 />
          <div className="absolute overflow-clip right-[-0.5px] size-[24px] top-0" data-name="check-box">
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

function Example6() {
  return (
    <div className="flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="example">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#41431b] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#aeb784] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#e3dbbb] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#f8f3e1] flex-[1_0_0] h-full min-w-px relative" />
      </div>
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] h-[80px] min-w-px relative" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center pr-[32px] relative size-full">
          <Example6 />
          <div className="absolute overflow-clip right-[-0.5px] size-[24px] top-0" data-name="check-box">
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

function Example7() {
  return (
    <div className="flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="example">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#eaefef] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#bfc9d1] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#25343f] flex-[1_0_0] h-full min-w-px relative" />
        <div className="bg-[#ff9b51] flex-[1_0_0] h-full min-w-px relative" />
      </div>
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] h-[80px] min-w-px relative" data-name="Container">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center pr-[32px] relative size-full">
          <Example7 />
          <div className="absolute overflow-clip right-[-0.5px] size-[24px] top-0" data-name="check-box">
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

function Frame12() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Container />
      <Container1 />
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[calc(8.33%+28px)] top-[192px] w-[1144px]">
      <Title />
      <Frame12 />
      <div className="absolute left-[352px] size-[32px] top-[120px]" data-name="Cursor">
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

function IconMargin1() {
  return (
    <div className="relative shrink-0" data-name="Icon (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pl-[8px] relative size-full">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Arrow / Arrows_Reload_01">
          <div className="absolute inset-[12.5%_19.09%]" data-name="Vector">
            <div className="absolute inset-[-5%_-6.07%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0904 13.2">
                <path d={svgPaths.paf2e100} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[36px] items-center justify-center px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6fccdd] text-[14px] text-center whitespace-nowrap">Regenerate</p>
      <IconMargin1 />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center pb-[12px] relative shrink-0 w-full" data-name="title">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] min-w-px relative text-[14px] text-[rgba(255,255,255,0.6)] uppercase" style={{ fontFeatureSettings: '"case"' }}>
        Font Pairings
      </p>
      <Button1 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Heading</p>
      <p className="relative shrink-0 text-right">Proxima nova</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame20 />
      <p className="font-['Proxima_Nova:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[20px] text-white w-full">The Future Starts Here</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Body</p>
      <p className="relative shrink-0 text-right">Inter</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame21 />
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Build trust and showcase your services clearly.</p>
    </div>
  );
}

function Card() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(111,204,221,0.05)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-start p-[26px] relative size-full">
          <Frame17 />
          <Frame18 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#6fccdd] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Heading</p>
      <p className="relative shrink-0 text-right">Urbanist</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col font-semibold gap-[8px] items-start relative shrink-0 w-full">
      <Frame23 />
      <p className="font-['Urbanist:SemiBold',sans-serif] leading-[28px] relative shrink-0 text-[20px] text-white w-full">The Future Starts Here</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Body</p>
      <p className="relative shrink-0 text-right">Poppins</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame25 />
      <p className="font-['Poppins:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Build trust and showcase your services clearly.</p>
    </div>
  );
}

function Card1() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(111,204,221,0.05)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-start p-[26px] relative size-full">
          <Frame22 />
          <Frame24 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Heading</p>
      <p className="relative shrink-0 text-right">Outfit</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col font-semibold gap-[8px] items-start relative shrink-0 w-full">
      <Frame27 />
      <p className="font-['Outfit:SemiBold',sans-serif] leading-[28px] relative shrink-0 text-[20px] text-white w-full">The Future Starts Here</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold relative shrink-0 text-center">Body</p>
      <p className="font-['Sofia_Pro:SemiBold',sans-serif] not-italic relative shrink-0 text-right">Sofia Pro</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame29 />
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Build trust and showcase your services clearly.</p>
    </div>
  );
}

function Card2() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-start p-[26px] relative size-full">
          <Frame26 />
          <Frame28 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Heading</p>
      <p className="relative shrink-0 text-right">Anton</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame31 />
      <p className="font-['Anton:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[20px] text-white w-full">The Future Starts Here</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Body</p>
      <p className="relative shrink-0 text-right">Montserrat</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame33 />
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Build trust and showcase your services clearly.</p>
    </div>
  );
}

function Card3() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-start p-[26px] relative size-full">
          <Frame30 />
          <Frame32 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Heading</p>
      <p className="relative shrink-0 text-right">Proxima nova</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame35 />
      <p className="font-['Proxima_Nova:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[20px] text-white w-full">The Future Starts Here</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Body</p>
      <p className="relative shrink-0 text-right">Inter</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame37 />
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Build trust and showcase your services clearly.</p>
    </div>
  );
}

function Card4() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-start p-[26px] relative size-full">
          <Frame34 />
          <Frame36 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Heading</p>
      <p className="relative shrink-0 text-right">Urbanist</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col font-semibold gap-[8px] items-start relative shrink-0 w-full">
      <Frame39 />
      <p className="font-['Urbanist:SemiBold',sans-serif] leading-[28px] relative shrink-0 text-[20px] text-white w-full">The Future Starts Here</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Body</p>
      <p className="relative shrink-0 text-right">Poppins</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame41 />
      <p className="font-['Poppins:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Build trust and showcase your services clearly.</p>
    </div>
  );
}

function Card5() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-start p-[26px] relative size-full">
          <Frame38 />
          <Frame40 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Heading</p>
      <p className="relative shrink-0 text-right">Outfit</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col font-semibold gap-[8px] items-start relative shrink-0 w-full">
      <Frame43 />
      <p className="font-['Outfit:SemiBold',sans-serif] leading-[28px] relative shrink-0 text-[20px] text-white w-full">The Future Starts Here</p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold relative shrink-0 text-center">Body</p>
      <p className="font-['Sofia_Pro:SemiBold',sans-serif] not-italic relative shrink-0 text-right">Sofia Pro</p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame45 />
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Build trust and showcase your services clearly.</p>
    </div>
  );
}

function Card6() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-start p-[26px] relative size-full">
          <Frame42 />
          <Frame44 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Heading</p>
      <p className="relative shrink-0 text-right">Anton</p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame47 />
      <p className="font-['Anton:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[20px] text-white w-full">The Future Starts Here</p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold items-start justify-between leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0 text-center">Body</p>
      <p className="relative shrink-0 text-right">Montserrat</p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame49 />
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">Build trust and showcase your services clearly.</p>
    </div>
  );
}

function Card7() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.02)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-start p-[26px] relative size-full">
          <Frame46 />
          <Frame48 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Card4 />
      <Card5 />
      <Card6 />
      <Card7 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame13 />
      <Frame14 />
      <div className="absolute left-[450px] size-[32px] top-[157px]" data-name="Cursor">
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

function Frame16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[calc(8.33%+28px)] top-[392px] w-[1144px]">
      <Title1 />
      <Frame19 />
    </div>
  );
}

export default function AiLaunchKitColorsFonts() {
  return (
    <div className="bg-[#0b0b0b] relative size-full" data-name="AI Launch Kit - Colors & Fonts">
      <Header />
      <Frame7 />
      <Frame15 />
      <Frame16 />
    </div>
  );
}