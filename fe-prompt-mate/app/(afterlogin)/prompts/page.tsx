import {EvaluationSectionHeader} from "@/components/EvaluationSectionHeader";
import {PromptEvaluationCard} from "@/components/PromptEvaluationCard";
import RewriteText from "@/components/rewrite/RewriteText";

export default function PromptsPage() {
   return <>
       <RewriteText/>
       <EvaluationSectionHeader/>
       <PromptEvaluationCard/>
   </>
}