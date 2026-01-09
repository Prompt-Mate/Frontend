// app/(afterlogin)/home/page.tsx
import Container from "@/components/layout/Container";

import { HeroCard } from "@/components/dashboard/HeroCard";
import { WeeklyScoreCard } from "@/components/dashboard/WeeklyScoreCard";
import { PopularPromptsCard } from "@/components/dashboard/PopularPromptsCard";
import { RecentPromptsCard } from "@/components/dashboard/RecentPromptsCard";
import { CommunityHeader } from "@/components/community/CommunityHeader";

export default function HomePage() {
  return (
    <Container>
      <section className="space-y-6 md:space-y-8">
        <CommunityHeader />

        {/* 1행: Hero / Weekly */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <HeroCard />
          <WeeklyScoreCard />
        </div>

        {/* 2행: Recent / Popular */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <RecentPromptsCard />
          <PopularPromptsCard />
        </div>
      </section>
    </Container>
  );
}

// 이 페이지는 로그인 후 사용자가 처음 마주하는 대시보드 페이지입니다.