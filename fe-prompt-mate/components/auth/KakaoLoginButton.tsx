"use client";

import KakaoIcon from "@/assets/icons/kakao.svg";
import { useRouter } from "next/navigation";

export default function KakaoLoginButton() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    // 프론트엔드 라우트로 이동
    // /login/oauth2/kakao 페이지에서 카카오 인증 URL 생성 후 리다이렉트
    router.push("/login/oauth2/kakao");
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="
        w-[560px] h-[70px]
        rounded-[12px]
        bg-[#FEE500]
        flex items-center justify-center gap-[12px]
        text-[20px] font-semibold text-black
        hover:brightness-95
        active:translate-y-[1px]
      "
    >
      <KakaoIcon className="w-9 h-9" />
      카카오 계정으로 계속하기
    </button>
  );
}