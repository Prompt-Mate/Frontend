import { DashboardCard } from "./DashboardCard";

const POPULAR = [
    { title: "PPT 개요 작성", likes: 234 },
    { title: "PPT 개요 작성", likes: 234 },
    { title: "PPT 개요 작성", likes: 234 },
    { title: "PPT 개요 작성", likes: 234 },
    { title: "PPT 개요 작성", likes: 234 },
];

function HeartIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 21s-7-4.6-9.2-8.7C.7 8.4 3.2 5 6.8 5c1.9 0 3.3 1 4.2 2.1C11.9 6 13.3 5 15.2 5c3.6 0 6.1 3.4 4 7.3C19 16.4 12 21 12 21z"
                fill="#D1D5DB"
            />
        </svg>
    );
}

export function PopularPromptsCard() {
    return (
        <DashboardCard className="h-[320px]">
            <h3 className="text-[16px] font-bold text-[#2B2B2B]">
                오늘의 인기 프롬프트
            </h3>

            <div className="mt-[18px] space-y-[10px]">
                {POPULAR.map((it, idx) => (
                    <div
                        key={idx}
                        className="flex items-center rounded-[16px] bg-white px-[14px] py-[12px] shadow-[0_0_0_1px_rgba(15,23,42,0.04)]"
                    >
            <span className="w-[22px] text-[13px] font-bold text-[#2B2B2B]">
              {idx + 1}
            </span>

                        <span className="flex-1 text-[14px] font-semibold text-[#2B2B2B]">
              {it.title}
            </span>

                        <div className="flex items-center gap-[6px]">
                            <HeartIcon />
                            <span className="text-[12px] font-semibold text-[#9CA3AF]">
                {it.likes}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
}
