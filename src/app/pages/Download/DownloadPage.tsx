import { useState } from "react";
import { Check, CircleHelp, Download, ExternalLink, Globe, RotateCw } from "lucide-react";

import { ScaledPage } from "../../components/common/ScaledPage";
import { TopHeader } from "../../components/common/TopHeader";
import { absoluteApiUrl, BuildView, DeploymentView, launchKitApi, LaunchKitApiError } from "../../launchkit-api";

export function DownloadPage({ build, deployment, onDeploy, onBack, busy }: {
  build: BuildView;
  deployment: DeploymentView | null;
  onDeploy: () => Promise<void>;
  onBack: () => void;
  busy: boolean;
}) {
  const [tip, setTip] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const websiteUrl = absoluteApiUrl(build.webUrl ?? build.previewUrl);

  const handleDownload = async () => {
    if (!build.downloadUrl || downloading) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      await launchKitApi.downloadBuild(build.downloadUrl);
    } catch (error) {
      setDownloadError(
        error instanceof LaunchKitApiError
          ? error.message
          : "The build archive could not be downloaded.",
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <ScaledPage scrollable header={<TopHeader />}>
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="flex-1 flex flex-col items-center px-[clamp(16px,5vw,80px)] py-[clamp(24px,5vw,48px)] gap-[clamp(16px,4vw,32px)]">
          {/* Success state */}
          <div className="flex flex-col items-center gap-[16px] w-full text-center">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 56, height: 56, background: "#6fccdd" }}
            >
              <Check size={24} color="white" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <h2 className="text-white font-semibold px-2" style={{ fontSize: "clamp(19px, 5vw, 24px)" }}>Your website is ready!</h2>
            <p className="px-2 max-w-[420px]" style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 500, lineHeight: 1.6 }}>
              Your AI-generated website is complete and ready to deploy.
            </p>
          </div>

          {/* Website Preview */}
          <div className="flex flex-col gap-[16px] w-full max-w-[680px] mx-auto items-center sm:items-stretch">
            <div className="flex items-center justify-between w-full">
              <span
                className="font-semibold uppercase text-[12px] text-left"
                style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
              >
                Website Preview
              </span>
              <button
                type="button"
                onClick={() => websiteUrl && window.open(websiteUrl, "_blank", "noopener,noreferrer")}
                disabled={!websiteUrl}
                aria-label="Open website preview in a new tab"
                title="Open website preview in a new tab"
                className="flex items-center justify-center rounded-[6px] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  width: 28,
                  height: 28,
                  color: "#6fccdd",
                  background: "rgba(111,204,221,0.1)",
                  border: "1px solid rgba(111,204,221,0.25)",
                }}
              >
                <ExternalLink size={15} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
            <div
              className="flex flex-col overflow-hidden w-full"
              style={{
                height: "clamp(220px, 34vw, 240px)",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Browser chrome */}
              <div
                className="flex items-center gap-[10px] px-[12px]"
                style={{
                  height: 36,
                  background: "#1a1a1a",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  flexShrink: 0,
                }}
              >
                {/* Window dots */}
                {["#6fccdd", "#6fccdd", "#6fccdd"].map((c, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{ width: 10, height: 10, background: c, opacity: 0.7 }}
                  />
                ))}
                {/* Address bar */}
                <div
                  className="flex-1 flex items-center gap-[6px] px-[10px] rounded-[6px]"
                  style={{ height: 22, background: "rgba(255,255,255,0.06)", marginLeft: 8 }}
                >
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1L7 13M1 7h12"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {build.webUrl ?? "Generated website"}
                  </span>
                </div>
                <RotateCw size={14} color="rgba(255,255,255,0.3)" strokeWidth={1.3} aria-hidden="true" />
              </div>

              {/* Preview content */}
              <div className="flex-1 flex flex-col relative" style={{ background: "#111" }}>
                {build.previewUrl && (
                  <iframe
                    src={build.previewUrl}
                    title="Generated website preview"
                    // Matches the mockup preview. Generated pages may need scripts;
                    // everything else (top-level navigation, popups, form submission)
                    // stays blocked. Verify a real completed build still renders if
                    // the generator starts emitting richer output.
                    sandbox="allow-scripts"
                    className="absolute inset-0 w-full h-full border-0"
                    style={{ background: "white", zIndex: 2 }}
                  />
                )}
                {/* Hero gradient */}
                <div
                  className="flex-1 flex flex-col items-center justify-center gap-[8px]"
                  style={{
                    background: "linear-gradient(135deg, #0a1628 0%, #0a1a1a 50%, #111 100%)",
                  }}
                >
                  <div
                    style={{ width: 120, height: 12, borderRadius: 6, background: "rgba(111,204,221,0.5)" }}
                  />
                  <div
                    style={{ width: 200, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.15)" }}
                  />
                  <div
                    className="flex gap-[8px] mt-[8px]"
                  >
                    <div
                      style={{ width: 64, height: 20, borderRadius: 4, background: "#6fccdd" }}
                    />
                    <div
                      style={{
                        width: 64,
                        height: 20,
                        borderRadius: 4,
                        border: "1px solid rgba(111,204,221,0.4)",
                      }}
                    />
                  </div>
                </div>
                {/* Features grid */}
                <div
                  className="grid grid-cols-3 gap-[8px] px-[12px] py-[10px]"
                  style={{ background: "#0d0d0d" }}
                >
                  {[1, 2, 3].map((k) => (
                    <div
                      key={k}
                      style={{
                        height: 32,
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Next Actions */}
          <div className="flex flex-col gap-[16px] w-full max-w-[680px] mx-auto items-center">
            <span
              className="font-semibold uppercase text-[12px] text-center"
              style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}
            >
              Next Actions
            </span>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full items-stretch">
              {/* Download */}
              <div
                className="flex flex-col gap-[16px] p-[24px] rounded-[16px] w-full sm:w-[280px] mx-auto"
                style={{ background: "rgba(111,204,221,0.13)", border: "1px solid rgba(111,204,221,0.2)", minHeight: "100%" }}
              >
                <Download size={24} color="#6fccdd" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <div className="text-white font-semibold text-[14px]">Download</div>
                  <div className="font-medium text-[12px] mt-[4px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Get your complete HTML files
                  </div>
                </div>
                <button
                  onClick={() => { void handleDownload(); }}
                  disabled={!build.downloadUrl || downloading || busy}
                  className="w-full font-semibold text-[13px] py-[10px] rounded-[8px] disabled:opacity-50"
                  style={{ background: "#6fccdd", color: "#0b0b0b" }}
                >
                  {downloading ? "Downloading…" : "Download"}
                </button>
                {downloadError && (
                  <div className="font-medium text-[12px]" style={{ color: "#f87171" }}>
                    {downloadError}
                  </div>
                )}
              </div>

              {/* Deploy */}
              <div
                className="flex flex-col gap-[16px] p-[24px] rounded-[16px] w-full sm:w-[280px] mx-auto"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", minHeight: "100%" }}
              >
                <Globe size={24} color="#6fccdd" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <div className="flex items-center gap-[6px]">
                    <span className="text-white font-semibold text-[14px]">Deploy to Domain</span>

                        <div style={{ position: "relative", display: "inline-flex" }}>
                          <button
                            onMouseEnter={() => setTip(true)}
                            onMouseLeave={() => setTip(false)}
                            onClick={() => setTip(v => !v)}
                            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", width: 16, height: 16, fontSize: 0 }}
                            aria-label="Vercel deployment information"
                          >
                            ⓘ
                          </button>
                          <CircleHelp size={16} aria-hidden="true" style={{ position: "absolute", inset: 0, color: "rgba(255,255,255,0.4)", pointerEvents: "none" }} />
                          {tip && (
                            <div
                              style={{
                                position: "absolute",
                                bottom: "calc(100% + 8px)",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: 240,
                                background: "#1e1e1e",
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: 12,
                                padding: "12px 14px",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                                fontSize: 12,
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.7)",
                                lineHeight: 1.6,
                                zIndex: 100,
                                pointerEvents: "none",
                              }}
                            >
                              Deploying your website uses Vercel. Clicking 'Deploy Now' will redirect you to Vercel, where you can sign in with your email or create a new account to publish your website.
                              <div style={{
                                position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)",
                                width: 10, height: 10, background: "#1e1e1e",
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderTop: "none", borderLeft: "none",
                                rotate: "45deg",
                              }} />
                            </div>
                          )}
                        </div>

                  </div>
                  <div className="font-medium text-[12px] mt-[4px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Requires a connected domain
                  </div>
                </div>
                <button
                  onClick={() => void onDeploy()}
                  disabled={busy}
                  className="w-full font-semibold text-[13px] py-[10px] rounded-[8px] uppercase"
                  style={{ border: "1.5px solid #6fccdd", color: "#6fccdd", background: "transparent" }}
                >
                  {busy
                    ? deployment?.message ?? "Deploying..."
                    : deployment?.status === "ready_to_claim"
                    ? "Open Vercel Claim"
                    : deployment?.status === "failed" || deployment?.status === "cancelled"
                    ? "Try Deployment Again"
                    : "Deploy Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScaledPage>
  );
}
