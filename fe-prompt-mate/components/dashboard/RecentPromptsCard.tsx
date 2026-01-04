import { DashboardCard } from "./DashboardCard";

const RECENTS = [
    {
        title: "브랜드 아이덴티티 비주얼 이미지 제작",
        tags: ["Midjourney", "이미지"],
        thumbType: "photo" as const,
    },
    {
        title: "브랜드 아이덴티티 비주얼 이미지 제작",
        tags: ["Midjourney", "이미지"],
        thumbType: "skeleton" as const,
    },
    {
        title: "브랜드 아이덴티티 비주얼 이미지 제작",
        tags: ["Midjourney", "이미지"],
        thumbType: "skeleton" as const,
    },
];

function ArrowControls() {
    return (
        <div className="flex items-center gap-[10px]">
            <button className="grid h-[34px] w-[34px] place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.04)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M15 18l-6-6 6-6"
                        stroke="#9CA3AF"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <button className="grid h-[34px] w-[34px] place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.04)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9 6l6 6-6 6"
                        stroke="#9CA3AF"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
}

function Tag({ children }: { children: string }) {
    return (
        <span className="rounded-full bg-[#EEF2FF] px-[10px] py-[4px] text-[11px] font-semibold text-[#6D5EF6]">
      {children}
    </span>
    );
}

function Thumbnail({ type }: { type: "photo" | "skeleton" }) {
    if (type === "photo") {
        return (
            <div className="h-[56px] w-[56px] overflow-hidden rounded-[14px] bg-[#D1D5DB]">
                {/* 실제 썸네일 이미지 연결 시 <Image/>로 교체 */}
                <div className="h-full w-full bg-[linear-gradient(135deg,#111827_0%,#374151_45%,#111827_100%)] opacity-[0.85]" />
            </div>
        );
    }

    return (
        <div className="h-[56px] w-[56px] overflow-hidden rounded-[14px] bg-[#E9EEF6]">
            <div className="h-full w-full bg-[linear-gradient(180deg,#EEF2FF_0%,#E2E8F0_100%)]" />
        </div>
    );
}

function MoreButton() {
    return (
        <button className="grid h-[34px] w-[34px] place-items-center rounded-full hover:bg-[rgba(15,23,42,0.04)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                    fill="#9CA3AF"
                />
            </svg>
        </button>
    );
}

export function RecentPromptsCard() {
    return (
        <DashboardCard className="h-[320px]">
            <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-[#2B2B2B]">
                    최근 본 프롬프트
                </h3>
                <ArrowControls />
            </div>

            <div className="mt-[16px] space-y-[14px]">
                {RECENTS.map((it, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-[14px] rounded-[18px] bg-white px-[14px] py-[12px] shadow-[0_0_0_1px_rgba(15,23,42,0.04)]"
                    >
                        <Thumbnail type={it.thumbType} />

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[14px] font-semibold text-[#2B2B2B]">
                                {it.title}
                            </p>
                            <div className="mt-[8px] flex items-center gap-[8px]">
                                {it.tags.map((t) => (
                                    <Tag key={t}>{t}</Tag>
                                ))}
                            </div>
                        </div>

                        <MoreButton />
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
}
