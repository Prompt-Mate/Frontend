"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemPropsTypes {
    href: string;
    icon: React.ReactNode;
    label: string;
    exact?: boolean; // true면 정확히 일치할 때만 active
}

export default function SidebarItem({
                                        href,
                                        icon,
                                        label,
                                         exact = true,
                                    }: SidebarItemPropsTypes) {
    const pathname = usePathname();

    const isActive = exact
        ? pathname === href
        : pathname === href || pathname.startsWith(href + "/");

    return (
        <Link href={href} className="block w-full">
            <div
                className={[
                    "flex items-center gap-3 h-[57px] px-6 rounded-[10px]",
                    "transition-colors",
                     isActive ? "bg-[#F1F5F9]" : "bg-transparent",
                ].join(" ")}
            >
                <span className="w-5 h-5 shrink-0 text-ui-icon flex items-center justify-center">
          {icon}
        </span>

                <span className="min-w-0 flex-1 text-[18px] text-ui-textMuted truncate">
          {label}
        </span>
            </div>
        </Link>
    );
}

// collapsed(= !expanded) 값을 props로 받아 라벨을 보여줄지 말지만 결정해.