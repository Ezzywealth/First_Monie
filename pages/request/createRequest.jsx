import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import TransferResponse from "../../components/transactions/transferResponse";
import { useDispatch, useSelector } from "react-redux";
import { openOtpModal, setTransactionDetails } from "../../Redux/generalSlice";
import { BeatLoader } from "react-spinners";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const CreateRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const loadingState = useSelector((state) => state.generalSlice.loadingState);
  const dispatch = useDispatch();
  const otpModal = useSelector((state) => state.generalSlice.otpModal);
  const user = useSelector((state) => state.generalSlice.user);

  const formHandler = ({ account_name, amount, account_number }) => {
    if (user.account_status === "hold") {
      toast.error(
        "Your account is on hold temporarily, kindly contact our customer service to resolve this issue"
      );
      return;
    }
    setLoading(true);
    const min = 135699;
    const max = 999999;
    const randomNumb = Math.floor(Math.random() * (max - min) + min);
    dispatch(setOtpCode(randomNumb));
    const templateParams = {
      subject: "Account Login",
      message: `${session?.user.email} wants to make a transfer, Your one time Password (OTP) to activate this transfer is ${randomNumb}`,
    };
    emailjs
      .send(
        "service_ct8x3bf",
        "template_lv24jqs",
        templateParams,
        "vngt2iIdOB55EqdDp"
      )
      .then(
        (response) => {
          console.log(`SUCCESS, Your otp was sent successfully`);
          console.log(randomNumb);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
    dispatch(setTransactionDetails({ account_name, account_number, amount }));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setTimeout(() => {
      dispatch(openOtpModal());
    }, 5000);
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
      <div className='pt-16 px-3 md:px-8 lg:px-16 mt-[160px] bgContact'>
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
                type='submit'
                className='bg-blue-600 p-2 w-full text-white rounded-lg hover:scale-105 customTransition'
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
