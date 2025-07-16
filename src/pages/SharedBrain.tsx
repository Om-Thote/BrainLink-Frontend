import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface SharedContent {
    id: string;
    type: "twitter" | "youtube" | "blog" | "aichat";
    link: string;
    title: string;
}

export function SharedBrain() {
    const { hash } = useParams<{ hash: string }>();
    const [contents, setContents] = useState<SharedContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!hash) {
            setError("Invalid share link");
            setLoading(false);
            return;
        }

        fetchSharedBrain();
    }, [hash]);

    const fetchSharedBrain = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);

            if (response.data && response.data.content) {
                setContents(response.data.content);
            } else {
                setError("No content found in shared brain");
            }
        } catch (error: any) {
            console.error("Failed to fetch shared brain:", error);

            if (error.response?.status === 404) {
                setError("Shared brain not found. The link may be invalid or expired.");
            } else if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Failed to load shared brain. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleShareContent = async (link: string) => {
        try {
            if (!link) {
                alert("Invalid content link");
                return;
            }

            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(link);
                alert("Content link copied to clipboard!");
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = link;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert("Content link copied to clipboard!");
            }
        } catch (error) {
            console.error("Failed to copy link:", error);
            alert(`Failed to copy link. Please copy manually: ${link}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading shared brain...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.href = "/landing"}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-4 max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Shared Brain
                    </h1>
                    <p className="text-sm text-gray-600">
                        Viewing shared content ({contents.length} items)
                    </p>
                </div>

                {contents.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <div className="text-6xl mb-4">📚</div>
                        <p className="text-lg mb-2">No content found in this shared brain.</p>
                    </div>
                ) : (
                    <div className="flex gap-4 flex-wrap">
                        {contents.map((content, index) => {
                            // Type guard to ensure content.type is valid
                            const validType = ["twitter", "youtube", "blog", "aichat"].includes(content.type)
                                ? content.type as "twitter" | "youtube" | "blog" | "aichat"
                                : "blog"; // fallback to blog if type is invalid

                            return (
                                <Card
                                    key={content.id || index}
                                    type={validType}
                                    link={content.link}
                                    title={content.title}
                                    onShare={() => handleShareContent(content.link)}
                                    onDelete={() => { }} // Empty function instead of undefined
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}