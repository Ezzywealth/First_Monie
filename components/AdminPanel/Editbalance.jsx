import React from "react";
import { useForm } from "react-hook-form";
const Editbalance = ({ editTransaction, transactionId, client, interest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <h2 className='font-bold'>
        Edit Balance : {transactionId.substring(12)}
      </h2>
      <div>
        <form
          id='myForm2'
          className='md:w-[90%] my-1 bg-white h-full py-8 pt-4 rounded-lg px-4'
          onSubmit={handleSubmit(editTransaction)}
        >
          <div className='flex flex-col gap-4'>
            <div>
              <label htmlFor='email' className='text-[#333333] '>
                Client Email
              </label>
              <input
                type='text'
                value={client}
                id='email'
                className='w-full p-2 focus:outline-none border mb-2'
                {...register("newClient", {
                  required: "please enter client email address",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: "please enter a valid email address",
                  },
                })}
              />
              {errors.newClient && (
                <span className='text-red-500'>{errors.newClient.message}</span>
              )}
            </div>
            <div>
              <label htmlFor='newAmount' className='text-[#333333] '>
                New Amount
              </label>
              <input
                type='number'
                id='amount'
                value={parseInt(interest)}
                className='w-full p-2 focus:outline-none border mb-2'
                {...register("newAmount", {
                  required: "please enter amount",
                })}
              />
              {errors.newAmount && (
                <span className='text-red-500'>{errors.newAmount.message}</span>
              )}
            </div>

            <div>
              <button
                type='submit'
                className='bg-indigo-900 px-3 py-1 text-white rounded-lg'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editbalance;
