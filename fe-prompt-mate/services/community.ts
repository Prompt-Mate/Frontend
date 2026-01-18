// services/community.ts
import { apiGet, apiPost } from "@/lib/api";

// API 요청 파라미터 타입 정의
export interface GetCommunityPostsParams {
  search?: string;    // 검색어
  sort?: string;      // 정렬 조건 (UI: "최신순" | "조회순" | "좋아요", API: "latest" | "view" | "like")
  platform?: string;  // 플랫폼 enum ("CHAT_GPT", "GEMINI", ...)
  category?: string;  // 카테고리 enum ("WORK_PRODUCTIVITY", "STUDY", ...)
}

/**
 * UI 표시용 정렬 조건을 백엔드 API 형식으로 변환
 * @param sort - UI 표시용 정렬 조건 ("최신순", "조회순", "좋아요")
 * @returns 백엔드 API 형식 ("latest", "view", "like")
 */
export function convertSortToEnum(sort: "최신순" | "조회순" | "좋아요"): string {
  const sortMap: Record<"최신순" | "조회순" | "좋아요", string> = {
    "최신순": "latest",
    "조회순": "view",
    "좋아요": "like",
  };
  
  return sortMap[sort] || sort;
}

// API 응답 타입 정의
export interface CommunityPost {
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
  platform: string; // "CHAT_GPT", "GEMINI", ...
  category: string; // "WORK_PRODUCTIVITY", "STUDY", ...
  imageUrl: string | null;
}

// 커뮤니티 게시글 목록 조회 응답 타입 (배열 형식)
// 참고: API 응답이 페이지네이션 구조가 아닌 배열로 직접 오는 경우
export interface CommunityPostsResponse {
  content: CommunityPost[];
  totalElements: number;
  totalPages: number;
  size: number;
}

/**
 * 커뮤니티 게시글 목록 조회 API 호출
 * @param params - 조회 파라미터 (search, sort, platform, category)
 * @returns 게시글 목록 (배열)
 */
export async function getCommunityPosts(
  params: GetCommunityPostsParams = {}
): Promise<CommunityPost[]> {
  try {
    // 쿼리 파라미터 생성
    const queryParams = new URLSearchParams();
    
    // 자바스크립트의 if (...) 는괄호 안의 값을 Boolean으로 "자동 변환"해서 판단해. 이걸 Truthy / Falsy 라고 불러.
    if (params.search) {
      queryParams.append("search", params.search);
    }
    if (params.sort) {
      queryParams.append("sort", params.sort);
    }
    if (params.platform) {
      queryParams.append("platform", params.platform);
    }
    if (params.category) {
      queryParams.append("category", params.category);
    }

    const queryString = queryParams.toString(); // URLSearchParams.toString()의 규칙 내부에 저장된 모든 key–value 쌍을 key=value 형태로 만들고 &로 자동 연결
    const endpoint = `/api/community/posts${queryString ? `?${queryString}` : ""}`;

    // API 응답이 배열로 직접 오는 경우
    const response = await apiGet<CommunityPost[]>(endpoint);

    return response;
  } catch (error) {
    console.error("커뮤니티 게시글 조회 API 호출 실패:", error);
    throw error;
  }
}

// 커뮤니티 게시글 생성 요청 타입
export interface CreateCommunityPostRequest {
  rewriteResultId: number;
  title: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
}

// 커뮤니티 게시글 생성 응답 타입 (CommunityPost와 동일)
export interface CreateCommunityPostResponse extends CommunityPost {}

/**
 * 커뮤니티 게시글 생성 API 호출
 * @param data - 게시글 생성 데이터
 * @returns 생성된 게시글 정보
 */
export async function createCommunityPost(
  data: CreateCommunityPostRequest
): Promise<CreateCommunityPostResponse> {
  try {
    const response = await apiPost<CreateCommunityPostResponse>(
      "/api/community/posts",
      data
    );
    return response;
  } catch (error) {
    console.error("커뮤니티 게시글 생성 API 호출 실패:", error);
    throw error;
  }
}

/**
 * 커뮤니티 게시글 상세 조회 API 호출
 * @param postId - 게시글 ID
 * @returns 게시글 상세 정보
 */
export async function getCommunityPostDetail(
  postId: number | string
): Promise<CommunityPost> {
  try {
    const response = await apiGet<CommunityPost>(
      `/api/community/posts/${postId}`
    );
    return response;
  } catch (error) {
    console.error("커뮤니티 게시글 상세 조회 API 호출 실패:", error);
    throw error;
  }
}

// 댓글 생성 요청 타입
export interface CreateCommentRequest {
  parentId: number | null; // 대댓글인 경우 부모 댓글 ID, 일반 댓글인 경우 null
  content: string;
}

// 댓글 생성 응답 타입 (필요시 정의)
export interface CreateCommentResponse {
  id: number;
  // 필요한 응답 필드 추가
}

/**
 * 커뮤니티 게시글에 댓글 생성 API 호출
 * @param postId - 게시글 ID
 * @param data - 댓글 생성 데이터
 * @returns 생성된 댓글 정보
 */
export async function createComment(
  postId: number | string,
  data: CreateCommentRequest
): Promise<CreateCommentResponse> {
  try {
    // parentId가 null이면 요청 본문에서 제외
    const requestBody: { content: string; parentId?: number } = {
      content: data.content,
    };

    // parentId가 있는 경우에만 추가
    if (data.parentId !== null && data.parentId !== undefined) {
      requestBody.parentId = Number(data.parentId);
    }

    const response = await apiPost<CreateCommentResponse>(
      `/api/community/posts/${postId}/comments`,
      requestBody
    );
    return response;
  } catch (error) {
    console.error("댓글 생성 API 호출 실패:", error);
    throw error;
  }
}

// 댓글 응답 타입 정의
export interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  nickname: string;
  parentId: number;
  content: string;
  status: string;
  createdAt: string;
  replies: string[]; // 대댓글 ID 배열 또는 다른 정보
}

/**
 * 커뮤니티 게시글의 댓글 목록 조회 API 호출
 * @param postId - 게시글 ID
 * @returns 댓글 목록
 */
export async function getComments(
  postId: number | string
): Promise<Comment[]> {
  try {
    const response = await apiGet<Comment[]>(
      `/api/community/posts/${postId}/comments`
    );
    return response;
  } catch (error) {
    console.error("댓글 목록 조회 API 호출 실패:", error);
    throw error;
  }
}

