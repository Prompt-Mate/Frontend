// components/IconButton.tsx

import { ReactNode } from "react";

interface IconButtonProps {
    children: ReactNode;
    onClick?: () => void;
}

export function IconButton({ children, onClick }: IconButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
        inline-flex
        items-center
        justify-center
        rounded-[10px]
        bg-white
        p-[10px]
        hover:bg-ui-surfaceSubtle
        transition
      "
        >
            {children}
        </button>
    );
}
