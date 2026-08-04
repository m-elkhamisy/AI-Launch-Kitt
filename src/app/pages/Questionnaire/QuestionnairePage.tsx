import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ScaledPage } from "../../components/common/ScaledPage";
import { SubNav } from "../../components/common/SubNav";
import { TopHeader } from "../../components/common/TopHeader";
import { ValidationError } from "../../components/common/ValidationError";
import { ProjectView } from "../../launchkit-api";
import { profileFileSchema, questionnaireSchema, QuestionnaireValues } from "../../wizard-validation";
import { UploadPortfolioModal } from "./UploadPortfolioModal";

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
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>();
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
              <Upload size={18} color="#6FCCDD" strokeWidth={2} aria-hidden="true" />
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
            <UploadPortfolioModal
              onClose={() => setUploadOpen(false)}
              onFileChosen={(file) => void acceptFile(file)}
            />
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
