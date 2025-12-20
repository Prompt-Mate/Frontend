// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "./fonts/fonts";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
    title: "Prompt Mate",
    description: "FE Prompt Mate App",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" className={pretendard.variable}>
        <body className="flex font-sans">
        <Sidebar />

        <main className="flex-1">
            {children}
        </main>
        </body>
        </html>
    );
}
