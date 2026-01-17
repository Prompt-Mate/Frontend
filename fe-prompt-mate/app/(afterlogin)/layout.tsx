import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/Sidebar";

export default function AfterLoginLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 전역 헤더 */}
      <Header />
      {/* 사이드바 + 페이지 영역 */}
      <div className="flex flex-1 min-h-0">
        <Sidebar />

        {/* 페이지 콘텐츠 */}
        <main className="flex-1 overflow-y-auto pt-10">
          {children}
        </main>
      </div>
    </div>
  );
}