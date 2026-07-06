import svgPaths from "./svg-9l4sd51871";

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
    <div className="absolute backdrop-blur-[20px] h-[84px] left-0 top-0 w-[1440px]" data-name="header">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
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

function Building() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="building 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g clipPath="url(#clip0_1_2114)" id="building 1">
          <path d={svgPaths.p31acad00} fill="var(--fill-0, #6FCCDD)" id="Vector" />
          <path d={svgPaths.p24d84880} fill="var(--fill-0, #6FCCDD)" id="Vector_2" />
          <path d={svgPaths.p2f6ca200} fill="var(--fill-0, #6FCCDD)" id="Vector_3" />
          <path d={svgPaths.p14afe180} fill="var(--fill-0, #6FCCDD)" id="Vector_4" />
          <path d={svgPaths.p246d7e00} fill="var(--fill-0, #6FCCDD)" id="Vector_5" />
          <path d={svgPaths.p3ac58200} fill="var(--fill-0, #6FCCDD)" id="Vector_6" />
          <path d={svgPaths.pf9b2500} fill="var(--fill-0, #6FCCDD)" id="Vector_7" />
          <path d={svgPaths.p8f38f00} fill="var(--fill-0, #6FCCDD)" id="Vector_8" />
          <path d={svgPaths.pebfc700} fill="var(--fill-0, #6FCCDD)" id="Vector_9" />
          <path d={svgPaths.p3a7fa900} fill="var(--fill-0, #6FCCDD)" id="Vector_10" />
          <path d={svgPaths.p2a40b680} fill="var(--fill-0, #6FCCDD)" id="Vector_11" />
          <path d={svgPaths.p3a1f8980} fill="var(--fill-0, #6FCCDD)" id="Vector_12" />
          <path d={svgPaths.p3a795a40} fill="var(--fill-0, #6FCCDD)" id="Vector_13" />
        </g>
        <defs>
          <clipPath id="clip0_1_2114">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Building />
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.4)] whitespace-nowrap">Business</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="overflow-clip relative rounded-[5px] shrink-0 size-[24px]" data-name="Bold / Settings, Fine Tuning / Widget 2">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p2679c280} fill="var(--fill-0, #808080)" fillOpacity="0.55" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p35bacd00} fill="var(--fill-0, #808080)" fillOpacity="0.55" fillRule="evenodd" />
              <path d={svgPaths.p2fcdb978} fill="var(--fill-0, #808080)" fillOpacity="0.55" />
              <path d={svgPaths.p3947a280} fill="var(--fill-0, #808080)" fillOpacity="0.55" />
            </g>
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[rgba(128,128,128,0.55)] whitespace-nowrap">{`Design Category & Mood`}</p>
    </div>
  );
}

function Frame10() {
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
    <div className="absolute content-stretch flex items-center justify-between left-[32px] top-[117px] w-[1376px]">
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

function Upload() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="upload">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="upload">
          <path d={svgPaths.p2c12f480} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function UploadIcon() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.06)] content-stretch flex flex-col items-center justify-center left-[16px] rounded-[10px] size-[32px] top-[17.5px]" data-name="upload-icon">
      <Upload />
    </div>
  );
}

function UploadLink() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="upload-link">
      <p className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Montserrat:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#6fccdd] text-[14px] underline whitespace-nowrap">Upload here</p>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Arrow / Caret_Right">
        <div className="absolute inset-[37.5%_41.67%_37.5%_45.83%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 7.5">
              <path d={svgPaths.pb873b80} id="Vector" stroke="var(--stroke-0, #6FCCDD)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadText() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[43px] items-start left-[60px] top-[12px] w-[884px]" data-name="upload-text">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[normal] min-w-full relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-[min-content]">Prefer to upload your portfolio instead?</p>
      <UploadLink />
    </div>
  );
}

function UploadAlternative() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.03)] h-[67px] relative rounded-[12px] shrink-0 w-full" data-name="upload-alternative">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <UploadIcon />
      <UploadText />
    </div>
  );
}

function FormPanel() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(255,255,255,0.03)] left-[200px] max-w-[960px] rounded-[20px] top-[12px] w-[960px]" data-name="form-panel">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] overflow-clip relative rounded-[inherit] size-full">
        <UploadAlternative />
      </div>
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[20px]" />
    </div>
  );
}

function BrandQuestionnaireScreen() {
  return (
    <div className="absolute backdrop-blur-[9px] bg-[#0b0b0b] content-stretch drop-shadow-[0px_18px_20px_rgba(0,0,0,0.4)] flex flex-col h-[760px] items-center justify-center left-[40px] p-[56px] rounded-[20px] top-[205px] w-[1360px]" data-name="brand-questionnaire-screen">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <FormPanel />
    </div>
  );
}

function BgGrid() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0_94px_0] items-start opacity-18" data-name="bg-grid">
      <div className="absolute bg-[rgba(255,255,255,0.08)] bottom-0 left-[120px] top-0 w-px" data-name="Rectangle" />
      <div className="absolute bg-[rgba(255,255,255,0.08)] bottom-0 left-[280px] top-0 w-px" data-name="Rectangle" />
      <div className="absolute bg-[rgba(255,255,255,0.08)] bottom-0 left-[440px] top-0 w-px" data-name="Rectangle" />
      <div className="absolute bg-[rgba(255,255,255,0.08)] bottom-0 left-[600px] top-0 w-px" data-name="Rectangle" />
      <div className="absolute bg-[rgba(255,255,255,0.08)] bottom-0 left-[760px] top-0 w-px" data-name="Rectangle" />
      <div className="absolute bg-[rgba(255,255,255,0.08)] bottom-0 left-[920px] top-0 w-px" data-name="Rectangle" />
      <div className="absolute bg-[rgba(255,255,255,0.08)] bottom-0 left-[1080px] top-0 w-px" data-name="Rectangle" />
      <div className="absolute bg-[rgba(255,255,255,0.08)] bottom-0 left-[1240px] top-0 w-px" data-name="Rectangle" />
      <div className="absolute bg-[rgba(255,255,255,0.08)] h-px left-0 right-0 top-[180px]" data-name="Rectangle" />
      <div className="absolute bg-[rgba(255,255,255,0.08)] h-px left-0 right-0 top-[340px]" data-name="Rectangle" />
      <div className="absolute bg-[rgba(255,255,255,0.08)] h-px left-0 right-0 top-[500px]" data-name="Rectangle" />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="heading">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white whitespace-nowrap">Tell us about your brand</p>
      <div className="bg-[#6fccdd] relative rounded-[4px] shrink-0 size-[8px]" data-name="Rectangle" />
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] h-[48px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[14px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[14px] text-[rgba(255,255,255,0.6)]">e.g. Innovation City</p>
        </div>
      </div>
    </div>
  );
}

function Field() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="field-1">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase whitespace-nowrap">Company / Brand Name</p>
      <Input />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] h-[48px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[14px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[14px] text-[rgba(255,255,255,0.6)]">One line description</p>
        </div>
      </div>
    </div>
  );
}

function Field1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="field-2">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase whitespace-nowrap">Business category</p>
      <Input1 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="row-1">
      <Field />
      <Field1 />
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] h-[48px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[14px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[14px] text-[rgba(255,255,255,0.6)]">Target audience or market</p>
        </div>
      </div>
    </div>
  );
}

function Field2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="field-3">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase whitespace-nowrap">Who are the customers?</p>
      <Input2 />
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] h-[48px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[14px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[14px] text-[rgba(255,255,255,0.6)]">Leave blank if none</p>
        </div>
      </div>
    </div>
  );
}

function Field3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="field-4">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase whitespace-nowrap">Tagline or hero message</p>
      <Input3 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="row-2">
      <Field2 />
      <Field3 />
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] h-[48px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[14px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[14px] text-[rgba(255,255,255,0.6)]">e.g. Book a Call, Order Now</p>
        </div>
      </div>
    </div>
  );
}

function Field4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="field-5">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase whitespace-nowrap">Main call-to-action</p>
      <Input4 />
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] h-[48px] relative rounded-[12px] shrink-0 w-full" data-name="input">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[14px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[14px] text-[rgba(255,255,255,0.6)]">Products, vibe, must-haves - or leave blank</p>
        </div>
      </div>
    </div>
  );
}

function Field5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="field-6">
      <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#6fccdd] text-[12px] uppercase whitespace-nowrap">Anything else important?</p>
      <Input5 />
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="row-3">
      <Field4 />
      <Field5 />
    </div>
  );
}

function FieldsGrid() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="fields-grid">
      <Row />
      <Row1 />
      <Row2 />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="actions">
      <div className="bg-[#6fccdd] relative rounded-[12px] shrink-0 w-full" data-name="Button new">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[16px] relative size-full">
            <div className="[word-break:break-word] flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[14px] text-black uppercase whitespace-nowrap" style={{ fontFeatureSettings: '"case"' }}>
              <p className="leading-[20px]">Save</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MultiQuestionFormScreen() {
  return (
    <div className="absolute backdrop-blur-[9px] bg-[#0b0b0b] h-[577px] left-[40px] rounded-[20px] top-[284px] w-[1360px]" data-name="multi-question-form-screen">
      <div className="content-stretch flex flex-col gap-[32px] items-start overflow-clip p-[56px] relative rounded-[inherit] size-full">
        <div className="absolute bg-gradient-to-r h-px left-0 right-0 top-[140px]" data-name="bg-rule" />
        <BgGrid />
        <Heading />
        <FieldsGrid />
        <Actions />
      </div>
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_18px_40px_-12px_rgba(0,0,0,0.4)]" />
    </div>
  );
}

export default function AiLaunchKitMainPageMergedFlow() {
  return (
    <div className="bg-[#0b0b0b] content-stretch flex flex-col gap-[24px] items-start px-[40px] py-[24px] relative size-full" data-name="AI Launch Kit - Main Page (Merged Flow)">
      <Header />
      <Frame7 />
      <BrandQuestionnaireScreen />
      <MultiQuestionFormScreen />
    </div>
  );
}