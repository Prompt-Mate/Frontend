// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "./fonts/fonts";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

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
        <body className="flex">

        <Sidebar />

        <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1">
                {children}
            </main>
        </div>
        </body>

        </html>
    );
}
