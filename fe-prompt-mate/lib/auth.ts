"use client";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_INFO_KEY = "userInfo";
const ACCESS_TOKEN_COOKIE = "accessToken";

export interface UserInfo {
  userId: number;
  email: string;
  nickname: string;
}

export interface AuthResponse {
  userId: number;
  email: string;
  nickname: string;
  jwtAceessToken: string;
  jwtRefreshToken: string;
}

// 쿠키 설정 헬퍼
function setCookie(name: string, value: string, days: number = 7) {
  if (typeof window !== "undefined") {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
}

// 쿠키 삭제 헬퍼
function deleteCookie(name: string) {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
}

// 토큰 저장 (localStorage + 쿠키)
export function setAccessToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    setCookie(ACCESS_TOKEN_COOKIE, token, 7); // 7일 유효
  }
}

export function setRefreshToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
}

// 토큰 가져오기
export function getAccessToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
}

export function getRefreshToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return null;
}

// 사용자 정보 저장
export function setUserInfo(userInfo: UserInfo) {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  }
}

// 사용자 정보 가져오기
export function getUserInfo(): UserInfo | null {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem(USER_INFO_KEY);
    return userInfo ? JSON.parse(userInfo) : null;
  }
  return null;
}

// 인증 정보 저장 (로그인 성공 시)
export function saveAuthData(authData: AuthResponse) {
  setAccessToken(authData.jwtAceessToken);
  setRefreshToken(authData.jwtRefreshToken);
  setUserInfo({
    userId: authData.userId,
    email: authData.email,
    nickname: authData.nickname,
  });
}

// 로그아웃 (모든 인증 정보 제거)
export function clearAuthData() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
    deleteCookie(ACCESS_TOKEN_COOKIE);
  }
}

// 인증 상태 확인
export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

