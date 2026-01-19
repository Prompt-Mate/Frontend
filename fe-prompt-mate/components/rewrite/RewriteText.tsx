// app/components/rewrite/RewriteText.tsx
"use client";

import { useState } from "react";
import PromptInput from "./PromptInput";
import RewriteResult from "./RewriteResult";
import RewriteArrow from "./RewriteArrow";
import SaveButton from "./SaveButton";
import { rewritePrompt } from "@/lib/rewrite";

interface RewriteTextProps {
  onComplete?: () => void;
  onSaveClick?: () => void;
}

export default function RewriteText({
  onComplete,
  onSaveClick,
}: RewriteTextProps) {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRewrite = async (text: string) => {
    if (!text.trim()) return;

    setLoading(true);
    setResult("");

    const rewritten = await rewritePrompt(text);
    setResult(rewritten);
    setLoading(false);

    onComplete?.();
  };

  const handleSave = () => {
    if (!result) return;
    onSaveClick?.();
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
