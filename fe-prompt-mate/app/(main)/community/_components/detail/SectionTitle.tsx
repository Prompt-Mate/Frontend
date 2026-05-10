"use client";

type Props = {
    icon?: React.ReactNode;
    title: string;
    right?: React.ReactNode;
    text: string; // 본문 텍스트를 prop으로 받게
};

export default function SectionTitle({ icon, title, right, text }: Props) {
    return (
        <div>
            {/* 타이틀 줄 */}
            <div className="flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center text-[#6B4BFF]">
                    {icon}
                  </span>
                    <h2 className="text-[16px] font-semibold text-black/80">{title}</h2>
                </div>

                {right ? <div className="shrink-0">{right}</div> : null}
            </div>

            {/* 텍스트 박스 */}
            <div className="mx-auto mt-[24px] flex items-center justify-center rounded-[20px] bg-[#F8FAFC] px-[36px] pb-[45px] pt-[34px]">
                <p className="whitespace-pre-wrap text-[14px] leading-[22px] text-black/70">
                    {text}
                </p>
            </div>
        </div>
    );
}
