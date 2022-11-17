import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setLoanAmount, setLoanFalse } from "../../Redux/generalSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const LoanResponse = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const loanDetails = useSelector((state) => state.generalSlice.loanDetails);
  console.log(loanDetails);

  const submitHandler = ({ amount }) => {
    const { maximum, minimum, percentage, total } = loanDetails;

    if (amount < parseInt(minimum) || amount > parseInt(maximum)) {
      toast.error(
        "amount is not within the loan limit, try a different amount"
      );
      return;
    }
    dispatch(setLoanAmount(amount));
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
        <form onSubmit={handleSubmit(submitHandler)}>
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
              <button className='bg-blue-800 px-4 py-2 rounded-lg text-white '>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanResponse;
