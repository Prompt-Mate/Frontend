import { EvaluationHeader } from "@/components/rewrite/EvaluationHeader";
import { EvaluationDetails } from "@/components/rewrite/EvaluationDetails";
import { EvaluationOverview } from "@/components/rewrite/EvaluationOverview";
import SaveButton from "@/components/rewrite/SaveButton";
import { type JudgeResponse } from "@/services/judge";

interface Props {
  judgeResult?: JudgeResponse | null;
}

export function PromptEvaluationCard({ judgeResult }: Props) {
  // 평가 결과가 없으면 기본값 또는 빈 상태 표시
  if (!judgeResult) {
    return (
      <section className="w-[927px] h-[1122px] rounded-[30px] bg-ui-card relative flex items-center justify-center">
        <p className="text-ui-textMuted text-lg">
          프롬프트를 평가하기 위해 먼저 프롬프트를 입력해주세요.
        </p>
      </section>
    );
  }

  // 평가 결과를 Overview 아이템 형태로 변환
  const overviewItems = [
    { label: "명확성", score: judgeResult.clarity_score },
    { label: "구체성", score: judgeResult.specificity_score },
    { label: "구조", score: judgeResult.structure_score },
    { label: "언어 품질", score: judgeResult.language_score },
    { label: "일관성", score: judgeResult.consistency_score },
  ];

  // 평가 상세 항목 배열
  const detailsItems = [
    {
      title: "명확성",
      description: judgeResult.clarity_comment,
      score: judgeResult.clarity_score,
    },
    {
      title: "구체성",
      description: judgeResult.specificity_comment,
      score: judgeResult.specificity_score,
    },
    {
      title: "구조",
      description: judgeResult.structure_comment,
      score: judgeResult.structure_score,
    },
    {
      title: "언어 품질",
      description: judgeResult.language_comment,
      score: judgeResult.language_score,
    },
    {
      title: "일관성",
      description: judgeResult.consistency_comment,
      score: judgeResult.consistency_score,
    },
  ];

  return (
    <section className="w-[927px] h-[1024px] rounded-[30px] bg-ui-card relative">
      <EvaluationHeader summaryFeedback={judgeResult.summary_feedback} />
      <EvaluationOverview
        totalScore={judgeResult.overall_score}
        items={overviewItems}
      />

      {detailsItems.map((item, index) => (
        <div key={index}>
          <EvaluationDetails
            title={item.title}
            description={item.description}
            score={item.score}
          />
          {index < detailsItems.length - 1 && (
            <div className="w-full h-[1.5px] bg-ui-textMuted/20" />
          )}
        </div>
      ))}
    </section>
  );
}