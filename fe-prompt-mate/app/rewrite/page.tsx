// app/rewrite/page.tsx
"use client";

import { useState } from "react";
import PromptInput from "@/components/rewrite/PromptInput";
import RewriteResult from "@/components/rewrite/RewriteResult";
import RewriteArrow from "@/components/rewrite/RewriteArrow";
import SaveButton from "@/components/rewrite/SaveButton";
import { rewritePrompt } from "@/lib/rewrite";

export default function RewritePage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRewrite = async (text: string) => {
    if (!text.trim()) return;

    setLoading(true);
    const rewritten = await rewritePrompt(text);
    setResult(rewritten);
    setLoading(false);
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-2 text-xl font-bold">프롬프트 다듬기</h1>
      <p className="mb-8 text-sm text-gray-500">
        좋은 답은 좋은 질문에서 시작됩니다. 지금 당신의 프롬프트를 점검해보세요.
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-6">
        {/* 왼쪽 카드 */}
        <PromptInput onRewrite={handleRewrite} loading={loading} />

        {/* 가운데 화살표 */}
        <RewriteArrow />

        {/* 오른쪽 카드 + 저장 버튼 */}
       <div className="flex flex-col gap-4">
       <RewriteResult result={result} loading={loading} />

    <div className="flex justify-end">
      <SaveButton disabled={!result} />
    </div>
  </div>
</div>
    </main>
  );
}
