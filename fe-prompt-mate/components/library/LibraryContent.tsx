import { LibraryItem, type LibraryItemData } from "@/components/library/LibraryItem";

export function LibraryContent({
  items,
  layout,
}: {
  items: LibraryItemData[];
  layout: "list" | "grid";
}) {
  if (layout === "list") {
    return (
      <ul className="mt-[12px] divide-y divide-black/5 rounded-[18px] bg-white">
        {items.map((it) => (
          <LibraryItem key={it.id} item={it} layout="list" />
        ))}
      </ul>
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