"use client";

interface Props {
  disabled: boolean;
}

export default function SaveButton({ disabled }: Props) {
  return (
    <button
  className="
    h-[56px]
    w-[200px]
    rounded-[16px]
    bg-[#EEE9FE]
    text-[18px]
    font-bold
    text-[#5527F5]
  "
>
      저장하기
    </button>
  );
}
