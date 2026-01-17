// app/(afterlogin)/prompts/page.tsx
"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";
import RewriteText from "@/components/rewrite/RewriteText";
import { EvaluationSectionHeader } from "@/components/rewrite/EvaluationSectionHeader";
import { PromptEvaluationCard } from "@/components/rewrite/PromptEvaluationCard";
import SavePromptModal from "@/components/prompts/SavePromptModal";
import { type JudgeResponse } from "@/services/judge";

export default function PromptsPage() {
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [judgeResult, setJudgeResult] = useState<JudgeResponse | null>(null);

  return (
    <Container>
      <section className="space-y-6 md:space-y-8">
        <RewriteText 
          onSaveClick={() => setIsSaveOpen(true)}
          onJudgeComplete={(result) => setJudgeResult(result)}
        />
        {judgeResult && (
          <>
            <EvaluationSectionHeader />
            <PromptEvaluationCard judgeResult={judgeResult} />
          </>
        )}
      </section>

      {isSaveOpen && <SavePromptModal onClose={() => setIsSaveOpen(false)} />}
    </Container>
  );
}