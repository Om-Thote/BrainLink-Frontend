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

// Robust clipboard function with fallback
const copyToClipboard = async (text: string): Promise<boolean> => {
  // Try modern clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Clipboard API failed, falling back to legacy method');
    }
  }

  // Fallback for older browsers or non-secure contexts
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    textArea.style.top = '-999px';
    textArea.style.left = '-999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback clipboard method failed:', err);
    return false;
  }
};

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sharedBrainHash, setSharedBrainHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
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

      // Use the robust clipboard function
      const clipboardSuccess = await copyToClipboard(shareUrl);

      if (clipboardSuccess) {
        alert(`Brain shared! Link copied to clipboard: ${shareUrl}`);
      } else {
        // Show the URL to user if clipboard fails
        alert(`Brain shared! Please copy this link manually: ${shareUrl}`);
      }
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

      const clipboardSuccess = await copyToClipboard(link);

      if (clipboardSuccess) {
        alert("Content link copied to clipboard!");
      } else {
        alert(`Please copy this link manually: ${link}`);
      }
    } catch (error) {
      console.error("Failed to copy link:", error);
      alert(`Failed to copy link. Please copy manually: ${link}`);
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
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static
        inset-y-0 left-0
        z-50 md:z-auto
        w-64 md:w-72
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        transition-transform duration-300
        ease-in-out
      `}>
        <Sidebar
          activeFilter={activeFilter}
          onFilterChange={filterContent}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">BrainLink</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <CreateContentModal open={modalOpen} onClose={() => {
            setModalOpen(false);
          }} />

          {error && (
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
              <button
                onClick={() => setError("")}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          )}

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                {getDisplayTitle()}
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                {activeFilter === "all"
                  ? `Showing all ${contents.length} items`
                  : `Showing ${filteredContents.length} ${activeFilter} items`
                }
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
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

          {/* Content Grid - Clean grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
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

          {/* Empty State */}
          {filteredContents.length === 0 && (
            <div className="text-center py-12 lg:py-16 text-gray-500">
              <div className="text-4xl md:text-6xl mb-4">
                {activeFilter === "all" && "📚"}
                {activeFilter === "twitter" && "🐦"}
                {activeFilter === "youtube" && "📺"}
                {activeFilter === "blog" && "📝"}
                {activeFilter === "aichat" && "🤖"}
              </div>
              <p className="text-lg md:text-xl mb-2">
                No {activeFilter === "all" ? "" : activeFilter} content found.
              </p>
              <p className="text-sm md:text-base">
                Click "Add Content" to get started!
              </p>
            </div>
          )}

          {/* Success Toast */}
          {sharedBrainHash && (
            <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-auto bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg">
              <p className="text-sm md:text-base">
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
    </div>
  );
}












