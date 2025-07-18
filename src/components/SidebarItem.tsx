import type { ReactElement } from "react";

interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    isActive?: boolean;
    onClick?: () => void;
}

export function SidebarItem({ text, icon, isActive = false, onClick }: SidebarItemProps) {
    return (
        <div
            className={`
        flex text-gray-700 py-2 md:py-3 cursor-pointer rounded transition-all duration-150
        max-w-44 md:max-w-48 lg:max-w-52 pl-3 md:pl-4
        text-sm md:text-base
        ${isActive
                    ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-500'
                    : 'hover:bg-gray-200'
                }
      `}
            onClick={onClick}
        >
            <div className="pr-2 md:pr-3">
                {icon}
            </div>
            <div>
                {text}
            </div>
        </div>
    );
}



