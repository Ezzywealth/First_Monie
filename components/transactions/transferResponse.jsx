import React from "react";
import { useDispatch } from "react-redux";
import {
  closeOtpModal,
  setUserCode,
  stopLoading,
} from "../../Redux/generalSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
const TransferResponse = () => {
  const dispatch = useDispatch();
  dispatch(stopLoading());
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleForm = async ({ code }) => {
    if (code) {
      dispatch(setUserCode(code));

      try {
        const { data } = await axios.post(`/api/transactions/otpCode`, {
          code,
        });
        console.log(data);
        if (data[0].secret_code !== code) {
          toast.error("Invalid code, Try again");
        } else {
          dispatch(closeOtpModal());
          document.querySelector("form").reset();
          toast.success("success!, transfer request created");
        }
        if (data.error) throw new Error(data.error.message);
      } catch (error) {
        console.log(error);
        dispatch(closeOtpModal());
      }
    }
  };

  return (
    <div className='w-full flex  justify-center h-screen bg-'>
      <div className='w-[80%] md:w-[70%] rounded-lg bg-gray-400 py-8 pt-4 px-4 lg:w-[50%] h-[30%] border-indigo-300 border-solid border'>
        <div className='flex justify-end'>
          <button
            onClick={() => dispatch(closeOtpModal())}
            className=' px-3 py-1 bg-gray-500 text-white rounded-lg'
          >
            X
          </button>
        </div>
        <form
          onSubmit={handleSubmit(handleForm)}
          className='flex flex-col gap-4'
        >
          <div>
            <label htmlFor='otp' className='text-sm text-white font-semibold'>
              Enter the otp code sent to the registered Email Address to
              continue
            </label>
            <input
              type='text'
              className='transaferResponse bg-gray-50 focus:outline-none w-full py-2 px-3 rounded-lg'
              id='otp'
              {...register("code", { required: "Please enter Otp code" })}
            />
          </div>

          <div className='flex gap-3 text-sm'>
            <button className=' px-5 py-1 bg-indigo-500 text-white rounded-lg'>
              Ok
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferResponse;
