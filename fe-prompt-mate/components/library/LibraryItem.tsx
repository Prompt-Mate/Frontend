import {Badge} from "@/components/Badge";


export type LibraryItemData = {
    id: string;
    date: string; // 25.11.13
    title: string;
    platform: string; // Chat GPT / Claude / Midjourney
    kind: string; // 보고서 / 요약 / 이미지 / 문서작성
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

export function LibraryItem({
                                item,
                                layout,
                            }: {
    item: LibraryItemData;
    layout: "list" | "grid";
}) {
    if (layout === "list") {
        // ✅ 데스크탑 리스트 (첫 번째 이미지)
        return (
            <li className="flex items-center gap-[12px] px-[16px] py-[14px]">
                <div className="w-[72px] text-[12px] text-black/35">{item.date}</div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-black/80">
                        {item.title}
                    </p>
                </div>

                <div className="flex items-center gap-[8px]">
                    <Badge>{item.platform}</Badge>
                    <Badge className="text-[#2E6BFF]">{item.kind}</Badge>
                    <KebabButton />
                </div>
            </li>
        );
    }

    // ✅ 데스크탑 카드 그리드 (두 번째 이미지)
    const p = Math.max(0, Math.min(100, item.progress ?? 70));

    return (
        <article className="rounded-[18px] bg-white p-[16px] ring-1 ring-black/5">
            <div className="flex items-start">
                <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-black/80">
                        {item.title}
                    </p>
                    <p className="mt-[4px] text-[12px] text-black/35">{item.date}</p>
                </div>
                <div className="ml-auto">
                    <KebabButton />
                </div>
            </div>

            <div className="mt-[10px] flex gap-[8px]">
                <Badge>{item.platform}</Badge>
                <Badge className="text-[#2E6BFF]">{item.kind}</Badge>
            </div>

            <div className="mt-[14px] h-[4px] w-full rounded-full bg-black/5">
                <div className="h-full rounded-full bg-[#B9ABFF]" style={{ width: `${p}%` }} />
            </div>
            <p className="mt-[6px] text-[12px] text-black/30">결과 {p}%</p>
        </article>
    );
}
