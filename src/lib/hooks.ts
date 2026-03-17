import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "@/store/store";

/**
 * Use throughout your app instead of plain `useDispatch` and `useSelector`
 * This provides full TypeScript autocompletion for your global state.
 */

// Use for sending actions to the store
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Use for selecting data from the store (e.g., state.blog.posts)
export const useAppSelector = useSelector.withTypes<RootState>();

// Use if you need access to the store instance itself
export const useAppStore = useStore.withTypes<AppStore>();
