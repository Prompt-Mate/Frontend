"use client";

import * as React from "react";

export function CommunityListHeader() {
    const [sort, setSort] = React.useState<"최신순" | "추천순" | "조회순" | "좋아요">(
        "최신순"
    );

    return (
        <section className="mb-4 flex items-center justify-between">
        <PostCount count={132} />
    <SortTabs value={sort} onChange={setSort} />
    </section>
);
}

function PostCount({ count }: { count: number }) {
    return (
        <div className="text-body font-semibold text-ui-text">
            전체 <span className="text-primary">{count}</span>개
        </div>
);
}

function SortTabs({
                      value,
                      onChange,
                  }: {
    value: "최신순" | "추천순" | "조회순" | "좋아요";
    onChange: (v: any) => void;
}) {
    const tabs: Array<typeof value> = ["최신순", "추천순", "조회순", "좋아요"];

    return (
        <div className="flex items-center gap-3 text-[14px]">
            {tabs.map((t) => {
                    const active = value === t;
                    return (
                        <button
                            key={t}
                    type="button"
                    onClick={() => onChange(t)}
                    className={[
                            "rounded-full px-2 py-1 font-semibold",
                        active ? "text-ui-text" : "text-ui-textMuted hover:text-ui-text",
                ].join(" ")}
                >
                    {t}
                    </button>
                );
                })}
            </div>
    );
}
