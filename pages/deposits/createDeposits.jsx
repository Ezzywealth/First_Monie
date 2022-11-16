import React from "react";
import Layout from "../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateDepositsScreen = () => {
  const [cardDetails, setCardDetails] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleMethod = (name) => {
    console.log(name);
    if (name === "Stripe" || name === "Flutterwave") {
      setCardDetails(true);
    } else {
      setCardDetails(false);
    }
  };

  const formHandler = ({ amount, method, account }) => {
    document.getElementById("form4").reset();

    toast.error(
      `Deposit with ${method} is unavailable, contact @support for futher assistance `
    );
  };

  return (
    <Layout title='createTransaction'>
      <div className='pt-16 px-2 md:px-8 lg:px-16 mt-32 md:mt-8 bgContact'>
        <h2 className='px-8 font-semibold text-2xl'>Deposit Now</h2>
        <form
          className='px-4 md:px-8 lg:px-16 border border-solid border-gray-200 m-8 mt-2 py-8'
          onSubmit={handleSubmit(formHandler)}
          id='form4'
        >
          <div>
            <div className='flex flex-col font-semibold space-y-2 mb-4'>
              <label htmlFor='method'>Payment Method</label>
              <select
                type='text'
                className='p-2 focus:outline-none border-solid font-normal border text-sm rounded-lg'
                id='method'
                {...register("method", {
                  required: "Please select a withdrawal method",
                })}
                onChange={(e) => handleMethod(e.target.value)}
              >
                <option value='paypal'>Paypal</option>
                <option value='Stripe'>Stripe</option>
                <option value='Paytm'>Paytm</option>
                <option value='Instamojo'>Instamojo</option>
                <option value='Razorpay'>Razorpay</option>
                <option value='Authorize.net'>Authorize.net</option>
                <option value='Flutterwave'>Flutterwave</option>
              </select>
              {errors.method && (
                <span className='text-red-500'>{errors.method.message}</span>
              )}
            </div>

            {cardDetails && (
              <div className='grid gird-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <div>
                  <input type='text' placeholder='card number' />
                </div>
                <div>
                  <input type='text' placeholder='card CVC' />
                </div>
                <div>
                  <input type='text' placeholder='month' />
                </div>
                <div>
                  <input type='text' placeholder='year' />
                </div>
              </div>
            )}
            <div className='flex flex-col font-semibold space-y-2 mb-4'>
              <label htmlFor='amount'>Deposit Amount</label>
              <input
                type='number'
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
              <label htmlFor=''>Description</label>
              <input
                type='text'
                placeholder='receiver account details'
                className='font-normal text-sm'
                id='amount'
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

export default CreateDepositsScreen;
