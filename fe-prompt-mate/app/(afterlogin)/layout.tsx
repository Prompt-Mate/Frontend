import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/Sidebar";

export default function AfterLoginLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1 min-h-0">
        <Sidebar />

        {/* 
          기존 그대로:
          - 사이드바 ↔ 페이지 간격: 0px
          - Header / Sidebar 폭 전부 유지
        */}
        <main className="flex-1 overflow-y-auto pt-8">
          {children}
          {modal}
        </main>
      </div>
    </div>
  );
}
