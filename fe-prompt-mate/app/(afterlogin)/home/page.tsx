import {HeroCard} from "@/components/dashboard/HeroCard";
import {WeeklyScoreCard} from "@/components/dashboard/WeeklyScoreCard";
import {PopularPromptsCard} from "@/components/dashboard/PopularPromptsCard";
import {RecentPromptsCard} from "@/components/dashboard/RecentPromptsCard";
export default function HomePage(){
    return(
        <section className="grid grid-cols-2 gap-[20px]">
            <HeroCard />
            <WeeklyScoreCard />
            <RecentPromptsCard />
            <PopularPromptsCard />
        </section>
    );
}