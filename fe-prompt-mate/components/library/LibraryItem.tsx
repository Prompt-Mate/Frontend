// components/library/LibraryItem.tsx
import TagChip from "@/components/common/TagChip";

export type LibraryItemData = {
    id: string;
    date: string; // 25.11.13
    title: string;
    content: string;
    platform:
        | "chatgpt"
        | "gemini"
        | "claude"
        | "copliot"
        | "perplexity"
        | "midjourney"
        | "dalle";

    category: "productivity" | "study" | "content" | "daily";
    tag: string;

    progress?: number; // grid에서만 사용(0~100)
};

function KebabButton() {
    return (
        <button
            type="button"
            aria-label="더보기"
            className="grid h-[30px] w-[30px] place-items-center rounded-full hover:bg-black/5 active:bg-black/10"
        >
            <span className="text-[18px] leading-none text-black/50">⋮</span>
        </button>
    );
}

const PLATFORM_LABEL: Record<LibraryItemData["platform"], string> = {
    chatgpt: "Chat GPT",
    gemini: "Gemini",
    claude: "Claude",
    copliot: "Copliot",
    perplexity: "Perplexity",
    midjourney: "Midjourney",
    dalle: "DALL-E",
};

export function LibraryItem({
                                item,
                                layout,
                            }: {
    item: LibraryItemData;
    layout: "list" | "grid";
}) {
    const platformLabel = PLATFORM_LABEL[item.platform] ?? item.platform;

    // platform은 아이콘 없음
    // 나머지 카테고리는 public/icons/{category}.svg 사용
    const categoryIconSrc = `/icons/${item.category}.svg`;

    if (layout === "list") {
        return (
            <li className="flex items-center gap-[12px] px-[16px] py-[14px]">
                <div className="w-[72px] text-[12px] text-black/35">{item.date}</div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-black/80">
                        {item.title}
                    </p>
                </div>

                <div className="flex items-center gap-[8px]">
                    <TagChip variant="platform" label={platformLabel} />

                    <TagChip
                        variant={item.category}
                        label={item.tag}
                        iconSrc={categoryIconSrc}
                    />

                    <KebabButton />
                </div>
            </li>
        );
    }

    const p = Math.max(0, Math.min(100, item.progress ?? 70));

    return (
        <article className="rounded-[18px] bg-white p-[16px] ring-1 ring-black/5">
            <div className="flex items-start">
                <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-black/80">
                        {item.title}
                    </p>
                    <p className="mt-[4px] text-[12px] text-black/35">{item.date}</p>
                    <p className="mt-[11px] line-clamp-2 text-[13px]" style={{ color: "var(--gray-grey-7, #B5B8BB)" }}>
                        {item.content}
                    </p>
                </div>
                <div className="ml-auto">
                    <KebabButton />
                </div>
            </div>

            <div className="mt-[10px] flex gap-[8px]">
                <TagChip variant="platform" label={platformLabel} />
                <TagChip
                    variant={item.category}
                    label={item.tag}
                    iconSrc={categoryIconSrc}
                />
            </div>

            <div className="mt-[14px] h-[4px] w-full rounded-full bg-black/5">
                <div
                    className="h-full rounded-full bg-[#B9ABFF]"
                    style={{ width: `${p}%` }}
                />
            </div>

            <p className="mt-[6px] text-[12px] text-black/30">총점 {p}점</p>
        </article>
    );
}