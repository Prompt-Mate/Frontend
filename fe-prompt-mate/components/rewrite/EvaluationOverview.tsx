import React from "react";

type ScoreItemData = {
    label: string;
    score: number; // 0~100
};

type EvaluationCardProps = {
    totalScore: number; // 0~100
    items: ScoreItemData[];
};

export function EvaluationOverview({ totalScore, items }: EvaluationCardProps) {
    return (
        <section className="rounded-2xl bg-ui-surface p-6">
            {/* 바깥: 좌/우 2단 */}
            <div className="grid grid-cols-[260px_1fr] gap-8">
                <LeftSummary totalScore={totalScore} />
                <RightScoreList items={items} />
            </div>
        </section>
    );
}

function LeftSummary({ totalScore }: { totalScore: number }) {
    return (
        <div>
            <div className="flex items-center justify-center rounded-2xl bg-white p-6 shadow-sm">
                {/* 도넛 차트(간단 SVG) */}
                <DonutChart value={totalScore} size={160} stroke={18} />
            </div>

            {/* 점수 텍스트 */}
            <div className="mt-6 flex items-end gap-2">
                <span className="text-pageTitle font-bold text-ui-text">
                  {totalScore}점
                </span>
                <span className="text-body font-medium text-ui-textMuted">/100</span>
            </div>
        </div>
    );
}

function RightScoreList({ items }: { items: ScoreItemData[] }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="space-y-6">
                {items.map((it) => (
                    <ScoreItem key={it.label} label={it.label} score={it.score} />
                ))}
            </div>
        </div>
    );
}

function ScoreItem({ label, score }: { label: string; score: number }) {
    const pct = Math.max(0, Math.min(100, score)); // 안전장치

    return (
        <div className="space-y-2">
            {/* 라벨(왼쪽) + 점수(오른쪽) */}
            <div className="flex items-center">
                <span className="text-body font-medium text-ui-text">{label}</span>
                <span className="ml-auto text-body font-semibold text-ui-text">
          {score}점
        </span>
            </div>

            {/* 프로그레스 바 */}
            <div className="h-2 w-full rounded-full bg-ui-surfaceSubtle">
                <div
                    className="h-2 rounded-full bg-[#6D5EF6]"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

/**
 * 아주 단순한 도넛 차트(SVG)
 * - value(0~100)에 따라 strokeDasharray로 채워짐
 */
function DonutChart({
                        value,
                        size,
                        stroke,
                    }: {
    value: number;
    size: number;
    stroke: number;
}) {
    const v = Math.max(0, Math.min(100, value));
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const filled = (v / 100) * c;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* 배경 링 */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="#EEF2F7"
                strokeWidth={stroke}
            />
            {/* 채워진 링 */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="#6D5EF6"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${filled} ${c - filled}`}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        </svg>
    );
}

