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
        <div className="flex items-center text-body font-semibold p-6">
            <div className="flex items-center gap-[55px]">
                <span>{title}</span>
                <span>{description}</span>
            </div>

            <span className="ml-auto">{score}점</span>
        </div>
    );
}
