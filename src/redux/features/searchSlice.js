import { createSlice } from "@reduxjs/toolkit";
 
const RECENT_KEY = "recent-searches";
 
const loadRecent = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
 
const persistRecent = (list) => {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
};
 
const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    page: 1,
    hasMore: false,
    loading: false,
    loadingMore: false,
    error: null,
    recent: loadRecent(),
  },
  reducers: {
    searchStart(state) {
      state.loading = true;
      state.loadingMore = false;
      state.error = null;
      state.results = [];
      state.page = 1;
      state.hasMore = false;
    },
    loadMoreStart(state) {
      state.loadingMore = true;
    },
    searchSuccess(state, action) {
      const { items, page, hasMore, append } = action.payload;
      if (append) {
        const seen = new Set(state.results.map((r) => `${r.type}-${r.id}`));
        state.results.push(
          ...items.filter((r) => !seen.has(`${r.type}-${r.id}`)),
        );
      } else {
        state.results = items;
      }
      state.page = page;
      state.hasMore = hasMore;
      state.loading = false;
      state.loadingMore = false;
    },
    searchFail(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.loadingMore = false;
    },
    addRecent(state, action) {
      const v = action.payload;
      state.recent = [v, ...state.recent.filter((r) => r !== v)].slice(0, 8);
      persistRecent(state.recent);
    },
    clearRecent(state) {
      state.recent = [];
      persistRecent([]);
    },
  },
});
 
export const {
  searchStart,
  loadMoreStart,
  searchSuccess,
  searchFail,
  addRecent,
  clearRecent,
} = searchSlice.actions;
 
export default searchSlice.reducer;