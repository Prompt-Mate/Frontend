"use client";

interface Props {
  disabled: boolean;
  onClick?: () => void; // 추가 (optional로 두면 안전)
}

export default function SaveButton({ disabled, onClick }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        console.log("SAVE BUTTON CLICK");
        onClick?.(); // 없으면 호출 안 함
      }}
      className="
        h-[56px]
        w-[200px]
        rounded-[16px]
        bg-[#EEE9FE]
        text-[18px]
        font-bold
        text-[#5527F5]
        shadow-[0_0_12px_rgba(255,255,255,0.80)_inset]
      hover:brightness-[1.03]
      active:brightness-[0.97]
      transition
      "
    >
      저장하기
    </button>
  );
}