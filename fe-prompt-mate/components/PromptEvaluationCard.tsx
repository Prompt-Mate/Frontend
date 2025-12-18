import {EvaluationHeader} from "@/components/EvaluationHeader";
import {EvaluationDetails} from "@/components/EvaluationDetails";
import {EvaluationOverview} from "@/components/EvaluationOverview";

export function PromptEvaluationCard() {
    return (
        <section
            className="
        w-[927px]
        h-[1122px]
        rounded-[30px]
        bg-ui-card
      "
        >
            <EvaluationHeader/>
            <EvaluationOverview  totalScore={70}
                                 items={[
                                     { label: "명확성", score: 74 },
                                     { label: "창의성", score: 68 },
                                     { label: "일관성", score: 63 },
                                     { label: "언어 품질", score: 75 },
                                     { label: "구조", score: 75 },
                                 ]}/>
            <EvaluationDetails/>
        </section>
    );
}
