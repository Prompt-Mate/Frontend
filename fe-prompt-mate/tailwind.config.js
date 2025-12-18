// 클래스 이름 매핑
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      extend: {
          colors: {
              ui: {
                  icon: "#919395",
                  textMuted: "#919395",
                  surface: "#FBFCFD",
                  surfaceSubtle: "#F1F5F9",
                  itemHover: "var(--gray-grey-4, #F1F5F9)",
              },
          },
      },
  },
  plugins: [],
}

//text-의 정체 (Tailwind 규칙)
//[어디에 적용할지] - [무엇을 쓸지] -> text-red-500 → 텍스트 색상 ,bg-blue-500 → 배경 색 ,border-gray-300 → 테두리 색
//var( CSS변수이름 , fallback값 ),