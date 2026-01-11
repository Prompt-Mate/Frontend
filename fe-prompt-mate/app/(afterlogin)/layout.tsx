// app/(afterlogin)/layout.tsx
import Sidebar from "@/components/sidebar/Sidebar";

export default function AfterLoginLayout({
    children,
    modal
}: {
  children: React.ReactNode;
    modal: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-ui-background">
      <Sidebar />
      <main className="flex-1 min-h-0 overflow-y-auto">
          {children}
          {modal}
      </main>
    </div>
  );
}

// 이 레이아웃은 afterlogin 안의 모든 페이지에 공통으로 적용되며, 사이드바를 포함합니다.