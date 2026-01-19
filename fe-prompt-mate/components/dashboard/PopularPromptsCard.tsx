"use client";

import { useEffect, useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { getPopularCommunityPosts } from "@/services/community";

type PopularItem = {
    title: string;
    likes: number;
};

function HeartIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 21s-7-4.6-9.2-8.7C.7 8.4 3.2 5 6.8 5c1.9 0 3.3 1 4.2 2.1C11.9 6 13.3 5 15.2 5c3.6 0 6.1 3.4 4 7.3C19 16.4 12 21 12 21z"
                fill="#D1D5DB"
            />
        </svg>
    );
}

export function PopularPromptsCard() {
    const [popular, setPopular] = useState<PopularItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                setLoading(true);
                const data = await getPopularCommunityPosts();
                
                // API 응답을 컴포넌트 형식으로 매핑
                const mappedItems: PopularItem[] = data.map((item) => ({
                    title: item.title,
                    likes: item.likeCount,
                }));

                setPopular(mappedItems);
            } catch (error) {
                console.error("인기 프롬프트 조회 실패:", error);
                setPopular([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPopular();
    }, []);

    return (
        <DashboardCard className="h-[320px]">
            <h3 className="text-[16px] font-bold text-[#2B2B2B]">
                오늘의 인기 프롬프트
            </h3>

            <div className="mt-[18px] space-y-[10px]">
                {loading ? (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-[14px] text-black/40">로딩 중...</p>
                    </div>
                ) : popular.length === 0 ? (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-[14px] text-black/40">인기 프롬프트가 없습니다.</p>
                    </div>
                ) : (
                    popular.map((it, idx) => (
                        <div
                            key={idx}
                            className="flex items-center rounded-[16px] bg-white px-[14px] py-[12px] shadow-[0_0_0_1px_rgba(15,23,42,0.04)]"
                        >
                            <span className="w-[22px] text-[13px] font-bold text-[#2B2B2B]">
                                {idx + 1}
                            </span>

                            <span className="flex-1 text-[14px] font-semibold text-[#2B2B2B]">
                                {it.title}
                            </span>

                            <div className="flex items-center gap-[6px]">
                                <HeartIcon />
                                <span className="text-[12px] font-semibold text-[#9CA3AF]">
                                    {it.likes}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </DashboardCard>
    );
}
