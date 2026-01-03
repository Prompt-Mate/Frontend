// components/rewrite/SaveButton.tsx
"use client";

interface Props {
  disabled: boolean;
}

export default function SaveButton({ disabled }: Props) {
  return (
    <button
      disabled={disabled}
      className="
        w-[183px]
        h-[55px]
        rounded-[15px]
        bg-violet-100
        text-sm
        font-medium
        text-violet-600
        flex items-center justify-center
        shadow-[inset_0_2px_4px_rgba(255,255,255,0.35)]
        disabled:opacity-40
        disabled:cursor-not-allowed
      "
    >
      저장하기
    </button>
  );
}

