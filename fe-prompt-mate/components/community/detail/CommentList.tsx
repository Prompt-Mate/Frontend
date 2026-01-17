type UiComment = {
    id: string;
    author: { nickname: string };
    createdAt: string; // "2025.11.16"
    content: string;
    isReply?: boolean;
    mentionNickname?: string;
};

const comments: UiComment[] = [
    {
        id: "1",
        author: { nickname: "aaaas_00" },
        createdAt: "2025.11.16",
        content: "대단해요~",
    },
    {
        id: "2",
        author: { nickname: "asdasdadwas" },
        createdAt: "2025.11.15",
        content: "대단해요~",
        isReply: true,
        mentionNickname: "aaaas_00",
    },
];


export default function CommentList({ items = comments }: { items?: UiComment[] }) {
    return (
        <div className="space-y-8">
            {items.map((c) => (
                <CommentRow key={c.id} item={c} />
            ))}
        </div>
    );
}

function CommentRow({ item }: { item: UiComment }) {
    const isReply = !!item.isReply;

    return (
        <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                <span className="text-[12px] text-[#6366F1]">+</span>
            </div>

            {/* Body */}
            <div className="min-w-0 flex-1">
                {/* Meta row (닉네임 / 날짜 / 답글) */}
                <div className="flex items-center gap-6">
          <span className="text-[14px] font-semibold text-black/85">
            {item.author.nickname}
          </span>

                    <span className="text-[13px] text-black/35">{item.createdAt}</span>

                    <button
                        type="button"
                        className="text-[13px] text-black/35 hover:text-black/60"
                    >
                        답글
                    </button>
                </div>

                {/* Content */}
                <div className={["mt-3 text-[14px] text-black/80", isReply ? "pl-0" : ""].join(" ")}>
                    {/* 대댓글이면 멘션 */}
                    {item.mentionNickname ? (
                        <>
              <span className="font-semibold text-[#4F46E5]">
                @{item.mentionNickname}
              </span>{" "}
                        </>
                    ) : null}

                    <span className={isReply ? "" : "font-semibold"}>{item.content}</span>
                </div>
            </div>
        </div>
    );
}
