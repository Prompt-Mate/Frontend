import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/Sidebar";

export default function AfterLoginLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}