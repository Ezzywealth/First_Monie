import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isSidebarOpen: false,
  loadingState: false,
  otpCode: 0,
  otpModal: false,
  transactionDetails: {},
  transactionStatement: {},
  activeNavLink: "",
  isAdminSidebarOpen: false,
  loanResponse: false,
  loanDetails: {},
  loanAmount: 0,
  supportModal: false,
  user: {},
  welcomeModal: false,
  loginDetails: {},
  account_balance: 0,
  transactions: [],
  transactions_loading: false,
  transactions_error: "",
  countdownTimer: false,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (id) => {
    const { data } = await axios.post(`/api/transactions/fetchTransactions`, {
      id,
    });
    return data;
  }
);

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
    setOtpCode: (state, action) => {
      state.otpCode = action.payload;
    },
    setTransactionDetails: (state, action) => {
      state.transactionDetails = action.payload;
    },
    setTransactionStatement: (state, action) => {
      state.transactionStatement = action.payload;
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
    setLoginDetails: (state, action) => {
      state.loginDetails = action.payload;
    },
    setAccountBalance: (state, action) => {
      state.account_balance = action.payload;
    },
    startCountdownTimer: (state, action) => {
      state.countdownTimer = true;
    },
    stopCountdownTimer: (state, action) => {
      state.countdownTimer = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.transactions_loading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      (state.transactions_loading = false),
        (state.transactions = action.payload),
        (state.transactions_error = "");
    });
    builder.addCase(fetchTransactions.rejected, (state) => {
      (state.transactions_loading = false),
        (state.transactions = []),
        (state.transactions_error =
          "There was an error fetching the transactions");
    });
  },
});

export default generalSlice.reducer;
export const {
  setTransactionStatement,
  setAccountBalance,
  openSidebar,
  closeSidebar,
  startLoading,
  stopLoading,
  setLoginDetails,
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
  setOtpCode,
  startCountdownTimer,
  stopCountdownTimer,
} = generalSlice.actions;
