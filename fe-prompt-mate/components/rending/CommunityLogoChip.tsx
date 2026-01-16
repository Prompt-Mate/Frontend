// components/home/CommunityLogoChip.tsx
"use client";

import { ReactNode } from "react";

interface CommunityLogoChipProps {
  children: ReactNode;
}

export default function CommunityLogoChip({
  children,
}: CommunityLogoChipProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-[8px]
        rounded-[24px]
        border
        border-white/50
        bg-white/80
        px-[24px]
        py-[16px]
        shadow-[0_8px_24px_rgba(238,230,253,0.6)]
        backdrop-blur
      "
    >
      {children}
    </div>
  );
}