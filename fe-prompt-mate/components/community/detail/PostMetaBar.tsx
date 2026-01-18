// components/PostMetaBar.tsx
"use client";

import UserIcon from "@/assets/icons/Group 2147202980.svg"


type Props = {
    username?: string;
    dateText?: string; // "2025.11.16"
    views?: number;
    likes?: number;
    isLiked: boolean;
    comments?: number;
    onLikeClick?: () => void;
};

function Stat({
                  icon,
                  value,
              }: {
    icon: React.ReactNode;
    value: number | string;
}) {
    return (
        <div className="flex items-center gap-2 text-[14px] text-black/40">
      <span className="inline-flex h-5 w-5 items-center justify-center">
        {icon}
      </span>
            <span className="tabular-nums">{value}</span>
        </div>
    );
}

export default function PostMetaBar({
                                        username,
                                        dateText,
                                        views,
                                        likes,
                                        isLiked,
                                        comments,
                                        onLikeClick,
                                    }: Props) {
    return (
        <div className="mx-auto w-full max-w-[1200px] px-4">
            {/* 바 전체 */}
            <div className="flex h-[56px] items-center justify-between rounded-[12px] bg-[#F3F6F8] px-4">
                {/* left: avatar + name + date */}
                <div className="flex min-w-0 items-center gap-4">
                    {/* avatar */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E6E9FF]">
                        <UserIcon/>
                    </div>

                    <div className="flex min-w-0 items-center gap-6">
            <span className="truncate text-[16px] font-semibold text-black/70">
              {username}
            </span>
                        <span className="text-[16px] text-black/40">{dateText}</span>
                    </div>
                </div>

                {/* right: stats + heart button */}
                <div className="flex items-center gap-5">
                    <Stat
                        icon={
                            // eye
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                />
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="2.7"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                />
                            </svg>
                        }
                        value={views}
                    />

                    <Stat
                        icon={
                            // heart (small)
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12 20s-7-4.6-9.2-9C1.3 7.5 3.5 5 6.5 5c1.7 0 3.2.9 4 2.1C11.3 5.9 12.8 5 14.5 5c3 0 5.2 2.5 3.7 6-2.2 4.4-9.2 9-9.2 9Z"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        value={likes}
                    />

                    <Stat
                        icon={
                            // comment
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M4.5 5.5h15v10.5h-7l-4.5 3v-3h-3.5V5.5Z"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        value={comments}
                    />

                    {/* 우측 하트 버튼(동그라미) */}
                    <button
                        type="button"
                        onClick={onLikeClick}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.06)] hover:bg-black/5 active:bg-black/10"
                        aria-label="좋아요"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 20s-7-4.6-9.2-9C1.3 7.5 3.5 5 6.5 5c1.7 0 3.2.9 4 2.1C11.3 5.9 12.8 5 14.5 5c3 0 5.2 2.5 3.7 6-2.2 4.4-9.2 9-9.2 9Z"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
