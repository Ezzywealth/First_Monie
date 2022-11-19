import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";

const CreateTransactionScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const formHandler = async ({ method, amount }) => {
    setLoading(true);

    try {
      document.getElementById("myForm").reset();
      const { data } = await axios.post(`/api/transactions/createWithdrawals`, {
        method,
        amount,
        status: "pending",
      });
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }

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
      <div className='pt-16 px-16 mt-32 md:mt-8 '>
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
