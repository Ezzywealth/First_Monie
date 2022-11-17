import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
  loadingState: false,
  userCode: 0,
  otpModal: false,
  transactionDetails: {},
  activeNavLink: "",
  isAdminSidebarOpen: false,
  loanResponse: false,
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
    closeAdminSidebar: (state, action) => {
      state.isAdminSidebarOpen = false;
    },
    openAdminSidebar: (state, action) => {
      state.isAdminSidebarOpen = true;
    },
    setLoanTrue: (state, action) => {
      state.loanResponse = true;
    },
    setLoanFalse: (state, action) => {
      state.loanResponse = false;
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
  closeAdminSidebar,
  openAdminSidebar,
  setLoanFalse,
  setLoanTrue,
} = generalSlice.actions;
