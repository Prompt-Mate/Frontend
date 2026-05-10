"use client";

import { useState } from "react";
import Container from "@/shared/components/layout/Container";

import { LibraryHeader, LibraryTabKey } from "@/app/(main)/library/_components/LibraryHeader";
import { LibraryMeta } from "@/app/(main)/library/_components/LibraryMeta";
import { LibraryContent } from "@/app/(main)/library/_components/LibraryContent";

import { useLibraryData } from "@/shared/hooks/useLibraryData";

import type { LibraryItemData } from "@/app/(main)/library/_components/LibraryItem";

// 탭별 레이아웃
const TAB_LAYOUT: Record<LibraryTabKey, "list" | "grid"> = {
  mine : "grid",
  saved: "list",
  liked: "list",
};

export default function LibraryPage() {
  const [tab, setTab] = useState<LibraryTabKey>("mine");
  const [search, setSearch] = useState("");

  const layout = TAB_LAYOUT[tab];

  // 커스텀 훅 사용: 로직이 숨겨져서 코드가 훨씬 깔끔해집니다.
  const { items, loading, totalCount, totalPages } = useLibraryData(tab, search);

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
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-ui-textMuted">로딩 중...</p>
            </div>
          ) : (
            <LibraryContent items={items} layout={layout} />
          )}
        </div>
      </section>
    </Container>
  );
}
