// app/(afterlogin)/community/page.tsx
import Container from "@/components/layout/Container";

import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityFilter } from "@/components/community/CommunityFilter";
import { CommunityListHeader } from "@/components/community/CommunityListHeader";
import { CommunityGrid } from "@/components/community/CommunityGrid";

export default function CommunityPage() {
  return (
    <Container>
      <section className="space-y-6 md:space-y-8 pt-6">
        <CommunityHeader />
        <CommunityFilter />
        <CommunityListHeader />
        <CommunityGrid />
      </section>
    </Container>
  );
}
