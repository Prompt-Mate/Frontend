import { useState, useEffect } from "react";
import { LibraryItemData } from "@/components/library/LibraryItem";
import { apiGet } from "@/lib/api";

type LibraryTabKey = "saved" | "mine" | "liked";

interface LibraryContentItem {
  id: number;
  userId: number;
  rewriteResultId: number;
  savedTitle: string;
  content: string;
  platform: string;
  category: string;
  createdAt: string;
}

interface LibraryResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: LibraryContentItem[];
}

export function useLibraryData(tab: LibraryTabKey, search: string) {
  const [items, setItems] = useState<LibraryItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // 1. AbortController 생성 (이전 요청 취소용)
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        // 예시: mine 탭일 때만 API 호출 (다른 탭 로직도 여기에 추가 가능)
        if (tab === "mine") {
          const queryParams = new URLSearchParams({
            page: "0",
            size: "12",
          });
          if (search) queryParams.append("keyword", search);

          const data = await apiGet<LibraryResponse>(`/api/libraries/my?${queryParams}`, { signal });

          // 데이터 매핑
          const mappedItems: LibraryItemData[] = data.content.map((item) => ({
            id: String(item.id),
            // 날짜 포맷팅: 2026-01-11... -> 26.01.11
            date: new Date(item.createdAt)
              .toLocaleDateString("ko-KR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\./g, "")
              .replace(/ /g, "."),
            title: item.savedTitle,
            content: item.content,
            platform: item.platform as LibraryItemData["platform"],
            category: item.category as LibraryItemData["category"],
            tag: "기타", // API에 tag가 없어서 임시 값 설정
            progress: 0, // API에 없으면 기본값
          }));

          setItems(mappedItems);
          setTotalCount(data.totalElements || 0);
          setTotalPages(data.totalPages || 0);
        } else {
          // 다른 탭(saved, liked)은 아직 MOCK 데이터 사용 예시
          setItems([]);
          setTotalCount(0);
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("요청이 취소되었습니다.");
          return;
        }
        console.error("데이터 로딩 실패:", error);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchData();

    // Cleanup: 탭이나 검색어가 바뀌면 이전 요청 취소
    return () => controller.abort();
  }, [tab, search]);

  return { items, loading, totalCount, totalPages };
}
