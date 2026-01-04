"use client";

import UserIcon from "@/assets/icons/fluent_person-20-filled.svg"
import BellIcon from "@/assets/icons/bell.svg"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
    const router = useRouter();
    const { isAuth, user, logout } = useAuth();

    return (
        <header className="flex h-[56px] items-center justify-between px-8 border-b">
            <span className="text-[18px] font-bold">PromMate</span>

            <div className="flex items-center gap-4">
                <Link href="/settings" aria-label="세팅">
                    <BellIcon className="h-5 w-5" />
                </Link>

                <Link href="/mypage" aria-label="마이페이지">
                    <UserIcon className="h-5 w-5" />
                </Link>
            </div>
        </header>
    );
}
