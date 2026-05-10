"use client";

type ActionMenuProps = {
    onEdit?: () => void;
    onDelete?: () => void;
};

export default function ActionMenu({
                                       onEdit,
                                       onDelete,
                                   }: ActionMenuProps) {
    return (
        <div
            className="
        flex w-[200px] h-[106px]
        flex-col items-start
        rounded-[12px]
        bg-white
        py-[8px]
        shadow-[0px_8px_24px_rgba(0,0,0,0.08)]
      "
        >
            <button
                onClick={onEdit}
                className="
          h-[45px] w-full
          px-4
          text-left text-[14px] font-medium text-black/80
          hover:bg-black/5
        "
            >
                수정하기
            </button>

            <button
                onClick={onDelete}
                className="
          h-[45px] w-full
          px-4
          text-left text-[14px] font-medium
          text-red-500
          hover:bg-black/5
        "
            >
                삭제하기
            </button>
        </div>
    );
}
