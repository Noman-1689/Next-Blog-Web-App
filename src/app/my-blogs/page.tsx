"use client";

import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Inbox,
} from "lucide-react";
import CategoryBar from "@/components/UI/CategoryBar";
import PostCard from "@/components/UI/PostCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSearchQuery, setCurrentPage } from "@/lib/features/blogSlice";
import { Post } from "@/types";

export default function AllBlogsPage() {
  const dispatch = useAppDispatch();
  const itemsPerPage = 10;

  const {
    posts = [],
    searchQuery = "",
    selectedCategory = "All",
    currentPage = 1,
  } = useAppSelector((state) => state.blog);

  const allFiltered = posts.filter((post: Post) => {
    const currentCat = selectedCategory || "All";
    const matchesCategory = currentCat === "All" || post.category === currentCat;
    const matchesSearch = (post.title || "")
      .toLowerCase()
      .includes((searchQuery || "").toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(allFiltered.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedPosts = allFiltered.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pb-24">
      {/* Header Section */}
      <header className="py-16 md:py-20 border-b border-gray-100">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-4">
          <BookOpen className="w-4 h-4" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-6">
          The <span className="text-blue-600">Archive</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
          Showing <span className="text-gray-900 font-bold">{selectedCategory || "All"}</span> stories — Page <span className="text-gray-900 font-bold">{currentPage}</span> of <span className="text-gray-900 font-bold">{totalPages}</span>
        </p>
      </header>

      {/* Control Bar - Padding adjusted to prevent clipping */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-50 py-4 mb-12">
        <div className="flex flex-col xl:flex-row gap-6 justify-between items-center px-1">
          
          {/* Category List - Added internal vertical padding */}
          <div className="w-full xl:w-auto min-w-0 py-2">
             <CategoryBar />
          </div>

          {/* Search Tools */}
          <div className="flex w-full xl:max-w-md gap-3 py-2">
            <div className="relative grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                placeholder={`Search in ${(selectedCategory || "All").toLowerCase()}...`}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium text-gray-900"
              />
            </div>
            <button className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition shadow-sm shrink-0">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      {displayedPosts.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {displayedPosts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <Inbox className="w-12 h-12 text-gray-200" />
          <h3 className="text-xl font-bold text-gray-900">No matches found</h3>
          <button
            onClick={() => dispatch(setSearchQuery(""))}
            className="px-6 py-2 bg-white border border-gray-200 rounded-full text-blue-600 font-bold hover:bg-blue-50 transition-colors text-sm"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {allFiltered.length > itemsPerPage && (
        <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl text-sm font-bold transition-all ${
                    currentPage === num
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-white border border-gray-100 text-gray-600 hover:border-blue-400"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}