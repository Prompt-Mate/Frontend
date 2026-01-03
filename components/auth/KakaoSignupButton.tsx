"use client";

import { useRouter } from "next/navigation";

export default function KakaoSignupButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/signup")}
      className="
        w-[560px] h-[70px]
        rounded-[12px]
        border border-[#D9DDE0]
        bg-white
        text-[20px] font-semibold text-black
        hover:bg-gray-50
        active:translate-y-[1px]
      "
    >
      회원가입 하기
    </button>
  );
}
