"use client";

import { useRouter } from "next/navigation";
import KakaoIcon from "@/assets/icons/kakao.svg";

export default function LoginModal() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    // 프론트엔드 라우트로 이동
    // /login/oauth2/kakao 페이지에서 카카오 인증 URL 생성 후 리다이렉트
    router.push("/login/oauth2/kakao");
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <>
      {/* 블러 처리된 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      {/* 모달 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="
            relative
            w-full max-w-[522px]
            bg-white
            rounded-[12px]
            shadow-lg
            p-[30px]
            border border-[rgba(217,221,224,0.7)]
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* 모달 내용 */}
          <div className="flex flex-col items-center gap-6">
            {/* 제목 */}
            <h2 className="text-[24px] font-bold text-[#343434] text-center">
              회원이 아니신가요?
            </h2>

            {/* 본문 */}
            <p className="text-[16px] text-[#919395] text-center leading-relaxed">
              카카오톡으로 간편하게 가입하고<br />
              리라이팅 서비스를 이용해보세요.
            </p>

            {/* 일러스트레이션 영역 (점선 별 모양) */}
            <div className="w-full h-[100px] flex items-center justify-center">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-30"
              >
                <path
                  d="M40 10 L45 30 L65 30 L48 42 L53 62 L40 50 L27 62 L32 42 L15 30 L35 30 Z"
                  stroke="#919395"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
              </svg>
            </div>

            {/* 카카오 로그인 버튼 */}
            <button
              onClick={handleKakaoLogin}
              className="
                w-full h-[70px]
                rounded-[12px]
                bg-[#FEE500]
                flex items-center justify-center gap-[12px]
                text-[20px] font-semibold text-black
                hover:brightness-95
                active:translate-y-[1px]
                transition-all
              "
            >
              <KakaoIcon className="w-9 h-9" />
              카카오로 시작하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

