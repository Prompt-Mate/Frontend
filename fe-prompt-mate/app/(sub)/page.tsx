// app/page.tsx

import HeroSection from "@/app/(sub)/_components/HeroSection";
import Section2 from "@/app/(sub)/_components/Section2";
import Section3 from "@/app/(sub)/_components/Section3";
import Section4 from "@/app/(sub)/_components/Section4";
import Section5 from "@/app/(sub)/_components/Section5";

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