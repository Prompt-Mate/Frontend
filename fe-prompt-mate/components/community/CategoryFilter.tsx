
"use client";

import ProductivityIcon from "@/public/icons/productivity.svg";
import StudyIcon from "@/public/icons/study.svg";
import ContentIcon from "@/public/icons/content.svg";
import DailyIcon from "@/public/icons/daily.svg";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

type Category = {
  label: string;
  variant: "primary" | "learn" | "content" | "daily";
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  style?: React.CSSProperties;
  bgClass?: string;
  textGradient: string;
  shadow?: string;
  blurPx?: number;
};

const CATEGORIES: Category[] = [
  {
    label: "업무/생산성",
    variant: "primary",
    icon: ProductivityIcon,
    style: {
      background:
        "linear-gradient(0deg, rgba(230, 223, 254, 0.71) 0%, rgba(230, 223, 254, 0.71) 100%), #FFF",
      boxShadow: "0 0 15px 0 rgba(255, 255, 255, 0.80) inset",
      backdropFilter: "blur(5px)",
      WebkitBackdropFilter: "blur(5px)",
    },
    textGradient:
      "linear-gradient(256deg, #5527F5 51.66%, #CABCF8 119.42%)",
  },

  {
    label: "학습",
    variant: "learn",
    icon: StudyIcon,
    bgClass: "bg-[#D2FFEC]",
    textGradient:
      "linear-gradient(256deg, #00CA78 51.66%, #89E4C0 119.42%)",
    shadow: "0 0 15px 0 rgba(255, 255, 255, 0.80) inset",
    blurPx: 3.4,
  },

  {
    label: "콘텐츠",
    variant: "content",
    icon: ContentIcon,
    bgClass: "bg-[#D8E5FF]",
    textGradient:
      "linear-gradient(256deg, #3E80FA 51.66%, #A7C4F7 119.42%)",
    shadow: "0 0 15px 0 rgba(255, 255, 255, 0.80) inset",
    blurPx: 5,
  },

  {
    label: "일상",
    variant: "daily",
    icon: DailyIcon,
    bgClass: "bg-[#FFE6D4]",
    textGradient:
      "linear-gradient(256deg, #FF963E 51.66%, #FFCDA3 119.42%)",
    shadow: "0 0 15px 0 rgba(255, 255, 255, 0.80) inset",
    blurPx: 5,
  },
];

export function CategoryFilter({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {CATEGORIES.map((c) => {
        const active = value === c.label;
        const Icon = c.icon;

        const isPrimary = c.variant === "primary";
        const isCustom = ["learn", "content", "daily"].includes(c.variant);

        const buttonStyle: React.CSSProperties | undefined =
          active && (isPrimary || isCustom)
            ? {
                ...c.style,
                boxShadow: c.shadow ?? c.style?.boxShadow,
                backdropFilter: `blur(${c.blurPx ?? 5}px)`,
                WebkitBackdropFilter: `blur(${c.blurPx ?? 5}px)`,
              }
            : undefined;

           return (
          <button
            key={c.label}
            type="button"
            onClick={() => onChange(c.label)}
            className={[
              "h-9 rounded-full px-4 text-[16px] font-semibold transition",
              active
                ? isCustom
                  ? c.bgClass
                  : ""
                : "bg-ui-surfaceSubtle text-ui-textMuted",
              "hover:opacity-95 active:opacity-90",
            ]
              .filter(Boolean)
              .join(" ")}
            style={buttonStyle}
          >
            <span className="flex items-center gap-[5px]">
              <Icon className="h-5 w-6 shrink-0" />

              <span
                style={
                  active
                    ? {
                        background: c.textGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : undefined
                }
              >
                {c.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}