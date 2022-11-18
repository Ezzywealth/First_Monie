import React, { useState } from "react";
import { closeSupportModal } from "../Redux/generalSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
const CreateTicket = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const formHandler = async ({ fullName, message, subject }) => {
    console.log(fullName, message, subject);
    setLoading(true);

    try {
      const { data } = await axios.post(
        `/api/transactions/createSupportTicket`,
        {
          fullName,
          message,
          subject,
        }
      );

      dispatch(closeSupportModal());
      toast.success(data.message);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };
  if (loading) {
    return (
      <div className='flex bg-indigo-100 justify-center items-center h-screen w-full'>
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
    <div className='backdrop-blur-sm w-full h-screen bg-[rgba(0,0,0,0.2)] flex justify-center items-center'>
      <div className='border border-gray-100 rounded-lg border-solid w-[60%]'>
        <h2 className='flex justify-between px-4 py-3 bg-white '>
          <span className='text-gray-500 font-semibold'> Create Ticket</span>
          <span
            className='font-bold text-gray-600 cursor-pointer hover:scale-105 customTransition'
            onClick={() => dispatch(closeSupportModal())}
          >
            X
          </span>
        </h2>
        <form
          action=''
          className='bg-gray-100 space-y-2 mt-4 px-3 py-3 '
          onSubmit={handleSubmit(formHandler)}
        >
          <div>
            <input
              type='text'
              placeholder='Enter Full Name'
              {...register("fullName", { required: "Kindly enter your name" })}
            />
            {errors.fullName && <span>{errors.fullName.message}</span>}
          </div>
          <div>
            <input
              type='text'
              placeholder='subject'
              {...register("subject", {
                required: "Please enter the title of your message",
              })}
            />
            {errors.subject && <span>{errors.subject.message}</span>}
          </div>
          <div>
            <textarea
              rows={5}
              type='text'
              placeholder='Your Message'
              {...register("message", "Kindly enter your message details")}
            />
            {errors.message && <span>{errors.message.message}</span>}
          </div>
          <div>
            <button className='px-3 py-2 bg-blue-900 rounded-lg text-white w-full hover:scale-105 customTransition md:w-[20%]'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
