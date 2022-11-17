import React from "react";
import Layout from "../../components/Layout/Layout";
import { useForm } from "react-hook-form";

const CreateTransactionScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Layout title='createTransaction'>
      <div className='pt-16 px-16 mt-32 md:mt-8 '>
        <h2 className='px-8 font-semibold'>Withdraw Now</h2>
        <form className='px-4 md:px-8 lg:px-16 border border-solid border-gray-200 m-8 mt-2 py-8'>
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
                className='font-normal text-sm'
                id='amount'
                {...register("amount", {
                  required: "please enter your withdrawal amount",
                })}
              />
            </div>
            <div className='flex flex-col font-semibold space-y-2 mb-4'>
              <label htmlFor=''>Description</label>
              <textarea
                type='text'
                rows={4}
                placeholder='receiver account details'
                className='font-normal text-sm'
              />
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
