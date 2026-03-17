"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { ChevronLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import Link from "next/link";

export default function BlogDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  // Find the specific post in the Redux store
  const post = useAppSelector((state) =>
    state.blog.posts.find((p) => p.id === id),
  );

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Post not found</h2>
        <Link
          href="/my-blogs"
          className="text-blue-600 font-bold hover:underline"
        >
          Back to the archive
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      {/* Navigation */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-8 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold text-sm">Back</span>
      </button>

      {/* Header */}
      <header className="mb-12">
        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
          {post.category}
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-500 border-y border-gray-100 py-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-sm font-bold text-gray-900">
              {post.author}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            {post.date}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter">
        <p className="text-xl leading-relaxed text-gray-600 mb-8 font-medium italic border-l-4 border-blue-600 pl-6">
          {post.excerpt}
        </p>
        <div className="whitespace-pre-wrap text-gray-800 leading-extra-loose text-lg">
          {post.content}
        </div>
      </div>

      {/* Footer Actions */}
      <footer className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <Link
          href="/my-blogs"
          className="text-sm font-black text-blue-600 uppercase tracking-widest hover:text-blue-700"
        >
          Next Story →
        </Link>
      </footer>
    </article>
  );
}
