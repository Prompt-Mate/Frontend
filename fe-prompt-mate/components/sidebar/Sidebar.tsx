"use client";

import { useState } from "react";
import SidebarItem from "@/components/sidebar/SidebarItem";

import HomeIcon from "@/assets/icons/solar_home-2-linear.svg";
import PromptIcon from "@/assets/icons/frame-62.svg";
import PromptCommunityIcon from "@/assets/icons/frame-64.svg";
import LibraryIcon from "@/assets/icons/frame-63.svg";
import HelpIcon from "@/assets/icons/hugeicons_help-circle.svg";
import SettingIcon from "@/assets/icons/lsicon_setting-outline.svg";
import CollapseIcon from "assets/icons/Vector.svg";

export default function Sidebar() {
    const [expanded, setExpanded] = useState(true);
    const collapsed = !expanded;

    return (
        <aside
            className={[
                "bg-ui-surface py-6 transition-[width,padding] duration-200",
                expanded ? "w-[302px] px-4" : "w-[88px] px-2",
            ].join(" ")}
        >
            <nav className="flex h-full flex-col">
                {/* ✅ 사이드바 크기 조절 버튼 (아이템과 같은 흐름) */}
                <div
                    className={[
                        "mb-2",
                        expanded ? "flex justify-end px-1" : "flex justify-center",
                    ].join(" ")}
                >
                    <button
                        type="button"
                        aria-label={expanded ? "사이드바 접기" : "사이드바 펼치기"}
                        onClick={() => setExpanded((v) => !v)}
                        className="grid h-10 w-10 place-items-center rounded-xl hover:bg-ui-itemHover transition-colors"
                    >
                        <CollapseIcon
                            className={[
                                "h-6 w-6 transition-transform",
                                expanded ? "" : "rotate-180",
                            ].join(" ")}
                        />
                    </button>
                </div>

                {/* 🔼 상단 메뉴 */}
                <div className="flex flex-col gap-2">
                    <SidebarItem href="/home" icon={<HomeIcon />} label="홈" collapsed={collapsed} />
                    <SidebarItem href="/prompts" icon={<PromptIcon />} label="프롬프트 다듬기" collapsed={collapsed} />
                    <SidebarItem href="/community" icon={<PromptCommunityIcon />} label="프롬프트 커뮤니티" collapsed={collapsed} />
                    <SidebarItem href="/library" icon={<LibraryIcon />} label="라이브러리" collapsed={collapsed} />
                </div>

                {/* 🔽 하단 고정 영역 */}
                <div className="mt-auto">
                    <div className="w-full h-[1.5px] bg-ui-textMuted/20 my-4" />

                    <div className="flex flex-col gap-2">
                        <SidebarItem href="/help" icon={<HelpIcon />} label="도움말" collapsed={collapsed} />
                        <SidebarItem href="/settings" icon={<SettingIcon />} label="환경설정" collapsed={collapsed} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}
