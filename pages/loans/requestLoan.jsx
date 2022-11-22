import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { BiCheck } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";

import LoanResponse from "../../components/transactions/loanRequestResponse";
import { setLoanDetails, setLoanTrue } from "../../Redux/generalSlice";
import { loanData } from "../../utils/constants";

const RequestLoan = () => {
  const dispatch = useDispatch();
  const loanResponse = useSelector((state) => state.generalSlice.loanResponse);

  const handleApply = (item) => {
    dispatch(setLoanTrue());
    dispatch(setLoanDetails(item));
  };
  return (
    <Layout title='Request Loan'>
      <div className='bg-gray-50 mt-[160px] py-16'>
        {loanResponse && (
          <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-100 bg-opacity-50'>
            <LoanResponse />
          </div>
        )}
        <h2 className='font-semibold text-2xl text-gray-500 px-4 md:px-8 lg:px-16 mb-4'>
          Loan Plans
        </h2>
        <section>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 md:px-8 lg:px-16'>
            {loanData.map((item) => (
              <div
                key={item.id}
                className='shadow-lg rounded-lg bg-white p-4 space-y-8 divide-y hover:bg-blue-800  hover:scale-105 customTransition'
              >
                <div className='flex justify-between gap-3 items-center  '>
                  <span className='font-semibold text-xl'>{item.type}</span>
                  <span className='bg-indigo-50 p-3 rounded-lg text-center font-semibold'>
                    {item.percent} <br />{" "}
                    <h4 className='text-gray-400'>Per Installment</h4>
                  </span>
                </div>
                <div className='space-y-3 pt-4'>
                  <div className='flex justify-between'>
                    <span className='flex gap-2 items-center'>
                      <span className='border-orange-500 border-solid rounded-full border h-4 w-4 flex justify-center items-center'>
                        {" "}
                        <BiCheck className='text-green-500 ' />{" "}
                      </span>
                      Minimun Amount
                    </span>
                    <span>
                      {" "}
                      <CurrencyFormat
                        value={parseInt(item.minimum)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='flex gap-2 items-center'>
                      <span className='border-orange-500 border-solid rounded-full border h-4 w-4 flex justify-center items-center'>
                        {" "}
                        <BiCheck className='text-green-500' />
                      </span>{" "}
                      Maximum Amount
                    </span>
                    <span>
                      {" "}
                      <CurrencyFormat
                        value={parseInt(item.maximum)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='flex gap-2 items-center'>
                      <span className='border-orange-500 border-solid rounded-full border h-4 w-4 flex justify-center items-center'>
                        <BiCheck className='text-green-500' />
                      </span>
                      Installment Interval
                    </span>
                    <span>{item.installment}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='flex gap-2 items-center'>
                      <span className='border-orange-500 border-solid rounded-full border h-4 w-4 flex justify-center items-center'>
                        <BiCheck className='text-green-500' />
                      </span>{" "}
                      Total Installment
                    </span>
                    <span>{item.total}</span>
                  </div>
                </div>
                <button
                  className='bg-green-500 w-full text-white rounded-lg px-3 py-2 hover:scale-105 customTransition'
                  onClick={() => handleApply(item)}
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RequestLoan;
