// app/components/rewrite/RewriteText.tsx
"use client";

import { useState } from "react";
import PromptInput from "./PromptInput";
import RewriteResult from "./RewriteResult";
import RewriteArrow from "./RewriteArrow";
import SaveButton from "./SaveButton";
import { rewritePrompt } from "@/services/rewrite";
import { judgePrompt, type JudgeResponse } from "@/services/judge";

interface RewriteTextProps {
  onComplete?: () => void;      // 리라이팅 완료 알림 (기존 그대로)
  onSaveClick?: (rewriteResultId: number) => void;     // 저장하기 버튼 클릭 (rewriteResultId 전달)
  onJudgeComplete?: (judgeResult: JudgeResponse) => void; // 평가 완료 알림
}

export default function RewriteText({ onComplete, onSaveClick, onJudgeComplete }: RewriteTextProps) {
  const [result, setResult] = useState("");
  const [rewriteResultId, setRewriteResultId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRewrite = async (text: string) => {
    if (!text.trim()) return;

    setLoading(true);
    setResult("");
    setRewriteResultId(null);

    try {
      // 1. 먼저 rewrite API 호출
      const rewriteResponse = await rewritePrompt(text);
      
      setResult(rewriteResponse.rewrittenPrompt);
      setRewriteResultId(rewriteResponse.rewriteResultId);
      
      // 2. rewriteResultId를 받은 후 judge API 호출
      const judgeResult = await judgePrompt(
        rewriteResponse.rewriteResultId,
        text
      );
      
      // 평가 결과를 상위 컴포넌트로 전달
      onJudgeComplete?.(judgeResult);

      // 다듬기 완료 → page에 알림
      onComplete?.();
    } catch (error) {
      console.error("프롬프트 처리 실패:", error);
      // rewrite만 성공한 경우에도 결과 표시
      try {
        const rewriteResponse = await rewritePrompt(text);
        setResult(rewriteResponse.rewrittenPrompt);
        setRewriteResultId(rewriteResponse.rewriteResultId);
      } catch (rewriteError) {
        console.error("프롬프트 재작성 실패:", rewriteError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    // 결과 없으면 저장 버튼 동작 X (안전)
    if (!result || !rewriteResultId) return;

    console.log("SAVE CLICK IN RewriteText", rewriteResultId);
    onSaveClick?.(rewriteResultId); // rewriteResultId 전달
  };

  return (
    <section
      className="
        max-w-[1200px]
        min-h-[600px]
        flex
        flex-col
        gap-10
      "
    >
      {/* 제목 영역 */}
      <div>
        <h1 className="text-[34px] font-bold text-[#343434]">
          프롬프트 다듬기
        </h1>
        <p className="mt-2 text-[18px] text-[#919395]">
          좋은 답은 좋은 질문에서 시작됩니다. 지금 당신의 프롬프트를 점검해보세요.
        </p>
      </div>

      {/* 입력 / 결과 영역 */}
      <div
        className="
          grid
          gap-8
          grid-cols-1
          xl:grid-cols-[minmax(480px,1fr)_auto_minmax(480px,1fr)]
          items-start
        "
      >
        {/* 입력 카드 */}
        <div className="min-h-[420px]">
          <PromptInput onRewrite={handleRewrite} loading={loading} />
        </div>

        {/* 화살표 (2컬럼일 때만 표시) */}
        <div className="hidden xl:flex items-center justify-center">
          <RewriteArrow />
        </div>

        {/* 결과 카드 */}
        <div className="min-h-[420px] flex flex-col">
          <RewriteResult result={result} loading={loading} />

          <div className="mt-6 flex justify-end">
            <SaveButton disabled={!result} onClick={handleSave} />
          </div>
        </div>
      </div>
    </section>
  );
}
