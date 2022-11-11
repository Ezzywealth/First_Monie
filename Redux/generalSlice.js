import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
};

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    openSidebar: (state, action) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state, action) => {
      state.isSidebarOpen = false;
    },
  },
});

export default generalSlice.reducer;
export const { openSidebar, closeSidebar } = generalSlice.actions;
