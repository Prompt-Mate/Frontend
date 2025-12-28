import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityFilter } from "@/components/community/CommunityFilter";
import { CommunityListHeader } from "@/components/community/CommunityListHeader";
import { CommunityGrid } from "@/components/community/CommunityGrid";

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-ui-surface">
            <main className="mx-auto w-full max-w-[1080px] px-5 py-6">
                <CommunityHeader />
                <CommunityFilter />
                <CommunityListHeader />
                <CommunityGrid />
            </main>
        </div>
    );
}
