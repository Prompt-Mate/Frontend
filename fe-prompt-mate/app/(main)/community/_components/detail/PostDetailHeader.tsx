// components/PostDetailHeader.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import ActionMenu from "@/shared/components/common/ActionMenu";

type Props = {
    title?: string;
    badge?: string;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
};

export default function PostDetailHeader({
                                             title = "논문 분석/ 요약 프롬프트",
                                             badge = "Chat GPT",
                                             onEditClick,
                                             onDeleteClick,
                                         }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const onMoreClick = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="w-full bg-white">
            <div className="mx-auto flex h-[56px] w-full max-w-[1200px] items-center justify-between px-4">
                {/* left: title + chip */}
                <div className="flex min-w-0 items-center gap-6">
                    <h1 className="truncate text-[31px] font-bold leading-[1.2] text-[#343434]">
                        {title}
                    </h1>

                    {/* chip */}
                    <span className="inline-flex h-[28px] items-center rounded-full bg-[#F3EEFF] px-3 text-[12px] font-semibold text-[#6B4BFF]">
            {badge}
          </span>
                </div>

                {/* right: kebab */}
                <div className="relative" ref={menuRef}>
                    <button
                        type="button"
                        onClick={onMoreClick}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10"
                        aria-label="더보기"
                    >
                        {/* 세로 점 3개 (SVG) */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="5" r="1.8" fill="currentColor" />
                            <circle cx="12" cy="12" r="1.8" fill="currentColor" />
                            <circle cx="12" cy="19" r="1.8" fill="currentColor" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 top-full mt-1 z-20">
                            <ActionMenu
                                onEdit={onEditClick}
                                onDelete={onDeleteClick}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
