"use client";

import { getAccessToken, clearAuthData } from "./auth";
import { config } from "./config";

// API 요청 함수
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = getAccessToken();
  
  const headers: HeadersInit = {
    ...options.headers,
  };

  // body가 있으면 Content-Type 추가
  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  // 로그인/회원가입 엔드포인트는 Authorization 헤더를 보내지 않음
  const isPublicEndpoint = endpoint.includes("/api/auth/login") || endpoint.includes("/api/auth/signup");
  
  // AccessToken이 있고 공개 엔드포인트가 아니면 Authorization 헤더에 추가
  if (accessToken && typeof accessToken === "string" && accessToken.trim() !== "" && !isPublicEndpoint) {
    headers["Authorization"] = accessToken.startsWith("Bearer ")
      ? accessToken
      : `Bearer ${accessToken}`;
  }

  const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
    ...options,
    headers,
    // CORS 관련 설정
    mode: "cors",
    credentials: "omit", // 쿠키를 보내지 않음 (로그인 요청이므로)
  });

  // 응답 헤더에서 새로운 AccessToken 확인
  const newAccessToken = response.headers.get("Authorization");
  if (newAccessToken) {
    // 새로운 토큰으로 업데이트
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", newAccessToken);
    }
  }

  // 401 에러 처리 (리프레시 토큰 만료)
  if (response.status === 401) {
    clearAuthData();
    // 로그인 페이지로 리다이렉트
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || errorData.error || `API 요청 실패: ${response.status}`;
    console.error("API 요청 실패:", {
      status: response.status,
      statusText: response.statusText,
      endpoint,
      errorData,
      headers: Object.fromEntries(response.headers.entries()),
    });
    throw new Error(errorMessage);
  }

  return response.json();
}

// GET 요청
export function apiGet<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return apiRequest<T>(endpoint, { ...options, method: "GET" });
}

// POST 요청
export function apiPost<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestInit
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

// PUT 요청
export function apiPut<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestInit
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

// DELETE 요청
export function apiDelete<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return apiRequest<T>(endpoint, { ...options, method: "DELETE" });
}

