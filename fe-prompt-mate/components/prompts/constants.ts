// components/prompts/constants.ts
import ProductivityIcon from "@/public/icons/productivity.svg";
import StudyIcon from "@/public/icons/study.svg";
import ContentIcon from "@/public/icons/content.svg";
import DailyIcon from "@/public/icons/daily.svg";

export const PLATFORMS = [
  "Chat GPT",
  "Gemini",
  "Claude",
  "Copilot",
  "Perplexity",
  "Midjourney",
  "DALL-E",
];

export const CATEGORIES = [
  {
    key: "productivity",
    label: "업무/생산성",
    icon: ProductivityIcon,
    textClass: "text-[#5527F5]",
    bgClass: "bg-[#F3F0FF]",
  },
  {
    key: "study",
    label: "학습",
    icon: StudyIcon,
    textClass: "text-[#00C27A]",
    bgClass: "bg-[#E9FBF3]",
  },
  {
    key: "content",
    label: "콘텐츠",
    icon: ContentIcon,
    textClass: "text-[#3B82F6]",
    bgClass: "bg-[#EEF4FF]",
  },
  {
    key: "daily",
    label: "일상",
    icon: DailyIcon,
    textClass: "text-[#FF963E]",
    bgClass: "bg-[#FFF4EA]",
  },
];
