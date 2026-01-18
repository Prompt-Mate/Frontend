// services/library.ts
import { apiPost } from "@/lib/api";

// API 응답 타입 정의 (응답이 필요하면 추가)
export interface SaveLibraryResponse {
  id: number;
  // 필요한 응답 필드 추가
}

// API 요청 타입 정의
export interface SaveLibraryRequest {
  rewriteResultId: number;
  savedTitle: string;
  platform: string; // "CHAT_GPT" | "GEMINI" | ...
  category: string; // "WORK_PRODUCTIVITY" | ...
}

/**
 * 라이브러리에 프롬프트 저장 API 호출
 * @param data - 저장할 프롬프트 데이터
 * @returns 저장 결과
 */
export async function saveToLibrary(data: SaveLibraryRequest): Promise<SaveLibraryResponse> {
  try {
    const response = await apiPost<SaveLibraryResponse>(
      "/api/libraries",
      data
    );

    return response;
  } catch (error) {
    console.error("라이브러리 저장 API 호출 실패:", error);
    throw error;
  }
}

