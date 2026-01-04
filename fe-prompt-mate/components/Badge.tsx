import { cn } from "@/lib/cn";

export function Badge({
                          children,
                          className,
                      }: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "inline-flex h-[30px] items-center justify-center gap-[5px] rounded-[12px] px-[17px]",
                "bg-[linear-gradient(0deg,rgba(230,223,254,0.71)_0%,rgba(230,223,254,0.71)_100%),#FFF]",
                "shadow-[inset_0_0_15px_rgba(255,255,255,0.80)]",
                "backdrop-blur-[5px]",
                "text-[12px] font-semibold leading-none text-[#6A5AE6]",
                className
            )}
        >
      {children}
    </span>
    );
}
