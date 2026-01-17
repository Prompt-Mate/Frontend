"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";

import { LibraryHeader, LibraryTabKey } from "@/components/library/LibraryHeader";
import { LibraryMeta } from "@/components/library/LibraryMeta";
import { LibraryContent } from "@/components/library/LibraryContent";
import type { LibraryItemData } from "@/components/library/LibraryItem";

// 탭별 레이아웃
const TAB_LAYOUT: Record<LibraryTabKey, "list" | "grid"> = {
  saved: "grid",
  mine: "list",
  liked: "list",
};


const MOCK_BY_TAB: Record<LibraryTabKey, LibraryItemData[]> = {
  saved: [
    {
      id: "s1",
      date: "25.11.13",
      title: "심리학 코알 보고서 초고",
      platform: "chatgpt",
      category: "productivity",
      tag: "보고서",
      progress: 70,
    },
    {
      id: "s2",
      date: "25.11.10",
      title: "시장 리포트 요약 자동화",
      platform: "claude",
      category: "study",
      tag: "요약",
      progress: 55,
    },
    {
      id: "s3",
      date: "25.11.08",
      title: "미드저니 검은 고양이 이미지",
      platform: "midjourney",
      category: "content",
      tag: "이미지",
      progress: 88,
    },
  ],
  mine: [
    {
      id: "m1",
      date: "25.11.13",
      title: "PPT 개요 작성",
      platform: "chatgpt",
      category: "productivity",
      tag: "문서작성",
    },
    {
      id: "m2",
      date: "25.11.11",
      title: "회의록 정리",
      platform: "copliot",
      category: "productivity",
      tag: "회의록",
    },
  ],
  liked: [
    {
      id: "l1",
      date: "25.11.12",
      title: "여행 일정 추천 프롬프트",
      platform: "perplexity",
      category: "daily",
      tag: "여행",
    },
  ],
};

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<LibraryTabKey>("liked");

  const layout = TAB_LAYOUT[tab];

  const items = useMemo(() => {
    const list = MOCK_BY_TAB[tab] ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return list;

    // 제목/태그 둘 다 검색되게
    return list.filter((x) => {
      const title = x.title?.toLowerCase() ?? "";
      const tag = x.tag?.toLowerCase() ?? "";
      return title.includes(q) || tag.includes(q);
    });
  }, [tab, search]);

  // 페이지네이션은 일단 UI만: 1/1로 고정
  const page = 1;
  const totalPages = 1;

  // B단계 확인 로그 (필요하면 잠깐만 켜두기)
  console.log("LIBRARY TAB:", tab);
  console.log("LIBRARY ITEMS:", items.length, items);

  return (
    <Container>
      <section className="pt-[52px] space-y-6 md:space-y-8">
        <LibraryHeader
          search={search}
          onSearchChange={setSearch}
          tab={tab}
          onTabChange={setTab}
        />

        <div className="space-y-4">
          <LibraryMeta
            totalCount={items.length}
            page={page}
            totalPages={totalPages}
          />
          <LibraryContent items={items} layout={layout} />
        </div>
      </section>
    </Container>
  );
}