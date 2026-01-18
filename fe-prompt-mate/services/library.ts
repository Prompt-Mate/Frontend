// services/library.ts
import { apiRequest } from "@/lib/api";

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
  image?: File | null; // 이미지 파일 (선택적)
}

/**
 * 라이브러리에 프롬프트 저장 API 호출 (multipart/form-data)
 * @param data - 저장할 프롬프트 데이터
 * @returns 저장 결과
 */
export async function saveToLibrary(data: SaveLibraryRequest): Promise<SaveLibraryResponse> {
  try {
    // FormData 생성
    const formData = new FormData();
    formData.append("rewriteResultId", String(data.rewriteResultId));
    formData.append("savedTitle", data.savedTitle);
    formData.append("platform", data.platform);
    formData.append("category", data.category);
    
    // 이미지가 있으면 추가
    if (data.image) {
      formData.append("image", data.image);
    }

    // apiRequest를 직접 호출 (FormData는 JSON.stringify 하지 않음)
    const response = await apiRequest<SaveLibraryResponse>(
      "/api/libraries",
      {
        method: "POST",
        body: formData, // FormData는 그대로 전달
      }
    );

    return response;
  } catch (error) {
    console.error("라이브러리 저장 API 호출 실패:", error);
    throw error;
  }
}

