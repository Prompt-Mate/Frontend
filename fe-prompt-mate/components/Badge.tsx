import React from "react";

export function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[4px] px-[8px] py-[2px] text-[12px] font-medium bg-[#E6DFFE] ${className}`}
    >
      {children}
    </span>
  );
}