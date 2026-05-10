"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/shared/components/layout/Container";
import PromptDetailView from "@/app/(main)/community/_components/detail/PostDetailHeader";
import PostMetaBar from "@/app/(main)/community/_components/detail/PostMetaBar";
import SectionTitle from "@/app/(main)/community/_components/detail/SectionTitle";
import MenuIcon from "@/assets/icons/Group 2147202980.svg";
import UnionMenuIcon from "@/assets/icons/Union.svg";
import { getCommunityPostDetail, updateCommunityPost, type CommunityPost } from "@/shared/api/community";
import { convertPlatformFromEnum } from "@/app/(main)/prompts/_components/constants";

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

export default function CommunityEditPage() {
    const params = useParams();
    const postId = params?.id as string;
    const router = useRouter();
    
    const [post, setPost] = useState<CommunityPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editDescription, setEditDescription] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) return;
            
            setLoading(true);
            setError(null);
            
            try {
                const data = await getCommunityPostDetail(postId);
                setPost(data);
                setEditDescription(data.description);
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

    const handleCancelEdit = () => {
        router.push(`/community/${postId}`);
    };

    const handleUpdatePost = async () => {
        if (!postId || !editDescription.trim()) return;
        
        setIsUpdating(true);
        try {
            await updateCommunityPost(postId, {
                description: editDescription.trim(),
            });
            // 수정 완료 후 상세 페이지로 이동
            router.push(`/community/${postId}`);
        } catch (error) {
            console.error("게시글 수정 실패:", error);
            alert("게시글 수정 중 오류가 발생했습니다.");
        } finally {
            setIsUpdating(false);
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
                    />
                </div>

                {/* 2) 메타바 */}
                <div className="mb-[48px]">
                    <PostMetaBar
                        username={post.nickname}
                        dateText={dateText}
                        views={post.viewCount}
                        likes={post.likeCount}
                        isLiked={post.isLiked}
                        comments={post.commentCount}
                    />
                </div>

                {/* 2-1) 이미지 (imageUrl이 있을 때만 표시) */}
                {post.imageUrl && (
                    <div className="mb-[48px]">
                        <div className="relative w-full" style={{ aspectRatio: '958.379 / 540.624' }}>
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="rounded-t-[20px] object-cover"
                                sizes="(max-width: 768px) 100vw, 958px"
                            />
                        </div>
                    </div>
                )}

                {/* 3) 프롬프트 내용 */}
                <div className="px-2 mb-[24px]">
                    <SectionTitle
                        icon={<MenuIcon />}
                        title="프롬프트 내용"
                        text={post.promptContent}
                    />
                </div>

                {/* 4) 프롬프트 설명 (수정 가능) */}
                <div className="mt-[40px] mb-[24px]">
                    <div>
                        {/* 타이틀 줄 */}
                        <div className="flex items-center justify-between px-6">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex h-5 w-5 items-center justify-center text-[#6B4BFF]">
                                    <UnionMenuIcon />
                                </span>
                                <h2 className="text-[16px] font-semibold text-black/80">프롬프트 설명</h2>
                            </div>
                        </div>

                        {/* 수정 가능한 텍스트에리어 */}
                        <div className="mx-auto mt-[24px] flex items-center justify-center rounded-[20px] bg-[#F8FAFC] px-[36px] pb-[45px] pt-[34px]">
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full min-h-[200px] resize-none bg-transparent text-[14px] leading-[22px] text-black/70 outline-none"
                                placeholder="프롬프트 설명을 입력하세요"
                            />
                        </div>
                    </div>
                </div>

                {/* 하단 버튼 */}
                <div className="mt-[40px] mb-[24px] flex justify-end gap-3">
                    <button
                        onClick={handleCancelEdit}
                        disabled={isUpdating}
                        className="rounded-[12px] bg-[#F3F4F6] px-5 py-2 text-[14px] font-semibold text-[#6B7280] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        취소하기
                    </button>
                    <button
                        onClick={handleUpdatePost}
                        disabled={isUpdating || !editDescription.trim()}
                        className="rounded-[12px] bg-[#E9E5FF] px-5 py-2 text-[14px] font-semibold text-[#7C5CFF] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUpdating ? "수정 중..." : "수정 완료"}
                    </button>
                </div>
            </section>
        </Container>
    );
}

