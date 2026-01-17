// app/constants/tags.ts

export type PlatformKey =
  | "chatgpt"
  | "gemini"
  | "claude"
  | "copliot"
  | "perplexity"
  | "midjourney"
  | "dalle";

export type CategoryKey =
  | "productivity"
  | "study"
  | "content"
  | "daily";

/** TagChip variant용 */
export type TagVariant =
  | "platform"
  | "productivity"
  | "study"
  | "content"
  | "daily";