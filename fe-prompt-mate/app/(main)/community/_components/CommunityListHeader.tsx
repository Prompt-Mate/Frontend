"use client";

import * as React from "react";

interface Props {
  totalCount?: number;
  sort?: "최신순" | "조회순" | "좋아요";
  onSortChange?: (sort: "최신순" | "조회순" | "좋아요") => void;
}

export function CommunityListHeader({ 
  totalCount = 0, 
  sort = "최신순",
  onSortChange 
}: Props) {
    return (
        <section className="mb-4 flex items-center justify-between">
        <PostCount count={totalCount} />
    <SortTabs value={sort} onChange={onSortChange || (() => {})} />
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
    value: "최신순" | "조회순" | "좋아요";
    onChange: (v: any) => void;
}) {
    const tabs: Array<typeof value> = ["최신순", "조회순", "좋아요"];

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
