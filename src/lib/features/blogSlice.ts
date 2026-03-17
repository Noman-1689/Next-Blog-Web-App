import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "@/types";

const CATEGORIES = ["Tech", "Design", "Lifestyle", "Tutorial"];

const AUTHORS = [
  "Sarah Drasner",
  "Dan Abramov",
  "Jane Doe",
  "Marc Lou",
  "Eva Joy",
  "Lee Robinson",
];

const generateDummyData = (count: number): Post[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString();
    const category = CATEGORIES[i % CATEGORIES.length];
    const readTimeValue = (i % 7) + 3;

    return {
      id,
      title: `Exploring the Depth of ${category} Vol. ${id}`,
      excerpt: `This is a deep dive into the ${
        i % 2 === 0 ? "future" : "fundamentals"
      } of ${category.toLowerCase()} in 2026. Discover how modern systems are evolving.`,
      content: "Full content would go here...",
      author: AUTHORS[i % AUTHORS.length],
      date: `Feb ${Math.min(28, i + 1)}, 2026`,
      category: category as any,
      readTime: `${readTimeValue} min read`,
      image: `https://picsum.photos/seed/${id}/800/600`,
    };
  });
};

interface BlogState {
  posts: Post[];
  searchQuery: string;
  selectedCategory: string; // Track active category filter
  currentPage: number;
}

const initialState: BlogState = {
  posts: generateDummyData(40),
  searchQuery: "",
  selectedCategory: "All", // Default state
  currentPage: 1,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to page 1 during search
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1; // Reset to page 1 when switching categories
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
      // Optional: Reset filters so the user sees their new post at the top
      state.searchQuery = "";
      state.selectedCategory = "All";
      state.currentPage = 1;
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setPosts,
  setSearchQuery,
  setSelectedCategory,
  addPost,
  deletePost,
  setCurrentPage,
} = blogSlice.actions;

export default blogSlice.reducer;
