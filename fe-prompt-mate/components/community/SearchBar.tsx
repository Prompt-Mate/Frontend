"use client";

import * as React from "react";

type Props = {
    placeholder: string;
    defaultValue?: string;
    onSearch?: (value: string) => void;
};

export function SearchBar({ placeholder, defaultValue = "", onSearch }: Props) {
    const [value, setValue] = React.useState(defaultValue);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        onSearch?.(value.trim());
    }

    return (
        <form onSubmit={submit} className="w-full">
            <div
                className="
          flex h-[55px] items-center gap-2
          rounded-[16px] bg-ui-surfaceSubtle
          px-4
          ring-1 ring-transparent
          focus-within:ring-2 focus-within:ring-primary/30
        "
            >
                <SearchIcon className="h-5 w-5 shrink-0 text-ui-icon" />
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="
            h-full w-full bg-transparent
            text-body text-ui-text
            placeholder:text-ui-textMuted
            outline-none
          "
                />
            </div>
        </form>
    );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M10.5 18.5a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M16.5 16.5 21 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
