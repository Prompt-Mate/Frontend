"use client";

import { useMemo, useState } from "react";
import {LibraryItemData} from "@/components/library/LibraryItem";
import {LibraryHeader, LibraryTabKey} from "@/components/library/LibraryHeader";
import {LibraryMeta} from "@/components/library/LibraryMeta";
import {LibraryContent} from "@/components/library/LibraryContent";

const MOCK: LibraryItemData[] = [
    { id: "1", date: "25.11.13", title: "심리학 코알 보고서 초고", platform: "Chat GPT", kind: "보고서", progress: 70 },
    { id: "2", date: "25.11.10", title: "시장 리포트 요약 자동화", platform: "Claude", kind: "요약", progress: 55 },
    { id: "3", date: "25.11.13", title: "미드저니 검은 고양이 이미지", platform: "Midjourney", kind: "이미지", progress: 88 },
    { id: "4", date: "25.11.13", title: "PPT 개요 작성", platform: "Chat GPT", kind: "문서작성", progress: 40 },
];

// ✅ 탭별 레이아웃: saved=grid, mine=list, liked=list
const TAB_LAYOUT: Record<LibraryTabKey, "list" | "grid"> = {
    saved: "grid",
    mine: "list",
    liked: "list",
};

export default function LibraryPage() {
    const [tab, setTab] = useState<LibraryTabKey>("mine");
    const [search, setSearch] = useState("");

    const layout = TAB_LAYOUT[tab];

    const items = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return MOCK;
        return MOCK.filter((x) => x.title.toLowerCase().includes(q));
    }, [search]);

    return (
        <div className="mx-auto w-full max-w-[1200px] px-[20px] py-[18px]">
            <LibraryHeader
                search={search}
                onSearchChange={setSearch}
                tab={tab}
                onTabChange={setTab}
            />
            <div className= "mt-[45px]">
                <LibraryMeta totalCount={items.length} page={1} totalPages={1} />

                <LibraryContent items={items} layout={layout} />
            </div>

        </div>
    );
}
