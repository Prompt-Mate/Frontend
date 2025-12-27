import SidebarItem from "@/components/SidebarItem";
import HomeIcon from "@/assets/icons/solar_home-2-linear.svg";
import PromptIcon from "@/assets/icons/frame-62.svg";
import PromptCommunityIcon from "@/assets/icons/frame-64.svg";
import LibraryIcon from "@/assets/icons/frame-63.svg";
import HelpIcon from "@/assets/icons/hugeicons_help-circle.svg"
import SettingIcon from "@/assets/icons/lsicon_setting-outline.svg"


export default function Sidebar() {
    return (
        <aside className="w-[302px] min-h-screen bg-ui-surface px-4 py-6">
            <nav className="flex flex-col h-full">
                {/* 🔼 상단 메뉴 */}
                <div className="flex flex-col gap-2">
                    <SidebarItem href="/" icon={<HomeIcon />} label="홈" />
                    <SidebarItem href="/prompts" icon={<PromptIcon />} label="프롬프트 다듬기" />
                    <SidebarItem href="/community" icon={<PromptCommunityIcon />} label="프롬프트 커뮤니티" />
                    <SidebarItem href="/library" icon={<LibraryIcon />} label="라이브러리" />
                </div>

                {/* 🔽 하단 고정 영역 */}
                <div className="mt-auto">
                    {/* divider : 위/아래 간격 포함 */}
                    <div className="w-full h-[1.5px] bg-ui-textMuted/20 my-4" />

                    <div className="flex flex-col gap-2">
                        <SidebarItem href="/help" icon={<HelpIcon />} label="도움말" />
                        <SidebarItem href="/settings" icon={<SettingIcon />} label="환경설정" />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

// 같은 Sidebar가 expanded 상태값에 따라 width/표시를 바꾸는 것.