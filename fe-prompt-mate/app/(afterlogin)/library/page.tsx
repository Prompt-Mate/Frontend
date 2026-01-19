"use client";

import { useState } from "react";
import Container from "@/components/layout/Container";

import { LibraryHeader, LibraryTabKey } from "@/components/library/LibraryHeader";
import { LibraryMeta } from "@/components/library/LibraryMeta";
import { LibraryContent } from "@/components/library/LibraryContent";

import { useLibraryData } from "@/hooks/useLibraryData";

import type { LibraryItemData } from "@/components/library/LibraryItem";

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
          <LibraryMeta
            totalCount={totalCount}
            page={1}
            totalPages={totalPages}
          />
          <LibraryContent items={items} layout={layout} />
        </div>
      </section>
    </Container>
  );
}
