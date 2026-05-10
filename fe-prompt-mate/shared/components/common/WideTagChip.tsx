type TagChipProps = {
    label: string;
};

export function TagChip({ label }: TagChipProps) {
    return (
        <span
            className="
        flex items-center justify-center
        w-[158px] h-[38px]
        px-[3px] py-[5px]
        rounded-[10px]
        bg-chip-bg text-chip-text
        text-chipText font-bold
      "
        >
      {label}
    </span>
    );
}
