import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLoanFalse } from "../../Redux/generalSlice";
import { useRouter } from "next/router";

const LoanResponse = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {
    router.push("/loans/loanRequestConfirm");
  };
  return (
    <div className=' flex justify-center backdrop-blur-sm items-center h-screen w-full'>
      <div className='border  bg-white  border-gray-100 shadow-2xl w-full md:w-[80%] lg:w-[50%]'>
        <div className=' flex justify-between px-2 py-3'>
          <h2 className='text-gray-500 font-bold'>Apply for Loan</h2>
          <span
            onClick={() => dispatch(setLoanFalse())}
            className='cursor-pointer'
          >
            X
          </span>
        </div>
        <div className='bg-gray-100 py-6 px-2'>
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            placeholder='enter amount'
            id='amount'
            {...register("amount", { required: "Please enter an amount" })}
          />
          {errors.amount && (
            <span className='text-red-500'>{errors.amount.message}</span>
          )}
          <div className='flex justify-end mt-4'>
            <button
              className='bg-blue-800 px-4 py-2 rounded-lg text-white '
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanResponse;
