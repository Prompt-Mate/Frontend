import {HeroCard} from "@/components/dashboard/HeroCard";
import {WeeklyScoreCard} from "@/components/dashboard/WeeklyScoreCard";
import {PopularPromptsCard} from "@/components/dashboard/PopularPromptsCard";
import {RecentPromptsCard} from "@/components/dashboard/RecentPromptsCard";
import {CommunityHeader} from "@/components/community/CommunityHeader";
export default function HomePage(){
    return(
        <section
            className="
    px-4 sm:px-6 lg:px-0
    lg:ml-[125px] lg:mr-[65px]
    space-y-[20px]
  "
        >
            <CommunityHeader />
            {/* 1행: Hero(작게) / Weekly(크게) */}
            <div className="grid gap-[20px] grid-cols-1 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
                <HeroCard />
                <WeeklyScoreCard />
            </div>

            {/* 2행: Recent(크게) / Popular(작게) */}
            <div className="grid gap-[20px] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
                <RecentPromptsCard />
                <PopularPromptsCard />
            </div>
        </section>

    );
}