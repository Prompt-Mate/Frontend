import {EvaluationSectionHeader} from "@/components/rewrite/EvaluationSectionHeader";
import {PromptEvaluationCard} from "@/components/rewrite/PromptEvaluationCard";
import RewriteText from "@/components/rewrite/RewriteText";

export default function PromptsPage() {
   return <>
       <RewriteText/>
       <EvaluationSectionHeader/>
       <PromptEvaluationCard/>
   </>
}