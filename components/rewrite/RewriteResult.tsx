// components/rewrite/RewriteResult.tsx
"use client";

interface Props {
  result: string;
  loading: boolean;
}

export default function RewriteResult({ result, loading }: Props) {
  return (
    <div className="flex flex-col min-h-[481px] rounded-[30px] bg-[radial-gradient(...)] p-8">
  {/* 헤더 */}
  <div className="flex items-center h-[32px]">
    <h2 className="text-[24px] font-bold text-ui-text">
      리라이팅 결과
    </h2>
  </div>

      <div className="mt-6 flex-1 whitespace-pre-line text-ui-text">
        {loading && "리라이팅 중입니다..."}
        {!loading && !result && "아직 결과가 없습니다."}
        {!loading && result}
      </div>
    </div>
  );
}
