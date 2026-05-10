// components/home/Section3.tsx

"use client";

import Section3Visual from "@/assets/icons/section3.svg";

export default function Section3() {
  return (
    <section className="relative w-full min-h-[1000px] bg-white py-[140px]">
      <div className="mx-auto max-w-[1200px]">
        {/* 텍스트 */}
        <div>
          <span className="text-[22px] font-bold text-[#5527F5]">
            프롬프트 리라이팅
          </span>

          <h2 className="mt-6 text-[32px] font-bold leading-[144%] text-[#343434]">
            내가 쓴 프롬프트를 업로드하고
            <br />
            AI가 재작성해주는 프롬프트를 확인해보세요
          </h2>
        </div>

        {/* SVG 비주얼 */}
        <div className="mt-[80px] flex justify-center">
          <Section3Visual className="w-full max-w-[1000px]" />
        </div>
      </div>
    </section>
  );
}
