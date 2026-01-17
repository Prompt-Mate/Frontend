// app/components/rewrite/RewriteText.tsx
"use client";

import { useState } from "react";
import PromptInput from "./PromptInput";
import RewriteResult from "./RewriteResult";
import RewriteArrow from "./RewriteArrow";
import SaveButton from "./SaveButton";
import { rewritePrompt } from "@/services/rewrite";

interface RewriteTextProps {
  onComplete?: () => void;      // ✅ 리라이팅 완료 알림 (기존 그대로)
  onSaveClick?: () => void;     // ✅ 저장하기 버튼 클릭 (추가)
}

export default function RewriteText({ onComplete, onSaveClick }: RewriteTextProps) {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRewrite = async (text: string) => {
    if (!text.trim()) return;

    setLoading(true);
    setResult("");

    const rewritten = await rewritePrompt(text);
    setResult(rewritten);
    setLoading(false);

    // 다듬기 완료 → page에 알림
    onComplete?.();
  };

  const handleSave = () => {
    // ✅ 결과 없으면 저장 버튼 동작 X (안전)
    if (!result) return;

    console.log("SAVE CLICK IN RewriteText");
    onSaveClick?.(); // ✅ page에서 모달 open 시키는 함수가 여기로 들어옴
  };

  return (
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
        <PromptInput onRewrite={handleRewrite} loading={loading} />
        <RewriteArrow />

        <div className="flex flex-col h-full">
          <RewriteResult result={result} loading={loading} />

          <div className="mt-6 flex justify-end">
            <SaveButton disabled={!result} onClick={handleSave} />
          </div>
        </div>
      </div>
    </section>
  );
}