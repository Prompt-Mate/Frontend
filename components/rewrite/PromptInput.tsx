// components/rewrite/PromptInput.tsx
"use client";

import { useState } from "react";

interface Props {
  onRewrite: (text: string) => void;
  loading: boolean;
}

export default function PromptInput({ onRewrite, loading }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="rounded-2xl border bg-white p-6">
      <h2 className="mb-4 text-sm font-semibold">내 프롬프트 입력하기</h2>

     <textarea
  maxLength={1000}
  className="
    mt-3
    h-[400px]
    w-full
    resize-none
    rounded-lg
    border
    p-4
    text-sm
    outline-none
  "
  placeholder="다듬고 싶은 프롬프트를 입력해보세요."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

      <div className="mt-2 text-right text-xs text-gray-400">
        {value.length} / 1000
      </div>


      <button
        disabled={loading}
        onClick={() => onRewrite(value)}
        className="
          mt-4
          h-[70px]
          w-full
          rounded-[20px]
          px-8
          text-sm
          font-medium
          text-white
          flex items-center justify-center gap-2

          bg-gradient-to-b
            from-[#6A3AF6]
            to-[#4B1FD1]
         shadow-[0_8px_20px_rgba(139,92,246,0.35),inset_0_1px_2px_rgba(255,255,255,0.35)]

          hover:brightness-105
          active:translate-y-[1px]

          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        ✨ 프롬프트 다듬기
      </button>
    </div>
  );
}
