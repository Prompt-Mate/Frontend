"use client";

import Container from "@/components/layout/Container";
import LibraryDetailHeader from "@/components/library/detail/LibraryDetailHeader";
import PromptContentCard from "@/components/library/detail/PromptContentCard";
import RewriteResultCard from "@/components/library/detail/RewriteResultCard";
import EvaluationResultSection from "@/components/library/detail/EvaluationResultSection";

export default function LibraryDetailPage() {
  return (
    <Container>
      <section className="space-y-8">
        <LibraryDetailHeader />
        <PromptContentCard />
        <RewriteResultCard />
        <EvaluationResultSection />
      </section>
    </Container>
  );
}