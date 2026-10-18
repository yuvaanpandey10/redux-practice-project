import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "media-collection";

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const persist = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage full or blocked, ignore
  }
};

const collectionSlice = createSlice({
  name: "collection",
  initialState: { items: load() },
  reducers: {
    toggleCollection(state, action) {
      const index = state.items.findIndex(
        (i) => i.id === action.payload.id && i.type === action.payload.type,
      );
      if (index >= 0) state.items.splice(index, 1);
      else state.items.unshift(action.payload);
      persist(state.items);
    },
    clearCollection(state) {
      state.items = [];
      persist([]);
    },
  },
});

export const { toggleCollection, clearCollection } = collectionSlice.actions;
export default collectionSlice.reducer;