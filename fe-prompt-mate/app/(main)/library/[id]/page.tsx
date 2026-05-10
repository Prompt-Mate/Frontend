"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Container from "@/shared/components/layout/Container";
import LibraryDetailHeader from "@/app/(main)/library/_components/detail/LibraryDetailHeader";
import PromptContentCard from "@/app/(main)/library/_components/detail/PromptContentCard";
import RewriteResultCard from "@/app/(main)/library/_components/detail/RewriteResultCard";
import EvaluationResultSection from "@/app/(main)/library/_components/detail/EvaluationResultSection";
import { getLibraryDetail, type LibraryDetailResponse } from "@/shared/api/library";
import { convertPlatformFromEnum, convertCategoryFromEnum, getCategoryVariant } from "@/app/(main)/prompts/_components/constants";
import { type JudgeResponse } from "@/shared/api/judge";

/**
 * 날짜를 "YY.MM.DD" 형식으로 변환
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

/**
 * API 응답의 judge 데이터를 JudgeResponse 형식으로 변환
 */
function convertJudgeToResponse(judge: LibraryDetailResponse["judge"]): JudgeResponse | null {
  if (!judge) return null;
  
  return {
    overall_score: judge.overallScore,
    clarity_score: judge.clarityScore,
    specificity_score: judge.specificityScore,
    structure_score: judge.structureScore,
    language_score: judge.languageScore,
    consistency_score: judge.consistencyScore,
    clarity_comment: judge.clarityComment,
    specificity_comment: judge.specificityComment,
    structure_comment: judge.structureComment,
    language_comment: judge.languageComment,
    consistency_comment: judge.consistencyComment,
    summary_feedback: judge.summaryFeedback,
  };
}

export default function LibraryDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [data, setData] = useState<LibraryDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await getLibraryDetail(id);
        setData(response);
      } catch (error) {
        console.error("라이브러리 상세 조회 실패:", error);
        setError("라이브러리 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 로딩 중
  if (loading) {
    return (
      <Container>
        <section className="space-y-8">
          <div className="flex items-center justify-center py-20">
            <p className="text-ui-textMuted">로딩 중...</p>
          </div>
        </section>
      </Container>
    );
  }

  // 에러 발생
  if (error || !data) {
    return (
      <Container>
        <section className="space-y-8">
          <div className="flex items-center justify-center py-20">
            <p className="text-ui-textMuted">{error || "라이브러리 정보를 찾을 수 없습니다."}</p>
          </div>
        </section>
      </Container>
    );
  }

  const platformLabel = convertPlatformFromEnum(data.platform);
  const categoryLabel = convertCategoryFromEnum(data.category);
  const categoryVariant = getCategoryVariant(data.category);
  const judgeResponse = convertJudgeToResponse(data.judge);

  return (
    <Container>
      <section className="space-y-8">
        <LibraryDetailHeader
          title={data.savedTitle}
          platform={platformLabel}
          category={categoryLabel}
          categoryVariant={categoryVariant}
        />
        {/* 2-1) 이미지 (imageUrl이 있을 때만 표시) */}
        {data.imageUrl && (
                    <div className="mb-[48px]">
                        <div className="relative w-full" style={{ aspectRatio: '958.379 / 540.624' }}>
                            <Image
                                src={data.imageUrl}
                                alt={data.savedTitle}
                                fill
                                className="rounded-t-[20px] object-cover"
                                sizes="(max-width: 768px) 100vw, 958px"
                            />
                        </div>
                    </div>
                )}
        <PromptContentCard content={data.originalPrompt} />
        <RewriteResultCard content={data.rewrittenContent} />
        <EvaluationResultSection judgeResult={judgeResponse} />
      </section>
    </Container>
  );
}