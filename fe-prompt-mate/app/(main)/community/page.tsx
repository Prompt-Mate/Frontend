// app/(afterlogin)/community/page.tsx
"use client";

import { useState, useEffect } from "react";
import Container from "@/shared/components/layout/Container";

import { CommunityHeader } from "@/app/(main)/community/_components/CommunityHeader";
import { CommunityFilter } from "@/app/(main)/community/_components/CommunityFilter";
import { CommunityListHeader } from "@/app/(main)/community/_components/CommunityListHeader";
import { CommunityGrid } from "@/app/(main)/community/_components/CommunityGrid";
import { getCommunityPosts, type CommunityPost, convertSortToEnum } from "@/shared/api/community";
import { convertPlatformToEnum } from "@/app/(main)/community/_components/PlatformFilter";
import { convertCategoryToEnum } from "@/app/(main)/community/_components/CategoryFilter";

export default function CommunityPage() {
  // 2단계: platform과 category 상태 관리
  const [platform, setPlatform] = useState<string>("Chat GPT");
  const [category, setCategory] = useState<string>("업무/생산성");
  
  // 3단계: sort 정렬 조건 상태 관리
  const [sort, setSort] = useState<"최신순" | "조회순" | "좋아요">("최신순");
  
  // 4단계: search 검색어 상태 관리
  const [search, setSearch] = useState<string>("");
  
  // API 응답 데이터 상태
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // 2단계 + 3단계 + 4단계: platform, category, sort, search 변경 시 API 호출
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // 화면 표시용 값을 백엔드 enum 형식으로 변환
        const platformEnum = convertPlatformToEnum(platform);
        const categoryEnum = convertCategoryToEnum(category);
        const sortEnum = convertSortToEnum(sort); // "최신순" → "latest", "조회순" → "view", "좋아요" → "like"

        // API 호출 (platform, category, sort, search 사용)
        const response = await getCommunityPosts({
          platform: platformEnum,
          category: categoryEnum,
          sort: sortEnum, // 변환된 정렬 조건 사용
          search: search || undefined, // 빈 문자열이면 undefined (쿼리 파라미터에서 제외)
        });

        // API 응답이 배열로 직접 오는 경우
        const postsArray = Array.isArray(response) ? response : [];
        setPosts(postsArray);
        setTotalCount(postsArray.length);
      } catch (error) {
        console.error("커뮤니티 게시글 조회 실패:", error);
        // 에러 발생 시 빈 배열로 설정
        setPosts([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [platform, category, sort, search]); // platform, category, sort, search 변경 시 실행

  return (
    <Container>
     <section className="space-y-6 md:space-y-8 pt-6">
        <CommunityHeader onSearch={setSearch} />
        <CommunityFilter 
          platform={platform}
          category={category}
          onPlatformChange={setPlatform}
          onCategoryChange={setCategory}
        />
        <CommunityListHeader 
          totalCount={totalCount}
          sort={sort}
          onSortChange={setSort}
        />
        <CommunityGrid posts={posts} loading={loading} />
      </section>
    </Container>
  );
}
