import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export type ContentType = "twitter" | "youtube" | "blog" | "aichat" | "all";

interface Content {
    id?: string;
    _id?: string;
    title: string;
    link: string;
    type: "twitter" | "youtube" | "blog" | "aichat";
}

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);
    const [filteredContents, setFilteredContents] = useState<Content[]>([]);
    const [activeFilter, setActiveFilter] = useState<ContentType>("all");

    async function refresh() {
        try {
            console.log("Refreshing content...");
            const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            console.log("Fresh content received:", response.data.content);
            console.log("Content count:", response.data.content.length);
            setContents(response.data.content);
        } catch (error) {
            console.error("Failed to fetch content:", error);
        }
    }

    const filterContent = (type: ContentType) => {
        setActiveFilter(type);
        if (type === "all") {
            setFilteredContents(contents);
        } else {
            setFilteredContents(contents.filter(content => content.type === type));
        }
    };

    useEffect(() => {
        refresh();
        let interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        filterContent(activeFilter);
    }, [contents, activeFilter]);

    return {
        contents,
        filteredContents,
        activeFilter,
        refresh,
        filterContent
    };
}







