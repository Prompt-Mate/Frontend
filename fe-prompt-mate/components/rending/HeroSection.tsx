// components/home/Section2.tsx


"use client";

import Link from "next/link";
import HeroHeader from "./HeroHeader";

/** SVG */
import UnionIcon from "@/assets/icons/Union.svg";
import PromptButtonIcon from "@/assets/icons/PromptButton.svg";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[1000px] bg-white overflow-hidden">
      {/* 헤더 */}
      <HeroHeader />

      {/* 중앙 콘텐츠 */}
      <div className="mx-auto mt-[120px] max-w-[1200px] flex flex-col items-center text-center">
        <UnionIcon className="mb-6 h-6 w-6 text-[#5527F5]" />

        <h1 className="text-[72px] font-bold leading-[110%] text-[#7A6BF2]">
          PromMate
        </h1>

        <p className="mt-[49px] text-[25px] font-semibold leading-[138%] text-[#111]">
          더 나은 AI 창작물을, 더 쉽게
          <br />
          PromMate와 함께 당신의 아이디어를 완성하세요.
        </p>

        <p className="mt-[23px] text-[20px] leading-[120%] text-[#6C6F79]">
          Refine your prompts, Amplify your creativity.
          PromptMate, your AI co-creator.
        </p>

        <Link
          href="/prompts"
          className="
            mt-[60px]
            inline-block
          "
        >
          <PromptButtonIcon className="w-[395px] h-auto cursor-pointer hover:brightness-105 active:translate-y-[1px]" />
        </Link>
      </div>

      {/* 하단 그라데이션 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-gradient-to-t from-[#CABCFD] to-transparent" />
    </section>
  );
}
