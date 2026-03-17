"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ImagePlus,
  Type,
  Hash,
  Eye,
  Send,
  ChevronLeft,
  AlignLeft,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { addPost } from "@/lib/features/blogSlice";
import { Post } from "@/types";

export default function WritePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Form States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Tech");
  const [image, setImage] = useState<string>(
    `https://picsum.photos/seed/${Date.now()}/800/600`,
  );
  const [isPublishing, setIsPublishing] = useState(false);

  // Calculate read time based on word count
  const calculateReadTime = () => {
    const wordsPerMinute = 200;
    const noOfWords = content.split(/\s+/).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return `${content.length > 0 ? minutes : 0} min read`;
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || title.length < 5) {
      return toast.error("Please enter a compelling title!");
    }
    if (content.length < 20) {
      return toast.error("Your story is a bit too short!");
    }

    setIsPublishing(true);

    // Prepare the new post object
    const newPost: Post = {
      id: Date.now().toString(), // Unique ID based on timestamp
      title,
      excerpt: content.substring(0, 120) + "...", // Auto-generate excerpt
      content,
      author: "Guest Author", // In a real app, this would come from Auth
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      category: category as any,
      readTime: calculateReadTime(),
      image: image,
    };

    // Dispatch to Redux
    setTimeout(() => {
      dispatch(addPost(newPost));
      toast.success("Article published successfully! 🚀");
      setIsPublishing(false);
      router.push("/my-blogs"); // Redirect to the archive to see the new post
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors group"
        >
          <div className="p-2 group-hover:bg-gray-100 rounded-full transition">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="text-sm font-semibold">Back to Feed</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition"
            onClick={() => toast.info("Draft saved to browser cache.")}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className={`
              flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg
              ${
                isPublishing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 hover:-translate-y-0.5"
              }
            `}
          >
            <Send className="w-4 h-4" />
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <form className="space-y-8" onSubmit={handlePublish}>
        {/* Image Upload Area */}
        <div className="relative group cursor-pointer border-2 border-dashed border-gray-200 rounded-[2.5rem] h-64 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-blue-50/50 hover:border-blue-300 transition-all duration-300 overflow-hidden">
          {image.includes("picsum") ? (
            <div className="text-center">
              <div className="bg-white p-4 rounded-2xl shadow-sm mb-3 inline-block group-hover:scale-110 transition-transform">
                <ImagePlus className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm font-bold text-gray-600">
                Drop your cover image here
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG or WEBP (Max 5MB)
              </p>
            </div>
          ) : (
            <img
              src={image}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImage(URL.createObjectURL(file));
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="p-8 md:p-12 space-y-10">
            {/* Title Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600">
                <Type className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Headline
                </span>
              </div>
              <textarea
                placeholder="The title of your story..."
                rows={1}
                className="w-full text-4xl md:text-5xl font-black bg-transparent outline-none resize-none placeholder:text-gray-200 text-gray-900 border-b border-gray-50 focus:border-blue-100 pb-4 transition-colors"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Category & Metadata Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50/50 rounded-3xl border border-gray-100/50">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <Hash className="w-3 h-3" />
                  Select Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                >
                  <option>Tech</option>
                  <option>Design</option>
                  <option>Lifestyle</option>
                  <option>Tutorial</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Estimated Stats
                </label>
                <div className="h-11.5 flex items-center px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-blue-600">
                  {calculateReadTime()}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600">
                <AlignLeft className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Content
                </span>
              </div>
              <textarea
                placeholder="Start typing your masterpiece..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-100 text-lg leading-relaxed bg-transparent outline-none resize-none placeholder:text-gray-200 text-gray-700 p-4 border border-gray-50 focus:border-blue-50 rounded-2xl transition-all focus:bg-gray-50/30"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
