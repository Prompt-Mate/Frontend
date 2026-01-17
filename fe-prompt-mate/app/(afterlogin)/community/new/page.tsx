// app/community/new/page.tsx
import PromptRegisterModal from "@/components/community/PromptRegisterModal";
import Container from "@/components/layout/Container";

export default function CommunityNewPage() {
    return (
        <Container>
        <main className="min-h-dvh bg-[#F6F7FB] px-4 py-10">
            <div className="mx-auto max-w-[760px]">
                <PromptRegisterModal asPage />
            </div>
        </main>
        </Container>
    );
}
