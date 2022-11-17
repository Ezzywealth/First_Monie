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

const CreateRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loadingState = useSelector((state) => state.generalSlice.loadingState);
  const dispatch = useDispatch();
  const otpModal = useSelector((state) => state.generalSlice.otpModal);

  const formHandler = ({ account_name, amount, account_number }) => {
    dispatch(startLoading());
    dispatch(setTransactionDetails({ account_name, account_number, amount }));
    setTimeout(() => {
      dispatch(stopLoading());
    }, 3000);
    dispatch(openOtpModal());
    document.getElementById("form7").reset();
  };

  if (loadingState) {
    return (
      <div className='flex justify-center bg-indigo-50 items-center h-screen w-full'>
        <BeatLoader
          color='indigo'
          loading={loadingState}
          size={10}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    );
  }

  return (
    <Layout title='createRequest'>
      <div className='pt-16 px-3 md:px-8 lg:px-16 mt-16 md:mt-8 bgContact'>
        <div
          className={`customTransition ${
            otpModal ? "fixed left-0 right-0 top-[100px]" : "hidden top-0"
          }`}
        >
          <TransferResponse />
        </div>

        <h2 className='px-8 font-semibold text-2xl text-gray-500'>
          Request Now
        </h2>
        <form
          id='form7'
          className='px-4 md:px-8 lg:px-16 border border-solid border-gray-200 m-8 mt-2 py-8'
          //   onSubmit={handleSubmit(formHandler)}
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
            <div className='flex flex-col font-semibold space-y-2 mb-4'>
              <label htmlFor=''>Description</label>
              <textarea
                type='number'
                placeholder='Enter request descriptions'
                rows={4}
                className='font-normal text-sm'
                {...register("description", {
                  required: "please enter an amount to send",
                })}
              />

              {errors.description && (
                <span className='text-red-500'>
                  {errors.description.message}
                </span>
              )}
            </div>
            <div>
              <button
                disabled
                className='bg-gray-400 p-2 w-full text-white rounded-lg hover:scale-105 customTransition'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

CreateRequest.auth = true;
export default CreateRequest;
