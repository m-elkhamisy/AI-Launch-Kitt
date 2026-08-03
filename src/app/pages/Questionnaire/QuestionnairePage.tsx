import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import svgPathsMerged from "@/imports/merged-flow-paths";

import { ScaledPage } from "../../components/common/ScaledPage";
import { SubNav } from "../../components/common/SubNav";
import { TopHeader } from "../../components/common/TopHeader";
import { ValidationError } from "../../components/common/ValidationError";
import { ProjectView } from "../../launchkit-api";
import { profileFileSchema, questionnaireSchema, QuestionnaireValues } from "../../wizard-validation";

export type QuestionnaireForm = QuestionnaireValues;

export function QuestionnairePage({ project, onSave, onUpload, onBack, onStepClick, completedUpTo, busy }: {
  project: ProjectView;
  onSave: (form: QuestionnaireForm) => Promise<void>;
  onUpload: (file: File) => Promise<void>;
  onBack: () => void;
  onStepClick?: (step: number) => void;
  completedUpTo?: number;
  busy: boolean;
}) {
  const p = svgPathsMerged;
  const [uploadOpen, setUploadOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, reset, handleSubmit, formState: { errors } } = useForm<QuestionnaireForm>({
    resolver: zodResolver(questionnaireSchema),
    defaultValues: {
      companyName: project.business.companyName,
      uniqueness: project.business.uvp,
      customers: project.business.targetAudience,
      tagline: project.design.tagline,
      cta: project.design.cta,
      anythingElse: project.business.notes,
    },
    mode: "onTouched",
  });

  async function acceptFile(file: File) {
    const validation = profileFileSchema.safeParse(file);
    if (!validation.success) {
      setUploadError(validation.error.issues[0]?.message ?? "Choose a valid profile file.");
      return;
    }
    setUploadError(undefined);
    setUploadedFile(file);
    setUploadOpen(false);
    await onUpload(file);
  }

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) void acceptFile(file);
  }
  function handleFileChoose(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void acceptFile(file);
  }

  useEffect(() => {
    reset({
      companyName: project.business.companyName,
      uniqueness: project.business.uvp,
      customers: project.business.targetAudience,
      tagline: project.design.tagline,
      cta: project.design.cta,
      anythingElse: project.business.notes,
    });
  }, [project.updatedAt, project.business, project.design, reset]);

  const continueQuestionnaire = () => void handleSubmit(onSave)();

  const fields: Array<Array<{ key: keyof QuestionnaireForm; label: string; placeholder: string; optional?: boolean }>> = [
    [
      { key: "companyName", label: "Company / Brand Name", placeholder: "e.g. Acme Corp" },
      { key: "uniqueness", label: "What makes your business unique?", placeholder: "e.g. 10 years of expertise, eco-friendly..." },
    ],
    [
      { key: "customers", label: "Who Are Your Customers?", placeholder: "e.g. Small business owners..." },
      { key: "tagline", label: "Tagline / Hero Message", placeholder: "e.g. Build faster, ship smarter" },
    ],
    [
      { key: "cta", label: "Main Call to Action", placeholder: "e.g. Get Started Free" },
      { key: "anythingElse", label: "Anything Else?", placeholder: "Additional context...", optional: true },
    ],
  ];

  return (
    <ScaledPage
      scrollable
      header={<><TopHeader /><SubNav activeStep={0} completedUpTo={completedUpTo} onBack={onBack} onNext={busy ? undefined : continueQuestionnaire} onStepClick={onStepClick} /></>}
    >
      <div
        className="w-full min-h-full flex flex-col"
        style={{ background: "#0b0b0b", fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="flex-1 px-[clamp(16px,5vw,80px)] py-[clamp(24px,5vw,48px)] flex flex-col gap-[clamp(12px,3vw,24px)]">
          {/* Upload banner */}
          <div
            className="flex items-center justify-between px-[24px] py-[18px]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid white",
              borderRadius: 12,
              cursor: "pointer",
            }}
            onClick={() => setUploadOpen(true)}
          >
            <div className="flex items-center gap-[12px]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d={p.p2c12f480}
                  stroke="#6FCCDD"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-white font-semibold text-[14px]">
                {uploadedFile ? `Uploaded: ${uploadedFile.name}` : "Prefer to upload your portfolio instead?"}
              </span>
            </div>
            <button
              className="font-semibold text-[14px] underline"
              style={{ color: "#6fccdd" }}
              onClick={(e) => { e.stopPropagation(); setUploadOpen(true); }}
            >
              {uploadedFile ? "Change file →" : "Upload here →"}
            </button>
          </div>
          <ValidationError message={uploadError} />

          {/* Upload overlay */}
          {uploadOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", zIndex: 9999 }}
              onClick={() => setUploadOpen(false)}
            >
              <div
                className="flex flex-col items-center gap-[24px] p-5 sm:p-12 w-[calc(100%-32px)] sm:w-[520px] max-h-[90vh] overflow-y-auto"
                style={{
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 20,
                  fontFamily: "'Montserrat', sans-serif",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-white font-semibold text-[18px]">Upload Portfolio</span>
                  <button
                    onClick={() => setUploadOpen(false)}
                    style={{ color: "rgba(255,255,255,0.5)", fontSize: 22, lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
                  >×</button>
                </div>

                {/* Drop zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleFileDrop}
                  className="flex flex-col items-center justify-center gap-[16px] w-full"
                  style={{
                    border: `2px dashed ${dragOver ? "#6FCCDD" : "rgba(255,255,255,0.2)"}`,
                    borderRadius: 14,
                    padding: "48px 32px",
                    background: dragOver ? "rgba(111,204,221,0.06)" : "rgba(255,255,255,0.02)",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="rgba(111,204,221,0.1)" />
                    <path d="M24 32V20M24 20L19 25M24 20L29 25" stroke="#6FCCDD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 34h16" stroke="#6FCCDD" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className="text-center">
                    <p className="text-white font-semibold text-[15px]">Drag & drop your file here</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 6 }}>or click to browse from your computer</p>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                    PDF · DOCX · PPTX · TXT · PNG · JPG — max 20 MB
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.pptx,.txt,.md,.png,.jpg,.jpeg"
                  style={{ display: "none" }}
                  onChange={handleFileChoose}
                />

                {/* Or divider */}
                <div className="flex items-center gap-[12px] w-full">
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>or</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
                </div>

                <button
                  className="w-full font-semibold text-[14px]"
                  style={{
                    background: "#6FCCDD",
                    color: "#0b0b0b",
                    border: "none",
                    borderRadius: 10,
                    padding: "14px 0",
                    cursor: "pointer",
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose File from Computer
                </button>
              </div>
            </div>
          )}

          {/* Main form panel */}
          <div
            className="relative flex flex-col gap-[clamp(20px,4vw,40px)] p-[clamp(20px,6vw,56px)]"
            style={{
              background: "#0b0b0b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              boxShadow: "0 18px 40px -12px rgba(0,0,0,0.4)",
            }}
          >
            {/* Grid background */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ opacity: 0.04, pointerEvents: "none" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <div className="flex items-center gap-[10px] relative">
              <h2 className="text-white font-semibold" style={{ fontSize: "clamp(19px, 5vw, 24px)" }}>Tell us about your brand</h2>
              <div className="w-[8px] h-[8px] rounded-full" style={{ background: "#6fccdd" }} />
            </div>

            {fields.map((row, ri) => (
              <div key={ri} className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
                {row.map(({ key, label, placeholder, optional }) => (
                  <div key={key} className="flex flex-col gap-[8px]">
                    <label
                      className="font-semibold uppercase"
                      style={{ fontSize: 12, color: "#6fccdd", letterSpacing: "0.08em" }}
                    >
                      {label}{optional ? " (Optional)" : " *"}
                    </label>
                    <div
                      className="flex items-center"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: errors[key] ? "1px solid rgba(248,113,113,0.8)" : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12,
                        height: 48,
                        padding: "0 16px",
                      }}
                    >
                      <input
                        className="w-full bg-transparent outline-none font-medium text-[14px]"
                        style={{ color: "white", caretColor: "#6fccdd" }}
                        placeholder={placeholder}
                        {...register(key)}
                        aria-invalid={Boolean(errors[key])}
                        aria-describedby={errors[key] ? `${key}-error` : undefined}
                      />
                    </div>
                    <ValidationError id={`${key}-error`} message={errors[key]?.message} />
                  </div>
                ))}
              </div>
            ))}

            {/* Save button */}
            <button
              onClick={continueQuestionnaire}
              disabled={busy}
              className="w-full font-semibold text-[14px] uppercase"
              style={{
                background: "#6fccdd",
                color: "#0b0b0b",
                borderRadius: 12,
                padding: "16px 0",
              }}
            >
              {busy ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </div>
    </ScaledPage>
  );
}
