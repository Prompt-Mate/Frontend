"use client";

import { useRouter } from "next/navigation";

export default function SignupButton() {
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
      "
    >
      회원가입 하기
    </button>
  );
}
