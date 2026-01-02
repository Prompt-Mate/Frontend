//app/components/rewrite/RewriteText.tsx

"use client";

import { useState } from "react";
import PromptInput from "./PromptInput";
import RewriteResult from "./RewriteResult";
import RewriteArrow from "./RewriteArrow";
import SaveButton from "./SaveButton";
import { rewritePrompt } from "@/lib/rewrite";

interface RewriteTextProps {
  onComplete?: () => void; // 🔑 다듬기 완료 알림용
}

export default function RewriteText({ onComplete }: RewriteTextProps) {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRewrite = async (text: string) => {
    if (!text.trim()) return;

    setLoading(true);
    setResult("");

    const rewritten = await rewritePrompt(text);
    setResult(rewritten);
    setLoading(false);

    // 다듬기 → page에 알림
    onComplete?.();
  };

  return (
    /* 한 화면 기준 컨테이너 */
    <section
      className="
        max-w-[1200px]
        min-h-[560px]
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

      {/* 카드 영역 */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-8 flex-1">
        {/* 왼쪽: PromptInput */}
        <PromptInput onRewrite={handleRewrite} loading={loading} />

        {/* 가운데: 화살표 */}
        <RewriteArrow />

        {/* 오른쪽: Result + Save */}
        <div className="flex flex-col h-full">
          <RewriteResult result={result} loading={loading} />

          <div className="mt-6 flex justify-end">
            <SaveButton disabled={!result} />
          </div>
        </div>
      </div>
    </section>
  );
}
