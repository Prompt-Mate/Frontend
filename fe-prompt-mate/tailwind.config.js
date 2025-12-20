// 클래스 이름 매핑
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      extend: {
          fontFamily: {
              sans: ["var(--font-pretendard)", "system-ui", "sans-serif"],
          },
          fontSize: {
              pageTitle: ["34px", { lineHeight: "1.2" }],
              sectionTitle: ["24px", { lineHeight: "1.44" }],
              body: ["18px", { lineHeight: "1.2" }],
              chipText: ["16px", {lineHeight: "1.2"}]
          },
          colors: {
              ui: {
                  text: "#343434",
                  icon: "#919395",
                  textMuted: "#919395",
                  surface: "#FBFCFD",
                  surfaceSubtle: "#F1F5F9",
                  itemHover: "var(--gray-grey-4, #F1F5F9)",
                  card: "#F8FAFC",
              },
              chip: {
                  text: "#5527F5",
                  bg: "#D9E0FF",
              },
          },

      },
  },
  plugins: [],
}

//text-의 정체 (Tailwind 규칙)
//[어디에 적용할지] - [무엇을 쓸지] -> text-red-500 → 텍스트 색상 ,bg-blue-500 → 배경 색 ,border-gray-300 → 테두리 색
//var( CSS변수이름 , fallback값 ),
// css 텍스트 규칙 : line-height (%) ÷ 100 = line-height (숫자) + lineHeight 숫자만 사용은 font-size가 바뀌어도 비율을 유지하기 때문