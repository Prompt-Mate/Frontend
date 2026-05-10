import type { ReactNode } from "react";

export function DashboardCard({
                                  children,
                                  className = "",
                              }: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <section
            className={[
                "rounded-[26px] bg-[#F8FAFC]",
                "px-[28px] py-[24px]",
                "shadow-[0_0_0_1px_rgba(15,23,42,0.03)]",
                className,
            ].join(" ")}
        >
            {children}
        </section>
    );
}
