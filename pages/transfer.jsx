import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout/Layout";

const TransferScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Layout title='createTransaction'>
      <div className='pt-16 px-16 mt-32 md:mt-8 '>
        <h2 className='px-8 font-semibold'>Send Money</h2>
        <form className='px-4 md:px-8 lg:px-16 border border-solid border-gray-200 m-8 mt-2 py-8'>
          <div>
            <div className='flex flex-col font-semibold space-y-2 mb-4'>
              <label htmlFor='account_name'>Account Number</label>
              <input
                type='text'
                className='p-2 focus:outline-none border-solid font-normal border text-sm rounded-lg'
                id='account_name'
                {...register("account_name", {
                  required: "Please enter account name",
                })}
              />
            </div>
            <div className='flex flex-col font-semibold space-y-2 mb-4'>
              <label htmlFor='amount'>Account Name</label>
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
              <label htmlFor=''>Amount</label>
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

export default TransferScreen;
