// components/community/PromptRegisterModal.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Item = {
    id: string;
    date: string;
    title: string;
    platform: "Chat GPT" | "Claude" | "Midjourney";
    badge: "보고서" | "요약" | "이미지" | "문서 작성";
};

const SAMPLE: Item[] = [
    { id: "1", date: "25.11.13", title: "심리학 교양 보고서 초고", platform: "Chat GPT", badge: "보고서" },
    { id: "2", date: "25.11.10", title: "시장 리포트 요약 자동화", platform: "Claude", badge: "요약" },
    { id: "3", date: "25.11.13", title: "미드저니 검은 고양이 이미지", platform: "Midjourney", badge: "이미지" },
    { id: "4", date: "25.11.13", title: "PPT 개요 작성", platform: "Chat GPT", badge: "문서 작성" },
];

function cn(...xs: Array<string | false | undefined | null>) {
    return xs.filter(Boolean).join(" ");
}

function Pill({ children, tone = "purple" }: { children: React.ReactNode; tone?: "purple" | "green" | "blue" | "gray" }) {
    const cls =
        tone === "purple"
            ? "bg-[rgba(99,102,241,0.12)] text-[#5B5DE6]"
            : tone === "green"
                ? "bg-[rgba(34,197,94,0.12)] text-[#16A34A]"
                : tone === "blue"
                    ? "bg-[rgba(59,130,246,0.12)] text-[#2563EB]"
                    : "bg-black/5 text-black/70";

    return (
        <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold", cls)}>
      {children}
    </span>
    );
}

function platformTone(p: Item["platform"]) {
    if (p === "Claude") return "green";
    if (p === "Midjourney") return "blue";
    return "purple";
}

function badgeTone(b: Item["badge"]) {
    if (b === "요약") return "green";
    if (b === "이미지") return "blue";
    return "purple";
}

export default function PromptRegisterModal({ asPage = false }: { asPage?: boolean }) {
    const router = useRouter();

    const [page, setPage] = useState(1);
    const totalPages = 3;

    const [selectedId, setSelectedId] = useState<string>(SAMPLE[0].id);
    const selected = useMemo(() => SAMPLE.find((x) => x.id === selectedId) ?? SAMPLE[0], [selectedId]);

    const [title, setTitle] = useState(selected.title);
    const [content, setContent] = useState("");

    // 선택 아이템 바뀌면 제목 자동 세팅(원하면 제거 가능)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => setTitle(selected.title), [selectedId]);

    const close = () => {
        // 모달로 열린 경우 router.back()이 자연스럽고
        // 풀페이지(asPage=true)인 경우도 뒤로가기면 무난
        router.back();
    };

    const goPrev = () => setPage((p) => Math.max(1, p - 1));
    const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

    const onSubmit = () => {
        // TODO: API 호출
        // 성공하면 close() 또는 /community/[newId]로 이동
        close();
    };

    const ModalShell = ({ children }: { children: React.ReactNode }) => {
        if (asPage) return <>{children}</>;

        return (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
                {children}
            </div>
        );
    };

    return (
        <ModalShell>
            <section
                className={cn(
                    "w-full max-w-[760px] overflow-hidden rounded-[28px] bg-white",
                    "shadow-[0_18px_60px_rgba(15,23,42,0.18)]"
                )}
            >
                {/* Top padding */}
                <div className="px-8 pt-10">
                    {/* Title row */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-[28px] font-extrabold tracking-[-0.02em] text-black/90">프롬프트 등록하기</h2>

                        <div className="flex items-center gap-3 text-[13px] text-black/50">
              <span>
                {page}/{totalPages} 페이지
              </span>

                            <button
                                type="button"
                                onClick={goPrev}
                                className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-black/70 hover:bg-black/[0.03]"
                                aria-label="이전"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={goNext}
                                className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-black/70 hover:bg-black/[0.03]"
                                aria-label="다음"
                            >
                                ›
                            </button>
                        </div>
                    </div>

                    {/* List */}
                    <div className="mt-6 space-y-3">
                        {SAMPLE.map((it) => {
                            const active = it.id === selectedId;
                            return (
                                <button
                                    key={it.id}
                                    type="button"
                                    onClick={() => setSelectedId(it.id)}
                                    className={cn(
                                        "w-full rounded-[18px] border px-5 py-4 text-left",
                                        "transition-colors",
                                        active
                                            ? "border-[#8B5CF6] bg-[rgba(139,92,246,0.06)]"
                                            : "border-black/10 bg-white hover:bg-black/[0.02]"
                                    )}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex min-w-0 items-center gap-4">
                                            <span className="shrink-0 text-[12px] font-semibold text-black/40">{it.date}</span>
                                            <span className="min-w-0 truncate text-[15px] font-bold text-black/85">{it.title}</span>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-2">
                                            <Pill tone={platformTone(it.platform) as any}>{it.platform}</Pill>
                                            <Pill tone={badgeTone(it.badge) as any}>{it.badge}</Pill>

                                            <span className="ml-1 grid h-9 w-9 place-items-center rounded-full hover:bg-black/[0.04]">
                        ⋮
                      </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Form */}
                    <div className="mt-7">
                        <label className="block text-[13px] font-semibold text-black/40">게시글 제목을 입력하세요</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={cn(
                                "mt-2 w-full rounded-[16px] border border-black/10 px-4 py-4",
                                "text-[14px] font-semibold text-black/80 outline-none",
                                "focus:border-[#8B5CF6] focus:ring-4 focus:ring-[rgba(139,92,246,0.12)]"
                            )}
                            placeholder="제목"
                        />

                        <label className="mt-5 block text-[13px] font-semibold text-black/40">게시글 내용을 입력하세요</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={cn(
                                "mt-2 h-[170px] w-full resize-none rounded-[20px] border border-black/10 px-4 py-4",
                                "text-[14px] text-black/70 outline-none",
                                "focus:border-[#8B5CF6] focus:ring-4 focus:ring-[rgba(139,92,246,0.12)]"
                            )}
                            placeholder="1000자 이내 작성"
                            maxLength={1000}
                        />
                    </div>
                </div>

                {/* Bottom actions */}
                <div className="mt-8 flex items-center justify-end gap-3 bg-white px-8 pb-8">
                    <button
                        type="button"
                        onClick={close}
                        className={cn(
                            "h-[44px] rounded-[14px] px-6 text-[14px] font-bold",
                            "bg-[#EEF0F5] text-black/40"
                        )}
                    >
                        취소
                    </button>

                    <button
                        type="button"
                        onClick={onSubmit}
                        className={cn(
                            "h-[44px] rounded-[14px] px-6 text-[14px] font-bold text-white",
                            "bg-gradient-to-r from-[#6D28D9] to-[#7C3AED]",
                            "shadow-[0_10px_24px_rgba(124,58,237,0.25)]"
                        )}
                    >
                        프롬프트 등록
                    </button>
                </div>
            </section>
        </ModalShell>
    );
}
