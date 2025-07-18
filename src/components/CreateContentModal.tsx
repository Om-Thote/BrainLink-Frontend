import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

const ContentType = {
    Youtube: "youtube",
    Twitter: "twitter",
    Blog: "blog",
    AIChat: "aichat"
} as const;

type ContentType = "youtube" | "twitter" | "blog" | "aichat";

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>(ContentType.Youtube);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // URL validation function
    const isValidUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    async function addContent() {
        const title = titleRef.current?.value?.trim();
        const link = linkRef.current?.value?.trim();

        // Enhanced validation
        if (!title || title.length === 0) {
            alert("Please enter a title");
            return;
        }

        if (!link || link.length === 0) {
            alert("Please enter a link");
            return;
        }

        if (!isValidUrl(link)) {
            alert("Please enter a valid URL");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first");
            return;
        }

        setIsSubmitting(true);

        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                title,
                type
            }, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            // Clear form
            if (titleRef.current) titleRef.current.value = "";
            if (linkRef.current) linkRef.current.value = "";
            setType(ContentType.Youtube);

            alert("Content added successfully!");
            onClose();
        } catch (error) {
            console.error("Failed to add content:", error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    const errorMessage = error.response?.data?.message || "Invalid data provided";
                    alert(`Error: ${errorMessage}`);
                } else if (error.response?.status === 401) {
                    alert("Authentication failed. Please login again.");
                    localStorage.removeItem("token");
                    window.location.href = "/signin";
                } else if (error.response?.status === 403) {
                    alert("You don't have permission to perform this action.");
                } else {
                    alert(`Server error: ${error.response?.status || 'Unknown'}`);
                }
            } else {
                alert("Network error. Please check your connection.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    // Handle form submission on Enter key
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isSubmitting) {
            addContent();
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div
                    className="bg-white rounded-lg shadow-xl w-full max-w-sm md:max-w-md lg:max-w-lg max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-4 md:p-6">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                            <h2 className="text-lg md:text-xl font-semibold">Add Content</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-red-500 transition-colors p-1"
                            >
                                <CrossIcon />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="space-y-4 mb-6">
                            <Input
                                reference={titleRef}
                                placeholder="Enter title"
                                onKeyDown={handleKeyPress}
                            />
                            <Input
                                reference={linkRef}
                                placeholder="Enter link"
                                onKeyDown={handleKeyPress}
                            />
                        </div>

                        {/* Content Type Selection */}
                        <div className="mb-6">
                            <h3 className="text-base md:text-lg font-semibold text-center mb-4">
                                Content Type
                            </h3>
                            <div className="grid grid-cols-2 gap-2 md:flex md:gap-3 md:justify-center">
                                <Button
                                    text="YouTube"
                                    variant={type === ContentType.Youtube ? "secondary" : "tertiary"}
                                    onClick={() => setType(ContentType.Youtube)}
                                    disabled={isSubmitting}
                                />
                                <Button
                                    text="Twitter"
                                    variant={type === ContentType.Twitter ? "secondary" : "tertiary"}
                                    onClick={() => setType(ContentType.Twitter)}
                                    disabled={isSubmitting}
                                />
                                <Button
                                    text="Blog"
                                    variant={type === ContentType.Blog ? "secondary" : "tertiary"}
                                    onClick={() => setType(ContentType.Blog)}
                                    disabled={isSubmitting}
                                />
                                <Button
                                    text="AI Chat"
                                    variant={type === ContentType.AIChat ? "secondary" : "tertiary"}
                                    onClick={() => setType(ContentType.AIChat)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <Button
                                onClick={addContent}
                                variant="primary"
                                text={isSubmitting ? "Adding..." : "Add Content"}
                                disabled={isSubmitting}
                                fullWidth={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}














