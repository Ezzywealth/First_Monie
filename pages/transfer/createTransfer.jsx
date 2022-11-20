import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import TransferResponse from "../../components/transactions/transferResponse";
import { useDispatch, useSelector } from "react-redux";
import {
  openOtpModal,
  setTransactionDetails,
  startLoading,
  stopLoading,
} from "../../Redux/generalSlice";
import { BeatLoader } from "react-spinners";
import { useState } from "react";

const CreateTransfer = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loadingState = useSelector((state) => state.generalSlice.loadingState);
  const otpModal = useSelector((state) => state.generalSlice.otpModal);

  const formHandler = ({ account_name, amount, account_number }) => {
    setLoading(true);
    dispatch(setTransactionDetails({ account_name, account_number, amount }));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setTimeout(() => {
      dispatch(openOtpModal());
    }, 5000);
    document.getElementById("myForm").reset();
  };

  if (loading) {
    return (
      <div className='flex justify-center bg-indigo-50 items-center h-screen w-full'>
        <BeatLoader
          color='indigo'
          loading={loading}
          size={10}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    );
  }

  return (
    <Layout title='createTransaction'>
      <div className='pt-16 px-4 md:px-8 lg:px-16 mt-32 md:mt-8 bgContact'>
        <div
          className={`customTransition ${
            otpModal
              ? "fixed left-0 right-0 top-[90px]"
              : "fixed left-0 right-0 -top-[1000px]"
          }`}
        >
          <TransferResponse />
        </div>

        <h2 className=' font-semibold text-2xl text-gray-500'>Send Money</h2>
        <form
          id='myForm'
          className='px-4 md:px-8 lg:px-16 border border-solid border-gray-200 my-8 mt-2 py-8'
          onSubmit={handleSubmit(formHandler)}
        >
          <div>
            <div className='flex flex-col font-semibold space-y-2 mb-4'>
              <label htmlFor='account_name'>Account Number</label>
              <input
                placeholder='000.0000.0000'
                type='text'
                className='p-2 focus:outline-none border-solid font-normal border text-sm rounded-lg'
                id='account_name'
                {...register("account_number", {
                  required: "Please enter receiver's account number",
                })}
              />
              {errors.account_number && (
                <span className='text-red-500'>
                  {errors.account_number.message}
                </span>
              )}
            </div>
            <div className='flex flex-col font-semibold space-y-2 mb-4'>
              <label htmlFor='amount'>Account Name</label>
              <input
                type='text'
                className='font-normal text-sm'
                placeholder='eg. John Doe'
                id='amount'
                {...register("account_name", {
                  required: "please enter receivers account name",
                })}
              />
              {errors.account_name && (
                <span className='text-red-500'>
                  {errors.account_name.message}
                </span>
              )}
            </div>
            <div className='flex flex-col font-semibold space-y-2 mb-4'>
              <label htmlFor=''>Amount</label>
              <input
                type='number'
                placeholder='receiver account details'
                className='font-normal text-sm'
                {...register("amount", {
                  required: "please enter an amount to send",
                })}
              />

              {errors.amount && (
                <span className='text-red-500'>{errors.amount.message}</span>
              )}
            </div>
            <div>
              <button className='bg-indigo-700 p-2 w-full text-white rounded-lg hover:scale-105 customTransition'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

CreateTransfer.auth = true;
export default CreateTransfer;
