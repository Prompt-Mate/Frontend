// app/signup/page.tsx
"use client";

import Image from "next/image";
import KakaoIcon from "@/assets/icons/kakao.svg";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
      {/* 전체 컨테이너 */}
      <div className="flex w-[1440px] h-[820px] bg-white rounded-2xl overflow-visible">
        
       {/* 왼쪽 */}
      <section className="w-1/2 flex items-center justify-center">

       {/* 가운데 정렬용 래퍼 */}
        <div className="w-[394px]">
    
       <h1 className="text-[32px] font-bold text-[#343434] mb-4 text-left">
       회원가입
       </h1>

       {/* 설명 */}
      <p className="text-[20px] text-[#919395] leading-[144%] text-left mb-14">
      카카오로 간편하게 가입하고<br />
      리라이팅 서비스를 이용해보세요.
       </p>

      {/* 카카오 회원가입 버튼 */}
      <button
      onClick={() => {
        window.location.href = "/login/kakao";
      }}
      className="
        flex h-[70px] w-full items-center justify-center gap-4
        rounded-[12px]
        bg-[#FEE500]
        text-[20px] font-semibold text-black
      "
    >
      <span className="flex h-9 w-9 items-center justify-center shrink-0">
        <KakaoIcon className="h-9 w-9" />
      </span>
      <span>카카오로 시작하기</span>
      </button>

      {/* 기존 계정 찾기 (가운데 정렬) */}
      <div className="mt-6 flex justify-center">
      <button className="text-[20px] text-[#919395] hover:underline">
        기존 계정 찾기
      </button>
      </div>

      </div>
     </section>

        {/* 오른쪽 영역 */}
        <section className="w-1/2 bg-[#F1F3F9] flex flex-col justify-between p-[110px]">
          {/* 텍스트 영역 */}
          <div>
            <p className="text-[22px] font-bold text-[#5527F5] mb-4">
              프롬프트 리라이팅
            </p>

            <h2 className="text-[29px] font-bold text-[#343434] leading-[144%]">
              내가 쓴 프롬프트를 업로드하고<br />
              AI가 재작성해주는 프롬프트를 확인해보세요
            </h2>
          </div>

          {/* 이미지 영역 */}
          <div className="flex items-center justify-center w-full">
            <Image
              src="/images/signup-visual.png"
              alt="signup visual"
              width={640}
              height={480}
              className="w-full max-w-[520px] h-auto"
              priority
            />
          </div>
        </section>

      </div>
    </main>
  );
}