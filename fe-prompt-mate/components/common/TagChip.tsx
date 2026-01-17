// components/common/TagChip.tsx
"use client";

import clsx from "clsx";

type Variant = "platform" | "productivity" | "study" | "content" | "daily";

interface Props {
  label: string;
  variant: Variant;
  iconSrc?: string; // platform은 보통 없음
  className?: string;
}

const VARIANT_STYLE: Record<
  Variant,
  {
    bgClass?: string; // tailwind bg
    bgStyle?: string; // inline background (피그마 그대로)
    textGradient: string; // text gradient
    shadow: string; // inner shadow
    blurPx: number; // backdrop blur
  }
> = {
  platform: {
    // 연보라 71% 오버레이 + #fff
    bgStyle:
      "linear-gradient(0deg, rgba(230, 223, 254, 0.71) 0%, rgba(230, 223, 254, 0.71) 100%), #FFF",
    textGradient:
      "linear-gradient(256deg, #5527F5 51.66%, #CABCF8 119.42%)",
    shadow: "0 0 15px 0 rgba(255, 255, 255, 0.80) inset",
    blurPx: 5,
  },
  productivity: {
    // platform과 동일
    bgStyle:
      "linear-gradient(0deg, rgba(230, 223, 254, 0.71) 0%, rgba(230, 223, 254, 0.71) 100%), #FFF",
    textGradient:
      "linear-gradient(256deg, #5527F5 51.66%, #CABCF8 119.42%)",
    shadow: "0 0 15px 0 rgba(255, 255, 255, 0.80) inset",
    blurPx: 5,
  },
  study: {
    bgClass: "bg-[#D2FFEC]",
    textGradient:
      "linear-gradient(256deg, #00CA78 51.66%, #89E4C0 119.42%)",
    shadow: "0 0 15px 0 rgba(255, 255, 255, 0.80) inset",
    blurPx: 3.4,
  },
  content: {
    bgClass: "bg-[#D8E5FF]",
    textGradient:
      "linear-gradient(256deg, #3E80FA 51.66%, #A7C4F7 119.42%)",
    shadow: "0 0 15px 0 rgba(255, 255, 255, 0.80) inset",
    blurPx: 5,
  },
  daily: {
    bgClass: "bg-[#FFE6D4]",
    textGradient:
      "linear-gradient(256deg, #FF963E 51.66%, #FFCDA3 119.42%)",
    shadow: "0 0 15px 0 rgba(255, 255, 255, 0.80) inset",
    blurPx: 5,
  },
};

export default function TagChip({
  label,
  iconSrc,
  variant,
  className = "",
}: Props) {
  const v = VARIANT_STYLE[variant];

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center",
        // 칩 스펙: height 30 / padding 10 17 / gap 5 / radius 12
        "h-[30px] px-[17px] py-[10px] gap-[5px]",
        "rounded-[12px]",
        v.bgClass,
        className
      )}
      style={{
        background: v.bgStyle, // platform/productivity
        boxShadow: v.shadow,
        backdropFilter: `blur(${v.blurPx}px)`,
      }}
    >
      {iconSrc && (
        <img
          src={iconSrc}
          alt=""
          className="h-[16px] w-[16px] shrink-0"
        />
      )}

      <span
        className="text-[11px] font-bold leading-[170%]"
        style={{
          backgroundImage: v.textGradient,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {label}
      </span>
    </span>
  );
}