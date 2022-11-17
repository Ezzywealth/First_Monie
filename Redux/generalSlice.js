import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  loadingState: false,
  userCode: 0,
  otpModal: false,
  transactionDetails: {},
  activeNavLink: "",
};

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    openOtpModal: (state) => {
      state.otpModal = true;
    },
    closeOtpModal: (state) => {
      state.otpModal = false;
    },
    startLoading: (state) => {
      state.loadingState = true;
    },
    stopLoading: (state) => {
      state.loadingState = false;
    },
    setUserCode: (state, action) => {
      state.userCode = action.payload;
    },
    setTransactionDetails: (state, action) => {
      state.transactionDetails = action.payload;
    },
    setActiveNavLink: (state, action) => {
      state.activeNavLink = action.payload;
    },
  },
});

export default generalSlice.reducer;
export const {
  openSidebar,
  closeSidebar,
  startLoading,
  stopLoading,
  setUserCode,
  openOtpModal,
  closeOtpModal,
  setTransactionDetails,
  setActiveNavLink,
} = generalSlice.actions;
