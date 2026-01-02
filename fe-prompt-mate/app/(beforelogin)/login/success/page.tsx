"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveAuthData, type AuthResponse } from "@/lib/auth";
import { apiGet } from "@/lib/api";

export default function LoginSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    // 에러가 있으면 처리
    if (error) {
      setStatus("error");
      setErrorMessage("로그인에 실패했습니다.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }

    // 인가코드가 없으면 에러
    if (!code) {
      setStatus("error");
      setErrorMessage("인가코드를 받지 못했습니다.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }

    // 카카오로부터 받은 인가코드를 백엔드 API에 전달하여 JWT 토큰 받기
    // 플로우:
    // 1. 프론트엔드 → /login/oauth2/kakao (프론트엔드 라우트)
    // 2. 프론트엔드 → 카카오 인증 페이지 (redirect_uri: http://localhost:3000/login/success)
    // 3. 카카오 → 프론트엔드(http://localhost:3000/login/success?code=xxx)
    // 4. 프론트엔드 → 백엔드 API(GET /login/oauth2/kakao?code=xxx) → JWT 토큰 받기
    const exchangeCodeForToken = async () => {
      try {
        // config에서 API Base URL을 가져와서 사용
        const authData = await apiGet<AuthResponse>(
          `/login/oauth2/kakao?code=${code}`
        );
        
        // 토큰 및 사용자 정보 저장
        saveAuthData(authData);

        setStatus("success");
        
        // 홈으로 리다이렉트
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } catch (error) {
        console.error("토큰 교환 실패:", error);
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "로그인 처리 중 오류가 발생했습니다."
        );
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    };

    exchangeCodeForToken();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">로그인 처리 중...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <p className="text-lg text-gray-600">로그인 성공!</p>
            <p className="text-sm text-gray-500 mt-2">홈으로 이동합니다...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-red-500 text-4xl mb-4">✗</div>
            <p className="text-lg text-red-600">{errorMessage}</p>
            <p className="text-sm text-gray-500 mt-2">로그인 페이지로 이동합니다...</p>
          </>
        )}
      </div>
    </div>
  );
}

