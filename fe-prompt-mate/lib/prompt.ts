// lib/api/prompt.ts

export async function createPrompt(formData: FormData) {
  const res = await fetch("/api/prompts", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("프롬프트 저장 실패");
  }

  return res.json();
}
