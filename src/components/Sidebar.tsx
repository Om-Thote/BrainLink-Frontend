import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import type { ContentType } from "../hooks/useContent";
import { BlogIcon } from "../icons/BlogIcon";
import { AiChatIcon } from "../icons/AIChatIcon";
import { AllIcon } from "../icons/AllIcon";

interface SidebarProps {
    activeFilter: ContentType;
    onFilterChange: (type: ContentType) => void;
    isOpen?: boolean;
    onToggle?: () => void;
}

export function Sidebar({ activeFilter, onFilterChange, isOpen = true, onToggle }: SidebarProps) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed left-0 top-0 h-screen bg-white border-r z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 md:w-72 lg:w-80
        md:translate-x-0
      `}>
                <div className="px-4 md:px-6">
                    <div className="flex text-xl md:text-2xl pt-6 md:pt-8 items-center">
                        <div className="pr-2 text-purple-600">
                            <Logo />
                        </div>
                        BrainLink
                    </div>

                    <div className="pt-6 md:pt-8 pl-2 md:pl-4">
                        <SidebarItem
                            text="All Content"
                            icon={<AllIcon />}
                            isActive={activeFilter === "all"}
                            onClick={() => onFilterChange("all")}
                        />
                        <SidebarItem
                            text="Twitter"
                            icon={<TwitterIcon />}
                            isActive={activeFilter === "twitter"}
                            onClick={() => onFilterChange("twitter")}
                        />
                        <SidebarItem
                            text="Youtube"
                            icon={<YoutubeIcon />}
                            isActive={activeFilter === "youtube"}
                            onClick={() => onFilterChange("youtube")}
                        />
                        <SidebarItem
                            text="Blog"
                            icon={<BlogIcon />}
                            isActive={activeFilter === "blog"}
                            onClick={() => onFilterChange("blog")}
                        />
                        <SidebarItem
                            text="AI Chat"
                            icon={<AiChatIcon />}
                            isActive={activeFilter === "aichat"}
                            onClick={() => onFilterChange("aichat")}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}



