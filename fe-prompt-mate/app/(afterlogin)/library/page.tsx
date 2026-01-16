// app/(afterlogin)/library/page.tsx
"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

import { LibraryHeader, LibraryTabKey } from "@/components/library/LibraryHeader";
import { LibraryMeta } from "@/components/library/LibraryMeta";
import { LibraryContent } from "@/components/library/LibraryContent";
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