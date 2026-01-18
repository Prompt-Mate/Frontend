"use client";

import { useRouter } from "next/navigation";
import CommunityDefault from"@/assets/icons/comunityDefault.svg"
import HeartIcon from "@/assets/icons/heart.svg"
import Image from "next/image";

export type CommunityCardData = {
    id: string;
    platform: string;
    title: string;
    author: string;
    likes: number;
    comments: number;
    thumbnailVariant: "image" | "placeholder";
    imageUrl?: string | null; // imageUrl 추가
};

export function CommunityCard({ data }: { data: CommunityCardData }) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/community/${data.id}`);
    };

    return (
        <article
            onClick={handleCardClick}
            className="
        relative overflow-hidden
        w-full max-w-[301px] h-[254px] rounded-[22px]
        bg-ui-card shadow-sm
        ring-1 ring-black/5
        cursor-pointer
      "
        >
            <div className="p-4">
                <div className="relative">
                    <CommunityThumbnail variant={data.thumbnailVariant} imageUrl={data.imageUrl} />

                    {/* ✅ 썸네일 위로 올리는 영역 */}
                    <div
                        className="
              absolute top-[21px] left-4 right-4 z-10
              flex items-center
            "
                    >
                        <CommunityBadge text={data.platform} />

                        <button
                            type="button"
                            aria-label="좋아요"
                            onClick={(e) => {
                                e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
                            }}
                            className="
                ml-auto grid h-8 w-8 place-items-center rounded-full
                bg-white/80 backdrop-blur
                hover:bg-ui-itemHover
              "
                        >
                            <HeartIcon className="h-5 w-5 text-ui-icon" />
                        </button>
                    </div>
                </div>

                <h3 className="mt-3 line-clamp-2 text-[18px] font-bold leading-[1.3] text-ui-text">
                    {data.title}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                    <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/10">
                    </div>
                    <span className="text-[16px] font-semibold text-ui-textMuted">
            {data.author}
          </span>

                    <div className="ml-auto flex items-center gap-3 text-[14px] text-ui-textMuted">
                        <div className="flex items-center gap-1">
                            <HeartIcon className="h-4 w-4" />
                            <span>{data.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>{data.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

function CommunityBadge({ text }: { text: string }) {
    return (
        <div className="rounded-full bg-ui-surfaceSubtle px-3 py-1 text-[13px] font-semibold text-ui-text">
            {text}
        </div>
    );
}

function CommunityThumbnail({ variant, imageUrl }: { variant: "image" | "placeholder", imageUrl?: string | null }) {
    return (
        <div className="relative h-[120px] w-full overflow-hidden rounded-[18px] bg-ui-surfaceSubtle">
            {variant === "image" && imageUrl ? (
                <Image
                    src={imageUrl}
                    alt="Community Post Thumbnail"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center">
                    <CommunityDefault className="h-full w-full" />
                </div>
            )}
        </div>
    );
}

