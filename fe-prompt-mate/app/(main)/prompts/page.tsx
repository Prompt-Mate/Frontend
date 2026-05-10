// app/(afterlogin)/prompts/page.tsx
"use client";

import { useState } from "react";
import Container from "@/shared/components/layout/Container";
import RewriteText from "@/app/(main)/prompts/_components/RewriteText";
import { EvaluationSectionHeader } from "@/app/(main)/prompts/_components/EvaluationSectionHeader";
import { PromptEvaluationCard } from "@/app/(main)/prompts/_components/PromptEvaluationCard";
import SavePromptModal from "@/app/(main)/prompts/_components/SavePromptModal";
import { type JudgeResponse } from "@/shared/api/judge";

export default function PromptsPage() {
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [judgeResult, setJudgeResult] = useState<JudgeResponse | null>(null);
  const [rewriteResultId, setRewriteResultId] = useState<number | null>(null);

  return (
    <Container>
      <section className="space-y-6 md:space-y-8">
        <RewriteText 
          onSaveClick={(id) => {
            setRewriteResultId(id);
            setIsSaveOpen(true);
          }}
          onJudgeComplete={(result) => setJudgeResult(result)}
        />
        {judgeResult && (
          <>
            <EvaluationSectionHeader />
            <PromptEvaluationCard judgeResult={judgeResult} />
          </>
        )}
      </section>

      {isSaveOpen && rewriteResultId !== null && (
        <SavePromptModal 
          rewriteResultId={rewriteResultId}
          onClose={() => {
            setIsSaveOpen(false);
            setRewriteResultId(null);
          }} 
        />
      )}
    </Container>
  );
}