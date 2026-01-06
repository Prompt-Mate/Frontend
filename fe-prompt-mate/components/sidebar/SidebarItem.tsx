"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemPropsTypes {
    href: string;
    icon: React.ReactNode;
    label: string;
    exact?: boolean; // 접힘 상태면 true, 펄쳐지면 false
    collapsed?: boolean
}

export default function SidebarItem({
                                        href,
                                        icon,
                                        label,
                                        exact = true,
                                        collapsed = false,
                                    }: SidebarItemPropsTypes) {
    const pathname = usePathname();

    const isActive = exact
        ? pathname === href
        : pathname === href || pathname.startsWith(href + "/");

    return (
        <Link href={href} className="block w-full">
            <div
                className={[
                    // 높이는 동일하게 유지 (클릭 영역/정렬 안정)
                    "h-[57px] rounded-[10px] transition-colors",
                    // 기본은 아이콘+라벨 row
                    "transition-colors",
                    "flex items-center",
                    // collapsed면 “아이콘만” 중앙 정렬 + 좌우 패딩 축소 + gap 제거
                    collapsed ? "justify-center px-0" : "gap-3 px-6",
                     isActive ? "bg-[#F1F5F9]" : "bg-transparent",
                ].join(" ")}
            >
                {/* 아이콘은 항상 같은 크기/정렬 */}
                <span className="w-7 h-7 shrink-0 text-ui-icon flex items-center justify-center [&>svg]:block [&>svg]:w-full [&>svg]:h-full">
                  {icon}
                </span>

                {/* 라벨은 collapsed면 렌더링 자체를 안 함 */}
                {!collapsed && (
                    <span className="min-w-0 flex-1 text-[18px] text-ui-textMuted truncate">
                    {label}
                  </span>)
                }
            </div>
        </Link>
    );
}

// collapsed(= !expanded) 값을 props로 받아 라벨을 보여줄지 말지만 결정해.