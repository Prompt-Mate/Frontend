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
    "Content-Type": "application/json",
    ...options.headers,
  };

  // AccessToken이 있으면 Authorization 헤더에 추가
  if (accessToken) {
    headers["Authorization"] = accessToken.startsWith("Bearer ")
      ? accessToken
      : `Bearer ${accessToken}`;
  }

  const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
    ...options,
    headers,
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
    throw new Error(errorData.message || `API 요청 실패: ${response.status}`);
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

