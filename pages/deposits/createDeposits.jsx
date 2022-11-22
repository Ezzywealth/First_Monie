import React from "react";
import Layout from "../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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
  const user = useSelector((state) => state.generalSlice.user);
  const formHandler = ({ amount, method, account }) => {
    if (user.account_status === "hold") {
      toast.error(
        "Your account is on hold temporarily, kindly contact our customer service to resolve this issue"
      );
      return;
    }
    document.getElementById("form4").reset();

    toast.error(
      `Deposit with ${method} is unavailable, contact @support for futher assistance `
    );
  };

  return (
    <Layout title='createDeposits'>
      <div className='py-16 px-4 md:px-8 lg:px-16 mt-[160px]  bgContact'>
        <h2 className=' font-semibold text-2xl'>Deposit Now</h2>
        <form
          className='px-4 md:px-8 lg:px-16 border border-solid border-gray-200 p-8 mt-2 py-8'
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
              <textarea
                rows={4}
                type='text'
                placeholder='deposit description'
                className='font-normal text-sm'
                id='description'
                {...register("description", {
                  required: "please enter deposit descriptio",
                })}
              />
              {errors.description && (
                <span className='text-red-500'>
                  {errors.description.message}
                </span>
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

CreateDepositsScreen.auth = true;
export default CreateDepositsScreen;
