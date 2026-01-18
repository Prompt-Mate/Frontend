"use client";

import * as React from "react";
import { PlatformFilter } from "@/components/community/PlatformFilter";
import { CategoryFilter } from "@/components/community/CategoryFilter";

interface Props {
  platform: string;
  category: string;
  onPlatformChange: (platform: string) => void;
  onCategoryChange: (category: string) => void;
}

export function CommunityFilter({ 
  platform, 
  category, 
  onPlatformChange, 
  onCategoryChange 
}: Props) {
    return (
        <section className="mb-6 rounded-[24px] bg-ui-card px-5 py-4 shadow-sm">
            <div className="space-y-4">
                <div className="flex items-center gap-4">
          <span className="w-[64px] text-body font-semibold text-ui-text">
            플랫폼
          </span>
                    <PlatformFilter value={platform} onChange={onPlatformChange} />
                </div>

                <div className="flex items-center gap-4">
          <span className="w-[64px] text-body font-semibold text-ui-text">
            카테고리
          </span>
                    <CategoryFilter value={category} onChange={onCategoryChange} />
                </div>
            </div>
        </section>
    );
}
