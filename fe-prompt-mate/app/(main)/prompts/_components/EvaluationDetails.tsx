type EvaluationDetailsProps = {
    title: string;        // "명확성"
    description: string;  // "설명 텍스트"
    score: number;        // 74
};

export function EvaluationDetails({
                                      title,
                                      description,
                                      score,
                                  }: EvaluationDetailsProps) {
    return (
        <div className="flex items-center text-body font-semibold p-6 gap-[55px]">
            {/* title: 고정 너비 */}
            <span className="flex-shrink-0">{title}</span>
            {/* description: 가변 너비, 텍스트 오버플로우 처리 */}
            <span className="flex-1 min-w-0 break-words">{description}</span>
            {/* score: 고정 너비 */}
            <span className="flex-shrink-0">{score}점</span>
        </div>
    );
}
