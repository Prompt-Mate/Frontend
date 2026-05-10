// services/rewrite.ts
import { apiPost } from "@/shared/api/api";

// API 응답 타입 정의
export interface RewriteResponse {
  rewriteResultId: number;
  rewrittenPrompt: string;
  latencyMs: number;
  modelName: string;
  version: string;
}

// API 요청 타입 정의
interface RewriteRequest {
  prompt: string;
}

/**
 * 프롬프트 재작성 API 호출
 * @param input - 재작성할 프롬프트 문자열
 * @returns 재작성 API 응답 전체
 */
export async function rewritePrompt(input: string): Promise<RewriteResponse> {
  try {
    const requestData: RewriteRequest = {
      prompt: input,
    };

    const response = await apiPost<RewriteResponse>(
      "/api/rewrite",
      requestData
    );

    return response;
  } catch (error) {
    console.error("프롬프트 재작성 API 호출 실패:", error);
    throw error;
  }
}

