"use client";

import { useState } from "react";
import StarIcon from "@/assets/icons/StarPrompt.svg";

interface Props {
  onRewrite: (text: string) => void;
  loading: boolean;
}

export default function PromptInput({ onRewrite, loading }: Props) {
  const [value, setValue] = useState("");

  return (
    <div
      className="
        flex flex-col
        h-[481px]             
        rounded-2xl
        bg-ui-surface
        p-9
      "
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between h-[32px] shrink-0">
        <h2 className="text-[24px] font-bold text-ui-text">
          내 프롬프트 입력하기
        </h2>
      </div>

      {/* textarea */}
      <textarea
        className="
          mt-6
          flex-1              
          w-full
          resize-none
          overflow-auto  // 입력 내용이 많으면 내부에서 스크롤 
          rounded-lg
          border
          p-4
        "
        placeholder="다듬고 싶은 프롬프트를 입력해보세요."
        maxLength={1000}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* 카운트 */}
      <div className="mt-2 text-right text-xs text-ui-textMuted shrink-0">
        {value.length} / 1000
      </div>

      {/* 버튼 */}
      <button
  disabled={loading}
  onClick={() => onRewrite(value)}
  className="
    mt-6
    h-[55px]
    px-6
    flex items-center justify-center gap-2
    shrink-0
    rounded-[15px]
    bg-[#5527F5]
    text-[18px]
    font-bold
    text-white
    shadow-[0_0_12px_rgba(255,255,255,0.80)_inset]
      hover:brightness-[1.03]
      active:brightness-[0.97]
      transition
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  <StarIcon className="h-[20px] w-[20px]" />
  <span>프롬프트 다듬기</span>
</button>

    </div>
  );
}