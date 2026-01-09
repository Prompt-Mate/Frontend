// app/(beforelogin)/layout.tsx
import Header from "@/components/Header";

export default function BeforeLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

// 이 레이아웃은 beforelogin 안의 모든 페이지에 공통으로 적용, 헤더 포함
