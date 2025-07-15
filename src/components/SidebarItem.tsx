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
            className={`flex text-gray-700 py-2 cursor-pointer rounded max-w-48 pl-4 transition-all duration-150 ${isActive
                ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-500'
                : 'hover:bg-gray-200'
                }`}
            onClick={onClick}
        >
            <div className="pr-2">
                {icon}
            </div>
            <div>
                {text}
            </div>
        </div>
    );
}



