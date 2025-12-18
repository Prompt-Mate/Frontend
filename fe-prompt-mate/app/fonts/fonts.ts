
import localFont from "next/font/local";

export const pretendard = localFont({
    src: [
        { path: "../fonts/Pretendard-Thin.woff2", weight: "100", style: "normal" },
        { path: "../fonts/Pretendard-ExtraLight.woff2", weight: "200", style: "normal" },
        { path: "../fonts/Pretendard-Light.woff2", weight: "300", style: "normal" },
        { path: "../fonts/Pretendard-Regular.woff2", weight: "400", style: "normal" },
        { path: "../fonts/Pretendard-Medium.woff2", weight: "500", style: "normal" },
        { path: "../fonts/Pretendard-SemiBold.woff2", weight: "600", style: "normal" },
        { path: "../fonts/Pretendard-Bold.woff2", weight: "700", style: "normal" },
        { path: "../fonts/Pretendard-ExtraBold.woff2", weight: "800", style: "normal" },
        { path: "../fonts/Pretendard-Black.woff2", weight: "900", style: "normal" },
    ],
    variable: "--font-pretendard",
    display: "swap",
});

/*
*   Tailwind 클래스	의미	실제 CSS
    font-thin	얇음	font-weight: 100
    font-normal	기본	font-weight: 400
    font-medium	중간	font-weight: 500
    font-semibold	조금 굵음	font-weight: 600
    font-bold	굵음	font-weight: 700
    font-black	매우 굵음	font-weight: 900
*/