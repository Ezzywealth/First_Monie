import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeOtpModal } from "../../Redux/generalSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { BsLink45Deg } from "react-icons/bs";

const WithdrawalResponse = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const transactionDetails = useSelector(
    (state) => state.generalSlice.transactionDetails
  );

  const otpCode = useSelector((state) => state.generalSlice.otpCode);

  const handleForm = async ({ code }) => {
    document.getElementById("withdrawals").reset();
    if (code) {
      try {
        if (parseInt(otpCode) !== parseInt(code)) {
          toast.error("Incorrect code, Try again");
          return;
        } else {
          dispatch(closeOtpModal());
          toast.error(
            "This account is unable to make withdrawals at the moment, Kindly contact out customer care service. Thank You!!!"
          );
        }
      } catch (error) {
        console.log(error);
        dispatch(closeOtpModal());
      }
    }
  };

  return (
    <div className='w-full  flex  backdrop-blur-sm justify-center h-screen bg-'>
      <div className='w-full md:w-[70%] rounded-lg bg-gray-100 py-8 pt-4 px-4 lg:w-[50%] h-[40%] md:h-[55%] border-indigo-300 border-solid border'>
        <div className='flex justify-end'>
          <button
            onClick={() => dispatch(closeOtpModal())}
            className=' px-3 py-1 bg-gray-500 text-white rounded-lg'
          >
            X
          </button>
        </div>
        <div className='mb-8 mt-4'>
          <h2 className='text-xl text-gray-500 font-bold'>Transfer Funds</h2>
          <p>
            A One Time Password (OTP) has been sent to your email. <br /> Enter
            below to activate Withdrawals
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleForm)}
          className='flex flex-col gap-4'
          id='withdrawals'
        >
          <div>
            <label
              htmlFor='otp'
              className='text-sm text-gray-500 font-semibold'
            >
              One-Time Password (OTP)
            </label>
            <input
              type='text'
              className='transaferResponse bg-gray-50 border border-gray-400 border-solid focus:outline-none w-full py-2 px-3 rounded-lg'
              id='otp'
              {...register("code", { required: "Please enter Otp code" })}
            />
          </div>

          <div className='flex gap-3 text-sm'>
            <button
              type='submit'
              className='bg-indigo-800 text-[12px] hover:scale-105 customTransition rounded-lg items-center px-3 py-2 flex gap-3 text-gray-200'
            >
              <BsLink45Deg className='text-2xl' />
              Confrim Withdraw
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalResponse;
