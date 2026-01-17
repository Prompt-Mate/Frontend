// services/rewrite.ts
import { apiPost } from "@/lib/api";

// API 응답 타입 정의
interface RewriteResponse {
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
 * @returns 재작성된 프롬프트 문자열
 */
export async function rewritePrompt(input: string): Promise<string> {
  try {
    const requestData: RewriteRequest = {
      prompt: input,
    };

    const response = await apiPost<RewriteResponse>(
      "/api/rewrite",
      requestData
    );

    // 응답에서 재작성된 프롬프트 반환
    return response.rewrittenPrompt;
  } catch (error) {
    console.error("프롬프트 재작성 API 호출 실패:", error);
    // 에러 발생 시 원본 프롬프트 반환 또는 에러 재발생
    throw error;
  }
}

