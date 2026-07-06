import svgPaths from "./svg-vkbqpr62md";

function LogoMarkContainer() {
  return (
    <div className="relative shrink-0 size-[52px]" data-name="logo-mark-container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
        <g id="logo-mark-container">
          <rect fill="var(--fill-0, white)" fillOpacity="0.0196078" height="52" rx="14" width="52" />
          <rect height="51" rx="13.5" stroke="var(--stroke-0, white)" strokeOpacity="0.1" width="51" x="0.5" y="0.5" />
          <g id="Vector">
            <path d={svgPaths.pdbfe710} fill="var(--fill-0, #5752A3)" />
            <path d={svgPaths.p389a4180} fill="var(--fill-0, #5752A3)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function HeadingGroup() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-center relative shrink-0 text-center w-full" data-name="heading-group">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white w-full">Check your email</p>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.6)] w-full">We sent a 6-digit code to you@example.com</p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="card-header">
      <LogoMarkContainer />
      <HeadingGroup />
    </div>
  );
}

function OtpBox() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] content-stretch flex flex-col items-center justify-center relative rounded-[12px] shrink-0 size-[56px]" data-name="otp-box-1">
      <div aria-hidden className="absolute border-2 border-[#6fccdd] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_0px_12px_0px_rgba(14,207,207,0.4)]" />
      <p className="[word-break:break-word] font-['Montserrat:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[24px] text-white whitespace-nowrap">·</p>
    </div>
  );
}

function OtpBox1() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] content-stretch flex flex-col items-center justify-center relative rounded-[12px] shrink-0 size-[56px]" data-name="otp-box-2">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Montserrat:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[24px] text-white whitespace-nowrap">·</p>
    </div>
  );
}

function OtpBox2() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] content-stretch flex flex-col items-center justify-center relative rounded-[12px] shrink-0 size-[56px]" data-name="otp-box-3">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Montserrat:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[24px] text-white whitespace-nowrap">·</p>
    </div>
  );
}

function OtpBox3() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] relative rounded-[12px] shrink-0 size-[56px]" data-name="otp-box-4">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function OtpBox4() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] relative rounded-[12px] shrink-0 size-[56px]" data-name="otp-box-5">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function OtpBox5() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] relative rounded-[12px] shrink-0 size-[56px]" data-name="otp-box-6">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function OtpRow() {
  return (
    <div className="content-stretch flex gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="otp-row">
      <OtpBox />
      <OtpBox1 />
      <OtpBox2 />
      <OtpBox3 />
      <OtpBox4 />
      <OtpBox5 />
    </div>
  );
}

function VerifyCodeBtn() {
  return (
    <div className="bg-[#6fccdd] relative rounded-[12px] shrink-0 w-full" data-name="verify-code-btn">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative size-full">
          <p className="[word-break:break-word] font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-white uppercase whitespace-nowrap" style={{ fontFeatureSettings: '"case"' }}>
            Verify Code
          </p>
        </div>
      </div>
    </div>
  );
}

function ResendRow() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="resend-row">
      <p className="leading-[20px] relative shrink-0 text-[rgba(255,255,255,0.6)]">{`Didn't receive a code?`}</p>
      <a className="block leading-[0] relative shrink-0 text-[#6fccdd]" href="https://innovationcity.com/resend" target="_blank">
        <p className="cursor-pointer leading-[20px]">Resend</p>
      </a>
    </div>
  );
}

function Links() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Montserrat:Medium',sans-serif] font-medium gap-[8px] items-center relative shrink-0 text-[14px] w-full whitespace-nowrap" data-name="links">
      <ResendRow />
      <p className="leading-[20px] relative shrink-0 text-[rgba(255,255,255,0.6)]">← Back to email</p>
    </div>
  );
}

function FormSection() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="form-section">
      <OtpRow />
      <VerifyCodeBtn />
      <Links />
    </div>
  );
}

function LoginCard() {
  return (
    <div className="bg-[#131313] content-stretch flex flex-col gap-[28px] items-center p-[48px] relative rounded-[20px] shrink-0 w-[480px]" data-name="login-card">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <CardHeader />
      <div className="bg-[rgba(255,255,255,0.1)] h-px relative shrink-0 w-full" data-name="divider" />
      <FormSection />
    </div>
  );
}

function LoginArea() {
  return (
    <div className="absolute content-stretch flex flex-col h-[816px] items-center justify-center left-[480px] top-[84px] w-[480px]" data-name="login-area">
      <LoginCard />
    </div>
  );
}

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

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center left-[1168px] top-[30px]">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute backdrop-blur-[20px] h-[84px] left-0 top-0 w-[1440px]" data-name="header">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <Logo />
      <div className="-translate-y-1/2 absolute left-[1368px] size-[36px] top-1/2">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Ellipse 1" />
        </svg>
      </div>
      <Frame2 />
    </div>
  );
}

export default function AiLaunchKitLoginPage() {
  return (
    <div className="bg-[#0b0b0b] content-stretch flex flex-col gap-[24px] items-start px-[40px] py-[24px] relative size-full" data-name="AI Launch Kit - Login Page">
      <LoginArea />
      <Header />
    </div>
  );
}