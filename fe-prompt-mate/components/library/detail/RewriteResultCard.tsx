import UnionIcon from "@/assets/icons/Union.svg";

interface RewriteResultCardProps {
  content: string;
}

export default function RewriteResultCard({ content }: RewriteResultCardProps) {
  return (
    <section className="rounded-[24px] bg-white p-8">
      {/* 🔹 아이콘 + 제목 가로 정렬 */}
      <div className="mb-4 flex items-center gap-2">
        <UnionIcon className="h-[20px] w-[20px] -translate-y-[1px]"/>

        <h2 className="text-[24px] font-semibold">
          리라이팅 결과
        </h2>
      </div>

      {/* 결과 카드 */}
      <div className="rounded-[16px] bg-[#F8FAFC] p-6 text-[16px] w-[960px]  leading-relaxed text-[#343434]">
        {content || "아직 리라이팅 결과가 없습니다."}
      </div>
    </section>
  );
}