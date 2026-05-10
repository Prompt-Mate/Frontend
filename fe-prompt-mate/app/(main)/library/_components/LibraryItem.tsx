import Link from "next/link";
import TagChip from "@/shared/components/common/TagChip";

export type LibraryItemData = {
  id: string;
  date: string;
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

  progress?: number;
};

function KebabButton() {
  return (
    <button
      type="button"
      aria-label="더보기"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
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
  const categoryIconSrc = `/icons/${item.category}.svg`;

  if (layout === "list") {
    return (
      <Link href={`/library/${item.id}`}>
        <li className="flex cursor-pointer items-center gap-[12px] px-[16px] py-[14px] hover:bg-black/5">
          <div className="w-[72px] text-[12px] text-black/35">
            {item.date}
          </div>

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
      </Link>
    );
  }

  const p = Math.max(0, Math.min(100, item.progress ?? 70));

  return (
    <Link href={`/library/${item.id}`}>
      <article className="cursor-pointer rounded-[18px] bg-white p-[16px] ring-1 ring-black/5 hover:ring-black/10">
        <div className="flex items-start">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-black/80">
              {item.title}
            </p>
            <p className="mt-[4px] text-[12px] text-black/35">
              {item.date}
            </p>
          </div>
          <div className="ml-auto">
            <KebabButton />
          </div>
        </div>
        <div className="relative mt-[4px]">
          {/* 내용 텍스트 */}
          <p className="text-[12px] text-[#B5B8BB]">
            {item.content}
          </p>

          {/* 하단 블러/그라데이션 효과 */}
          <div
            className="
              pointer-events-none
              absolute inset-x-0 bottom-0
              h-[14px]
              bg-gradient-to-t
              from-white
              to-transparent
            "
          />
        </div>
        <div className="mt-[10px] flex gap-[8px]">
          <TagChip variant="platform" label={platformLabel} />
          <TagChip
            variant={item.category}
            label={item.tag}
            iconSrc={categoryIconSrc}
          />
        </div>
      </article>
    </Link>
  );
}