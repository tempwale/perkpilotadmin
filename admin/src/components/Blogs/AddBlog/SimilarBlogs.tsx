import { useState, useEffect, type ReactElement, type ChangeEvent } from "react";
import { ChevronDown, Trash, X } from "lucide-react";
import { BLOGS_API } from "../../../config/backend";
import BlogsCard from "../BlogManagement/BlogCard";
import type { BlogItem, SimilarBlogsProps } from "../../../types/blog.types";
import { formatDate } from "../../../utils/helpers";

export default function SimilarBlogs({
  sectionTitle = "Similar Posts",
  selectedBlogs = [],
  onSectionTitleChange,
  onBlogsChange,
  onDeleteSection,
}: SimilarBlogsProps): ReactElement {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BlogItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [internalTitle, setInternalTitle] = useState(sectionTitle);

  // Sync with prop
  useEffect((): void => {
    setInternalTitle(sectionTitle);
  }, [sectionTitle]);

  // Fetch blogs when query changes
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      setLoading(false);
      return;
    }

    let mounted = true;
    const abortController = new AbortController();
    const timeoutId = setTimeout(async (): Promise<void> => {
      if (!mounted) return;
      setLoading(true);
      try {
        const response = await fetch(`${BLOGS_API}?q=${encodeURIComponent(query)}`, {
          signal: abortController.signal,
        });
        if (!mounted) return;
        if (!response.ok) {
          if (mounted) {
            setLoading(false);
            setSearchResults([]);
            setShowResults(false);
          }
          return;
        }
        const data = await response.json() as BlogItem[] | { data: BlogItem[] };
        if (!mounted) return;
        const blogs = Array.isArray(data) ? data : (data.data ?? []);
        // Filter out already selected blogs
        const selectedIds = selectedBlogs.map((b) => b.blogId || b._id).filter(Boolean);
        const filtered = blogs.filter(
          (blog) => !selectedIds.includes(blog._id || blog.blogId)
        );
        if (mounted) {
          setSearchResults(filtered.slice(0, 10)); // Limit to 10 results
          setShowResults(true);
        }
      } catch (error) {
        if (!mounted) return;
        // Ignore AbortError from cancelled requests
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Error fetching blogs:", error);
        if (mounted) {
          setSearchResults([]);
          setShowResults(false);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }, 300); // Debounce

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [query, selectedBlogs]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleAddBlog = (blog: BlogItem): void => {
    const blogItem: BlogItem = {
      blogId: blog._id || blog.blogId,
      title: blog.blogHeading || blog.title,
      description: blog.blogBody || blog.description,
      image: blog.blogHeroImage || blog.image,
      category: blog.blogCategory || blog.category,
      tags: blog.tags,
      featured: blog.featured || false,
      published: blog.blogIsPublished || false,
      readingTime: blog.blogReadingTime || blog.readingTime,
      viewCount: blog.blogViewCount || blog.viewCount,
      date: blog.createdAt
        ? formatDate(blog.createdAt)
        : blog.date,
    };

    const exists = selectedBlogs.some(
      (b) => (b.blogId || b._id) === blogItem.blogId
    );
    if (exists) {
      setQuery("");
      setShowResults(false);
      return;
    }

    onBlogsChange?.([...selectedBlogs, blogItem]);
    setQuery("");
    setShowResults(false);
  };

  const handleRemoveBlog = (blogId?: string): void => {
    if (!blogId) return;
    const updated = selectedBlogs.filter(
      (b) => (b.blogId || b._id) !== blogId
    );
    onBlogsChange?.(updated);
  };

  const handleTitleChange = (value: string): void => {
    setInternalTitle(value);
    onSectionTitleChange?.(value);
  };

  const handleToggleSection = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleDeleteSection = (): void => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      onDeleteSection?.();
    }
  };

  return (
    <div className="self-stretch rounded-2xl inline-flex flex-col justify-start items-start gap-6">
      <div
        className="self-stretch pb-4 border-b border-zinc-800 inline-flex justify-between items-center cursor-pointer"
        onClick={handleToggleSection}
      >
        <div className="justify-start text-neutral-50 text-xl font-medium font-['Poppins'] leading-8">
          {internalTitle}
        </div>
        <ChevronDown
          className={`text-zinc-400 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {isExpanded && (
        <>
          <div className="self-stretch inline-flex justify-start items-center gap-6">
            <div className="flex-1 flex justify-start items-center gap-3">
              <div className="justify-start text-neutral-50 text-sm font-medium font-['Poppins']">
                Section Title
              </div>
              <div className="flex-1 pl-6 pr-4 py-3 relative bg-zinc-800 rounded-xl outline-1 -outline-offset-0.5 outline-zinc-700">
                <input
                  type="text"
                  value={internalTitle}
                  onChange={(e): void => handleTitleChange(e.target.value)}
                  placeholder="Section Title"
                  className="w-full bg-transparent text-neutral-50 text-base font-normal font-['Poppins'] leading-6 outline-none"
                />
              </div>
            </div>
            {onDeleteSection && (
              <button
                type="button"
                onClick={handleDeleteSection}
                className="flex justify-start items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="justify-start text-[#e62f29] text-sm font-medium font-['Poppins']">
                  Remove or Delete Section
                </div>
                <Trash className="text-red-500 w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="self-stretch relative bg-zinc-800 rounded-xl outline-1 -outline-offset-1 outline-zinc-700 px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M10.5404 19.2499C15.3498 19.2499 19.2487 15.3511 19.2487 10.5416C19.2487 5.73211 15.3498 1.83325 10.5404 1.83325C5.73088 1.83325 1.83203 5.73211 1.83203 10.5416C1.83203 15.3511 5.73088 19.2499 10.5404 19.2499Z"
                    stroke="#727A8F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.1654 20.1666L18.332 18.3333"
                    stroke="#727A8F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                value={query}
                onChange={handleSearchChange}
                placeholder="Search blogs"
                className="bg-transparent outline-none text-neutral-50 placeholder:text-zinc-500 w-full"
                aria-label="Search blogs"
              />
            </div>

            {/* Search Results Dropdown */}
            {showResults && (query.trim() || searchResults.length > 0) && (
              <div className="absolute top-full mt-2 w-full bg-zinc-800 rounded-xl outline-1 outline-zinc-700 shadow-lg z-10 max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="px-4 py-2 text-zinc-400 text-sm">Searching...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((blog) => (
                    <button
                      key={blog._id || blog.blogId}
                      type="button"
                      onClick={(): void => handleAddBlog(blog)}
                      className="w-full text-left px-4 py-2 hover:bg-zinc-700 transition-colors flex items-center gap-3"
                    >
                      {blog.blogHeroImage && (
                        <img
                          src={blog.blogHeroImage}
                          alt={blog.blogHeading || blog.title || "Blog"}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <div className="text-neutral-50 text-sm font-medium">
                          {blog.blogHeading || blog.title || "Untitled Blog"}
                        </div>
                        <div className="text-zinc-400 text-xs">
                          {blog.blogCategory || blog.category || "Blog"}
                        </div>
                      </div>
                    </button>
                  ))
                ) : query.trim() ? (
                  <div className="px-4 py-2 text-zinc-400 text-sm">No blogs found</div>
                ) : null}
              </div>
            )}
          </div>

          {/* Selected Blogs Grid */}
          {selectedBlogs.length > 0 && (
            <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedBlogs.map((blog) => (
                <div key={blog.blogId || blog._id} className="relative">
                  <button
                    type="button"
                    onClick={(): void => handleRemoveBlog(blog.blogId || blog._id)}
                    className="absolute top-2 right-2 z-10 w-6 h-6 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Remove blog"
                  >
                    <X className="text-white w-4 h-4" />
                  </button>
                  <BlogsCard
                    id={blog.blogId || blog._id}
                    title={blog.title}
                    description={blog.description}
                    imageUrl={blog.image}
                    featured={blog.featured}
                    views={blog.viewCount}
                    tags={blog.tags}
                    readTime={blog.readingTime}
                    date={blog.date}
                    variant="compact"
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

