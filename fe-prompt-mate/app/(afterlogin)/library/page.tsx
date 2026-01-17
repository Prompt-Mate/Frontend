// app/(afterlogin)/library/page.tsx
"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

import { LibraryHeader, LibraryTabKey } from "@/components/library/LibraryHeader";
import { LibraryMeta } from "@/components/library/LibraryMeta";
import { LibraryContent } from "@/components/library/LibraryContent";

const MOCK: LibraryItemData[] = [
  { id: "1", date: "25.11.13", title: "심리학 코알 보고서 초고",content: "인간의 공격 행동을 사회 심리학적 관점에서 설명하고, 이를 억제하기 위한" ,platform: "Chat GPT", kind: "보고서", progress: 70 },
  { id: "2", date: "25.11.10", title: "시장 리포트 요약 자동화",content: "인간의 공격 행동을 사회 심리학적 관점에서 설명하고, 이를 억제하기 위한" ,platform: "Claude", kind: "요약", progress: 55 },
  { id: "3", date: "25.11.13", title: "미드저니 검은 고양이 이미지",content: "인간의 공격 행동을 사회 심리학적 관점에서 설명하고, 이를 억제하기 위한" ,platform: "Midjourney", kind: "이미지", progress: 88 },
  { id: "4", date: "25.11.13", title: "PPT 개요 작성",content: "인간의 공격 행동을 사회 심리학적 관점에서 설명하고, 이를 억제하기 위한" ,platform: "Chat GPT", kind: "문서작성", progress: 40 },
];
import { useLibraryData } from "@/hooks/useLibraryData";


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

  // 커스텀 훅 사용: 로직이 숨겨져서 코드가 훨씬 깔끔해집니다.
  const { items, totalCount, totalPages } = useLibraryData(tab, search);

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
          <LibraryMeta totalCount={totalCount} page={1} totalPages={totalPages} />
          <LibraryContent items={items} layout={layout} />
        </div>
      </section>
    </Container>
  );
}

// 이 페이지는 사용자의 라이브러리(저장된 프롬프트, 내가 만든 프롬프트 등)를 보여줍니다.