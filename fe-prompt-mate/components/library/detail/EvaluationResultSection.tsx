import { PromptEvaluationCard } from "@/components/rewrite/PromptEvaluationCard";
import { type JudgeResponse } from "@/services/judge";

interface EvaluationResultSectionProps {
  judgeResult: JudgeResponse | null;
}

export default function EvaluationResultSection({ judgeResult }: EvaluationResultSectionProps) {
  return <PromptEvaluationCard judgeResult={judgeResult} />;
}