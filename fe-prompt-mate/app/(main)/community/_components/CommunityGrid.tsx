import { CommunityCard, CommunityCardData } from "@/app/(main)/community/_components/CommunityCard";
import { type CommunityPost } from "@/shared/api/community";

interface Props {
  posts: CommunityPost[];
  loading: boolean;
}

export function CommunityGrid({ posts, loading }: Props) {
  // posts가 undefined이거나 배열이 아니면 빈 배열로 처리
  const safePosts = Array.isArray(posts) ? posts : [];

  // API 응답 데이터를 CommunityCardData 형식으로 변환
  const cardData: CommunityCardData[] = safePosts.map((post) => ({
    id: String(post.id),
    platform: post.platform,
    title: post.title,
    author: post.nickname, // nickname 필드 사용
    likes: post.likeCount, // likeCount 필드 사용
    comments: post.commentCount, // commentCount 필드 사용
    // imageUrl이 있으면 "image", 없으면 "placeholder"
    thumbnailVariant: post.imageUrl ? "image" : "placeholder",
    imageUrl: post.imageUrl, // imageUrl 전달
    isLiked: post.isLiked, // 좋아요 상태 전달
  }));

  // 로딩 중일 때
  if (loading) {
    return (
      <section>
        <div className="flex items-center justify-center py-20">
          <p className="text-ui-textMuted">로딩 중...</p>
        </div>
      </section>
    );
  }

  // 게시글이 없을 때
  if (cardData.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-center py-20">
          <p className="text-ui-textMuted">게시글이 없습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {cardData.map((post) => (
          <CommunityCard key={post.id} data={post} />
        ))}
      </div>
    </section>
  );
}
