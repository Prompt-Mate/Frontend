// app/(afterlogin)/layout.tsx
import Sidebar from "@/components/sidebar/Sidebar";

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

// afterlogin 안의 모든 페이지는 사이드바를 공통으로 사용한다