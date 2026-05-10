import PainCard from "./PainCard";

export default function Section2() {
  return (
    <section
      className="
        relative
        w-full
        bg-gradient-to-b
        from-[#F5F2FF]
        to-white
        py-[160px]
      "
    >
      <div className="mx-auto max-w-[1200px] text-center">
        {/* 타이틀 */}
        <h2
          className="
            text-[32px]
            font-bold
            leading-[110%]
            tracking-[0.32px]
            text-[#343434]
          "
        >
          AI 툴 사용하시면서, 이런 경험 있지 않으셨나요?
        </h2>

        {/* 설명 */}
        <p
          className="
            mt-4
            text-[18px]
            font-medium
            leading-[144%]
            tracking-[0.18px]
            text-[#919395]
          "
        >
          분명 내가 원하는 건 머릿속에 있는데, 아무리 프롬프트를 열심히 적어봐도
          <br />
          결과물이 마음에 들지 않던 순간이 한두 번이 아니죠.
          <br />
          대체 어느 부분이 문제인지도 몰라 자꾸 헤매게 됩니다.
        </p>

        {/* 카드 영역 */}
        <div
          className="
            mt-[80px]
            grid
            grid-cols-3
            gap-[80px]
            justify-items-center
          "
        >
          <PainCard
            text="GPT가 말을 너무 못 알아들어요… 분명히 똑같이 썼는데 결과가 매번 달라요."
          />
          <PainCard
            text="한 줄만 바꿨는데 분위기가 완전 이상해졌어요. 대체 기준이 뭘까요?"
          />
          <PainCard
            text="원하는 스타일이 안 나와서 프롬프트를 계속 바꿔봤는데 점점 뭐가 문제인지 모르겠어요."
          />
        </div>
      </div>
    </section>
  );
}