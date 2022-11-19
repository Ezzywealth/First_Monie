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
  loanDetails: {},
  loanAmount: 0,
  supportModal: false,
  user: {},
  welcomeModal: false,
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
    closeSupportModal: (state, action) => {
      state.supportModal = false;
    },
    openSupportModal: (state, action) => {
      state.supportModal = true;
    },
    setLoanTrue: (state, action) => {
      state.loanResponse = true;
    },
    setLoanFalse: (state, action) => {
      state.loanResponse = false;
    },
    setLoanDetails: (state, action) => {
      state.loanDetails = action.payload;
    },
    setLoanAmount: (state, action) => {
      state.loanAmount = action.payload;
    },
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    openWelcomeModal: (state, action) => {
      state.welcomeModal = true;
    },
    closeWelcomeModal: (state, action) => {
      state.welcomeModal = false;
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
  setLoanDetails,
  setLoanAmount,
  openSupportModal,
  closeSupportModal,
  setUserDetails,
  closeWelcomeModal,
  openWelcomeModal,
} = generalSlice.actions;
