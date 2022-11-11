import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice";
// import clientTransactionSlice from "./transactionSlice";
const store = configureStore({
  reducer: {
    generalSlice,
    // clientTransactionSlice,
  },
});

export default store;
