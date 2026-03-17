import { configureStore, combineReducers } from "@reduxjs/toolkit";
import blogReducer from "@/lib/features/blogSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // This uses localStorage

// 1. Combine all reducers (currently just blog)
const rootReducer = combineReducers({
  blog: blogReducer,
});

// 2. Configure Persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // You can whitelist specific slices you want to save
  whitelist: ["blog"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Create the Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // We must ignore these internal Redux Persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 4. Export the persistor
export const persistor = persistStore(store);

// Types for your hooks
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
