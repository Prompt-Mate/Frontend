import { PromptEvaluationCard } from "@/app/(main)/prompts/_components/PromptEvaluationCard";
import { type JudgeResponse } from "@/shared/api/judge";

interface EvaluationResultSectionProps {
  judgeResult: JudgeResponse | null;
}

export default function EvaluationResultSection({ judgeResult }: EvaluationResultSectionProps) {
  return <PromptEvaluationCard judgeResult={judgeResult} />;
}