// components/prompts/SavePromptModal.tsx
"use client";

import { useEffect, useState } from "react";
import PlatformSelect from "./PlatformSelect";
import CategorySelect from "./CategorySelect";
import { createPrompt } from "@/lib/prompt";

export default function SavePromptModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ESC로 닫기(원하면 유지, 싫으면 삭제해도 됨)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSubmit = async () => {
    setError(null);

    if (!title.trim()) return setError("프롬프트 이름을 입력해주세요.");
    if (!platform) return setError("플랫폼을 선택해주세요.");
    if (!category) return setError("카테고리를 선택해주세요.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("platform", platform);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await createPrompt(formData);
      onClose(); // 저장 후 닫기
    } catch {
      setError("저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* modal */}
      <div
        className="
          relative
          h-[608px] w-[738px]
          rounded-[20px]
          bg-white
          px-[30px] py-[30px]
          shadow-[0_10px_40px_rgba(0,0,0,0.12)]
        "
        onClick={(e) => e.stopPropagation()} // ✅ 안쪽 클릭은 닫히지 않게
      >
        <h2 className="text-[28px] font-bold text-black">저장하기</h2>

        {/* 입력 섹션 */}
        <div className="mt-[26px] grid grid-cols-2 gap-x-[24px] gap-y-[18px]">
          {/* 프롬프트명 */}
          <div className="flex flex-col gap-[10px]">
            <p className="text-[16px] font-medium text-black/40">
              저장할 프롬프트 이름을 입력하세요
            </p>
            <input
              placeholder="새 프롬프트"
              className="
                w-[330px]
                h-[55px]
                rounded-[12px]
                border border-black/10
                px-[16px]
                text-[16px]
                outline-none
                focus:border-black/20
              "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 이미지 업로드 */}
          <div className="flex flex-col gap-[10px]">
            <p className="text-[16px] font-medium text-black/40">
              이미지 업로드
            </p>

            {/* label을 버튼처럼 */}
            <label
              className="
                w-[143px]
                h-[55px]
                cursor-pointer
                rounded-[12px]
                border border-black/10
                px-[16px]
                text-[16px]
                flex items-center justify-center
                gap-[8px]
                text-black/70
                hover:bg-black/[0.02]
              "
            >
              파일 선택
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              />
            </label>

            {/* 선택한 파일명(원하면 표시) */}
            {image?.name ? (
              <p className="text-[12px] text-black/35 truncate">{image.name}</p>
            ) : null}
          </div>

          {/* 태그 */}
          <div className="col-span-2 mt-[6px]">
            <p className="mb-[10px] text-[14px] font-medium text-black/40">
              태그를 선택하세요
            </p>

            <div className="grid grid-cols-2 gap-x-[24px]">
              <PlatformSelect value={platform} onChange={setPlatform} />
              <CategorySelect value={category} onChange={setCategory} />
            </div>
          </div>
        </div>

        {/* 에러 */}
        {error ? (
          <p className="mt-[14px] text-[13px] text-red-500">{error}</p>
        ) : (
          <div className="mt-[14px]" />
        )}

        {/* 버튼: 취소 제거 / 우하단 고정 */}
        <div className="mt-[40px] flex justify-end gap-[35px]">
  {/* 취소 */}
  <button
    type="button"
    onClick={onClose}
    className="
      flex items-center justify-center
      w-[200px] h-[55px]
      rounded-[12px]
      bg-[#EEF2F7]
      text-[#9AA3AE]
      text-[18px] font-normal
      shadow-[0_0_12px_rgba(255,255,255,0.80)_inset]
      hover:brightness-[1.02]
      active:brightness-[0.98]
      transition
    "
  >
    취소
  </button>

  {/* 프롬프트 등록 */}
  <button
    type="button"
    onClick={handleSubmit}
    disabled={loading}
    className="
      flex items-center justify-center
      w-[183px] h-[55px]
      rounded-[15px]
      bg-[#5527F5]
      text-white text-[18px] font-normal
      shadow-[0_0_12px_rgba(255,255,255,0.80)_inset]
      hover:brightness-[1.03]
      active:brightness-[0.97]
      transition
      disabled:opacity-60
    "
  >
    {loading ? "저장 중..." : "프롬프트 등록"}
  </button>
</div>
      </div>
    </div>
  );
}