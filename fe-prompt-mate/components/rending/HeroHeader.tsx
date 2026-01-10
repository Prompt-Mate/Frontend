"use client";

import Link from "next/link";

/** SVG */
import UnionIcon from "@/assets/icons/Union.svg";

export default function HeroHeader() {
  return (
    <header className="w-full">
      <div
        className="
          mx-auto
          flex
          max-w-[1200px]
          items-center
          justify-between
          py-[24px]
        "
      >
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center gap-[10px]">
          <UnionIcon className="h-[28px] w-[28px]" />
          <span className="text-[18px] font-bold text-[#111111]">
            PromMate
          </span>
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-[34px]">
          <Link
            href="/prompts"
            className="text-[18px] font-medium text-[#343434] hover:text-[#5527F5]"
          >
            프롬프트 다듬기
          </Link>

          <Link
            href="/community"
            className="text-[18px] font-medium text-[#343434] hover:text-[#5527F5]"
          >
            프롬프트 커뮤니티
          </Link>

          <Link
            href="/library"
            className="text-[18px] font-medium text-[#343434] hover:text-[#5527F5]"
          >
            라이브러리
          </Link>
        </nav>

        {/* 로그인 버튼 */}
        <Link
          href="/login"
          className="
            flex
            h-[48px]
            w-[130px]
            items-center
            justify-center
            rounded-[15px]
            bg-[#F1F5F9]
            text-[16px]
            font-medium
            text-[#111111]
            hover:bg-[#E8ECF3]
            transition
          "
        >
          Log in
        </Link>
      </div>
    </header>
  );
}