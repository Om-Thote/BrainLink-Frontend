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
}

export function Sidebar({ activeFilter, onFilterChange }: SidebarProps) {
    return (
        <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-2 text-purple-600">
                    <Logo />
                </div>
                BrainLink
            </div>
            <div className="pt-8 pl-4">
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
    );
}



