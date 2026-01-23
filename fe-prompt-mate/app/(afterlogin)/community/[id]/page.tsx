"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/layout/Container";
import PromptDetailView from "@/components/community/detail/PostDetailHeader";
import PostMetaBar from "@/components/community/detail/PostMetaBar";
import SectionTitle from "@/components/community/detail/SectionTitle";
import MenuIcon from "@/assets/icons/Group 2147202980.svg";
import CopyIcon from "@/assets/icons/Frame 69.svg";
import UnionMenuIcon from "@/assets/icons/Union.svg";
import CommentComposer from "@/components/community/detail/CommentComposer";
import CommentList, { type CommentListProps } from "@/components/community/detail/CommentList";
import { getCommunityPostDetail, togglePostLike, deleteCommunityPost, type CommunityPost } from "@/services/community";
import { convertPlatformFromEnum } from "@/components/prompts/constants";
import { getUserInfo } from "@/lib/auth";

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

export default function CommunityDetailPage() {
    const params = useParams();
    const postId = params?.id as string;
    const router = useRouter();
    
    const [post, setPost] = useState<CommunityPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // 댓글 목록 새로고침을 위한 trigger (Hooks는 조건부 return 전에 선언)
    const [commentRefreshTrigger, setCommentRefreshTrigger] = useState(0);
    // 좋아요 상태 (로컬 상태로 관리)
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    // 답글 작성 상태
    const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
    const [mentionNickname, setMentionNickname] = useState<string>("");

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) return;
            
            setLoading(true);
            setError(null);
            
            try {
                const data = await getCommunityPostDetail(postId);
                setPost(data);
                // 좋아요 상태 초기화
                setIsLiked(data.isLiked);
                setLikeCount(data.likeCount);
            } catch (error) {
                console.error("게시글 상세 조회 실패:", error);
                setError("게시글을 불러올 수 없습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    // 로딩 중
    if (loading) {
        return (
            <Container>
                <section>
                    <div className="flex items-center justify-center py-20">
                        <p className="text-ui-textMuted">로딩 중...</p>
                    </div>
                </section>
            </Container>
        );
    }

    // 에러 발생
    if (error || !post) {
        return (
            <Container>
                <section className="mt-4">
                    <div className="flex items-center justify-center py-20">
                        <p className="text-ui-textMuted">{error || "게시글을 찾을 수 없습니다."}</p>
                    </div>
                </section>
            </Container>
        );
    }

    // 플랫폼 변환
    const platformLabel = convertPlatformFromEnum(post.platform);
    const dateText = formatDate(post.createdAt);

    // 현재 로그인한 사용자 정보 가져오기
    const currentUser = getUserInfo();
    const currentUsername = currentUser?.nickname || "사용자";

    const handleCommentAdded = () => {
        setCommentRefreshTrigger(prev => prev + 1); // trigger 변경으로 CommentList 새로고침
        // 답글 작성 완료 시 상태 초기화
        if (replyingToCommentId) {
            setReplyingToCommentId(null);
            setMentionNickname("");
        }
    };

    const handleReplyClick = (commentId: string, nickname: string) => {
        setReplyingToCommentId(commentId);
        setMentionNickname(nickname);
    };

    const handleCancelReply = () => {
        setReplyingToCommentId(null);
        setMentionNickname("");
    };

    // 좋아요 버튼 클릭 핸들러
    const handleLikeClick = async () => {
        if (!postId) return;
        
        try {
            const response = await togglePostLike(postId);
            setIsLiked(response.isLiked);
            setLikeCount(response.likeCount);
        } catch (error) {
            console.error("좋아요 토글 실패:", error);
        }
    };

    const handleDeletePost = async () => {
        if (!postId) return;
        try {
            await deleteCommunityPost(postId);
            // 삭제 후 커뮤니티 목록으로 이동
            router.push("/community");
        } catch (error) {
            console.error("게시글 삭제 실패:", error);
            alert("게시글 삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <Container>
            <section className="mt-[50px]">
                {/* 1) 제목/배지 */}
                <div className="mb-[19px]">
                    <PromptDetailView
                        title={post.title}
                        badge={platformLabel}
                        onDeleteClick={handleDeletePost}
                    />
                </div>

                {/* 2) 메타바 */}
                <div className="mb-[48px]">
                    <PostMetaBar
                        username={post.nickname}
                        dateText={dateText}
                        views={post.viewCount}
                        likes={likeCount}
                        isLiked={isLiked}
                        comments={post.commentCount}
                        onLikeClick={handleLikeClick}
                    />
                </div>

                {/* 3) 프롬프트 내용 */}
                <div className="px-2 mb-[24px]">
                    <SectionTitle
                        icon={<MenuIcon />}
                        title="프롬프트 내용"
                        text={post.promptContent}
                    />
                </div>

                {/* 4) 프롬프트 설명 */}
                <div className="mt-[40px] mb-[24px]">
                    <SectionTitle
                        icon={<UnionMenuIcon />}
                        title="프롬프트 설명"
                        right={<CopyIcon />}
                        text={post.description}
                    />
                </div>

                {/* 5) 댓글 작성 */}
                <div className="mt-[46px] mb-[58px]">
                    <CommentComposer
                        postId={postId}
                        username={currentUsername}
                        parentId={replyingToCommentId ? Number(replyingToCommentId) : null}
                        mentionNickname={mentionNickname}
                        onCommentAdded={handleCommentAdded}
                        onCancel={handleCancelReply}
                        showCancelButton={!!replyingToCommentId}
                    />
                </div>

                {/* 6) 댓글 리스트 */}
                <div className="mt-[70px] mb-[30px]">
                    <CommentList
                        key={commentRefreshTrigger}
                        postId={postId}
                        username={currentUsername}
                        onCommentAdded={handleCommentAdded}
                        onReplyClick={handleReplyClick}
                    />
                </div>
            </section>
        </Container>

    );
}
