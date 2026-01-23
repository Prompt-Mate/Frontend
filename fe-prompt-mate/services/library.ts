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

// 저장된 게시글 아이템 타입 (my-posts 응답)
export interface MyPostItem {
  id: number;
  rewriteResultId: number;
  userId: number;
  nickname: string;
  title: string;
  promptContent: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  platform: string;
  category: string;
  imageUrl: string | null;
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
 * 저장된 게시글 목록 조회 API 호출
 * @returns 저장된 게시글 목록 (배열)
 */
export async function getMyPosts(): Promise<MyPostItem[]> {
  try {
    const response = await apiGet<MyPostItem[]>("/api/libraries/my-posts");

    return response;
  } catch (error) {
    console.error("저장된 게시글 목록 조회 API 호출 실패:", error);
    throw error;
  }
}

// 좋아요한 라이브러리 응답 타입 (MyLibrariesResponse와 동일한 구조)
export interface LikedLibrariesResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: MyPostItem[]; // CommunityPost와 동일한 구조
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

/**
 * 좋아요한 라이브러리 목록 조회 API 호출
 * @param params - 페이지네이션 파라미터 (page, size)
 * @returns 좋아요한 라이브러리 목록 및 페이지네이션 정보
 */
export async function getLikedLibraries(
  params: GetMyLibrariesParams = {}
): Promise<LikedLibrariesResponse> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.page !== undefined) {
      queryParams.append("page", String(params.page));
    }
    if (params.size !== undefined) {
      queryParams.append("size", String(params.size));
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/libraries/liked${queryString ? `?${queryString}` : ""}`;

    const response = await apiGet<LikedLibrariesResponse>(endpoint);

    return response;
  } catch (error) {
    console.error("좋아요한 라이브러리 목록 조회 API 호출 실패:", error);
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

// 라이브러리 상세 조회 응답 타입 (API 응답 형식 - camelCase)
export interface LibraryDetailJudge {
  id: number;
  overallScore: number;
  clarityScore: number;
  specificityScore: number;
  structureScore: number;
  languageScore: number;
  consistencyScore: number;
  clarityComment: string;
  specificityComment: string;
  structureComment: string;
  languageComment: string;
  consistencyComment: string;
  summaryFeedback: string;
}

export interface LibraryDetailResponse {
  id: number;
  userId: number;
  savedTitle: string;
  platform: string; // "CHAT_GPT" | "GEMINI" | ...
  category: string; // "WORK_PRODUCTIVITY" | "STUDY" | ...
  imageUrl: string | null;
  createdAt: string;
  rewriteResultId: number;
  rewrittenContent: string;
  originalPrompt: string;
  judge: LibraryDetailJudge | null;
}

/**
 * 라이브러리 상세 조회 API 호출
 * @param id - 라이브러리 ID
 * @returns 라이브러리 상세 정보
 */
export async function getLibraryDetail(id: number | string): Promise<LibraryDetailResponse> {
  try {
    const response = await apiGet<LibraryDetailResponse>(`/api/libraries/my/${id}`);
    return response;
  } catch (error) {
    console.error("라이브러리 상세 조회 API 호출 실패:", error);
    throw error;
  }
}

// 라이브러리 검색 파라미터
export interface SearchLibrariesParams {
  keyword?: string;
  platform?: string;
  category?: string;
  page?: number;
  size?: number;
}

/**
 * 라이브러리 검색 API 호출
 * @param params - 검색 파라미터 (keyword, platform, category, page, size)
 * @returns 검색 결과 및 페이지네이션 정보
 */
export async function searchLibraries(
  params: SearchLibrariesParams = {}
): Promise<MyLibrariesResponse> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.keyword) {
      queryParams.append("keyword", params.keyword);
    }
    if (params.platform) {
      queryParams.append("platform", params.platform);
    }
    if (params.category) {
      queryParams.append("category", params.category);
    }
    if (params.page !== undefined) {
      queryParams.append("page", String(params.page));
    }
    if (params.size !== undefined) {
      queryParams.append("size", String(params.size));
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/libraries/search${queryString ? `?${queryString}` : ""}`;

    const response = await apiGet<MyLibrariesResponse>(endpoint);

    return response;
  } catch (error) {
    console.error("라이브러리 검색 API 호출 실패:", error);
    throw error;
  }
}

