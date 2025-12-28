import Image from "next/image";

export type CommunityCardData = {
    id: string;
    platform: string;
    title: string;
    author: string;
    likes: number;
    comments: number;
    thumbnailVariant: "image" | "placeholder";
};

export function CommunityCard({ data }: { data: CommunityCardData }) {
    return (
        <article
            className="
        relative overflow-hidden rounded-[22px]






































        bg-ui-card shadow-sm
        ring-1 ring-black/5
        hover:shadow-md transition
      "
        >
            <div className="p-4">
                {/* Top row: badge + like */}
                <div className="mb-3 flex items-center">
                    <CommunityBadge text={data.platform} />
                    <button
                        type="button"
                        aria-label="좋아요"
                        className="ml-auto grid h-8 w-8 place-items-center rounded-full hover:bg-ui-itemHover"
                    >
                        <HeartIcon className="h-5 w-5 text-ui-icon" />
                    </button>
                </div>

                <CommunityThumbnail variant={data.thumbnailVariant} />

                <h3 className="mt-3 line-clamp-2 text-[18px] font-bold leading-[1.3] text-ui-text">
                    {data.title}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                    <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/10">
                        <PlusMini className="h-4 w-4 text-primary" />
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
                            <ChatIcon className="h-4 w-4" />
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

function CommunityThumbnail({ variant }: { variant: "image" | "placeholder" }) {
    return (
        <div className="relative h-[120px] w-full overflow-hidden rounded-[18px] bg-ui-surfaceSubtle">
            {variant === "image" ? (
                <Image
                    src="/assets/icons/Frame 2087331743.png"
                    alt=""
                    fill
                    className="object-cover"
                />
            ) : (
                <div className="h-full w-full p-6">
                    <div className="h-full w-full rounded-[16px] bg-gradient-to-br from-primary/10 to-primary/0" />
                </div>
            )}
        </div>
    );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M12 21s-7-4.6-9.4-8.7C.8 9.1 2.7 6 6 6c2 0 3.2 1.1 4 2.2C10.8 7.1 12 6 14 6c3.3 0 5.2 3.1 3.4 6.3C19 16.4 12 21 12 21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M21 14c0 1.1-.4 2.1-1.1 2.9C18.7 18.1 16.9 19 15 19H9l-4 3v-3.8C3.8 17.4 3 15.8 3 14V8c0-2.2 1.8-4 4-4h10c2.2 0 4 1.8 4 4v6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function PlusMini(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M12 6v12M6 12h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
