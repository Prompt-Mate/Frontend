// services/judge.ts
import { apiPost } from "@/lib/api";

// API 응답 타입 정의
export interface JudgeResponse {
  overall_score: number;
  clarity_score: number;
  specificity_score: number;
  structure_score: number;
  language_score: number;
  consistency_score: number;
  clarity_comment: string;
  specificity_comment: string;
  structure_comment: string;
  language_comment: string;
  consistency_comment: string;
  summary_feedback: string;
}

// API 요청 타입 정의
interface JudgeRequest {
  prompt: string;
}

/**
 * 프롬프트 평가 API 호출
 * @param prompt - 평가할 프롬프트 문자열
 * @returns 평가 결과 객체
 */
export async function judgePrompt(prompt: string): Promise<JudgeResponse> {
  try {
    const requestData: JudgeRequest = {
      prompt: prompt,
    };

    const response = await apiPost<JudgeResponse>(
      "/api/judge",
      requestData
    );

    return response;
  } catch (error) {
    console.error("프롬프트 평가 API 호출 실패:", error);
    throw error;
  }
}

