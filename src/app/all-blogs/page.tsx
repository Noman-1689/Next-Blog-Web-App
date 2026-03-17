"use client";

import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Inbox,
  Clock,
  User,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import CategoryBar from "@/components/UI/CategoryBar";
import { getPostData } from "@/api/api";
import { Post } from "@/types";

export default function AllBlogsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPostData(page),
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="font-bold text-gray-400 animate-pulse">
          Fetching from Archive...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-24 text-center">
        <p className="text-red-500 font-bold mb-4">Error: {error.message}</p>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ["posts"] })}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  // DATA FIX: Destructuring based on your console image
  // The posts are inside data.blogs, and we can get totalPages for pagination
  const posts = data?.blogs || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="pb-24 px-4 md:px-8 max-w-7xl mx-auto">
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
          Showing{" "}
          <span className="text-gray-900 font-bold">
            {data?.totalBlogs || 0}
          </span>{" "}
          stories across our engineering and design libraries.
        </p>
      </header>

      {/* Control Bar */}
      <div className="relative border-b border-gray-50 py-8 mb-12">
        <div className="flex flex-col xl:flex-row gap-8 justify-between items-center">
          {/* Fix: Added p-1 and overflow-visible so the blue focus ring isn't cut off */}
          <div className="w-full xl:w-auto p-1 overflow-visible">
            <CategoryBar />
          </div>

          <div className="flex w-full xl:max-w-md gap-3">
            <div className="relative grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search topics..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
              />
            </div>
            <button className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Post Grid */}
      {posts.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {posts.map((post: Post, index: number) => (
            <article
              key={`${post.id}-${index}`}
              className="group relative flex flex-col"
            >
              <Link
                href={`/my-blogs/${post.id}`}
                className="block overflow-hidden rounded-[2.5rem] bg-gray-100 mb-6 relative aspect-[4/3] shadow-sm"
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />

                <span className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                  {post.category || "Article"}
                </span>

                <img
                  src={
                    post.image ||
                    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop"
                  }
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-white p-3 rounded-full shadow-xl">
                    <ArrowUpRight className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </Link>

              <div className="flex flex-col grow px-2">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                    <User className="w-3.5 h-3.5 text-blue-500" />
                    {post.author || "Admin"}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    {post.readTime || "5 min read"}
                  </div>
                </div>

                <h3 className="text-2xl font-black leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3">
                  <Link href={`/my-blogs/${post.id}`}>{post.title}</Link>
                </h3>

                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4 font-medium">
                  {post.excerpt ||
                    (post.content
                      ? post.content.substring(0, 100) + "..."
                      : "Explore this story in the full article.")}
                </p>

                <div className="mt-auto">
                  <Link
                    href={`/my-blogs/${post.id}`}
                    className="text-xs font-black uppercase tracking-widest text-gray-900 group-hover:text-blue-600 inline-flex items-center gap-2 transition-colors"
                  >
                    Read Article
                    <div className="w-6 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <Inbox className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900">No posts found</h3>
        </div>
      )}

      {/* Pagination using Dynamic totalPages */}
      <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setPage((p) => Math.max(1, p - 1));
              window.scrollTo(0, 0);
            }}
            disabled={page === 1}
            className="p-3 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {/* Show current page and surrounding pages */}
            {[page - 1, page, page + 1]
              .filter((n) => n > 0 && n <= totalPages)
              .map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setPage(num);
                    window.scrollTo(0, 0);
                  }}
                  className={`w-12 h-12 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    page === num
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-white border border-gray-100 text-gray-600 hover:border-blue-400"
                  }`}
                >
                  {num}
                </button>
              ))}
          </div>

          <button
            onClick={() => {
              setPage((p) => Math.min(totalPages, p + 1));
              window.scrollTo(0, 0);
            }}
            disabled={page === totalPages}
            className="p-3 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm font-medium text-gray-400">
          Page <span className="text-gray-900 font-bold">{page}</span> of{" "}
          <span className="text-gray-900 font-bold">{totalPages}</span>
        </p>
      </div>
    </div>
  );
}
