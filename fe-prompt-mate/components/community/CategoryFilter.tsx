"use client";

type Props = {
    value: string;
    onChange: (v: string) => void;
};

const CATEGORIES = [
    { label: "업무/생산성", tone: "bg-primary/10 text-primary" },
    { label: "학습", tone: "bg-emerald-500/10 text-emerald-700" },
    { label: "콘텐츠", tone: "bg-sky-500/10 text-sky-700" },
    { label: "일상", tone: "bg-orange-500/10 text-orange-700" },
];

export function CategoryFilter({ value, onChange }: Props) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c) => {
                const active = value === c.label;
                return (
                    <button
                        key={c.label}
                        type="button"
                        onClick={() => onChange(c.label)}
                        className={[
                            "h-9 rounded-full px-4 text-[16px] font-semibold",
                            active ? c.tone : "bg-ui-surfaceSubtle text-ui-textMuted",
                            "hover:opacity-95 active:opacity-90",
                        ].join(" ")}
                    >
                        {c.label}
                    </button>
                );
            })}
        </div>
    );
}
