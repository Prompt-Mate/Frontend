import { CommunityCard, CommunityCardData } from "@/components/community/CommunityCard";

const MOCK: CommunityCardData[] = Array.from({ length: 12 }).map((_, i) => ({
    id: String(i + 1),
    platform: i % 3 === 0 ? "Midjourney" : "Chat gpt",
    title: i % 3 === 0 ? "미래지향 AR 글래스를 착용한 모델 이미지" : "유튜브 요약 프롬프트",
    author: "sage0131",
    likes: 123,
    comments: 23,
    thumbnailVariant: i % 3 === 0 ? "image" : "placeholder",
}));

export function CommunityGrid() {
    return (
        <section>
            <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                {MOCK.map((post) => (
                    <CommunityCard key={post.id} data={post} />
                ))}
            </div>
        </section>
    );
}
