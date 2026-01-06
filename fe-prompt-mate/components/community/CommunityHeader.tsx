import { SearchBar } from "@/components/community/SearchBar";
import { CreatePostButton } from "@/components/community/CreatePostButton";

export function CommunityHeader() {
    return (
        <header className="mb-5 px-5 py-4">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <SearchBar placeholder="필요한 프롬프트를 검색해보세요" />
                </div>
                <CreatePostButton />
            </div>
        </header>
    );
}
