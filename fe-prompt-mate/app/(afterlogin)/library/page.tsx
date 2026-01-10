// app/(afterlogin)/library/page.tsx
"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";

import { LibraryItemData } from "@/components/library/LibraryItem";
import { LibraryHeader, LibraryTabKey } from "@/components/library/LibraryHeader";
import { LibraryMeta } from "@/components/library/LibraryMeta";
import { LibraryContent } from "@/components/library/LibraryContent";

const MOCK: LibraryItemData[] = [
  { id: "1", date: "25.11.13", title: "심리학 코알 보고서 초고", platform: "Chat GPT", kind: "보고서", progress: 70 },
  { id: "2", date: "25.11.10", title: "시장 리포트 요약 자동화", platform: "Claude", kind: "요약", progress: 55 },
  { id: "3", date: "25.11.13", title: "미드저니 검은 고양이 이미지", platform: "Midjourney", kind: "이미지", progress: 88 },
  { id: "4", date: "25.11.13", title: "PPT 개요 작성", platform: "Chat GPT", kind: "문서작성", progress: 40 },
];

// 탭별 레이아웃
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
    <Container>
      <section className="space-y-6 md:space-y-8">
        <LibraryHeader
          search={search}
          onSearchChange={setSearch}
          tab={tab}
          onTabChange={setTab}
        />

        <div className="space-y-4">
          <LibraryMeta totalCount={items.length} page={1} totalPages={1} />
          <LibraryContent items={items} layout={layout} />
        </div>
      </section>
    </Container>
  );
}

// 이 페이지는 사용자의 라이브러리(저장된 프롬프트, 내가 만든 프롬프트 등)를 보여줍니다.