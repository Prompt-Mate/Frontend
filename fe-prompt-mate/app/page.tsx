// app/page.tsx

import HeroSection from "@/components/rending/HeroSection";
import Section2 from "@/components/rending/Section2";
import Section3 from "@/components/rending/Section3";
import Section4 from "@/components/rending/Section4";
import Section5 from "@/components/rending/Section5";

export default function HomePage() {
  return (
    <main className="w-full">
      {/* HERO */}
      <HeroSection />

      {/* SECTION 2 : AI 공감 섹션 */}
      <Section2 />

      {/* SECTION 3 : 프롬프트 다듬기 섹션 */}
      <Section3 />

      {/* SECTION 4 : 프롬프트 평가 섹션 */}
      <Section4 />

      {/* SECTION 5 : 프롬프트 커뮤니티 섹션 */}  
      <Section5 />
  
    </main>
  );
}