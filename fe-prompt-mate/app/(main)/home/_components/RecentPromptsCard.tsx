"use client";

import { useEffect, useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { getRecentCommunityPosts } from "@/shared/api/community";
import { convertPlatformFromEnum, convertCategoryFromEnum, getCategoryVariant } from "@/app/(main)/prompts/_components/constants";
import TagChip from "@/shared/components/common/TagChip";

function ArrowControls() {
    return (
        <div className="flex items-center gap-[10px]">
            <button className="grid h-[34px] w-[34px] place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.04)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M15 18l-6-6 6-6"
                        stroke="#9CA3AF"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <button className="grid h-[34px] w-[34px] place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.04)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9 6l6 6-6 6"
                        stroke="#9CA3AF"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
}


function Thumbnail({ type }: { type: "photo" | "skeleton" }) {
    if (type === "photo") {
        return (
            <div className="h-[56px] w-[56px] overflow-hidden rounded-[14px] bg-[#D1D5DB]">
                {/* 실제 썸네일 이미지 연결 시 <Image/>로 교체 */}
                <div className="h-full w-full bg-[linear-gradient(135deg,#111827_0%,#374151_45%,#111827_100%)] opacity-[0.85]" />
            </div>
        );
    }

    return (
        <div className="h-[56px] w-[56px] overflow-hidden rounded-[14px] bg-[#E9EEF6]">
            <div className="h-full w-full bg-[linear-gradient(180deg,#EEF2FF_0%,#E2E8F0_100%)]" />
        </div>
    );
}

function MoreButton() {
    return (
        <button className="grid h-[34px] w-[34px] place-items-center rounded-full hover:bg-[rgba(15,23,42,0.04)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                    fill="#9CA3AF"
                />
            </svg>
        </button>
    );
}

type RecentItem = {
    title: string;
    platform: string; // 플랫폼 표시 텍스트
    category: string; // 카테고리 표시 텍스트
    categoryEnum: string; // 카테고리 enum (variant 결정용)
    thumbType: "photo" | "skeleton";
};

export function RecentPromptsCard() {
    const [recents, setRecents] = useState<RecentItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecents = async () => {
            try {
                setLoading(true);
                const data = await getRecentCommunityPosts();
                
                // API 응답을 컴포넌트 형식으로 매핑
                const mappedItems: RecentItem[] = data.map((item) => ({
                    title: item.title,
                    platform: convertPlatformFromEnum(item.platform),
                    category: convertCategoryFromEnum(item.category),
                    categoryEnum: item.category, // variant 결정용
                    thumbType: "skeleton" as const, // 이미지 URL이 없으므로 skeleton
                }));

                setRecents(mappedItems);
            } catch (error) {
                console.error("최근 본 프롬프트 조회 실패:", error);
                setRecents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecents();
    }, []);

    return (
        <DashboardCard className="h-[320px]">
            <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-[#2B2B2B]">
                    최근 본 프롬프트
                </h3>
                <ArrowControls />
            </div>

            <div className="mt-[16px] space-y-[14px]">
                {loading ? (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-[14px] text-black/40">로딩 중...</p>
                    </div>
                ) : recents.length === 0 ? (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-[14px] text-black/40">최근 본 프롬프트가 없습니다.</p>
                    </div>
                ) : (
                    recents.map((it, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-[14px] rounded-[18px] bg-white px-[14px] py-[12px] shadow-[0_0_0_1px_rgba(15,23,42,0.04)]"
                        >
                            <Thumbnail type={it.thumbType} />

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-[14px] font-semibold text-[#2B2B2B]">
                                    {it.title}
                                </p>
                                <div className="mt-[8px] flex items-center gap-[8px]">
                                    <TagChip 
                                        label={it.platform} 
                                        variant="platform" 
                                    />
                                    <TagChip 
                                        label={it.category} 
                                        variant={getCategoryVariant(it.categoryEnum)} 
                                    />
                                </div>
                            </div>

                            <MoreButton />
                        </div>
                    ))
                )}
            </div>
        </DashboardCard>
    );
}
