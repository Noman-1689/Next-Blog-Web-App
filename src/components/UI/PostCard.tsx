import { Post } from "@/types";
import { Clock, User, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative flex flex-col">
      {/* Image Container */}
      <Link
        href={`/my-blogs/${post.id}`}
        className="block overflow-hidden rounded-4xl bg-gray-100 mb-6 relative aspect-4/3"
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />

        {/* Floating Category Tag */}
        <span className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
          {post.category}
        </span>

        {/* The Blog Image */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Hover Icon */}
        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="bg-white p-3 rounded-full shadow-xl">
            <ArrowUpRight className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex flex-col grow px-2">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-tight">
            <User className="w-3.5 h-3.5 text-blue-500" />
            {post.author}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-tight">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            {post.readTime}
          </div>
        </div>

        <h3 className="text-2xl font-black leading-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3">
          <Link href={`/my-blogs/${post.id}`}>{post.title}</Link>
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
          {post.excerpt}
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
  );
}
