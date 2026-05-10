import { SearchBar } from "@/app/(main)/community/_components/SearchBar";
import { CreatePostButton } from "@/app/(main)/community/_components/CreatePostButton";

interface Props {
  onSearch?: (search: string) => void;
}

export function CommunityHeader({ onSearch }: Props) {
    return (
        <header className="mb-5 px-5 py-4">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <SearchBar 
                      placeholder="필요한 프롬프트를 검색해보세요"
                      onSearch={onSearch}
                    />
                </div>
                <CreatePostButton />
            </div>
        </header>
    );
}
