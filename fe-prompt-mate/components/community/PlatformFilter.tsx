"use client";

type Props = {
    value: string;
    onChange: (v: string) => void;
};

const PLATFORMS = [
    "Chat GPT",
    "Gemini",
    "Claude",
    "Copilot",
    "Perplexity",
    "Midjourney",
    "DALL·E",
];

export function PlatformFilter({ value, onChange }: Props) {
    return (
        <div className="flex flex-wrap items-center gap-5">
            {PLATFORMS.map((p) => (
                <label key={p} className="flex cursor-pointer items-center gap-2">
                    <input
                        type="radio"
                        name="platform"
                        checked={value === p}
                        onChange={() => onChange(p)}
                        className="h-4 w-4 accent-primary"
                    />
                    <span className="text-body text-ui-text">{p}</span>
                </label>
            ))}
        </div>
    );
}
