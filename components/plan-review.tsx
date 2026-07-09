"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SitePlan } from "@/types/generation";

interface PlanReviewProps {
  plan: SitePlan;
  busy?: boolean;
  onApprove: () => void;
  onRevise: (feedback: string) => void;
}

export function PlanReview({ plan, busy, onApprove, onRevise }: PlanReviewProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          {plan.pages.length} pages planned
        </p>
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{plan.raw}</pre>
      </Card>

      {!showFeedback ? (
        <div className="flex flex-wrap gap-3">
          <Button onClick={onApprove} disabled={busy}>
            {busy ? "Building…" : "Approve & build"}
          </Button>
          <Button variant="outline" onClick={() => setShowFeedback(true)} disabled={busy}>
            Request changes
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="e.g. Combine the FAQ page into Home, and add a Careers page"
            rows={3}
            disabled={busy}
          />
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => {
                onRevise(feedback);
                setShowFeedback(false);
                setFeedback("");
              }}
              disabled={busy || !feedback.trim()}
            >
              {busy ? "Revising…" : "Revise plan"}
            </Button>
            <Button variant="ghost" onClick={() => setShowFeedback(false)} disabled={busy}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
