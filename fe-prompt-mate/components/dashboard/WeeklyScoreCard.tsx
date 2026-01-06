"use client";

import { useMemo, useState } from "react";
import { DashboardCard } from "./DashboardCard";

type DayKey = "월" | "화" | "수" | "목" | "금" | "토" | "일";

const SAMPLE = [
    { day: "월" as DayKey, score: 88, count: 10, date: "2025. 11. 24" },
    { day: "화" as DayKey, score: 82, count: 9, date: "2025. 11. 25" },
    { day: "수" as DayKey, score: 74, count: 8, date: "2025. 11. 26" },
    { day: "목" as DayKey, score: 90, count: 12, date: "2025. 11. 28" },
    { day: "금" as DayKey, score: 79, count: 7, date: "2025. 11. 29" },
    { day: "토" as DayKey, score: 71, count: 6, date: "2025. 11. 30" },
    { day: "일" as DayKey, score: 66, count: 5, date: "2025. 12. 01" },
];

export function WeeklyScoreCard() {
    const [hoverIdx, setHoverIdx] = useState<number | null>(3);

    const max = useMemo(() => Math.max(...SAMPLE.map((d) => d.score)), []);

    const active = hoverIdx === null ? null : SAMPLE[hoverIdx];

    return (
        <DashboardCard className="h-[320px]">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-[16px] font-bold text-[#2B2B2B]">
                        프롬프트 평가 점수 분석
                    </h3>
                </div>
                <span className="text-[12px] font-semibold text-[#9CA3AF]">이번주</span>
            </div>

            <div className="relative mt-[18px] h-[235px]">
                {/* grid lines */}
                <div className="absolute inset-0">
                    {[100, 80, 60, 40, 20, 0].map((v, i) => (
                        <div
                            key={v}
                            className="absolute left-0 right-0"
                            style={{ top: `${(i / 5) * 100}%` }}
                        >
                            <div className="flex items-center gap-[10px]">
                <span className="w-[24px] text-[10px] font-medium text-[#C5CAD1]">
                  {v}
                </span>
                                <div className="h-[1px] flex-1 bg-[rgba(15,23,42,0.05)]" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* bars */}
                <div className="absolute left-[34px] right-0 top-[6px] bottom-[24px] flex items-end justify-between">
                    {SAMPLE.map((d, idx) => {
                        const h = d.score; // 이미 0~100 값이면 그대로 %
                        const isActive = idx === hoverIdx;

                        return (
                            <div
                                key={d.day}
                                className="relative h-full w-[56px]"
                                onMouseEnter={() => setHoverIdx(idx)}
                                onMouseLeave={() => setHoverIdx(3)}
                            >
                                {/* 채워지는 bar: 항상 바닥에서 시작 */}
                                <div
                                    className={[
                                        "absolute bottom-0 left-1/2 -translate-x-1/2",
                                        "w-[40px] rounded-[12px]",
                                        "bg-[rgba(148,163,184,0.18)]",
                                        "transition-all duration-150",
                                        isActive
                                            ? "bg-[linear-gradient(180deg,rgba(109,94,246,0.18)_0%,rgba(109,94,246,0.35)_100%)]"
                                            : "",
                                    ].join(" ")}
                                    style={{ height: `${h}%` }}
                                />

                                {/* active dot: bar의 꼭대기(= bottom + height)에 붙여야 함 */}
                                {isActive && (
                                    <div
                                        className="absolute left-1/2 -translate-x-1/2 h-[6px] w-[6px] rounded-full bg-[#6D5EF6]"
                                        style={{ bottom: `calc(${h}% - 6px)` }} // dot이 bar 위에 걸치게
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>



                {/* x labels */}
                <div className="absolute left-[34px] right-[0px] bottom-[0px] flex justify-between">
                    {SAMPLE.map((d) => (
                        <div
                            key={d.day}
                            className="w-[56px] text-center text-[12px] font-semibold text-[#C5CAD1]"
                        >
                            {d.day}
                        </div>
                    ))}
                </div>

                {/* tooltip */}
                {active && (
                    <div
                        className="absolute z-10"
                        style={{
                            left: `calc(34px + ${hoverIdx! * 56}px + 10px)`,
                            top: `52px`,
                        }}
                    >
                        <div className="rounded-[14px] bg-white px-[14px] py-[12px] shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
                            <div className="text-[12px] font-bold text-[#2B2B2B]">
                                {active.date}
                            </div>
                            <div className="mt-[8px] space-y-[6px]">
                                <div className="flex items-center justify-between gap-[18px]">
                  <span className="text-[11px] font-semibold text-[#9CA3AF]">
                    평균 점수
                  </span>
                                    <span className="text-[11px] font-bold text-[#6D5EF6]">
                    {active.score}
                  </span>
                                </div>
                                <div className="flex items-center justify-between gap-[18px]">
                  <span className="text-[11px] font-semibold text-[#9CA3AF]">
                    다듬은 프롬프트 개수
                  </span>
                                    <span className="text-[11px] font-bold text-[#2B2B2B]">
                    {active.count}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardCard>
    );
}
