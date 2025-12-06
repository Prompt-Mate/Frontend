// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
    title: "Prompt Mate",
    description: "FE Prompt Mate App",
};

const brandFont = localFont({
    src: [
        { path: "./fonts/Pretendard-Regular.woff2", weight: "400", style: "normal" },
        { path: "./fonts/Pretendard-Bold.woff2",    weight: "700", style: "normal" },
        { path: "./fonts/Pretendard-Black.woff2",   weight: "900", style: "normal" },
    ],
    variable: "--font-main",
    display: "swap",
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
        <body>{children}</body>
        </html>
    );
}
