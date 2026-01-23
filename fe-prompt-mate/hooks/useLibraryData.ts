import { useState, useEffect } from "react";
import { LibraryItemData } from "@/components/library/LibraryItem";
import { getCategoryVariant, convertCategoryFromEnum, convertPlatformToLibraryItemFormat } from "@/components/prompts/constants";
import { getMyLibraries, getMyPosts, getLikedLibraries, searchLibraries, type MyLibrariesResponse } from "@/services/library";

type LibraryTabKey = "saved" | "mine" | "liked";

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
        // 검색어가 있으면 검색 API 사용
        if (search.trim()) {
          const data = await searchLibraries({
            keyword: search.trim(),
            page: 0,
            size: 12,
          });

          // 데이터 매핑
          const mappedItems: LibraryItemData[] = data.content.map((item) => ({
            id: String(item.id),
            // 날짜 포맷팅: 2026-01-18T18:50:46... -> 26.01.18
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
            platform: convertPlatformToLibraryItemFormat(item.platform),
            category: getCategoryVariant(item.category) as LibraryItemData["category"],
            tag: convertCategoryFromEnum(item.category),
            progress: 0,
          }));

          setItems(mappedItems);
          setTotalCount(data.totalElements || 0);
          setTotalPages(data.totalPages || 0);
          return;
        }

        // 검색어가 없으면 기존 탭별 API 사용
        if (tab === "mine") {
          // 내가 만든 프롬프트
          const data = await getMyLibraries({
            page: 0,
            size: 12,
          });

          // 데이터 매핑
          const mappedItems: LibraryItemData[] = data.content.map((item) => ({
            id: String(item.id),
            // 날짜 포맷팅: 2026-01-18T18:50:46... -> 26.01.18
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
            platform: convertPlatformToLibraryItemFormat(item.platform),
            category: getCategoryVariant(item.category) as LibraryItemData["category"],
            tag: convertCategoryFromEnum(item.category), // 카테고리 라벨을 tag로 사용
            progress: 0, // API에 없으면 기본값
          }));

          setItems(mappedItems);
          setTotalCount(data.totalElements || 0);
          setTotalPages(data.totalPages || 0);
        } else if (tab === "saved") {
          // 저장한 게시글 (페이지네이션 없음, 배열 응답)
          const data = await getMyPosts();

          // 데이터 매핑
          const mappedItems: LibraryItemData[] = data.map((item) => ({
            id: String(item.id),
            // 날짜 포맷팅: 2026-01-18T17:52:36... -> 26.01.18
            date: new Date(item.createdAt)
              .toLocaleDateString("ko-KR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\./g, "")
              .replace(/ /g, "."),
            title: item.title, // savedTitle이 아니라 title
            content: item.promptContent, // content가 아니라 promptContent
            platform: convertPlatformToLibraryItemFormat(item.platform),
            category: getCategoryVariant(item.category) as LibraryItemData["category"],
            tag: convertCategoryFromEnum(item.category),
            progress: 0,
          }));

          setItems(mappedItems);
          setTotalCount(data.length);
          setTotalPages(1);
        } else if (tab === "liked") {
          // 좋아요한 게시글 (페이지네이션 포함)
          const data = await getLikedLibraries({
            page: 0,
            size: 12,
          });

          // 데이터 매핑 (saved와 동일한 구조)
          const mappedItems: LibraryItemData[] = data.content.map((item) => ({
            id: String(item.id),
            // 날짜 포맷팅: 2026-01-18T17:52:36... -> 26.01.18
            date: new Date(item.createdAt)
              .toLocaleDateString("ko-KR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\./g, "")
              .replace(/ /g, "."),
            title: item.title,
            content: item.promptContent,
            platform: convertPlatformToLibraryItemFormat(item.platform),
            category: getCategoryVariant(item.category) as LibraryItemData["category"],
            tag: convertCategoryFromEnum(item.category),
            progress: 0,
          }));

          setItems(mappedItems);
          setTotalCount(data.totalElements || 0);
          setTotalPages(data.totalPages || 0);
        }
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("요청이 취소되었습니다.");
          return;
        }
        console.error("데이터 로딩 실패:", error);
        // 에러 발생 시 빈 배열로 설정
        setItems([]);
        setTotalCount(0);
        setTotalPages(0);
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
