import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import WithdrawalResponse from "../../components/transactions/withdrawalResponse";
import { useDispatch, useSelector } from "react-redux";
import {
  openOtpModal,
  setOtpCode,
  setTransactionDetails,
} from "../../Redux/generalSlice";
import { useSession } from "next-auth/react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const CreateTransactionScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const otpModal = useSelector((state) => state.generalSlice.otpModal);
  const user = useSelector((state) => state.generalSlice.user);
  const { data: session } = useSession();
  const formHandler = async ({ method, amount }) => {
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
      message: `${session?.user.email} wants to make a withdrawal, Your one time Password (OTP) to activate this withdrawal is ${randomNumb}`,
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
    dispatch(setTransactionDetails({ method, amount }));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setTimeout(() => {
      dispatch(openOtpModal());
    }, 5000);

    setLoading(false);
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
      <div className='pt-16 px-16 mt-[160px]  '>
        <div
          className={`customTransition ${
            otpModal
              ? "fixed left-0 right-0 top-[160px]"
              : "fixed left-0 right-0 -top-[1000px]"
          }`}
        >
          <WithdrawalResponse />
        </div>
        <h2 className='px-8 font-semibold text-2xl'>Withdraw Now</h2>
        <form
          id='myForm'
          className='px-4 md:px-8 lg:px-16 border border-solid border-gray-200 m-8 mt-2 py-8'
          onSubmit={handleSubmit(formHandler)}
        >
          <div>
            <div className='flex flex-col font-semibold space-y-2 mb-4'>
              <label htmlFor='method'>Withdraw Method</label>
              <select
                type='text'
                className='p-2 focus:outline-none border-solid font-normal border text-sm rounded-lg'
                id='method'
                {...register("method", {
                  required: "Please select a withdrawal method",
                })}
              >
                <option value='paypal'>Paypal</option>
                <option value='ragpay'>Ragpay</option>
              </select>
            </div>
            <div className='flex flex-col font-semibold space-y-2 mb-4'>
              <label htmlFor='amount'>Withdraw Amount</label>
              <input
                type='number'
                placeholder='enter amount to transfer'
                className='font-normal text-sm'
                id='amount'
                {...register("amount", {
                  required: "please enter your withdrawal amount",
                })}
              />
              {errors.amount && (
                <span className='text-red-500'>{errors.amount.message}</span>
              )}
            </div>
            <div className='flex flex-col font-semibold space-y-2 mb-4'>
              <label htmlFor=''>Account Details</label>
              <input
                type='text'
                placeholder='receiver account details'
                className='font-normal text-sm'
                {...register("account", {
                  required: "please enter your withdrawal amount",
                })}
              />
              {errors.account && (
                <span className='text-red-500'>{errors.account.message}</span>
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

CreateTransactionScreen.auth = true;
export default CreateTransactionScreen;
