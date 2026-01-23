"use client";

import { useEffect, useRef, useState } from "react";
import TagChip from "@/components/common/TagChip";

interface LibraryDetailHeaderProps {
  title: string;
  platform: string;
  category: string;
  categoryVariant: "platform" | "productivity" | "study" | "content" | "daily";
}

export default function LibraryDetailHeader({
  title,
  platform,
  category,
  categoryVariant,
}: LibraryDetailHeaderProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header className="px-10 pt-8">
      {/* ✅ 왼쪽 전체 묶음 (제목 + 아래 태그칩) */}
      <div className="flex items-start justify-between">
          <div className="space-y-4">
            {/* 제목 + 플랫폼 태그 */}
            <div className="flex items-center gap-3">
              <h1 className="text-[31px] font-bold text-black">
                {title}
              </h1>

              <TagChip variant="platform" label={platform} />
            </div>

            {/* ⬇️ 제목 아래 태그칩 (간격 16px) */}

           <div className="rounded-[16px] bg-[#F8FAFC] p-3 h-[58px] w-[960px] leading-relaxed">
           <TagChip variant="platform" label={platform} />
            <TagChip variant={categoryVariant} label={category} />
        </div>
        </div>

        {/* 우측 메뉴 */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-black/5"
            aria-label="메뉴 열기"
          >
            <span className="text-[18px] leading-none">⋮</span>
          </button>

          {/* 드롭다운 */}
          {open && (
            <div
              className="
                absolute right-0 top-[36px]
                w-[200px]
                rounded-[12px]
                bg-white
                py-2
                shadow-lg
                ring-1 ring-black/5
                z-50
              "
            >
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  console.log("수정하기");
                }}
                className="w-full px-4 py-2 text-left text-[16px] text-[#6C6E70] hover:bg-black/5"
              >
                수정하기
              </button>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  console.log("삭제하기");
                }}
                className="w-full px-4 py-2 text-left text-[16px] text-red-500 hover:bg-red-50"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}