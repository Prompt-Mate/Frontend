// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "./fonts/fonts";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
    title: "Prompt Mate",
    description: "FE Prompt Mate App",
};

export default function RootLayout({
                                       children,
                                       modal,
                                   }: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <html lang="ko" className={pretendard.variable}>
        <body className="min-h-screen">
        <AuthProvider>
            {/* 1) 전체를 세로로 쌓기 */}
            <div className="flex min-h-screen flex-col">
                {/* 헤더는 위 */}
                <Header />

                {/* 2) 헤더 아래 영역: 가로로 Sidebar | Main */}
                <div className="flex flex-1 min-h-0">
                    <Sidebar />

                    <main className="flex-1 min-h-0 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
            {modal}
        </AuthProvider>
        </body>

        </html>
    );
}
