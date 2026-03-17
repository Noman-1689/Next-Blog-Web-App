import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import CategoryBar from "@/components/UI/CategoryBar";
import PostCard from "@/components/UI/PostCard";
import { Post } from "@/types";

const FEATURED_POST: Post = {
  id: "featured-1",
  title: "The Shift to Edge Computing in 2026: Why Latency is the New Currency",
  excerpt:
    "As we move further into the decade, the centralized cloud is giving way to a more distributed approach. Discover why edge computing is no longer optional for high-performance apps.",
  author: "Sarah Drasner",
  date: "Feb 18, 2026",
  category: "Tech",
  readTime: "8 min read",
  content: "",
};

const POSTS: Post[] = [
  {
    id: "1",
    title: "Mastering TypeScript 5.5 Features",
    excerpt:
      "A deep dive into the latest TS updates including improved type checking...",
    author: "Dan Abramov",
    date: "Feb 15, 2026",
    category: "Tech",
    readTime: "5 min read",
    content: "",
  },
  {
    id: "2",
    title: "Design Systems for Scale",
    excerpt:
      "How to build a UI library that survives multiple product iterations...",
    author: "Jane Doe",
    date: "Feb 12, 2026",
    category: "Design",
    readTime: "12 min read",
    content: "",
  },
  {
    id: "3",
    title: "The Rise of AI-Driven UX",
    excerpt:
      "Predictive interfaces are changing how users interact with dashboard apps...",
    author: "Marc Lou",
    date: "Feb 10, 2026",
    category: "Tech",
    readTime: "7 min read",
    content: "",
  },
  {
    id: "4",
    title: "Minimalism in Modern Web",
    excerpt:
      "Why 'less is more' is becoming the dominant aesthetic for 2026 startups...",
    author: "Eva Joy",
    date: "Feb 08, 2026",
    category: "Lifestyle",
    readTime: "4 min read",
    content: "",
  },
];

export default function Home() {
  return (
    /* THE FIX: added 'max-w-7xl', 'mx-auto', and 'px-4 sm:px-6 lg:px-8' 
       This ensures content never touches the screen edges.
    */
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-20">
      {/* 1. Hero Section */}
      <section className="relative group cursor-pointer overflow-hidden rounded-4xl bg-gray-900 text-white mt-8">
        <div className="absolute inset-0 opacity-60 group-hover:scale-105 transition-transform duration-700 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

        <div className="relative p-6 md:p-16 flex flex-col justify-end min-h-125 max-w-3xl">
          <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold uppercase tracking-widest text-xs">
            <TrendingUp className="w-4 h-4" />
            Featured Story
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            {FEATURED_POST.title}
          </h1>
          <p className="text-gray-300 text-lg mb-8 line-clamp-2">
            {FEATURED_POST.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href={`/blog/${FEATURED_POST.id}`}
              className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-black/20"
            >
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="text-sm text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />{" "}
              {FEATURED_POST.readTime}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category & Header Row */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Popular Topics
        </h2>
        <CategoryBar />
      </div>

      {/* 3. Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Side: Posts Grid */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="text-xl font-bold text-gray-800">Latest Articles</h3>
            <Link
              href="/archive"
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              View Archive
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <button className="px-10 py-4 border-2 border-gray-200 rounded-full font-bold text-gray-700 hover:border-black hover:text-black transition-all">
              Load More Stories
            </button>
          </div>
        </div>

        {/* Right Side: Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          {/* Join Community Card */}
          <div className="bg-blue-600 p-8 rounded-4xl text-white shadow-xl shadow-blue-200">
            <h4 className="font-bold text-2xl mb-4">Join the Community</h4>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Get exclusive access to our coding workshops and monthly technical
              deep-dives.
            </p>
            <Link
              href="/register"
              className="block text-center bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
            >
              Create an Account
            </Link>
          </div>

          {/* Trending Section */}
          <div className="bg-white border border-gray-100 p-8 rounded-4xl shadow-sm">
            <h4 className="font-bold text-lg mb-8 flex items-center gap-2 text-gray-900">
              <TrendingUp className="w-5 h-5 text-red-500" />
              Trending Now
            </h4>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <span className="text-3xl font-black text-gray-100 group-hover:text-blue-200 transition-colors">
                    0{i}
                  </span>
                  <div>
                    <h5 className="font-bold text-sm leading-snug group-hover:text-blue-600 transition-colors">
                      Why React 19 is going to change state management forever.
                    </h5>
                    <span className="text-xs text-gray-400 font-medium mt-1 inline-block">
                      2.4k reads
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
