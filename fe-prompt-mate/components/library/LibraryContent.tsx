import {LibraryItem, LibraryItemData} from "@/components/library/LibraryItem";

export function LibraryContent({
                                   items,
                                   layout,
                               }: {
    items: LibraryItemData[];
    layout: "list" | "grid";
}) {
    if (layout === "list") {
        return (
            <div className="mt-[12px] flex flex-col gap-[12px]">
                {items.map((it) => (
                    <LibraryItem key={it.id} item={it} layout="list" />
                ))}
            </div>
        );
    }

    return (
        <div className="mt-[12px] grid grid-cols-3 gap-[16px]">
            {items.map((it) => (
                <LibraryItem key={it.id} item={it} layout="grid" />
            ))}
        </div>
    );
}
