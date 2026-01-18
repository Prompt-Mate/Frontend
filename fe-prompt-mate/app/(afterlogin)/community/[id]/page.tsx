"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "@/components/layout/Container";
import PromptDetailView from "@/components/community/detail/PostDetailHeader";
import PostMetaBar from "@/components/community/detail/PostMetaBar";
import SectionTitle from "@/components/community/detail/SectionTitle";
import MenuIcon from "@/assets/icons/Group 2147202980.svg";
import CopyIcon from "@/assets/icons/Frame 69.svg";
import UnionMenuIcon from "@/assets/icons/Union.svg";
import CommentComposer from "@/components/community/detail/CommentComposer";
import CommentList from "@/components/community/detail/CommentList";
import { getCommunityPostDetail, type CommunityPost } from "@/services/community";
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
    
    const [post, setPost] = useState<CommunityPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // 댓글 목록 새로고침을 위한 trigger (Hooks는 조건부 return 전에 선언)
    const [commentRefreshTrigger, setCommentRefreshTrigger] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) return;
            
            setLoading(true);
            setError(null);
            
            try {
                const data = await getCommunityPostDetail(postId);
                setPost(data);
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
                <section className="mt-4">
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
    };

    return (
        <Container>
            <section className="mt-4">
                <PromptDetailView 
                    title={post.title}
                    badge={platformLabel}
                />
                <PostMetaBar 
                    username={post.nickname}
                    dateText={dateText}
                    views={post.viewCount}
                    likes={post.likeCount}
                    comments={post.commentCount}
                />
                <div className="px-2 mt-4">
                    <SectionTitle
                        icon={<MenuIcon />}
                        title="프롬프트 내용"
                        text={post.promptContent}
                    />
                    <SectionTitle
                        icon={<UnionMenuIcon />}
                        title="프롬프트 설명"
                        right={<CopyIcon />}
                        text={post.description}
                    />
                </div>
                <div className="mt-[40px]">
                    <CommentComposer 
                        postId={postId}
                        username={currentUsername}
                        onCommentAdded={handleCommentAdded}
                    />
                </div>
                <div className="mt-[70px] mb-[30px]">
                    <CommentList 
                        key={commentRefreshTrigger}
                        postId={postId}
                        username={currentUsername}
                    />
                </div>
            </section>
        </Container>
    );
}
