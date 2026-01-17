import Container from "@/components/layout/Container";
import PromptDetailView from "@/components/community/detail/PostDetailHeader";
import PostMetaBar from "@/components/community/detail/PostMetaBar";
import SectionTitle from "@/components/community/detail/SectionTitle";
import MenuIcon from "@/assets/icons/Group 2147202980.svg";
import CopyIcon from "@/assets/icons/Frame 69.svg";
import UnionMenuIcon from "@/assets/icons/Union.svg";
import CommentComposer from "@/components/community/detail/CommentComposer";
import CommentList from "@/components/community/detail/CommentList";


export default function CommunityDetailPage() {
    return (
        <Container>
            <section className= "mt-4">
                <PromptDetailView/>
                    <PostMetaBar />
                <div className="px-2 mt-4">
                    <SectionTitle
                        icon={<MenuIcon />}
                        title="프롬프트 내용"
                        text="프롬프트 내용이 들어갑니다."
                    />
                    <SectionTitle
                        icon={<UnionMenuIcon />}
                        title="프롬프트 설명"
                        right={<CopyIcon />}
                        text="프롬프트 설명이 들어갑니다."
                    />
                </div>
                <div className="mt-[40px]">
                    <CommentComposer/>
                </div>
                <div className="mt-[70px] mb-[30px]">
                    <CommentList />
                </div>

            </section>
        </Container>
    );
}
