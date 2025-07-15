import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "blog" | "aichat";
    onDelete: () => void;
    onShare: () => void;
}

const getTypeIcon = (type: string) => {
    switch (type) {
        case "youtube":
            return "📺";
        case "twitter":
            return "🐦";
        case "blog":
            return "📝";
        case "aichat":
            return "🤖";
        default:
            return "📄";
    }
};

export function Card({ title, link, type, onDelete, onShare }: CardProps) {
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this content?")) {
            onDelete();
        }
    };

    const handleShare = () => {
        onShare();
    };

    const renderContent = () => {
        switch (type) {
            case "youtube":
                const getYouTubeEmbedUrl = (url: string): string => {
                    let videoId = '';

                    if (url.includes('watch?v=')) {
                        videoId = url.split('watch?v=')[1].split('&')[0];
                    } else if (url.includes('youtu.be/')) {
                        videoId = url.split('youtu.be/')[1].split('?')[0];
                    } else if (url.includes('embed/')) {
                        return url;
                    }

                    return `https://www.youtube.com/embed/${videoId}`;
                };

                return (
                    <iframe
                        className="w-full aspect-video"
                        src={getYouTubeEmbedUrl(link)}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                );
            case "twitter":
                return (
                    <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                );
            case "blog":
                return (
                    <div className="border rounded-lg p-3 bg-gray-50">
                        <div className="text-sm text-gray-600 mb-2">Blog Post</div>
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline block truncate"
                        >
                            {link}
                        </a>
                    </div>
                );
            case "aichat":
                return (
                    <div className="border rounded-lg p-3 bg-gradient-to-r from-purple-50 to-blue-50">
                        <div className="text-sm text-gray-600 mb-2">AI Chat Session</div>
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 underline block truncate"
                        >
                            {link}
                        </a>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
                <div className="flex justify-between">
                    <div className="flex items-center text-md">
                        <div className="text-gray-500 pr-2">
                            {getTypeIcon(type)}
                        </div>
                        {title}
                    </div>
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            <button
                                onClick={handleShare}
                                className="cursor-pointer hover:text-blue-500 transition-colors"
                                title="Share"
                            >
                                <ShareIcon />
                            </button>
                        </div>
                        <div className="text-gray-500">
                            <button
                                onClick={handleDelete}
                                className="cursor-pointer hover:text-red-500 transition-colors"
                                title="Delete"
                            >
                                <DeleteIcon />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}










