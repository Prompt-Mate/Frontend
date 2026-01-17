import { DashboardCard } from "./DashboardCard";

function SparkleIcon() {
    return (
        <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[16px] bg-white/55">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 2l1.2 5.2L18 8.4l-4.8 1.2L12 14l-1.2-4.4L6 8.4l4.8-1.2L12 2z"
                    fill="#FFFFFF"
                    opacity="0.95"
                />
            </svg>
        </div>
    );
}

export function HeroCard() {
    return (
        <DashboardCard
            className={[
                "h-[320px]",
                "relative overflow-hidden",
                "bg-[linear-gradient(135deg,#E9ECFF_0%,#E6E9FF_35%,#F0F2FF_70%,#F6F7FF_100%)]",
            ].join(" ")}
        >
            {/* subtle blobs */}
            <div className="pointer-events-none absolute -left-[80px] -top-[120px] h-[260px] w-[260px] rounded-full bg-[rgba(93,83,255,0.10)] blur-[2px]" />
            <div className="pointer-events-none absolute -right-[120px] -bottom-[140px] h-[320px] w-[320px] rounded-full bg-[rgba(93,83,255,0.08)] blur-[2px]" />

            <div className="flex h-full flex-col items-center justify-between">
                <div className="pt-[8px]">
                    <SparkleIcon />
                    <h2 className="mt-[18px] text-[26px] font-bold leading-[1.35] text-[#545657] text-center">
                        말 안듣는 AI 때문에
                        <br />
                        답답하신가요?
                    </h2>
                    <p className="mt-[10px] text-[16px] font-medium leading-[1.55] text-[#545657] text-center">
                        내 프롬프트를 점검해보고,
                        <br />
                        더 나은 AI 결과물을 얻어보세요.
                    </p>
                </div>

                <div className="pb-[6px]">
                    <button
                        className={[
                            "h-[52px] w-[220px] rounded-full",
                            " bg-[#5527F5]",
                            "text-[14px] font-semibold text-white",
                            "shadow-[0_0_12px_rgba(255,255,255,0.80)_inset]",
                            "hover:brightness-[1.03]",
                            "active:brightness-[0.97]",
                            "transition",
                        ].join(" ")}
                    >
                        프롬프트 발전시키러 가기
                    </button>
                </div>
            </div>
        </DashboardCard>
    );
}
