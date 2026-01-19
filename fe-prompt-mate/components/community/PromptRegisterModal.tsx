// components/community/PromptRegisterModal.tsx
"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import TagChip from "@/components/common/TagChip";
import { convertPlatformFromEnum, convertCategoryFromEnum, getCategoryVariant } from "@/components/prompts/constants";
import { getMyLibraries, type MyLibraryItem } from "@/services/library";
import { createCommunityPost } from "@/services/community";

/**
 * 날짜를 "YY.MM.DD" 형식으로 변환
 */
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
}

function cn(...xs: Array<string | false | undefined | null>) {
    return xs.filter(Boolean).join(" ");
}


export default function PromptRegisterModal({ asPage = false }: { asPage?: boolean }) {
    const router = useRouter();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    // API에서 받아온 라이브러리 아이템들
    const [libraryItems, setLibraryItems] = useState<MyLibraryItem[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const previousSelectedIdRef = useRef<number | null>(null);

    // API 호출하여 라이브러리 목록 가져오기
    useEffect(() => {
        const fetchLibraries = async () => {
            try {
                setLoading(true);
                // 현재 페이지는 1-based이지만 API는 0-based이므로 page - 1
                const response = await getMyLibraries({ page: page - 1, size: 3 });
                setLibraryItems(response.content);
                setTotalPages(response.totalPages || 1);

                // 페이지가 변경될 때마다 첫 번째 아이템 선택
                if (response.content.length > 0) {
                    setSelectedId(response.content[0].id);
                } else {
                    setSelectedId(null);
                }
            } catch (error) {
                console.error("라이브러리 목록 조회 실패:", error);
                setLibraryItems([]);
                setSelectedId(null);
            } finally {
                setLoading(false);
            }
        };

        fetchLibraries();
    }, [page]); // page 변경 시 재조회

    // 선택된 아이템이 변경될 때만 제목 자동 세팅 (selectedId 변경 시에만)
    useEffect(() => {
        if (selectedId !== previousSelectedIdRef.current) {
            if (selectedId && libraryItems.length > 0) {
                const selectedItem = libraryItems.find((x) => x.id === selectedId);
                if (selectedItem) {
                    setTitle(selectedItem.savedTitle);
                }
            }
            previousSelectedIdRef.current = selectedId;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId]); // selectedId만 의존성으로 사용 (libraryItems는 API 호출 시에만 변경됨)

    const close = () => {
        // 모달로 열린 경우 router.back()이 자연스럽고
        // 풀페이지(asPage=true)인 경우도 뒤로가기면 무난
        router.back();
    };

    const goPrev = () => setPage((p) => Math.max(1, p - 1));
    const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

    // onChange 핸들러를 useCallback으로 메모이제이션 (리렌더링 방지)
    const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }, []);

    // libraryItems 리스트를 useMemo로 메모이제이션 (content 변경 시 재생성 방지)
    const libraryListContent = useMemo(() => {
        if (loading) {
            return (
                <div className="flex items-center justify-center py-8">
                    <p className="text-[14px] text-black/50">로딩 중...</p>
                </div>
            );
        }
        if (libraryItems.length === 0) {
            return (
                <div className="flex items-center justify-center py-8">
                    <p className="text-[14px] text-black/50">라이브러리가 비어있습니다.</p>
                </div>
            );
        }
        return libraryItems.map((it) => {
            const active = it.id === selectedId;
            const platformLabel = convertPlatformFromEnum(it.platform);
            const categoryLabel = convertCategoryFromEnum(it.category);
            const categoryVariant = getCategoryVariant(it.category);

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
                            <span className="shrink-0 text-[12px] font-semibold text-black/40">
                                {formatDate(it.createdAt)}
                            </span>
                            <span className="min-w-0 truncate text-[15px] font-bold text-black/85">
                                {it.savedTitle}
                            </span>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <TagChip variant="platform" label={platformLabel} />
                            <TagChip variant={categoryVariant} label={categoryLabel} />

                            <span className="ml-1 grid h-9 w-9 place-items-center rounded-full hover:bg-black/[0.04]">
                                ⋮
                            </span>
                        </div>
                    </div>
                </button>
            );
        });
    }, [loading, libraryItems, selectedId]);

    const onSubmit = async () => {
        // 유효성 검사
        if (!selectedId || libraryItems.length === 0) {
            setError("라이브러리 항목을 선택해주세요.");
            return;
        }
        
        const selectedItem = libraryItems.find((x) => x.id === selectedId);
        if (!selectedItem) {
            setError("라이브러리 항목을 선택해주세요.");
            return;
        }
        
        if (!title.trim()) {
            setError("게시글 제목을 입력해주세요.");
            return;
        }
        if (!content.trim()) {
            setError("게시글 내용을 입력해주세요.");
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            const response = await createCommunityPost({
                rewriteResultId: selectedItem.rewriteResultId,
                title: title.trim(),
                description: content.trim(),
                visibility: "PUBLIC",
            });

            // 성공 시 모달 닫기 (또는 필요시 /community/[newId]로 이동)
            close();
        } catch (error) {
            console.error("게시글 등록 실패:", error);
            setError("게시글 등록 중 오류가 발생했습니다.");
        } finally {
            setSubmitting(false);
        }
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
                    "flex h-[608px] w-full max-w-[738px] flex-col overflow-hidden rounded-[28px] bg-white",
                    "shadow-[0_18px_60px_rgba(15,23,42,0.18)]",
                    asPage && "h-full" // 페이지로 쓰일 때 부모 높이를 따라가거나, 위에서 고정한 h-[608px] 사용
                )}
            >
                {/* Top padding */}
                <div className="flex-1 overflow-y-auto px-8 pt-10 scrollbar-hide">
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
                                disabled={page <= 1 || loading}
                                className={cn(
                                    "grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-black/70",
                                    "hover:bg-black/[0.03] transition-colors",
                                    (page <= 1 || loading) && "opacity-50 cursor-not-allowed"
                                )}
                                aria-label="이전"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={goNext}
                                disabled={page >= totalPages || loading}
                                className={cn(
                                    "grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-black/70",
                                    "hover:bg-black/[0.03] transition-colors",
                                    (page >= totalPages || loading) && "opacity-50 cursor-not-allowed"
                                )}
                                aria-label="다음"
                            >
                                ›
                            </button>
                        </div>
                    </div>

                    {/* List - useMemo로 메모이제이션하여 content 변경 시 재생성 방지 */}
                    <div className="mt-6 space-y-3">
                        {libraryListContent}
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
                            onChange={handleContentChange}
                            className={cn(
                                "mt-2 h-[170px] w-full resize-none rounded-[20px] border border-black/10 px-4 py-4",
                                "text-[14px] text-black/70 outline-none",
                                "focus:border-[#8B5CF6] focus:ring-2 focus:ring-[rgba(139,92,246,0.12)] focus:ring-offset-0"
                            )}
                            placeholder="1000자 이내 작성"
                            maxLength={1000}
                        />
                        <div className="h-[20px] mt-2">
                            {error && (
                                <p className="text-[13px] text-red-500">{error}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom actions */}
                <div className="flex shrink-0 items-center justify-end gap-3 bg-white px-8 pb-8 pt-6">
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
                        disabled={submitting}
                        className={cn(
                            "h-[44px] rounded-[14px] px-6 text-[14px] font-bold text-white",
                            "bg-gradient-to-r from-[#6D28D9] to-[#7C3AED]",
                            "shadow-[0_10px_24px_rgba(124,58,237,0.25)]",
                            "transition-opacity",
                            submitting && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {submitting ? "등록 중..." : "프롬프트 등록"}
                    </button>
                </div>
            </section>
        </ModalShell>
    );
}
