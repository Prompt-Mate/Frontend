"use client";

import UserIcon from "@/assets/icons/UserIcon.svg"
import AlarmIcon from "@/assets/icons/Alarm.svg"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

import PromMateIcon from "@/assets/icons/PromMate.svg";


export default function Header() {
    const router = useRouter();
    const { isAuth, user, logout } = useAuth();

    return (
<header className="flex h-[85px] items-center justify-between px-8 border-b">
  {/* 왼쪽 로고 */}
  <div className="flex items-center gap-2">
    <PromMateIcon className="h-[65px] w-[65px]" />
    <span className="text-[27px] font-semibold">PromMate</span>
  </div>

  {/* 오른쪽 아이콘 */}
  <div className="flex items-center gap-4">
    <Link href="/settings" aria-label="알림">
      <AlarmIcon className="h-8 w-8" />
    </Link>

    <Link href="/mypage" aria-label="마이페이지">
      <UserIcon className="h-6 w-8" />
    </Link>
  </div>
</header>

    );
}
