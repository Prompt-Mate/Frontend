// components/prompts/CategorySelect.tsx

"use client";

import { useState } from "react";
import { CATEGORIES } from "./constants";

interface Props {
  value: string | null;
  onChange: (v: string) => void;
}

export default function CategorySelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[44px] w-full items-center justify-between rounded-xl border px-4 text-gray-700"
      >
        {value ?? "카테고리"}
        <span>⌄</span>
      </button>

      {open && (
        <ul className="absolute z-20 mt-2 w-full rounded-xl border bg-white shadow-lg">
          {CATEGORIES.map((c) => (
            <li
              key={c.key}
              onClick={() => {
                onChange(c.label);
                setOpen(false);
              }}
              className={`flex cursor-pointer items-center gap-2 px-4 py-3 hover:bg-gray-50 ${c.textClass}`}
            >
              <c.icon className="h-5 w-5" />
              <span className="font-bold">{c.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
