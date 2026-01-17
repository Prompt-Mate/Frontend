import { useMemo } from "react";
import type { LibraryTabKey } from "@/components/library/LibraryHeader";
import type { LibraryItemData } from "@/components/library/LibraryItem";

type Return = {
  items: LibraryItemData[];
  totalCount: number;
  totalPages: number;
};

const MOCK_SAVED: LibraryItemData[] = [
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
    date: "25.11.13",
    title: "미드저니 검은 고양이 이미지",
    platform: "midjourney",
    category: "content",
    tag: "이미지",
    progress: 88,
  },
];

const MOCK_MINE: LibraryItemData[] = [
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
    date: "25.11.12",
    title: "회의 요약 템플릿",
    platform: "claude",
    category: "productivity",
    tag: "회의록",
  },
];

const MOCK_LIKED: LibraryItemData[] = [
  {
    id: "l1",
    date: "25.11.09",
    title: "여행 일정 자동 생성 프롬프트",
    platform: "chatgpt",
    category: "daily",
    tag: "여행",
  },
];

export function useLibraryData(tab: LibraryTabKey, search: string): Return {
  return useMemo(() => {
    const base =
      tab === "saved" ? MOCK_SAVED : tab === "mine" ? MOCK_MINE : MOCK_LIKED;

    const q = search.trim().toLowerCase();
    const filtered = !q
      ? base
      : base.filter((x) => {
          return (
            x.title.toLowerCase().includes(q) ||
            x.tag.toLowerCase().includes(q) ||
            x.platform.toLowerCase().includes(q)
          );
        });

    // ✅ 일단 페이지네이션은 “1페이지 고정”으로 안전하게
    return {
      items: filtered,
      totalCount: filtered.length,
      totalPages: 1,
    };
  }, [tab, search]);
}