// 인터셉팅 라우트 - 실제 로그인 페이지를 렌더링하되 모달도 함께 표시
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import KakaoSignupButton from "@/components/auth/KakaoSignupButton";
import Link from "next/link";

export default function LoginInterceptPage() {
  // 실제 로그인 페이지 내용을 렌더링 (모달은 @modal 슬롯에서 표시됨)
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main */}
      <main className="flex flex-1 flex-col items-center justify-center gap-10">
        <div className="text-center">
          <h1 className="text-[30px] font-bold text-[#343434]">
            간편하게 로그인해서<br />프롬메이트를 이용해보세요.
          </h1>
          <p className="mt-3 text-[20px] text-[#919395]">
            더 나은 AI 창작물을 더 쉽게, 프롬메이트
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <KakaoLoginButton />
          <KakaoSignupButton />

          <Link
            href="/find-account"
            className="text-center text-[20px] text-[#919395]"
          >
            기존 계정 찾기
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-[102px] border-t border-[rgba(217,221,224,0.7)] flex items-center justify-between px-8 text-[20px] text-[#919395]">
        <span>© 2025 PromMate All rights reserved.</span>
        <div className="flex gap-6">
          <Link href="/terms">이용약관</Link>
          <Link href="/privacy">개인정보처리방침</Link>
        </div>
      </footer>
    </div>
  );
}

