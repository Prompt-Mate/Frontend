// app/(afterlogin)/prompts/page.tsx

import Container from "@/components/layout/Container";

import { EvaluationSectionHeader } from "@/components/rewrite/EvaluationSectionHeader";
import { PromptEvaluationCard } from "@/components/rewrite/PromptEvaluationCard";
import RewriteText from "@/components/rewrite/RewriteText";

export default function PromptsPage() {
  return (
    <Container>
      <section className="space-y-6 md:space-y-8">
        <RewriteText />
        <EvaluationSectionHeader />
        <PromptEvaluationCard />
      </section>
    </Container>
  );
}
