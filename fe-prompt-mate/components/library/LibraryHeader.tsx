"use client";

import { cn } from "@/lib/cn";
import SearchIcon from "@/assets/icons/meteor-icons_search.svg"

export type LibraryTabKey = "saved" | "mine" | "liked";

const TABS: { key: LibraryTabKey; label: string }[] = [
    { key: "saved", label: "리라이팅 저장 기록" },
    { key: "mine", label: "내가 작성한 게시글" },
    { key: "liked", label: "좋아요한 프롬프트" },
];

export function LibraryHeader({
                                  search,
                                  onSearchChange,
                                  tab,
                                  onTabChange,
                              }: {
    search: string;
    onSearchChange: (v: string) => void;
    tab: LibraryTabKey;
    onTabChange: (v: LibraryTabKey) => void;
}) {
    return (
        <header>
            {/* Search */}
            <div className="flex h-[55px] items-center gap-[12px] rounded-[15px] bg-[#F8FAFC] px-[15px]">
                <SearchIcon/>
                <input
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="태그, 키워드 검색"
                    className="w-full bg-transparent text-[14px] outline-none placeholder:text-black/30"
                />
            </div>

            {/* Tabs */}
            <div className="mt-[59px] border-b border-black/10">
                <div className="flex items-end gap-[26px]">
                    {TABS.map((t) => {
                        const active = t.key === tab;
                        return (
                            <button
                                key={t.key}
                                type="button"
                                onClick={() => onTabChange(t.key)}
                                className={cn(
                                    "pb-[12px] text-[14px] font-semibold transition",
                                    "border-b-2 border-transparent",
                                    active
                                        ? "text-black border-black"
                                        : "text-black/30 hover:text-black/60"
                                )}
                            >
                                {t.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}
