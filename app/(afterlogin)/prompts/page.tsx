"use client";

import { useEffect, useState } from "react";
import RewriteText from "@/components/rewrite/RewriteText";
import EvaluationSectionHeader from "@/components/EvaluationSectionHeader";
import PromptEvaluationCard from "@/components/PromptEvaluationCard";

export default function PromptsPage() {
  const [pendingEvaluation, setPendingEvaluation] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);

  // ⏱ 평가 결과 딜레이 처리
  useEffect(() => {
    if (!pendingEvaluation) return;

    const timer = setTimeout(() => {
      setShowEvaluation(true);
    }, 500); // 0.5초 딜레이

    return () => clearTimeout(timer);
  }, [pendingEvaluation]);

  return (
    <div className="px-8 py-10 space-y-24">
      {/* 프롬프트 다듬기 */}
      <RewriteText
        onComplete={() => {

          setShowEvaluation(false);
          setPendingEvaluation(false);

          setTimeout(() => {
            setPendingEvaluation(true);
          }, 0);
        }}
      />

      {/* 평가 결과 */}
      {showEvaluation && (
        <section className="space-y-10">
          <EvaluationSectionHeader />
          <PromptEvaluationCard />
        </section>
      )}
    </div>
  );
}
