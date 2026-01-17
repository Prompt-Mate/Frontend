import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/Sidebar";

export default function AfterLoginLayout({
    children,
    modal
}: {
  children: React.ReactNode;
    modal: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
            {children}
            {modal}
        </main>
      </div>
    </div>
  );
}

// 이 레이아웃은 afterlogin 안의 모든 페이지에 공통으로 적용되며, 사이드바를 포함합니다.