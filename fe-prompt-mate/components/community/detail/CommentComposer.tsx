export default function CommentComposer() {
    return (
        <div
            className="
        relative
        w-full
        rounded-[20px]
        border-[1.5px] border-[#D9DDE0]
        bg-[#FEFEFE]
      "
        >
            {/* 프로필 + 닉네임 */}
            <div
                className="
          absolute
          left-[42px]
          top-[32px]
          flex
          items-center
          gap-2
        "
            >
                {/* 프로필 아이콘 */}
                <div className="h-8 w-8 rounded-full bg-[#E5E7EB]" />

                {/* 닉네임 */}
                <span className="text-[14px] font-semibold text-black">
          aaaas_00
        </span>
            </div>

            {/* textarea */}
            <textarea
                placeholder="댓글을 입력해보세요."
                className="
          mt-[79px]            /* 32 + 프로필 높이(32) + 간격 15 */
          ml-[42px]
          mr-[42px]
          min-h-[80px]
          w-[calc(100%-84px)]
          resize-none
          bg-transparent
          text-[14px]
          outline-none
          placeholder:text-[#B5B8BB]
        "
            />

            {/* 하단 영역 */}
            <div
                className="
          flex
          items-center
          justify-end
          gap-4
          px-[42px]
          pb-[24px]
        "
            >
                {/* 글자 수 */}
                <span className="text-[12px] text-[#9CA3AF]">
          0/1000
        </span>

                {/* 등록 버튼 */}
                <button
                    className="
            rounded-[12px]
            bg-[#E9E5FF]
            px-5
            py-2
            text-[14px]
            font-semibold
            text-[#7C5CFF]
            hover:opacity-90
          "
                >
                    등록하기
                </button>
            </div>
        </div>
    );
}
