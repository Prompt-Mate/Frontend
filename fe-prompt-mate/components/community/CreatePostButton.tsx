import Link from "next/link";

export function CreatePostButton() {
    return (
        <Link
            href="/community/new"
            className="
        flex h-[55px] shrink-0 items-center justify-center gap-2
        rounded-[16px] bg-[#5527F5] px-6
        text-body font-semibold text-white
        shadow-sm
        hover:opacity-95 active:opacity-90
      "
        >
            <PlusIcon className="h-5 w-5" />
            프롬프트 등록
        </Link>
    );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
