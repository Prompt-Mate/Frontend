// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "./fonts/fonts";
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
          {children}
          {modal}
        </AuthProvider>
      </body>
    </html>
  );
}

// 이 레이아웃은 모든 페이지에 공통으로 적용되며, 인증 컨텍스트를 제공합니다.