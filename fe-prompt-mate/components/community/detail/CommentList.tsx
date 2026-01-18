"use client";

import { useState, useEffect } from "react";
import CommentComposer from "./CommentComposer";
import { getComments, type Comment } from "@/services/community";

type UiComment = {
    id: string;
    author: { nickname: string };
    createdAt: string; // "2025.11.16"
    content: string;
    isReply?: boolean;
    mentionNickname?: string;
    parentId?: number; // parentId 저장 (대댓글 작성 시 필요)
};

/**
 * 날짜를 "YY.MM.DD" 형식으로 변환
 */
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
}

interface CommentListProps {
    postId: number | string;
    username: string; // 사용자 닉네임 (대댓글 작성용)
    onCommentAdded?: () => void; // 댓글 목록 새로고침용
}

export default function CommentList({ postId, username, onCommentAdded }: CommentListProps) {
    const [comments, setComments] = useState<UiComment[]>([]);
    const [loading, setLoading] = useState(true);
    // 답글 작성 중인 댓글 ID (null이면 답글 작성 안 하는 중)
    const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);

    // 댓글 목록 조회
    const fetchComments = async () => {
        try {
            setLoading(true);
            const data = await getComments(postId);
            
            // 댓글 맵 생성 (parentId로 부모 댓글 찾기용)
            const commentMap = new Map<number, Comment>();
            data.forEach(comment => {
                commentMap.set(comment.commentId, comment);
            });

            // API 응답을 UiComment 형식으로 변환
            const uiComments: UiComment[] = data.map((comment) => {
                const isReply = comment.parentId > 0;
                let mentionNickname: string | undefined;

                // 대댓글이면 부모 댓글의 닉네임 가져오기
                if (isReply) {
                    const parentComment = commentMap.get(comment.parentId);
                    mentionNickname = parentComment?.nickname;
                }

                return {
                    id: String(comment.commentId),
                    author: { nickname: comment.nickname },
                    createdAt: formatDate(comment.createdAt),
                    content: comment.content,
                    isReply,
                    mentionNickname,
                    parentId: comment.parentId, // parentId 저장
                };
            });

            setComments(uiComments);
        } catch (error) {
            console.error("댓글 목록 조회 실패:", error);
            setComments([]);
        } finally {
            setLoading(false);
        }
    };

    // 초기 로드
    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleReplyClick = (commentId: string) => {
        setReplyingToCommentId(commentId);
    };

    const handleCancelReply = () => {
        setReplyingToCommentId(null);
    };

    const handleCommentAdded = () => {
        fetchComments(); // 댓글 목록 새로고침
        onCommentAdded?.(); // 상위 콜백도 호출
    };

    // 로딩 중
    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-ui-textMuted">댓글을 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {comments.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                    <p className="text-ui-textMuted">댓글이 없습니다.</p>
                </div>
            ) : (
                comments.map((c) => (
                <div key={c.id}>
                    <CommentRow 
                        item={c} 
                        onReplyClick={() => handleReplyClick(c.id)}
                    />
                    {/* 답글 작성 중인 댓글 아래에 CommentComposer 표시 */}
                    {replyingToCommentId === c.id && (
                        <div className="mt-4 ml-11">
                            <CommentComposer
                                postId={postId}
                                username={username}
                                parentId={Number(c.id)}
                                onCommentAdded={handleCommentAdded}
                                onCancel={handleCancelReply}
                                showCancelButton={true}
                            />
                        </div>
                    )}
                </div>
                ))
            )}
        </div>
    );
}

function CommentRow({ item, onReplyClick }: { item: UiComment; onReplyClick?: () => void }) {
    const isReply = !!item.isReply;

    return (
        <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="mt-1 h-8 w-8 shrink-0 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                <span className="text-[12px] text-[#6366F1]">+</span>
            </div>

            {/* Body */}
            <div className="min-w-0 flex-1">
                {/* Meta row (닉네임 / 날짜 / 답글) */}
                <div className="flex items-center gap-6">
          <span className="text-[14px] font-semibold text-black/85">
            {item.author.nickname}
          </span>

                    <span className="text-[13px] text-black/35">{item.createdAt}</span>

                    <button
                        type="button"
                        onClick={onReplyClick}
                        className="text-[13px] text-black/35 hover:text-black/60"
                    >
                        답글
                    </button>
                </div>

                {/* Content */}
                <div className={["mt-3 text-[14px] text-black/80", isReply ? "pl-0" : ""].join(" ")}>
                    {/* 대댓글이면 멘션 */}
                    {item.mentionNickname ? (
                        <>
              <span className="font-semibold text-[#4F46E5]">
                @{item.mentionNickname}
              </span>{" "}
                        </>
                    ) : null}

                    <span className={isReply ? "" : "font-semibold"}>{item.content}</span>
                </div>
            </div>
        </div>
    );
}
