// services/library.ts
import { apiRequest, apiGet } from "@/lib/api";

// 내 라이브러리 아이템 타입 정의
export interface MyLibraryItem {
  id: number;
  userId: number;
  rewriteResultId: number;
  savedTitle: string;
  content: string;
  platform: string; // "CHAT_GPT" | "GEMINI" | ...
  category: string; // "WORK_PRODUCTIVITY" | "STUDY" | ...
  imageUrl: string | null;
  createdAt: string;
}

// 내 라이브러리 목록 조회 응답 타입
export interface MyLibrariesResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: MyLibraryItem[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageSize: number;
    paged: boolean;
    pageNumber: number;
    unpaged: boolean;
  };
  empty: boolean;
}

// 내 라이브러리 목록 조회 파라미터
export interface GetMyLibrariesParams {
  page?: number;
  size?: number;
}

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
 * 내 라이브러리 목록 조회 API 호출
 * @param params - 페이지네이션 파라미터 (page, size)
 * @returns 내 라이브러리 목록 및 페이지네이션 정보
 */
export async function getMyLibraries(
  params: GetMyLibrariesParams = {}
): Promise<MyLibrariesResponse> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.page !== undefined) {
      queryParams.append("page", String(params.page));
    }
    if (params.size !== undefined) {
      queryParams.append("size", String(params.size));
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/libraries/my${queryString ? `?${queryString}` : ""}`;

    const response = await apiGet<MyLibrariesResponse>(endpoint);

    return response;
  } catch (error) {
    console.error("내 라이브러리 목록 조회 API 호출 실패:", error);
    throw error;
  }
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

