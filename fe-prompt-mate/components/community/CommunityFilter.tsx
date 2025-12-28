"use client";

import * as React from "react";
import { PlatformFilter } from "@/components/community/PlatformFilter";
import { CategoryFilter } from "@/components/community/CategoryFilter";

export function CommunityFilter() {
    const [platform, setPlatform] = React.useState<string>("Chat GPT");
    const [category, setCategory] = React.useState<string>("업무/생산성");

    return (
        <section className="mb-6 rounded-[24px] bg-ui-card px-5 py-4 shadow-sm">
            <div className="space-y-4">
                <div className="flex items-center gap-4">
          <span className="w-[64px] text-body font-semibold text-ui-text">
            플랫폼
          </span>
                    <PlatformFilter value={platform} onChange={setPlatform} />
                </div>

                <div className="flex items-center gap-4">
          <span className="w-[64px] text-body font-semibold text-ui-text">
            카테고리
          </span>
                    <CategoryFilter value={category} onChange={setCategory} />
                </div>
            </div>
        </section>
    );
}
