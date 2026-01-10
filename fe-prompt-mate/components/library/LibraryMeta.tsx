export function LibraryMeta({
                                totalCount,
                                page,
                                totalPages,
                                onPrev,
                                onNext,
                            }: {
    totalCount: number;
    page: number;
    totalPages: number;
    onPrev?: () => void;
    onNext?: () => void;
}) {
    return (
        <div className="mt-[14px] flex items-center">
            <div className="text-[14px] font-semibold text-black/60">
                전체 <span className="text-[#6D5EF6]">{totalCount}개</span>
            </div>

            <div className="ml-auto flex items-center gap-[10px] text-black/35">
        <span className="text-[13px]">
          {page}/{totalPages} 페이지
        </span>
                <button
                    type="button"
                    onClick={onPrev}
                    aria-label="이전"
                    className="grid h-[28px] w-[28px] place-items-center rounded-full hover:bg-black/5"
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    aria-label="다음"
                    className="grid h-[28px] w-[28px] place-items-center rounded-full hover:bg-black/5"
                >
                    ›
                </button>
            </div>
        </div>
    );
}
