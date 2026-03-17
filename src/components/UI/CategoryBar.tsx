"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSelectedCategory } from "@/lib/features/blogSlice";

const categories = ["All", "Tech", "Design", "Lifestyle", "Tutorial"];

export default function CategoryBar() {
  const dispatch = useAppDispatch();

  // Get current category from Redux to handle the "active" styling
  const selectedCategory = useAppSelector(
    (state) => state.blog.selectedCategory,
  );

  return (
    <div className="p-4 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 w-full lg:w-auto">
      {categories.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => dispatch(setSelectedCategory(category))}
            className={`
              whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-600 ring-offset-2"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"
              }
            `}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
