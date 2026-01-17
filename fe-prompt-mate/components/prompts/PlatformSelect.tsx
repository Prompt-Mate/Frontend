// components/prompts/PlatformSelect.tsx

"use client";

import { useState } from "react";
import { PLATFORMS } from "./constants";

interface Props {
  value: string | null;
  onChange: (v: string) => void;
}

export default function PlatformSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[44px] w-full items-center justify-between rounded-xl border px-4 text-gray-700"
      >
        {value ?? "플랫폼"}
        <span>⌄</span>
      </button>

      {open && (
        <ul className="absolute z-20 mt-2 w-full rounded-xl border bg-white shadow-lg">
          {PLATFORMS.map((p) => (
            <li
              key={p}
              onClick={() => {
                onChange(p);
                setOpen(false);
              }}
              className="cursor-pointer px-4 py-3 hover:bg-gray-50"
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
