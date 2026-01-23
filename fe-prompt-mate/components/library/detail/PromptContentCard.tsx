import Image from "next/image";
import TagChip from "@/components/common/TagChip";
import InputPromptIcon from "@/assets/icons/Group 2147202980.svg";

interface PromptContentCardProps {
  content: string;
}

export default function PromptContentCard({ content }: PromptContentCardProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[24px]
        bg-white
        p-8
      "
    >
      {/* ✅ 상단에만 깔리는 배경 SVG */}
      <div
        className="
          pointer-events-none
          absolute
          left-12
          right-12
          top-6
          
          overflow-hidden
        "
      >
        <Image
          src="/images/LibraryFrame.svg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* ✅ 실제 콘텐츠 */}
      <div className="relative z-10">

        {/* 카드 안 태그칩 */}
   

        <div className="mb-4 flex items-center gap-2 mt-6">
        <InputPromptIcon className="h-[22px] w-[20px] -translate-y-[1px]"/>

        <h2 className="text-[24px] font-semibold">
          입력한 프롬프트
        </h2>
      </div>



        <div className="rounded-[16px] bg-[#F8FAFC] p-6 text-[16px] w-[960px]  leading-relaxed text-[#343434]">
          {content}
        </div>
      </div>
    </section>
  );
}