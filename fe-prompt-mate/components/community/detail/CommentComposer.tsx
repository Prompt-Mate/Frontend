"use client";

import { useState, useEffect } from "react";
import { createComment } from "@/services/community";

interface Props {
    postId: number | string;
    username: string;
    parentId?: number | string | null; // 대댓글인 경우 부모 댓글 ID
    mentionNickname?: string; // 멘션할 닉네임 (답글 작성 시)
    onCommentAdded?: () => void; // 댓글 추가 후 콜백 (댓글 목록 새로고침용)
    onCancel?: () => void; // 취소 버튼 클릭 시 콜백 (대댓글 작성 취소용)
    showCancelButton?: boolean; // 취소 버튼 표시 여부
}

export default function CommentComposer({ 
    postId, 
    username,
    parentId = null,
    mentionNickname,
    onCommentAdded,
    onCancel,
    showCancelButton = false,
}: Props) {
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const maxLength = 1000;
    const characterCount = content.length;

    // 답글 모드일 때 초기값 설정
    useEffect(() => {
        if (parentId && mentionNickname && !content) {
            setContent(`@${mentionNickname} `);
        }
    }, [parentId, mentionNickname]);

    const handleSubmit = async () => {
        // 유효성 검사
        if (!content.trim()) {
            setError("댓글 내용을 입력해주세요.");
            return;
        }

        if (content.length > maxLength) {
            setError(`댓글은 ${maxLength}자 이하여야 합니다.`);
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            // API 요청 시 content에서 @mentionNickname 부분 제거
            let requestContent = content.trim();
            if (mentionNickname && requestContent.startsWith(`@${mentionNickname} `)) {
                requestContent = requestContent.slice(`@${mentionNickname} `.length);
            }

            await createComment(postId, {
                parentId: parentId ? Number(parentId) : null,
                content: requestContent,
            });

            // 성공 시 입력 필드 초기화 및 콜백 호출
            setContent("");
            onCommentAdded?.();
            if (parentId) {
                onCancel?.(); // 대댓글 작성 완료 시 닫기
            }
        } catch (error) {
            console.error("댓글 등록 실패:", error);
            setError("댓글 등록 중 오류가 발생했습니다.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="
        relative
        w-full
        rounded-[20px]
        border-[1.5px] border-[#D9DDE0]
        bg-[#FEFEFE]
      "
        >
            {/* 프로필 + 닉네임 */}
            <div
                className="
          absolute
          left-[42px]
          top-[32px]
          flex
          items-center
          gap-2
        "
            >
                {/* 프로필 아이콘 */}
                <div className="h-8 w-8 rounded-full bg-[#E5E7EB]" />

                {/* 닉네임 */}
                <span className="text-[14px] font-semibold text-black">
                {username}
        </span>
            </div>

            {/* textarea */}
            <textarea
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                    setError(null); // 입력 시 에러 메시지 제거
                }}
                placeholder={parentId && mentionNickname ? "" : "댓글을 입력해보세요."}
                maxLength={maxLength}
                className="
          mt-[79px]            /* 32 + 프로필 높이(32) + 간격 15 */
          ml-[42px]
          mr-[42px]
          min-h-[80px]
          w-[calc(100%-84px)]
          resize-none
          bg-transparent
          text-[14px]
          outline-none
          placeholder:text-[#B5B8BB]
        "
            />

            {/* 에러 메시지 */}
            {error && (
                <div className="ml-[42px] mt-2 text-[12px] text-red-500">
                    {error}
                </div>
            )}

            {/* 하단 영역 */}
            <div
                className="
          flex
          items-center
          justify-end
          gap-4
          px-[42px]
          pb-[24px]
        "
            >
                {/* 글자 수 */}
                <span className="text-[12px] text-[#9CA3AF]">
          {characterCount}/{maxLength}
        </span>

                {/* 취소 버튼 (대댓글 작성 시) */}
                {(showCancelButton || parentId) && (
                    <button
                        onClick={onCancel}
                        disabled={submitting}
                        className="
                rounded-[12px]
                bg-[#F3F4F6]
                px-5
                py-2
                text-[14px]
                font-semibold
                text-[#6B7280]
                hover:opacity-90
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
                    >
                        취소
                    </button>
                )}

                {/* 등록 버튼 */}
                <button
                    onClick={handleSubmit}
                    disabled={submitting || !content.trim()}
                    className="
            rounded-[12px]
            bg-[#E9E5FF]
            px-5
            py-2
            text-[14px]
            font-semibold
            text-[#7C5CFF]
            hover:opacity-90
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
                >
                    {submitting ? "등록 중..." : "등록하기"}
                </button>
            </div>
        </div>
    );
}
