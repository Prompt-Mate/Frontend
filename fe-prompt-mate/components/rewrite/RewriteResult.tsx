"use client";

interface Props {
  result: string;
  loading: boolean;
}

export default function RewriteResult({ result, loading }: Props) {
  return (
    <div className="h-full rounded-[30px] border bg-[#F8FAFC] p-6">
      <h2 className="mb-3 text-sm font-semibold">리라이팅 결과</h2>

      {loading && (
        <p className="text-sm text-gray-400">리라이팅 중입니다...</p>
      )}

      {!loading && !result && (
        <p className="text-sm text-gray-400">아직 결과가 없습니다.</p>
      )}

      {!loading && result && (
        <div className="whitespace-pre-line text-sm leading-relaxed text-gray-800">
        

          {"\n\n"}
          {result}

        
        </div>
      )}
    </div>
  );
}
