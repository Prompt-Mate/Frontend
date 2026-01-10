"use client";

import CommunityLogoChip from "./CommunityLogoChip";

/** 로고 SVG */
import ChatgptIcon from "@/assets/icons/Chatgpt.svg";
import GeminiIcon from "@/assets/icons/Gemini.svg";
import ClaudeIcon from "@/assets/icons/Claude.svg";
import CopilotIcon from "@/assets/icons/Copliot.svg";
import DALLEIcon from "@/assets/icons/DALLE.svg";
import PerplexityIcon from "@/assets/icons/perplexity.svg";
import MidjourneyIcon from "@/assets/icons/Midjourney.svg";
import MidjourneyLogoIcon from "@/assets/icons/MidjourneyLogo.svg";

/** 하단 비주얼 SVG */
import Section5CommunityVisual from "@/assets/icons/section5Community.svg";

export default function Section5() {
  return (
    <section className="w-full bg-white py-[160px]">
      <div className="mx-auto max-w-[1200px]">

        {/* ================= 상단 텍스트 ================= */}
        <div className="text-center">
          <span className="text-[22px] font-bold text-[#5527F5]">
            프롬프트 커뮤니티
          </span>

          <h2 className="mt-6 text-[32px] font-bold leading-[144%] text-[#343434]">
            커뮤니티에서 다른 사람들의 프롬프트를 구경하고
            <br />
            마음에 드는 프롬프트를 저장해 사용해보세요
          </h2>
        </div>

        {/* ================= 로고 필터 ================= */}
        <div className="mt-[60px] flex flex-wrap justify-center gap-[16px]">
          <CommunityLogoChip><ChatgptIcon /></CommunityLogoChip>
          <CommunityLogoChip><GeminiIcon /></CommunityLogoChip>
          <CommunityLogoChip><ClaudeIcon /></CommunityLogoChip>

          {/* Midjourney (로고 + 텍스트 분리 SVG) */}
          <CommunityLogoChip>
            <MidjourneyLogoIcon />
            <MidjourneyIcon />
          </CommunityLogoChip>

          <CommunityLogoChip><CopilotIcon /></CommunityLogoChip>
          <CommunityLogoChip><PerplexityIcon /></CommunityLogoChip>
          <CommunityLogoChip><DALLEIcon /></CommunityLogoChip>
        </div>

        {/* ================= 커뮤니티 비주얼 ================= */}
        <div className="relative mt-[100px] flex justify-center">
          <Section5CommunityVisual className="w-full max-w-[1100px]" />
        </div>

      </div>
    </section>
  );
}