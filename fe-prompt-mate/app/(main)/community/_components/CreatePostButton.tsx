import Link from "next/link";

export function CreatePostButton() {
    return (
        <Link
            href="/community/new"
            className="
        flex h-[55px] shrink-0 items-center justify-center gap-2
        rounded-[15px] bg-[#5527F5] px-6
        text-body font-semibold text-white
        shadow-[0_0_12px_rgba(255,255,255,0.80)_inset]
      hover:brightness-[1.03]
      active:brightness-[0.97]
      transition
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
