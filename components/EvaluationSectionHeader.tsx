import { PageTitleBlock } from "./PageTitleBlock";
import { TagChip } from "./TagChip";

export default function EvaluationSectionHeader() {
    return (
        <section className="space-y-4">
            <PageTitleBlock
                title="평가 결과"
                description="PromptMate가 AI 분석을 통해 프롬프트를 목적에 맞게 분석하고, 점수를 매긴 뒤 구체적인 피드백까지 제공해요."
            />

            <TagChip label="프롬프트 종합 평가" />
        </section>
    );
}
