/**
 * 애플리케이션 설정 중앙 관리
 * 환경 변수를 통해 개발/배포 환경별로 다른 값 사용 가능
 */

// API 설정
export const config = {
  // 백엔드 API Base URL
  // 개발: http://localhost:8080
  // 배포: http://15.164.131.214:8080
  // 환경 변수로 명시적으로 설정 필요
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8081",

  // 프론트엔드 URL
  frontendUrl:
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",

  // 카카오 OAuth 설정
  kakao: {
    clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
    redirectUri: `${process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"}/login/success`,
  },
} as const;

// 타입 안전성을 위한 타입 export
export type Config = typeof config;

