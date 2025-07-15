import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL } from "../config"
import axios from "axios"

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sharedBrainHash, setSharedBrainHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { contents, filteredContents, activeFilter, refresh, filterContent } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen])

  const handleDelete = async (contentId: string) => {
    if (!contentId) {
      alert("Invalid content ID");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this content?");
    if (!confirmDelete) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          contentId: contentId
        }
      });

      await refresh();
      alert("Content deleted successfully!");

    } catch (error: any) {
      console.error("Failed to delete content:", error);

      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map((err: any) => err.message).join(", ");
        setError(`Validation error: ${errorMessages}`);
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setError("You are not authorized. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/signin";
      } else {
        setError("Failed to delete content. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShareBrain = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
        share: true
      }, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });

      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
      setSharedBrainHash(response.data.hash);

      await navigator.clipboard.writeText(shareUrl);
      alert(`Brain shared! Link copied to clipboard: ${shareUrl}`);
    } catch (error: any) {
      console.error("Failed to share brain:", error);

      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map((err: any) => err.message).join(", ");
        setError(`Validation error: ${errorMessages}`);
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setError("You are not authorized. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/signin";
      } else {
        setError("Failed to share brain. Please try again.");
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

      await navigator.clipboard.writeText(link);
      alert("Content link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      alert("Failed to copy link. Please try again.");
    }
  };

  const getDisplayTitle = () => {
    switch (activeFilter) {
      case "all":
        return "All Content";
      case "twitter":
        return "Twitter Content";
      case "youtube":
        return "YouTube Content";
      case "blog":
        return "Blog Content";
      case "aichat":
        return "AI Chat Content";
      default:
        return "Content";
    }
  };

  return (
    <div>
      <Sidebar
        activeFilter={activeFilter}
        onFilterChange={filterContent}
      />
      <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false);
        }} />

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button
              onClick={() => setError("")}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {getDisplayTitle()}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {activeFilter === "all"
                ? `Showing all ${contents.length} items`
                : `Showing ${filteredContents.length} ${activeFilter} items`
              }
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add content"
              startIcon={<PlusIcon />}
              loading={loading}
            />
            <Button
              onClick={handleShareBrain}
              variant="primary"
              text="Share brain"
              startIcon={<ShareIcon />}
              loading={loading}
            />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          {filteredContents.map((content, index) => {
            const contentId = content.id || content._id || index.toString();

            return (
              <Card
                key={contentId}
                type={content.type}
                link={content.link}
                title={content.title}
                onDelete={() => handleDelete(contentId)}
                onShare={() => handleShareContent(content.link)}
              />
            );
          })}
        </div>

        {filteredContents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">
              {activeFilter === "all" && "📚"}
              {activeFilter === "twitter" && "🐦"}
              {activeFilter === "youtube" && "📺"}
              {activeFilter === "blog" && "📝"}
              {activeFilter === "aichat" && "🤖"}
            </div>
            <p className="text-lg mb-2">
              No {activeFilter === "all" ? "" : activeFilter} content found.
            </p>
            <p className="text-sm">
              Click "Add Content" to get started!
            </p>
          </div>
        )}

        {sharedBrainHash && (
          <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow-lg">
            <p className="text-sm">
              Brain shared successfully! Hash: {sharedBrainHash}
            </p>
            <button
              onClick={() => setSharedBrainHash(null)}
              className="ml-2 text-green-500 hover:text-green-700"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}












