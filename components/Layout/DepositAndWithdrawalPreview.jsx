import React from "react";
import { previewData } from "../../utils/constants";
import Button from "./Button";
import {
  cancelPreviewPage,
  openPaymentPage,
  closeWithdrawalPage,
} from "../../Redux/generalSlice";
import { useDispatch, useSelector } from "react-redux";
import { startDepositTransaction } from "../../Redux/transactionSlice";
import CurrencyFormat from "react-currency-format";
const DepositAndWithdrawalPreview = ({ transactionType, selectedPlan }) => {
  const dispatch = useDispatch();
  const investmentAmount = useSelector(
    (state) => state.clientTransactionSlice.investmentAmount
  );
  const handlePreviewclose = () => {
    dispatch(startDepositTransaction());
    setTimeout(() => {
      dispatch(closeWithdrawalPage());
      dispatch(openPaymentPage());
    }, 1000);
  };

  const handlePreviewData = (title) => {
    if (title === "Amount") {
      return (
        <CurrencyFormat
          value={investmentAmount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    } else if (title === "Charge") {
      return (
        <CurrencyFormat
          value={1.99}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    } else if (title === "Total") {
      return (
        <CurrencyFormat
          value={parseInt(investmentAmount) + 1.99}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    } else if (title === "Conversion Rate") {
      return "1USD to 1USD";
    } else if (title === "Package") {
      return selectedPlan;
    }
  };
  return (
    <div
      className={`w-full py-8 min-h-screen  px-4 bg-[rgba(0,0,0,0.01)] flex justify-center `}
    >
      <article
        className={`h-[60%]  flex flex-col gap-3 border-solid border-indigo-900 border  w-full  md:w-[40%] bg-gray-800 text-white `}
      >
        <div className='border-b flex justify-between p-4 border-white border-solid'>
          <h2 className='font-bold text-xl'>Your {transactionType} Details</h2>
          <span onClick={() => dispatch(cancelPreviewPage())}>X</span>
        </div>
        <div className='border m-4 rounded-lg border-solid border-indigo-900'>
          {previewData.map((data) => (
            <li
              key={data.id}
              className='flex gap-3 border-b border-solid border-indigo-900 p-2'
            >
              <span className='font-semibold text-md'>{data.title}:</span>
              <span className='text-indigo-300 text-base tracking-widest'>
                {handlePreviewData(data.title)}
              </span>
            </li>
          ))}
        </div>

        <Button title='Continue' onClick={handlePreviewclose} />
      </article>
    </div>
  );
};

export default DepositAndWithdrawalPreview;
