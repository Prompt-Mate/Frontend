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

// 백엔드 API enum 형식으로 변환 함수

/**
 * 화면 표시용 플랫폼 이름을 백엔드 enum 형식으로 변환
 * @param displayName - 화면에 표시되는 이름 (예: "Chat GPT", "Gemini")
 * @returns 백엔드 enum 형식 (예: "CHAT_GPT", "GEMINI")
 */
export function convertPlatformToEnum(displayName: string): string {
  const platformMap: Record<string, string> = {
    "Chat GPT": "CHAT_GPT",
    "Gemini": "GEMINI",
    "Claude": "CLAUDE",
    "Copilot": "COPILOT",
    "Perplexity": "PERPLEXITY",
    "Midjourney": "MIDJOURNEY",
    "DALL-E": "DALL_E",
  };
  
  return platformMap[displayName] || displayName;
}

/**
 * 화면 표시용 카테고리 레이블을 백엔드 enum 형식으로 변환
 * @param label - 화면에 표시되는 한글 레이블 (예: "업무/생산성", "학습")
 * @returns 백엔드 enum 형식 (예: "WORK_PRODUCTIVITY", "STUDY")
 */
export function convertCategoryToEnum(label: string): string {
  const categoryMap: Record<string, string> = {
    "업무/생산성": "WORK_PRODUCTIVITY",
    "학습": "STUDY",
    "콘텐츠": "CONTENT",
    "일상": "DAILY",
  };
  
  return categoryMap[label] || label;
}

/**
 * 백엔드 enum 형식을 화면 표시용 플랫폼 이름으로 변환
 * @param enumValue - 백엔드 enum 형식 (예: "CHAT_GPT", "GEMINI")
 * @returns 화면에 표시되는 이름 (예: "Chat GPT", "Gemini")
 */
export function convertPlatformFromEnum(enumValue: string): string {
  const platformMap: Record<string, string> = {
    "CHAT_GPT": "Chat GPT",
    "GEMINI": "Gemini",
    "CLAUDE": "Claude",
    "COPILOT": "Copilot",
    "PERPLEXITY": "Perplexity",
    "MIDJOURNEY": "Midjourney",
    "DALL_E": "DALL·E",
  };
  
  return platformMap[enumValue] || enumValue;
}

/**
 * 백엔드 enum 형식을 화면 표시용 카테고리 레이블로 변환
 * @param enumValue - 백엔드 enum 형식 (예: "WORK_PRODUCTIVITY", "STUDY")
 * @returns 화면에 표시되는 한글 레이블 (예: "업무/생산성", "학습")
 */
export function convertCategoryFromEnum(enumValue: string): string {
  const categoryMap: Record<string, string> = {
    "WORK_PRODUCTIVITY": "업무/생산성",
    "STUDY": "학습",
    "CONTENT": "콘텐츠",
    "DAILY": "일상",
  };
  
  return categoryMap[enumValue] || enumValue;
}

/**
 * 카테고리 enum 값에 해당하는 TagChip variant 반환
 * @param enumValue - 백엔드 enum 형식 (예: "WORK_PRODUCTIVITY", "STUDY")
 * @returns TagChip variant (예: "productivity", "study")
 */
export function getCategoryVariant(enumValue: string): "platform" | "productivity" | "study" | "content" | "daily" {
  const variantMap: Record<string, "platform" | "productivity" | "study" | "content" | "daily"> = {
    "WORK_PRODUCTIVITY": "productivity",
    "STUDY": "study",
    "CONTENT": "content",
    "DAILY": "daily",
  };
  
  return variantMap[enumValue] || "platform";
}

/**
 * 백엔드 enum 형식을 LibraryItemData platform 형식으로 변환
 * @param enumValue - 백엔드 enum 형식 (예: "CHAT_GPT", "CLAUDE")
 * @returns LibraryItemData platform 형식 (예: "chatgpt", "claude")
 */
export function convertPlatformToLibraryItemFormat(enumValue: string): "chatgpt" | "gemini" | "claude" | "copliot" | "perplexity" | "midjourney" | "dalle" {
  const platformMap: Record<string, "chatgpt" | "gemini" | "claude" | "copliot" | "perplexity" | "midjourney" | "dalle"> = {
    "CHAT_GPT": "chatgpt",
    "GEMINI": "gemini",
    "CLAUDE": "claude",
    "COPILOT": "copliot",
    "PERPLEXITY": "perplexity",
    "MIDJOURNEY": "midjourney",
    "DALL_E": "dalle",
  };
  
  return platformMap[enumValue] || "chatgpt";
}
