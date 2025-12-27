// lib/rewrite.ts
export async function rewritePrompt(input: string): Promise<string> {
  // API 흉내용 딜레이
  await new Promise((res) => setTimeout(res, 800));

  return `✨ 리라이팅된 프롬프트입니다.\n\n${input}\n\n→ 더 명확하고 구체적으로 개선되었습니다.`;
}
