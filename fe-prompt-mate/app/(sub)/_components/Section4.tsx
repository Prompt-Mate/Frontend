// components/home/Section4.tsx
"use client";

import Section4Evaluation from "@/assets/icons/section4Evaluation.svg";

export default function Section4() {
  return (
    <section className="relative w-full bg-white py-[160px] overflow-hidden">
      <div className="mx-auto max-w-[1200px] min-h-[1000px] grid grid-cols-[1fr_1fr] gap-[80px]">
        
        {/* 왼쪽 텍스트 */}
        <div>
          <span className="text-[22px] font-bold text-[#5527F5]">
            프롬프트 종합 평가
          </span>

          <h2 className="mt-6 text-[32px] font-bold leading-[144%] text-[#343434]">
            어느 부분이 문제였는지,
            <br />
            구체적인 평가도 받아보세요!
          </h2>
        </div>

        {/* 오른쪽 SVG (레이아웃 영향 X) */}
        <div className="relative">
          <Section4Evaluation className="w-[900px] max-w-none" />
        </div>
      </div>
    </section>
  );
}