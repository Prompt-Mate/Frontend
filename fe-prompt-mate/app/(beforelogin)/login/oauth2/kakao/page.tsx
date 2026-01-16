"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { config } from "@/lib/config";

export default function KakaoOAuthPage() {
  const router = useRouter();

  useEffect(() => {
    // 카카오 REST API 키 확인
    if (!config.kakao.clientId) {
      console.error("카카오 REST API 키가 설정되지 않았습니다. .env.local 파일에 NEXT_PUBLIC_KAKAO_CLIENT_ID를 설정해주세요.");
      alert("카카오 로그인 설정이 완료되지 않았습니다. 환경 변수를 확인해주세요.");
      router.push("/login");
      return;
    }

    // 카카오 인증 URL 생성 (config에서 설정값 가져오기)
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${config.kakao.clientId}&redirect_uri=${encodeURIComponent(config.kakao.redirectUri)}&response_type=code`;
    
    // 카카오 인증 페이지로 리다이렉트
    window.location.href = kakaoAuthUrl;
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">카카오 로그인 페이지로 이동 중...</p>
      </div>
    </div>
  );
}

