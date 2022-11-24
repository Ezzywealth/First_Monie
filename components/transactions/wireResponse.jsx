import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeOtpModal, startCountdownTimer } from "../../Redux/generalSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { BsLink45Deg } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const WireResponse = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();
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
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const createdDate = new Date().toLocaleString("en-US", options);
    if (code) {
      try {
        if (parseInt(otpCode) !== parseInt(code)) {
          toast.error("Incorrect code, Try again");
        } else {
          dispatch(closeOtpModal());
          console.log(transactionDetails, session);
          dispatch(startCountdownTimer());

          const data = await axios.post(`/api/transactions/createWireRequest`, {
            ...transactionDetails,
            id: session?.user._id,
            email: session?.user.email,
            createdDate,
          });
          console.log(data);

          setTimeout(() => {
            toast.success("Wire Transfer successful");
            router.push("/transactionDetails");
          }, 100000);
        }
      } catch (error) {
        setTimeout(() => {
          toast.error("Wire Transfer error, try again later!!!");
          dispatch(closeOtpModal());
        }, 100000);
        console.log(error);
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
            below to activate Wire Transfer
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleForm)}
          className='flex flex-col gap-4'
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
              Transfer Money
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WireResponse;
